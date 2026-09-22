import { corsPlugin } from "../plugins/cors"
import { rateLimitPlugin } from "../plugins/rateLimit"

export async function registerPlugins(app: any) {
  await corsPlugin(app)
  await rateLimitPlugin(app)
}