import { app } from "../config/server"

export async function helloRoute() {
  app.get("/api/hello", async () => {
    return { message: "Hello from route file" }
  })
}