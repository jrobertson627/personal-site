import { corsPlugin } from "../plugins/cors"
import { rateLimitPlugin } from "../plugins/rateLimit"
import { helmetPlugin } from "../plugins/helmet"

export async function registerPlugins(app: any) {
  await helmetPlugin(app)
  await corsPlugin(app)
  await rateLimitPlugin(app)
}