---
id: agent-openlineage-column-lineage-and-schema-facets
title: 'Agent OpenLineage Column Lineage and Schema Facets'
schema_type: TechArticle
category: ai
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
  - id: fact-agent-openlineage-column-lineage-and-schema-facets-1
    statement: >-
      OpenLineage documentation says a lineage graph can be created by weaving together observations of jobs that have input or output datasets across platforms.
    source_title: OpenLineage Object Model
    source_url: https://openlineage.io/docs/spec/object-model/
    confidence: medium
  - id: fact-agent-openlineage-column-lineage-and-schema-facets-2
    statement: >-
      OpenLineage documentation says column-level lineage identifies which input columns are used to produce which output columns and in what way.
    source_title: OpenLineage Column Level Lineage Dataset Facet
    source_url: https://openlineage.io/docs/spec/facets/dataset-facets/column_lineage_facet/
    confidence: medium
  - id: fact-agent-openlineage-column-lineage-and-schema-facets-3
    statement: >-
      OpenLineage documentation says a column lineage inputField can include transformations that describe the nature of the relationship between input and output columns.
    source_title: OpenLineage Column Level Lineage Dataset Facet
    source_url: https://openlineage.io/docs/spec/facets/dataset-facets/column_lineage_facet/
    confidence: medium
  - id: fact-agent-openlineage-column-lineage-and-schema-facets-4
    statement: >-
      OpenLineage documentation says the schema dataset facet contains the schema of a dataset and provides field name plus optional type and description information.
    source_title: OpenLineage Schema Dataset Facet
    source_url: https://openlineage.io/docs/spec/facets/dataset-facets/schema/
    confidence: medium
completeness: 0.84
known_gaps:
  - Completeness depends on each producer emitting accurate lineage events and facet data.
disputed_statements: []
primary_sources:
  - title: OpenLineage Object Model
    type: specification
    year: 2026
    url: https://openlineage.io/docs/spec/object-model/
    institution: OpenLineage
  - title: OpenLineage Column Level Lineage Dataset Facet
    type: specification
    year: 2026
    url: https://openlineage.io/docs/spec/facets/dataset-facets/column_lineage_facet/
    institution: OpenLineage
  - title: OpenLineage Schema Dataset Facet
    type: specification
    year: 2026
    url: https://openlineage.io/docs/spec/facets/dataset-facets/schema/
    institution: OpenLineage
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

OpenLineage schema and column-lineage facets give agents structured evidence for tracing how datasets and fields depend on upstream jobs and fields.

## Core Explanation

Data agents often need to answer "where did this column come from?" before editing a pipeline or explaining a metric. Dataset-level lineage helps identify upstream jobs and datasets, while column-level facets narrow the dependency down to specific fields and transformation relationships.

For investigation, agents should combine schema facets, column lineage facets, run metadata, and producer identity. Lineage data is only as trustworthy as the instrumentation that emitted it.

## Source-Mapped Facts

- OpenLineage documentation says a lineage graph can be created by weaving together observations of jobs that have input or output datasets across platforms. ([source](https://openlineage.io/docs/spec/object-model/))
- OpenLineage documentation says column-level lineage identifies which input columns are used to produce which output columns and in what way. ([source](https://openlineage.io/docs/spec/facets/dataset-facets/column_lineage_facet/))
- OpenLineage documentation says a column lineage inputField can include transformations that describe the nature of the relationship between input and output columns. ([source](https://openlineage.io/docs/spec/facets/dataset-facets/column_lineage_facet/))
- OpenLineage documentation says the schema dataset facet contains the schema of a dataset and provides field name plus optional type and description information. ([source](https://openlineage.io/docs/spec/facets/dataset-facets/schema/))

## Further Reading

- [OpenLineage Object Model](https://openlineage.io/docs/spec/object-model/)
- [OpenLineage Column Level Lineage Dataset Facet](https://openlineage.io/docs/spec/facets/dataset-facets/column_lineage_facet/)
- [OpenLineage Schema Dataset Facet](https://openlineage.io/docs/spec/facets/dataset-facets/schema/)
