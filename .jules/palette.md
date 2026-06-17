## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2026-06-17 - Keyboard Accessibility and Confirmation for Hidden Destructive Actions
**Learning:** Destructive actions (like delete buttons) that are visually hidden until hover (`opacity-0 group-hover:opacity-100`) are often inaccessible to keyboard users because they can receive focus but remain invisible, and they lack a safeguard against accidental activation.
**Action:** Always ensure visually hidden interactive elements receive focus-visible styles (e.g., `focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none`) and wrap destructive actions in a `window.confirm` to prevent accidental data loss.
