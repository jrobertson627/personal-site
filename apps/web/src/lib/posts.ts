import { parseFrontmatter } from './frontmatter'
import type { Post } from '@/types/post'

// Content lives as git-versioned markdown files rather than a CMS/database —
// appropriate for a personal site's writing. Loaded and parsed at build time
// via Vite's glob import, so there's no runtime fetch or backend involved.
const modules = import.meta.glob('/src/content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function slugFromPath(path: string): string {
  return path.split('/').pop()!.replace(/\.md$/, '')
}

export const posts: Post[] = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    return {
      slug: slugFromPath(path),
      title: (data.title as string) ?? slugFromPath(path),
      date: (data.date as string) ?? '',
      excerpt: (data.excerpt as string) ?? '',
      tags: (data.tags as string[]) ?? [],
      content: content.trim(),
    }
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

// `posts` is sorted newest-first, so the post right before this one in the
// array is newer, and the one right after is older.
export function getAdjacentPosts(slug: string): { newer?: Post; older?: Post } {
  const index = posts.findIndex((post) => post.slug === slug)
  if (index === -1) return {}
  return { newer: posts[index - 1], older: posts[index + 1] }
}

export function formatPostDate(date: string): string {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
