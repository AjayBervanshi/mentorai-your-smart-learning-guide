## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2024-11-29 - Destructive actions and hidden elements
**Learning:** Elements that are visually hidden until hovered (like `opacity-0 group-hover:opacity-100`) become inaccessible to keyboard users unless they also receive full opacity on focus. Destructive actions on such elements can easily cause accidental data loss.
**Action:** Always add `focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none` to hover-revealed interactive elements, and wrap destructive actions like deletion in a `window.confirm` prompt.
