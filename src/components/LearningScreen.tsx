import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb, CheckCircle2, XCircle, ChevronRight, HelpCircle,
  ArrowLeft, MapPin, Lock, Star, Loader2, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLearning } from "@/context/LearningContext";
import { supabase } from "@/integrations/supabase/client";
import type { QuizQuestion } from "@/types/learning";
import type { Topic } from "@/types/learning";
import { toast } from "sonner";

type ScreenMode = "roadmap" | "lesson" | "quiz" | "quiz-complete";

interface LessonContent {
  title: string;
  introduction: string;
  sections: {
    heading: string;
    content: string;
    codeExample?: string | null;
    keyPoints: string[];
  }[];
  summary: string;
  practiceExercises: { task: string; hint: string }[];
}

export default function LearningScreen() {
  const { getActiveSkill, updateSkillProgress, profile } = useLearning();
  const skill = getActiveSkill();
  const [mode, setMode] = useState<ScreenMode>("roadmap");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [hintLevel, setHintLevel] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [lessonContent, setLessonContent] = useState<LessonContent | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [loadingContent, setLoadingContent] = useState(false);

  if (!skill || !profile) {
    return (
      <div className="p-4 max-w-lg mx-auto pt-12 text-center">
        <p className="text-muted-foreground">Select a skill from the dashboard to start learning.</p>
      </div>
    );
  }

  const loadContent = async (topic: Topic, type: "lesson" | "quiz") => {
    setLoadingContent(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-content", {
        body: {
          skill: skill.name,
          topic: topic.title,
          subtopics: topic.subtopics,
          contentType: type,
        },
      });

      if (error) throw error;

      if (type === "lesson" && data.lesson) {
        setLessonContent(data.lesson);
      } else if (type === "quiz" && data.quiz) {
        setQuizQuestions(data.quiz);
      }
    } catch (err: any) {
      console.error("Failed to load content:", err);
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setLoadingContent(false);
    }
  };

  const openTopic = async (topic: Topic) => {
    setSelectedTopic(topic);
    setMode("lesson");
    setLessonContent(null);
    setQuizQuestions([]);
    setQuizIndex(0);
    setSelectedAnswer(null);
    setHintLevel(0);
    setScore(0);
    setQuizComplete(false);
    await loadContent(topic, "lesson");
  };

  const startQuiz = async () => {
    if (!selectedTopic) return;
    setMode("quiz");
    if (quizQuestions.length === 0) {
      await loadContent(selectedTopic, "quiz");
    }
  };

  const handleAnswer = (idx: number) => {
    if (!quizQuestions[quizIndex]) return;
    setSelectedAnswer(idx);
    if (idx === quizQuestions[quizIndex].correctIndex) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex((i) => i + 1);
      setSelectedAnswer(null);
      setHintLevel(0);
    } else {
      setQuizComplete(true);
      setMode("quiz-complete");
      const finalScore = Math.round(
        ((score + (selectedAnswer === quizQuestions[quizIndex]?.correctIndex ? 1 : 0)) / quizQuestions.length) * 100
      );
      if (selectedTopic) {
        updateSkillProgress(skill.id, selectedTopic.id, finalScore);
      }
    }
  };

  const backToRoadmap = () => {
    setMode("roadmap");
    setSelectedTopic(null);
    setLessonContent(null);
    setQuizQuestions([]);
  };

  const currentQ = quizQuestions[quizIndex];

  // Roadmap View
  if (mode === "roadmap") {
    return (
      <div className="p-4 max-w-lg mx-auto space-y-6 pt-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-foreground">{skill.name} Roadmap</h1>
          <p className="text-sm text-muted-foreground">
            {skill.progress}% complete • {skill.completedTopics.length}/{skill.topics.length} topics
          </p>
        </motion.div>

        <div className="space-y-2">
          {skill.topics.map((topic, i) => {
            const isCompleted = topic.completed;
            const isCurrent = i === skill.currentTopicIndex && !isCompleted;
            const isWeak = topic.score !== undefined && topic.score < 60;
            const isLocked = i > skill.currentTopicIndex && !isCompleted;

            return (
              <motion.button
                key={topic.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => !isLocked && openTopic(topic)}
                disabled={isLocked}
                className={`w-full text-left glass-card p-4 flex items-center gap-3 transition-all ${
                  isLocked ? "opacity-40 cursor-not-allowed" : "hover:ring-1 hover:ring-primary/30"
                } ${isCurrent ? "ring-1 ring-primary/50" : ""}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isCompleted
                    ? isWeak ? "bg-amber/20" : "gradient-primary"
                    : isCurrent ? "bg-primary/20 animate-pulse-glow" : "bg-secondary"
                }`}>
                  {isCompleted ? (
                    isWeak ? <Star className="w-5 h-5 text-amber" /> : <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                  ) : isLocked ? (
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <MapPin className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold text-sm truncate ${isLocked ? "text-muted-foreground" : "text-foreground"}`}>
                      {topic.title}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full capitalize shrink-0 ${
                      topic.level === "beginner" ? "bg-primary/20 text-primary" :
                      topic.level === "intermediate" ? "bg-accent/20 text-accent" :
                      "bg-amber/20 text-amber"
                    }`}>{topic.level}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{topic.description}</p>
                  {isCompleted && topic.score !== undefined && (
                    <span className={`text-xs mt-1 inline-block ${topic.score >= 60 ? "text-primary" : "text-amber"}`}>
                      Score: {topic.score}% {isWeak && "• Review recommended"}
                    </span>
                  )}
                </div>
                {!isLocked && <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  // Loading state
  if (loadingContent && !lessonContent && mode === "lesson") {
    return (
      <div className="p-4 max-w-lg mx-auto space-y-6 pt-4">
        <button onClick={backToRoadmap} className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to roadmap
        </button>
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground text-sm">Generating lesson for {selectedTopic?.title}...</p>
          <p className="text-muted-foreground text-xs">This may take a few seconds</p>
        </div>
      </div>
    );
  }

  // Lesson View
  if (mode === "lesson" && selectedTopic) {
    return (
      <div className="p-4 max-w-lg mx-auto space-y-6 pt-4">
        <div className="flex items-center gap-3">
          <button aria-label="Go back" onClick={backToRoadmap} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">{selectedTopic.title}</h1>
            <p className="text-xs text-muted-foreground capitalize">{skill.name} • {selectedTopic.level}</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key="lesson" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            {lessonContent ? (
              <>
                {/* Introduction */}
                <div className="glass-card p-5 space-y-3">
                  <h2 className="font-semibold text-foreground flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-xs text-primary-foreground">1</span>
                    Overview
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {lessonContent.introduction}
                  </p>
                </div>

                {/* Sections */}
                {lessonContent.sections.map((section, i) => (
                  <div key={i} className="glass-card p-5 space-y-3">
                    <h2 className="font-semibold text-foreground flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full gradient-accent flex items-center justify-center text-xs text-accent-foreground">
                        {i + 2}
                      </span>
                      {section.heading}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                    {section.codeExample && (
                      <div className="bg-secondary/80 rounded-lg p-4 font-mono text-xs text-foreground overflow-x-auto whitespace-pre">
                        {section.codeExample}
                      </div>
                    )}
                    {section.keyPoints.length > 0 && (
                      <div className="space-y-1.5">
                        {section.keyPoints.map((point, j) => (
                          <div key={j} className="flex items-start gap-2 text-sm text-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            {point}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Summary */}
                <div className="glass-card p-5 space-y-3">
                  <h2 className="font-semibold text-foreground flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Summary
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{lessonContent.summary}</p>
                </div>

                {/* Practice exercises */}
                {lessonContent.practiceExercises?.length > 0 && (
                  <div className="glass-card p-5 space-y-3">
                    <h2 className="font-semibold text-foreground">🏋️ Practice</h2>
                    {lessonContent.practiceExercises.map((ex, i) => (
                      <div key={i} className="p-3 rounded-lg bg-secondary/50 space-y-1">
                        <p className="text-sm text-foreground font-medium">{ex.task}</p>
                        <p className="text-xs text-muted-foreground">💡 {ex.hint}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              /* Fallback content */
              <div className="glass-card p-5 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedTopic.description}</p>
                {selectedTopic.subtopics.map((sub, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground">{sub}</span>
                  </div>
                ))}
              </div>
            )}

            <Button onClick={startQuiz} disabled={loadingContent} className="w-full gradient-primary text-primary-foreground gap-2">
              {loadingContent ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Test Your Knowledge <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // Quiz loading
  if (mode === "quiz" && (loadingContent || quizQuestions.length === 0)) {
    return (
      <div className="p-4 max-w-lg mx-auto space-y-6 pt-4">
        <button onClick={() => setMode("lesson")} className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to lesson
        </button>
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground text-sm">Generating quiz questions...</p>
        </div>
      </div>
    );
  }

  // Quiz Complete
  if (mode === "quiz-complete" && selectedTopic) {
    const totalQ = quizQuestions.length || 1;
    return (
      <div className="p-4 max-w-lg mx-auto space-y-6 pt-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4 py-8">
          <div className="text-5xl">{score >= Math.ceil(totalQ * 0.6) ? "🎉" : "📚"}</div>
          <h2 className="text-2xl font-bold text-foreground">
            {score >= Math.ceil(totalQ * 0.6) ? "Great job!" : "Keep practicing!"}
          </h2>
          <p className="text-muted-foreground">
            You scored {score}/{totalQ} on {selectedTopic.title}
          </p>
          <div className="w-32 h-32 mx-auto relative">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--secondary))" strokeWidth="8" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="8"
                strokeDasharray={`${(score / totalQ) * 251} 251`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-foreground">
              {Math.round((score / totalQ) * 100)}%
            </div>
          </div>
          <Button onClick={backToRoadmap} className="gradient-primary text-primary-foreground">
            Back to Roadmap
          </Button>
        </motion.div>
      </div>
    );
  }

  // Quiz View
  if (mode === "quiz" && currentQ && selectedTopic) {
    return (
      <div className="p-4 max-w-lg mx-auto space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <button onClick={() => setMode("lesson")} className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to lesson
          </button>
          <span className="text-sm text-muted-foreground">{quizIndex + 1}/{quizQuestions.length}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={`quiz-${quizIndex}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
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
                          ? isCorrect ? "bg-primary/20 ring-1 ring-primary"
                          : isSelected ? "bg-destructive/20 ring-1 ring-destructive"
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

              {selectedAnswer === null && (
                <button onClick={() => setHintLevel(Math.min(hintLevel + 1, 3))} className="text-sm text-primary flex items-center gap-1 hover:underline">
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
                {quizIndex < quizQuestions.length - 1 ? "Next Question" : "See Results"} <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return null;
}
