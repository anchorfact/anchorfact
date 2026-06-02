---
id: agent-database-migration-history
title: 'Agent Database Migration History'
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
  - id: fact-ai-agent-database-migration-history-1
    statement: >-
      Flyway documentation says the Flyway schema history table tracks the state of applied migrations.
    source_title: Flyway Schema History Table
    source_url: https://documentation.red-gate.com/flyway/flyway-concepts/migrations/flyway-schema-history-table
    confidence: medium
  - id: fact-ai-agent-database-migration-history-2
    statement: >-
      Liquibase documentation describes database changes as changesets recorded in a database changelog.
    source_title: Liquibase Core Concepts
    source_url: https://www.liquibase.org/get-started/core-usage/liquibase-core-concepts-author-database-changes
    confidence: medium
  - id: fact-ai-agent-database-migration-history-3
    statement: >-
      Prisma documentation says migration histories include the migration files in the project and the migrations applied to the database.
    source_title: Prisma Migration Histories
    source_url: https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/migration-histories
    confidence: medium
completeness: 0.83
known_gaps:
  - Migration tools differ in lock behavior, checksum handling, rollback support, and how they represent drift.
disputed_statements: []
primary_sources:
  - title: Flyway Schema History Table
    type: documentation
    year: 2026
    url: https://documentation.red-gate.com/flyway/flyway-concepts/migrations/flyway-schema-history-table
    institution: Redgate
  - title: Liquibase Core Concepts
    type: documentation
    year: 2026
    url: https://www.liquibase.org/get-started/core-usage/liquibase-core-concepts-author-database-changes
    institution: Liquibase
  - title: Prisma Migration Histories
    type: documentation
    year: 2026
    url: https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/migration-histories
    institution: Prisma
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Database migration history tells an agent what schema changes were planned, which ones were applied, and whether the database state matches the repository.

## Core Explanation

Agents working on production bugs must treat the database as an independent source of truth. Migration history tables and changelog files can explain missing columns, drift, partially applied deployments, and failed rollouts.

The safe pattern is read-only inspection first. Schema changes, repairs, and backfills need explicit review because incorrect migration actions can corrupt production data.

## Source-Mapped Facts

- Flyway documentation says the Flyway schema history table tracks the state of applied migrations. ([source](https://documentation.red-gate.com/flyway/flyway-concepts/migrations/flyway-schema-history-table))
- Liquibase documentation describes database changes as changesets recorded in a database changelog. ([source](https://www.liquibase.org/get-started/core-usage/liquibase-core-concepts-author-database-changes))
- Prisma documentation says migration histories include the migration files in the project and the migrations applied to the database. ([source](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/migration-histories))

## Further Reading

- [Flyway Schema History Table](https://documentation.red-gate.com/flyway/flyway-concepts/migrations/flyway-schema-history-table)
- [Liquibase Core Concepts](https://www.liquibase.org/get-started/core-usage/liquibase-core-concepts-author-database-changes)
- [Prisma Migration Histories](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/migration-histories)
