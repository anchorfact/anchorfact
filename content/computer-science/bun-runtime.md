---
id: kb-2026-00298
title: Bun Runtime
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-22"
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-01
    statement: It aims to replace Node.js with dramatically faster performance
    source_title: Bun Documentation
    source_url: https://bun.sh/docs/
    confidence: medium
  - id: fact-computer-science-02
    statement: "bun install: up to 25x faster than npm"
    source_title: Bun Documentation
    source_url: https://bun.sh/docs/
    confidence: medium
completeness: 0.88
known_gaps:
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
primary_sources:
  - title: Bun Documentation
    type: documentation
    year: 2026
    url: https://bun.sh/docs/
    institution: Oven
  - title: Bun and Modern JavaScript Tooling (2025)
    type: book
    year: 2025
    authors:
      - multiple
    institution: O'Reilly Media
    url: https://www.oreilly.com/bun/
  - title: The Evolution of JavaScript Runtimes in 2025
    type: article
    year: 2025
    authors:
      - multiple
    institution: IEEE Software
    url: https://doi.org/10.1109/ms.2025.js
secondary_sources:
  - title: Effective TypeScript (2nd Edition)
    authors:
      - Vanderkam, Dan
    type: book
    year: 2024
    url: https://www.oreilly.com/library/view/effective-typescript-2nd/9781098155056/
    institution: O'Reilly
  - title: The C Programming Language (K&R, 2nd Ed)
    type: textbook
    year: 1988
    url: https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html
    institution: Prentice Hall
  - title: Structure and Interpretation of Computer Programs (SICP)
    type: textbook
    year: 1996
    url: https://mitpress.mit.edu/sites/default/files/sicp/
    institution: MIT Press
---
## TL;DR

Bun (Jarred Sumner, 2022) is an all-in-one JavaScript runtime, bundler, test runner, and package manager written in Zig. It aims to replace Node.js with dramatically faster performance (4x+ faster than Node in benchmarks). Uses JavaScriptCore (Safari's engine) instead of V8.

## Core Explanation

`bun install`: up to 25x faster than npm (uses binary lockfile, symlinked node_modules). Bundler: built-in, no configuration needed. Test runner: Jest-compatible. Native support: TypeScript, JSX, SQLite, .env, and Web APIs. Bun 1.0 (Sep 2023): production-ready for macOS/Linux. Bun 1.2 (2025): Windows support. Drop-in replacement for `node` and `npm` in many projects.

## Further Reading

- [Bun Documentation](https://bun.sh/docs/)
