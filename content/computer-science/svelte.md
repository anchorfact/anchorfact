---
id: "kb-2026-00294"


title: "Svelte"
schema_type: "TechArticle"


category: "computer-science"
language: "en"


confidence: "high"
last_verified: "2026-05-22"


generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Svelte Documentation"
    type: "documentation"


    year: 2026
    url: "https://svelte.dev/docs/"

    institution: "Svelte"
    note: "Compiler-based UI framework: reactive declarations, stores, transitions, no virtual DOM"


secondary_sources:
  - title: "React Documentation"
    type: "documentation"


    year: 2026
    url: "https://react.dev/reference/react"

    institution: "Meta"
    note: "Svelte's primary alternative — compiler vs runtime reconciliation, signals vs hooks comparison"


atomic_facts:
  - id: fact-computer-science-01
    statement: Smaller bundles, faster runtime — used by Apple, Spotify, NYT
    source_title: Svelte Documentation
    source_url: https://svelte.dev/docs/
    confidence: medium
  - id: fact-computer-science-02
    statement: >-
      Svelte is a radical frontend framework that compiles components to vanilla JavaScript during build — no virtual DOM
      runtime
    source_title: Svelte Documentation
    source_url: https://svelte.dev/docs/
    confidence: medium
  
completeness: 0.88
known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
ai_citations:
---

## TL;DR

Svelte (Rich Harris, 2016) is a radical frontend framework that compiles components to vanilla JavaScript during build — no virtual DOM runtime. Svelte 5 (2024) introduced runes ($state, $derived, $effect) for universal reactivity. Smaller bundles, faster runtime — used by Apple, Spotify, NYT.

## Core Explanation

Compile-time approach: framework code is compiled away — output is pure JS. Stores (Svelte 4) → Runes (Svelte 5): `let count = $state(0)`. SvelteKit: full-stack framework like Next.js — file-based routing, SSR, API routes, adapters for deployment. `{#each}`, `{#if}`, `{#await}` template syntax. Reactive declarations: `$: doubled = count * 2` (Svelte 4).

## Further Reading

- [Svelte Documentation](https://svelte.dev/docs/)
