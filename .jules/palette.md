## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2026-05-07 - Accessible hidden delete actions
**Learning:** Destructive actions that are visually hidden until hovered (opacity-0) must still be fully accessible via keyboard navigation. They also require confirmation steps since accidental triggering is high, especially for keyboard/screen reader users.
**Action:** When implementing `opacity-0 group-hover:opacity-100` for actions like delete buttons, explicitly include `focus-visible:opacity-100 focus-visible:ring-2` and wrap the action handler in a `window.confirm` dialog to prevent accidental data loss.
