## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.

## 2025-02-28 - Hover-Revealed Destructive Actions
**Learning:** Hover-revealed elements (like `opacity-0 group-hover:opacity-100`) become completely inaccessible to keyboard users if they lack focus states. Additionally, immediate destructive actions on these buttons can cause accidental data loss since users might unintentionally trigger them while navigating.
**Action:** Always pair `opacity-0 group-hover:opacity-100` with `focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none`. Always wrap destructive actions in `window.confirm()` or equivalent protection.
