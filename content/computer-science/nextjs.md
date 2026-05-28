---
id: kb-2026-00060
title: Next.js
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-22"
generation_method: human_only
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: af-computer-science-nextjs-1
    statement: >-
      The Next.js App Router is a file-system based router that uses React features such as Server
      Components, Suspense, and Server Functions.
    source_title: "Next.js Docs: App Router"
    source_url: https://nextjs.org/docs/app
    confidence: medium
  - id: af-computer-science-nextjs-2
    statement: >-
      Next.js routes can be defined with folders and page files, with layouts shared across nested
      routes.
    source_title: "Next.js Docs: Layouts and Pages"
    source_url: https://nextjs.org/docs/app/building-your-application/routing/defining-routes
    confidence: medium
  - id: af-computer-science-nextjs-3
    statement: >-
      Next.js renders layouts and pages as Server Components by default while allowing Client
      Components for interactivity and browser APIs.
    source_title: "Next.js Docs: Server and Client Components"
    source_url: https://nextjs.org/docs/app/building-your-application/rendering/server-components
    confidence: medium
completeness: 0.85
known_gaps:
  - >-
    This field is under active research and rapid development; some conclusions may evolve with new
    evidence or technological advances
  - >-
    Certain sub-topics are covered at a general level; specialized edge cases and nuanced
    applications may not be fully addressed
disputed_statements: []
primary_sources:
  - id: ps-computer-science-nextjs-1
    title: "Next.js Docs: App Router"
    type: documentation
    year: 2026
    institution: Vercel
    url: https://nextjs.org/docs/app
  - id: ps-computer-science-nextjs-2
    title: "Next.js Docs: Layouts and Pages"
    type: documentation
    year: 2026
    institution: Vercel
    url: https://nextjs.org/docs/app/building-your-application/routing/defining-routes
  - id: ps-computer-science-nextjs-3
    title: "Next.js Docs: Server and Client Components"
    type: documentation
    year: 2026
    institution: Vercel
    url: https://nextjs.org/docs/app/building-your-application/rendering/server-components
secondary_sources: []
updated: "2026-05-28"
---
## TL;DR
Next.js is a React framework for building web applications with file-system routing, server rendering, static generation, data fetching, and client-side interactivity. Modern Next.js documentation centers on the App Router and React Server Components.

## Core Explanation
The App Router maps folders and special files such as pages and layouts to application routes. Server Components allow parts of the UI to render on the server by default, while Client Components are used for browser APIs, state, and event handlers. This split lets teams combine server-rendered content with interactive client behavior in the same application.

## Further Reading

- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js layouts and pages](https://nextjs.org/docs/app/building-your-application/routing/defining-routes)
- [Next.js Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
