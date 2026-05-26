const API_URL = import.meta.env.VITE_API_URL

if (!API_URL) {
  throw new Error("Missing VITE_API_URL")
}

export async function getHello() {
  const res = await fetch(`${API_URL}/api/hello`)
  if (!res.ok) throw new Error("API error")
  return res.json()
}