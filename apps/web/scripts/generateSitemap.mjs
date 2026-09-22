// Generates public/sitemap.xml from the actual routes: the static pages
// plus one entry per markdown file in src/content/posts. Runs as a
// prebuild step so the sitemap can never drift from what's really there —
// no manual upkeep when a new post is added.
import { readdirSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const postsDir = join(__dirname, '..', 'src', 'content', 'posts')
const publicDir = join(__dirname, '..', 'public')

const siteUrl = (process.env.SITE_URL || 'https://example.com').replace(/\/$/, '')

const slugs = readdirSync(postsDir)
  .filter((file) => file.endsWith('.md'))
  .map((file) => file.replace(/\.md$/, ''))

const paths = ['/', '/blog', ...slugs.map((slug) => `/blog/${slug}`)]

const urls = paths.map((path) => `  <url>\n    <loc>${siteUrl}${path}</loc>\n  </url>`).join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

mkdirSync(publicDir, { recursive: true })
writeFileSync(join(publicDir, 'sitemap.xml'), xml, 'utf-8')

console.log(`Generated sitemap.xml with ${paths.length} URLs (SITE_URL=${siteUrl})`)
if (!process.env.SITE_URL) {
  console.warn(
    '  SITE_URL is not set, so URLs use the placeholder https://example.com. Set SITE_URL once a production domain exists.',
  )
}
