## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2026-05-07 - Missing aria-pressed state on grouped toggle buttons
**Learning:** Buttons acting as mutually exclusive selections within a group (e.g. difficulty selection) need an explicit `aria-pressed` state to indicate the current selection to screen readers. Simply updating visual classes is insufficient.
**Action:** Always provide `aria-pressed={boolean}` for toggle buttons, especially those acting as radio buttons within an `aria-labelledby` or `aria-label` group.
