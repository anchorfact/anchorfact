---
id: agent-data-quality-tests-freshness-and-metrics
title: 'Agent Data Quality Tests, Freshness, and Metrics'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-09'
created_date: '2026-06-09'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-agent-data-quality-tests-freshness-and-metrics-1
    statement: >-
      dbt documentation says data tests are assertions about models and other resources, and dbt reports whether each test passes or fails when dbt test runs.
    source_title: dbt Data Tests
    source_url: https://docs.getdbt.com/docs/build/data-tests
    confidence: medium
  - id: fact-agent-data-quality-tests-freshness-and-metrics-2
    statement: >-
      dbt documentation says data tests return failing records, and a test passes when the query returns zero failing rows.
    source_title: dbt Data Tests
    source_url: https://docs.getdbt.com/docs/build/data-tests
    confidence: medium
  - id: fact-agent-data-quality-tests-freshness-and-metrics-3
    statement: >-
      dbt documentation says source freshness is intended to help determine whether source data freshness is meeting an organization's SLA.
    source_title: dbt Source Freshness
    source_url: https://docs.getdbt.com/docs/deploy/source-freshness
    confidence: medium
  - id: fact-agent-data-quality-tests-freshness-and-metrics-4
    statement: >-
      OpenLineage documentation says the Data Quality Metrics Facet lets platforms display and monitor metrics related to dataset health.
    source_title: OpenLineage Data Quality Metrics Facet
    source_url: https://openlineage.io/docs/spec/facets/dataset-facets/data_quality_metrics/
    confidence: medium
completeness: 0.84
known_gaps:
  - Data quality thresholds, alerting severity, and remediation policy are organization-specific and must be read from local configuration.
disputed_statements: []
primary_sources:
  - title: dbt Data Tests
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/docs/build/data-tests
    institution: dbt Labs
  - title: dbt Source Freshness
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/docs/deploy/source-freshness
    institution: dbt Labs
  - title: OpenLineage Data Quality Metrics Facet
    type: specification
    year: 2026
    url: https://openlineage.io/docs/spec/facets/dataset-facets/data_quality_metrics/
    institution: OpenLineage
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

Agents debugging data systems should inspect data tests, freshness checks, and dataset health metrics before proposing pipeline or warehouse changes.

## Core Explanation

Data quality evidence answers different questions. Tests show whether explicit assumptions failed, freshness checks show whether inputs are stale relative to an SLA, and quality metrics expose dataset-level signals such as row counts, file counts, byte counts, and column metrics.

For agent workflows, these signals should be treated as diagnostic context rather than automatic repair instructions. A failed uniqueness test, stale source, or changed row count can indicate upstream behavior, schema drift, late-arriving data, or a legitimate business change.

## Source-Mapped Facts

- dbt documentation says data tests are assertions about models and other resources, and dbt reports whether each test passes or fails when dbt test runs. ([source](https://docs.getdbt.com/docs/build/data-tests))
- dbt documentation says data tests return failing records, and a test passes when the query returns zero failing rows. ([source](https://docs.getdbt.com/docs/build/data-tests))
- dbt documentation says source freshness is intended to help determine whether source data freshness is meeting an organization's SLA. ([source](https://docs.getdbt.com/docs/deploy/source-freshness))
- OpenLineage documentation says the Data Quality Metrics Facet lets platforms display and monitor metrics related to dataset health. ([source](https://openlineage.io/docs/spec/facets/dataset-facets/data_quality_metrics/))

## Further Reading

- [dbt Data Tests](https://docs.getdbt.com/docs/build/data-tests)
- [dbt Source Freshness](https://docs.getdbt.com/docs/deploy/source-freshness)
- [OpenLineage Data Quality Metrics Facet](https://openlineage.io/docs/spec/facets/dataset-facets/data_quality_metrics/)
