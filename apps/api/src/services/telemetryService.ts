import { appendFile, mkdir, readFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import path from "node:path"

// Self-hosted telemetry, deliberately minimal: no IP addresses, no user
// agents, no cookies, no third-party service. Just the events themselves,
// appended to a local JSONL file. Good enough for a personal site's own
// traffic, and nothing here is individually identifying.

const DATA_DIR = path.join(process.cwd(), "data")
const LOG_PATH = path.join(DATA_DIR, "telemetry.jsonl")

export type TelemetryEvent =
  | { type: "pageview"; path: string; referrer?: string }
  | { type: "cta_click"; label: string; path: string }
  | { type: "web_vital"; name: string; value: number; path: string }
  | { type: "error"; message: string; stack?: string; path: string }

type StoredEvent = TelemetryEvent & { timestamp: string }

async function ensureLogFile() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true })
  }
}

export async function recordEvent(event: TelemetryEvent): Promise<void> {
  await ensureLogFile()
  const stored: StoredEvent = { ...event, timestamp: new Date().toISOString() }
  await appendFile(LOG_PATH, JSON.stringify(stored) + "\n", "utf-8")
}

async function readEvents(): Promise<StoredEvent[]> {
  if (!existsSync(LOG_PATH)) return []
  const raw = await readFile(LOG_PATH, "utf-8")
  return raw
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line) as StoredEvent)
}

export type TelemetrySummary = {
  totalEvents: number
  pageviews: { total: number; byPath: Record<string, number> }
  ctaClicks: { total: number; byLabel: Record<string, number> }
  webVitals: Record<string, { count: number; average: number }>
  recentErrors: { message: string; path: string; timestamp: string }[]
}

export async function getSummary(): Promise<TelemetrySummary> {
  const events = await readEvents()

  const summary: TelemetrySummary = {
    totalEvents: events.length,
    pageviews: { total: 0, byPath: {} },
    ctaClicks: { total: 0, byLabel: {} },
    webVitals: {},
    recentErrors: [],
  }

  const vitalSums: Record<string, { sum: number; count: number }> = {}

  for (const event of events) {
    switch (event.type) {
      case "pageview":
        summary.pageviews.total += 1
        summary.pageviews.byPath[event.path] = (summary.pageviews.byPath[event.path] ?? 0) + 1
        break
      case "cta_click":
        summary.ctaClicks.total += 1
        summary.ctaClicks.byLabel[event.label] = (summary.ctaClicks.byLabel[event.label] ?? 0) + 1
        break
      case "web_vital": {
        const entry = vitalSums[event.name] ?? { sum: 0, count: 0 }
        entry.sum += event.value
        entry.count += 1
        vitalSums[event.name] = entry
        break
      }
      case "error":
        summary.recentErrors.push({ message: event.message, path: event.path, timestamp: event.timestamp })
        break
    }
  }

  for (const [name, { sum, count }] of Object.entries(vitalSums)) {
    summary.webVitals[name] = { count, average: Math.round((sum / count) * 100) / 100 }
  }

  summary.recentErrors = summary.recentErrors.slice(-10).reverse()

  return summary
}
