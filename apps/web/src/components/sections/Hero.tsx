import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Container, Section } from '@/components/ui'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { SocialLinks } from '@/components/common/SocialLinks'
import { trackCtaClick } from '@/lib/telemetry'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

function BackgroundAccents() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent-400/30 blur-3xl"
        animate={prefersReducedMotion ? undefined : { y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-accent-600/20 blur-3xl"
        animate={prefersReducedMotion ? undefined : { y: [0, -20, 0], x: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <Section id="home" className="relative flex min-h-[85vh] items-center overflow-hidden">
      <BackgroundAccents />

      <Container className="relative">
        <motion.div
          initial={prefersReducedMotion ? false : 'hidden'}
          animate="show"
          variants={container}
          className="flex max-w-2xl flex-col gap-6"
        >
          <motion.h1 variants={item} className="font-serif text-5xl font-semibold tracking-tight sm:text-6xl">
            Jessica Robertson
          </motion.h1>

          <motion.p variants={item} className="text-xl font-medium text-accent sm:text-2xl">
            Software Engineer
          </motion.p>

          <motion.p variants={item} className="max-w-xl text-lg text-muted-foreground">
            I&apos;m a software engineer who builds secure, scalable systems — from authorization architecture and
            microservices to the front-end experiences on top. I like turning ambiguous requirements into shipped
            features, and I&apos;m currently exploring AI-assisted engineering workflows.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              onClick={() => trackCtaClick('hero_view_my_work')}
              className={buttonStyles({ variant: 'primary', size: 'lg' })}
            >
              View my work
            </a>
            <a
              href="#contact"
              onClick={() => trackCtaClick('hero_get_in_touch')}
              className={buttonStyles({ variant: 'secondary', size: 'lg' })}
            >
              Get in touch
            </a>
          </motion.div>

          <motion.div variants={item}>
            <SocialLinks />
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}
