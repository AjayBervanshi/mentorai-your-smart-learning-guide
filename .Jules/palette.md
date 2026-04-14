## 2026-04-07 - Icon-Only Button Accessibility Pattern
**Learning:** Several custom icon-only buttons (like 'Remove skill' in Onboarding) lack `aria-label` attributes and explicit `focus-visible` states. This makes them difficult or impossible to identify and interact with using screen readers and keyboard navigation.
**Action:** When creating or reviewing components with icon-only buttons, systematically verify that an `aria-label` describing the action is present, and ensure that focus styles (e.g. `focus-visible:ring-2`) are applied.
## 2025-03-05 - Missing State on Custom Radios
**Learning:** The app makes heavy use of `<button>` elements for custom selections (like skill levels, goals, and times). Without `aria-pressed` or `aria-checked` attributes, screen reader users have no way to determine which option is currently selected.
**Action:** Always add `aria-pressed={isSelected}` or use a proper `role="radio"` with `aria-checked` when building custom selection groups out of native buttons.
