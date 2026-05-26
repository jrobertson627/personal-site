import cors from "@fastify/cors"
import { FastifyInstance } from "fastify"

export async function corsPlugin(app: FastifyInstance) {
  await app.register(cors, {
    origin: true
  })
}