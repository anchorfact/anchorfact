---
id: data-snowflake-access-history-and-object-lineage
title: 'Data Snowflake ACCESS_HISTORY and Object Lineage'
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
  - id: fact-cs-data-snowflake-access-history-and-object-lineage-1
    statement: >-
      Snowflake documentation says the ACCESS_HISTORY Account Usage view can be
      used to query access history for Snowflake objects.
    source_title: Snowflake ACCESS_HISTORY View
    source_url: https://docs.snowflake.com/en/sql-reference/account-usage/access_history
    confidence: medium
  - id: fact-cs-data-snowflake-access-history-and-object-lineage-2
    statement: >-
      Snowflake documentation says ACCESS_HISTORY records SQL statements that
      read data from source objects and columns.
    source_title: Snowflake ACCESS_HISTORY View
    source_url: https://docs.snowflake.com/en/sql-reference/account-usage/access_history
    confidence: medium
  - id: fact-cs-data-snowflake-access-history-and-object-lineage-3
    statement: >-
      Snowflake access history documentation says users can audit who accessed
      sensitive data and when access occurred.
    source_title: Snowflake Access History
    source_url: https://docs.snowflake.com/en/user-guide/access-history
    confidence: medium
completeness: 0.82
known_gaps:
  - Snowflake access history interpretation depends on edition, privileges, retention, object type, masking policy behavior, query text policy, and whether downstream lineage is captured outside Snowflake.
disputed_statements: []
primary_sources:
  - title: Snowflake ACCESS_HISTORY View
    type: documentation
    year: 2026
    url: https://docs.snowflake.com/en/sql-reference/account-usage/access_history
    institution: Snowflake
  - title: Snowflake Access History
    type: documentation
    year: 2026
    url: https://docs.snowflake.com/en/user-guide/access-history
    institution: Snowflake
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Snowflake ACCESS_HISTORY gives data agents source-object, column, and audit evidence for access review and lineage investigation.

## Core Explanation

Data agents often need to answer who touched a dataset, which columns were read, and which downstream objects were affected. ACCESS_HISTORY is a useful Snowflake evidence source because it connects query activity with object and column access rather than relying only on dashboard ownership or warehouse billing signals.

Agents should treat access history as sensitive audit data. A source-mapped answer should include the time window, object identifiers, user or role context, accessed columns, target objects, and any retention or privilege limits that may hide older or unavailable events.

## Source-Mapped Facts

- Snowflake documentation says the ACCESS_HISTORY Account Usage view can be used to query access history for Snowflake objects. ([source](https://docs.snowflake.com/en/sql-reference/account-usage/access_history))
- Snowflake documentation says ACCESS_HISTORY records SQL statements that read data from source objects and columns. ([source](https://docs.snowflake.com/en/sql-reference/account-usage/access_history))
- Snowflake access history documentation says users can audit who accessed sensitive data and when access occurred. ([source](https://docs.snowflake.com/en/user-guide/access-history))

## Further Reading

- [Snowflake ACCESS_HISTORY View](https://docs.snowflake.com/en/sql-reference/account-usage/access_history)
- [Snowflake Access History](https://docs.snowflake.com/en/user-guide/access-history)
