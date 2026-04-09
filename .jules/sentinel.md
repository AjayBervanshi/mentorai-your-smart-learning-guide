## 2024-06-19 - DOM-based XSS via CSS Injection in Shadcn UI Chart Component
**Vulnerability:** The Shadcn UI `ChartContainer` component dynamically generated CSS inside a `<style dangerouslySetInnerHTML={{...}} />` tag. The `id` prop was directly interpolated into the CSS string without sanitization. An attacker could potentially inject malicious CSS or escape the style tag if the `id` was controlled by user input.
**Learning:** Components that rely on string interpolation for dynamically generated styles inside `dangerouslySetInnerHTML` are prone to CSS injection and potentially DOM-based XSS if attributes can be closed prematurely.
**Prevention:** Always strictly sanitize dynamic properties (like `id` attributes) before interpolating them into HTML strings or CSS selectors. In this case, `id.replace(/[^a-zA-Z0-9-]/g, "")` was used to ensure only safe characters are included in the generated ID.

## 2024-07-23 - Data Exposure in Supabase Edge Function Error Logs
**Vulnerability:** Supabase Edge Functions were logging entire error objects and raw external AI gateway responses. This could lead to sensitive data leakage, such as internal stack traces, paths, or raw AI outputs containing PII or secrets, into the log management system.
**Learning:** Default error objects and raw response texts often contain more information than is safe to log in production environments.
**Prevention:** Sanitize logs by extracting and logging only specific, safe fields such as `e.message` or HTTP status codes. Use conditional checks (`e instanceof Error ? e.message : "Unknown error"`) to handle diverse error types safely.
