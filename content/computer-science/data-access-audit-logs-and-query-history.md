---
id: data-access-audit-logs-and-query-history
title: 'Data Access Audit Logs and Query History'
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
  - id: fact-cs-data-access-audit-logs-and-query-history-1
    statement: >-
      BigQuery audit logs documentation says BigQueryAuditMetadata reports resource interactions
      such as which tables were read from and written to by a query job.
    source_title: BigQuery Audit Logs
    source_url: https://cloud.google.com/bigquery/docs/reference/auditlogs/
    confidence: medium
  - id: fact-cs-data-access-audit-logs-and-query-history-2
    statement: >-
      Cloud Audit Logs documentation describes Data Access audit logs as logs for API calls that
      read or write user-provided data.
    source_title: Cloud Audit Logs
    source_url: https://docs.cloud.google.com/logging/docs/audit
    confidence: medium
  - id: fact-cs-data-access-audit-logs-and-query-history-3
    statement: >-
      BigQuery INFORMATION_SCHEMA JOBS view contains near real-time metadata about BigQuery jobs.
    source_title: BigQuery INFORMATION_SCHEMA JOBS
    source_url: https://docs.cloud.google.com/bigquery/docs/information-schema-jobs
    confidence: medium
completeness: 0.83
known_gaps:
  - Audit interpretation depends on log retention, export sinks, redaction, project boundaries, service accounts, authorized views, row-level policies, and whether query text is available to the investigator.
disputed_statements: []
primary_sources:
  - title: BigQuery Audit Logs
    type: documentation
    year: 2026
    url: https://cloud.google.com/bigquery/docs/reference/auditlogs/
    institution: Google Cloud
  - title: Cloud Audit Logs
    type: documentation
    year: 2026
    url: https://docs.cloud.google.com/logging/docs/audit
    institution: Google Cloud
  - title: BigQuery INFORMATION_SCHEMA JOBS
    type: documentation
    year: 2026
    url: https://docs.cloud.google.com/bigquery/docs/information-schema-jobs
    institution: Google Cloud
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Data access audit logs and query history help agents answer who accessed data, which jobs ran, and which tables were read or written.

## Core Explanation

Agents debugging data incidents need evidence beyond table schemas. Audit logs can show principal, method, resource, job, and table interaction. Query history can show job metadata, timing, bytes processed, and errors.

Good investigations preserve project, dataset, table, job ID, principal, query text availability, timestamp, region, and log-retention assumptions before making access or compliance claims.

## Source-Mapped Facts

- BigQuery audit logs documentation says BigQueryAuditMetadata reports resource interactions such as which tables were read from and written to by a query job. ([source](https://cloud.google.com/bigquery/docs/reference/auditlogs/))
- Cloud Audit Logs documentation describes Data Access audit logs as logs for API calls that read or write user-provided data. ([source](https://docs.cloud.google.com/logging/docs/audit))
- BigQuery INFORMATION_SCHEMA JOBS view contains near real-time metadata about BigQuery jobs. ([source](https://docs.cloud.google.com/bigquery/docs/information-schema-jobs))

## Further Reading

- [BigQuery Audit Logs](https://cloud.google.com/bigquery/docs/reference/auditlogs/)
- [Cloud Audit Logs](https://docs.cloud.google.com/logging/docs/audit)
- [BigQuery INFORMATION_SCHEMA JOBS](https://docs.cloud.google.com/bigquery/docs/information-schema-jobs)
