import React, { createContext, useContext, useState, useCallback } from "react";
import type { UserProfile, UserSkill, SkillLevel, UserGoal, DailyTime, Topic } from "@/types/learning";

interface LearningContextType {
  profile: UserProfile | null;
  isOnboarded: boolean;
  completeOnboarding: (skills: { name: string; level: SkillLevel }[], goal: UserGoal, dailyTime: DailyTime) => void;
  updateSkillProgress: (skillId: string, topicId: string, score: number) => void;
  getActiveSkill: () => UserSkill | null;
  setActiveSkillId: (id: string) => void;
  activeSkillId: string | null;
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

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);

  const completeOnboarding = useCallback(
    (skills: { name: string; level: SkillLevel }[], goal: UserGoal, dailyTime: DailyTime) => {
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

      setProfile({
        skills: userSkills,
        goal,
        dailyTime,
        streak: 0,
        totalXP: 0,
        joinedDate: new Date().toISOString(),
      });
      setActiveSkillId(userSkills[0]?.id ?? null);
    },
    []
  );

  const updateSkillProgress = useCallback(
    (skillId: string, topicId: string, score: number) => {
      setProfile((prev) => {
        if (!prev) return prev;
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
        return { ...prev, skills, totalXP: prev.totalXP + score };
      });
    },
    []
  );

  const getActiveSkill = useCallback(() => {
    if (!profile || !activeSkillId) return null;
    return profile.skills.find((s) => s.id === activeSkillId) ?? null;
  }, [profile, activeSkillId]);

  return (
    <LearningContext.Provider
      value={{ profile, isOnboarded: !!profile, completeOnboarding, updateSkillProgress, getActiveSkill, setActiveSkillId, activeSkillId }}
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
