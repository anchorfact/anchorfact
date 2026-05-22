---
id:"kb-2026-00298"
title:"Bun Runtime"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Bun Documentation"
    type:"documentation"
    year:2026
    url:"https://bun.sh/docs/"
    institution:"Oven"
secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
  - title: "Effective TypeScript (2nd Ed)"
    authors: ["Vanderkam"]
    type: "book"
    year: 2024
    url: "https://www.oreilly.com/library/view/effective-typescript-2nd/9781098155056/"
    institution: "O'Reilly"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Bun (Jarred Sumner, 2022) is an all-in-one JavaScript runtime, bundler, test runner, and package manager written in Zig. It aims to replace Node.js with dramatically faster performance (4x+ faster than Node in benchmarks). Uses JavaScriptCore (Safari's engine) instead of V8.

## Core Explanation

`bun install`: up to 25x faster than npm (uses binary lockfile, symlinked node_modules). Bundler: built-in, no configuration needed. Test runner: Jest-compatible. Native support: TypeScript, JSX, SQLite, .env, and Web APIs. Bun 1.0 (Sep 2023): production-ready for macOS/Linux. Bun 1.2 (2025): Windows support. Drop-in replacement for `node` and `npm` in many projects.

## Further Reading

- [Bun Documentation](https://bun.sh/docs/)
