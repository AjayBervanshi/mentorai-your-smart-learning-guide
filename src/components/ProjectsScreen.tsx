import { motion } from "framer-motion";
import { FolderKanban, Star, Lock, ExternalLink } from "lucide-react";
import { useLearning } from "@/context/LearningContext";
import { getProjectsForSkill } from "@/data/skillTemplates";

export default function ProjectsScreen() {
  const { profile } = useLearning();
  if (!profile) return null;

  return (
    <div className="p-4 max-w-lg mx-auto space-y-5 pt-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Projects</h1>
        <p className="text-sm text-muted-foreground">Apply what you've learned by building real things</p>
      </motion.div>

      {profile.skills.length === 0 ? (
        <div className="glass-card p-8 text-center space-y-3">
          <FolderKanban className="w-10 h-10 text-muted-foreground mx-auto" />
          <p className="text-foreground font-medium">No skills added yet</p>
          <p className="text-sm text-muted-foreground">Add skills from the dashboard to see project ideas</p>
        </div>
      ) : (
        profile.skills.map((skill) => {
          const projects = getProjectsForSkill(skill.name);
          const unlockedCount = projects.filter(p => skill.progress >= p.minProgress).length;
          return (
            <div key={skill.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{skill.name}</h2>
                <span className="text-xs text-muted-foreground">{unlockedCount}/{projects.length} unlocked</span>
              </div>
              {projects.map((project, i) => {
                const unlocked = skill.progress >= project.minProgress;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`glass-card p-4 transition-all ${!unlocked ? "opacity-40" : "hover:ring-1 hover:ring-primary/30"}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        project.difficulty === "beginner" ? "gradient-primary" : project.difficulty === "intermediate" ? "gradient-accent" : "gradient-warm"
                      }`}>
                        {unlocked ? <FolderKanban className="w-5 h-5 text-primary-foreground" /> : <Lock className="w-5 h-5 text-primary-foreground" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground text-sm">{project.title}</span>
                          {project.difficulty === "advanced" && <Star className="w-3 h-3 text-amber shrink-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{project.desc}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full capitalize font-medium ${
                            project.difficulty === "beginner" ? "bg-primary/20 text-primary" :
                            project.difficulty === "intermediate" ? "bg-accent/20 text-accent" :
                            "bg-amber/20 text-amber"
                          }`}>{project.difficulty}</span>
                          {!unlocked && (
                            <span className="text-[10px] text-muted-foreground">Unlocks at {project.minProgress}% progress</span>
                          )}
                          {unlocked && (
                            <span className="text-[10px] text-primary font-medium flex items-center gap-0.5">
                              <ExternalLink className="w-2.5 h-2.5" /> Ready to start
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          );
        })
      )}
    </div>
  );
}
