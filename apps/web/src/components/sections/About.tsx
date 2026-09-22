import { Container, Section } from '@/components/ui'
import headshot from '@/assets/headshot.jpg'

const techStack = [
  'Python',
  'TypeScript',
  'SQL',
  'Scala',
  'React',
  'Next.js',
  'FastAPI',
  'PostgreSQL',
  'Docker',
  'Kubernetes',
  'GitLab CI/CD',
  'Playwright',
]

function Avatar() {
  return (
    <img
      src={headshot}
      alt="Jessica Robertson"
      width={192}
      height={192}
      loading="lazy"
      decoding="async"
      className="h-40 w-40 shrink-0 rounded-full object-cover shadow-md sm:h-48 sm:w-48"
    />
  )
}

export function About() {
  return (
    <Section id="about" muted>
      <Container>
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-16">
          <Avatar />

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-3xl font-semibold sm:text-4xl">About</h2>
              <p className="max-w-2xl text-lg text-muted-foreground">
                I&apos;m a software engineer with 3+ years building secure, scalable applications — from
                authorization architecture and microservices to the interfaces people actually use. Most recently, I
                spent a summer at Luris AI, a startup building AI-driven workflow tools for attorneys, where I
                rebuilt row-level security and a shared authorization layer, merged 80+ PRs across a Next.js frontend
                and eight Python microservices, and helped pioneer a multi-model AI planning process the team
                adopted as its standard. Before that, I spent two years at Security Industry Specialists building
                internal tools — including an HR onboarding app that cut candidate search time by 80% — for a team
                supporting over 6,000 employees.
              </p>
              <p className="max-w-2xl text-lg text-muted-foreground">
                I studied Software Engineering Management at Gonzaga University, and I like working close to the
                metal on system design while staying comfortable talking through shifting requirements with
                stakeholders.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-serif text-xl font-semibold">What I&apos;m looking for</h3>
              <p className="max-w-2xl text-muted-foreground">
                A team where I can take on more ownership over system design — ideally one that&apos;s leaning into
                AI-assisted engineering workflows the way I have been.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-serif text-xl font-semibold">Technologies I work with</h3>
              <ul className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border bg-background px-3 py-1 text-sm text-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
