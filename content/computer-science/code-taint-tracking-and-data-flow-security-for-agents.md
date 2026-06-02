---
id: code-taint-tracking-and-data-flow-security-for-agents
title: 'Code Taint Tracking and Data-Flow Security for Agents'
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-03'
created_date: '2026-06-03'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-cs-code-taint-tracking-and-data-flow-security-for-agents-1
    statement: >-
      CodeQL documentation describes data-flow analysis as computing possible
      values that can flow to a program point.
    source_title: CodeQL Data Flow Analysis
    source_url: https://codeql.github.com/docs/writing-codeql-queries/about-data-flow-analysis/
    confidence: medium
  - id: fact-cs-code-taint-tracking-and-data-flow-security-for-agents-2
    statement: >-
      CodeQL documentation distinguishes taint tracking from normal data flow
      because taint tracking can follow values through transformations that are
      not value-preserving.
    source_title: CodeQL Data Flow Analysis
    source_url: https://codeql.github.com/docs/writing-codeql-queries/about-data-flow-analysis/#taint-tracking
    confidence: medium
  - id: fact-cs-code-taint-tracking-and-data-flow-security-for-agents-3
    statement: >-
      Semgrep taint-mode documentation describes taint analysis as tracking
      data from sources to sinks, with sanitizers able to remove taint.
    source_title: Semgrep Taint Analysis
    source_url: https://semgrep.dev/docs/writing-rules/data-flow/taint-mode/overview
    confidence: medium
completeness: 0.82
known_gaps:
  - Taint results depend on source and sink modeling, sanitizer coverage, framework semantics, interprocedural depth, language support, generated code, dependency boundaries, and review of false positives.
disputed_statements: []
primary_sources:
  - title: CodeQL Data Flow Analysis
    type: documentation
    year: 2026
    url: https://codeql.github.com/docs/writing-codeql-queries/about-data-flow-analysis/
    institution: GitHub
  - title: Semgrep Taint Analysis
    type: documentation
    year: 2026
    url: https://semgrep.dev/docs/writing-rules/data-flow/taint-mode/overview
    institution: Semgrep
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Taint tracking helps code agents trace untrusted input from sources to risky sinks and check whether sanitizers break the path.

## Core Explanation

General data-flow analysis tells an agent where values can travel. Security taint tracking adds a threat model: which inputs are untrusted, which operations are dangerous, and which transformations count as sanitization.

Agents should preserve the rule ID, source model, sink model, sanitizer model, path explanation, language, framework, and reviewed false-positive status before opening a security fix. This matters because a generated patch can silence a finding without fixing the underlying source-to-sink path.

## Source-Mapped Facts

- CodeQL documentation describes data-flow analysis as computing possible values that can flow to a program point. ([source](https://codeql.github.com/docs/writing-codeql-queries/about-data-flow-analysis/))
- CodeQL documentation distinguishes taint tracking from normal data flow because taint tracking can follow values through transformations that are not value-preserving. ([source](https://codeql.github.com/docs/writing-codeql-queries/about-data-flow-analysis/#taint-tracking))
- Semgrep taint-mode documentation describes taint analysis as tracking data from sources to sinks, with sanitizers able to remove taint. ([source](https://semgrep.dev/docs/writing-rules/data-flow/taint-mode/overview))

## Further Reading

- [CodeQL Data Flow Analysis](https://codeql.github.com/docs/writing-codeql-queries/about-data-flow-analysis/)
- [Semgrep Taint Analysis](https://semgrep.dev/docs/writing-rules/data-flow/taint-mode/overview)
