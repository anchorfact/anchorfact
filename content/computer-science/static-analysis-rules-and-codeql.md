---
id: static-analysis-rules-and-codeql
title: 'Static Analysis Rules and CodeQL'
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-02'
created_date: '2026-06-02'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-cs-static-analysis-rules-and-codeql-1
    statement: >-
      CodeQL documentation says CodeQL queries analyze code for issues related to security, correctness, maintainability, and readability.
    source_title: About CodeQL Queries
    source_url: https://codeql.github.com/docs/writing-codeql-queries/about-codeql-queries/
    confidence: medium
  - id: fact-cs-static-analysis-rules-and-codeql-2
    statement: >-
      Semgrep documentation says Semgrep rules encapsulate pattern matching logic and data flow analysis to scan code for security issues, style violations, bugs, and more.
    source_title: Write Rules - Semgrep
    source_url: https://semgrep.dev/docs/writing-rules/overview
    confidence: medium
  - id: fact-cs-static-analysis-rules-and-codeql-3
    statement: >-
      ESLint documentation says developers can create custom rules when core rules do not cover a use case.
    source_title: Custom Rules - ESLint
    source_url: https://eslint.org/docs/latest/extend/custom-rules
    confidence: medium
completeness: 0.83
known_gaps:
  - Static analysis rules need language-aware tests, false-positive management, severity calibration, and integration with review or CI workflows.
disputed_statements: []
primary_sources:
  - title: About CodeQL Queries
    type: documentation
    year: 2026
    url: https://codeql.github.com/docs/writing-codeql-queries/about-codeql-queries/
    institution: GitHub
  - title: Write Rules - Semgrep
    type: documentation
    year: 2026
    url: https://semgrep.dev/docs/writing-rules/overview
    institution: Semgrep
  - title: Custom Rules - ESLint
    type: documentation
    year: 2026
    url: https://eslint.org/docs/latest/extend/custom-rules
    institution: ESLint
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Static analysis rules encode code patterns, data-flow conditions, or lint conventions that can be run automatically before an agent changes or ships code.

## Core Explanation

Code agents need machine-checkable guardrails. Static analysis rules help detect unsafe API use, tainted data flow, dependency risks, insecure defaults, style violations, and project-specific patterns that a general model may miss.

Rule systems differ in depth. Some rules match syntax patterns; others query semantic graphs or data-flow paths. For agent workflows, the most useful rules are explainable, tested, versioned, and connected to remediation guidance.

## Source-Mapped Facts

- CodeQL documentation says CodeQL queries analyze code for issues related to security, correctness, maintainability, and readability. ([source](https://codeql.github.com/docs/writing-codeql-queries/about-codeql-queries/))
- Semgrep documentation says Semgrep rules encapsulate pattern matching logic and data flow analysis to scan code for security issues, style violations, bugs, and more. ([source](https://semgrep.dev/docs/writing-rules/overview))
- ESLint documentation says developers can create custom rules when core rules do not cover a use case. ([source](https://eslint.org/docs/latest/extend/custom-rules))

## Further Reading

- [CodeQL queries](https://codeql.github.com/docs/writing-codeql-queries/about-codeql-queries/)
- [Semgrep rule writing](https://semgrep.dev/docs/writing-rules/overview)
- [ESLint custom rules](https://eslint.org/docs/latest/extend/custom-rules)
