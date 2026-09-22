export type Project = {
  id: string
  title: string
  description: string
  tech: string[]
  status: 'current' | 'complete'
  href?: string
}
