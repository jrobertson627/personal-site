import { app } from "../config/server"
import { getGitHubActivity, getGitHubProfile, getGitHubRepos } from "../services/githubService"

export function githubRoute() {
  app.get("/api/github/profile", async (req, reply) => {
    try {
      const profile = await getGitHubProfile()
      return { success: true, data: profile }
    } catch (err) {
      req.log.error({ err }, "failed to fetch GitHub profile")
      return reply.status(502).send({ success: false, error: "Failed to fetch GitHub profile" })
    }
  })

  app.get("/api/github/repos", async (req, reply) => {
    try {
      const repos = await getGitHubRepos()
      return { success: true, data: repos }
    } catch (err) {
      req.log.error({ err }, "failed to fetch GitHub repos")
      return reply.status(502).send({ success: false, error: "Failed to fetch GitHub repositories" })
    }
  })

  app.get("/api/github/activity", async (req, reply) => {
    try {
      const activity = await getGitHubActivity()
      return { success: true, data: activity }
    } catch (err) {
      req.log.error({ err }, "failed to fetch GitHub activity")
      return reply.status(502).send({ success: false, error: "Failed to fetch GitHub activity" })
    }
  })
}
