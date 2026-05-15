## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.

## 2026-05-07 - Missing aria-pressed on grouped toggles
**Learning:** When grouped toggle buttons act as mutually exclusive selections (like difficulty levels or time commitments), relying solely on visual class changes leaves screen reader users without context of the current selection.
**Action:** Always wrap these elements in a `role="group"` (with an appropriate `aria-label` or `aria-labelledby`) and provide `aria-pressed={boolean}` on each button to explicitly indicate selection state.
