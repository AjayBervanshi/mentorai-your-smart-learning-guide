## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.

## 2026-04-30 - Dynamic ARIA labels for list items
**Learning:** Generic ARIA labels for icon buttons inside lists (e.g. "Delete") fail to provide context about what is being deleted.
**Action:** When adding `aria-label` attributes to icon-only interactive elements within lists, prefer dynamic, context-specific labels (e.g., `Delete ${item.name}`) over generic static text to improve screen reader accessibility.
