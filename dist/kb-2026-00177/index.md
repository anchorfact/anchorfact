---
id: "kb-2026-00177"
title: "Prettier"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-001"
    statement: "Prettier is an opinionated code formatter supporting JavaScript, TypeScript, CSS, HTML, JSON, Markdown, YAML, and more. It enforces consistent formatting by parsing code and re-printing it with its own rules. Minimizes bike-shedding in code reviews."
    source_title: "Prettier Documentation"
    source_url: "https://prettier.io/docs/"
    confidence: "medium"
  - id: "fact-computer-science-002"
    statement: "Key philosophy: limited configurability (by design) — fewer options = less debate."
    source_title: "Prettier Documentation"
    source_url: "https://prettier.io/docs/"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

primary_sources:
  - title: "Prettier Documentation"
    type: "documentation"
    year: 2026
    url: "https://prettier.io/docs/"
    institution: "Prettier"

secondary_sources:
  - title: "Effective TypeScript (2nd Edition)"
    authors: ["Vanderkam, Dan"]
    type: "book"
    year: 2024
    url: "https://www.oreilly.com/library/view/effective-typescript-2nd/9781098155056/"
    institution: "O'Reilly"
  - title: "The C Programming Language (K&R, 2nd Ed)"
    type: "textbook"
    year: 1988
    url: "https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html"
    institution: "Prentice Hall"
  - title: "Structure and Interpretation of Computer Programs (SICP)"
    type: "textbook"
    year: 1996
    url: "https://mitpress.mit.edu/sites/default/files/sicp/"
    institution: "MIT Press"

---




## TL;DR

Prettier is an opinionated code formatter supporting JavaScript, TypeScript, CSS, HTML, JSON, Markdown, YAML, and more. It enforces consistent formatting by parsing code and re-printing it with its own rules. Minimizes bike-shedding in code reviews.

## Core Explanation

Key philosophy: limited configurability (by design) — fewer options = less debate. `.prettierrc` controls the few options available: `tabWidth`, `semi`, `singleQuote`, `trailingComma`, `printWidth`. `.prettierignore` excludes files. Integrates with ESLint (eslint-config-prettier), editors (format-on-save), and pre-commit hooks (lint-staged + husky).

## Further Reading

- [Prettier Documentation](https://prettier.io/docs/)
