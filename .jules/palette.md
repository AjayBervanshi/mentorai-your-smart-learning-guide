## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2026-05-07 - Hidden Destructive Actions Accessibility
**Learning:** Destructive actions (like the delete skill button) hidden via `opacity-0` until hover are inaccessible to keyboard users and prone to accidental clicks.
**Action:** Always pair hover-revealed elements with `focus-visible:opacity-100 focus-visible:ring-2` for keyboard access, and wrap destructive actions in `window.confirm` to prevent accidental data loss.
