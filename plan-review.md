# Plan

1. Modify `src/components/Dashboard.tsx` to memoize expensive computations
   - The current code calculates `totalProgressSum`, `totalTopics`, `completedTopics`, `currentSkill`, `weakTopicsList`, `totalProgress`, and `currentTopic` on every render.
   - This occurs in `src/components/Dashboard.tsx` where state like `newSkill` (the input value) changes very frequently on every keystroke.
   - I will wrap this logic in a `useMemo` hook that depends only on `profile`.
   - Before applying the change, I will explicitly import `useMemo` in `src/components/Dashboard.tsx`.

2. Run Tests and Linters
   - Ensure the new `useMemo` code compiles and matches types.
   - Run `pnpm test` and `pnpm lint` to make sure changes have not introduced regressions.

3. Complete Pre-commit Steps
   - Complete pre commit steps to make sure proper testing, verifications, reviews and reflections are done.

4. Submit Pull Request
   - Submit the PR with the title: `⚡ Bolt: [performance improvement] Memoize profile derivations`
   - Include description: 💡 What:, 🎯 Why:, 📊 Impact:, 🔬 Measurement:
