## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2025-06-24 - Accessible and Safe Destructive Actions
**Learning:** Visually hidden interactive elements (like hover-revealed delete buttons with `opacity-0`) must be accessible via keyboard (`focus-visible:opacity-100`). Destructive actions must also be wrapped in a confirmation dialog (`window.confirm`) to prevent accidental data loss, especially when they are easily clickable.
**Action:** Always verify keyboard accessibility of visually hidden elements and add confirmation dialogs for destructive actions.
