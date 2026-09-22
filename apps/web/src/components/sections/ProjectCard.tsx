import { Button, Card } from '@/components/ui'
import type { Project } from '@/types/project'
import { projectVisuals } from './ProjectVisuals'

export function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <Card className="group flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-md">
      {projectVisuals[project.id] && (
        <div className="overflow-hidden rounded-md border border-border">{projectVisuals[project.id]}</div>
      )}

      <div className="flex items-start justify-between gap-2">
        <h3 className="font-serif text-xl font-semibold">{project.title}</h3>
        {project.status === 'current' && (
          <span className="shrink-0 rounded-full bg-accent-50 px-2 py-0.5 text-xs font-medium text-accent-700">
            In progress
          </span>
        )}
      </div>

      <p className="text-sm text-muted-foreground">{project.description}</p>

      <ul className="flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <li key={tech} className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-foreground">
            {tech}
          </li>
        ))}
      </ul>

      <Button variant="secondary" size="sm" className="mt-2 self-start" onClick={onOpen}>
        View details
      </Button>
    </Card>
  )
}
