## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2026-05-26 - Accessible Hover Actions and Destructive Confirmation
**Learning:** Visually hidden interactive elements (e.g., hover-revealed delete buttons with `opacity-0`) need keyboard accessibility explicitly enabled by adding `focus-visible:opacity-100` alongside `focus-visible:ring-2`. Additionally, wrapping destructive actions in a `window.confirm` prevents accidental data loss for quickly-clicked interactions.
**Action:** Always ensure that any action revealed on hover is also revealed on keyboard focus, and always include confirmations for inline destructive actions.
