import { z } from "zod"
import { app } from "../config/server"

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Enter a valid email address"),
  message: z.string().trim().min(1, "Message is required").max(5000),
})

export function contactRoute() {
  app.post("/api/contact", async (req, reply) => {
    const parsed = contactSchema.safeParse(req.body)

    if (!parsed.success) {
      return reply.status(400).send({
        success: false,
        error: parsed.error.issues[0]?.message ?? "Invalid submission",
      })
    }

    // TODO(#18): send this via a real email delivery service, add spam
    // prevention and structured logging. For now this just accepts and
    // acknowledges the submission.
    console.log("Contact form submission:", parsed.data)

    return reply.status(200).send({ success: true })
  })
}
