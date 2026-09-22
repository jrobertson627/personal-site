import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ThemeContext } from './ThemeContext'
import type { Theme } from './ThemeContext'

function getInitialTheme(): Theme {
  // The inline script in index.html already sets this attribute before
  // React mounts (avoiding a flash of the wrong theme), so we just read
  // whatever it decided rather than re-deriving from localStorage/matchMedia.
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Storage unavailable (private browsing, etc.) — theme just won't persist.
    }
  }, [theme])

  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
