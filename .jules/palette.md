## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2026-05-07 - Accessible Visually Hidden Actions
**Learning:** Visually hidden interactive elements (like hover-revealed delete buttons with `opacity-0`) remain invisible to keyboard users when focused unless explicitly handled. Additionally, destructive actions directly triggered by an icon without confirmation often lead to accidental data loss.
**Action:** Always add `focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2` to hover-revealed buttons, and wrap immediate destructive actions in a `window.confirm` dialogue.
