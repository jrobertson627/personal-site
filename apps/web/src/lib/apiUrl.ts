// The API is a separate Render service (api.jessicalrobertson.com), not
// the same origin as this static site — a relative fetch('/api/...') from
// the browser resolves against jessicalrobertson.com and never reaches it.
// VITE_API_URL supplies the API's absolute origin in production; left
// unset in dev, where Vite's own proxy (vite.config.ts) already forwards
// /api/* to the local API server, so a relative path is correct there.
const API_BASE_URL = import.meta.env.VITE_API_URL ?? ''

export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path}`
}
