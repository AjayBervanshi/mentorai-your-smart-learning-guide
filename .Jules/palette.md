## 2025-03-05 - Missing State on Custom Radios
**Learning:** The app makes heavy use of `<button>` elements for custom selections (like skill levels, goals, and times). Without `aria-pressed` or `aria-checked` attributes, screen reader users have no way to determine which option is currently selected.
**Action:** Always add `aria-pressed={isSelected}` or use a proper `role="radio"` with `aria-checked` when building custom selection groups out of native buttons.
