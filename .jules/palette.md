## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2026-04-30 - Dynamic ARIA labels for icon buttons in lists
**Learning:** Icon-only interactive elements in list items (like delete buttons mapped over an array) need dynamic labels, otherwise all buttons announce identically to screen readers.
**Action:** Use context variables (e.g. `aria-label={\`Delete \${item.name}\`}`) rather than generic text when adding labels to mapped icon buttons.
