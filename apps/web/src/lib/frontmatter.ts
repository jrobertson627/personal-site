// A minimal YAML-frontmatter parser scoped to what our own posts actually
// use (quoted strings, bracketed string arrays). Avoids pulling in
// gray-matter, which depends on Node's Buffer global and crashes in the
// browser without a polyfill.

function parseValue(value: string): unknown {
  const trimmed = value.trim()

  if (/^".*"$/.test(trimmed) || /^'.*'$/.test(trimmed)) {
    return trimmed.slice(1, -1)
  }

  if (/^\[.*\]$/.test(trimmed)) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((item) => item.trim().replace(/^["']|["']$/g, ''))
      .filter(Boolean)
  }

  return trimmed
}

export function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const [, frontmatterBlock, content] = match
  const data: Record<string, unknown> = {}

  for (const line of frontmatterBlock.split(/\r?\n/)) {
    const lineMatch = line.match(/^(\w+):\s*(.*)$/)
    if (!lineMatch) continue
    const [, key, rawValue] = lineMatch
    data[key] = parseValue(rawValue)
  }

  return { data, content }
}
