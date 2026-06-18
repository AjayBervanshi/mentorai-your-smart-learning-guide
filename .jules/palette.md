## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2024-06-18 - Keyboard Accessible Destructive Actions on Hover
**Learning:** Visually hidden interactive elements (like `opacity-0` delete buttons revealed on hover) completely break keyboard accessibility unless explicitly styled with `focus-visible:opacity-100`. Additionally, making destructive actions easily clickable on hover increases the risk of accidental data loss.
**Action:** Always pair `opacity-0 group-hover:opacity-100` with `focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none`. Always wrap such easily accessible destructive actions in a `window.confirm` to act as a friction point against accidents.
