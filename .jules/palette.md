## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2023-10-27 - [Custom Selection Accessibility]
**Learning:** Custom selections or pseudo-radio buttons using `<button>` elements must be wrapped in a container with `role="group"` and an `aria-label`, and always include the `aria-pressed` or `aria-checked` attribute to ensure accessibility for screen reader users.
**Action:** Always verify custom radio or toggle groups for proper ARIA roles and state attributes.
## 2024-10-28 - Pseudo-Radio Button Groups

**Learning:** When building custom toggle button lists that act as mutually exclusive selections (like radio buttons), relying solely on visual cues or generic \`<button>\` roles leaves screen readers without context of the group or the selected state.
**Action:** Always wrap these custom toggle lists in a container with \`role="group"\` and an \`aria-label\`.  Crucially, add the \`aria-pressed\` attribute to the individual buttons to explicitly communicate which option is currently selected to assistive technologies.
## 2024-10-29 - Destructive Action Confirmation
**Learning:** Adding a confirmation dialog before deleting user data prevents accidental loss, especially when the delete button appears on hover in a dense UI list where misclicks are common.
**Action:** Always add a confirmation step (via dialog or `window.confirm`) for destructive actions like deleting a project, skill, or account.
## 2024-10-31 - Missing aria-label for placeholder-only input
**Learning:** Input fields that rely entirely on placeholder text without an associated visible `<label>` lack accessible names for screen reader users, violating accessibility guidelines.
**Action:** Always provide an `aria-label` attribute describing the input's purpose when using placeholder-only `<Input>` components.
