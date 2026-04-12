## 2024-05-24 - Accessible Names for Inputs Without Visual Labels
**Learning:** In complex inline forms or quick-add UI patterns (like the "Add Skill" inputs in Dashboard and Onboarding), visual context often replaces explicit `<label>` elements. However, these dynamically styled inputs become inaccessible to screen readers without an accessible name.
**Action:** Always ensure an `aria-label` is provided for `<Input>` components or any form control when a `<label>` element is omitted or not visually necessary for sighted users, as `placeholder` text is insufficient for accessibility.
