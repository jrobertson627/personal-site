import { FastifyInstance } from "fastify"
import { healthRoute } from "../routes/health"
import { helloRoute } from "../routes/hello"
import { contactRoute } from "../routes/contact"

export async function registerRoutes(app: FastifyInstance) {
  healthRoute()
  helloRoute()
  contactRoute()
}