---
id: "kb-2026-00060"



title: "Next.js"
schema_type: "TechArticle"



category: "computer-science"
language: "en"



confidence: "high"
confidence_rationale: "Based on Next.js official documentation and GitHub repository (139,553 stars)"



last_verified: "2026-05-22"
generation_method: "human_only"



ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "Next.js Documentation"
    type: "documentation"



    year: 2026
    url: "https://nextjs.org/docs"


    institution: "Vercel"
  - title: "Next.js GitHub Repository"
    type: "repository"



    url: "https://github.com/vercel/next.js"
    institution: "Vercel"



    stars: 139553
secondary_sources:
  - title: "Next.js Documentation"
    type: "documentation"



    year: 2026
    url: "https://nextjs.org/docs"


    institution: "Vercel"
atomic_facts:
  - id: fact-computer-science-01
    statement: Next.js is a React-based full-stack web framework created by Vercel, first released in October 2016
    source_title: Next.js Documentation
    source_url: https://nextjs.org/docs
    confidence: medium
  - id: fact-computer-science-02
    statement: >-
      With 139,553 GitHub stars as of May 2026, it is the most popular React framework and powers websites for Nike,
      TikTok, Hulu, Twitch, and Notion
    source_title: Next.js Documentation
    source_url: https://nextjs.org/docs
    confidence: medium
  - id: fact-computer-science-03
    statement: The App Router brought React Server Components as the default rendering model
    source_title: Next.js Documentation
    source_url: https://nextjs.org/docs
    confidence: medium
  
completeness: 0.85
known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"
    context: "See primary sources for competing interpretations"

related_entities:
  - "entity:react"
  - "entity:javascript"
ai_citations:
---

## TL;DR

Next.js is a React-based full-stack web framework created by Vercel, first released in October 2016. It provides server-side rendering (SSR), static site generation (SSG), API routes, and file-system-based routing out of the box. With 139,553 GitHub stars as of May 2026, it is the most popular React framework and powers websites for Nike, TikTok, Hulu, Twitch, and Notion. The App Router (introduced in Next.js 13, 2022, and stabilized in Next.js 14/15) brought React Server Components as the default rendering model.

## Core Features

- **App Router** (v13+): File-system routing with layouts, loading states, error boundaries
- **React Server Components**: Default server-side rendering with zero client JavaScript for static content
- **Server Actions**: Mutate data on the server directly from components (no API routes needed)
- **Static/Dynamic Rendering**: Automatic selection between SSG, ISR, SSR, and streaming per route
- **Middleware**: Edge-compatible request interception for auth, redirects, A/B testing
- **Image Optimization**: Automatic responsive images via `next/image`
- **Turbopack**: Rust-based successor to Webpack (stable in Next.js 15)

## Further Reading

- [Next.js Docs](https://nextjs.org/docs): Official documentation
- [Next.js GitHub](https://github.com/vercel/next.js): Source code (140K+ stars)
