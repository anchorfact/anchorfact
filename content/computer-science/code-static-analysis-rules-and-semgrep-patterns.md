---
id: code-static-analysis-rules-and-semgrep-patterns
title: 'Code Static Analysis Rules and Semgrep Patterns'
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
  - id: fact-cs-code-static-analysis-rules-and-semgrep-patterns-1
    statement: >-
      Semgrep documentation describes rule syntax for writing patterns that match code.
    source_title: Semgrep Rule Syntax
    source_url: https://semgrep.dev/docs/writing-rules/rule-syntax
    confidence: medium
  - id: fact-cs-code-static-analysis-rules-and-semgrep-patterns-2
    statement: >-
      CodeQL documentation describes queries as files that contain a select clause defining
      the query result.
    source_title: CodeQL Queries
    source_url: https://codeql.github.com/docs/writing-codeql-queries/about-codeql-queries/
    confidence: medium
  - id: fact-cs-code-static-analysis-rules-and-semgrep-patterns-3
    statement: >-
      ESLint documentation describes custom rules as plugins that can define project-specific
      linting behavior.
    source_title: ESLint Custom Rules
    source_url: https://eslint.org/docs/latest/extend/custom-rules
    confidence: medium
completeness: 0.83
known_gaps:
  - Static analysis quality depends on language support, framework-specific patterns, taint tracking, rule severity calibration, suppressions, autofix safety, and false-positive review loops.
disputed_statements: []
primary_sources:
  - title: Semgrep Rule Syntax
    type: documentation
    year: 2026
    url: https://semgrep.dev/docs/writing-rules/rule-syntax
    institution: Semgrep
  - title: CodeQL Queries
    type: documentation
    year: 2026
    url: https://codeql.github.com/docs/writing-codeql-queries/about-codeql-queries/
    institution: GitHub
  - title: ESLint Custom Rules
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

Static analysis rules and patterns let agents turn recurring code risks into repeatable checks instead of one-off review comments.

## Core Explanation

Agents can use static analysis rules to search for insecure APIs, framework anti-patterns, migration leftovers, and project-specific conventions. Rule languages such as Semgrep patterns or CodeQL queries give agents a structured way to describe what code shape should be flagged.

Rules need calibration. A rule that catches real bugs but produces too many false positives will be ignored. Agents should record examples, expected matches, expected non-matches, severity, and whether an autofix is safe.

## Source-Mapped Facts

- Semgrep documentation describes rule syntax for writing patterns that match code. ([source](https://semgrep.dev/docs/writing-rules/rule-syntax))
- CodeQL documentation describes queries as files that contain a select clause defining the query result. ([source](https://codeql.github.com/docs/writing-codeql-queries/about-codeql-queries/))
- ESLint documentation describes custom rules as plugins that can define project-specific linting behavior. ([source](https://eslint.org/docs/latest/extend/custom-rules))

## Further Reading

- [Semgrep Rule Syntax](https://semgrep.dev/docs/writing-rules/rule-syntax)
- [CodeQL Queries](https://codeql.github.com/docs/writing-codeql-queries/about-codeql-queries/)
- [ESLint Custom Rules](https://eslint.org/docs/latest/extend/custom-rules)
