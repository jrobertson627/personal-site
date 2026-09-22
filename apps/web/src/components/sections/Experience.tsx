import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Container, Section } from '@/components/ui'
import { workExperience, education } from '@/data/resume'

const entries = [...workExperience, education]

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

        <ol className="relative flex max-w-2xl flex-col gap-12 border-l-2 border-border pl-10">
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
