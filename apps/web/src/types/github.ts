export type GitHubProfile = {
  login: string
  name: string | null
  bio: string | null
  avatarUrl: string
  htmlUrl: string
  publicRepos: number
  followers: number
  following: number
}

export type GitHubRepo = {
  name: string
  description: string | null
  htmlUrl: string
  language: string | null
  stargazersCount: number
  pushedAt: string
}

export type GitHubActivityItem = {
  type: string
  repoName: string
  createdAt: string
  summary: string
}
