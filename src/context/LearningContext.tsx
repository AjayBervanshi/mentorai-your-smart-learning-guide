import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { UserProfile, UserSkill, SkillLevel, UserGoal, DailyTime, Topic, AppState } from "@/types/learning";

interface LearningContextType {
  appState: AppState;
  profile: UserProfile | null;
  isOnboarded: boolean;
  completeOnboarding: (name: string, skills: { name: string; level: SkillLevel }[], goal: UserGoal, dailyTime: DailyTime) => void;
  updateSkillProgress: (skillId: string, topicId: string, score: number) => void;
  getActiveSkill: () => UserSkill | null;
  setActiveSkillId: (id: string) => void;
  activeSkillId: string | null;
  switchUser: (userId: string | null) => void;
  deleteUser: (userId: string) => void;
}

const LearningContext = createContext<LearningContextType | null>(null);

const generateTopics = (skillName: string, level: SkillLevel): Topic[] => {
  const topicSets: Record<string, { title: string; desc: string; level: SkillLevel }[]> = {
    default: [
      { title: `Introduction to ${skillName}`, desc: "Overview and fundamentals", level: "beginner" },
      { title: "Core Concepts", desc: "Essential building blocks", level: "beginner" },
      { title: "Basic Syntax & Structure", desc: "Learn the basic patterns", level: "beginner" },
      { title: "Working with Data", desc: "Data types and manipulation", level: "beginner" },
      { title: "Control Flow", desc: "Logic and decision making", level: "beginner" },
      { title: "Functions & Modules", desc: "Organizing your code", level: "intermediate" },
      { title: "Error Handling", desc: "Dealing with problems gracefully", level: "intermediate" },
      { title: "Best Practices", desc: "Industry patterns and standards", level: "intermediate" },
      { title: "Real-world Applications", desc: "Building practical solutions", level: "intermediate" },
      { title: "Testing & Debugging", desc: "Ensuring quality", level: "intermediate" },
      { title: "Advanced Patterns", desc: "Expert-level techniques", level: "advanced" },
      { title: "Performance Optimization", desc: "Making things fast", level: "advanced" },
      { title: "System Design", desc: "Architecture and scalability", level: "advanced" },
      { title: "Professional Workflow", desc: "Team collaboration and tools", level: "advanced" },
      { title: `Mastering ${skillName}`, desc: "Capstone and mastery", level: "advanced" },
    ],
  };

  const topics = topicSets.default;
  const startIndex = level === "beginner" ? 0 : level === "intermediate" ? 5 : 10;

  return topics.slice(startIndex).map((t, i) => ({
    id: `${skillName.toLowerCase().replace(/\s/g, "-")}-topic-${i}`,
    title: t.title,
    description: t.desc,
    level: t.level,
    completed: false,
    subtopics: ["Concept", "Examples", "Practice", "Quiz"],
  }));
};

const STORAGE_KEY = "skill-tracker-app-state";

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [appState, setAppState] = useState<AppState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse stored state", e);
      }
    }
    return { users: [], activeUserId: null };
  });

  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  }, [appState]);

  const profile = appState.activeUserId ? (appState.users.find(u => u.id === appState.activeUserId) || null) : null;

  const updateProfile = useCallback((updater: (p: UserProfile) => UserProfile) => {
    setAppState(prev => {
      if (!prev.activeUserId) return prev;
      return {
        ...prev,
        users: prev.users.map(u => u.id === prev.activeUserId ? updater(u) : u)
      };
    });
  }, []);

  const completeOnboarding = useCallback(
    (name: string, skills: { name: string; level: SkillLevel }[], goal: UserGoal, dailyTime: DailyTime) => {
      const userSkills: UserSkill[] = skills.map((s) => ({
        id: s.name.toLowerCase().replace(/\s/g, "-"),
        name: s.name,
        level: s.level,
        progress: 0,
        currentTopicIndex: 0,
        weakTopics: [],
        completedTopics: [],
        topics: generateTopics(s.name, s.level),
      }));

      const newUser: UserProfile = {
        id: crypto.randomUUID(),
        name,
        skills: userSkills,
        goal,
        dailyTime,
        streak: 0,
        totalXP: 0,
        joinedDate: new Date().toISOString(),
        lastActive: new Date().toISOString()
      };

      setAppState(prev => ({
        users: [...prev.users, newUser],
        activeUserId: newUser.id
      }));
      setActiveSkillId(userSkills[0]?.id ?? null);
    },
    []
  );

  const updateSkillProgress = useCallback(
    (skillId: string, topicId: string, score: number) => {
      updateProfile((prev) => {
        const skills = prev.skills.map((skill) => {
          if (skill.id !== skillId) return skill;
          const topics = skill.topics.map((t) =>
            t.id === topicId ? { ...t, completed: score >= 60, score } : t
          );
          const completed = topics.filter((t) => t.completed).length;
          const weak = topics.filter((t) => t.score !== undefined && t.score < 60).map((t) => t.id);
          return {
            ...skill,
            topics,
            progress: Math.round((completed / topics.length) * 100),
            completedTopics: topics.filter((t) => t.completed).map((t) => t.id),
            weakTopics: weak,
            currentTopicIndex: Math.min(completed, topics.length - 1),
          };
        });
        return {
          ...prev,
          skills,
          totalXP: prev.totalXP + score,
          lastActive: new Date().toISOString()
        };
      });
    },
    [updateProfile]
  );

  const getActiveSkill = useCallback(() => {
    if (!profile || !activeSkillId) return null;
    return profile.skills.find((s) => s.id === activeSkillId) ?? null;
  }, [profile, activeSkillId]);

  const switchUser = useCallback((userId: string | null) => {
    setAppState(prev => ({ ...prev, activeUserId: userId }));
    if (userId) {
      updateProfile(p => ({ ...p, lastActive: new Date().toISOString() }));
    }
  }, [updateProfile]);

  const deleteUser = useCallback((userId: string) => {
    setAppState(prev => ({
      users: prev.users.filter(u => u.id !== userId),
      activeUserId: prev.activeUserId === userId ? null : prev.activeUserId
    }));
  }, []);

  return (
    <LearningContext.Provider
      value={{
        appState,
        profile,
        isOnboarded: !!profile,
        completeOnboarding,
        updateSkillProgress,
        getActiveSkill,
        setActiveSkillId,
        activeSkillId,
        switchUser,
        deleteUser
      }}
    >
      {children}
    </LearningContext.Provider>
  );
}

export const useLearning = () => {
  const ctx = useContext(LearningContext);
  if (!ctx) throw new Error("useLearning must be used within LearningProvider");
  return ctx;
};
