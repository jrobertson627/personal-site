import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals'
import { trackWebVital } from './telemetry'

export function reportWebVitals() {
  const report = (metric: { name: string; value: number }) => trackWebVital(metric.name, metric.value)

  onCLS(report)
  onFCP(report)
  onINP(report)
  onLCP(report)
  onTTFB(report)
}
