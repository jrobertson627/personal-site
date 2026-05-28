import { z } from "zod"
import dotenv from "dotenv"

dotenv.config()

const envSchema = z.object({
  PORT: z.string().default("3001"),
  NODE_ENV: z.string().default("development"),
})

export const env = envSchema.parse(process.env)