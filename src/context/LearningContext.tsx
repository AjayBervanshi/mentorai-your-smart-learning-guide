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
  addSkill: (name: string, level: SkillLevel) => Promise<void>;
  removeSkill: (skillId: string) => Promise<void>;
  getActiveSkill: () => UserSkill | null;
  setActiveSkillId: (id: string) => void;
  activeSkillId: string | null;
}

const LearningContext = createContext<LearningContextType | null>(null);

export function LearningProvider({ children, userId }: { children: React.ReactNode; userId: string | null }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const loadUserData = async () => {
      setLoading(true);
      try {
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
          // ⚡ Bolt: Optimized topic filtering and mapping to a single pass O(N) loop
          // instead of chained .filter().map() to avoid redundant iterations.
          const topics: Topic[] = [];
          const completedTopics: string[] = [];
          const weakTopics: string[] = [];

          if (topicRows) {
            for (const t of topicRows) {
              if (t.skill_id === s.id) {
                const topic: Topic = {
                  id: t.id,
                  title: t.title,
                  description: t.description || "",
                  level: t.level as SkillLevel,
                  completed: t.completed || false,
                  score: t.score ?? undefined,
                  subtopics: t.subtopics || ["Concept", "Examples", "Practice", "Quiz"],
                };
                topics.push(topic);

                if (topic.completed) {
                  completedTopics.push(topic.id);
                }
                if (topic.score !== undefined && topic.score < 60) {
                  weakTopics.push(topic.id);
                }
              }
            }
          }

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
        const { error: lpError } = await supabase.from("user_learning_profiles").insert({
          user_id: userId,
          goal,
          daily_time: dailyTime,
        });
        if (lpError) throw lpError;

        const userSkills: UserSkill[] = [];

        for (const s of skills) {
          const { data: skillData, error: skillError } = await supabase
            .from("user_skills")
            .insert({ user_id: userId, name: s.name, level: s.level })
            .select()
            .single();
          if (skillError) throw skillError;

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

  const addSkill = useCallback(
    async (name: string, level: SkillLevel) => {
      if (!userId || !profile) return;

      try {
        const { data: skillData, error: skillError } = await supabase
          .from("user_skills")
          .insert({ user_id: userId, name, level })
          .select()
          .single();
        if (skillError) throw skillError;

        const topicTemplates = getTopicsForSkill(name, level);
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

        const newSkill: UserSkill = {
          id: skillData.id,
          name,
          level,
          progress: 0,
          currentTopicIndex: 0,
          weakTopics: [],
          completedTopics: [],
          topics,
        };

        setProfile((prev) => {
          if (!prev) return prev;
          return { ...prev, skills: [...prev.skills, newSkill] };
        });
        setActiveSkillId(skillData.id);
      } catch (err) {
        console.error("Failed to add skill:", err);
        throw err;
      }
    },
    [userId, profile]
  );

  const removeSkill = useCallback(
    async (skillId: string) => {
      if (!userId || !profile) return;

      try {
        await supabase
          .from("user_topics")
          .delete()
          .eq("skill_id", skillId)
          .eq("user_id", userId);

        await supabase
          .from("user_skills")
          .delete()
          .eq("id", skillId)
          .eq("user_id", userId);

        setProfile((prev) => {
          if (!prev) return prev;
          const skills = prev.skills.filter((s) => s.id !== skillId);
          return { ...prev, skills };
        });

        if (activeSkillId === skillId) {
          const remaining = profile.skills.filter((s) => s.id !== skillId);
          setActiveSkillId(remaining[0]?.id ?? null);
        }
      } catch (err) {
        console.error("Failed to remove skill:", err);
        throw err;
      }
    },
    [userId, profile, activeSkillId]
  );

  const updateSkillProgress = useCallback(
    async (skillId: string, topicId: string, score: number) => {
      if (!userId) return;

      try {
        await supabase
          .from("user_topics")
          .update({ completed: score >= 60, score })
          .eq("id", topicId)
          .eq("user_id", userId);

        const { data: allTopics } = await supabase
          .from("user_topics")
          .select("*")
          .eq("skill_id", skillId)
          .eq("user_id", userId);

        if (allTopics) {
          const completed = allTopics.filter((t) => t.completed).length;
          const progress = Math.round((completed / allTopics.length) * 100);

          await supabase
            .from("user_skills")
            .update({ progress, current_topic_index: Math.min(completed, allTopics.length - 1) })
            .eq("id", skillId)
            .eq("user_id", userId);

          // Update XP and streak
          const today = new Date().toISOString().split("T")[0];
          const lastActive = profile?.joinedDate ? undefined : undefined; // we need to query

          const { data: lpData } = await supabase
            .from("user_learning_profiles")
            .select("last_active_date, streak, total_xp")
            .eq("user_id", userId)
            .single();

          if (lpData) {
            let newStreak = lpData.streak || 0;
            const lastDate = lpData.last_active_date;

            if (lastDate !== today) {
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              const yesterdayStr = yesterday.toISOString().split("T")[0];

              if (lastDate === yesterdayStr) {
                newStreak += 1;
              } else if (!lastDate) {
                newStreak = 1;
              } else {
                newStreak = 1; // reset
              }
            }

            await supabase
              .from("user_learning_profiles")
              .update({
                total_xp: (lpData.total_xp || 0) + score,
                streak: newStreak,
                last_active_date: today,
              })
              .eq("user_id", userId);

            // Update local state
            setProfile((prev) => {
              if (!prev) return prev;
              const skills = prev.skills.map((skill) => {
                if (skill.id !== skillId) return skill;
                const topics = skill.topics.map((t) =>
                  t.id === topicId ? { ...t, completed: score >= 60, score } : t
                );

                // ⚡ Bolt: Optimized local state array processing to O(N) by replacing
                // chained .filter().map() with a single pass over topics.
                let completedCount = 0;
                const completedTopics: string[] = [];
                const weakTopics: string[] = [];

                for (const t of topics) {
                  if (t.completed) {
                    completedCount++;
                    completedTopics.push(t.id);
                  }
                  if (t.score !== undefined && t.score < 60) {
                    weakTopics.push(t.id);
                  }
                }

                return {
                  ...skill,
                  topics,
                  progress: Math.round((completedCount / topics.length) * 100),
                  completedTopics,
                  weakTopics,
                  currentTopicIndex: Math.min(completedCount, topics.length - 1),
                };
              });
              return { ...prev, skills, totalXP: (lpData.total_xp || 0) + score, streak: newStreak };
            });
          }
        }
      } catch (err) {
        console.error("Failed to update progress:", err);
      }
    },
    [userId]
  );

  const getActiveSkill = useCallback(() => {
    if (!profile || !activeSkillId) return null;
    return profile.skills.find((s) => s.id === activeSkillId) ?? null;
  }, [profile, activeSkillId]);

  return (
    <LearningContext.Provider
      value={{ profile, isOnboarded: !!profile, loading, completeOnboarding, updateSkillProgress, addSkill, removeSkill, getActiveSkill, setActiveSkillId, activeSkillId }}
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
