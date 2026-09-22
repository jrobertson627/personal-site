// Client for our own self-hosted telemetry endpoint (#21) — no third-party
// script, no cookies. Uses sendBeacon where available so tracking never
// blocks navigation or page unload.
import { apiUrl } from './apiUrl'

type TelemetryEvent =
  | { type: 'pageview'; path: string; referrer?: string }
  | { type: 'cta_click'; label: string; path: string }
  | { type: 'web_vital'; name: string; value: number; path: string }
  | { type: 'error'; message: string; stack?: string; path: string }

function send(event: TelemetryEvent) {
  try {
    const body = JSON.stringify(event)
    const url = apiUrl('/api/telemetry/event')

    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([body], { type: 'application/json' }))
    } else {
      fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(
        () => {},
      )
    }
  } catch {
    // Telemetry must never break the page it's watching.
  }
}

export function trackPageview(path: string) {
  send({ type: 'pageview', path, referrer: document.referrer || undefined })
}

export function trackCtaClick(label: string) {
  send({ type: 'cta_click', label, path: window.location.pathname })
}

export function trackWebVital(name: string, value: number) {
  send({ type: 'web_vital', name, value, path: window.location.pathname })
}

export function trackError(message: string, stack?: string) {
  send({ type: 'error', message, stack, path: window.location.pathname })
}
