import { app } from "../config/server"

export function registerLogger() {
  app.addHook("onRequest", async (req) => {
    console.log(`[${req.method}] ${req.url}`)
  })
}