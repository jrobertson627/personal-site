import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { Container, Section } from '@/components/ui'
import { posts, formatPostDate } from '@/lib/posts'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

const DESCRIPTION = 'Notes and write-ups from Jessica Robertson on building software.'

const allTags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort()

export function BlogList() {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  useDocumentMeta('Writing — Jessica Robertson', [
    { name: 'description', content: DESCRIPTION },
    { property: 'og:title', content: 'Writing — Jessica Robertson' },
    { property: 'og:description', content: DESCRIPTION },
    { property: 'og:type', content: 'website' },
  ])

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return posts.filter((post) => {
      const matchesQuery =
        !normalizedQuery ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery)
      const matchesTag = !activeTag || post.tags.includes(activeTag)
      return matchesQuery && matchesTag
    })
  }, [query, activeTag])

  const isFiltering = query.trim() !== '' || activeTag !== null

  return (
    <Section className="min-h-[70vh]">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-accent">Writing</span>
          <h1 className="font-serif text-4xl font-semibold sm:text-5xl">Notes &amp; write-ups</h1>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">Nothing published yet — check back soon.</p>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="blog-search" className="sr-only">
                  Search posts
                </label>
                <input
                  id="blog-search"
                  type="search"
                  placeholder="Search posts…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full max-w-sm rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {allTags.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {allTags.map((tag) => {
                    const isActive = activeTag === tag
                    return (
                      <li key={tag}>
                        <button
                          type="button"
                          aria-pressed={isActive}
                          onClick={() => setActiveTag(isActive ? null : tag)}
                          className={clsx(
                            'rounded-full border px-2.5 py-0.5 text-xs transition-colors',
                            isActive
                              ? 'border-accent bg-accent text-accent-foreground'
                              : 'border-border bg-muted text-foreground hover:border-accent',
                          )}
                        >
                          {tag}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            <p role="status" aria-live="polite" className="sr-only">
              {isFiltering ? `${filteredPosts.length} post${filteredPosts.length === 1 ? '' : 's'} found` : ''}
            </p>

            {filteredPosts.length === 0 ? (
              <p className="text-muted-foreground">No posts match your search.</p>
            ) : (
              <ul className="flex flex-col gap-8">
                {filteredPosts.map((post) => (
                  <li key={post.slug} className="border-b border-border pb-8 last:border-b-0 last:pb-0">
                    <Link to={`/blog/${post.slug}`} className="group flex flex-col gap-2">
                      <span className="text-sm text-muted-foreground">{formatPostDate(post.date)}</span>
                      <h2 className="font-serif text-2xl font-semibold transition-colors group-hover:text-accent">
                        {post.title}
                      </h2>
                      <p className="max-w-2xl text-muted-foreground">{post.excerpt}</p>
                    </Link>
                    {post.tags.length > 0 && (
                      <ul className="flex flex-wrap gap-2 pt-2">
                        {post.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs text-foreground"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </Container>
    </Section>
  )
}
