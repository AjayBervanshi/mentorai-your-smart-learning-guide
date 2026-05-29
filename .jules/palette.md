## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.

## 2024-10-24 - Hover-revealed interactive elements
**Learning:** Visually hidden interactive elements (like opacity-0 buttons) must still be visible and styled for keyboard users. Destructive actions need confirmation.
**Action:** Add `focus-visible:opacity-100 focus-visible:ring-2` to all hover-revealed elements and wrap destructive clicks in `window.confirm`.
