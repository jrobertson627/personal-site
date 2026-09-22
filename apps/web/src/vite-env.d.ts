/// <reference types="vite/client" />

declare module '*.css'

interface ImportMetaEnv {
  // Absolute origin of the API (e.g. https://api.jessicalrobertson.com).
  // Unset in dev, where Vite's own proxy (vite.config.ts) forwards
  // relative /api/* requests to the local API server instead.
  readonly VITE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
