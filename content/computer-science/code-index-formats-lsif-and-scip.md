---
id: code-index-formats-lsif-and-scip
title: 'Code Index Formats: LSIF and SCIP'
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
  - id: fact-cs-code-index-formats-lsif-and-scip-1
    statement: >-
      The LSIF specification describes a format for language servers or other programming tools to
      emit knowledge about a code workspace.
    source_title: LSIF 0.6 Specification
    source_url: https://microsoft.github.io/language-server-protocol/specifications/lsif/0.6.0/specification/
    confidence: medium
  - id: fact-cs-code-index-formats-lsif-and-scip-2
    statement: >-
      Sourcegraph documentation says the SCIP protobuf schema describes the structure of a SCIP
      index in machine-readable form.
    source_title: Sourcegraph Writing an Indexer
    source_url: https://sourcegraph.com/docs/code-search/code-navigation/writing_an_indexer
    confidence: medium
  - id: fact-cs-code-index-formats-lsif-and-scip-3
    statement: >-
      The SCIP repository describes SCIP as a code intelligence protocol.
    source_title: SCIP Repository
    source_url: https://github.com/sourcegraph/scip
    confidence: medium
completeness: 0.83
known_gaps:
  - Code index usefulness depends on language coverage, build configuration, symbol stability, dependency resolution, generated code handling, and how stale index files are invalidated.
disputed_statements: []
primary_sources:
  - title: LSIF 0.6 Specification
    type: standard
    year: 2026
    url: https://microsoft.github.io/language-server-protocol/specifications/lsif/0.6.0/specification/
    institution: Microsoft
  - title: Sourcegraph Writing an Indexer
    type: documentation
    year: 2026
    url: https://sourcegraph.com/docs/code-search/code-navigation/writing_an_indexer
    institution: Sourcegraph
  - title: SCIP Repository
    type: documentation
    year: 2026
    url: https://github.com/sourcegraph/scip
    institution: Sourcegraph
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

LSIF and SCIP let agents consume precomputed code intelligence instead of re-parsing every repository from scratch.

## Core Explanation

Precise code navigation needs definitions, references, hover text, imports, and symbol relationships. Index formats serialize that knowledge so code hosts and agents can answer navigation questions without running a full language server for every query.

Agents should check the index format, indexer version, repository revision, dependency lock state, and language coverage before trusting code-intelligence answers.

## Source-Mapped Facts

- The LSIF specification describes a format for language servers or other programming tools to emit knowledge about a code workspace. ([source](https://microsoft.github.io/language-server-protocol/specifications/lsif/0.6.0/specification/))
- Sourcegraph documentation says the SCIP protobuf schema describes the structure of a SCIP index in machine-readable form. ([source](https://sourcegraph.com/docs/code-search/code-navigation/writing_an_indexer))
- The SCIP repository describes SCIP as a code intelligence protocol. ([source](https://github.com/sourcegraph/scip))

## Further Reading

- [LSIF 0.6 Specification](https://microsoft.github.io/language-server-protocol/specifications/lsif/0.6.0/specification/)
- [Sourcegraph Writing an Indexer](https://sourcegraph.com/docs/code-search/code-navigation/writing_an_indexer)
- [SCIP Repository](https://github.com/sourcegraph/scip)
