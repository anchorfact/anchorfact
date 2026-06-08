---
id: data-delta-lake-merge-and-upserts
title: 'Data Delta Lake MERGE and Upserts'
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
  - id: fact-cs-data-delta-lake-merge-and-upserts-1
    statement: >-
      Delta Lake documentation says data can be upserted from a source table,
      view, or DataFrame into a target Delta table with the MERGE SQL operation.
    source_title: Delta Lake Update and Merge
    source_url: https://docs.delta.io/delta-update/
    confidence: medium
  - id: fact-cs-data-delta-lake-merge-and-upserts-2
    statement: >-
      Delta Lake documentation says Delta Lake supports inserts, updates, and
      deletes in MERGE.
    source_title: Delta Lake Update and Merge
    source_url: https://docs.delta.io/delta-update/
    confidence: medium
  - id: fact-cs-data-delta-lake-merge-and-upserts-3
    statement: >-
      Delta Lake documentation says whenMatched clauses execute when a source
      row matches a target table row based on the match condition.
    source_title: Delta Lake Update and Merge
    source_url: https://docs.delta.io/delta-update/
    confidence: medium
  - id: fact-cs-data-delta-lake-merge-and-upserts-4
    statement: >-
      Delta Lake documentation says a merge operation can fail if multiple rows
      from the source dataset match and the merge attempts to update the same
      target rows.
    source_title: Delta Lake Update and Merge
    source_url: https://docs.delta.io/delta-update/
    confidence: medium
  - id: fact-cs-data-delta-lake-merge-and-upserts-5
    statement: >-
      Databricks Delta merge documentation says only a single row from the
      source table can match a given row in the target table.
    source_title: Databricks Delta Merge
    source_url: https://docs.databricks.com/aws/en/delta/merge
    confidence: medium
completeness: 0.82
known_gaps:
  - Delta MERGE diagnosis depends on source deduplication, match condition uniqueness, whenMatched and whenNotMatched clause order, schema validation, automatic schema evolution, generated columns, partition predicates, transaction conflicts, streaming foreachBatch behavior, and table protocol version.
disputed_statements: []
primary_sources:
  - title: Delta Lake Update and Merge
    type: documentation
    year: 2026
    url: https://docs.delta.io/delta-update/
    institution: Delta Lake
  - title: Databricks Delta Merge
    type: documentation
    year: 2026
    url: https://docs.databricks.com/aws/en/delta/merge
    institution: Databricks
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

Delta Lake MERGE evidence tells agents whether an upsert pipeline updated, inserted, deleted, or failed because source rows ambiguously matched target rows.

## Core Explanation

MERGE is a data-infrastructure control point, not just a SQL convenience. It joins a source change set to a target table and applies conditional actions. If the source has duplicate keys, schema drift, or wrong clause ordering, the pipeline can produce stale rows, duplicate facts, or ambiguous updates.

Agents should inspect source deduplication, match keys, `WHEN MATCHED` clauses, `WHEN NOT MATCHED` clauses, schema validation, table history, operation metrics, partitions, and transaction conflicts before replaying data or changing incremental logic.

## Source-Mapped Facts

- Delta Lake documentation says data can be upserted from a source table, view, or DataFrame into a target Delta table with the MERGE SQL operation. ([source](https://docs.delta.io/delta-update/))
- Delta Lake documentation says Delta Lake supports inserts, updates, and deletes in MERGE. ([source](https://docs.delta.io/delta-update/))
- Delta Lake documentation says whenMatched clauses execute when a source row matches a target table row based on the match condition. ([source](https://docs.delta.io/delta-update/))
- Delta Lake documentation says a merge operation can fail if multiple rows from the source dataset match and the merge attempts to update the same target rows. ([source](https://docs.delta.io/delta-update/))
- Databricks Delta merge documentation says only a single row from the source table can match a given row in the target table. ([source](https://docs.databricks.com/aws/en/delta/merge))

## Further Reading

- [Delta Lake Update and Merge](https://docs.delta.io/delta-update/)
- [Databricks Delta Merge](https://docs.databricks.com/aws/en/delta/merge)
