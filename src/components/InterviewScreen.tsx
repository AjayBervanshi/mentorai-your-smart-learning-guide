import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Eye, EyeOff, ChevronRight, Briefcase, Rocket, TrendingUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLearning } from "@/context/LearningContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface InterviewQ {
  question: string;
  sampleAnswer: string;
  tips: string[];
  difficulty: string;
}

export default function InterviewScreen() {
  const { profile, activeSkillId } = useLearning();
  const [currentQ, setCurrentQ] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [questions, setQuestions] = useState<InterviewQ[]>([]);
  const [loading, setLoading] = useState(false);

  const skill = profile?.skills.find((s) => s.id === activeSkillId) || profile?.skills[0];

  const loadInterviewQuestions = async () => {
    if (!skill) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-content", {
        body: { skill: skill.name, topic: skill.name, contentType: "interview" },
      });
      if (error) throw error;
      if (data.interview && Array.isArray(data.interview)) {
        setQuestions(data.interview);
      }
    } catch (err) {
      console.error("Failed to load interview questions:", err);
      toast.error("Failed to load interview questions");
    } finally {
      setLoading(false);
    }
  };

  if (!profile || !skill) return null;

  return (
    <div className="p-4 max-w-lg mx-auto space-y-6 pt-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Interview Prep</h1>
        <p className="text-sm text-muted-foreground">Practice {skill.name} interview questions</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
        <h2 className="font-semibold text-foreground mb-3">Career Paths</h2>
        <div className="space-y-2">
          {[
            { icon: Briefcase, title: "Job Preparation", desc: "Polish your resume and portfolio", color: "gradient-primary" },
            { icon: Rocket, title: "Freelancing", desc: "Start with small projects on platforms", color: "gradient-accent" },
            { icon: TrendingUp, title: "Skill Growth", desc: "Contribute to open source", color: "gradient-warm" },
          ].map((path, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className={`w-8 h-8 rounded-lg ${path.color} flex items-center justify-center shrink-0`}>
                <path.icon className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{path.title}</div>
                <div className="text-xs text-muted-foreground">{path.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Practice Questions</h2>
          {questions.length > 0 && (
            <span className="text-xs text-muted-foreground">{currentQ + 1}/{questions.length}</span>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Generating {skill.name} interview questions...</p>
          </div>
        ) : questions.length === 0 ? (
          <div className="glass-card p-5 text-center">
            <p className="text-muted-foreground text-sm">No questions available.</p>
            <Button onClick={loadInterviewQuestions} variant="outline" className="mt-3">
              Generate Questions
            </Button>
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm leading-relaxed">{questions[currentQ].question}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full capitalize mt-2 inline-block ${
                      questions[currentQ].difficulty === "beginner" ? "bg-primary/20 text-primary" :
                      questions[currentQ].difficulty === "intermediate" ? "bg-accent/20 text-accent" :
                      "bg-amber/20 text-amber"
                    }`}>{questions[currentQ].difficulty}</span>
                  </div>
                </div>

                <Button variant="outline" onClick={() => setShowAnswer(!showAnswer)} className="w-full gap-2 text-sm">
                  {showAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showAnswer ? "Hide Answer" : "Show Sample Answer"}
                </Button>

                {showAnswer && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-3">
                    <div className="p-4 rounded-lg bg-primary/10 text-sm text-foreground leading-relaxed">
                      {questions[currentQ].sampleAnswer}
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-xs font-semibold text-muted-foreground uppercase">Tips</span>
                      {questions[currentQ].tips.map((tip, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {tip}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => { setCurrentQ(Math.max(0, currentQ - 1)); setShowAnswer(false); }}
                disabled={currentQ === 0}
                className="flex-1"
              >
                Previous
              </Button>
              <Button
                onClick={() => { setCurrentQ(Math.min(questions.length - 1, currentQ + 1)); setShowAnswer(false); }}
                disabled={currentQ === questions.length - 1}
                className="flex-1 gradient-primary text-primary-foreground gap-2"
              >
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
