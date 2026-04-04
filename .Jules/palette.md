## 2024-04-04 - Missing ARIA Labels in Onboarding Component
**Learning:** The Onboarding component contained interactive inputs and icon-only buttons (like adding/removing skills) without proper `aria-label` attributes and visible focus states, degrading the screen reader experience.
**Action:** Add `aria-label` to all skill inputs and icon-only buttons, and ensure proper `focus-visible` states for keyboard accessibility.
