## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.

## 2026-06-06 - Hover-revealed destructive actions lack keyboard accessibility
**Learning:** Elements visually hidden via `opacity-0` that reveal on `group-hover` remain invisible to keyboard users navigating via Tab, leading to inaccessible and potentially dangerous interactive states.
**Action:** Always add `focus-visible:opacity-100 focus-visible:ring-2` to hover-revealed interactive elements, and wrap destructive actions in a confirmation dialogue to prevent accidental data loss.
