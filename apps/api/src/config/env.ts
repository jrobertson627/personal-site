import { z } from "zod"
import dotenv from "dotenv"

dotenv.config()

const envSchema = z.object({
  PORT: z.string().default("3001"),
  NODE_ENV: z.string().default("development"),
  RESEND_API_KEY: z.string().optional(),
  CONTACT_TO_EMAIL: z.string().default("jessicarobertson627@gmail.com"),
  CONTACT_FROM_EMAIL: z.string().default("onboarding@resend.dev"),
  GITHUB_USERNAME: z.string().default("jrobertson627"),
})

export const env = envSchema.parse(process.env)
