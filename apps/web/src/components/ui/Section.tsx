import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'
import clsx from 'clsx'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  muted?: boolean
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, muted = false, ...props }, ref) => (
    <section
      ref={ref}
      className={clsx('py-16 md:py-24', muted ? 'bg-muted' : 'bg-background', className)}
      {...props}
    />
  ),
)
Section.displayName = 'Section'
