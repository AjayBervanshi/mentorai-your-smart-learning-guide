import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Target, Clock, Sparkles, Plus, X, ChevronRight, Briefcase, TrendingUp, Rocket, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { SkillLevel, UserGoal, DailyTime } from "@/types/learning";
import { useLearning } from "@/context/LearningContext";
import { findMatchingSkills, normalizeSkillName } from "@/data/skillTemplates";
import { toast } from "sonner";

const steps = ["skills", "level", "goal", "time"] as const;
type Step = typeof steps[number];

const stepLabels = {
  skills: "Skills",
  level: "Level",
  goal: "Goal",
  time: "Time",
};

export default function Onboarding() {
  const { completeOnboarding } = useLearning();
  const [step, setStep] = useState<Step>("skills");
  const [skills, setSkills] = useState<{ name: string; level: SkillLevel }[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [currentLevel, setCurrentLevel] = useState<SkillLevel>("beginner");
  const [goal, setGoal] = useState<UserGoal>("job");
  const [dailyTime, setDailyTime] = useState<DailyTime>(30);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const handleSkillInput = (value: string) => {
    setCurrentSkill(value);
    if (value.trim().length >= 2) {
      setSuggestions(findMatchingSkills(value));
    } else {
      setSuggestions([]);
    }
  };

  const addSkill = (name?: string) => {
    const rawName = (name || currentSkill).trim();
    if (!rawName) return;

    const normalized = normalizeSkillName(rawName);
    if (!normalized) return;

    if (skills.find((s) => s.name.toLowerCase() === normalized.toLowerCase())) {
      toast.error("You've already added this skill");
      return;
    }

    if (rawName.toLowerCase() !== normalized.toLowerCase()) {
      toast.success(`Added as "${normalized}"`);
    }

    setSkills([...skills, { name: normalized, level: currentLevel }]);
    setCurrentSkill("");
    setSuggestions([]);
  };

  const removeSkill = (name: string) => setSkills(skills.filter((s) => s.name !== name));

  const next = async () => {
    const i = steps.indexOf(step);
    if (i < steps.length - 1) {
      setStep(steps[i + 1]);
    } else {
      setSaving(true);
      try {
        await completeOnboarding(skills, goal, dailyTime);
      } catch {
        toast.error("Failed to save. Please try again.");
      } finally {
        setSaving(false);
      }
    }
  };

  const prev = () => {
    const i = steps.indexOf(step);
    if (i > 0) setStep(steps[i - 1]);
  };

  const canNext = step === "skills" ? skills.length > 0 : true;
  const stepIndex = steps.indexOf(step);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
        {/* Step indicator with labels */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex-1 flex flex-col items-center gap-1.5">
              <div className={`w-full h-1.5 rounded-full transition-all duration-500 ${
                i < stepIndex ? "gradient-primary" : i === stepIndex ? "gradient-primary" : "bg-secondary"
              }`} />
              <span className={`text-[10px] font-medium transition-colors ${
                i <= stepIndex ? "text-primary" : "text-muted-foreground"
              }`}>
                {stepLabels[s]}
              </span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
            {step === "skills" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-4">
                    <Brain className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h1 className="text-3xl font-bold text-foreground">What do you want to learn?</h1>
                  <p className="text-muted-foreground">Anything — coding, cooking, languages, music, AI, fitness, business, or anything else. Type any skill!</p>
                </div>

                <div className="relative">
                  <div className="flex gap-2">
                    <Input
                      aria-label="Type a skill name"
                      placeholder="Type a skill name..."
                      value={currentSkill}
                      onChange={(e) => handleSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addSkill()}
                      className="bg-secondary border-border h-11"
                    />
                    <Button aria-label="Add skill" onClick={() => addSkill()} size="icon" className="gradient-primary shrink-0 text-primary-foreground h-11 w-11">
                      <Plus className="w-5 h-5" />
                    </Button>
                  </div>

                  {suggestions.length > 0 && currentSkill.trim().length >= 2 && (
                    <div className="absolute top-full left-0 right-12 mt-1 glass-card p-1 z-10 max-h-48 overflow-y-auto">
                      {suggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => addSkill(s)}
                          className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <span className="text-xs text-muted-foreground self-center mr-1">Level:</span>
                  {(["beginner", "intermediate", "advanced"] as SkillLevel[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => setCurrentLevel(l)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                        currentLevel === l ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>

                {skills.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">{skills.length} skill{skills.length > 1 ? "s" : ""} selected</p>
                    {skills.map((s) => (
                      <motion.div key={s.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-primary" />
                          <span className="font-medium text-foreground">{s.name}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary capitalize">{s.level}</span>
                        </div>
                        <button aria-label="Remove skill" onClick={() => removeSkill(s.name)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                          <X className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {step === "level" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center mb-4">
                    <Sparkles className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <h1 className="text-3xl font-bold text-foreground">Fine-tune your levels</h1>
                  <p className="text-muted-foreground">We'll adjust the roadmap difficulty for each skill based on your selection.</p>
                </div>
                <div className="space-y-3">
                  {skills.map((s, idx) => (
                    <div key={s.name} className="glass-card p-4 space-y-3">
                      <span className="font-semibold text-foreground">{s.name}</span>
                      <div className="flex gap-2">
                        {(["beginner", "intermediate", "advanced"] as SkillLevel[]).map((l) => (
                          <button
                            key={l}
                            onClick={() => {
                              const updated = [...skills];
                              updated[idx] = { ...updated[idx], level: l };
                              setSkills(updated);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all capitalize flex-1 ${
                              s.level === l ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === "goal" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="w-14 h-14 rounded-2xl gradient-warm flex items-center justify-center mb-4">
                    <Target className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h1 className="text-3xl font-bold text-foreground">What's your goal?</h1>
                  <p className="text-muted-foreground">This helps us personalize your learning path and project suggestions.</p>
                </div>
                <div className="space-y-3">
                  {([
                    { value: "job" as UserGoal, icon: Briefcase, title: "Get a Job", desc: "Prepare for interviews and land a role" },
                    { value: "freelance" as UserGoal, icon: Rocket, title: "Freelance", desc: "Start earning independently" },
                    { value: "growth" as UserGoal, icon: TrendingUp, title: "Skill Growth", desc: "Level up for personal development" },
                  ]).map((g) => (
                    <button
                      key={g.value}
                      onClick={() => setGoal(g.value)}
                      className={`w-full glass-card p-4 flex items-center gap-4 text-left transition-all ${
                        goal === g.value ? "ring-2 ring-primary glow-primary" : "hover:bg-secondary/50"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${goal === g.value ? "gradient-primary" : "bg-secondary"}`}>
                        <g.icon className={`w-5 h-5 ${goal === g.value ? "text-primary-foreground" : "text-muted-foreground"}`} />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground">{g.title}</div>
                        <div className="text-sm text-muted-foreground">{g.desc}</div>
                      </div>
                      {goal === g.value && <Check className="w-5 h-5 text-primary shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === "time" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-4">
                    <Clock className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h1 className="text-3xl font-bold text-foreground">How much time per day?</h1>
                  <p className="text-muted-foreground">Even 15 minutes daily adds up. Consistency beats intensity.</p>
                </div>
                <div className="space-y-3">
                  {([
                    { value: 15 as DailyTime, label: "15 minutes", desc: "Quick daily sessions — perfect for busy schedules" },
                    { value: 30 as DailyTime, label: "30 minutes", desc: "Recommended — steady, sustainable progress" },
                    { value: 60 as DailyTime, label: "60 minutes", desc: "Deep learning — fastest results" },
                  ]).map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setDailyTime(t.value)}
                      className={`w-full glass-card p-4 flex items-center gap-4 text-left transition-all ${
                        dailyTime === t.value ? "ring-2 ring-primary glow-primary" : "hover:bg-secondary/50"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${dailyTime === t.value ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                        {t.value}m
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground">{t.label}</div>
                        <div className="text-sm text-muted-foreground">{t.desc}</div>
                      </div>
                      {dailyTime === t.value && <Check className="w-5 h-5 text-primary shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          <Button variant="ghost" onClick={prev} disabled={stepIndex === 0} className="text-muted-foreground">
            Back
          </Button>
          <Button onClick={next} disabled={!canNext || saving} className="gradient-primary text-primary-foreground gap-2 px-6">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {saving ? "Setting up..." : stepIndex === steps.length - 1 ? "Start Learning" : "Continue"}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
