import { app } from "./config/server"
import { env } from "./config/env"
import { registerRoutes } from "./utils/registerRoutes"
import { registerErrorHandler } from "./middleware/errorHandler"
import { registerPlugins } from "./utils/registerPlugins"

registerErrorHandler()


async function buildServer() {
  // ─────────────────────────────
  // Plugins
  // ─────────────────────────────
  await registerPlugins(app)
  
  // ─────────────────────────────
  // Routes
  // ─────────────────────────────
  await registerRoutes(app)

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