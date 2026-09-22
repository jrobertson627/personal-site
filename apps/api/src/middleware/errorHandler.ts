import { FastifyError } from "fastify"
import { app } from "../config/server"

export function registerErrorHandler() {
  app.setErrorHandler((error: FastifyError, req, reply) => {
    req.log.error({ err: error }, "unhandled request error")

    // Respect a well-formed error's own statusCode (e.g. @fastify/rate-limit's
    // 429) instead of collapsing every error to 500.
    const statusCode =
      typeof error.statusCode === "number" && error.statusCode >= 400 && error.statusCode < 600
        ? error.statusCode
        : 500

    reply.status(statusCode).send({
      success: false,
      error: statusCode === 500 ? "Internal Server Error" : error.message,
    })
  })
}
