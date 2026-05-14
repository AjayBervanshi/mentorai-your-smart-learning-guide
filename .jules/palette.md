## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2026-05-07 - Accessibility of Grouped Toggle Buttons
**Learning:** When implementing grouped toggle buttons acting as mutually exclusive selections (e.g., radio-like difficulty selection), visually toggling classes is insufficient for accessibility.
**Action:** Explicitly provide the `aria-pressed={boolean}` attribute to indicate the current selection state to screen readers and wrap them in a `role="group"` where appropriate.
