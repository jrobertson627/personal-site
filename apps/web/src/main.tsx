import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Home } from '@/pages/Home'
import { BlogList } from '@/pages/BlogList'
import { BlogPost } from '@/pages/BlogPost'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { reportWebVitals } from '@/lib/reportWebVitals'
import { trackError } from '@/lib/telemetry'
import './index.css'

window.addEventListener('error', (event) => {
  trackError(event.message, event.error?.stack)
})

window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason
  trackError(reason instanceof Error ? reason.message : String(reason), reason instanceof Error ? reason.stack : undefined)
})

reportWebVitals()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
