import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Eye, EyeOff, ChevronRight, Briefcase, Rocket, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLearning } from "@/context/LearningContext";

const interviewQuestions = [
  { q: "Tell me about yourself and your experience with {skill}.", answer: "I've been learning {skill} with a structured approach, covering fundamentals through advanced topics. I've completed hands-on projects and practice exercises that simulate real-world scenarios.", tips: ["Keep it concise (2 min max)", "Highlight relevant projects", "Show enthusiasm for learning"] },
  { q: "What's the most challenging problem you've solved with {skill}?", answer: "I encountered a complex problem involving data management and optimization. I broke it down into smaller parts, researched best practices, and implemented a solution that improved performance significantly.", tips: ["Use the STAR method", "Be specific about your approach", "Mention what you learned"] },
  { q: "How do you stay updated with {skill} trends?", answer: "I follow industry blogs, participate in communities, work on personal projects, and use structured learning paths to continuously improve my skills.", tips: ["Mention specific resources", "Show self-motivation", "Reference recent trends"] },
  { q: "Where do you see yourself in 2 years with {skill}?", answer: "I aim to become proficient enough to lead projects, mentor others, and contribute to the community while continuously expanding my expertise.", tips: ["Be ambitious but realistic", "Align with the role", "Show growth mindset"] },
];

export default function InterviewScreen() {
  const { profile } = useLearning();
  const [currentQ, setCurrentQ] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!profile) return null;

  const skill = profile.skills[0];
  const question = interviewQuestions[currentQ];

  return (
    <div className="p-4 max-w-lg mx-auto space-y-6 pt-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Interview Prep</h1>
        <p className="text-sm text-muted-foreground">Practice answering common questions</p>
      </motion.div>

      {/* Career guidance */}
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

      {/* Interview questions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Practice Questions</h2>
          <span className="text-xs text-muted-foreground">{currentQ + 1}/{interviewQuestions.length}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card p-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4 text-primary-foreground" />
              </div>
              <p className="font-medium text-foreground text-sm leading-relaxed">
                {question.q.replace("{skill}", skill?.name ?? "your skill")}
              </p>
            </div>

            <Button
              variant="outline"
              onClick={() => setShowAnswer(!showAnswer)}
              className="w-full gap-2 text-sm"
            >
              {showAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showAnswer ? "Hide Answer" : "Show Sample Answer"}
            </Button>

            {showAnswer && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-3">
                <div className="p-4 rounded-lg bg-primary/10 text-sm text-foreground leading-relaxed">
                  {question.answer.replace(/\{skill\}/g, skill?.name ?? "your skill")}
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Tips</span>
                  {question.tips.map((tip, i) => (
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
            onClick={() => { setCurrentQ(Math.min(interviewQuestions.length - 1, currentQ + 1)); setShowAnswer(false); }}
            disabled={currentQ === interviewQuestions.length - 1}
            className="flex-1 gradient-primary text-primary-foreground gap-2"
          >
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
