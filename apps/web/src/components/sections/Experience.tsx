import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Container, Section } from '@/components/ui'

type TimelineEntry = {
  title: string
  org: string
  period: string
  description?: string
  highlights?: string[]
}

const entries: TimelineEntry[] = [
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
  {
    title: 'Software Engineering Management, General Business',
    org: 'Gonzaga University',
    period: 'May 2023',
    description:
      'Coursework: Software Development, Algorithms and Abstract Data Structures, Database Management Systems, UI/UX Design.',
  },
]

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
}

export function Experience() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <Section id="experience" muted>
      <Container className="flex flex-col gap-10">
        <h2 className="font-serif text-3xl font-semibold sm:text-4xl">Experience</h2>

        <ol className="relative flex flex-col gap-12 border-l-2 border-border pl-10">
          {entries.map((entry, i) => (
            <motion.li
              key={`${entry.title}-${entry.org}`}
              className="relative"
              custom={i}
              initial={prefersReducedMotion ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={item}
            >
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-[calc(2.5rem+3px)] h-3 w-3 rounded-full border-2 border-muted bg-accent"
              />

              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">{entry.period}</span>
                <h3 className="font-serif text-xl font-semibold">{entry.title}</h3>
                <p className="text-base font-medium text-accent">{entry.org}</p>
              </div>

              {entry.description && <p className="mt-3 text-muted-foreground">{entry.description}</p>}

              {entry.highlights && (
                <ul className="mt-3 flex flex-col gap-2">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2 text-muted-foreground">
                      <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
