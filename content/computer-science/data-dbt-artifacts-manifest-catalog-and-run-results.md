---
id: data-dbt-artifacts-manifest-catalog-and-run-results
title: 'Data dbt Artifacts Manifest Catalog and Run Results'
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
  - id: fact-cs-data-dbt-artifacts-manifest-catalog-and-run-results-1
    statement: >-
      dbt documentation says manifest.json contains a full representation of a
      dbt project's resources.
    source_title: dbt Manifest JSON File
    source_url: https://docs.getdbt.com/reference/artifacts/manifest-json
    confidence: medium
  - id: fact-cs-data-dbt-artifacts-manifest-catalog-and-run-results-2
    statement: >-
      dbt documentation says catalog.json contains information from a data
      warehouse about tables and views produced and defined by project resources.
    source_title: dbt Catalog JSON File
    source_url: https://docs.getdbt.com/reference/artifacts/catalog-json
    confidence: medium
  - id: fact-cs-data-dbt-artifacts-manifest-catalog-and-run-results-3
    statement: >-
      dbt documentation says run_results.json contains information about a
      completed invocation of dbt, including timing and status information.
    source_title: dbt Run Results JSON File
    source_url: https://docs.getdbt.com/reference/artifacts/run-results-json
    confidence: medium
completeness: 0.82
known_gaps:
  - dbt artifact evidence depends on dbt version, adapter, partial parsing, selected command, target profile, generated docs timing, invocation ID, environment variables, deferred state, and whether artifacts were retained from the same run.
disputed_statements: []
primary_sources:
  - title: dbt Manifest JSON File
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/reference/artifacts/manifest-json
    institution: dbt Labs
  - title: dbt Catalog JSON File
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/reference/artifacts/catalog-json
    institution: dbt Labs
  - title: dbt Run Results JSON File
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/reference/artifacts/run-results-json
    institution: dbt Labs
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

dbt manifest, catalog, and run-results artifacts let data agents connect project graph, warehouse metadata, and execution outcomes.

## Core Explanation

dbt projects produce multiple machine-readable artifacts. The manifest describes project resources and dependencies; the catalog describes warehouse-level table and column metadata; run results describe what happened during a dbt invocation.

Agents should keep artifact paths, dbt version, invocation ID, target, selected command, node IDs, status, timing, adapter response, and generated-docs time together before diagnosing freshness, lineage, or failed models.

## Source-Mapped Facts

- dbt documentation says manifest.json contains a full representation of a dbt project's resources. ([source](https://docs.getdbt.com/reference/artifacts/manifest-json))
- dbt documentation says catalog.json contains information from a data warehouse about tables and views produced and defined by project resources. ([source](https://docs.getdbt.com/reference/artifacts/catalog-json))
- dbt documentation says run_results.json contains information about a completed invocation of dbt, including timing and status information. ([source](https://docs.getdbt.com/reference/artifacts/run-results-json))

## Further Reading

- [dbt Manifest JSON File](https://docs.getdbt.com/reference/artifacts/manifest-json)
- [dbt Catalog JSON File](https://docs.getdbt.com/reference/artifacts/catalog-json)
- [dbt Run Results JSON File](https://docs.getdbt.com/reference/artifacts/run-results-json)
