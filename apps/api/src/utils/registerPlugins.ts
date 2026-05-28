import { corsPlugin } from "../plugins/cors"

export async function registerPlugins(app: any) {
  await corsPlugin(app)
}