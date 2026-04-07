import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getTopicsForSkill } from "@/data/skillTemplates";
import type { UserProfile, UserSkill, SkillLevel, UserGoal, DailyTime, Topic } from "@/types/learning";

interface LearningContextType {
  profile: UserProfile | null;
  isOnboarded: boolean;
  loading: boolean;
  completeOnboarding: (skills: { name: string; level: SkillLevel }[], goal: UserGoal, dailyTime: DailyTime) => Promise<void>;
  updateSkillProgress: (skillId: string, topicId: string, score: number) => Promise<void>;
  getActiveSkill: () => UserSkill | null;
  setActiveSkillId: (id: string) => void;
  activeSkillId: string | null;
}

const LearningContext = createContext<LearningContextType | null>(null);

export function LearningProvider({ children, userId }: { children: React.ReactNode; userId: string | null }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user data from database
  useEffect(() => {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const loadUserData = async () => {
      setLoading(true);
      try {
        // Batch independent queries for profile, skills, and topics to avoid network waterfalls
        const [
          { data: lp },
          { data: skillRows },
          { data: topicRows }
        ] = await Promise.all([
          supabase
            .from("user_learning_profiles")
            .select("*")
            .eq("user_id", userId)
            .maybeSingle(),
          supabase
            .from("user_skills")
            .select("*")
            .eq("user_id", userId),
          supabase
            .from("user_topics")
            .select("*")
            .eq("user_id", userId)
            .order("sort_order", { ascending: true })
        ]);

        if (!lp || !skillRows || skillRows.length === 0) {
          setProfile(null);
          setLoading(false);
          return;
        }

        const skills: UserSkill[] = skillRows.map((s) => {
          const topics: Topic[] = (topicRows || [])
            .filter((t) => t.skill_id === s.id)
            .map((t) => ({
              id: t.id,
              title: t.title,
              description: t.description || "",
              level: t.level as SkillLevel,
              completed: t.completed || false,
              score: t.score ?? undefined,
              subtopics: t.subtopics || ["Concept", "Examples", "Practice", "Quiz"],
            }));

          const completedTopics = topics.filter((t) => t.completed).map((t) => t.id);
          const weakTopics = topics.filter((t) => t.score !== undefined && t.score < 60).map((t) => t.id);

          return {
            id: s.id,
            name: s.name,
            level: s.level as SkillLevel,
            progress: s.progress || 0,
            currentTopicIndex: s.current_topic_index || 0,
            weakTopics,
            completedTopics,
            topics,
          };
        });

        setProfile({
          skills,
          goal: lp.goal as UserGoal,
          dailyTime: lp.daily_time as DailyTime,
          streak: lp.streak || 0,
          totalXP: lp.total_xp || 0,
          joinedDate: lp.joined_date || new Date().toISOString(),
        });

        setActiveSkillId(skills[0]?.id ?? null);
      } catch (err) {
        console.error("Failed to load user data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [userId]);

  const completeOnboarding = useCallback(
    async (skills: { name: string; level: SkillLevel }[], goal: UserGoal, dailyTime: DailyTime) => {
      if (!userId) return;

      try {
        // Insert learning profile
        const { error: lpError } = await supabase.from("user_learning_profiles").insert({
          user_id: userId,
          goal,
          daily_time: dailyTime,
        });
        if (lpError) throw lpError;

        const userSkills: UserSkill[] = [];

        for (const s of skills) {
          // Insert skill
          const { data: skillData, error: skillError } = await supabase
            .from("user_skills")
            .insert({
              user_id: userId,
              name: s.name,
              level: s.level,
            })
            .select()
            .single();
          if (skillError) throw skillError;

          // Generate topics from templates
          const topicTemplates = getTopicsForSkill(s.name, s.level);
          const topicInserts = topicTemplates.map((t, i) => ({
            skill_id: skillData.id,
            user_id: userId,
            title: t.title,
            description: t.description,
            level: t.level,
            sort_order: i,
            subtopics: t.subtopics,
          }));

          const { data: topicData, error: topicError } = await supabase
            .from("user_topics")
            .insert(topicInserts)
            .select();
          if (topicError) throw topicError;

          const topics: Topic[] = (topicData || []).map((t) => ({
            id: t.id,
            title: t.title,
            description: t.description || "",
            level: t.level as SkillLevel,
            completed: false,
            subtopics: t.subtopics || ["Concept", "Examples", "Practice", "Quiz"],
          }));

          userSkills.push({
            id: skillData.id,
            name: s.name,
            level: s.level,
            progress: 0,
            currentTopicIndex: 0,
            weakTopics: [],
            completedTopics: [],
            topics,
          });
        }

        setProfile({
          skills: userSkills,
          goal,
          dailyTime,
          streak: 0,
          totalXP: 0,
          joinedDate: new Date().toISOString(),
        });
        setActiveSkillId(userSkills[0]?.id ?? null);
      } catch (err) {
        console.error("Failed to save onboarding:", err);
        throw err;
      }
    },
    [userId]
  );

  const updateSkillProgress = useCallback(
    async (skillId: string, topicId: string, score: number) => {
      if (!userId || !profile) return;

      try {
        // Derive state locally instead of making another database read
        const skill = profile.skills.find(s => s.id === skillId);
        if (!skill) return;

        const updatedTopics = skill.topics.map(t =>
          t.id === topicId ? { ...t, completed: score >= 60, score } : t
        );

        const completedCount = updatedTopics.filter((t) => t.completed).length;
        const progress = Math.round((completedCount / updatedTopics.length) * 100);
        const currentTopicIndex = Math.min(completedCount, updatedTopics.length - 1);
        const newTotalXP = profile.totalXP + score;

        // Batch update requests
        await Promise.all([
          supabase
            .from("user_topics")
            .update({ completed: score >= 60, score })
            .eq("id", topicId)
            .eq("user_id", userId),
          supabase
            .from("user_skills")
            .update({ progress, current_topic_index: currentTopicIndex })
            .eq("id", skillId)
            .eq("user_id", userId),
          supabase
            .from("user_learning_profiles")
            .update({ total_xp: newTotalXP })
            .eq("user_id", userId)
        ]);

        // Update local state
        setProfile((prev) => {
          if (!prev) return prev;
          const skills = prev.skills.map((skill) => {
            if (skill.id !== skillId) return skill;
            const topics = skill.topics.map((t) =>
              t.id === topicId ? { ...t, completed: score >= 60, score } : t
            );
            const completedCount = topics.filter((t) => t.completed).length;
            const weak = topics.filter((t) => t.score !== undefined && t.score < 60).map((t) => t.id);
            return {
              ...skill,
              topics,
              progress: Math.round((completedCount / topics.length) * 100),
              completedTopics: topics.filter((t) => t.completed).map((t) => t.id),
              weakTopics: weak,
              currentTopicIndex: Math.min(completedCount, topics.length - 1),
            };
          });
          return { ...prev, skills, totalXP: prev.totalXP + score };
        });
      } catch (err) {
        console.error("Failed to update progress:", err);
      }
    },
    [userId, profile]
  );

  const getActiveSkill = useCallback(() => {
    if (!profile || !activeSkillId) return null;
    return profile.skills.find((s) => s.id === activeSkillId) ?? null;
  }, [profile, activeSkillId]);

  return (
    <LearningContext.Provider
      value={{ profile, isOnboarded: !!profile, loading, completeOnboarding, updateSkillProgress, getActiveSkill, setActiveSkillId, activeSkillId }}
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
