## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2026-05-07 - Hidden Interactive Element Keyboard Accessibility
**Learning:** For visually hidden interactive elements (like the hover-revealed delete buttons with `opacity-0`), applying standard focus rings (`focus-visible:ring-2`) is insufficient because the element remains invisible during keyboard navigation.
**Action:** Always pair `focus-visible:ring-2` with `focus-visible:opacity-100` to ensure keyboard users can actually see the element they've focused on, and always wrap hidden destructive actions in a `window.confirm` since accidental triggering is easier when navigation is less predictable.
