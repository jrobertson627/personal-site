import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Nav } from './Nav'

export function Layout() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return

    // Runs after React commits the route's DOM, unlike the browser's own
    // scroll-to-hash-on-load, which can fire before the target element
    // exists and silently leave the page at the top.
    const id = location.hash.slice(1)
    const target = document.getElementById(id)
    target?.scrollIntoView()
  }, [location.pathname, location.hash])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Outlet />
      </main>
    </>
  )
}
