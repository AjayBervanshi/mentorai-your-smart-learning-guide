## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2024-06-20 - Keyboard Accessibility for Hover-Revealed Actions
**Learning:** Visually hidden interactive elements (like delete buttons with `opacity-0` revealed on hover) become accessibility traps for keyboard users if they lack focus-visible styles. Users tabbing through the interface focus on an invisible element. Also, destructive actions without confirmation dialogues easily lead to accidental data loss.
**Action:** Always add `focus-visible:opacity-100`, `focus-visible:ring-2`, and `focus-visible:outline-none` to `opacity-0` interactive elements. Wrap destructive handlers in `window.confirm`.
