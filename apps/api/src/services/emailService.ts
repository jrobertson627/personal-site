import { Resend } from "resend"
import { env } from "../config/env"

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null

export type ContactEmailInput = {
  name: string
  email: string
  message: string
}

export type SendResult = { sent: true; id?: string } | { sent: false; reason: string }

export async function sendContactEmail(data: ContactEmailInput): Promise<SendResult> {
  if (!resend) {
    return { sent: false, reason: "RESEND_API_KEY not configured — logging only" }
  }

  const result = await resend.emails.send({
    from: env.CONTACT_FROM_EMAIL,
    to: env.CONTACT_TO_EMAIL,
    replyTo: data.email,
    subject: `New contact form message from ${data.name}`,
    text: `From: ${data.name} <${data.email}>\n\n${data.message}`,
  })

  if (result.error) {
    throw new Error(result.error.message)
  }

  return { sent: true, id: result.data?.id }
}
