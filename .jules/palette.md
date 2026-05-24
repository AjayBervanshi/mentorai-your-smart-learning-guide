## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2026-05-07 - Missing State on Time Selection Radios
**Learning:** The onboarding time selection uses custom `<button>` elements acting as a radio group. Without `aria-pressed`, `role="group"`, and `aria-label`, screen reader users cannot easily understand the context or determine which daily time option is currently selected.
**Action:** Always wrap custom radio button groups in a `role="group"` with an appropriate `aria-label`, and use `aria-pressed={isSelected}` on the individual `<button>` options.
