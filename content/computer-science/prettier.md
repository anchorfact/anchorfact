---
id: "kb-2026-00177"



title: "Prettier"
schema_type: "TechArticle"



category: "computer-science"
language: "en"



confidence: "high"
last_verified: "2026-05-22"



generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Prettier Documentation"
    type: "documentation"



    year: 2026
    url: "https://prettier.io/docs/"


    institution: "Prettier"
    note: "Opinionated code formatter: JS, TS, CSS, HTML, JSON, Markdown, YAML — integrates with ESLint"



secondary_sources:
  - title: "Effective TypeScript (2nd Edition)"
    authors: ["Vanderkam, Dan"]
    type: "book"



    year: 2024
    url: "https://www.oreilly.com/library/view/effective-typescript-2nd/9781098155056/"


    institution: "O'Reilly"
    note: "Prettier is commonly used with TypeScript — Effective TS covers code style patterns Prettier enforces"



completeness: 0.88
known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"
    context: "See primary sources for competing interpretations"

ai_citations:
---

## TL;DR

Prettier is an opinionated code formatter supporting JavaScript, TypeScript, CSS, HTML, JSON, Markdown, YAML, and more. It enforces consistent formatting by parsing code and re-printing it with its own rules. Minimizes bike-shedding in code reviews.

## Core Explanation

Key philosophy: limited configurability (by design) — fewer options = less debate. `.prettierrc` controls the few options available: `tabWidth`, `semi`, `singleQuote`, `trailingComma`, `printWidth`. `.prettierignore` excludes files. Integrates with ESLint (eslint-config-prettier), editors (format-on-save), and pre-commit hooks (lint-staged + husky).

## Further Reading

- [Prettier Documentation](https://prettier.io/docs/)
