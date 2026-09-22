import type { ReactNode } from 'react'
import { Button, Card, Container, Section } from '@/components/ui'
import { Nav } from '@/components/layout/Nav'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Experience } from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact'

const neutralSwatches = [
  { label: 'neutral-50', className: 'bg-neutral-50' },
  { label: 'neutral-100', className: 'bg-neutral-100' },
  { label: 'neutral-200', className: 'bg-neutral-200' },
  { label: 'neutral-300', className: 'bg-neutral-300' },
  { label: 'neutral-400', className: 'bg-neutral-400' },
  { label: 'neutral-500', className: 'bg-neutral-500' },
  { label: 'neutral-600', className: 'bg-neutral-600' },
  { label: 'neutral-700', className: 'bg-neutral-700' },
  { label: 'neutral-800', className: 'bg-neutral-800' },
  { label: 'neutral-900', className: 'bg-neutral-900' },
  { label: 'neutral-950', className: 'bg-neutral-950' },
]

const accentSwatches = [
  { label: 'accent-50', className: 'bg-accent-50' },
  { label: 'accent-100', className: 'bg-accent-100' },
  { label: 'accent-200', className: 'bg-accent-200' },
  { label: 'accent-300', className: 'bg-accent-300' },
  { label: 'accent-400', className: 'bg-accent-400' },
  { label: 'accent-500', className: 'bg-accent-500' },
  { label: 'accent-600', className: 'bg-accent-600' },
  { label: 'accent-700', className: 'bg-accent-700' },
  { label: 'accent-800', className: 'bg-accent-800' },
  { label: 'accent-900', className: 'bg-accent-900' },
]

const typeScale: { label: string; className: string }[] = [
  { label: 'text-xs', className: 'text-xs' },
  { label: 'text-sm', className: 'text-sm' },
  { label: 'text-base', className: 'text-base' },
  { label: 'text-lg', className: 'text-lg' },
  { label: 'text-xl', className: 'text-xl' },
  { label: 'text-2xl', className: 'text-2xl' },
  { label: 'text-3xl', className: 'text-3xl' },
  { label: 'text-4xl', className: 'text-4xl' },
  { label: 'text-5xl', className: 'text-5xl' },
  { label: 'text-6xl', className: 'text-6xl' },
]

function Swatch({ label, className }: { label: string; className: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`h-14 w-full rounded-md border border-border ${className}`} />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}

function PlaceholderSection({
  id,
  title,
  note,
  muted,
}: {
  id: string
  title: string
  note: string
  muted?: boolean
}) {
  return (
    <Section id={id} muted={muted} className="flex min-h-[70vh] items-center">
      <Container>
        <h2 className="font-serif text-3xl font-semibold sm:text-4xl">{title}</h2>
        <p className="mt-2 text-muted-foreground">{note}</p>
      </Container>
    </Section>
  )
}

function StyleGuideSection({
  title,
  muted,
  children,
}: {
  title: string
  muted?: boolean
  children: ReactNode
}) {
  return (
    <Section muted={muted}>
      <Container className="flex flex-col gap-6">
        <h3 className="font-serif text-2xl font-semibold">{title}</h3>
        {children}
      </Container>
    </Section>
  )
}

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <PlaceholderSection id="projects" title="Projects" note="Coming in issue #11." />
        <Contact />

        <Section>
          <Container className="flex flex-col gap-2 border-t border-border pt-10">
            <span className="text-sm font-medium text-accent">Design system reference</span>
            <h2 className="font-serif text-3xl font-semibold">Tokens &amp; primitives</h2>
            <p className="max-w-xl text-muted-foreground">
              Living reference for the tokens and components from issue #1 — not part of the nav, kept here while
              the real sections above are built out.
            </p>
          </Container>
        </Section>

        <StyleGuideSection title="Typography" muted>
          <div className="flex flex-col gap-4">
            {typeScale.map(({ label, className }) => (
              <div key={label} className="flex items-baseline gap-4">
                <span className="w-20 shrink-0 text-xs text-muted-foreground">{label}</span>
                <span className={className}>The quick brown fox jumps</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 pt-4">
            <span className="text-xs text-muted-foreground">font-serif (headings)</span>
            <p className="font-serif text-2xl">Fraunces sets the tone for headings.</p>
            <span className="pt-4 text-xs text-muted-foreground">font-sans (body / UI, default)</span>
            <p className="text-base">Inter carries body copy and interface text at a comfortable 1.6 line height.</p>
          </div>
        </StyleGuideSection>

        <StyleGuideSection title="Color">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-muted-foreground">Neutral</span>
            <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 lg:grid-cols-11">
              {neutralSwatches.map((swatch) => (
                <Swatch key={swatch.label} {...swatch} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-4">
            <span className="text-sm font-medium text-muted-foreground">Accent</span>
            <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 lg:grid-cols-10">
              {accentSwatches.map((swatch) => (
                <Swatch key={swatch.label} {...swatch} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-4">
            <span className="text-sm font-medium text-muted-foreground">Semantic</span>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="flex flex-col gap-2">
                <div className="h-14 w-full rounded-md border border-border bg-background" />
                <span className="text-xs text-muted-foreground">background</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-14 w-full rounded-md border border-border bg-muted" />
                <span className="text-xs text-muted-foreground">muted</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-14 w-full rounded-md bg-accent" />
                <span className="text-xs text-muted-foreground">accent</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-14 w-full rounded-md border-2 border-border" />
                <span className="text-xs text-muted-foreground">border</span>
              </div>
            </div>
          </div>
        </StyleGuideSection>

        <StyleGuideSection title="Buttons" muted>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <p className="text-sm text-muted-foreground">Tab to a button to see the focus ring.</p>
        </StyleGuideSection>

        <StyleGuideSection title="Cards">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col gap-2">
              <h3 className="font-serif text-xl font-semibold">Card title</h3>
              <p className="text-sm text-muted-foreground">
                Cards sit one step brighter than the page background, with a soft border and shadow.
              </p>
            </Card>
            <Card className="flex flex-col gap-2">
              <h3 className="font-serif text-xl font-semibold">Another card</h3>
              <p className="text-sm text-muted-foreground">Consistent radius and padding across the board.</p>
              <Button variant="secondary" size="sm" className="mt-2 self-start">
                Action
              </Button>
            </Card>
            <Card className="flex flex-col gap-2">
              <h3 className="font-serif text-xl font-semibold">Third card</h3>
              <p className="text-sm text-muted-foreground">This is where project/skill cards will live later.</p>
            </Card>
          </div>
        </StyleGuideSection>
      </main>
    </>
  )
}
