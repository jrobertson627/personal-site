import { z } from "zod"
import { app } from "../config/server"
import { env } from "../config/env"
import { recordEvent, getSummary } from "../services/telemetryService"
import type { TelemetryEvent } from "../services/telemetryService"

const telemetryEventSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("pageview"),
    path: z.string().max(500),
    referrer: z.string().max(500).optional(),
  }),
  z.object({
    type: z.literal("cta_click"),
    label: z.string().max(200),
    path: z.string().max(500),
  }),
  z.object({
    type: z.literal("web_vital"),
    name: z.string().max(20),
    value: z.number(),
    path: z.string().max(500),
  }),
  z.object({
    type: z.literal("error"),
    message: z.string().max(1000),
    stack: z.string().max(4000).optional(),
    path: z.string().max(500),
  }),
])

export function telemetryRoute() {
  // sendBeacon requests can't set a Content-Type reliably in every browser,
  // so we don't require it here — Fastify's default JSON parser only kicks
  // in for application/json, and we still validate the parsed body with Zod
  // regardless of how it arrived.
  app.post("/api/telemetry/event", async (req, reply) => {
    const parsed = telemetryEventSchema.safeParse(req.body)

    if (!parsed.success) {
      return reply.status(400).send({ success: false, error: "Invalid telemetry event" })
    }

    try {
      await recordEvent(parsed.data as TelemetryEvent)
    } catch (err) {
      req.log.error({ err }, "failed to record telemetry event")
      // Telemetry failing is never worth surfacing to the visitor.
    }

    return reply.status(202).send({ success: true })
  })

  app.get("/api/telemetry/summary", async (req, reply) => {
    if (!env.TELEMETRY_ADMIN_KEY || req.query == null || typeof req.query !== "object") {
      return reply.status(404).send({ success: false, error: "Not found" })
    }

    const { key } = req.query as { key?: string }
    if (key !== env.TELEMETRY_ADMIN_KEY) {
      return reply.status(404).send({ success: false, error: "Not found" })
    }

    const summary = await getSummary()
    return { success: true, data: summary }
  })
}
