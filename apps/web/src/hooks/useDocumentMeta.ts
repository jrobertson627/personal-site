import { useEffect } from 'react'

type MetaEntry = { name?: string; property?: string; content: string }

/**
 * Sets document.title and upserts <meta> tags by finding-and-updating the
 * existing element (falling back to creating one) rather than rendering a
 * new <title>/<meta> via JSX. React 19's built-in metadata hoisting does
 * the latter, but doesn't dedupe against tags that were already in the
 * static index.html (it didn't render them) — it inserts duplicates
 * instead of replacing them, and the browser then uses whichever
 * <title> happens to come first in the DOM, which isn't necessarily the
 * one this hook just set. Mutating in place avoids that entirely.
 */
export function useDocumentMeta(title: string, entries: MetaEntry[] = []) {
  // Stringify so the effect doesn't re-run every render from a new array
  // literal — entries are small, static-per-page objects, so this is cheap.
  const entriesKey = JSON.stringify(entries)

  useEffect(() => {
    document.title = title

    for (const entry of entries) {
      const selector = entry.name ? `meta[name="${entry.name}"]` : `meta[property="${entry.property}"]`
      let el = document.head.querySelector<HTMLMetaElement>(selector)
      if (!el) {
        el = document.createElement('meta')
        if (entry.name) el.setAttribute('name', entry.name)
        if (entry.property) el.setAttribute('property', entry.property)
        document.head.appendChild(el)
      }
      el.setAttribute('content', entry.content)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, entriesKey])
}
