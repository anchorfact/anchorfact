---
id: data-column-masking-and-dynamic-data-masking
title: 'Data Column Masking and Dynamic Data Masking'
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
  - id: fact-cs-data-column-masking-and-dynamic-data-masking-1
    statement: >-
      Snowflake documentation describes masking policies as schema-level objects used to
      protect sensitive data in columns.
    source_title: Snowflake Column-Level Security
    source_url: https://docs.snowflake.com/en/user-guide/security-column-intro
    confidence: medium
  - id: fact-cs-data-column-masking-and-dynamic-data-masking-2
    statement: >-
      BigQuery documentation describes column-level access control as using policy tags to
      restrict access to columns.
    source_title: BigQuery Column-Level Security
    source_url: https://docs.cloud.google.com/bigquery/docs/column-level-security-intro
    confidence: medium
  - id: fact-cs-data-column-masking-and-dynamic-data-masking-3
    statement: >-
      SQL Server documentation describes dynamic data masking as limiting sensitive data
      exposure by masking it to nonprivileged users.
    source_title: SQL Server Dynamic Data Masking
    source_url: https://learn.microsoft.com/en-us/sql/relational-databases/security/dynamic-data-masking?view=sql-server-ver17
    confidence: medium
completeness: 0.83
known_gaps:
  - Masking controls depend on role mapping, view definitions, export jobs, BI extracts, cached query results, and whether downstream RAG indexes preserve column policies.
disputed_statements: []
primary_sources:
  - title: Snowflake Column-Level Security
    type: documentation
    year: 2026
    url: https://docs.snowflake.com/en/user-guide/security-column-intro
    institution: Snowflake
  - title: BigQuery Column-Level Security
    type: documentation
    year: 2026
    url: https://docs.cloud.google.com/bigquery/docs/column-level-security-intro
    institution: Google Cloud
  - title: SQL Server Dynamic Data Masking
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/sql/relational-databases/security/dynamic-data-masking?view=sql-server-ver17
    institution: Microsoft
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Column masking and dynamic data masking let data systems expose useful query results while hiding sensitive values from unauthorized identities.

## Core Explanation

Data agents need to know not only which table can be queried, but which columns are masked or restricted for the active identity. A query result can look incomplete because a masking policy worked correctly.

The same policy must be considered downstream. If masked or policy-tagged data is copied into a semantic layer, BI extract, or RAG index, the agent should verify that the derived artifact retains the same access intent.

## Source-Mapped Facts

- Snowflake documentation describes masking policies as schema-level objects used to protect sensitive data in columns. ([source](https://docs.snowflake.com/en/user-guide/security-column-intro))
- BigQuery documentation describes column-level access control as using policy tags to restrict access to columns. ([source](https://docs.cloud.google.com/bigquery/docs/column-level-security-intro))
- SQL Server documentation describes dynamic data masking as limiting sensitive data exposure by masking it to nonprivileged users. ([source](https://learn.microsoft.com/en-us/sql/relational-databases/security/dynamic-data-masking?view=sql-server-ver17))

## Further Reading

- [Snowflake Column-Level Security](https://docs.snowflake.com/en/user-guide/security-column-intro)
- [BigQuery Column-Level Security](https://docs.cloud.google.com/bigquery/docs/column-level-security-intro)
- [SQL Server Dynamic Data Masking](https://learn.microsoft.com/en-us/sql/relational-databases/security/dynamic-data-masking?view=sql-server-ver17)
