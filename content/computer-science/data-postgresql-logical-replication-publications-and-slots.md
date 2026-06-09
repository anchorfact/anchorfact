---
id: data-postgresql-logical-replication-publications-and-slots
title: 'Data PostgreSQL Logical Replication Publications and Slots'
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
  - id: fact-computer-science-data-postgresql-logical-replication-publications-and-slots-1
    statement: >-
      PostgreSQL documentation says a publication is a set of changes generated
      from a table or group of tables.
    source_title: PostgreSQL Logical Replication Publication
    source_url: https://www.postgresql.org/docs/current/logical-replication-publication.html
    confidence: medium
  - id: fact-computer-science-data-postgresql-logical-replication-publications-and-slots-2
    statement: >-
      PostgreSQL documentation says publications can limit replicated changes to
      combinations of INSERT, UPDATE, DELETE, and TRUNCATE.
    source_title: PostgreSQL Logical Replication Publication
    source_url: https://www.postgresql.org/docs/current/logical-replication-publication.html
    confidence: medium
  - id: fact-computer-science-data-postgresql-logical-replication-publications-and-slots-3
    statement: >-
      PostgreSQL documentation says every publication can have multiple
      subscribers.
    source_title: PostgreSQL Logical Replication Publication
    source_url: https://www.postgresql.org/docs/current/logical-replication-publication.html
    confidence: medium
  - id: fact-computer-science-data-postgresql-logical-replication-publications-and-slots-4
    statement: >-
      PostgreSQL documentation says pg_replication_slots lists all replication
      slots that currently exist on the database cluster and their state.
    source_title: PostgreSQL pg_replication_slots
    source_url: https://www.postgresql.org/docs/current/view-pg-replication-slots.html
    confidence: medium
  - id: fact-computer-science-data-postgresql-logical-replication-publications-and-slots-5
    statement: >-
      PostgreSQL pg_replication_slots documentation says the confirmed_flush_lsn
      column records the LSN up to which a logical slot consumer has confirmed
      receiving data.
    source_title: PostgreSQL pg_replication_slots
    source_url: https://www.postgresql.org/docs/current/view-pg-replication-slots.html
    confidence: medium
completeness: 0.84
known_gaps:
  - PostgreSQL logical replication diagnosis depends on publication table membership, row filters, replica identity, wal_level, slot type, confirmed_flush_lsn, restart_lsn, wal retention, subscriber lag, initial copy state, schema changes, and whether downstream CDC connectors preserve transaction ordering.
disputed_statements: []
primary_sources:
  - title: PostgreSQL Logical Replication Publication
    type: documentation
    year: 2026
    url: https://www.postgresql.org/docs/current/logical-replication-publication.html
    institution: PostgreSQL
  - title: PostgreSQL pg_replication_slots
    type: documentation
    year: 2026
    url: https://www.postgresql.org/docs/current/view-pg-replication-slots.html
    institution: PostgreSQL
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

PostgreSQL publication and replication-slot evidence tells data agents whether a CDC pipeline is missing changes because the source table is unpublished, the slot is inactive, or WAL was lost.

## Core Explanation

Logical replication is not just a switch. A table must be in the right publication, the publication must include the relevant operation types, and the replication slot must retain and advance the right log sequence positions.

Agents should capture publication definitions, table membership, operation filters, replica identity, slot name, slot type, active state, restart LSN, confirmed flush LSN, WAL status, subscriber lag, and downstream connector offsets before repairing CDC freshness problems.

## Source-Mapped Facts

- PostgreSQL documentation says a publication is a set of changes generated from a table or group of tables. ([source](https://www.postgresql.org/docs/current/logical-replication-publication.html))
- PostgreSQL documentation says publications can limit replicated changes to combinations of INSERT, UPDATE, DELETE, and TRUNCATE. ([source](https://www.postgresql.org/docs/current/logical-replication-publication.html))
- PostgreSQL documentation says every publication can have multiple subscribers. ([source](https://www.postgresql.org/docs/current/logical-replication-publication.html))
- PostgreSQL documentation says `pg_replication_slots` lists all replication slots that currently exist on the database cluster and their state. ([source](https://www.postgresql.org/docs/current/view-pg-replication-slots.html))
- PostgreSQL pg_replication_slots documentation says the `confirmed_flush_lsn` column records the LSN up to which a logical slot consumer has confirmed receiving data. ([source](https://www.postgresql.org/docs/current/view-pg-replication-slots.html))

## Further Reading

- [PostgreSQL Logical Replication Publication](https://www.postgresql.org/docs/current/logical-replication-publication.html)
- [PostgreSQL pg_replication_slots](https://www.postgresql.org/docs/current/view-pg-replication-slots.html)
