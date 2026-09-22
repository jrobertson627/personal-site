import helmet from "@fastify/helmet"
import { FastifyInstance } from "fastify"

// Was installed from the very first API scaffold but never registered —
// wiring it up rather than removing it, since security response headers
// are worth having for free.
export async function helmetPlugin(app: FastifyInstance) {
  await app.register(helmet)
}
