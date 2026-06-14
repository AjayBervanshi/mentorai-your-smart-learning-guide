## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.

## 2024-06-14 - Accessible Hidden Actions
**Learning:** Visually hidden interactive elements (like hover-revealed delete buttons with `opacity-0`) break keyboard navigation if they don't become visible on focus.
**Action:** Always add `focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none` to `opacity-0 group-hover:opacity-100` elements, and wrap destructive actions in `window.confirm`.
