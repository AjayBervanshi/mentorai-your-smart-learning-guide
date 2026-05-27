## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2024-05-27 - Hidden Delete Button Keyboard Accessibility and Destructive Actions
**Learning:** Visually hidden interactive elements (e.g., using `opacity-0` revealed on hover) break keyboard accessibility because they remain invisible when focused. Additionally, destructive actions (like deleting a skill) without a confirmation step can lead to accidental data loss.
**Action:** Ensure elements hidden with `opacity-0` also include `focus-visible:opacity-100` alongside `focus-visible:ring-2` to be visible to keyboard navigation. Wrap destructive actions in `window.confirm` to prevent accidents.
