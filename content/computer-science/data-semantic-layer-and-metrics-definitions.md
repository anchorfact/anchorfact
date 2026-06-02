---
id: data-semantic-layer-and-metrics-definitions
title: 'Data Semantic Layer and Metrics Definitions'
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
  - id: fact-cs-data-semantic-layer-and-metrics-definitions-1
    statement: >-
      dbt documentation describes the dbt Semantic Layer as a way to define metrics and
      dimensions in code.
    source_title: dbt Semantic Layer
    source_url: https://docs.getdbt.com/docs/use-dbt-semantic-layer/dbt-sl
    confidence: medium
  - id: fact-cs-data-semantic-layer-and-metrics-definitions-2
    statement: >-
      Cube documentation describes Cube as providing a semantic layer that gives consumers
      shared context from data models.
    source_title: Cube Documentation Introduction
    source_url: https://docs.cube.dev/docs/introduction
    confidence: medium
  - id: fact-cs-data-semantic-layer-and-metrics-definitions-3
    statement: >-
      Looker documentation describes LookML as a language for describing dimensions, aggregates,
      calculations, and data relationships.
    source_title: LookML Terms and Concepts
    source_url: https://cloud.google.com/looker/docs/lookml-terms-and-concepts
    confidence: medium
completeness: 0.83
known_gaps:
  - Semantic-layer quality depends on metric ownership, grain, dimensions, join paths, time zones, access policies, and versioning across BI and AI consumers.
disputed_statements: []
primary_sources:
  - title: dbt Semantic Layer
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/docs/use-dbt-semantic-layer/dbt-sl
    institution: dbt Labs
  - title: Cube Documentation Introduction
    type: documentation
    year: 2026
    url: https://docs.cube.dev/docs/introduction
    institution: Cube
  - title: LookML Terms and Concepts
    type: documentation
    year: 2026
    url: https://cloud.google.com/looker/docs/lookml-terms-and-concepts
    institution: Google Cloud
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

A semantic layer turns business metrics and dimensions into versioned definitions that agents can query without guessing SQL semantics.

## Core Explanation

Data agents often fail because table names do not encode business meaning. A semantic layer defines metrics, dimensions, relationships, filters, and access policies in a shared model. That gives agents a safer interface for analytics questions than raw warehouse tables.

The important evidence is not only the metric name. Agents should collect the metric definition, grain, time dimension, filters, owner, version, and allowed dimensions before answering a business question.

## Source-Mapped Facts

- dbt documentation describes the dbt Semantic Layer as a way to define metrics and dimensions in code. ([source](https://docs.getdbt.com/docs/use-dbt-semantic-layer/dbt-sl))
- Cube documentation describes Cube as providing a semantic layer that gives consumers shared context from data models. ([source](https://docs.cube.dev/docs/introduction))
- Looker documentation describes LookML as a language for describing dimensions, aggregates, calculations, and data relationships. ([source](https://cloud.google.com/looker/docs/lookml-terms-and-concepts))

## Further Reading

- [dbt Semantic Layer](https://docs.getdbt.com/docs/use-dbt-semantic-layer/dbt-sl)
- [Cube Documentation Introduction](https://docs.cube.dev/docs/introduction)
- [LookML Terms and Concepts](https://cloud.google.com/looker/docs/lookml-terms-and-concepts)
