## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.

## 2024-10-25 - Hover-only interactive elements and destructive actions
**Learning:** Visually hidden interactive elements (e.g., hover-revealed delete buttons with `opacity-0`) remain focusable via keyboard, but without specific focus styles, they remain invisible during keyboard navigation. Additionally, hidden destructive actions are prone to accidental clicks.
**Action:** Always ensure keyboard accessibility for hidden interactive elements by adding `focus-visible:opacity-100` and `focus-visible:ring-2`. Wrap destructive actions in a `window.confirm` to prevent accidental data loss.
