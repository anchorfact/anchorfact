---
id: data-snowflake-query-profile-and-query-tags
title: 'Data Snowflake Query Profile and Query Tags'
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
  - id: fact-cs-data-snowflake-query-profile-and-query-tags-1
    statement: >-
      Snowflake documentation says Query History lets users monitor queries
      executed in a Snowflake account over the last 14 days.
    source_title: Snowflake Query History
    source_url: https://docs.snowflake.com/en/user-guide/ui-snowsight-activity
    confidence: medium
  - id: fact-cs-data-snowflake-query-profile-and-query-tags-2
    statement: >-
      Snowflake documentation says the Query Profile tab lets users explore a
      query execution plan and details about each execution step.
    source_title: Snowflake Query Profile
    source_url: https://docs.snowflake.com/en/user-guide/ui-snowsight-activity
    confidence: medium
  - id: fact-cs-data-snowflake-query-profile-and-query-tags-3
    statement: >-
      Snowflake parameter documentation includes QUERY_TAG as a configurable
      session parameter.
    source_title: Snowflake QUERY_TAG Parameter
    source_url: https://docs.snowflake.com/en/sql-reference/parameters#query-tag
    confidence: medium
completeness: 0.84
known_gaps:
  - Snowflake query evidence depends on role privileges, account usage latency, query history retention, warehouse, session, query text redaction, query tag discipline, client driver, and whether profile details are available for the failed query.
  - Query tags are only useful for agent diagnostics when applications set stable values that identify service, job, environment, release, and request or run context without leaking user data.
disputed_statements: []
primary_sources:
  - title: Snowflake Query History
    type: documentation
    year: 2026
    url: https://docs.snowflake.com/en/user-guide/ui-snowsight-activity
    institution: Snowflake
  - title: Snowflake QUERY_HISTORY Account Usage View
    type: documentation
    year: 2026
    url: https://docs.snowflake.com/en/sql-reference/account-usage/query_history
    institution: Snowflake
  - title: Snowflake QUERY_TAG Parameter
    type: documentation
    year: 2026
    url: https://docs.snowflake.com/en/sql-reference/parameters#query-tag
    institution: Snowflake
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

Snowflake Query History, Query Profile, and query tags give agents reproducible evidence for slow, failed, expensive, or misrouted warehouse work.

## Core Explanation

Agents should collect query ID, warehouse, role, user or service principal, start and end time, query tag, client name, error code, bytes scanned, rows produced, and profile availability before proposing warehouse changes. A slow dashboard, failed pipeline, or runaway cost event can come from queueing, pruning failure, spill, remote I/O, or an untagged workload.

Query Profile explains where execution time went for a specific query. Query tags connect queries back to an application, job, release, or agent run. Without tags, agents often overfit to raw query text or user names, which can be sensitive and insufficient for ownership.

## Source-Mapped Facts

- Snowflake documentation says Query History lets users monitor queries executed in a Snowflake account over the last 14 days. ([source](https://docs.snowflake.com/en/user-guide/ui-snowsight-activity))
- Snowflake documentation says the Query Profile tab lets users explore a query execution plan and details about each execution step. ([source](https://docs.snowflake.com/en/user-guide/ui-snowsight-activity))
- Snowflake parameter documentation includes QUERY_TAG as a configurable session parameter. ([source](https://docs.snowflake.com/en/sql-reference/parameters#query-tag))

## Further Reading

- [Snowflake Query History](https://docs.snowflake.com/en/user-guide/ui-snowsight-activity)
- [Snowflake QUERY_HISTORY Account Usage View](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
- [Snowflake QUERY_TAG Parameter](https://docs.snowflake.com/en/sql-reference/parameters#query-tag)
