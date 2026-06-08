---
id: data-dbt-tests-severity-and-store-failures
title: 'Data dbt Tests Severity and Store Failures'
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
  - id: fact-cs-data-dbt-tests-severity-and-store-failures-1
    statement: >-
      dbt data test documentation says data test queries return rows where an
      assertion is not true, and the assertion passes when the test returns zero
      rows.
    source_title: dbt Data Tests
    source_url: https://docs.getdbt.com/docs/build/data-tests
    confidence: medium
  - id: fact-cs-data-dbt-tests-severity-and-store-failures-2
    statement: >-
      dbt severity documentation says tests return a number of failures and
      generally return an error when that number is nonzero.
    source_title: dbt Severity, error_if, and warn_if
    source_url: https://docs.getdbt.com/reference/resource-configs/severity
    confidence: medium
  - id: fact-cs-data-dbt-tests-severity-and-store-failures-3
    statement: >-
      dbt severity documentation says severity: warn skips error_if and checks
      warn_if, so by default the test returns a warning rather than an error.
    source_title: dbt Severity, error_if, and warn_if
    source_url: https://docs.getdbt.com/reference/resource-configs/severity
    confidence: medium
  - id: fact-cs-data-dbt-tests-severity-and-store-failures-4
    statement: >-
      dbt store_failures documentation says configured tests store failures when
      dbt test --store-failures is invoked, and store_failures: true saves
      failed records up to limit in a new table named for the test.
    source_title: dbt store_failures
    source_url: https://docs.getdbt.com/reference/resource-configs/store_failures
    confidence: medium
completeness: 0.82
known_gaps:
  - Data test diagnosis depends on test SQL, generic test macro version, severity, error_if, warn_if, fail_calc, limit, where filters, store_failures, store_failures_as, target schema permissions, adapter behavior, and whether downstream jobs treat warnings as deploy blockers.
disputed_statements: []
primary_sources:
  - title: dbt Data Tests
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/docs/build/data-tests
    institution: dbt Labs
  - title: dbt Severity, error_if, and warn_if
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/reference/resource-configs/severity
    institution: dbt Labs
  - title: dbt store_failures
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/reference/resource-configs/store_failures
    institution: dbt Labs
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

dbt test severity and stored failures tell agents whether a data quality result should block a pipeline, warn only, or leave failed rows behind for debugging.

## Core Explanation

dbt tests are executable assertions. They usually return the rows that violate a rule, but the operational meaning of those rows depends on configuration. The same failing record count can become a hard error, a warning, or persisted audit evidence depending on severity and failure storage settings.

Agents should inspect the test definition, compiled SQL, failure count, `severity`, `error_if`, `warn_if`, `fail_calc`, `limit`, `where`, `store_failures`, audit schema, dbt invocation flags, and orchestration policy before deciding whether to rerun, quarantine data, or change model logic.

## Source-Mapped Facts

- dbt data test documentation says data test queries return rows where an assertion is not true, and the assertion passes when the test returns zero rows. ([source](https://docs.getdbt.com/docs/build/data-tests))
- dbt severity documentation says tests return a number of failures and generally return an error when that number is nonzero. ([source](https://docs.getdbt.com/reference/resource-configs/severity))
- dbt severity documentation says severity: warn skips error_if and checks warn_if, so by default the test returns a warning rather than an error. ([source](https://docs.getdbt.com/reference/resource-configs/severity))
- dbt store_failures documentation says configured tests store failures when dbt test --store-failures is invoked, and store_failures: true saves failed records up to limit in a new table named for the test. ([source](https://docs.getdbt.com/reference/resource-configs/store_failures))

## Further Reading

- [dbt Data Tests](https://docs.getdbt.com/docs/build/data-tests)
- [dbt Severity, error_if, and warn_if](https://docs.getdbt.com/reference/resource-configs/severity)
- [dbt store_failures](https://docs.getdbt.com/reference/resource-configs/store_failures)
