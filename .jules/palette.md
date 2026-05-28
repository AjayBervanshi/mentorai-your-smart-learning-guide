## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2024-05-28 - Accessible Hover-Revealed Actions
**Learning:** Destructive actions revealed only on hover (`opacity-0 group-hover:opacity-100`) hide critical functionality from keyboard users and risk accidental data loss without confirmation.
**Action:** Always pair `opacity-0` with `focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring outline-none` for keyboard visibility, and wrap list-item destructive actions in a `window.confirm` dialog.
