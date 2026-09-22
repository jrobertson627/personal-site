import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import clsx from 'clsx'
import { Container } from '@/components/ui'
import { useScrolled } from '@/hooks/useScrolled'
import { useActiveSection } from '@/hooks/useActiveSection'
import { ThemeToggle } from '@/components/common/ThemeToggle'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const sectionIds = links.map((link) => link.id)

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled()
  const activeId = useActiveSection(sectionIds)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!open) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 bg-background/80 backdrop-blur transition-shadow duration-200',
        scrolled ? 'border-b border-border shadow-sm' : 'border-b border-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <a href="#home" className="font-serif text-lg font-semibold">
          Jessica Robertson
        </a>

        <nav aria-label="Primary">
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const isActive = activeId === link.id
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? 'page' : undefined}
                    className={clsx(
                      'rounded-md border-b-2 px-3 py-2 text-sm transition-colors',
                      isActive
                        ? 'border-accent font-semibold text-accent'
                        : 'border-transparent text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />

          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            ref={panelRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <ul className="flex flex-col px-4 py-2">
              {links.map((link) => {
                const isActive = activeId === link.id
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => setOpen(false)}
                      className={clsx(
                        'block rounded-md px-3 py-3 text-base',
                        isActive ? 'font-semibold text-accent' : 'text-foreground',
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
