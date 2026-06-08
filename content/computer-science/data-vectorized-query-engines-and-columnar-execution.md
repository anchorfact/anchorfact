---
id: data-vectorized-query-engines-and-columnar-execution
title: 'Data Vectorized Query Engines and Columnar Execution'
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
  - id: fact-cs-data-vectorized-query-engines-and-columnar-execution-1
    statement: >-
      Apache Arrow documentation describes arrays as physical layouts made from metadata,
      buffers, length, null count, and optional dictionaries.
    source_title: Apache Arrow Columnar Format
    source_url: https://arrow.apache.org/docs/format/Columnar.html
    confidence: medium
  - id: fact-cs-data-vectorized-query-engines-and-columnar-execution-2
    statement: >-
      DuckDB documentation says DuckDB uses a vectorized query execution model and that
      operators are optimized to work on fixed-size vectors.
    source_title: DuckDB Execution Format
    source_url: https://duckdb.org/docs/lts/internals/vector.html
    confidence: medium
  - id: fact-cs-data-vectorized-query-engines-and-columnar-execution-3
    statement: >-
      ClickHouse documentation describes ClickHouse as column-oriented and says operations
      are dispatched on arrays when possible as vectorized query execution.
    source_title: ClickHouse Architecture Overview
    source_url: https://clickhouse.com/docs/development/architecture
    confidence: medium
completeness: 0.84
known_gaps:
  - Query performance depends on storage format, compression, CPU cache behavior, SIMD support, filters, joins, spill behavior, and runtime code generation.
  - This article does not benchmark Arrow, DuckDB, ClickHouse, or other engines.
disputed_statements: []
primary_sources:
  - title: Apache Arrow Columnar Format
    type: standard
    year: 2026
    url: https://arrow.apache.org/docs/format/Columnar.html
    institution: Apache Arrow
  - title: DuckDB Execution Format
    type: documentation
    year: 2026
    url: https://duckdb.org/docs/lts/internals/vector.html
    institution: DuckDB
  - title: ClickHouse Architecture Overview
    type: documentation
    year: 2026
    url: https://clickhouse.com/docs/development/architecture
    institution: ClickHouse
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

Vectorized query engines process batches of column values at a time, which gives agents better clues about CPU efficiency, scan cost, and why columnar layouts matter.

## Core Explanation

Row-by-row execution is easy to reason about but can waste CPU on per-value dispatch. Vectorized execution groups values into chunks or vectors so operators can run over arrays of typed data. Columnar layouts complement that model because a scan or filter can operate on contiguous values from the columns it needs.

For data infrastructure agents, this topic matters when interpreting query plans, file formats, and performance reports. A slow query may be caused by poor column pruning, wide materialization, decompression cost, low-selectivity filters, or a function that prevents efficient vectorized processing.

Useful evidence includes the projected columns, filter selectivity, vector or block size, null representation, memory alignment, compression, batch-level operator timings, and whether the query spills or falls back to scalar behavior.

## Source-Mapped Facts

- Apache Arrow documentation describes arrays as physical layouts made from metadata, buffers, length, null count, and optional dictionaries. ([source](https://arrow.apache.org/docs/format/Columnar.html))
- DuckDB documentation says DuckDB uses a vectorized query execution model and that operators are optimized to work on fixed-size vectors. ([source](https://duckdb.org/docs/lts/internals/vector.html))
- ClickHouse documentation describes ClickHouse as column-oriented and says operations are dispatched on arrays when possible as vectorized query execution. ([source](https://clickhouse.com/docs/development/architecture))

## Further Reading

- [Apache Arrow Columnar Format](https://arrow.apache.org/docs/format/Columnar.html)
- [DuckDB Execution Format](https://duckdb.org/docs/lts/internals/vector.html)
- [ClickHouse Architecture Overview](https://clickhouse.com/docs/development/architecture)
