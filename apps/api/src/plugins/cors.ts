import cors from "@fastify/cors"
import { FastifyInstance } from "fastify"
import { env } from "../config/env"

export async function corsPlugin(app: FastifyInstance) {
  await app.register(cors, {
    origin: env.NODE_ENV === "production" ? env.ALLOWED_ORIGINS : true,
  })
}