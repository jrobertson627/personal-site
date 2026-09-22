import rateLimit from "@fastify/rate-limit"
import { FastifyInstance } from "fastify"

// global: false — routes opt in via their own `config.rateLimit` (see
// routes/contact.ts) instead of every route sharing one global limit.
export async function rateLimitPlugin(app: FastifyInstance) {
  await app.register(rateLimit, { global: false })
}
