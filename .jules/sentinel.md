
## 2024-05-24 - CSS Injection via dangerouslySetInnerHTML in dynamic styles
**Vulnerability:** The Shadcn UI `ChartContainer` component used the `id` prop to generate CSS dynamically and injected it using `dangerouslySetInnerHTML`. The `id` was not properly sanitized, which could allow a malicious user to inject arbitrary CSS or cause DOM-based XSS if the `id` was derived from user input.
**Learning:** Components that dynamically generate styles and inject them using `dangerouslySetInnerHTML` are vulnerable to CSS injection if any part of the generated style depends on unsanitized inputs, including common props like `id`.
**Prevention:** Always strictly sanitize dynamic props (e.g., stripping non-alphanumeric characters) that are interpolated into strings destined for `dangerouslySetInnerHTML` to prevent injection attacks.
## 2024-06-19 - DOM-based XSS via CSS Injection in Shadcn UI Chart Component
**Vulnerability:** The Shadcn UI `ChartContainer` component dynamically generated CSS inside a `<style dangerouslySetInnerHTML={{...}} />` tag. The `id` prop was directly interpolated into the CSS string without sanitization. An attacker could potentially inject malicious CSS or escape the style tag if the `id` was controlled by user input.
**Learning:** Components that rely on string interpolation for dynamically generated styles inside `dangerouslySetInnerHTML` are prone to CSS injection and potentially DOM-based XSS if attributes can be closed prematurely.
**Prevention:** Always strictly sanitize dynamic properties (like `id` attributes) before interpolating them into HTML strings or CSS selectors. In this case, `id.replace(/[^a-zA-Z0-9-]/g, "")` was used to ensure only safe characters are included in the generated ID.

## 2024-06-25 - Missing Authentication on Supabase Edge Function
**Vulnerability:** The `generate-content` Supabase Edge Function lacked authentication checks. Supabase Edge Functions do not automatically enforce authentication by default when using anonymous keys or service role keys directly. This allowed any external entity to call the endpoint, exhaust AI credits, and fill the cache database, as long as they sent requests to the endpoint URL.
**Learning:** Supabase Edge Functions require manual token verification. Developers must extract the `Authorization` header from the incoming request and use `supabaseClient.auth.getUser()` to verify the token explicitly.
**Prevention:** Always implement explicit authentication header extraction and token validation at the beginning of sensitive Edge Functions before performing any business logic or external API calls.
