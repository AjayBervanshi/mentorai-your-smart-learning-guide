import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Zap, BookOpen, ChevronRight, Trophy, Plus, X, Loader2, Trash2, Target, Clock } from "lucide-react";
import { useLearning } from "@/context/LearningContext";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { findMatchingSkills, normalizeSkillName } from "@/data/skillTemplates";
import type { SkillLevel } from "@/types/learning";
import { toast } from "sonner";

interface DashboardProps {
  onNavigate: (tab: string) => void;
  onSwitchUser?: () => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { profile, setActiveSkillId, addSkill, removeSkill } = useLearning();
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newLevel, setNewLevel] = useState<SkillLevel>("beginner");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [addingSkill, setAddingSkill] = useState(false);

  if (!profile) return null;

  // ⚡ Bolt: Optimized local state array processing to O(N) by replacing
  // multiple .reduce() and .find() calls with a single pass.
  let totalProgressSum = 0;
  let totalTopics = 0;
  let completedTopics = 0;
  let currentSkill: typeof profile.skills[0] | undefined = undefined;

  for (const skill of profile.skills) {
    totalProgressSum += skill.progress;
    totalTopics += skill.topics.length;
    completedTopics += skill.completedTopics.length;
    if (!currentSkill && skill.progress < 100) {
      currentSkill = skill;
    }
  }

  if (!currentSkill && profile.skills.length > 0) {
    currentSkill = profile.skills[0];
  }

  const totalProgress = profile.skills.length
    ? Math.round(totalProgressSum / profile.skills.length)
    : 0;

  const currentTopic = currentSkill?.topics[currentSkill.currentTopicIndex];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const handleAddSkill = async (name?: string) => {
    const rawName = (name || newSkill).trim();
    if (!rawName) return;

    const normalized = normalizeSkillName(rawName);
    if (!normalized) return;

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
    <div className="p-4 max-w-lg mx-auto space-y-5">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-1 pt-2">
        <h1 className="text-2xl font-bold text-foreground">{getGreeting()}! 👋</h1>
        <p className="text-muted-foreground text-sm">
          {profile.streak > 0
            ? `You're on a ${profile.streak}-day streak. Keep it going!`
            : "Start learning today to build your streak!"}
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="grid grid-cols-3 gap-3">
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

      {/* Continue learning CTA */}
      {currentSkill && currentTopic && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => {
            setActiveSkillId(currentSkill.id);
            onNavigate("learn");
          }}
          className="w-full glass-card p-4 text-left hover:ring-1 hover:ring-primary/40 transition-all group relative overflow-hidden"
        >
          <div className="absolute inset-0 gradient-primary opacity-[0.04]" />
          <div className="relative flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-primary font-semibold uppercase tracking-wider mb-0.5">Continue Learning</div>
              <div className="font-semibold text-foreground truncate">{currentTopic.title}</div>
              <div className="text-xs text-muted-foreground">{currentSkill.name} &middot; {currentSkill.progress}% complete</div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
          </div>
        </motion.button>
      )}

      {/* Daily goal progress */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Today's Progress</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {profile.dailyTime} min/day goal
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Progress value={Math.min((completedTopics / Math.max(totalTopics, 1)) * 100, 100)} className="h-2 flex-1" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{completedTopics}/{totalTopics} topics</span>
        </div>
      </motion.div>

      {/* Skills section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Your Skills</h2>
          <button
            onClick={() => setShowAddSkill(!showAddSkill)}
            className="flex items-center gap-1 text-xs text-primary hover:underline font-medium"
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
                    aria-label="New skill name"
                    placeholder="e.g. Cooking, Python, LLM, Spanish..."
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
                      newLevel === l ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {profile.skills.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-8 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-muted-foreground mx-auto" />
            <p className="text-foreground font-medium">No skills added yet</p>
            <Button onClick={() => setShowAddSkill(true)} className="mt-2 gradient-primary text-primary-foreground">
              Add Your First Skill
            </Button>
          </motion.div>
        ) : (
          profile.skills.map((skill, i) => {
            const nextTopic = skill.topics[skill.currentTopicIndex];
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
                      <div className="text-xs text-muted-foreground capitalize">{skill.level} &middot; {skill.completedTopics.length}/{skill.topics.length} topics</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      aria-label="Delete skill"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSkill(skill.id).then(() => toast.success(`${skill.name} removed`)).catch(() => toast.error("Failed to remove skill"));
                      }}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
                <Progress value={skill.progress} className="h-2 mb-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{skill.progress}% complete</span>
                  {nextTopic && <span className="truncate ml-2">Next: {nextTopic.title}</span>}
                </div>
              </motion.button>
            );
          })
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => onNavigate("projects")} className="glass-card p-4 text-left hover:ring-1 hover:ring-primary/30 transition-all group">
          <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center mb-2">
            <span className="text-sm">🛠</span>
          </div>
          <div className="text-sm font-semibold text-foreground">Projects</div>
          <div className="text-xs text-muted-foreground">Build real things</div>
        </button>
        <button onClick={() => onNavigate("interview")} className="glass-card p-4 text-left hover:ring-1 hover:ring-primary/30 transition-all group">
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
