---
id:"kb-2026-00177"
title:"Prettier"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Prettier Documentation"
    type:"documentation"
    year:2026
    url:"https://prettier.io/docs/"
    institution:"Prettier"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Prettier is an opinionated code formatter supporting JavaScript, TypeScript, CSS, HTML, JSON, Markdown, YAML, and more. It enforces consistent formatting by parsing code and re-printing it with its own rules. Minimizes bike-shedding in code reviews.

## Core Explanation

Key philosophy: limited configurability (by design) — fewer options = less debate. `.prettierrc` controls the few options available: `tabWidth`, `semi`, `singleQuote`, `trailingComma`, `printWidth`. `.prettierignore` excludes files. Integrates with ESLint (eslint-config-prettier), editors (format-on-save), and pre-commit hooks (lint-staged + husky).

## Further Reading

- [Prettier Documentation](https://prettier.io/docs/)
