## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2024-05-25 - Visually hidden interactive elements lack keyboard accessibility
**Learning:** Elements that are visually hidden (e.g. using `opacity-0`) but revealed on hover (`group-hover:opacity-100`) often lack keyboard accessibility. Keyboard users cannot see them when they focus the element using tab.
**Action:** Always add `focus-visible:opacity-100 focus-visible:ring-2` to elements that use `opacity-0 group-hover:opacity-100` to ensure they become visible and clearly outlined when focused via keyboard. Also wrap destructive actions like deletes in `window.confirm` since accidentally triggering hidden buttons without confirmation is easy via keyboard navigation.
