## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2025-06-09 - Ensure keyboard accessibility for hidden interactive elements and confirm destructive actions
**Learning:** Visually hidden interactive elements (like hover-revealed delete buttons with `opacity-0`) are inaccessible via keyboard navigation. Additionally, destructive actions directly triggered by these hidden buttons risk accidental data loss if pressed unintentionally.
**Action:** Always add `focus-visible:opacity-100`, `focus-visible:ring-2`, and `focus-visible:outline-none` to elements that are only visible on hover, ensuring they appear when focused via keyboard. Furthermore, always wrap destructive actions in a `window.confirm` to provide an explicit safeguard before proceeding.
