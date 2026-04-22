import fs from 'fs';
let code = fs.readFileSync('src/context/LearningContext.tsx', 'utf8');

const oldCode = `        await supabase
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
            .single();`;

const newCode = `        // ⚡ Bolt: Batch independent Supabase queries using Promise.all()
        const [
          topicUpdateResult,
          { data: allTopics },
          { data: lpData }
        ] = await Promise.all([
          supabase
            .from("user_topics")
            .update({ completed: score >= 60, score })
            .eq("id", topicId)
            .eq("user_id", userId),
          supabase
            .from("user_topics")
            .select("*")
            .eq("skill_id", skillId)
            .eq("user_id", userId),
          supabase
            .from("user_learning_profiles")
            .select("last_active_date, streak, total_xp")
            .eq("user_id", userId)
            .single()
        ]);

        if (allTopics) {
          // Adjust the completed count manually for the current topic since the select might run before the update completes
          const completed = allTopics.filter((t) => t.id === topicId ? score >= 60 : t.completed).length;
          const progress = Math.round((completed / allTopics.length) * 100);
          const current_topic_index = Math.min(completed, allTopics.length - 1);

          const updateSkillPromise = supabase
            .from("user_skills")
            .update({ progress, current_topic_index })
            .eq("id", skillId)
            .eq("user_id", userId);

          // Update XP and streak
          const today = new Date().toISOString().split("T")[0];
          const lastActive = profile?.joinedDate ? undefined : undefined; // we need to query`;

code = code.replace(oldCode, newCode);

const oldCode2 = `            await supabase
              .from("user_learning_profiles")
              .update({
                total_xp: (lpData.total_xp || 0) + score,
                streak: newStreak,
                last_active_date: today,
              })
              .eq("user_id", userId);`;

const newCode2 = `            const updateProfilePromise = supabase
              .from("user_learning_profiles")
              .update({
                total_xp: (lpData.total_xp || 0) + score,
                streak: newStreak,
                last_active_date: today,
              })
              .eq("user_id", userId);

            await Promise.all([updateSkillPromise, updateProfilePromise]);`;

code = code.replace(oldCode2, newCode2);

fs.writeFileSync('src/context/LearningContext.tsx', code);
