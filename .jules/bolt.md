## 2024-03-24 - [Optimize Network Waterfalls in DB Writes]
**Learning:** Found an anti-pattern in `completeOnboarding` and `updateSkillProgress` where database operations (like inserting skills/topics and updating progress/xp) were performed sequentially in loops or distinct await blocks, causing a network waterfall and slowing down UI interaction.
**Action:** Use `Promise.all` to parallelize independent database write/update operations when possible to minimize network latency on the client side.
