---
id: data-iceberg-metadata-tables-and-manifests
title: 'Data Iceberg Metadata Tables and Manifests'
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
  - id: fact-computer-science-data-iceberg-metadata-tables-and-manifests-1
    statement: >-
      StarRocks documentation describes Iceberg metadata tables that expose history, snapshots,
      manifests, partitions, files, and references.
    source_title: StarRocks Iceberg Metadata Tables
    source_url: https://docs.starrocks.io/docs/data_source/catalog/iceberg/iceberg_meta_table/
    confidence: medium
  - id: fact-computer-science-data-iceberg-metadata-tables-and-manifests-2
    statement: >-
      Apache Iceberg Javadoc defines MetadataTableType values for metadata table views such as
      files, history, manifests, and snapshots.
    source_title: Apache Iceberg MetadataTableType
    source_url: https://iceberg.apache.org/javadoc/latest/org/apache/iceberg/MetadataTableType.html
    confidence: medium
  - id: fact-computer-science-data-iceberg-metadata-tables-and-manifests-3
    statement: >-
      Trino documentation describes Iceberg metadata tables such as history, snapshots, and
      manifests.
    source_title: Trino Iceberg Connector
    source_url: https://trino.io/docs/current/connector/iceberg.html
    confidence: medium
completeness: 0.84
known_gaps:
  - Iceberg metadata analysis depends on catalog type, snapshot expiration, manifest rewrite policy, engine support, partition spec evolution, and object-store consistency.
disputed_statements: []
primary_sources:
  - title: StarRocks Iceberg Metadata Tables
    type: documentation
    year: 2026
    url: https://docs.starrocks.io/docs/data_source/catalog/iceberg/iceberg_meta_table/
    institution: StarRocks
  - title: Apache Iceberg MetadataTableType
    type: documentation
    year: 2026
    url: https://iceberg.apache.org/javadoc/latest/org/apache/iceberg/MetadataTableType.html
    institution: Apache Iceberg
  - title: Trino Iceberg Connector
    type: documentation
    year: 2026
    url: https://trino.io/docs/current/connector/iceberg.html
    institution: Trino
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Iceberg metadata tables and manifests let agents inspect table history, files, snapshots, and partitions without scanning all data files.

## Core Explanation

Data agents need table-level evidence when diagnosing missing rows, expensive queries, stale snapshots, or partition mistakes. Apache Iceberg stores rich metadata about snapshots and files that query engines can expose as metadata tables.

The practical evidence includes snapshot ID, parent snapshot, manifest count, data file count, partition spec, delete files, snapshot age, and whether snapshot expiration or manifest rewrite jobs ran.

## Source-Mapped Facts

- StarRocks documentation describes Iceberg metadata tables that expose history, snapshots, manifests, partitions, files, and references. ([source](https://docs.starrocks.io/docs/data_source/catalog/iceberg/iceberg_meta_table/))
- Apache Iceberg Javadoc defines MetadataTableType values for metadata table views such as files, history, manifests, and snapshots. ([source](https://iceberg.apache.org/javadoc/latest/org/apache/iceberg/MetadataTableType.html))
- Trino documentation describes Iceberg metadata tables such as history, snapshots, and manifests. ([source](https://trino.io/docs/current/connector/iceberg.html))

## Further Reading

- [StarRocks Iceberg Metadata Tables](https://docs.starrocks.io/docs/data_source/catalog/iceberg/iceberg_meta_table/)
- [Apache Iceberg MetadataTableType](https://iceberg.apache.org/javadoc/latest/org/apache/iceberg/MetadataTableType.html)
- [Trino Iceberg Connector](https://trino.io/docs/current/connector/iceberg.html)
