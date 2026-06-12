## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.

## 2024-10-25 - Hidden destructive actions and keyboard accessibility
**Learning:** Destructive actions revealed only on hover are inaccessible to keyboard users and prone to accidental clicks without confirmation.
**Action:** Always ensure visually hidden interactive elements have `focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none` and wrap destructive actions in a confirmation dialog.
