import { Button, Card } from '@/components/ui'
import type { Project } from '@/types/project'

export function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <Card className="flex flex-col gap-3">
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
