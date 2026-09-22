import { useEffect, useState } from 'react'

type FetchState<T> = { status: 'loading' } | { status: 'success'; data: T } | { status: 'error'; error: string }

type ApiEnvelope<T> = { success: true; data: T } | { success: false; error: string }

export function useFetch<T>(url: string): FetchState<T> {
  // Keyed by url so a change in url is detected during render (state.url
  // !== url) rather than requiring a synchronous setState at the top of
  // the effect, which React flags as a cascading-render anti-pattern.
  const [result, setResult] = useState<{ url: string; state: FetchState<T> }>({
    url,
    state: { status: 'loading' },
  })

  useEffect(() => {
    let cancelled = false

    fetch(url)
      .then((res) => res.json() as Promise<ApiEnvelope<T>>)
      .then((json) => {
        if (cancelled) return
        setResult({
          url,
          state: json.success ? { status: 'success', data: json.data } : { status: 'error', error: json.error },
        })
      })
      .catch(() => {
        if (!cancelled) {
          setResult({ url, state: { status: 'error', error: 'Something went wrong.' } })
        }
      })

    return () => {
      cancelled = true
    }
  }, [url])

  return result.url === url ? result.state : { status: 'loading' }
}
