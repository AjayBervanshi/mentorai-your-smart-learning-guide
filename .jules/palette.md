## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.
## 2026-06-07 - Accessible hidden elements and safe destruction
**Learning:** Visually hidden interactive elements (like `opacity-0` for hover-only actions) must become visible on focus to ensure keyboard accessibility. Destructive actions should also be guarded with confirmation to prevent data loss.
**Action:** Always add `focus-visible:opacity-100` alongside `focus-visible:ring-2` to hover-revealed elements. Wrap destructive `onClick` handlers in `window.confirm`.
