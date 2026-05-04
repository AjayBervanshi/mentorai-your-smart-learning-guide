/**
 * Prioritizes VITE_APP_URL for defense in depth against open redirect vulnerabilities,
 * falling back to window.location.origin.
 */
export function getAppUrl(): string {
  let url = import.meta.env.VITE_APP_URL || window.location.origin;
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }
  return url;
}
