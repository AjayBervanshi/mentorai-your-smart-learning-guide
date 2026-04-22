## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.

## 2024-05-20 - Add aria-label to User Profile Delete Button
**Learning:** Icon-only interactive elements (like the trash icon button in profile selection) are completely invisible to screen readers without explicit ARIA labels. Using dynamic descriptive labels like `Delete ${user.name} profile` provides much better context than a generic "Delete".
**Action:** Always verify `<Button size="icon">` components have an `aria-label` prop, preferably with dynamic context if acting on a specific list item.
