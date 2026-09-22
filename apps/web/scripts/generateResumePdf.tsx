// Renders public/resume.pdf from the same resume data the on-site sections
// and the /resume page use (src/data/resume.ts) — one source of truth for
// the content, kept in sync automatically. Runs as a prebuild step
// (alongside generateSitemap.mjs) so the file already exists in public/
// before `vite build` copies it into dist/.
//
// Deliberately uses @react-pdf/renderer (its own lightweight layout
// primitives — Document/Page/View/Text — rendered without a browser)
// rather than a headless-browser screenshot of the HTML page: no ~300MB
// Chromium download on every build. The trade-off is that this PDF's
// visual layout is maintained separately from the HTML page's Tailwind
// markup, even though both pull from the same underlying data.
import { writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
// This script runs directly via `tsx`, outside Vite/apps/web's tsconfig
// `include`, so the automatic JSX runtime isn't picked up — import React
// explicitly so the classic transform has it in scope.
import React from 'react'
import { Document, Page, Text, View, Link, StyleSheet, renderToBuffer } from '@react-pdf/renderer'
import { contact, summary, skillCategories, workExperience, education } from '../src/data/resume'
import type { ExperienceEntry } from '../src/data/resume'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: 'Helvetica', color: '#1a1a1a' },
  name: { fontSize: 22, fontFamily: 'Helvetica-Bold' },
  title: { fontSize: 13, color: '#3a3a3a', marginTop: 2 },
  contactLine: { fontSize: 9, color: '#555555', marginTop: 6 },
  summary: { fontSize: 10, color: '#333333', marginTop: 14, lineHeight: 1.4 },
  sectionHeading: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    marginTop: 16,
    marginBottom: 6,
    borderBottom: '1px solid #cccccc',
    paddingBottom: 3,
  },
  skillLine: { fontSize: 9.5, color: '#333333', marginBottom: 3 },
  skillLabel: { fontFamily: 'Helvetica-Bold', color: '#1a1a1a' },
  entry: { marginBottom: 10 },
  entryHeaderRow: { flexDirection: 'row', justifyContent: 'space-between' },
  entryTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold' },
  entryPeriod: { fontSize: 9, color: '#555555' },
  entryOrg: { fontSize: 9.5, color: '#3a3a3a', marginTop: 1 },
  entryDescription: { fontSize: 9.5, color: '#444444', marginTop: 3 },
  bulletRow: { flexDirection: 'row', marginTop: 3 },
  bulletDot: { width: 10, fontSize: 9.5 },
  bulletText: { flex: 1, fontSize: 9.5, color: '#333333', lineHeight: 1.35 },
})

function Entry({ entry }: { entry: ExperienceEntry }) {
  return (
    <View style={styles.entry} wrap={false}>
      <View style={styles.entryHeaderRow}>
        <Text style={styles.entryTitle}>{entry.title}</Text>
        <Text style={styles.entryPeriod}>{entry.period}</Text>
      </View>
      <Text style={styles.entryOrg}>{entry.org}</Text>
      {entry.description && <Text style={styles.entryDescription}>{entry.description}</Text>}
      {entry.highlights?.map((highlight) => (
        <View key={highlight} style={styles.bulletRow}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{highlight}</Text>
        </View>
      ))}
    </View>
  )
}

function ResumeDocument() {
  return (
    <Document title={`${contact.name} — Resume`} author={contact.name}>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.title}>{contact.title}</Text>
        <Text style={styles.contactLine}>
          {contact.email} · <Link src={contact.siteUrl}>{contact.siteUrl.replace('https://', '')}</Link> ·{' '}
          <Link src={contact.githubUrl}>{contact.githubUrl.replace('https://', '')}</Link> ·{' '}
          <Link src={contact.linkedinUrl}>LinkedIn</Link>
        </Text>

        <Text style={styles.summary}>{summary}</Text>

        <Text style={styles.sectionHeading}>Skills</Text>
        {skillCategories.map((category) => (
          <Text key={category.title} style={styles.skillLine}>
            <Text style={styles.skillLabel}>{category.title}: </Text>
            {category.skills.join(', ')}
          </Text>
        ))}

        <Text style={styles.sectionHeading}>Experience</Text>
        {workExperience.map((entry) => (
          <Entry key={`${entry.title}-${entry.org}`} entry={entry} />
        ))}

        <Text style={styles.sectionHeading}>Education</Text>
        <Entry entry={education} />
      </Page>
    </Document>
  )
}

const buffer = await renderToBuffer(<ResumeDocument />)
mkdirSync(publicDir, { recursive: true })
writeFileSync(join(publicDir, 'resume.pdf'), buffer)
console.log(`Generated resume.pdf (${(buffer.length / 1024).toFixed(0)} KB)`)
