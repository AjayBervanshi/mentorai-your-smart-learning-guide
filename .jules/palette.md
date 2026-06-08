## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.

## 2024-06-08 - Keyboard accessibility for hidden delete buttons
**Learning:** Visually hidden interactive elements (like delete buttons hidden with opacity-0 until hovered) are inaccessible to keyboard users because they can't see what they are focusing on, and destructive actions lack confirmation.
**Action:** Always add focus-visible styles (e.g., focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none) to hidden interactive elements and wrap destructive actions in window.confirm to prevent accidental data loss.
