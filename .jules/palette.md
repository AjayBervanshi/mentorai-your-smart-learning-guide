## 2024-06-25 - Initial Entry
**Learning:** Initial setup.
**Action:** Ready to record UX learnings.
## 2024-06-25 - Visually Hidden Elements & Destructive Actions
**Learning:** Elements styled with opacity-0 and revealed on hover (like inline delete buttons) are invisible to keyboard navigation unless focus-visible styles are explicitly added. Also, immediate destructive actions on these buttons often lead to accidental data loss.
**Action:** Always pair group-hover:opacity-100 with focus-visible:opacity-100 focus-visible:ring-2 for keyboard accessibility. Ensure destructive inline actions are wrapped in window.confirm().
