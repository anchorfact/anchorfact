---
id: data-snowflake-streams-and-tasks-change-processing
title: 'Data Snowflake Streams and Tasks Change Processing'
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
  - id: fact-cs-data-snowflake-streams-and-tasks-change-processing-1
    statement: >-
      Snowflake documentation says a stream object records DML changes made to
      tables, including inserts, updates, and deletes.
    source_title: Introduction to Streams
    source_url: https://docs.snowflake.com/en/user-guide/streams-intro
    confidence: medium
  - id: fact-cs-data-snowflake-streams-and-tasks-change-processing-2
    statement: >-
      Snowflake documentation says tasks can be scheduled and run, and a task
      can be started manually with EXECUTE TASK.
    source_title: Introduction to Tasks
    source_url: https://docs.snowflake.com/en/user-guide/tasks-intro
    confidence: medium
  - id: fact-cs-data-snowflake-streams-and-tasks-change-processing-3
    statement: >-
      Snowflake CREATE TASK documentation says SYSTEM$STREAM_HAS_DATA can be
      used in a task WHEN clause to evaluate whether a stream contains change
      data.
    source_title: CREATE TASK
    source_url: https://docs.snowflake.com/en/sql-reference/sql/create-task
    confidence: medium
completeness: 0.82
known_gaps:
  - Snowflake streams and tasks diagnosis depends on stream staleness, transaction offset, task state, owner role, warehouse or serverless compute, task graph dependencies, WHEN conditions, skipped runs, retries, privileges, masking policies, and whether change processing is idempotent.
disputed_statements: []
primary_sources:
  - title: Introduction to Streams
    type: documentation
    year: 2026
    url: https://docs.snowflake.com/en/user-guide/streams-intro
    institution: Snowflake
  - title: Introduction to Tasks
    type: documentation
    year: 2026
    url: https://docs.snowflake.com/en/user-guide/tasks-intro
    institution: Snowflake
  - title: CREATE TASK
    type: documentation
    year: 2026
    url: https://docs.snowflake.com/en/sql-reference/sql/create-task
    institution: Snowflake
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Snowflake streams and tasks are a native change-processing surface that data agents need to inspect before replaying, backfilling, or editing pipelines.

## Core Explanation

When downstream Snowflake tables are stale, duplicated, or missing rows, the relevant evidence is often stream offset plus task history. A stream shows what change data is available; a task or task graph determines when that change data is consumed.

Agents should capture source table, stream type, offset or staleness, task schedule, WHEN condition, task owner role, warehouse or serverless configuration, skipped runs, task history, and permissions before resuming tasks or manually consuming a stream.

## Source-Mapped Facts

- Snowflake documentation says a stream object records DML changes made to tables, including inserts, updates, and deletes. ([source](https://docs.snowflake.com/en/user-guide/streams-intro))
- Snowflake documentation says tasks can be scheduled and run, and a task can be started manually with EXECUTE TASK. ([source](https://docs.snowflake.com/en/user-guide/tasks-intro))
- Snowflake CREATE TASK documentation says SYSTEM$STREAM_HAS_DATA can be used in a task WHEN clause to evaluate whether a stream contains change data. ([source](https://docs.snowflake.com/en/sql-reference/sql/create-task))

## Further Reading

- [Introduction to Streams](https://docs.snowflake.com/en/user-guide/streams-intro)
- [Introduction to Tasks](https://docs.snowflake.com/en/user-guide/tasks-intro)
- [CREATE TASK](https://docs.snowflake.com/en/sql-reference/sql/create-task)
