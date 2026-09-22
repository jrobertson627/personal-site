import { useEffect, useState } from 'react'

type FetchState<T> = { status: 'loading' } | { status: 'success'; data: T } | { status: 'error'; error: string }

type ApiEnvelope<T> = { success: true; data: T } | { success: false; error: string }

export function useFetch<T>(url: string): FetchState<T> & { retry: () => void } {
  const [attempt, setAttempt] = useState(0)
  // Keyed by url+attempt so a change in either is detected during render
  // (result.key !== requestKey) rather than requiring a synchronous
  // setState at the top of the effect, which React flags as a
  // cascading-render anti-pattern.
  const requestKey = `${url}#${attempt}`
  const [result, setResult] = useState<{ key: string; state: FetchState<T> }>({
    key: requestKey,
    state: { status: 'loading' },
  })

  useEffect(() => {
    let cancelled = false
    const key = `${url}#${attempt}`

    fetch(url, { signal: AbortSignal.timeout(10_000) })
      .then((res) => res.json() as Promise<ApiEnvelope<T>>)
      .then((json) => {
        if (cancelled) return
        setResult({
          key,
          state: json.success ? { status: 'success', data: json.data } : { status: 'error', error: json.error },
        })
      })
      .catch((err) => {
        if (!cancelled) {
          const error = err instanceof Error && err.name === 'TimeoutError' ? 'Request timed out.' : 'Something went wrong.'
          setResult({ key, state: { status: 'error', error } })
        }
      })

    return () => {
      cancelled = true
    }
  }, [url, attempt])

  const state = result.key === requestKey ? result.state : { status: 'loading' as const }
  return { ...state, retry: () => setAttempt((n) => n + 1) }
}
