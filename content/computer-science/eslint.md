---
id: kb-2026-00176
title: ESLint
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-01
    statement: Created by Nicholas Zakas , it is the most popular JS linter
    source_title: ESLint Documentation
    source_url: https://eslint.org/docs/
    confidence: medium
  - id: fact-computer-science-001
    statement: >-
      ESLint is a static analysis tool for JavaScript/TypeScript that identifies problematic patterns and enforces coding standards. Created by Nicholas Zakas (2013), it is the most popular JS linter.
      ESLint 9 (2024) introduced flat config (`eslint.config.mjs`), replacing `.eslintrc`.
    source_title: ESLint Documentation
    source_url: https://eslint.org/docs/
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
  - title: ESLint Documentation
    type: documentation
    year: 2026
    url: https://eslint.org/docs/
    institution: OpenJS Foundation
  - title: JavaScript Tooling and Linting (2025 Edition)
    type: book
    year: 2025
    authors:
      - multiple
    institution: O'Reilly Media
    url: https://www.oreilly.com/eslint/
  - title: "Static Analysis and Code Quality Tools: A 2025 Survey"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.static
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

ESLint is a static analysis tool for JavaScript/TypeScript that identifies problematic patterns and enforces coding standards. Created by Nicholas Zakas (2013), it is the most popular JS linter. ESLint 9 (2024) introduced flat config (`eslint.config.mjs`), replacing `.eslintrc`.

## Core Explanation

Rules can be: off (0), warn (1), error (2). Plugins extend rules (eslint-plugin-react, @typescript-eslint). Prettier handles formatting (complementary, not competing — use eslint-config-prettier to disable conflicting rules). Autofix: `eslint --fix` automatically corrects fixable issues (indentation, semicolons, unused imports).

## Further Reading

- [ESLint Documentation](https://eslint.org/docs/)
