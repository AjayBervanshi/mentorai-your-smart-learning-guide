import { motion } from "framer-motion";
import { FolderKanban, Star, Lock } from "lucide-react";
import { useLearning } from "@/context/LearningContext";

const projectTemplates = [
  { title: "Build a Personal Portfolio", desc: "Create a simple portfolio showcasing your work", difficulty: "beginner" as const, minProgress: 0 },
  { title: "Calculator App", desc: "Build a functional calculator with basic operations", difficulty: "beginner" as const, minProgress: 10 },
  { title: "Todo List with Persistence", desc: "Create a task manager with local storage", difficulty: "intermediate" as const, minProgress: 30 },
  { title: "API Integration Project", desc: "Connect to a real API and display data", difficulty: "intermediate" as const, minProgress: 50 },
  { title: "Full-Stack Mini App", desc: "Build a complete app with frontend and backend", difficulty: "advanced" as const, minProgress: 70 },
  { title: "Open Source Contribution", desc: "Contribute to a real open source project", difficulty: "advanced" as const, minProgress: 85 },
];

export default function ProjectsScreen() {
  const { profile } = useLearning();
  if (!profile) return null;

  return (
    <div className="p-4 max-w-lg mx-auto space-y-6 pt-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Projects</h1>
        <p className="text-sm text-muted-foreground">Apply what you've learned with real tasks</p>
      </motion.div>

      {profile.skills.map((skill) => (
        <div key={skill.id} className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{skill.name}</h2>
          {projectTemplates.map((project, i) => {
            const unlocked = skill.progress >= project.minProgress;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`glass-card p-4 ${!unlocked ? "opacity-50" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    project.difficulty === "beginner" ? "gradient-primary" : project.difficulty === "intermediate" ? "gradient-accent" : "gradient-warm"
                  }`}>
                    {unlocked ? <FolderKanban className="w-5 h-5 text-primary-foreground" /> : <Lock className="w-5 h-5 text-primary-foreground" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground text-sm">{project.title}</span>
                      {project.difficulty === "advanced" && <Star className="w-3 h-3 text-amber" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{project.desc}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full capitalize ${
                        project.difficulty === "beginner" ? "bg-primary/20 text-primary" :
                        project.difficulty === "intermediate" ? "bg-accent/20 text-accent" :
                        "bg-amber/20 text-amber"
                      }`}>{project.difficulty}</span>
                      {!unlocked && <span className="text-[10px] text-muted-foreground">Unlocks at {project.minProgress}% progress</span>}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
