import { FastifyInstance } from "fastify"

export async function helloRoutes(app: FastifyInstance) {
  app.get("/api/hello", async () => {
    return { message: "Hello from route file" }
  })
}