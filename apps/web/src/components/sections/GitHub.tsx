import { Card, Container, Section } from '@/components/ui'
import { useFetch } from '@/hooks/useFetch'
import { formatRelativeTime } from '@/lib/formatRelativeTime'
import type { GitHubActivityItem, GitHubProfile, GitHubRepo } from '@/types/github'

const GITHUB_PROFILE_URL = 'https://github.com/jrobertson627'

function SkeletonBlock({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-background ${className ?? ''}`} />
}

function ProfilePanel() {
  const state = useFetch<GitHubProfile>('/api/github/profile')

  if (state.status === 'loading') {
    return (
      <Card className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <SkeletonBlock className="h-14 w-14 rounded-full" />
          <div className="flex flex-col gap-2">
            <SkeletonBlock className="h-4 w-32" />
            <SkeletonBlock className="h-3 w-24" />
          </div>
        </div>
        <SkeletonBlock className="h-4 w-full" />
      </Card>
    )
  }

  if (state.status === 'error') {
    return (
      <Card className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Couldn&apos;t load GitHub profile right now.</p>
        <a
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-accent underline underline-offset-2"
        >
          View on GitHub
        </a>
      </Card>
    )
  }

  const profile = state.data

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <img
          src={profile.avatarUrl}
          alt=""
          width={56}
          height={56}
          loading="lazy"
          decoding="async"
          className="h-14 w-14 rounded-full"
        />
        <div>
          <p className="font-serif text-lg font-semibold">{profile.name ?? profile.login}</p>
          <a
            href={profile.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            @{profile.login}
          </a>
        </div>
      </div>
      {profile.bio && <p className="text-sm text-muted-foreground">{profile.bio}</p>}
      <div className="flex gap-4 text-sm">
        <span>
          <strong className="text-foreground">{profile.publicRepos}</strong>{' '}
          <span className="text-muted-foreground">repos</span>
        </span>
        <span>
          <strong className="text-foreground">{profile.followers}</strong>{' '}
          <span className="text-muted-foreground">followers</span>
        </span>
        <span>
          <strong className="text-foreground">{profile.following}</strong>{' '}
          <span className="text-muted-foreground">following</span>
        </span>
      </div>
    </Card>
  )
}

function ActivityPanel() {
  const state = useFetch<GitHubActivityItem[]>('/api/github/activity')

  return (
    <Card className="flex flex-col gap-4">
      <h3 className="font-serif text-lg font-semibold">Recent activity</h3>

      {state.status === 'loading' && (
        <div className="flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <SkeletonBlock key={i} className="h-5 w-full" />
          ))}
        </div>
      )}

      {state.status === 'error' && <p className="text-sm text-muted-foreground">Couldn&apos;t load recent activity.</p>}

      {state.status === 'success' &&
        (state.data.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent public activity.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {state.data.map((item, i) => (
              <li key={i} className="flex items-baseline justify-between gap-4 text-sm">
                <span className="text-foreground">
                  {item.summary}
                  {item.repoName && (
                    <>
                      {' '}
                      in <span className="font-medium">{item.repoName.split('/')[1] ?? item.repoName}</span>
                    </>
                  )}
                </span>
                <span className="shrink-0 text-muted-foreground">{formatRelativeTime(item.createdAt)}</span>
              </li>
            ))}
          </ul>
        ))}
    </Card>
  )
}

function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <Card className="flex flex-col gap-3">
      <a
        href={repo.htmlUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-serif text-lg font-semibold transition-colors hover:text-accent"
      >
        {repo.name}
      </a>
      {repo.description && <p className="text-sm text-muted-foreground">{repo.description}</p>}
      <div className="mt-auto flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
            {repo.language}
          </span>
        )}
        {repo.stargazersCount > 0 && <span>★ {repo.stargazersCount}</span>}
        <span>Updated {formatRelativeTime(repo.pushedAt)}</span>
      </div>
    </Card>
  )
}

export function GitHub() {
  const reposState = useFetch<GitHubRepo[]>('/api/github/repos')

  return (
    <Section id="github">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-accent">Live from GitHub</span>
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">On GitHub</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ProfilePanel />
          <ActivityPanel />
        </div>

        {reposState.status === 'loading' && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Card key={i} className="flex flex-col gap-3">
                <SkeletonBlock className="h-5 w-1/2" />
                <SkeletonBlock className="h-10 w-full" />
              </Card>
            ))}
          </div>
        )}

        {reposState.status === 'error' && (
          <p className="text-sm text-muted-foreground">Couldn&apos;t load repositories right now.</p>
        )}

        {reposState.status === 'success' && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reposState.data.map((repo) => (
              <RepoCard key={repo.name} repo={repo} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}
