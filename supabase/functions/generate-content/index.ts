import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.101.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: authError } = await authClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const { skill, topic, subtopics, contentType = "lesson" } = await req.json();

    // Security: Input validation to prevent prompt injection and DoS
    if (!skill || !topic || typeof skill !== "string" || typeof topic !== "string" || skill.length > 100 || topic.length > 200) {
      return new Response(JSON.stringify({ error: "Invalid skill or topic" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const validContentTypes = ["lesson", "quiz", "interview"];
    if (!validContentTypes.includes(contentType)) {
      return new Response(JSON.stringify({ error: "Invalid content type" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check cache first
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: cached } = await supabase
      .from("topic_content")
      .select("*")
      .eq("topic_title", topic)
      .eq("skill_name", skill)
      .eq("content_type", contentType)
      .maybeSingle();

    if (cached) {
      return new Response(JSON.stringify({
        lesson: cached.lesson_content,
        quiz: cached.quiz_questions,
        fromCache: true,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Generate content with AI
    let systemPrompt = "";
    let userPrompt = "";

    if (contentType === "lesson") {
      systemPrompt = `You are an expert educator creating comprehensive learning content. Return valid JSON only, no markdown wrapping.`;
      userPrompt = `Create a detailed lesson for the topic "${topic}" in "${skill}". 
Subtopics to cover: ${(subtopics || []).join(", ")}.

Return JSON with this exact structure:
{
  "title": "string",
  "introduction": "string (2-3 paragraphs explaining the topic)",
  "sections": [
    {
      "heading": "string",
      "content": "string (detailed explanation with examples)",
      "codeExample": "string or null (if applicable, a real code example)",
      "keyPoints": ["string"]
    }
  ],
  "summary": "string (brief recap)",
  "practiceExercises": [
    {"task": "string", "hint": "string"}
  ]
}`;
    } else if (contentType === "quiz") {
      systemPrompt = `You are an expert quiz creator for educational content. Return valid JSON only, no markdown wrapping.`;
      userPrompt = `Create 5 quiz questions for the topic "${topic}" in "${skill}".
Subtopics: ${(subtopics || []).join(", ")}.

Return JSON array with this exact structure:
[
  {
    "id": "q1",
    "question": "string (specific, testing real understanding)",
    "options": ["string", "string", "string", "string"],
    "correctIndex": 0,
    "hint": "string (helpful clue without giving away the answer)",
    "explanation": "string (why the correct answer is right)"
  }
]

Make questions progressively harder. Test real understanding, not just definitions.`;
    } else if (contentType === "interview") {
      systemPrompt = `You are a senior technical interviewer. Return valid JSON only, no markdown wrapping.`;
      userPrompt = `Create 6 interview questions for someone learning "${skill}". Mix behavioral and technical questions.

Return JSON array:
[
  {
    "question": "string",
    "sampleAnswer": "string (a strong sample answer)",
    "tips": ["string", "string", "string"],
    "difficulty": "beginner" | "intermediate" | "advanced"
  }
]`;
    }

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      console.error("AI gateway error:", aiResponse.status);
      throw new Error("AI generation failed");
    }

    const aiData = await aiResponse.json();
    let content = aiData.choices?.[0]?.message?.content || "";

    // Clean markdown wrapper if present
    content = content.replace(/^```json\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      console.error("Failed to parse AI response: content was invalid JSON");
      throw new Error("AI returned invalid JSON");
    }

    // Cache the result
    const cacheData: Record<string, unknown> = {
      topic_title: topic,
      skill_name: skill,
      content_type: contentType,
    };

    if (contentType === "lesson") {
      cacheData.lesson_content = parsed;
    } else if (contentType === "quiz") {
      cacheData.quiz_questions = parsed;
    } else if (contentType === "interview") {
      cacheData.quiz_questions = parsed; // reuse column for interview data
    }

    await supabase.from("topic_content").upsert(cacheData, {
      onConflict: "topic_title,skill_name,content_type",
    });

    return new Response(JSON.stringify({
      lesson: contentType === "lesson" ? parsed : null,
      quiz: contentType === "quiz" ? parsed : null,
      interview: contentType === "interview" ? parsed : null,
      fromCache: false,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

  } catch (e) {
    console.error("generate-content error:", e instanceof Error ? e.message : "Unknown error");
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
