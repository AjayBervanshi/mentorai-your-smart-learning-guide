## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2023-10-27 - [Custom Selection Accessibility]
**Learning:** Custom selections or pseudo-radio buttons using `<button>` elements must be wrapped in a container with `role="group"` and an `aria-label`, and always include the `aria-pressed` or `aria-checked` attribute to ensure accessibility for screen reader users.
**Action:** Always verify custom radio or toggle groups for proper ARIA roles and state attributes.
## 2024-10-27 - Consistent ARIA roles for custom radio groups
**Learning:** Custom radio button groups (like level selectors and daily time commitments) must consistently use `role="group"` with an accessible name (`aria-labelledby` or `aria-label`) and `aria-pressed` on the buttons to communicate state to screen readers.
**Action:** Always verify that every custom selection block acting as radio buttons includes the full suite of ARIA attributes: group role, accessible name for the group, and pressed state for each option.
