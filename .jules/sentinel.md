## 2024-06-19 - DOM-based XSS via CSS Injection in Shadcn UI Chart Component
**Vulnerability:** The Shadcn UI `ChartContainer` component dynamically generated CSS inside a `<style dangerouslySetInnerHTML={{...}} />` tag. The `id` prop was directly interpolated into the CSS string without sanitization. An attacker could potentially inject malicious CSS or escape the style tag if the `id` was controlled by user input.
**Learning:** Components that rely on string interpolation for dynamically generated styles inside `dangerouslySetInnerHTML` are prone to CSS injection and potentially DOM-based XSS if attributes can be closed prematurely.
**Prevention:** Always strictly sanitize dynamic properties (like `id` attributes) before interpolating them into HTML strings or CSS selectors. In this case, `id.replace(/[^a-zA-Z0-9-]/g, "")` was used to ensure only safe characters are included in the generated ID.

## 2024-04-08 - [Review of Skill validation and matching]
**Vulnerability:** Not a direct vulnerability, but `findMatchingSkills` and `normalizeSkillName` rely on simple Levenshtein distances and substring matching. For very short queries, distance matching may return spurious suggestions. There's no limit on the length of input when checking distance, meaning extremely long skill strings could degrade performance through repeated large `levenshtein` comparisons.
**Learning:** O(n*m) functions like Levenshtein distance should be bounds-checked on input string length before execution, especially on client-side functions invoked on every keystroke.
**Prevention:** Bound input length before performing distance calculations.
