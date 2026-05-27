---
id: kb-2026-00023
title: React
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
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
  - id: fact-computer-science-001
    statement: React applications are built from components, which are reusable pieces of UI that return markup.
    source_title: Your First Component
    source_url: https://react.dev/learn/your-first-component
    confidence: medium
  - id: fact-computer-science-002
    statement: React 19 was announced as stable on December 5, 2024.
    source_title: React v19
    source_url: https://react.dev/blog/2024/12/05/react-19
    confidence: medium
  - id: fact-computer-science-003
    statement: React 19 added Actions-related APIs such as useActionState, useFormStatus, and useOptimistic for common async form and transition patterns.
    source_title: React v19
    source_url: https://react.dev/blog/2024/12/05/react-19
    confidence: medium
  - id: fact-computer-science-004
    statement: React Server Components can render ahead of time in an environment separate from the client application or SSR server.
    source_title: Server Components
    source_url: https://react.dev/reference/rsc/server-components
    confidence: medium
completeness: 0.85
known_gaps:
  - React and its framework ecosystem evolve quickly; version-specific details may change
  - This article avoids popularity rankings and package-download claims because those are volatile
primary_sources:
  - title: Your First Component
    type: documentation
    year: 2026
    url: https://react.dev/learn/your-first-component
    institution: Meta
  - title: React v19
    type: release_notes
    year: 2024
    url: https://react.dev/blog/2024/12/05/react-19
    institution: Meta
  - title: Server Components
    type: documentation
    year: 2026
    url: https://react.dev/reference/rsc/server-components
    institution: Meta
secondary_sources: []
---

## TL;DR

React is an open-source JavaScript library for building user interfaces from reusable components. React 19 was announced as stable on December 5, 2024 and added new APIs around Actions, forms, optimistic updates, and Server Components integration.

## Core Concepts

- **Components**: reusable UI pieces that return markup.
- **JSX**: JavaScript syntax extension commonly used to describe component output.
- **Hooks**: functions for using React features from components.
- **Actions**: React 19 pattern for async transitions and form-related mutations.
- **Server Components**: components rendered in a separate server environment before bundling or per request.

## Further Reading

- [Your First Component](https://react.dev/learn/your-first-component)
- [React v19](https://react.dev/blog/2024/12/05/react-19)
- [Server Components](https://react.dev/reference/rsc/server-components)
