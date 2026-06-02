---
id: data-profiling-and-column-statistics
title: 'Data Profiling and Column Statistics'
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
  - id: fact-cs-data-profiling-and-column-statistics-1
    statement: >-
      Dataplex documentation says data profiling discovers common statistical characteristics of
      columns in BigQuery tables.
    source_title: Dataplex Data Profiling Overview
    source_url: https://docs.cloud.google.com/dataplex/docs/data-profiling-overview
    confidence: medium
  - id: fact-cs-data-profiling-and-column-statistics-2
    statement: >-
      BigQuery documentation says data profile scan results can appear on a source table's Data
      profile tab.
    source_title: BigQuery Data Profile Scan
    source_url: https://docs.cloud.google.com/bigquery/docs/data-profile-scan
    confidence: medium
  - id: fact-cs-data-profiling-and-column-statistics-3
    statement: >-
      BigQuery INFORMATION_SCHEMA COLUMNS view contains one row for each column in a table.
    source_title: BigQuery INFORMATION_SCHEMA COLUMNS
    source_url: https://cloud.google.com/bigquery/docs/information-schema-columns
    confidence: medium
completeness: 0.83
known_gaps:
  - Profiling usefulness depends on sampling, scan schedule, null handling, nested fields, masking policy, freshness, and whether statistics are tied to data quality thresholds or alerting.
disputed_statements: []
primary_sources:
  - title: Dataplex Data Profiling Overview
    type: documentation
    year: 2026
    url: https://docs.cloud.google.com/dataplex/docs/data-profiling-overview
    institution: Google Cloud
  - title: BigQuery Data Profile Scan
    type: documentation
    year: 2026
    url: https://docs.cloud.google.com/bigquery/docs/data-profile-scan
    institution: Google Cloud
  - title: BigQuery INFORMATION_SCHEMA COLUMNS
    type: documentation
    year: 2026
    url: https://cloud.google.com/bigquery/docs/information-schema-columns
    institution: Google Cloud
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Data profiling gives agents column-level evidence about shape, completeness, and distribution before they trust or transform a dataset.

## Core Explanation

Agents often need to answer whether a table is usable for analytics, training, migration, or reporting. Schema alone is not enough. Profiling can surface null rates, distinct values, min and max values, inferred patterns, and other column-level signals.

Useful profiling evidence includes scan time, column name, type, null ratio, distinct count, detected anomalies, sample policy, and whether the profile was generated before or after a pipeline change.

## Source-Mapped Facts

- Dataplex documentation says data profiling discovers common statistical characteristics of columns in BigQuery tables. ([source](https://docs.cloud.google.com/dataplex/docs/data-profiling-overview))
- BigQuery documentation says data profile scan results can appear on a source table's Data profile tab. ([source](https://docs.cloud.google.com/bigquery/docs/data-profile-scan))
- BigQuery INFORMATION_SCHEMA COLUMNS view contains one row for each column in a table. ([source](https://cloud.google.com/bigquery/docs/information-schema-columns))

## Further Reading

- [Dataplex Data Profiling Overview](https://docs.cloud.google.com/dataplex/docs/data-profiling-overview)
- [BigQuery Data Profile Scan](https://docs.cloud.google.com/bigquery/docs/data-profile-scan)
- [BigQuery INFORMATION_SCHEMA COLUMNS](https://cloud.google.com/bigquery/docs/information-schema-columns)
