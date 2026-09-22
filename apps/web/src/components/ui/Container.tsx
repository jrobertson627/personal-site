import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'
import clsx from 'clsx'

export type ContainerProps = HTMLAttributes<HTMLDivElement>

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={clsx('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', className)} {...props} />
  ),
)
Container.displayName = 'Container'
