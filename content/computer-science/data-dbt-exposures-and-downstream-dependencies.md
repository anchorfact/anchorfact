---
id: data-dbt-exposures-and-downstream-dependencies
title: 'Data dbt Exposures and Downstream Dependencies'
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
  - id: fact-cs-data-dbt-exposures-and-downstream-dependencies-1
    statement: >-
      dbt documentation says exposures make it possible to define and describe a
      downstream use of a dbt project, such as a dashboard, application, or data
      science pipeline.
    source_title: dbt Exposures
    source_url: https://docs.getdbt.com/docs/build/exposures
    confidence: medium
  - id: fact-cs-data-dbt-exposures-and-downstream-dependencies-2
    statement: >-
      dbt exposure documentation says the depends_on property lists refable nodes
      including metric, ref, and source.
    source_title: dbt Exposures
    source_url: https://docs.getdbt.com/docs/build/exposures
    confidence: medium
  - id: fact-cs-data-dbt-exposures-and-downstream-dependencies-3
    statement: >-
      dbt manifest documentation lists exposures, parent_map, and child_map as
      top-level keys in manifest.json.
    source_title: dbt Manifest JSON File
    source_url: https://docs.getdbt.com/reference/artifacts/manifest-json
    confidence: medium
completeness: 0.82
known_gaps:
  - Exposure usefulness depends on manual YAML accuracy, automatic integration coverage, manifest version, freshness metadata, BI ownership, semantic-layer usage, and whether downstream tools publish complete dependency data.
disputed_statements: []
primary_sources:
  - title: dbt Exposures
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/docs/build/exposures
    institution: dbt Labs
  - title: dbt Manifest JSON File
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/reference/artifacts/manifest-json
    institution: dbt Labs
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

dbt exposures help agents trace which dashboards, applications, notebooks, and ML workflows depend on modeled data.

## Core Explanation

Data agents should not treat a warehouse model as isolated. A column rename, freshness failure, or contract change can affect dashboards, applications, data science pipelines, and semantic metrics downstream.

dbt exposures encode those consumer-facing dependencies in the project graph. Agents should inspect exposure names, owners, maturity, URLs, depends_on entries, generated docs, manifest exposures, parent maps, and child maps before recommending a model change or backfill.

## Source-Mapped Facts

- dbt documentation says exposures make it possible to define and describe a downstream use of a dbt project, such as a dashboard, application, or data science pipeline. ([source](https://docs.getdbt.com/docs/build/exposures))
- dbt exposure documentation says the depends_on property lists refable nodes including metric, ref, and source. ([source](https://docs.getdbt.com/docs/build/exposures))
- dbt manifest documentation lists exposures, parent_map, and child_map as top-level keys in manifest.json. ([source](https://docs.getdbt.com/reference/artifacts/manifest-json))

## Further Reading

- [dbt Exposures](https://docs.getdbt.com/docs/build/exposures)
- [dbt Manifest JSON File](https://docs.getdbt.com/reference/artifacts/manifest-json)
