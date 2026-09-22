import { useState } from 'react'
import type { FormEvent } from 'react'
import { z } from 'zod'
import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Button, Container, Section } from '@/components/ui'
import { SocialLinks } from '@/components/common/SocialLinks'

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(200),
  email: z.string().trim().email('Enter a valid email address'),
  message: z.string().trim().min(1, 'Message is required').max(5000),
  // Honeypot: kept out of sight (see the hidden field below) so only bots fill it in.
  company: z.string().optional(),
})

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

type ContactFormValues = z.infer<typeof contactSchema>
type FieldErrors = Partial<Record<keyof ContactFormValues, string>>
type Status = 'idle' | 'submitting' | 'success' | 'error'

const initialValues: ContactFormValues = { name: '', email: '', message: '', company: '' }

const fieldClasses =
  'w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground'

export function Contact() {
  const [values, setValues] = useState<ContactFormValues>(initialValues)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [formError, setFormError] = useState<string | null>(null)

  function updateField<K extends keyof ContactFormValues>(
    field: K,
    value: string,
  ) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const result = contactSchema.safeParse(values)
    if (!result.success) {
      const errors: FieldErrors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactFormValues
        if (!errors[field]) errors[field] = issue.message
      }
      setFieldErrors(errors)
      setStatus('idle')
      return
    }

    setFieldErrors({})
    setFormError(null)
    setStatus('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })
      const json = await res.json()

      if (!res.ok || !json.success) {
        throw new Error(json.error ?? 'Something went wrong. Please try again.')
      }

      setStatus('success')
      setValues(initialValues)
    } catch (err) {
      setStatus('error')
      setFormError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.',
      )
    }
  }

  const isSubmitting = status === 'submitting'
  const prefersReducedMotion = useReducedMotion()

  return (
    <Section id="contact" muted>
      <Container>
        <motion.div
          initial={prefersReducedMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          className="flex flex-col gap-10 lg:flex-row lg:justify-between"
        >
          <div className="flex max-w-md flex-col gap-4">
            <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
              Contact
            </h2>
            <p className="text-lg text-muted-foreground">
              Have a role, project, or question in mind? Send a message, or
              reach out directly.
            </p>
            <SocialLinks className="mt-2" />
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex w-full max-w-md flex-col gap-4"
          >
            {/* Honeypot — invisible to sighted users and screen readers, off the tab order.
                Any bot that fills in every field it can find will trip this. */}
            <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
              <label htmlFor="contact-company">Company</label>
              <input
                id="contact-company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.company}
                onChange={(e) => updateField('company', e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-name"
                className="text-sm font-medium text-foreground"
              >
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={(e) => updateField('name', e.target.value)}
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={
                  fieldErrors.name ? 'contact-name-error' : undefined
                }
                className={`${fieldClasses} ${fieldErrors.name ? 'border-red-500' : 'border-border'}`}
              />
              {fieldErrors.name && (
                <p id="contact-name-error" className="text-sm text-red-600 dark:text-red-400">
                  {fieldErrors.name}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => updateField('email', e.target.value)}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={
                  fieldErrors.email ? 'contact-email-error' : undefined
                }
                className={`${fieldClasses} ${fieldErrors.email ? 'border-red-500' : 'border-border'}`}
              />
              {fieldErrors.email && (
                <p id="contact-email-error" className="text-sm text-red-600 dark:text-red-400">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-message"
                className="text-sm font-medium text-foreground"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={values.message}
                onChange={(e) => updateField('message', e.target.value)}
                aria-invalid={Boolean(fieldErrors.message)}
                aria-describedby={
                  fieldErrors.message ? 'contact-message-error' : undefined
                }
                className={`${fieldClasses} resize-none ${fieldErrors.message ? 'border-red-500' : 'border-border'}`}
              />
              {fieldErrors.message && (
                <p id="contact-message-error" className="text-sm text-red-600 dark:text-red-400">
                  {fieldErrors.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="self-start"
            >
              {isSubmitting ? 'Sending…' : 'Send message'}
            </Button>

            <div role="status" aria-live="polite">
              {status === 'success' && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  Message sent — I&apos;ll get back to you soon.
                </p>
              )}
              {status === 'error' && formError && (
                <p className="text-sm text-red-600 dark:text-red-400">{formError}</p>
              )}
            </div>
          </form>
        </motion.div>
      </Container>
    </Section>
  )
}
