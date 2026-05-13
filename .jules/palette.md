## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2026-05-07 - Add aria-pressed to grouped toggle buttons
**Learning:** Relying solely on visual active/inactive classes for toggle buttons makes their state invisible to screen readers, severely hurting accessibility for mutually exclusive selections.
**Action:** When implementing grouped toggle buttons (like skill levels or daily time selectors), always explicitly provide the `aria-pressed={boolean}` attribute to indicate the current selection state to screen readers.
