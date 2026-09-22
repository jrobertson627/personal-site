// Single source of truth for resume content — consumed by the on-site
// Experience/Skills sections AND the /resume page (and its generated PDF),
// so there's exactly one place to update when a job or skill changes.

export type ExperienceEntry = {
  title: string
  org: string
  period: string
  description?: string
  highlights?: string[]
}

export type SkillCategory = {
  title: string
  skills: string[]
}

export const contact = {
  name: 'Jessica Robertson',
  title: 'Software Engineer',
  email: 'jessicarobertson627@gmail.com',
  githubUrl: 'https://github.com/jrobertson627',
  linkedinUrl: 'https://www.linkedin.com/in/jessica-lani-robertson/',
  siteUrl: 'https://jessicalrobertson.com',
}

export const summary =
  "Software engineer with 3+ years building secure, scalable applications — from authorization architecture and microservices to the interfaces people actually use. Most recently rebuilt row-level security and a shared authorization layer at an AI-driven legal tech startup, merging 80+ PRs across a Next.js frontend and eight Python microservices."

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: ['TypeScript', 'React', 'Next.js', 'Salesforce Lightning Web Components'],
  },
  {
    title: 'Backend',
    skills: [
      'Python',
      'SQL',
      'Scala',
      'FastAPI',
      'PostgreSQL',
      'REST APIs',
      'Row-level security',
      'Multi-tenant authorization design',
    ],
  },
  {
    title: 'Tooling & DevOps',
    skills: ['Docker', 'Kubernetes', 'GitLab', 'CI/CD', 'Playwright', 'AI-assisted planning & code generation'],
  },
]

export const workExperience: ExperienceEntry[] = [
  {
    title: 'Software Engineer (Contract)',
    org: 'Luris AI — startup building AI-driven workflow tools for attorneys',
    period: 'June 2026 – September 2026',
    highlights: [
      'Rebuilt PostgreSQL row-level security and a shared FastAPI authorization layer across 3 services to enforce attorney conflict-of-interest rules under ABA Model Rule 1.6/1.9, shipping 7 production PRs and closing a critical WebSocket vulnerability that exposed private user notifications.',
      'Merged 80+ PRs and closed 100+ issues across a Next.js frontend and 8 Python microservices in under 10 weeks, including tracking down a production login failure and a file-upload bug blocking large client document uploads.',
      'Pioneered a multi-model AI planning workflow — separate architect, implementer, and adversarial-review passes — that caught security issues early and became the team’s standard process.',
      'Built an automated Playwright suite covering 13 real-world failure scenarios in the client intake flow, catching 2 defects before they shipped.',
      'Cleaned up a config-drift problem spanning 150+ files by consolidating hardcoded values into one source of truth, with CI checks to keep it from happening again.',
    ],
  },
  {
    title: 'Software Engineer',
    org: 'Security Industry Specialists',
    period: 'June 2023 – May 2025',
    highlights: [
      'Built a new HR onboarding/hiring app that cut candidate search time by 80% and automated 73% of manual hiring steps.',
      'Built custom Salesforce apps with code-based Lightning Web Components so the HR director could pull job-site and employee stats directly.',
      'Set up a library of reusable front-end components the team could pull from instead of rebuilding UI pieces each time.',
      'Supported custom applications (HRIS, ATS, Expense Management, Onboarding, Hiring) for over 6,000 employees, maintaining legacy Scala services and containerized per-API deployments across a 7-person engineering team.',
    ],
  },
]

export const education: ExperienceEntry = {
  title: 'Software Engineering Management, General Business',
  org: 'Gonzaga University',
  period: 'May 2023',
  description:
    'Coursework: Software Development, Algorithms and Abstract Data Structures, Database Management Systems, UI/UX Design.',
}
