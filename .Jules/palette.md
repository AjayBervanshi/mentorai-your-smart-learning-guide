## 2026-04-07 - Icon-Only Button Accessibility Pattern
**Learning:** Several custom icon-only buttons (like 'Remove skill' in Onboarding) lack `aria-label` attributes and explicit `focus-visible` states. This makes them difficult or impossible to identify and interact with using screen readers and keyboard navigation.
**Action:** When creating or reviewing components with icon-only buttons, systematically verify that an `aria-label` describing the action is present, and ensure that focus styles (e.g. `focus-visible:ring-2`) are applied.
