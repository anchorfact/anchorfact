---
id:"kb-2026-00294"
title:"Svelte"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Svelte Documentation"
    type:"documentation"
    year:2026
    url:"https://svelte.dev/docs/"
    institution:"Svelte"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Svelte (Rich Harris, 2016) is a radical frontend framework that compiles components to vanilla JavaScript during build — no virtual DOM runtime. Svelte 5 (2024) introduced runes ($state, $derived, $effect) for universal reactivity. Smaller bundles, faster runtime — used by Apple, Spotify, NYT.

## Core Explanation

Compile-time approach: framework code is compiled away — output is pure JS. Stores (Svelte 4) → Runes (Svelte 5): `let count = $state(0)`. SvelteKit: full-stack framework like Next.js — file-based routing, SSR, API routes, adapters for deployment. `{#each}`, `{#if}`, `{#await}` template syntax. Reactive declarations: `$: doubled = count * 2` (Svelte 4).

## Further Reading

- [Svelte Documentation](https://svelte.dev/docs/)
