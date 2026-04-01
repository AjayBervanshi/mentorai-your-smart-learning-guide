import { motion } from "framer-motion";
import { Flame, Zap, BookOpen, ChevronRight, Trophy } from "lucide-react";
import { useLearning } from "@/context/LearningContext";
import { Progress } from "@/components/ui/progress";

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { profile, setActiveSkillId } = useLearning();
  if (!profile) return null;

  const totalProgress = profile.skills.length
    ? Math.round(profile.skills.reduce((acc, s) => acc + s.progress, 0) / profile.skills.length)
    : 0;

  return (
    <div className="p-4 max-w-lg mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-1 pt-4">
        <h1 className="text-2xl font-bold text-foreground">Welcome back! 👋</h1>
        <p className="text-muted-foreground text-sm">Continue your learning journey</p>
      </motion.div>

      {/* Stats row */}
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

      {/* Skills */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Your Skills</h2>
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

      {/* Quick actions */}
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
