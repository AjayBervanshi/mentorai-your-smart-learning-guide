## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2026-05-07 - Add Confirmation and Keyboard Focus for Destructive Actions
**Learning:** Destructive actions inside visually complex components (like hover-revealed delete buttons in list items) are often inaccessible to keyboard users because their default state is `opacity-0` and they lack `focus-visible` styles. Without confirmation, users can easily lose significant progress accidentally.
**Action:** Always wrap delete operations with `window.confirm` or a dedicated confirmation modal, and ensure that visually hidden interactive elements have `focus-visible:opacity-100` alongside `focus-visible:ring-2` to remain usable via keyboard navigation.
