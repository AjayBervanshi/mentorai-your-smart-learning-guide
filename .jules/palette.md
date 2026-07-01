## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2024-07-01 - Add aria-pressed to skill level buttons
**Learning:** Found custom selection/radio buttons acting as toggles without proper accessibility states for screen readers, meaning blind users would not know which option is currently selected.
**Action:** Always add `aria-pressed` or `aria-checked` bound to the selected state (e.g., `aria-pressed={currentLevel === l}`) to custom selection buttons to ensure accessibility.
