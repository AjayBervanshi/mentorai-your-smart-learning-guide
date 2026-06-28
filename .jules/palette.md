## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.

## 2024-03-20 - Ensure invisible interactive elements are keyboard accessible
**Learning:** Elements styled with opacity-0 on hover are inaccessible via keyboard navigation. Destructive actions without confirmation are dangerous.
**Action:** When hiding interactive elements using `opacity-0` and `hover:opacity-100`, always pair them with `focus-visible:opacity-100` and `focus-visible:ring-2 focus-visible:outline-none`. For destructive actions, wrap in `window.confirm` to prevent accidental loss.
