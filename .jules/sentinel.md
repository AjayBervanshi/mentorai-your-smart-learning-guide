
## 2024-05-24 - CSS Injection via dangerouslySetInnerHTML in dynamic styles
**Vulnerability:** The Shadcn UI `ChartContainer` component used the `id` prop to generate CSS dynamically and injected it using `dangerouslySetInnerHTML`. The `id` was not properly sanitized, which could allow a malicious user to inject arbitrary CSS or cause DOM-based XSS if the `id` was derived from user input.
**Learning:** Components that dynamically generate styles and inject them using `dangerouslySetInnerHTML` are vulnerable to CSS injection if any part of the generated style depends on unsanitized inputs, including common props like `id`.
**Prevention:** Always strictly sanitize dynamic props (e.g., stripping non-alphanumeric characters) that are interpolated into strings destined for `dangerouslySetInnerHTML` to prevent injection attacks.
