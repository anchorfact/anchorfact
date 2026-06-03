---
id: code-bazel-query-and-cquery-dependency-analysis
title: 'Code Bazel query and cquery Dependency Analysis'
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
  - id: fact-cs-code-bazel-query-and-cquery-dependency-analysis-1
    statement: >-
      Bazel documentation describes the Bazel query language as a language for
      asking questions about dependencies in the build graph.
    source_title: Bazel Query Language
    source_url: https://bazel.build/query/language
    confidence: medium
  - id: fact-cs-code-bazel-query-and-cquery-dependency-analysis-2
    statement: >-
      Bazel documentation says cquery runs after the analysis phase and exposes
      information about configured targets.
    source_title: Bazel cquery
    source_url: https://bazel.build/query/cquery
    confidence: medium
  - id: fact-cs-code-bazel-query-and-cquery-dependency-analysis-3
    statement: >-
      Bazel documentation says cquery is useful when build options change the
      dependency graph, such as through select statements.
    source_title: Bazel cquery
    source_url: https://bazel.build/query/cquery
    confidence: medium
completeness: 0.82
known_gaps:
  - Bazel dependency evidence depends on repository rules, external workspaces, target patterns, configuration transitions, toolchain resolution, visibility, generated files, and whether the agent needs source-level or configured-target evidence.
disputed_statements: []
primary_sources:
  - title: Bazel Query Language
    type: documentation
    year: 2026
    url: https://bazel.build/query/language
    institution: Bazel
  - title: Bazel cquery
    type: documentation
    year: 2026
    url: https://bazel.build/query/cquery
    institution: Bazel
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Bazel query and cquery help code agents inspect dependency graph evidence before changing build targets or affected-test logic.

## Core Explanation

In Bazel repositories, dependency impact is encoded in the build graph rather than only in source imports. Agents should use query for structural dependency questions and cquery when configurations, build flags, select statements, or transitions affect the actual analyzed graph.

This distinction matters for code intelligence. A target can appear unrelated at the source level but become relevant through generated code, toolchains, configuration-specific deps, or visibility constraints. Agents should cite the query expression and target pattern used when explaining an impact analysis result.

## Source-Mapped Facts

- Bazel documentation describes the Bazel query language as a language for asking questions about dependencies in the build graph. ([source](https://bazel.build/query/language))
- Bazel documentation says cquery runs after the analysis phase and exposes information about configured targets. ([source](https://bazel.build/query/cquery))
- Bazel documentation says cquery is useful when build options change the dependency graph, such as through select statements. ([source](https://bazel.build/query/cquery))

## Further Reading

- [Bazel Query Language](https://bazel.build/query/language)
- [Bazel cquery](https://bazel.build/query/cquery)
