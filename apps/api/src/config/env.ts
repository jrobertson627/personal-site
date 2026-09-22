import { z } from "zod"
import dotenv from "dotenv"

dotenv.config()

const envSchema = z.object({
  PORT: z.string().default("3001"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  RESEND_API_KEY: z.string().optional(),
  CONTACT_TO_EMAIL: z.string().email().default("jessicarobertson627@gmail.com"),
  CONTACT_FROM_EMAIL: z.string().email().default("onboarding@resend.dev"),
  GITHUB_USERNAME: z.string().default("jrobertson627"),
  TELEMETRY_ADMIN_KEY: z.string().optional(),
  ALLOWED_ORIGINS: z.string().default("https://jessicalrobertson.com,https://www.jessicalrobertson.com"),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error("Invalid environment configuration:", parsed.error.flatten().fieldErrors)
  process.exit(1)
}

export const env = {
  ...parsed.data,
  ALLOWED_ORIGINS: parsed.data.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim()),
}
