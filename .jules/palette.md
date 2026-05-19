## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.

## 2026-05-07 - Accessible hidden interactive elements and destructive actions
**Learning:** Visually hidden interactive elements (like hover-revealed delete buttons with `opacity-0`) are inaccessible to keyboard users because they cannot see when they receive focus. Additionally, instant deletion without confirmation leads to accidental data loss.
**Action:** Always add `focus-visible:opacity-100` alongside `focus-visible:ring-2` to hover-revealed elements. Wrap destructive actions in `window.confirm` to ensure user intent.
