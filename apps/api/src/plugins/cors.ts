import cors from "@fastify/cors"
import { FastifyInstance } from "fastify"
import { env } from "../config/env"

export async function corsPlugin(app: FastifyInstance) {
  await app.register(cors, {
    origin: env.NODE_ENV === "production" ? env.ALLOWED_ORIGINS : true,
    // navigator.sendBeacon (used by telemetry) always sends credentials on
    // a cross-origin request per spec, regardless of anything our own code
    // does — without this, the browser blocks the preflight outright, even
    // though nothing here actually relies on cookies/auth.
    credentials: true,
  })
}