## 2024-10-24 - Missing ARIA labels on inline inputs
**Learning:** Inline forms or quick-add UI patterns without explicit <label> elements are inaccessible to screen readers because placeholder text is insufficient.
**Action:** Always provide an aria-label for <Input> components when no explicit label is present.

## 2026-06-03 - Focus styles for visually hidden interactive elements
**Learning:** Elements that rely on hover for visibility (like opacity-0) are completely invisible to keyboard-only users unless focus states explicitly override the opacity. Destructive actions hidden this way can also cause accidental data loss if not confirmed.
**Action:** Always add focus-visible:opacity-100 and focus-visible:ring-2 to hover-revealed elements. Wrap destructive actions in window.confirm.
