import { z } from "zod"
import { app } from "../config/server"
import { sendContactEmail } from "../services/emailService"

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Enter a valid email address"),
  message: z.string().trim().min(1, "Message is required").max(5000),
  // Honeypot: real users never see this field (visually hidden client-side).
  // A non-empty value means something filled in every field it could find.
  company: z.string().optional(),
})

export function contactRoute() {
  app.post(
    "/api/contact",
    { config: { rateLimit: { max: 5, timeWindow: "10 minutes" } } },
    async (req, reply) => {
      const parsed = contactSchema.safeParse(req.body)

      if (!parsed.success) {
        return reply.status(400).send({
          success: false,
          error: parsed.error.issues[0]?.message ?? "Invalid submission",
        })
      }

      const { name, email, message, company } = parsed.data

      if (company) {
        req.log.warn({ ip: req.ip }, "contact form honeypot triggered, discarding silently")
        // Return success so the bot doesn't learn it was caught.
        return reply.status(200).send({ success: true })
      }

      req.log.info({ name, email, messageLength: message.length }, "contact form submission received")

      try {
        const result = await sendContactEmail({ name, email, message })
        if (!result.sent) {
          req.log.warn({ reason: result.reason }, "email delivery skipped")
        }
      } catch (err) {
        req.log.error({ err }, "email delivery failed")
        return reply.status(502).send({
          success: false,
          error: "Message received, but email delivery failed. Please try emailing directly.",
        })
      }

      return reply.status(200).send({ success: true })
    },
  )
}
