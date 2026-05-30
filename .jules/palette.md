## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.

## 2024-10-25 - Invisible focus states on hover-revealed actions
**Learning:** Destructive interactive elements hidden by default (opacity-0) in lists completely break keyboard accessibility since they remain invisible when focused. Additionally, quick-access delete buttons without confirmation easily lead to accidental data loss.
**Action:** Always add `focus-visible:opacity-100` and `focus-visible:ring-2` to hover-revealed items, and wrap destructive clicks in `window.confirm`.
