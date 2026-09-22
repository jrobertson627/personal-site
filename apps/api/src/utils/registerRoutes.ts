import { FastifyInstance } from "fastify"
import { healthRoute } from "../routes/health"
import { helloRoute } from "../routes/hello"
import { contactRoute } from "../routes/contact"
import { githubRoute } from "../routes/github"
import { telemetryRoute } from "../routes/telemetry"

export async function registerRoutes(app: FastifyInstance) {
  healthRoute()
  helloRoute()
  contactRoute()
  githubRoute()
  telemetryRoute()
}