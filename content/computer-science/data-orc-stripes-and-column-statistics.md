---
id: data-orc-stripes-and-column-statistics
title: 'Data ORC Stripes and Column Statistics'
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
  - id: fact-cs-data-orc-stripes-and-column-statistics-1
    statement: >-
      Apache ORC specification describes ORC file content as divided into
      stripes.
    source_title: ORC Specification v1
    source_url: https://orc.apache.org/specification/ORCv1/
    confidence: medium
  - id: fact-cs-data-orc-stripes-and-column-statistics-2
    statement: >-
      Apache ORC specification says each stripe contains index data, row data,
      and a stripe footer.
    source_title: ORC Specification v1
    source_url: https://orc.apache.org/specification/ORCv1/
    confidence: medium
  - id: fact-cs-data-orc-stripes-and-column-statistics-3
    statement: >-
      Apache ORC indexes documentation describes file-level, stripe-level, and
      row-level indexes as statistics about column values.
    source_title: Apache ORC Indexes
    source_url: https://orc.apache.org/docs/indexes.html
    confidence: medium
completeness: 0.82
known_gaps:
  - ORC scan performance depends on stripe sizing, row indexes, bloom filters, compression, predicate pushdown support, schema evolution, min/max statistics, and whether the query engine trusts the file metadata.
disputed_statements: []
primary_sources:
  - title: ORC Specification v1
    type: documentation
    year: 2026
    url: https://orc.apache.org/specification/ORCv1/
    institution: Apache ORC
  - title: Apache ORC Indexes
    type: documentation
    year: 2026
    url: https://orc.apache.org/docs/indexes.html
    institution: Apache ORC
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

ORC stripes and column statistics help data agents explain why analytical queries can skip or scan large parts of a file.

## Core Explanation

ORC is a columnar file format used in analytical data systems. Its metadata matters because query engines can use stripe layout, indexes, and column statistics to reduce the amount of data read for selective predicates.

Agents should capture file format version, stripe count, stripe sizes, row indexes, compression, schema, column statistics, and query engine predicate-pushdown behavior. A slow query can be caused by missing or unhelpful statistics, oversized stripes, incompatible readers, or predicates that cannot use the available metadata.

## Source-Mapped Facts

- Apache ORC specification describes ORC file content as divided into stripes. ([source](https://orc.apache.org/specification/ORCv1/))
- Apache ORC specification says each stripe contains index data, row data, and a stripe footer. ([source](https://orc.apache.org/specification/ORCv1/))
- Apache ORC indexes documentation describes file-level, stripe-level, and row-level indexes as statistics about column values. ([source](https://orc.apache.org/docs/indexes.html))

## Further Reading

- [ORC Specification v1](https://orc.apache.org/specification/ORCv1/)
- [Apache ORC Indexes](https://orc.apache.org/docs/indexes.html)
