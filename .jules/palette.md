## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.

## 2024-10-25 - Hidden interactive elements and destructive actions
**Learning:** Visually hidden interactive elements (like hover-revealed delete buttons with `opacity-0`) are completely inaccessible to keyboard users unless explicitly made visible on focus. Additionally, immediate destructive actions on fast UI elements can easily cause accidental data loss.
**Action:** Always add `focus-visible:opacity-100` alongside `focus-visible:ring-2` for hidden interactive elements. Always wrap destructive UI actions in a `window.confirm` or similar prompt.
