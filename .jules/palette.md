## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.

## 2026-06-02 - Keyboard Accessibility for Hidden Destructive Actions
**Learning:** Visually hiding interactive elements (like delete buttons) using opacity on hover groups breaks keyboard accessibility if focus states aren't explicitly styled to reveal them. Furthermore, destructive actions without confirmation dialogues easily lead to data loss.
**Action:** Always pair `opacity-0` with `focus-visible:opacity-100` alongside ring styles for focus indication. Always wrap destructive actions in a `window.confirm` or similar confirmation mechanism to prevent accidental data loss.
