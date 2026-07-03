## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2024-10-25 - Missing aria-pressed on pseudo-radio buttons
**Learning:** Custom selection groups using button elements without aria-pressed state or group roles lack semantic meaning and state for screen readers.
**Action:** When implementing custom selections or pseudo-radio buttons using <button> elements, always include role="group", an aria-label on the container, and the aria-pressed attribute bound to the selected state.
