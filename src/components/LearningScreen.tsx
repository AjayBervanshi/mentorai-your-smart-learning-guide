import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, CheckCircle2, XCircle, ChevronRight, HelpCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLearning } from "@/context/LearningContext";
import type { QuizQuestion } from "@/types/learning";

const generateQuiz = (topicTitle: string): QuizQuestion[] => [
  {
    id: "q1",
    question: `What is the main purpose of ${topicTitle}?`,
    options: ["To organize and structure work", "To add unnecessary complexity", "To skip learning fundamentals", "None of the above"],
    correctIndex: 0,
    hint: "Think about why this topic exists in the curriculum.",
    explanation: `${topicTitle} helps you organize and structure your work effectively, forming a foundation for advanced concepts.`,
  },
  {
    id: "q2",
    question: `Which is a best practice when working with ${topicTitle}?`,
    options: ["Skip documentation", "Follow established patterns", "Ignore error handling", "Use random approaches"],
    correctIndex: 1,
    hint: "Best practices are about reliability and maintainability.",
    explanation: "Following established patterns ensures your work is maintainable and follows industry standards.",
  },
  {
    id: "q3",
    question: `How does ${topicTitle} relate to real-world applications?`,
    options: ["It has no practical use", "It's only theoretical", "It's directly applicable to projects", "It's outdated"],
    correctIndex: 2,
    hint: "Think about how professionals use this daily.",
    explanation: "This topic is directly applicable to real-world projects and is used by professionals regularly.",
  },
];

