---
id: data-freshness-slas-and-lateness-windows
title: 'Data Freshness SLAs and Lateness Windows'
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
  - id: fact-cs-data-freshness-slas-and-lateness-windows-1
    statement: >-
      Great Expectations documentation describes data freshness as validating that data is
      recent enough for its intended use.
    source_title: Great Expectations Freshness
    source_url: https://docs.greatexpectations.io/docs/reference/learn/data_quality_use_cases/freshness
    confidence: medium
  - id: fact-cs-data-freshness-slas-and-lateness-windows-2
    statement: >-
      Dagster documentation describes freshness policies as allowing users to define how up to
      date assets should be.
    source_title: Dagster Asset Freshness Policies
    source_url: https://docs.dagster.io/guides/observe/asset-freshness-policies
    confidence: medium
  - id: fact-cs-data-freshness-slas-and-lateness-windows-3
    statement: >-
      dbt documentation describes source freshness as a way to check whether source data is
      up to date.
    source_title: dbt Source Freshness
    source_url: https://docs.getdbt.com/docs/build/sources#source-data-freshness
    confidence: medium
completeness: 0.83
known_gaps:
  - Freshness policies depend on ingestion schedule, event time versus processing time, allowed lateness, backfills, timezone handling, watermark strategy, and downstream business criticality.
disputed_statements: []
primary_sources:
  - title: Great Expectations Freshness
    type: documentation
    year: 2026
    url: https://docs.greatexpectations.io/docs/reference/learn/data_quality_use_cases/freshness
    institution: Great Expectations
  - title: Dagster Asset Freshness Policies
    type: documentation
    year: 2026
    url: https://docs.dagster.io/guides/observe/asset-freshness-policies
    institution: Dagster
  - title: dbt Source Freshness
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/docs/build/sources#source-data-freshness
    institution: dbt Labs
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Freshness SLAs and lateness windows tell agents whether data is current enough to answer a question or trigger downstream work.

## Core Explanation

A dataset can have valid schema and still be unusable if it is stale. Agents should inspect source freshness checks, last successful run, expected schedule, watermark, deadline alerts, and allowed lateness before using the data as evidence.

Freshness should be judged against the purpose of the data. A daily finance report, a near-real-time fraud stream, and a weekly product analytics table need different freshness thresholds.

## Source-Mapped Facts

- Great Expectations documentation describes data freshness as validating that data is recent enough for its intended use. ([source](https://docs.greatexpectations.io/docs/reference/learn/data_quality_use_cases/freshness))
- Dagster documentation describes freshness policies as allowing users to define how up to date assets should be. ([source](https://docs.dagster.io/guides/observe/asset-freshness-policies))
- dbt documentation describes source freshness as a way to check whether source data is up to date. ([source](https://docs.getdbt.com/docs/build/sources#source-data-freshness))

## Further Reading

- [Great Expectations Freshness](https://docs.greatexpectations.io/docs/reference/learn/data_quality_use_cases/freshness)
- [Dagster Asset Freshness Policies](https://docs.dagster.io/guides/observe/asset-freshness-policies)
- [dbt Source Freshness](https://docs.getdbt.com/docs/build/sources#source-data-freshness)
