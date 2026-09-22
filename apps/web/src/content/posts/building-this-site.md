---
title: "Building This Site, Issue by Issue"
date: "2026-09-21"
excerpt: "Notes on building this portfolio section by section, working through a real GitHub milestone backlog with an AI pair programmer instead of a big-bang rewrite."
tags: ["meta", "process", "ai-assisted-engineering"]
---

I didn't sit down and write this site in one pass. I'd already sketched out a GitHub backlog — eight milestones, over thirty issues, from "Establish frontend design system" all the way out to deployment and polish — and worked through it roughly in order, closing issues as each piece landed.

## Starting with tokens, not pages

The first issue wasn't a page at all. It was the design system: a type scale (Fraunces for headings, Inter for body), a neutral + accent color palette, spacing, radius, shadows — all wired up as CSS custom properties before a single real section existed. Everything after that — the nav, the hero, the project cards — was built *from* those tokens instead of improvising colors and spacing inline each time.

That paid off later. When I picked a new accent color partway through, it was a one-line change in `index.css`, and it cascaded everywhere — buttons, badges, focus rings, the whole thing — without touching a single component.

```css
--color-accent-500: #bf42f5;
--color-accent-700: #9c0bda; /* used for text/buttons, tuned for AA contrast */
```

## Real data, not filler

Where it made sense, content came from things that actually exist — my résumé for the About and Experience sections, my real GitHub repos for Projects. When my résumé and a project's actual code disagreed (it listed a scraper as Python; the repo is Node.js), the repo won. Filler text has a way of staying in "temporary" placeholders forever, so it was worth the extra round of back-and-forth to get it right the first time.

## Catching real bugs along the way

Testing each piece live in a browser — not just trusting the code — caught things a read-through wouldn't have. A rate limiter that correctly returned 429 but got flattened to a generic 500 by an overly broad error handler. A profile photo that centered itself against a paragraph of body text instead of anchoring near the heading it belonged next to. Small things, but the kind that only show up when you actually look.

## What's next

This post is the seed for the piece that made it possible — a small markdown pipeline: frontmatter parsing, syntax highlighting, an article listing page, all wired into client-side routing that didn't exist on this site until this issue. More posts to come as there's something worth writing about.
