import { Container, Section } from '@/components/ui'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { trackCtaClick } from '@/lib/telemetry'
import { contact, summary, skillCategories, workExperience, education } from '@/data/resume'

const DESCRIPTION = `${contact.name} — ${contact.title}. Experience, skills, and education.`

function EntryBlock({
  title,
  org,
  period,
  description,
  highlights,
}: {
  title: string
  org: string
  period: string
  description?: string
  highlights?: string[]
}) {
  return (
    <div className="flex flex-col gap-1.5 print:break-inside-avoid">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
        <h3 className="font-serif text-lg font-semibold">{title}</h3>
        <span className="text-sm text-muted-foreground print:text-neutral-600">{period}</span>
      </div>
      <p className="text-sm font-medium text-accent print:text-neutral-800">{org}</p>
      {description && <p className="text-sm text-muted-foreground print:text-neutral-700">{description}</p>}
      {highlights && (
        <ul className="mt-1 flex flex-col gap-1">
          {highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2 text-sm text-muted-foreground print:text-neutral-700">
              <span
                aria-hidden="true"
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground print:bg-neutral-500"
              />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function Resume() {
  useDocumentMeta(`${contact.name} — Resume`, [
    { name: 'description', content: DESCRIPTION },
    { property: 'og:title', content: `${contact.name} — Resume` },
    { property: 'og:description', content: DESCRIPTION },
    { property: 'og:type', content: 'website' },
  ])

  return (
    <Section className="print:bg-white print:py-0">
      <Container className="flex max-w-3xl flex-col gap-10 print:max-w-none print:gap-6">
        <div className="flex flex-wrap items-start justify-between gap-4 print:flex-col print:gap-1">
          <div className="flex flex-col gap-1">
            <h1 className="font-serif text-4xl font-semibold print:text-black">{contact.name}</h1>
            <p className="text-lg font-medium text-accent print:text-neutral-800">{contact.title}</p>
            <p className="text-sm text-muted-foreground print:text-neutral-700">
              {contact.email} · {contact.siteUrl.replace('https://', '')} · {contact.githubUrl.replace('https://', '')}
            </p>
          </div>

          <div className="flex gap-3 print:hidden">
            <a
              href="/resume.pdf"
              download
              onClick={() => trackCtaClick('resume_download_pdf')}
              className={buttonStyles({ variant: 'primary' })}
            >
              Download PDF
            </a>
            <button
              type="button"
              onClick={() => {
                trackCtaClick('resume_print')
                window.print()
              }}
              className={buttonStyles({ variant: 'secondary' })}
            >
              Print
            </button>
          </div>
        </div>

        <p className="max-w-2xl text-muted-foreground print:max-w-none print:text-neutral-800">{summary}</p>

        <div className="flex flex-col gap-3">
          <h2 className="font-serif text-xl font-semibold print:text-black">Skills</h2>
          <div className="flex flex-col gap-2">
            {skillCategories.map((category) => (
              <p key={category.title} className="text-sm text-muted-foreground print:text-neutral-700">
                <span className="font-medium text-foreground print:text-black">{category.title}:</span>{' '}
                {category.skills.join(', ')}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="font-serif text-xl font-semibold print:text-black">Experience</h2>
          {workExperience.map((entry) => (
            <EntryBlock key={`${entry.title}-${entry.org}`} {...entry} />
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-serif text-xl font-semibold print:text-black">Education</h2>
          <EntryBlock {...education} />
        </div>
      </Container>
    </Section>
  )
}
