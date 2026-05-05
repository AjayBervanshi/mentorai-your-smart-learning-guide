export function getAppUrl(): string {
  let url = import.meta.env.VITE_APP_URL || window.location.origin;
  url = url.trim();
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }
  return url;
}
