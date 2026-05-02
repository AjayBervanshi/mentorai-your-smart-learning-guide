## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.

## 2026-04-30 - Missing ARIA labels on dynamic lists icon buttons
**Learning:** Icon-only interactive elements in mapped arrays (like a delete button for a specific item in a list) need context-aware ARIA labels to be truly accessible to screen readers, instead of a generic "Delete".
**Action:** Use string interpolation with item properties (e.g., `aria-label={"Delete " + user.name}`) to provide a descriptive context for icon-only action buttons inside loops.