export default function LearningScreen() {
  const { getActiveSkill, updateSkillProgress, profile } = useLearning();
  const skill = getActiveSkill();
  const [mode, setMode] = useState<"lesson" | "quiz">("lesson");
  const [quizIndex, setQuizIndex] = useState(0);
  const [hintLevel, setHintLevel] = useState(0); // 0=none, 1=hint, 2=partial, 3=full
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  if (!skill || !profile) {
    return (
      <div className="p-4 max-w-lg mx-auto pt-12 text-center">
        <p className="text-muted-foreground">Select a skill from the dashboard to start learning.</p>
      </div>
    );
  }

  const topic = skill.topics[skill.currentTopicIndex];
  if (!topic) {
    return (
      <div className="p-4 max-w-lg mx-auto pt-12 text-center space-y-4">
        <div className="text-4xl">🎉</div>
        <h2 className="text-2xl font-bold text-foreground">All topics completed!</h2>
        <p className="text-muted-foreground">Amazing work on {skill.name}. Keep practicing with projects.</p>
      </div>
    );
  }

  // ⚡ Bolt: Memoize quiz generation to avoid recreating questions and array allocations
  // on every re-render caused by frequent state changes (e.g. answering questions, hints).
  const quiz = useMemo(() => generateQuiz(topic.title), [topic.title]);
  const currentQ = quiz[quizIndex];

  const handleAnswer = (idx: number) => {
    setSelectedAnswer(idx);
    if (idx === currentQ.correctIndex) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    if (quizIndex < quiz.length - 1) {
      setQuizIndex((i) => i + 1);
      setSelectedAnswer(null);
      setHintLevel(0);
    } else {
      setQuizComplete(true);
      const finalScore = Math.round(((score + (selectedAnswer === currentQ.correctIndex ? 1 : 0)) / quiz.length) * 100);
      updateSkillProgress(skill.id, topic.id, finalScore);
    }
  };

  const resetQuiz = () => {
    setMode("lesson");
    setQuizIndex(0);
    setSelectedAnswer(null);
    setHintLevel(0);
    setScore(0);
    setQuizComplete(false);
  };

  return (
    <div className="p-4 max-w-lg mx-auto space-y-6 pt-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground">{topic.title}</h1>
          <p className="text-xs text-muted-foreground capitalize">{skill.name} • {topic.level}</p>
        </div>
      </div>

      {/* Topic progress dots */}
      <div className="flex gap-1.5">
        {skill.topics.map((t, i) => (
          <div
            key={t.id}
            className={`h-1.5 flex-1 rounded-full transition-all ${
              t.completed ? "gradient-primary" : i === skill.currentTopicIndex ? "bg-primary/40 animate-pulse-glow" : "bg-secondary"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {mode === "lesson" ? (
          <motion.div key="lesson" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            {/* Lesson content */}
            <div className="glass-card p-5 space-y-4">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-xs text-primary-foreground">1</span>
                Understanding {topic.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {topic.description}. This topic covers the essential concepts you need to master before moving forward. 
                Take your time to understand each concept thoroughly.
              </p>
            </div>

            <div className="glass-card p-5 space-y-4">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full gradient-accent flex items-center justify-center text-xs text-accent-foreground">2</span>
                Key Concepts
              </h2>
              {topic.subtopics.map((sub, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{sub}</span>
                </div>
              ))}
            </div>

            <div className="glass-card p-5 space-y-3">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full gradient-warm flex items-center justify-center text-xs text-primary-foreground">3</span>
                Example
              </h2>
              <div className="bg-secondary/80 rounded-lg p-4 font-mono text-xs text-foreground">
                <div className="text-muted-foreground">// Example for {topic.title}</div>
                <div className="mt-1">const concept = understand("{topic.title}");</div>
                <div>apply(concept, realWorld);</div>
                <div className="text-primary">// → Success! ✓</div>
              </div>
            </div>

            <Button onClick={() => setMode("quiz")} className="w-full gradient-primary text-primary-foreground gap-2">
              Test Your Knowledge <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>
        ) : quizComplete ? (
          <motion.div key="complete" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4 py-8">
            <div className="text-5xl">{score >= 2 ? "🎉" : "📚"}</div>
            <h2 className="text-2xl font-bold text-foreground">
              {score >= 2 ? "Great job!" : "Keep practicing!"}
            </h2>
            <p className="text-muted-foreground">
              You scored {score}/{quiz.length} on {topic.title}
            </p>
            <div className="w-32 h-32 mx-auto relative">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--secondary))" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="8"
                  strokeDasharray={`${(score / quiz.length) * 251} 251`} strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-foreground">
                {Math.round((score / quiz.length) * 100)}%
              </div>
            </div>
            <Button onClick={resetQuiz} className="gradient-primary text-primary-foreground">
              {score >= 2 ? "Next Topic" : "Review & Retry"}
            </Button>
          </motion.div>
        ) : (
          <motion.div key={`quiz-${quizIndex}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div className="flex items-center justify-between">
              <button onClick={resetQuiz} className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm">
                <ArrowLeft className="w-4 h-4" /> Back to lesson
              </button>
              <span className="text-sm text-muted-foreground">{quizIndex + 1}/{quiz.length}</span>
            </div>

            <div className="glass-card p-5 space-y-4">
              <h3 className="font-semibold text-foreground">{currentQ.question}</h3>

              <div className="space-y-2">
                {currentQ.options.map((opt, i) => {
                  const isSelected = selectedAnswer === i;
                  const isCorrect = i === currentQ.correctIndex;
                  const showResult = selectedAnswer !== null;

                  return (
                    <button
                      key={i}
                      onClick={() => selectedAnswer === null && handleAnswer(i)}
                      disabled={selectedAnswer !== null}
                      className={`w-full text-left p-3 rounded-lg text-sm transition-all flex items-center gap-3 ${
                        showResult
                          ? isCorrect
                            ? "bg-primary/20 ring-1 ring-primary"
                            : isSelected
                            ? "bg-destructive/20 ring-1 ring-destructive"
                            : "bg-secondary/50"
                          : "bg-secondary/50 hover:bg-secondary"
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${
                        showResult && isCorrect ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}>
                        {showResult && isCorrect ? <CheckCircle2 className="w-4 h-4" /> : showResult && isSelected ? <XCircle className="w-4 h-4" /> : String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-foreground">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Hint system */}
              {selectedAnswer === null && (
                <button
                  onClick={() => setHintLevel(Math.min(hintLevel + 1, 3))}
                  className="text-sm text-primary flex items-center gap-1 hover:underline"
                >
                  <HelpCircle className="w-4 h-4" />
                  {hintLevel === 0 ? "Need a hint?" : hintLevel === 1 ? "More help?" : "Show answer?"}
                </button>
              )}

              {hintLevel >= 1 && selectedAnswer === null && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="p-3 rounded-lg bg-primary/10 text-sm text-foreground">
                  💡 <strong>Hint:</strong> {currentQ.hint}
                </motion.div>
              )}

              {hintLevel >= 2 && selectedAnswer === null && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-lg bg-accent/10 text-sm text-foreground">
                  🔍 Look at option {String.fromCharCode(65 + currentQ.correctIndex)} closely...
                </motion.div>
              )}

              {hintLevel >= 3 && selectedAnswer === null && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-lg bg-amber/10 text-sm text-foreground">
                  ✅ The correct answer is: <strong>{currentQ.options[currentQ.correctIndex]}</strong>
                </motion.div>
              )}

              {selectedAnswer !== null && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-lg bg-secondary/80 text-sm text-foreground">
                  <strong>Explanation:</strong> {currentQ.explanation}
                </motion.div>
              )}
            </div>

            {selectedAnswer !== null && (
              <Button onClick={nextQuestion} className="w-full gradient-primary text-primary-foreground gap-2">
                {quizIndex < quiz.length - 1 ? "Next Question" : "See Results"} <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
