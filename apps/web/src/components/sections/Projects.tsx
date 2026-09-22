import { useMemo, useState } from 'react'
import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Container, Modal, Section } from '@/components/ui'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { projects } from '@/data/projects'
import { ProjectCard } from './ProjectCard'

const card: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 5l10 10M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<string>('All')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const allTech = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.tech))).sort(),
    [],
  )
  const filtered =
    filter === 'All'
      ? projects
      : projects.filter((p) => p.tech.includes(filter))
  const selectedProject = projects.find((p) => p.id === selectedId) ?? null

  return (
    <Section id="projects">
      <Container className="flex flex-col gap-8">
        <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
          Projects
        </h2>

        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by technology"
        >
          {['All', ...allTech].map((tech) => {
            const isActive = filter === tech
            return (
              <button
                key={tech}
                type="button"
                onClick={() => setFilter(tech)}
                aria-pressed={isActive}
                className={clsx(
                  'rounded-full border px-3 py-1 text-sm font-medium transition-colors',
                  isActive
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border bg-background text-muted-foreground hover:text-foreground',
                )}
              >
                {tech}
              </button>
            )
          })}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              custom={i}
              initial={prefersReducedMotion ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={card}
            >
              <ProjectCard
                project={project}
                onOpen={() => setSelectedId(project.id)}
              />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-muted-foreground">
            No projects match that filter yet.
          </p>
        )}
      </Container>

      <Modal
        open={selectedProject !== null}
        onClose={() => setSelectedId(null)}
        titleId="project-modal-title"
      >
        {selectedProject && (
          <>
            <div className="flex items-start justify-between gap-4">
              <h3
                id="project-modal-title"
                className="font-serif text-2xl font-semibold"
              >
                {selectedProject.title}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                aria-label="Close"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-background hover:text-foreground"
              >
                <CloseIcon />
              </button>
            </div>

            <p className="text-muted-foreground">
              {selectedProject.description}
            </p>

            {selectedProject.architecture && (
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-semibold text-foreground">
                  Architecture
                </h4>
                <p className="text-sm text-muted-foreground">
                  {selectedProject.architecture}
                </p>
              </div>
            )}

            <ul className="flex flex-wrap gap-2">
              {selectedProject.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-border bg-background px-3 py-1 text-sm text-foreground"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              {selectedProject.href && (
                <a
                  href={selectedProject.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonStyles({ variant: 'primary', size: 'md' })}
                >
                  View on GitHub
                </a>
              )}
              {selectedProject.demoHref && (
                <a
                  href={selectedProject.demoHref}
                  target={
                    selectedProject.demoHref.startsWith('#')
                      ? undefined
                      : '_blank'
                  }
                  rel={
                    selectedProject.demoHref.startsWith('#')
                      ? undefined
                      : 'noopener noreferrer'
                  }
                  onClick={() => setSelectedId(null)}
                  className={buttonStyles({ variant: 'secondary', size: 'md' })}
                >
                  Live demo
                </a>
              )}
            </div>
          </>
        )}
      </Modal>
    </Section>
  )
}
