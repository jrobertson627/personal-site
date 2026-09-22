// Small original SVG visuals standing in for real screenshots — neither project
// has a traditional UI to photograph (the scraper is backend-only, and this
// site's "screenshot" would just be itself), so these are honest illustrative
// graphics rather than fabricated photos.
import type { ReactNode } from 'react'

const scraperStages = ['Fetcher', 'Discovery', 'Parsers', 'Domain', 'Persistence']

const scraperArchitectureDiagram = (
  <svg
    viewBox="0 0 400 140"
    className="h-full w-full"
    role="img"
    aria-label="Pipeline diagram: Fetcher, Discovery, Parsers, Domain, and Persistence stages, with a read-only API surface below."
  >
    {scraperStages.map((stage, i) => {
      const x = 12 + i * 78
      return (
        <g key={stage}>
          <rect x={x} y={30} width={66} height={40} rx={8} className="fill-background stroke-border" strokeWidth={1.5} />
          <text x={x + 33} y={54} textAnchor="middle" className="fill-foreground text-[10px] font-medium">
            {stage}
          </text>
          {i < scraperStages.length - 1 && (
            <path d={`M${x + 66} 50 H${x + 78}`} className="stroke-accent" strokeWidth={1.5} markerEnd="url(#arrow)" />
          )}
        </g>
      )
    })}
    <rect x={12} y={96} width={376} height={32} rx={8} className="fill-background stroke-border" strokeWidth={1.5} strokeDasharray="4 3" />
    <text x={200} y={116} textAnchor="middle" className="fill-muted-foreground text-[10px]">
      read-only API (local projections)
    </text>
    <defs>
      <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0 0 L6 3 L0 6 Z" className="fill-accent" />
      </marker>
    </defs>
  </svg>
)

export const projectVisuals: Record<string, ReactNode> = {
  'college-basketball-web-scraper': scraperArchitectureDiagram,
}
