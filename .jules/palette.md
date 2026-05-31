## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2024-10-24 - Hidden interactive elements
**Learning:** Visually hidden interactive elements (e.g. hover-revealed delete buttons with opacity-0) are inaccessible to keyboard users because they cannot be seen when focused. Destructive actions also require confirmation to prevent accidental data loss.
**Action:** Always provide focus-visible:opacity-100 and focus-visible:ring-2 alongside focus-visible:outline-none to ensure keyboard accessibility. Wrap destructive actions in window.confirm.
