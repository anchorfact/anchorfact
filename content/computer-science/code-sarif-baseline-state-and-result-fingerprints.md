---
id: code-sarif-baseline-state-and-result-fingerprints
title: 'Code SARIF Baseline State and Result Fingerprints'
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
  - id: fact-cs-code-sarif-baseline-state-and-result-fingerprints-1
    statement: >-
      The SARIF specification says SARIF defines an object model whose top
      level is the sarifLog object.
    source_title: SARIF Version 2.1.0 Specification
    source_url: https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html
    confidence: medium
  - id: fact-cs-code-sarif-baseline-state-and-result-fingerprints-2
    statement: >-
      The SARIF specification says a result object may contain a
      partialFingerprints property.
    source_title: SARIF Version 2.1.0 Specification
    source_url: https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html
    confidence: medium
  - id: fact-cs-code-sarif-baseline-state-and-result-fingerprints-3
    statement: >-
      The SARIF specification says a result object may contain a baselineState
      property that specifies the state of the result with respect to a previous
      run.
    source_title: SARIF Version 2.1.0 Specification
    source_url: https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html
    confidence: medium
  - id: fact-cs-code-sarif-baseline-state-and-result-fingerprints-4
    statement: >-
      The OASIS SARIF standard page describes SARIF as a standard format for
      the output of static analysis tools.
    source_title: SARIF Version 2.1.0 OASIS Standard Page
    source_url: https://www.oasis-open.org/standard/sarif-v2-1-0/
    confidence: medium
completeness: 0.82
known_gaps:
  - SARIF baseline analysis depends on analyzer identity, rule IDs, result locations, stable URI normalization, generated-code filtering, path rewrites, partial fingerprint algorithms, baseline run selection, suppression state, upload platform behavior, and whether absolute line numbers or nondeterministic paths are part of matching.
disputed_statements: []
primary_sources:
  - title: SARIF Version 2.1.0 Specification
    type: specification
    year: 2023
    url: https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html
    institution: OASIS Open
  - title: SARIF Version 2.1.0 OASIS Standard Page
    type: standard
    year: 2023
    url: https://www.oasis-open.org/standard/sarif-v2-1-0/
    institution: OASIS Open
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

SARIF baseline state and result fingerprints let code agents distinguish new findings from unchanged static-analysis noise.

## Core Explanation

Static-analysis output is useful to agents only when findings can be matched across runs. SARIF provides properties for recording result identity and baseline state, which helps tooling decide whether a warning is new, absent, unchanged, or updated.

Agents should preserve SARIF fields that affect result identity, avoid rewriting paths without recording the mapping, and treat missing baseline metadata as a reason to avoid broad claims about new or fixed findings. This is especially important when generated files, vendored code, or path normalization change between CI environments.

## Source-Mapped Facts

- The SARIF specification says SARIF defines an object model whose top level is the sarifLog object. ([source](https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html))
- The SARIF specification says a result object may contain a partialFingerprints property. ([source](https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html))
- The SARIF specification says a result object may contain a baselineState property that specifies the state of the result with respect to a previous run. ([source](https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html))
- The OASIS SARIF standard page describes SARIF as a standard format for the output of static analysis tools. ([source](https://www.oasis-open.org/standard/sarif-v2-1-0/))

## Further Reading

- [SARIF Version 2.1.0 Specification](https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html)
- [SARIF Version 2.1.0 OASIS Standard Page](https://www.oasis-open.org/standard/sarif-v2-1-0/)
