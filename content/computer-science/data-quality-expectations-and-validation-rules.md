---
id: data-quality-expectations-and-validation-rules
title: 'Data Quality Expectations and Validation Rules'
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
  - id: fact-cs-data-quality-expectations-and-validation-rules-1
    statement: >-
      Great Expectations documentation describes running validations by validating
      Expectations against data and exploring the results.
    source_title: Great Expectations Run Validations
    source_url: https://docs.greatexpectations.io/docs/core/run_validations/
    confidence: medium
  - id: fact-cs-data-quality-expectations-and-validation-rules-2
    statement: >-
      dbt documentation describes data tests as assertions about models and other resources
      in a dbt project.
    source_title: dbt Data Tests
    source_url: https://docs.getdbt.com/docs/build/data-tests
    confidence: medium
  - id: fact-cs-data-quality-expectations-and-validation-rules-3
    statement: >-
      SodaCL documentation describes Soda Checks Language as a YAML-based language for data
      quality checks.
    source_title: SodaCL Overview
    source_url: https://docs.soda.io/soda-documentation/soda-v3/soda-cl-overview
    confidence: medium
completeness: 0.83
known_gaps:
  - Data validation design depends on freshness, completeness, uniqueness, schema drift, distribution checks, anomaly windows, sampling, ownership, severity, and alert routing.
disputed_statements: []
primary_sources:
  - title: Great Expectations Run Validations
    type: documentation
    year: 2026
    url: https://docs.greatexpectations.io/docs/core/run_validations/
    institution: Great Expectations
  - title: dbt Data Tests
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/docs/build/data-tests
    institution: dbt Labs
  - title: SodaCL Overview
    type: documentation
    year: 2026
    url: https://docs.soda.io/soda-documentation/soda-v3/soda-cl-overview
    institution: Soda
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Data quality expectations and validation rules give agents executable evidence about whether a dataset is fit for use.

## Core Explanation

Agents answering data questions should not rely only on table names or row counts. They need quality signals such as failed tests, freshness checks, null thresholds, uniqueness constraints, accepted values, distribution drift, and validation history.

Validation rules become more useful when they are close to the data product contract. A failed rule can tell the agent whether to block a downstream answer, warn about incomplete evidence, open an incident, or request an owner decision.

## Source-Mapped Facts

- Great Expectations documentation describes running validations by validating Expectations against data and exploring the results. ([source](https://docs.greatexpectations.io/docs/core/run_validations/))
- dbt documentation describes data tests as assertions about models and other resources in a dbt project. ([source](https://docs.getdbt.com/docs/build/data-tests))
- SodaCL documentation describes Soda Checks Language as a YAML-based language for data quality checks. ([source](https://docs.soda.io/soda-documentation/soda-v3/soda-cl-overview))

## Further Reading

- [Great Expectations Run Validations](https://docs.greatexpectations.io/docs/core/run_validations/)
- [dbt Data Tests](https://docs.getdbt.com/docs/build/data-tests)
- [SodaCL Overview](https://docs.soda.io/soda-documentation/soda-v3/soda-cl-overview)
