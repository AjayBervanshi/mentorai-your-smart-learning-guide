## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2024-11-20 - Ensure Inputs Without Labels Have ARIA Labels
**Learning:** Using placeholders as the only visible text for inputs compromises accessibility as screen readers require an accessible name.
**Action:** Always add `aria-label` attributes to form inputs when a visible `<label>` element is omitted to ensure they are screen reader friendly.
