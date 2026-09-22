import type { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: 'college-basketball-web-scraper',
    title: 'College Basketball Web Scraper',
    description:
      'Using AI coding tools to speed up building a college basketball data scraper and sharpen AI-assisted development skills — the first step toward a personal app for streamlining March Madness picks.',
    architecture:
      'Organized around six boundaries — fetcher, discovery, parsers, domain, persistence, and api — composed by an orchestrator in application/. The fetcher is the only boundary allowed to touch the network (pacing, retries, raw snapshots); persistence targets Postgres via versioned migrations, with deterministic in-memory adapters for fixture/local mode so tests never open a real connection. A read-only HTTP API exposes local projections.',
    tech: ['Node.js', 'JavaScript'],
    status: 'current',
    href: 'https://github.com/jrobertson627/web-scraper',
  },
  {
    id: 'personal-site',
    title: 'Personal Site',
    description:
      'Building this to round out full-stack skills and have a place to showcase work — the site you’re looking at right now.',
    tech: ['TypeScript', 'React', 'Fastify'],
    status: 'current',
    href: 'https://github.com/jrobertson627/personal-site',
  },
]
