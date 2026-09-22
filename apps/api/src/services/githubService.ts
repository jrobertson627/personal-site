import { getOrFetch } from "../lib/cache"
import { env } from "../config/env"

const GITHUB_API = "https://api.github.com"
// GitHub's REST API rejects requests with no User-Agent header.
const HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "personal-site",
}

type RawGitHubUser = {
  login: string
  name: string | null
  bio: string | null
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
  following: number
}

type RawGitHubRepo = {
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  pushed_at: string
  fork: boolean
}

type RawGitHubEvent = {
  type: string
  repo?: { name: string }
  created_at: string
  payload?: {
    commits?: unknown[]
    ref_type?: string
    action?: string
  }
}

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

async function githubFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${GITHUB_API}${path}`, { headers: HEADERS })
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`)
  }
  return res.json() as Promise<T>
}

const ONE_HOUR = 60 * 60 * 1000
const FIFTEEN_MINUTES = 15 * 60 * 1000

export async function getGitHubProfile(): Promise<GitHubProfile> {
  return getOrFetch(`github:profile:${env.GITHUB_USERNAME}`, ONE_HOUR, async () => {
    const data = await githubFetch<RawGitHubUser>(`/users/${env.GITHUB_USERNAME}`)
    return {
      login: data.login,
      name: data.name,
      bio: data.bio,
      avatarUrl: data.avatar_url,
      htmlUrl: data.html_url,
      publicRepos: data.public_repos,
      followers: data.followers,
      following: data.following,
    }
  })
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  return getOrFetch(`github:repos:${env.GITHUB_USERNAME}`, ONE_HOUR, async () => {
    const data = await githubFetch<RawGitHubRepo[]>(`/users/${env.GITHUB_USERNAME}/repos?sort=pushed&per_page=100`)
    return data
      .filter((repo) => !repo.fork)
      .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
      .slice(0, 6)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        htmlUrl: repo.html_url,
        language: repo.language,
        stargazersCount: repo.stargazers_count,
        pushedAt: repo.pushed_at,
      }))
  })
}

function summarizeEvent(event: RawGitHubEvent): string {
  switch (event.type) {
    case "PushEvent": {
      const count = event.payload?.commits?.length ?? 0
      return `Pushed ${count} commit${count === 1 ? "" : "s"}`
    }
    case "CreateEvent":
      return `Created ${event.payload?.ref_type ?? "repository"}`
    case "IssuesEvent":
      return `${event.payload?.action ?? "Updated"} an issue`
    case "PullRequestEvent":
      return `${event.payload?.action ?? "Updated"} a pull request`
    case "WatchEvent":
      return "Starred repository"
    case "ForkEvent":
      return "Forked repository"
    default:
      return event.type.replace(/Event$/, "")
  }
}

export async function getGitHubActivity(): Promise<GitHubActivityItem[]> {
  return getOrFetch(`github:activity:${env.GITHUB_USERNAME}`, FIFTEEN_MINUTES, async () => {
    const data = await githubFetch<RawGitHubEvent[]>(`/users/${env.GITHUB_USERNAME}/events/public?per_page=10`)
    return data.slice(0, 8).map((event) => ({
      type: event.type,
      repoName: event.repo?.name ?? "",
      createdAt: event.created_at,
      summary: summarizeEvent(event),
    }))
  })
}
