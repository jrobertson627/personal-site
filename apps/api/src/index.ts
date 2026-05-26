import Fastify from "fastify"
import { helloRoutes } from "./routes/hello"
import { corsPlugin } from "./plugins/cors"

async function buildServer() {
  const app = Fastify({
    logger: true
  })

  // ─────────────────────────────
  // Plugins
  // ─────────────────────────────
  await corsPlugin(app)

  // ─────────────────────────────
  // Health check
  // ─────────────────────────────
  app.get("/health", async () => {
    return { status: "ok" }
  })

  // ─────────────────────────────
  // Example API route
  // ─────────────────────────────
  await helloRoutes(app)

  return app
}

// ─────────────────────────────
// Start server
// ─────────────────────────────
async function start() {
  const app = await buildServer()

  const port = Number(process.env.PORT) || 3001

  await app.listen({
    port,
    host: "0.0.0.0"
  })

  console.log(`API running on http://localhost:${port}`)
}

start()