---
id: agent-dbt-artifacts-manifest-run-results-and-sources-json
title: 'Agent dbt Artifacts: manifest.json, run_results.json, and sources.json'
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
  - id: fact-agent-dbt-artifacts-manifest-run-results-and-sources-json-1
    statement: >-
      dbt documentation says manifest.json contains a full representation of a dbt project's resources, including models, tests, macros, node configurations, and resource properties.
    source_title: dbt Manifest JSON file
    source_url: https://docs.getdbt.com/reference/artifacts/manifest-json
    confidence: medium
  - id: fact-agent-dbt-artifacts-manifest-run-results-and-sources-json-2
    statement: >-
      dbt documentation says run_results.json contains timing and status information for each executed node in a completed dbt invocation.
    source_title: dbt Run results JSON file
    source_url: https://docs.getdbt.com/reference/artifacts/run-results-json
    confidence: medium
  - id: fact-agent-dbt-artifacts-manifest-run-results-and-sources-json-3
    statement: >-
      dbt documentation says sources.json is produced by source freshness and contains information about sources with freshness checks.
    source_title: dbt Sources JSON file
    source_url: https://docs.getdbt.com/reference/artifacts/sources-json
    confidence: medium
completeness: 0.84
known_gaps:
  - Artifact schema versions vary by dbt version, so agents must read the artifact metadata before assuming fields.
disputed_statements: []
primary_sources:
  - title: dbt Manifest JSON file
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/reference/artifacts/manifest-json
    institution: dbt Labs
  - title: dbt Run results JSON file
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/reference/artifacts/run-results-json
    institution: dbt Labs
  - title: dbt Sources JSON file
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/reference/artifacts/sources-json
    institution: dbt Labs
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

dbt artifacts are agent-readable evidence for data transformation structure, executed-node status, runtime timing, and source freshness.

## Core Explanation

Agents debugging analytics pipelines often need to answer three different questions: what resources exist, what actually ran, and whether upstream sources were fresh enough. `manifest.json` supports graph and configuration lookup, `run_results.json` supports run-level failure and latency diagnosis, and `sources.json` supports freshness checks tied back to source nodes.

These files are safer than scraping CLI text because they preserve stable identifiers such as `unique_id`, node status, execution timing, and source freshness fields. Agents should still validate the artifact schema version before using a cached parser.

## Source-Mapped Facts

- dbt documentation says manifest.json contains a full representation of a dbt project's resources, including models, tests, macros, node configurations, and resource properties. ([source](https://docs.getdbt.com/reference/artifacts/manifest-json))
- dbt documentation says run_results.json contains timing and status information for each executed node in a completed dbt invocation. ([source](https://docs.getdbt.com/reference/artifacts/run-results-json))
- dbt documentation says sources.json is produced by source freshness and contains information about sources with freshness checks. ([source](https://docs.getdbt.com/reference/artifacts/sources-json))

## Further Reading

- [dbt Manifest JSON file](https://docs.getdbt.com/reference/artifacts/manifest-json)
- [dbt Run results JSON file](https://docs.getdbt.com/reference/artifacts/run-results-json)
- [dbt Sources JSON file](https://docs.getdbt.com/reference/artifacts/sources-json)
