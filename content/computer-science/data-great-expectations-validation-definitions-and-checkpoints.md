---
id: data-great-expectations-validation-definitions-and-checkpoints
title: 'Data Great Expectations Validation Definitions and Checkpoints'
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
  - id: fact-cs-data-great-expectations-validation-definitions-and-checkpoints-1
    statement: >-
      Great Expectations documentation says running validations validates
      expectations against data and lets users explore the results.
    source_title: Great Expectations Run Validations
    source_url: https://docs.greatexpectations.io/docs/core/run_validations/
    confidence: medium
  - id: fact-cs-data-great-expectations-validation-definitions-and-checkpoints-2
    statement: >-
      Great Expectations documentation says a Validation Definition links a
      Batch of data to an Expectation Suite.
    source_title: Great Expectations Create a Validation Definition
    source_url: https://docs.greatexpectations.io/docs/core/run_validations/create_a_validation_definition
    confidence: medium
  - id: fact-cs-data-great-expectations-validation-definitions-and-checkpoints-3
    statement: >-
      Great Expectations API documentation describes a Checkpoint as a primary
      means for validating data in a production deployment.
    source_title: Great Expectations Checkpoint Class
    source_url: https://docs.greatexpectations.io/docs/reference/api/Checkpoint_class
    confidence: medium
completeness: 0.82
known_gaps:
  - Validation behavior depends on datasource configuration, batch definitions, expectation suite versions, result format, checkpoint actions, runtime parameters, orchestrator scheduling, and how validation results are stored or alerted.
disputed_statements: []
primary_sources:
  - title: Great Expectations Run Validations
    type: documentation
    year: 2026
    url: https://docs.greatexpectations.io/docs/core/run_validations/
    institution: Great Expectations
  - title: Great Expectations Create a Validation Definition
    type: documentation
    year: 2026
    url: https://docs.greatexpectations.io/docs/core/run_validations/create_a_validation_definition
    institution: Great Expectations
  - title: Great Expectations Checkpoint Class
    type: documentation
    year: 2026
    url: https://docs.greatexpectations.io/docs/reference/api/Checkpoint_class
    institution: Great Expectations
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Great Expectations validation definitions and checkpoints give agents structured evidence about which data batch was tested, against which expectations, and with what production action policy.

## Core Explanation

Expectation suites describe data-quality assertions, but an incident investigation also needs to know what data was validated and how validation was triggered. Validation definitions connect data batches to suites, while checkpoints can run those definitions and trigger configured actions.

Agents should record datasource, data asset, batch definition, expectation suite, validation definition, checkpoint name, runtime parameters, result format, action list, and validation result location. Without that context, a failed expectation can be misread as a pipeline failure, schema drift, or stale test.

## Source-Mapped Facts

- Great Expectations documentation says running validations validates expectations against data and lets users explore the results. ([source](https://docs.greatexpectations.io/docs/core/run_validations/))
- Great Expectations documentation says a Validation Definition links a Batch of data to an Expectation Suite. ([source](https://docs.greatexpectations.io/docs/core/run_validations/create_a_validation_definition))
- Great Expectations API documentation describes a Checkpoint as a primary means for validating data in a production deployment. ([source](https://docs.greatexpectations.io/docs/reference/api/Checkpoint_class))

## Further Reading

- [Great Expectations Run Validations](https://docs.greatexpectations.io/docs/core/run_validations/)
- [Great Expectations Create a Validation Definition](https://docs.greatexpectations.io/docs/core/run_validations/create_a_validation_definition)
- [Great Expectations Checkpoint Class](https://docs.greatexpectations.io/docs/reference/api/Checkpoint_class)
