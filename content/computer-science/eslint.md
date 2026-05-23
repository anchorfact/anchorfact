---
id: "kb-2026-00176"



title: "ESLint"
schema_type: "TechArticle"



category: "computer-science"
language: "en"



confidence: "high"
last_verified: "2026-05-22"



generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "ESLint Documentation"
    type: "documentation"



    year: 2026
    url: "https://eslint.org/docs/"


    institution: "OpenJS Foundation"
    note: "Pluggable JS/TS linter: flat config, custom rules, AST-based analysis with Espree"



secondary_sources:
  - title: "Effective TypeScript (2nd Edition)"
    authors: ["Vanderkam, Dan"]
    type: "book"



    year: 2024
    url: "https://www.oreilly.com/library/view/effective-typescript-2nd/9781098155056/"


    institution: "O'Reilly"
    note: "Covers TS static analysis patterns — @typescript-eslint extends ESLint for TypeScript type-aware linting"



atomic_facts:
  - id: fact-computer-science-01
    statement: Created by Nicholas Zakas , it is the most popular JS linter
    source_title: ESLint Documentation
    source_url: https://eslint.org/docs/
    confidence: medium
  
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

ESLint is a static analysis tool for JavaScript/TypeScript that identifies problematic patterns and enforces coding standards. Created by Nicholas Zakas (2013), it is the most popular JS linter. ESLint 9 (2024) introduced flat config (`eslint.config.mjs`), replacing `.eslintrc`.

## Core Explanation

Rules can be: off (0), warn (1), error (2). Plugins extend rules (eslint-plugin-react, @typescript-eslint). Prettier handles formatting (complementary, not competing — use eslint-config-prettier to disable conflicting rules). Autofix: `eslint --fix` automatically corrects fixable issues (indentation, semicolons, unused imports).

## Further Reading

- [ESLint Documentation](https://eslint.org/docs/)
