---
id: agent-database-locks-and-deadlocks
title: 'Agent Database Locks and Deadlocks'
schema_type: TechArticle
category: ai
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
  - id: fact-ai-agent-database-locks-and-deadlocks-1
    statement: >-
      PostgreSQL documentation describes explicit locking modes that can be used to control
      concurrent access to data.
    source_title: PostgreSQL Explicit Locking
    source_url: https://www.postgresql.org/docs/current/explicit-locking.html
    confidence: medium
  - id: fact-ai-agent-database-locks-and-deadlocks-2
    statement: >-
      PostgreSQL documentation describes the pg_locks view as providing access to information about
      locks held by active processes.
    source_title: PostgreSQL Monitoring Locks
    source_url: https://www.postgresql.org/docs/current/monitoring-locks.html
    confidence: medium
  - id: fact-ai-agent-database-locks-and-deadlocks-3
    statement: >-
      Microsoft SQL Server documentation describes a deadlock as occurring when two or more tasks
      permanently block each other.
    source_title: SQL Server Deadlocks Guide
    source_url: https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-deadlocks-guide?view=sql-server-ver17
    confidence: medium
completeness: 0.83
known_gaps:
  - Lock diagnosis depends on isolation level, transaction duration, lock wait graphs, query plans, and application retry behavior.
disputed_statements: []
primary_sources:
  - title: PostgreSQL Explicit Locking
    type: documentation
    year: 2026
    url: https://www.postgresql.org/docs/current/explicit-locking.html
    institution: PostgreSQL
  - title: PostgreSQL Monitoring Locks
    type: documentation
    year: 2026
    url: https://www.postgresql.org/docs/current/monitoring-locks.html
    institution: PostgreSQL
  - title: SQL Server Deadlocks Guide
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-deadlocks-guide?view=sql-server-ver17
    institution: Microsoft
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Database lock and deadlock evidence tells agents whether a request is slow because of contention rather than CPU, indexes, or code.

## Core Explanation

Locks protect consistency, but long transactions and conflicting access patterns can block production traffic. Deadlocks are a sharper failure mode: two or more transactions wait on each other until the database aborts one participant.

Agents should not fix deadlocks by blindly raising timeouts. They should inspect the blocked query, blocking session, transaction age, lock mode, isolation level, and retry behavior before recommending query, index, or transaction changes.

## Source-Mapped Facts

- PostgreSQL documentation describes explicit locking modes that can be used to control concurrent access to data. ([source](https://www.postgresql.org/docs/current/explicit-locking.html))
- PostgreSQL documentation describes the pg_locks view as providing access to information about locks held by active processes. ([source](https://www.postgresql.org/docs/current/monitoring-locks.html))
- Microsoft SQL Server documentation describes a deadlock as occurring when two or more tasks permanently block each other. ([source](https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-deadlocks-guide?view=sql-server-ver17))

## Further Reading

- [PostgreSQL Explicit Locking](https://www.postgresql.org/docs/current/explicit-locking.html)
- [PostgreSQL Monitoring Locks](https://www.postgresql.org/docs/current/monitoring-locks.html)
- [SQL Server Deadlocks Guide](https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-deadlocks-guide?view=sql-server-ver17)
