---
id: lakehouse-table-formats
title: 'Lakehouse Table Formats'
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
  - id: fact-cs-lakehouse-table-formats-1
    statement: >-
      Apache Iceberg documentation describes Iceberg as a table format specification for managing
      large, slow-changing collections of files in distributed file systems or key-value stores.
    source_title: Apache Iceberg Table Specification
    source_url: https://iceberg.apache.org/spec/
    confidence: medium
  - id: fact-cs-lakehouse-table-formats-2
    statement: >-
      Apache Iceberg documentation says table state is maintained in metadata files and each
      snapshot represents the state of a table at a point in time.
    source_title: Apache Iceberg Table Specification
    source_url: https://iceberg.apache.org/spec/
    confidence: medium
  - id: fact-cs-lakehouse-table-formats-3
    statement: >-
      Delta Lake protocol documentation says the Delta Transaction Protocol brings ACID properties
      to large collections of data stored as files in distributed file systems or object stores.
    source_title: Delta Transaction Log Protocol
    source_url: https://github.com/delta-io/delta/blob/master/PROTOCOL.md
    confidence: medium
  - id: fact-cs-lakehouse-table-formats-4
    statement: >-
      Apache Hudi documentation says Hudi's timeline is an event log that records table actions in
      ordered form.
    source_title: Apache Hudi Stack Documentation
    source_url: https://hudi.apache.org/docs/hudi_stack/
    confidence: medium
completeness: 0.84
known_gaps:
  - Engine compatibility, catalog integration, governance features, and migration paths vary by deployment.
  - This article does not benchmark Iceberg, Delta Lake, or Hudi performance.
disputed_statements: []
primary_sources:
  - title: Apache Iceberg Table Specification
    type: standard
    year: 2026
    url: https://iceberg.apache.org/spec/
    institution: Apache Iceberg
  - title: Delta Transaction Log Protocol
    type: software_repository
    year: 2026
    url: https://github.com/delta-io/delta/blob/master/PROTOCOL.md
    institution: Delta Lake
  - title: Apache Hudi Stack Documentation
    type: documentation
    year: 2026
    url: https://hudi.apache.org/docs/hudi_stack/
    institution: Apache Hudi
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Lakehouse table formats add transactional metadata, snapshots, and file-level planning semantics on top of data files in object stores or distributed file systems.

## Core Explanation

Object storage is good at storing files, but analytics systems need table semantics: what files belong to a table, which schema applies, what changed in a commit, and what snapshot a reader should see. Iceberg, Delta Lake, and Hudi solve this through table metadata, transaction logs, timelines, snapshots, manifests, or equivalent structures.

For agents and data infrastructure, these formats matter because they expose stable units for inspection: table metadata, schemas, partitions, snapshots, commits, lineage events, and rollback or time-travel boundaries.

## Source-Mapped Facts

- Apache Iceberg documentation describes Iceberg as a table format specification for managing large, slow-changing collections of files in distributed file systems or key-value stores. ([source](https://iceberg.apache.org/spec/))
- Apache Iceberg documentation says table state is maintained in metadata files and each snapshot represents the state of a table at a point in time. ([source](https://iceberg.apache.org/spec/))
- Delta Lake protocol documentation says the Delta Transaction Protocol brings ACID properties to large collections of data stored as files in distributed file systems or object stores. ([source](https://github.com/delta-io/delta/blob/master/PROTOCOL.md))
- Apache Hudi documentation says Hudi's timeline is an event log that records table actions in ordered form. ([source](https://hudi.apache.org/docs/hudi_stack/))

## Further Reading

- [Apache Iceberg Table Specification](https://iceberg.apache.org/spec/)
- [Delta Transaction Log Protocol](https://github.com/delta-io/delta/blob/master/PROTOCOL.md)
- [Apache Hudi Stack Documentation](https://hudi.apache.org/docs/hudi_stack/)
