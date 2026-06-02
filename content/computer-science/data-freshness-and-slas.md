---
id: data-freshness-and-slas
title: 'Data Freshness and SLAs'
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
  - id: fact-data-freshness-and-slas-1
    statement: >-
      dbt source freshness documentation says source freshness measures the age of source data by
      checking a loaded_at_field in a source table.
    source_title: dbt Source Freshness
    source_url: https://docs.getdbt.com/docs/deploy/source-freshness
    confidence: medium
  - id: fact-data-freshness-and-slas-2
    statement: >-
      Great Expectations documentation says freshness expectations validate that data was created,
      delivered, or updated within a specified time window.
    source_title: Great Expectations Freshness
    source_url: https://docs.greatexpectations.io/docs/reference/learn/data_quality_use_cases/freshness/
    confidence: medium
  - id: fact-data-freshness-and-slas-3
    statement: >-
      Airflow deadline alerts documentation says deadline alerts let users set time thresholds for
      DAG runs and automatically respond when those thresholds are exceeded.
    source_title: Airflow Deadline Alerts
    source_url: https://airflow.apache.org/docs/apache-airflow/stable/howto/deadline-alerts.html
    confidence: medium
completeness: 0.84
known_gaps:
  - Freshness checks do not guarantee semantic correctness, completeness, or downstream business metric validity.
disputed_statements: []
primary_sources:
  - title: dbt Source Freshness
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/docs/deploy/source-freshness
    institution: dbt Labs
  - title: Great Expectations Freshness
    type: documentation
    year: 2026
    url: https://docs.greatexpectations.io/docs/reference/learn/data_quality_use_cases/freshness/
    institution: Great Expectations
  - title: Airflow Deadline Alerts
    type: documentation
    year: 2026
    url: https://airflow.apache.org/docs/apache-airflow/stable/howto/deadline-alerts.html
    institution: Apache Airflow
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Data freshness and SLAs tell agents whether a dataset or pipeline output is recent enough to trust for a workflow.

## Core Explanation

Fresh data is not automatically correct, but stale data is often disqualifying for operational decisions. Freshness checks compare timestamps, load times, or update windows against declared expectations. SLA-style alerts then notify or fail workflows when data or pipeline runs are too late.

For RAG and data agents, freshness metadata should be attached to retrieved records, catalog entries, and pipeline outputs. This lets the agent downrank stale sources, refuse unsupported answers, or escalate when the available evidence is too old for the question.

## Source-Mapped Facts

- dbt source freshness documentation says source freshness measures the age of source data by checking a loaded_at_field in a source table. ([source](https://docs.getdbt.com/docs/deploy/source-freshness))
- Great Expectations documentation says freshness expectations validate that data was created, delivered, or updated within a specified time window. ([source](https://docs.greatexpectations.io/docs/reference/learn/data_quality_use_cases/freshness/))
- Airflow deadline alerts documentation says deadline alerts let users set time thresholds for DAG runs and automatically respond when those thresholds are exceeded. ([source](https://airflow.apache.org/docs/apache-airflow/stable/howto/deadline-alerts.html))

## Further Reading

- [dbt Source Freshness](https://docs.getdbt.com/docs/deploy/source-freshness)
- [Great Expectations Freshness](https://docs.greatexpectations.io/docs/reference/learn/data_quality_use_cases/freshness/)
- [Airflow Deadline Alerts](https://airflow.apache.org/docs/apache-airflow/stable/howto/deadline-alerts.html)
