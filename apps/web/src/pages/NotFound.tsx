import { Link } from 'react-router-dom'
import { Container, Section } from '@/components/ui'
import { buttonStyles } from '@/components/ui/buttonStyles'

export function NotFound() {
  return (
    <Section className="flex min-h-[70vh] items-center">
      <Container className="flex flex-col items-start gap-4">
        <span className="text-sm font-medium text-accent">404</span>
        <h1 className="font-serif text-4xl font-semibold sm:text-5xl">Page not found</h1>
        <p className="max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist, or may have moved.
        </p>
        <Link to="/" className={buttonStyles({ variant: 'primary', size: 'lg' })}>
          Back home
        </Link>
      </Container>
    </Section>
  )
}
