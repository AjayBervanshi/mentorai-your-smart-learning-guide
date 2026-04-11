import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Eye, EyeOff, ChevronRight, ChevronLeft, Briefcase, Rocket, TrendingUp, Loader2, RefreshCw } from "lucide-react";
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

  useEffect(() => {
    if (!skill) return;
    loadInterviewQuestions();
  }, [skill?.name]);

  const loadInterviewQuestions = async () => {
    if (!skill) return;
    setLoading(true);
    setCurrentQ(0);
    setShowAnswer(false);
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
    <div className="p-4 max-w-lg mx-auto space-y-5 pt-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Interview Prep</h1>
        <p className="text-sm text-muted-foreground">Practice {skill.name} interview questions and get ready for your next opportunity</p>
      </motion.div>

      {/* Career paths */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card p-5">
        <h2 className="font-semibold text-foreground mb-3">Career Paths</h2>
        <div className="space-y-2">
          {[
            { icon: Briefcase, title: "Job Preparation", desc: "Polish your resume and portfolio", color: "gradient-primary" },
            { icon: Rocket, title: "Freelancing", desc: "Start with small projects on platforms", color: "gradient-accent" },
            { icon: TrendingUp, title: "Skill Growth", desc: "Contribute to open source", color: "gradient-warm" },
          ].map((path, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors">
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

      {/* Practice questions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Practice Questions</h2>
          <div className="flex items-center gap-2">
            {questions.length > 0 && (
              <button
                onClick={loadInterviewQuestions}
                aria-label="Regenerate questions"
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> New set
              </button>
            )}
            {questions.length > 0 && (
              <span className="text-xs text-muted-foreground">{currentQ + 1}/{questions.length}</span>
            )}
          </div>
        </div>

        {loading ? (
          <div className="glass-card p-12 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Generating {skill.name} interview questions...</p>
          </div>
        ) : questions.length === 0 ? (
          <div className="glass-card p-8 text-center space-y-3">
            <MessageSquare className="w-10 h-10 text-muted-foreground mx-auto" />
            <p className="text-foreground font-medium">No questions yet</p>
            <p className="text-sm text-muted-foreground">Generate AI-powered interview questions for {skill.name}</p>
            <Button onClick={loadInterviewQuestions} className="gradient-primary text-primary-foreground mt-2">
              Generate Questions
            </Button>
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm leading-relaxed">{questions[currentQ].question}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full capitalize mt-2 inline-block font-medium ${
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

                <AnimatePresence>
                  {showAnswer && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-3 overflow-hidden">
                      <div className="p-4 rounded-lg bg-primary/10 text-sm text-foreground leading-relaxed">
                        {questions[currentQ].sampleAnswer}
                      </div>
                      <div className="space-y-1.5">
                        <span className="text-xs font-semibold text-muted-foreground uppercase">Tips to Remember</span>
                        {questions[currentQ].tips.map((tip, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                            {tip}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => { setCurrentQ(Math.max(0, currentQ - 1)); setShowAnswer(false); }}
                disabled={currentQ === 0}
                className="flex-1 gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </Button>
              <Button
                onClick={() => { setCurrentQ(Math.min(questions.length - 1, currentQ + 1)); setShowAnswer(false); }}
                disabled={currentQ === questions.length - 1}
                className="flex-1 gradient-primary text-primary-foreground gap-1"
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
