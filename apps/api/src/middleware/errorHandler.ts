import { app } from "../config/server"

export function registerErrorHandler() {
  app.setErrorHandler((error, req, reply) => {
    console.error(error)

    reply.status(500).send({
      success: false,
      error: "Internal Server Error",
    })
  })
}