## 2024-06-19 - DOM-based XSS via CSS Injection in Shadcn UI Chart Component
**Vulnerability:** The Shadcn UI `ChartContainer` component dynamically generated CSS inside a `<style dangerouslySetInnerHTML={{...}} />` tag. The `id` prop was directly interpolated into the CSS string without sanitization. An attacker could potentially inject malicious CSS or escape the style tag if the `id` was controlled by user input.
**Learning:** Components that rely on string interpolation for dynamically generated styles inside `dangerouslySetInnerHTML` are prone to CSS injection and potentially DOM-based XSS if attributes can be closed prematurely.
**Prevention:** Always strictly sanitize dynamic properties (like `id` attributes) before interpolating them into HTML strings or CSS selectors. In this case, `id.replace(/[^a-zA-Z0-9-]/g, "")` was used to ensure only safe characters are included in the generated ID.

## 2026-04-09 - Committed Secrets in .env File
**Vulnerability:** The `.env` file containing Supabase keys was committed and tracked in the Git repository. This exposes sensitive credentials to anyone with access to the repository.
**Learning:** Committed secrets can lead to unauthorized access to external services and data breaches. Secrets should never be committed to version control.
**Prevention:** Always add `.env` and other secret-containing files to `.gitignore`. Use a `.env.example` file to provide a template for required environment variables without including actual secrets. Rotate any keys that have been accidentally committed.
