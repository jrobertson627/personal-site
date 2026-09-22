import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Card, Container, Section } from '@/components/ui'

type SkillCategory = {
  title: string
  skills: string[]
}

const categories: SkillCategory[] = [
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

const card: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
}

export function Skills() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <Section id="skills">
      <Container className="flex flex-col gap-8">
        <h2 className="font-serif text-3xl font-semibold sm:text-4xl">Skills</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map(({ title, skills }, i) => (
            <motion.div
              key={title}
              custom={i}
              initial={prefersReducedMotion ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={card}
            >
              <Card className="flex h-full flex-col gap-4 transition-shadow duration-200 hover:shadow-md">
                <h3 className="font-serif text-xl font-semibold">{title}</h3>
                <ul className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border bg-background px-3 py-1 text-sm text-foreground"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
