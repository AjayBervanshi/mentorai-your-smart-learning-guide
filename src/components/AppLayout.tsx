import { useState } from "react";
import { motion } from "framer-motion";
import { Home, BookOpen, BarChart3, FolderKanban, MessageSquare, LogOut, Brain, Flame } from "lucide-react";
import Dashboard from "@/components/Dashboard";
import LearningScreen from "@/components/LearningScreen";
import ProgressScreen from "@/components/ProgressScreen";
import ProjectsScreen from "@/components/ProjectsScreen";
import InterviewScreen from "@/components/InterviewScreen";
import { useAuth } from "@/hooks/useAuth";
import { useLearning } from "@/context/LearningContext";

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "learn", label: "Learn", icon: BookOpen },
  { id: "progress", label: "Progress", icon: BarChart3 },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "interview", label: "Interview", icon: MessageSquare },
] as const;

type TabId = typeof tabs[number]["id"];

interface AppLayoutProps {
  onSwitchUser?: () => void;
}

export default function AppLayout({ onSwitchUser }: AppLayoutProps) {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const { signOut } = useAuth();
  const { profile } = useLearning();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 glass-card border-b border-border/50 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Brain className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground text-base tracking-tight">MentorAI</span>
          </div>
          <div className="flex items-center gap-3">
            {profile && profile.streak > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber/10 text-amber">
                <Flame className="w-3.5 h-3.5" />
                <span className="text-xs font-bold">{profile.streak}</span>
              </div>
            )}
            <button
              onClick={signOut}
              aria-label="Sign out"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-lg hover:bg-secondary/50"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-20">
        {activeTab === "home" && <Dashboard onNavigate={(tab) => setActiveTab(tab as TabId)} onSwitchUser={onSwitchUser} />}
        {activeTab === "learn" && <LearningScreen />}
        {activeTab === "progress" && <ProgressScreen />}
        {activeTab === "projects" && <ProjectsScreen />}
        {activeTab === "interview" && <InterviewScreen />}
      </main>

      <nav className="fixed bottom-0 inset-x-0 glass-card border-t border-border/50 backdrop-blur-xl z-50 safe-area-bottom">
        <div className="flex justify-around items-center h-16 max-w-2xl mx-auto px-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-label={tab.label}
              className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors min-w-[56px]"
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-0.5 w-8 h-0.5 rounded-full gradient-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <tab.icon className={`w-5 h-5 transition-all duration-200 ${activeTab === tab.id ? "text-primary scale-110" : "text-muted-foreground"}`} />
              <span className={`text-[10px] font-medium transition-colors duration-200 ${activeTab === tab.id ? "text-primary" : "text-muted-foreground"}`}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
