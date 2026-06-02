---
id: data-dbt-source-freshness-and-sources-json
title: 'Data dbt Source Freshness and sources.json'
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
  - id: fact-cs-data-dbt-source-freshness-and-sources-json-1
    statement: >-
      dbt documentation says dbt source freshness queries defined source tables and determines
      freshness.
    source_title: dbt Source Command
    source_url: https://docs.getdbt.com/reference/commands/source
    confidence: medium
  - id: fact-cs-data-dbt-source-freshness-and-sources-json-2
    statement: >-
      dbt documentation says warn_after and error_after define thresholds for source freshness
      warnings and failures.
    source_title: dbt Freshness Property
    source_url: https://docs.getdbt.com/reference/resource-properties/freshness
    confidence: medium
  - id: fact-cs-data-dbt-source-freshness-and-sources-json-3
    statement: >-
      dbt documentation says sources.json is produced by source freshness and contains information
      about sources with freshness checks.
    source_title: dbt Sources JSON File
    source_url: https://docs.getdbt.com/reference/artifacts/sources-json
    confidence: medium
completeness: 0.82
known_gaps:
  - Freshness status depends on warehouse adapter support, loaded_at_field or loaded_at_query configuration, timezone handling, filters, ingestion lag, and orchestration behavior.
disputed_statements: []
primary_sources:
  - title: dbt Source Command
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/reference/commands/source
    institution: dbt Labs
  - title: dbt Freshness Property
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/reference/resource-properties/freshness
    institution: dbt Labs
  - title: dbt Sources JSON File
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/reference/artifacts/sources-json
    institution: dbt Labs
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

dbt source freshness gives agents a structured way to inspect stale upstream tables and read machine-produced freshness results from sources.json.

## Core Explanation

Freshness checks encode how old source data can be before the pipeline warns or fails. The dbt source command can query configured source tables, compare their latest loaded timestamp against thresholds, and emit a sources.json artifact with freshness execution details.

Agents debugging data freshness should inspect source YAML, warn and error thresholds, loaded timestamp fields, filters, adapter metadata support, sources.json statuses, and upstream ingestion schedules before editing downstream models.

## Source-Mapped Facts

- dbt documentation says dbt source freshness queries defined source tables and determines freshness. ([source](https://docs.getdbt.com/reference/commands/source))
- dbt documentation says warn_after and error_after define thresholds for source freshness warnings and failures. ([source](https://docs.getdbt.com/reference/resource-properties/freshness))
- dbt documentation says sources.json is produced by source freshness and contains information about sources with freshness checks. ([source](https://docs.getdbt.com/reference/artifacts/sources-json))

## Further Reading

- [dbt Source Command](https://docs.getdbt.com/reference/commands/source)
- [dbt Freshness Property](https://docs.getdbt.com/reference/resource-properties/freshness)
- [dbt Sources JSON File](https://docs.getdbt.com/reference/artifacts/sources-json)
