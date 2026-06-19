## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2024-10-31 - Safe and Accessible Delete Actions
**Learning:** Hover-revealed destructive actions (like opacity-0 buttons) must still be visible to keyboard users (focus-visible:opacity-100) and must always have a confirmation dialogue to prevent accidental data loss.
**Action:** When creating visually hidden interactive elements, always ensure `focus-visible` overrides the hidden state. For destructive actions, use `window.confirm` or an explicit dialog.
