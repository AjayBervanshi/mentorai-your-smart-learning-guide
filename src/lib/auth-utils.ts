export function getAppUrl() {
  let url =
    import.meta.env.VITE_APP_URL ??
    window.location.origin;
  // Ensure there's no trailing slash
  url = url.replace(/\/$/, "");
  return url;
}
