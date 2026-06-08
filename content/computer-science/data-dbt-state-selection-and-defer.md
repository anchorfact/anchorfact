---
id: data-dbt-state-selection-and-defer
title: 'Data dbt State Selection and Defer'
schema_type: TechArticle
category: computer-science
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
  - id: fact-cs-data-dbt-state-selection-and-defer-1
    statement: >-
      dbt documentation says the state selector compares resources against a
      previous version of the same project represented by a manifest.
    source_title: dbt State Selection
    source_url: https://docs.getdbt.com/reference/node-selection/methods#state
    confidence: medium
  - id: fact-cs-data-dbt-state-selection-and-defer-2
    statement: >-
      dbt documentation says the defer feature uses state artifacts to resolve
      references to upstream resources.
    source_title: dbt Defer
    source_url: https://docs.getdbt.com/reference/node-selection/defer
    confidence: medium
  - id: fact-cs-data-dbt-state-selection-and-defer-3
    statement: >-
      dbt documentation says state comparison requires a manifest from a
      previous dbt invocation.
    source_title: dbt About State
    source_url: https://docs.getdbt.com/reference/node-selection/state-comparison-caveats
    confidence: medium
completeness: 0.84
known_gaps:
  - dbt state behavior depends on dbt version, manifest schema, target environment, adapter, partial parsing, macro changes, environment-aware configs, selected command, and whether the state artifact matches the intended baseline.
  - Defer can prevent rebuilding upstream models in development, but incorrect state artifacts can hide dependency drift or resolve references to the wrong environment.
disputed_statements: []
primary_sources:
  - title: dbt State Selection
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/reference/node-selection/methods#state
    institution: dbt Labs
  - title: dbt Defer
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/reference/node-selection/defer
    institution: dbt Labs
  - title: dbt About State
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/reference/node-selection/state-comparison-caveats
    institution: dbt Labs
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

dbt state selection and defer let data agents compare a working branch against prior artifacts and run only changed resources while borrowing upstream references from another environment.

## Core Explanation

State-aware dbt workflows are common in CI and development because rebuilding an entire warehouse graph is slow. An agent debugging a dbt command should identify the state manifest path, selected resource expression, target profile, defer flag, generated artifacts, and whether the command is comparing code, configuration, relation names, or test definitions.

Useful evidence includes `manifest.json` version, invocation ID, state directory, selection expression such as `state:modified`, defer behavior, upstream relation resolution, and the final node list. Agents should avoid treating a small selected set as proof that the whole graph is healthy.

## Source-Mapped Facts

- dbt documentation says the state selector compares resources against a previous version of the same project represented by a manifest. ([source](https://docs.getdbt.com/reference/node-selection/methods#state))
- dbt documentation says the defer feature uses state artifacts to resolve references to upstream resources. ([source](https://docs.getdbt.com/reference/node-selection/defer))
- dbt documentation says state comparison requires a manifest from a previous dbt invocation. ([source](https://docs.getdbt.com/reference/node-selection/state-comparison-caveats))

## Further Reading

- [dbt State Selection](https://docs.getdbt.com/reference/node-selection/methods#state)
- [dbt Defer](https://docs.getdbt.com/reference/node-selection/defer)
- [dbt About State](https://docs.getdbt.com/reference/node-selection/state-comparison-caveats)
