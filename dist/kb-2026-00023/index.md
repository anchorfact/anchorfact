---
id: "kb-2026-00023"
title: "React"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
confidence_rationale: "Based on React official documentation and NPM download statistics"
last_verified: "2026-05-22"
generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "React Documentation"
    type: "documentation"
    year: 2026
    url: "https://react.dev/"
    institution: "Meta"
  - title: "React GitHub Repository"
    type: "repository"
    url: "https://github.com/facebook/react"
    institution: "Meta"
secondary_sources:
  - title: "React Documentation"
    type: "documentation"
    year: 2026
    url: "https://react.dev/reference/react"
    institution: "Meta"
completeness: 0.85
related_entities:
  - "entity:javascript"
  - "entity:typescript"
ai_citations:
  last_citation_check: "2026-05-22"
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
