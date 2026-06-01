---
id: control-flow-and-data-flow-analysis
title: 'Control-Flow and Data-Flow Analysis'
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
  - id: fact-cs-control-flow-and-data-flow-analysis-1
    statement: >-
      Joern documentation says code property graphs merge classic program representations into one
      data structure holding syntax, control-flow, and intra-procedural data-flow information.
    source_title: Joern Code Property Graph Documentation
    source_url: https://docs.joern.io/code-property-graph/
    confidence: medium
  - id: fact-cs-control-flow-and-data-flow-analysis-2
    statement: >-
      Joern documentation describes code property graphs as directed, edge-labeled, attributed
      multigraphs whose nodes carry attributes indicating node type.
    source_title: Joern Code Property Graph Documentation
    source_url: https://docs.joern.io/code-property-graph/
    confidence: medium
  - id: fact-cs-control-flow-and-data-flow-analysis-3
    statement: >-
      CodeQL documentation says local data flow is data flow within a single function and is faster
      but less complete than global data flow.
    source_title: CodeQL JavaScript and TypeScript Data Flow
    source_url: https://codeql.github.com/docs/codeql-language-guides/analyzing-data-flow-in-javascript-and-typescript/
    confidence: medium
completeness: 0.82
known_gaps:
  - Precise interprocedural and alias-sensitive data flow depends on language semantics and analyzer configuration.
disputed_statements: []
primary_sources:
  - title: Joern Code Property Graph Documentation
    type: documentation
    year: 2026
    url: https://docs.joern.io/code-property-graph/
    institution: Joern
  - title: CodeQL JavaScript and TypeScript Data Flow
    type: documentation
    year: 2026
    url: https://codeql.github.com/docs/codeql-language-guides/analyzing-data-flow-in-javascript-and-typescript/
    institution: GitHub
  - title: CodeQL Documentation Contents
    type: documentation
    year: 2026
    url: https://codeql.github.com/docs/contents/
    institution: GitHub
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Control-flow and data-flow analysis help agents reason about what can execute, where values can move, and which code paths may be affected by a change.

## Core Explanation

ASTs say what the code looks like. Control-flow graphs model possible execution order. Data-flow and dependence graphs model how values and definitions reach later program points. For code agents, these representations support vulnerability tracing, impact analysis, test targeting, and safer edits across multiple files.

## Source-Mapped Facts

- Joern documentation says code property graphs merge classic program representations into one data structure holding syntax, control-flow, and intra-procedural data-flow information. ([source](https://docs.joern.io/code-property-graph/))
- Joern documentation describes code property graphs as directed, edge-labeled, attributed multigraphs whose nodes carry attributes indicating node type. ([source](https://docs.joern.io/code-property-graph/))
- CodeQL documentation says local data flow is data flow within a single function and is faster but less complete than global data flow. ([source](https://codeql.github.com/docs/codeql-language-guides/analyzing-data-flow-in-javascript-and-typescript/))

## Further Reading

- [Joern Code Property Graph Documentation](https://docs.joern.io/code-property-graph/)
- [CodeQL JavaScript and TypeScript Data Flow](https://codeql.github.com/docs/codeql-language-guides/analyzing-data-flow-in-javascript-and-typescript/)
- [CodeQL Documentation Contents](https://codeql.github.com/docs/contents/)
