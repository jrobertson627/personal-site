import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { trackError } from '@/lib/telemetry'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    trackError(error.message, info.componentStack ?? undefined)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-2 px-4 text-center">
          <h1 className="font-serif text-2xl font-semibold">Something went wrong</h1>
          <p className="text-muted-foreground">Try reloading the page.</p>
        </div>
      )
    }

    return this.props.children
  }
}
