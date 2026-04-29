## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2024-05-24 - Dynamic ARIA Labels in Lists
**Learning:** When adding aria-label attributes to icon-only interactive elements within lists, prefer dynamic, context-specific labels (e.g., `Delete ${item.name}`) over generic static text to improve screen reader accessibility.
**Action:** Always interpolate unique item identifiers into ARIA labels within mapped list components.
