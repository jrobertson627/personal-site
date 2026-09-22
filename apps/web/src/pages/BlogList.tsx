import { Link } from 'react-router-dom'
import { Container, Section } from '@/components/ui'
import { posts, formatPostDate } from '@/lib/posts'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

const DESCRIPTION = 'Notes and write-ups from Jessica Robertson on building software.'

export function BlogList() {
  useDocumentMeta('Writing — Jessica Robertson', [
    { name: 'description', content: DESCRIPTION },
    { property: 'og:title', content: 'Writing — Jessica Robertson' },
    { property: 'og:description', content: DESCRIPTION },
    { property: 'og:type', content: 'website' },
  ])

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
          <ul className="flex flex-col gap-8">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-border pb-8 last:border-b-0 last:pb-0">
                <Link to={`/blog/${post.slug}`} className="group flex flex-col gap-2">
                  <span className="text-sm text-muted-foreground">{formatPostDate(post.date)}</span>
                  <h2 className="font-serif text-2xl font-semibold transition-colors group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="max-w-2xl text-muted-foreground">{post.excerpt}</p>
                  <ul className="flex flex-wrap gap-2 pt-1">
                    {post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs text-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  )
}
