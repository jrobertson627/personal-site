// Simple in-memory TTL cache. A single-instance Node process is all a
// personal site's backend needs — no Redis required to keep GitHub API
// calls (unauthenticated: 60/hour) well within limits.

type CacheEntry<T> = { data: T; expiresAt: number }

const store = new Map<string, CacheEntry<unknown>>()

export async function getOrFetch<T>(key: string, ttlMs: number, fetcher: () => Promise<T>): Promise<T> {
  const cached = store.get(key)
  const now = Date.now()

  if (cached && cached.expiresAt > now) {
    return cached.data as T
  }

  const data = await fetcher()
  store.set(key, { data, expiresAt: now + ttlMs })
  return data
}
