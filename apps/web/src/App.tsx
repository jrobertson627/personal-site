const API = import.meta.env.VITE_API_URL

import { useEffect, useState } from 'react'

type ApiResponse = {
  message: string
}

export default function App() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API}/api/hello`)
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error('API error:', err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My App</h1>

      {loading && <p>Loading...</p>}

      {!loading && data && <p style={styles.message}>{data.message}</p>}

      {!loading && !data && <p style={{ color: 'red' }}>Failed to load API</p>}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: 'system-ui, sans-serif',
    padding: '2rem',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.2rem',
    color: 'green',
  },
}
