---
id: data-redshift-system-tables-and-query-monitoring
title: 'Data Redshift System Tables and Query Monitoring'
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
  - id: fact-cs-data-redshift-system-tables-and-query-monitoring-1
    statement: >-
      Amazon Redshift documentation says Redshift has system tables and views
      that contain information about how the system is functioning.
    source_title: Amazon Redshift System Tables and Views Reference
    source_url: https://docs.aws.amazon.com/redshift/latest/dg/cm_chap_system-tables.html
    confidence: medium
  - id: fact-cs-data-redshift-system-tables-and-query-monitoring-2
    statement: >-
      Amazon Redshift documentation says users can query system tables and
      views the same way they query other database tables.
    source_title: Amazon Redshift System Tables and Views Reference
    source_url: https://docs.aws.amazon.com/redshift/latest/dg/cm_chap_system-tables.html
    confidence: medium
  - id: fact-cs-data-redshift-system-tables-and-query-monitoring-3
    statement: >-
      Amazon Redshift documentation says STL system views retain seven days of
      log history.
    source_title: Amazon Redshift System Tables and Views Reference
    source_url: https://docs.aws.amazon.com/redshift/latest/dg/cm_chap_system-tables.html
    confidence: medium
completeness: 0.82
known_gaps:
  - Redshift query monitoring depends on provisioned versus serverless deployment, SYS versus STL/SVL/SVV view availability, superuser visibility, SYSLOG ACCESS settings, query identifier mapping, log retention, workload management queues, concurrency scaling, result cache, and whether monitoring queries themselves add workload noise.
disputed_statements: []
primary_sources:
  - title: Amazon Redshift System Tables and Views Reference
    type: documentation
    year: 2026
    url: https://docs.aws.amazon.com/redshift/latest/dg/cm_chap_system-tables.html
    institution: Amazon Web Services
  - title: Query the System Tables and Views
    type: documentation
    year: 2026
    url: https://docs.aws.amazon.com/redshift/latest/gsg/t_querying_redshift_system_tables.html
    institution: Amazon Web Services
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Redshift system tables and monitoring views are the operational evidence surface for query history, workload behavior, and database metadata.

## Core Explanation

When a Redshift workload is slow, blocked, or unexpectedly expensive, agents should inspect system tables and monitoring views before changing SQL. The relevant evidence can include query IDs, session IDs, queue time, execution time, locks, table metadata, WLM behavior, and visibility permissions.

Agents must also account for retention and privilege boundaries. A missing row can mean the view has aged out, the user lacks visibility, or the deployment uses a newer SYS monitoring view rather than a legacy provisioned-only table.

## Source-Mapped Facts

- Amazon Redshift documentation says Redshift has system tables and views that contain information about how the system is functioning. ([source](https://docs.aws.amazon.com/redshift/latest/dg/cm_chap_system-tables.html))
- Amazon Redshift documentation says users can query system tables and views the same way they query other database tables. ([source](https://docs.aws.amazon.com/redshift/latest/dg/cm_chap_system-tables.html))
- Amazon Redshift documentation says STL system views retain seven days of log history. ([source](https://docs.aws.amazon.com/redshift/latest/dg/cm_chap_system-tables.html))

## Further Reading

- [Amazon Redshift System Tables and Views Reference](https://docs.aws.amazon.com/redshift/latest/dg/cm_chap_system-tables.html)
- [Query the System Tables and Views](https://docs.aws.amazon.com/redshift/latest/gsg/t_querying_redshift_system_tables.html)
