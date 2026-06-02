---
id: schema-drift-and-data-observability
title: 'Schema Drift and Data Observability'
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
  - id: fact-computer-science-schema-drift-and-data-observability-1
    statement: >-
      Evidently drift documentation describes drift checks as comparing current data to reference data.
    source_title: Evidently Data Drift
    source_url: https://docs.evidentlyai.com/metrics/explainer_drift
    confidence: medium
  - id: fact-computer-science-schema-drift-and-data-observability-2
    statement: >-
      Soda schema check documentation describes detecting when columns are missing, added, deleted, or have changed data types.
    source_title: Soda Schema Checks
    source_url: https://docs.soda.io/soda-cl/schema.html
    confidence: medium
  - id: fact-computer-science-schema-drift-and-data-observability-3
    statement: >-
      Great Expectations documentation includes an expectation for checking that table columns match a specified set.
    source_title: Great Expectations Table Columns Expectation
    source_url: https://greatexpectations.io/expectations/expect_table_columns_to_match_set/
    confidence: medium
completeness: 0.83
known_gaps:
  - Schema drift alerts need ownership, severity rules, allowed evolution paths, and downstream impact analysis to avoid noisy alerts.
disputed_statements: []
primary_sources:
  - title: Evidently Data Drift
    type: documentation
    year: 2026
    url: https://docs.evidentlyai.com/metrics/explainer_drift
    institution: Evidently
  - title: Soda Schema Checks
    type: documentation
    year: 2026
    url: https://docs.soda.io/soda-cl/schema.html
    institution: Soda
  - title: Great Expectations Table Columns Expectation
    type: documentation
    year: 2026
    url: https://greatexpectations.io/expectations/expect_table_columns_to_match_set/
    institution: Great Expectations
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Schema drift and data observability help agents detect when upstream data shape changes break pipelines, retrieval indexes, dashboards, or ML features.

## Core Explanation

Agents debugging data failures should inspect column sets, data types, null rates, freshness, and drift checks before editing transformations. A table can keep the same name while changing shape enough to break downstream systems.

Schema observability is most useful when alerts link to owners, recent deployments, and affected consumers. Agents should distinguish approved schema evolution from unexpected drift.

## Source-Mapped Facts

- Evidently drift documentation describes drift checks as comparing current data to reference data. ([source](https://docs.evidentlyai.com/metrics/explainer_drift))
- Soda schema check documentation describes detecting when columns are missing, added, deleted, or have changed data types. ([source](https://docs.soda.io/soda-cl/schema.html))
- Great Expectations documentation includes an expectation for checking that table columns match a specified set. ([source](https://greatexpectations.io/expectations/expect_table_columns_to_match_set/))

## Further Reading

- [Evidently Data Drift](https://docs.evidentlyai.com/metrics/explainer_drift)
- [Soda Schema Checks](https://docs.soda.io/soda-cl/schema.html)
- [Great Expectations Table Columns Expectation](https://greatexpectations.io/expectations/expect_table_columns_to_match_set/)
