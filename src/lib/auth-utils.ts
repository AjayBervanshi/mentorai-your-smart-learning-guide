export function getAppUrl() {
  let url =
    import.meta.env.VITE_APP_URL ??
    window.location.origin;

  // Make sure to include `https://` when not localhost.
  if (url.includes('http://') && !url.includes('localhost')) {
     url = url.replace('http://', 'https://');
  }

  url = url.charAt(url.length - 1) === '/' ? url.slice(0, -1) : url;

  return url;
}
