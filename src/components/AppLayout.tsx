import { useState } from "react";
import { motion } from "framer-motion";
import { Home, BookOpen, BarChart3, FolderKanban, MessageSquare } from "lucide-react";
import Dashboard from "@/components/Dashboard";
import LearningScreen from "@/components/LearningScreen";
import ProgressScreen from "@/components/ProgressScreen";
import ProjectsScreen from "@/components/ProjectsScreen";
import InterviewScreen from "@/components/InterviewScreen";

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "learn", label: "Learn", icon: BookOpen },
  { id: "progress", label: "Progress", icon: BarChart3 },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "interview", label: "Interview", icon: MessageSquare },
] as const;

type TabId = typeof tabs[number]["id"];

export default function AppLayout() {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 overflow-y-auto pb-20">
        {activeTab === "home" && <Dashboard onNavigate={(tab) => setActiveTab(tab as TabId)} />}
        {activeTab === "learn" && <LearningScreen />}
        {activeTab === "progress" && <ProgressScreen />}
        {activeTab === "projects" && <ProjectsScreen />}
        {activeTab === "interview" && <InterviewScreen />}
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 inset-x-0 glass-card border-t border-border/50 backdrop-blur-xl z-50">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex flex-col items-center gap-1 px-3 py-1"
            >
              {activeTab === tab.id && (
                <motion.div layoutId="nav-indicator" className="absolute -top-0.5 w-8 h-0.5 rounded-full gradient-primary" />
              )}
              <tab.icon className={`w-5 h-5 transition-colors ${activeTab === tab.id ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-[10px] font-medium transition-colors ${activeTab === tab.id ? "text-primary" : "text-muted-foreground"}`}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
