## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2024-06-21 - Accessible visually hidden interactive elements and safe destructive actions
**Learning:** For visually hidden interactive elements (e.g., hover-revealed delete buttons with `opacity-0`), they must become visible when receiving keyboard focus to remain accessible to non-mouse users. Also, destructive actions on easily triggered buttons should require confirmation to prevent accidental data loss.
**Action:** Always add `focus-visible:opacity-100`, `focus-visible:ring-2`, and `focus-visible:outline-none` to elements that rely on hover for visibility. Also wrap destructive actions in a `window.confirm` or similar confirmation mechanism.
