---
id:"kb-2026-00297"
title:"Angular"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Angular Documentation"
    type: "documentation"
    year: 2026
    url: "https://angular.dev/"
    institution: "Google"
    note: "Official Angular documentation: components, signals, dependency injection, RxJS"
secondary_sources:
  - title: "Effective TypeScript (2nd Edition)"
    authors: ["Vanderkam, Dan"]
    type: "book"
    year: 2024
    url: "https://www.oreilly.com/library/view/effective-typescript-2nd/9781098155056/"
    institution: "O'Reilly"
    note: "Angular's primary language is TypeScript — this book covers TS patterns used throughout Angular development"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Angular (Google, 2016, successor to AngularJS) is a TypeScript-based SPA framework with a complete toolchain: component-based architecture, dependency injection, RxJS for reactivity, CLI, and testing utilities. Angular 17+ (2023) introduced signals, standalone components, and new control flow syntax (@if, @for).

## Core Explanation

Components: `@Component({ selector, template, styles })`. Modules (NgModules) → standalone components (v14+). RxJS Observables for async data and event handling. Signals (v16+): `signal()`, `computed()`, `effect()` — fine-grained reactivity without Zone.js. Angular 19 (2024): incremental hydration, partial rendering. Used by: Google Cloud Console, Forbes, Delta.

## Further Reading

- [Angular Documentation](https://angular.dev/)
