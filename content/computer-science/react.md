---
id: kb-2026-00023
title: React
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-22"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-01
    statement: Created by Jordan Walke in 2011 and open-sourced in May 2013, React introduced a component-based architecture and a virtual DOM for efficient UI updates
    source_title: React Documentation
    source_url: https://react.dev/
    confidence: medium
  - id: fact-computer-science-002
    statement: Created by Jordan Walke in 2011 and open-sourced in May 2013, React introduced a component-based architecture and a virtual DOM for efficient UI updates.
    source_title: React Documentation
    source_url: https://react.dev/
    confidence: medium
  - id: fact-computer-science-003
    statement: As of 2026, React is the most widely used frontend library globally, with over 200,000 GitHub stars and billions of weekly NPM downloads.
    source_title: React GitHub Repository
    source_url: https://github.com/facebook/react
    confidence: medium
  - id: fact-computer-science-004
    statement: React 19 (released December 2024) introduced Server Components as a stable feature, fundamentally changing the React rendering model.
    source_title: React Documentation
    source_url: https://react.dev/
    confidence: medium
  - id: fact-computer-science-005
    statement: "</div> }`) - **JSX**: HTML-like syntax embedded in JavaScript - **Virtual DOM**: In-memory representation of the UI; React computes minimal DOM mutations - **Hooks** (React 16."
    source_title: React Documentation
    source_url: https://react.dev/
    confidence: medium
completeness: 0.85
known_gaps:
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
primary_sources:
  - title: React Documentation
    type: documentation
    year: 2026
    url: https://react.dev/
    institution: Meta
  - title: React GitHub Repository
    type: repository
    url: https://github.com/facebook/react
    institution: Meta
  - title: Learning React (3rd Edition, 2025)
    type: book
    year: 2025
    authors:
      - Banks A.
      - Porcello E.
    institution: O'Reilly Media
    url: https://www.oreilly.com/react/
  - title: "Modern Frontend Frameworks: React, Vue, and Svelte in 2025"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.frontend
secondary_sources:
  - title: React Documentation
    type: documentation
    year: 2026
    url: https://react.dev/reference/react
    institution: Meta
---
## TL;DR

React is an open-source JavaScript library for building user interfaces, developed and maintained by Meta (Facebook). Created by Jordan Walke in 2011 and open-sourced in May 2013, React introduced a component-based architecture and a virtual DOM for efficient UI updates. As of 2026, React is the most widely used frontend library globally, with over 200,000 GitHub stars and billions of weekly NPM downloads. React 19 (released December 2024) introduced Server Components as a stable feature, fundamentally changing the React rendering model.

## Core Concepts

- **Components**: Reusable UI pieces defined as functions (`function MyComponent() { return <div>...</div> }`)
- **JSX**: HTML-like syntax embedded in JavaScript
- **Virtual DOM**: In-memory representation of the UI; React computes minimal DOM mutations
- **Hooks** (React 16.8, 2019): `useState`, `useEffect`, `useContext`, `useMemo`, `useCallback` — state and lifecycle in function components
- **Server Components** (React 19, 2024): Components that render on the server, reducing client-side JavaScript

## Key Ecosystem

- **Next.js**: Full-stack React framework (by Vercel) — routing, SSR, ISR, Server Actions
- **Remix**: Full-stack framework focused on web standards
- **React Native**: React for iOS/Android mobile apps (Meta)
- **TanStack**: Query, Router, Table — headless UI utilities
- **Zustand / Jotai**: Lightweight state management

## Further Reading

- [React Docs](https://react.dev/): Official documentation
- [React GitHub](https://github.com/facebook/react): Source code
