import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, CheckCircle2, Flame, Zap, Award } from "lucide-react";
import { useLearning } from "@/context/LearningContext";
import { Progress } from "@/components/ui/progress";

export default function ProgressScreen() {
  const { profile } = useLearning();
  if (!profile) return null;

  // ⚡ Bolt: Optimized array processing to O(N) by combining multiple
  // .reduce() passes into a single pass over the skills array.
  let totalTopics = 0;
  let completedTopics = 0;

  for (const skill of profile.skills) {
    totalTopics += skill.topics.length;
    completedTopics += skill.completedTopics.length;
  }

  const overallProgress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  const milestones = [
    { label: "First Steps", threshold: 1, icon: "🚀" },
    { label: "On a Roll", threshold: 5, icon: "🔥" },
    { label: "Halfway There", threshold: Math.ceil(totalTopics / 2), icon: "⭐" },
    { label: "Almost Done", threshold: Math.ceil(totalTopics * 0.8), icon: "💪" },
    { label: "Master Learner", threshold: totalTopics, icon: "🏆" },
  ];

  return (
    <div className="p-4 max-w-lg mx-auto space-y-5 pt-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Your Progress</h1>
        <p className="text-sm text-muted-foreground">See how far you've come</p>
      </motion.div>

      {/* Overview card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-foreground">Overall Progress</div>
            <div className="text-xs text-muted-foreground">{profile.skills.length} skill{profile.skills.length !== 1 ? "s" : ""} &middot; {completedTopics}/{totalTopics} topics</div>
          </div>
          <span className="text-2xl font-bold text-primary">{overallProgress}%</span>
        </div>
        <Progress value={overallProgress} className="h-2.5" />

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-lg bg-secondary/50">
            <Flame className="w-4 h-4 text-amber mx-auto mb-1" />
            <div className="text-lg font-bold text-foreground">{profile.streak}</div>
            <div className="text-[10px] text-muted-foreground">Day Streak</div>
          </div>
          <div className="p-3 rounded-lg bg-secondary/50">
            <Zap className="w-4 h-4 text-primary mx-auto mb-1" />
            <div className="text-lg font-bold text-foreground">{profile.totalXP}</div>
            <div className="text-[10px] text-muted-foreground">Total XP</div>
          </div>
          <div className="p-3 rounded-lg bg-secondary/50">
            <Award className="w-4 h-4 text-violet mx-auto mb-1" />
            <div className="text-lg font-bold text-foreground">{completedTopics}</div>
            <div className="text-[10px] text-muted-foreground">Completed</div>
          </div>
        </div>
      </motion.div>

      {/* Milestones */}
      {totalTopics > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5 space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Milestones</h2>
          <div className="flex items-center gap-1.5">
            {milestones.map((m, i) => {
              const unlocked = completedTopics >= m.threshold;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all ${
                    unlocked ? "bg-primary/20 scale-110" : "bg-secondary/50 opacity-40 grayscale"
                  }`}>
                    {m.icon}
                  </div>
                  <span className={`text-[9px] text-center leading-tight ${unlocked ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {m.label}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Per-skill breakdown */}
      {profile.skills.map((skill, i) => (
        <motion.div
          key={skill.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + i * 0.05 }}
          className="glass-card p-5 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">{skill.name}</h3>
              <p className="text-xs text-muted-foreground capitalize">{skill.level}</p>
            </div>
            <span className="text-lg font-bold text-primary">{skill.progress}%</span>
          </div>
          <Progress value={skill.progress} className="h-2" />

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-secondary/50">
              <div className="font-bold text-foreground">{skill.completedTopics.length}</div>
              <div className="text-muted-foreground">Done</div>
            </div>
            <div className="p-2 rounded-lg bg-secondary/50">
              <div className="font-bold text-foreground">{skill.topics.length - skill.completedTopics.length}</div>
              <div className="text-muted-foreground">Remaining</div>
            </div>
            <div className="p-2 rounded-lg bg-secondary/50">
              <div className="font-bold text-foreground">{skill.weakTopics.length}</div>
              <div className="text-muted-foreground">Need Review</div>
            </div>
          </div>

          <div className="space-y-1.5">
            {skill.topics.map((topic) => (
              <div key={topic.id} className="flex items-center gap-2 text-sm py-0.5">
                {topic.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                ) : skill.weakTopics.includes(topic.id) ? (
                  <AlertTriangle className="w-4 h-4 text-amber shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-border shrink-0" />
                )}
                <span className={`flex-1 ${topic.completed ? "text-muted-foreground line-through" : "text-foreground"}`}>{topic.title}</span>
                {topic.score !== undefined && (
                  <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${topic.score >= 60 ? "bg-primary/10 text-primary" : "bg-amber/10 text-amber"}`}>
                    {topic.score}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
