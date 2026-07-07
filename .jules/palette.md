## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2024-07-07 - Add aria-pressed for accessible custom radio buttons
**Learning:** Custom selection components built with native buttons must include `aria-pressed` or `aria-checked` attributes to accurately communicate the active or selected state to screen reader users.
**Action:** When creating pseudo-radio buttons or custom tabs from `<button>` elements, wrap them in `role="group"` with an `aria-label`, and always bind `aria-pressed` to the selection state expression.
