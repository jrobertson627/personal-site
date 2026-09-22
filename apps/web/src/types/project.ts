export type Project = {
  id: string
  title: string
  description: string
  architecture?: string
  tech: string[]
  status: 'current' | 'complete'
  href?: string
  demoHref?: string
}
