import { app } from "../config/server"

export function healthRoute() {
  app.get("/health", async () => {
    return {
      success: true,
      status: "ok",
      timestamp: new Date().toISOString(),
    }
  })
}