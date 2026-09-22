import { Link, Navigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { Container, Section } from '@/components/ui'
import { getPostBySlug, formatPostDate } from '@/lib/posts'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  // Hooks must run unconditionally, so this comes before the early return
  // below — falls back to generic values when there's no post to redirect
  // away from anyway.
  useDocumentMeta(post ? `${post.title} — Jessica Robertson` : 'Jessica Robertson', [
    { name: 'description', content: post?.excerpt ?? '' },
    { property: 'og:title', content: post?.title ?? 'Jessica Robertson' },
    { property: 'og:description', content: post?.excerpt ?? '' },
    { property: 'og:type', content: 'article' },
    { property: 'article:published_time', content: post?.date ?? '' },
  ])

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  return (
    <Section className="min-h-[70vh]">
      <Container className="flex max-w-2xl flex-col gap-8">
        <Link to="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          ← Back to writing
        </Link>

        <div className="flex flex-col gap-3">
          <span className="text-sm text-muted-foreground">{formatPostDate(post.date)}</span>
          <h1 className="font-serif text-4xl font-semibold sm:text-5xl">{post.title}</h1>
          <ul className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="prose-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            // The post title above is already the page's h1 — remap any
            // markdown h1 down to h2 so a post can't accidentally create a
            // second h1 and break the page's heading hierarchy. h2 and
            // deeper are already correctly nested under it as-is.
            components={{ h1: (props) => <h2 {...props} /> }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </Container>
    </Section>
  )
}
