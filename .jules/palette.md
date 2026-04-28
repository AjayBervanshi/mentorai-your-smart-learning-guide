## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.

## 2024-10-24 - Dynamic ARIA labels on list items
**Learning:** Static labels on icon-only buttons within lists (e.g., "Delete") lack context for screen reader users, making it unclear which item is being affected.
**Action:** Use context-specific, dynamic `aria-label` attributes (e.g., `aria-label={"Delete " + item.name}`) for interactive elements within lists.
