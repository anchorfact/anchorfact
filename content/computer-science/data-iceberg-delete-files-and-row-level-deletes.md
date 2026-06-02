---
id: data-iceberg-delete-files-and-row-level-deletes
title: 'Data Iceberg Delete Files and Row-Level Deletes'
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
  - id: fact-cs-data-iceberg-delete-files-and-row-level-deletes-1
    statement: >-
      Apache Iceberg specification says format version 2 adds row-level updates
      and deletes for analytic tables with immutable files.
    source_title: Apache Iceberg Specification
    source_url: https://iceberg.apache.org/spec/#delete-formats
    confidence: medium
  - id: fact-cs-data-iceberg-delete-files-and-row-level-deletes-2
    statement: >-
      Apache Iceberg specification says row-level deletes are stored in delete
      files.
    source_title: Apache Iceberg Specification
    source_url: https://iceberg.apache.org/spec/#delete-formats
    confidence: medium
  - id: fact-cs-data-iceberg-delete-files-and-row-level-deletes-3
    statement: >-
      Apache Iceberg documentation says SQL DELETE FROM is supported for Spark
      writes and row-level delete requires Iceberg Spark extensions.
    source_title: Apache Iceberg Spark Writes
    source_url: https://iceberg.apache.org/docs/latest/spark-writes/#delete-from
    confidence: medium
completeness: 0.82
known_gaps:
  - Delete correctness depends on table format version, equality vs position deletes, delete manifest planning, compaction, snapshot isolation, reader support, merge-on-read costs, and whether maintenance rewrites delete files.
disputed_statements: []
primary_sources:
  - title: Apache Iceberg Specification
    type: documentation
    year: 2026
    url: https://iceberg.apache.org/spec/#delete-formats
    institution: Apache Iceberg
  - title: Apache Iceberg Spark Writes
    type: documentation
    year: 2026
    url: https://iceberg.apache.org/docs/latest/spark-writes/#delete-from
    institution: Apache Iceberg
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Iceberg delete files tell data agents whether deleted rows are removed from data files or represented as separate row-level delete metadata.

## Core Explanation

Lakehouse tables can apply deletes without immediately rewriting every affected data file. In Iceberg, row-level delete metadata becomes part of scan planning, maintenance, and snapshot interpretation.

Agents should inspect the table format version, snapshot ID, delete manifests, equality or position delete files, reader engine, compaction state, and query plan. A row that appears present in a data file can still be logically deleted by table metadata.

## Source-Mapped Facts

- Apache Iceberg specification says format version 2 adds row-level updates and deletes for analytic tables with immutable files. ([source](https://iceberg.apache.org/spec/#delete-formats))
- Apache Iceberg specification says row-level deletes are stored in delete files. ([source](https://iceberg.apache.org/spec/#delete-formats))
- Apache Iceberg documentation says SQL DELETE FROM is supported for Spark writes and row-level delete requires Iceberg Spark extensions. ([source](https://iceberg.apache.org/docs/latest/spark-writes/#delete-from))

## Further Reading

- [Apache Iceberg Specification](https://iceberg.apache.org/spec/#delete-formats)
- [Apache Iceberg Spark Writes](https://iceberg.apache.org/docs/latest/spark-writes/#delete-from)
