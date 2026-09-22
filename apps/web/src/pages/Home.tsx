import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Experience } from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact'
import { Projects } from '@/components/sections/Projects'
import { GitHub } from '@/components/sections/GitHub'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

const DESCRIPTION =
  'Jessica Robertson is a software engineer building secure, scalable full-stack applications. Portfolio, projects, and writing.'

export function Home() {
  useDocumentMeta('Jessica Robertson — Software Engineer', [
    { name: 'description', content: DESCRIPTION },
    { property: 'og:title', content: 'Jessica Robertson — Software Engineer' },
    { property: 'og:description', content: DESCRIPTION },
    { property: 'og:type', content: 'website' },
  ])

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <GitHub />
      <Contact />
    </>
  )
}
