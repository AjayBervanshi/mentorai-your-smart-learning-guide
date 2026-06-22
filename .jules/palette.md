## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.

## 2024-06-22 - Keyboard Accessibility for Hover-Revealed Actions
**Learning:** Visually hidden interactive elements using `opacity-0 group-hover:opacity-100` are inaccessible to keyboard users unless explicitly styled for focus states. Additionally, hiding destructive actions behind hovers increases the risk of accidental data loss.
**Action:** Always add `focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none` to visually hidden interactive elements, and protect destructive actions with `window.confirm`.
