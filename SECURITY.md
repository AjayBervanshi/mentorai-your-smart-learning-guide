# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |

## Reporting a Vulnerability

Security issues and vulnerabilities should be reported privately:
1. Please do **NOT** open a public issue.
2. Contact the maintainer directly via GitHub Security Advisories or email [ajay_bervanshi@pall.com](mailto:ajay_bervanshi@pall.com).
3. We take all security vulnerabilities seriously and will respond within 48 hours.

## Security Best Practices
- Never commit production API keys, Supabase service role keys, or database secrets.
- In Edge Functions, sanitize error messages to prevent internal stack trace leakage to clients.
- Use sanitized `.env.example` templates for local and staging development.
