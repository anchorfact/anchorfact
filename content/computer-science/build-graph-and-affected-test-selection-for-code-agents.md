---
id: build-graph-and-affected-test-selection-for-code-agents
title: 'Build Graph and Affected Test Selection for Code Agents'
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
  - id: fact-computer-science-build-graph-and-affected-test-selection-for-code-agents-1
    statement: >-
      Bazel documentation describes query as a way to analyze build dependencies.
    source_title: Bazel Query Guide
    source_url: https://bazel.build/query/guide?hl=en
    confidence: medium
  - id: fact-computer-science-build-graph-and-affected-test-selection-for-code-agents-2
    statement: >-
      Nx documentation describes affected commands as running tasks only on projects affected by a
      change.
    source_title: Nx Affected
    source_url: https://nx.dev/ci/features/affected
    confidence: medium
  - id: fact-computer-science-build-graph-and-affected-test-selection-for-code-agents-3
    statement: >-
      Pants documentation describes targets and BUILD files as core concepts for modeling code and
      dependencies.
    source_title: Pants Targets and BUILD Files
    source_url: https://www.pantsbuild.org/stable/docs/using-pants/key-concepts/targets-and-build-files
    confidence: medium
completeness: 0.83
known_gaps:
  - Affected-test correctness depends on dependency graph accuracy, generated sources, dynamic imports, test fixtures, implicit runtime dependencies, and cache invalidation.
disputed_statements: []
primary_sources:
  - title: Bazel Query Guide
    type: documentation
    year: 2026
    url: https://bazel.build/query/guide?hl=en
    institution: Bazel
  - title: Nx Affected
    type: documentation
    year: 2026
    url: https://nx.dev/ci/features/affected
    institution: Nx
  - title: Pants Targets and BUILD Files
    type: documentation
    year: 2026
    url: https://www.pantsbuild.org/stable/docs/using-pants/key-concepts/targets-and-build-files
    institution: Pants
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Build graphs let code agents choose affected tests and targets from dependency evidence instead of guessing from filenames alone.

## Core Explanation

Large repositories need selective verification. A build graph can show which libraries, binaries, and tests depend on a changed file. That lets agents run targeted checks quickly while still knowing when a change has a wide blast radius.

Agents should be explicit about the graph source and its limits. Generated code, runtime plugins, fixtures, and undeclared dependencies can make an affected-test set incomplete, so targeted runs should be paired with broader CI before merge.

## Source-Mapped Facts

- Bazel documentation describes query as a way to analyze build dependencies. ([source](https://bazel.build/query/guide?hl=en))
- Nx documentation describes affected commands as running tasks only on projects affected by a change. ([source](https://nx.dev/ci/features/affected))
- Pants documentation describes targets and BUILD files as core concepts for modeling code and dependencies. ([source](https://www.pantsbuild.org/stable/docs/using-pants/key-concepts/targets-and-build-files))

## Further Reading

- [Bazel Query Guide](https://bazel.build/query/guide?hl=en)
- [Nx Affected](https://nx.dev/ci/features/affected)
- [Pants Targets and BUILD Files](https://www.pantsbuild.org/stable/docs/using-pants/key-concepts/targets-and-build-files)
