import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useLearning } from "@/context/LearningContext";
import { Progress } from "@/components/ui/progress";

export default function ProgressScreen() {
  const { profile } = useLearning();
  if (!profile) return null;

  return (
    <div className="p-4 max-w-lg mx-auto space-y-6 pt-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Progress</h1>
        <p className="text-sm text-muted-foreground">Track your learning journey</p>
      </motion.div>

      {/* Overall stats */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <div className="font-semibold text-foreground">Overall Progress</div>
            <div className="text-xs text-muted-foreground">{profile.skills.length} skill{profile.skills.length !== 1 ? "s" : ""} in progress</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 rounded-lg bg-secondary/50">
            <div className="text-2xl font-bold text-foreground">{profile.totalXP}</div>
            <div className="text-xs text-muted-foreground">Total XP</div>
          </div>
          <div className="p-3 rounded-lg bg-secondary/50">
            <div className="text-2xl font-bold text-foreground">{profile.skills.reduce((a, s) => a + s.completedTopics.length, 0)}</div>
            <div className="text-xs text-muted-foreground">Topics Done</div>
          </div>
        </div>
      </motion.div>

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
            <h3 className="font-semibold text-foreground">{skill.name}</h3>
            <span className="text-sm font-bold text-primary">{skill.progress}%</span>
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
              <div className="text-muted-foreground">Weak</div>
            </div>
          </div>

          {/* Topic list */}
          <div className="space-y-1.5">
            {skill.topics.map((topic) => (
              <div key={topic.id} className="flex items-center gap-2 text-sm">
                {topic.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                ) : skill.weakTopics.includes(topic.id) ? (
                  <AlertTriangle className="w-4 h-4 text-amber shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-border shrink-0" />
                )}
                <span className={topic.completed ? "text-muted-foreground line-through" : "text-foreground"}>{topic.title}</span>
                {topic.score !== undefined && (
                  <span className={`ml-auto text-xs font-medium ${topic.score >= 60 ? "text-primary" : "text-amber"}`}>{topic.score}%</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
