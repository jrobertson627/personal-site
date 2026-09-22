import type { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: 'college-basketball-web-scraper',
    title: 'College Basketball Web Scraper',
    description:
      'Using AI coding tools to speed up building a college basketball data scraper and sharpen AI-assisted development skills — the first step toward a personal app for streamlining March Madness picks.',
    tech: ['Python'],
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
