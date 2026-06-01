## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2024-06-01 - Visually Hidden Destructive Actions
**Learning:** Visually hidden interactive elements (like `opacity-0` revealed on hover) completely break keyboard accessibility unless paired with `focus-visible:opacity-100`. Furthermore, immediate destructive actions on visually transient elements can easily lead to accidental data loss.
**Action:** Always add `focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none` to elements that use `opacity-0` for hover reveals. Always wrap destructive actions inside these elements with a confirmation dialog (e.g., `window.confirm`).
