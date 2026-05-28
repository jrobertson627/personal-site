import { FastifyInstance } from "fastify"
import { healthRoute } from "../routes/health"
import { helloRoute } from "../routes/hello"

export async function registerRoutes(app: FastifyInstance) {
  healthRoute()
  helloRoute()
}