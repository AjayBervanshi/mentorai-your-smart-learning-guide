## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.

## 2026-05-07 - Missing aria-pressed on group toggle buttons
**Learning:** When implementing grouped toggle buttons acting as mutually exclusive selections (e.g., radio-like difficulty selection), relying solely on visual class changes leaves screen readers unaware of the current selection state.
**Action:** Explicitly provide the `aria-pressed={boolean}` attribute to indicate the current selection state, and wrap the toggles in a `role="group"` container with an appropriate `aria-label`.
