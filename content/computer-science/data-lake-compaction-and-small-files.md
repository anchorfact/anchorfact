---
id: data-lake-compaction-and-small-files
title: 'Data Lake Compaction and Small Files'
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
  - id: fact-data-lake-compaction-and-small-files-1
    statement: >-
      Delta Lake documentation describes bin-packing optimization as compacting small files into
      larger files.
    source_title: Delta Lake Optimizations
    source_url: https://docs.delta.io/latest/optimizations-oss.html
    confidence: medium
  - id: fact-data-lake-compaction-and-small-files-2
    statement: >-
      Apache Iceberg documentation describes rewrite_data_files as a procedure for rewriting data
      files.
    source_title: Apache Iceberg Spark Procedures
    source_url: https://iceberg.apache.org/docs/1.7.1/spark-procedures/#rewrite_data_files
    confidence: medium
  - id: fact-data-lake-compaction-and-small-files-3
    statement: >-
      Apache Hudi documentation describes file sizing as a mechanism for managing small files.
    source_title: Apache Hudi File Sizing
    source_url: https://hudi.apache.org/docs/file_sizing
    confidence: medium
completeness: 0.82
known_gaps:
  - Compaction strategy depends on table format, partition layout, write pattern, query engine, and concurrent readers.
disputed_statements: []
primary_sources:
  - title: Delta Lake Optimizations
    type: documentation
    year: 2026
    url: https://docs.delta.io/latest/optimizations-oss.html
    institution: Delta Lake
  - title: Apache Iceberg Spark Procedures
    type: documentation
    year: 2026
    url: https://iceberg.apache.org/docs/1.7.1/spark-procedures/#rewrite_data_files
    institution: Apache Iceberg
  - title: Apache Hudi File Sizing
    type: documentation
    year: 2026
    url: https://hudi.apache.org/docs/file_sizing
    institution: Apache Hudi
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Data lake compaction reduces small-file overhead, but agents must respect table format semantics and concurrent workloads.

## Core Explanation

Streaming ingestion and frequent small writes can produce many small files. That increases metadata overhead and can make query planning and scans inefficient. Compaction rewrites smaller files into larger files so query engines and table metadata have less work to do.

Agents should not run compaction just because file counts are high. They need table format, partition layout, file size distribution, retention policy, and active writer status. A safe recommendation names the table, partition range, procedure, expected benefit, and rollback or restore path.

## Source-Mapped Facts

- Delta Lake documentation describes bin-packing optimization as compacting small files into larger files. ([source](https://docs.delta.io/latest/optimizations-oss.html))
- Apache Iceberg documentation describes rewrite_data_files as a procedure for rewriting data files. ([source](https://iceberg.apache.org/docs/1.7.1/spark-procedures/#rewrite_data_files))
- Apache Hudi documentation describes file sizing as a mechanism for managing small files. ([source](https://hudi.apache.org/docs/file_sizing))

## Further Reading

- [Delta Lake Optimizations](https://docs.delta.io/latest/optimizations-oss.html)
- [Apache Iceberg Spark Procedures](https://iceberg.apache.org/docs/1.7.1/spark-procedures/#rewrite_data_files)
- [Apache Hudi File Sizing](https://hudi.apache.org/docs/file_sizing)
