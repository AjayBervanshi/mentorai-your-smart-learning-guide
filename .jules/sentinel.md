
## 2024-05-24 - CSS Injection via dangerouslySetInnerHTML in dynamic styles
**Vulnerability:** The Shadcn UI `ChartContainer` component used the `id` prop to generate CSS dynamically and injected it using `dangerouslySetInnerHTML`. The `id` was not properly sanitized, which could allow a malicious user to inject arbitrary CSS or cause DOM-based XSS if the `id` was derived from user input.
**Learning:** Components that dynamically generate styles and inject them using `dangerouslySetInnerHTML` are vulnerable to CSS injection if any part of the generated style depends on unsanitized inputs, including common props like `id`.
**Prevention:** Always strictly sanitize dynamic props (e.g., stripping non-alphanumeric characters) that are interpolated into strings destined for `dangerouslySetInnerHTML` to prevent injection attacks.

## 2024-06-19 - DOM-based XSS via CSS Injection in Shadcn UI Chart Component
**Vulnerability:** The Shadcn UI `ChartContainer` component dynamically generated CSS inside a `<style dangerouslySetInnerHTML={{...}} />` tag. The `id` prop was directly interpolated into the CSS string without sanitization. An attacker could potentially inject malicious CSS or escape the style tag if the `id` was controlled by user input.
**Learning:** Components that rely on string interpolation for dynamically generated styles inside `dangerouslySetInnerHTML` are prone to CSS injection and potentially DOM-based XSS if attributes can be closed prematurely.
**Prevention:** Always strictly sanitize dynamic properties (like `id` attributes) before interpolating them into HTML strings or CSS selectors. In this case, `id.replace(/[^a-zA-Z0-9-]/g, "")` was used to ensure only safe characters are included in the generated ID.

## 2024-07-23 - Data Exposure in Supabase Edge Function Error Logs
**Vulnerability:** Supabase Edge Functions were logging entire error objects and raw external AI gateway responses. This could lead to sensitive data leakage, such as internal stack traces, paths, or raw AI outputs containing PII or secrets, into the log management system.
**Learning:** Default error objects and raw response texts often contain more information than is safe to log in production environments.
**Prevention:** Sanitize logs by extracting and logging only specific, safe fields such as `e.message` or HTTP status codes. Use conditional checks (`e instanceof Error ? e.message : "Unknown error"`) to handle diverse error types safely.

## 2025-02-28 - [CSS Injection via Dynamic Props in Shadcn UI Charts]
**Vulnerability:** The Shadcn UI `ChartStyle` component used `dangerouslySetInnerHTML` to inject CSS variables (`--color-${key}: ${color}`) dynamically based on the `config` object. While the parent `id` prop was sanitized, the `key` and `color` properties from `config` were not, allowing potential CSS injection or DOM-based XSS if these values originated from unsanitized user input.
**Learning:** Any dynamic properties mapped directly into `dangerouslySetInnerHTML` (including CSS styles) require strict sanitization, even within UI components generally considered safe. A sanitized component ID is insufficient if its nested config objects can still inject malicious payloads.
**Prevention:** Sanitize all dynamic inputs before CSS injection. Specifically, strip non-alphanumeric characters from identifiers (`key.replace(/[^a-zA-Z0-9_-]/g, "")`) and strip CSS structural characters (`[;{}"'<>]`) from CSS values.

## 2024-06-25 - Missing Authentication on Supabase Edge Function
**Vulnerability:** The `generate-content` Supabase Edge Function lacked authentication checks. Supabase Edge Functions do not automatically enforce authentication by default when using anonymous keys or service role keys directly. This allowed any external entity to call the endpoint, exhaust AI credits, and fill the cache database, as long as they sent requests to the endpoint URL.
**Learning:** Supabase Edge Functions require manual token verification. Developers must extract the `Authorization` header from the incoming request and use `supabaseClient.auth.getUser()` to verify the token explicitly.
**Prevention:** Always implement explicit authentication header extraction and token validation at the beginning of sensitive Edge Functions before performing any business logic or external API calls.

## 2026-05-07 - Missing Input Length and Allowlist Validation for AI Prompts
**Vulnerability:** The `generate-content` Edge Function lacked strict allowlist validation for `contentType` and length limits for `skill`, `topic`, and `subtopics`. This could allow attackers to inject massive strings or unexpected content types, leading to prompt injection, excessive AI API token usage, or denial-of-service.
**Learning:** Endpoints that pass user input directly into AI prompts must strictly validate the shape, type, length, and allowed values of that input before processing, as the backend AI APIs are sensitive to large payloads and prompt injection attacks.
**Prevention:** Always enforce explicit length limits (e.g., `skill.length > 100`) and validate inputs against strict allowlists (e.g., `["lesson", "quiz", "interview"]`) for any data destined for AI prompt generation.

## 2026-05-07 - Overly Permissive CORS in Edge Functions
**Vulnerability:** The Supabase Edge Function `generate-content` had a hardcoded `Access-Control-Allow-Origin: *` header. This overly permissive CORS configuration allowed any website to make requests to the function.
**Learning:** Hardcoding wildcard CORS origins in Edge Functions exposes the endpoints to cross-origin abuse, circumventing browser security policies intended to protect authenticated sessions and prevent unauthorized access.
**Prevention:** Parameterize the `Access-Control-Allow-Origin` header using an environment variable (e.g., `Deno.env.get("ALLOWED_ORIGIN") || "*"`) to restrict origins in production while permitting development fallback.
