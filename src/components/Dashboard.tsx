import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Zap, BookOpen, ChevronRight, Trophy, Plus, X, Loader2 } from "lucide-react";
import { useLearning } from "@/context/LearningContext";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { findMatchingSkills, normalizeSkillName } from "@/data/skillTemplates";
import type { SkillLevel } from "@/types/learning";
import { toast } from "sonner";

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { profile, setActiveSkillId, addSkill } = useLearning();
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newLevel, setNewLevel] = useState<SkillLevel>("beginner");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [addingSkill, setAddingSkill] = useState(false);

  if (!profile) return null;

  const totalProgress = profile.skills.length
    ? Math.round(profile.skills.reduce((acc, s) => acc + s.progress, 0) / profile.skills.length)
    : 0;

  const handleAddSkill = async (name?: string) => {
    const rawName = (name || newSkill).trim();
    if (!rawName) return;

    const normalized = normalizeSkillName(rawName);
    if (!normalized) {
      toast.error("We don't recognize that skill. Try a common skill name.");
      return;
    }

    if (profile.skills.find((s) => s.name.toLowerCase() === normalized.toLowerCase())) {
      toast.error("You've already added this skill");
      return;
    }

    setAddingSkill(true);
    try {
      await addSkill(normalized, newLevel);
      if (rawName.toLowerCase() !== normalized.toLowerCase()) {
        toast.success(`Added "${normalized}"`);
      } else {
        toast.success(`${normalized} added!`);
      }
      setNewSkill("");
      setSuggestions([]);
      setShowAddSkill(false);
    } catch {
      toast.error("Failed to add skill");
    } finally {
      setAddingSkill(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-1 pt-4">
        <h1 className="text-2xl font-bold text-foreground">Welcome back! 👋</h1>
        <p className="text-muted-foreground text-sm">Continue your learning journey</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-3 gap-3">
        <div className="glass-card p-3 text-center">
          <Flame className="w-5 h-5 text-amber mx-auto mb-1" />
          <div className="text-xl font-bold text-foreground">{profile.streak}</div>
          <div className="text-[10px] text-muted-foreground">Day Streak</div>
        </div>
        <div className="glass-card p-3 text-center">
          <Zap className="w-5 h-5 text-primary mx-auto mb-1" />
          <div className="text-xl font-bold text-foreground">{profile.totalXP}</div>
          <div className="text-[10px] text-muted-foreground">Total XP</div>
        </div>
        <div className="glass-card p-3 text-center">
          <Trophy className="w-5 h-5 text-violet mx-auto mb-1" />
          <div className="text-xl font-bold text-foreground">{totalProgress}%</div>
          <div className="text-[10px] text-muted-foreground">Overall</div>
        </div>
      </motion.div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Your Skills</h2>
          <button
            onClick={() => setShowAddSkill(!showAddSkill)}
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <Plus className="w-3.5 h-3.5" /> Add Skill
          </button>
        </div>

        <AnimatePresence>
          {showAddSkill && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="glass-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Add a new skill</span>
                <button aria-label="Close add skill form" onClick={() => setShowAddSkill(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="relative">
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g. Python, Docker..."
                    value={newSkill}
                    onChange={(e) => {
                      setNewSkill(e.target.value);
                      if (e.target.value.trim().length >= 2) {
                        setSuggestions(findMatchingSkills(e.target.value));
                      } else {
                        setSuggestions([]);
                      }
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                    className="bg-secondary border-border"
                  />
                  <Button aria-label="Add skill" onClick={() => handleAddSkill()} disabled={addingSkill} size="icon" className="gradient-primary shrink-0 text-primary-foreground">
                    {addingSkill ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-5 h-5" />}
                  </Button>
                </div>
                {suggestions.length > 0 && newSkill.trim().length >= 2 && (
                  <div className="absolute top-full left-0 right-12 mt-1 glass-card p-1 z-10">
                    {suggestions.map((s) => (
                      <button key={s} onClick={() => handleAddSkill(s)} className="w-full text-left px-3 py-2 rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors">
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                {(["beginner", "intermediate", "advanced"] as SkillLevel[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setNewLevel(l)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                      newLevel === l ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {profile.skills.map((skill, i) => {
          const currentTopic = skill.topics[skill.currentTopicIndex];
          return (
            <motion.button
              key={skill.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              onClick={() => {
                setActiveSkillId(skill.id);
                onNavigate("learn");
              }}
              className="w-full glass-card p-4 text-left hover:ring-1 hover:ring-primary/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{skill.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">{skill.level}</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <Progress value={skill.progress} className="h-2 mb-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{skill.progress}% complete</span>
                {currentTopic && <span>Next: {currentTopic.title}</span>}
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => onNavigate("projects")} className="glass-card p-4 text-left hover:ring-1 hover:ring-primary/30 transition-all">
          <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center mb-2">
            <span className="text-sm">🛠</span>
          </div>
          <div className="text-sm font-semibold text-foreground">Projects</div>
          <div className="text-xs text-muted-foreground">Build real things</div>
        </button>
        <button onClick={() => onNavigate("interview")} className="glass-card p-4 text-left hover:ring-1 hover:ring-primary/30 transition-all">
          <div className="w-8 h-8 rounded-lg gradient-warm flex items-center justify-center mb-2">
            <span className="text-sm">🎤</span>
          </div>
          <div className="text-sm font-semibold text-foreground">Interview Prep</div>
          <div className="text-xs text-muted-foreground">Get job-ready</div>
        </button>
      </div>
    </div>
  );
}
