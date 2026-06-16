## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.

## 2024-06-16 - Accessible hidden actions
**Learning:** Visually hidden interactive elements (like hover-revealed delete buttons with `opacity-0`) are inaccessible to keyboard users unless they become visible on focus. Additionally, destructive actions need confirmation to prevent data loss.
**Action:** Always add `focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none` for keyboard accessibility on hidden elements, and wrap destructive actions in `window.confirm`.
