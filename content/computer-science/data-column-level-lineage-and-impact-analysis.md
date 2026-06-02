---
id: data-column-level-lineage-and-impact-analysis
title: 'Data Column-Level Lineage and Impact Analysis'
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
  - id: fact-computer-science-data-column-level-lineage-and-impact-analysis-1
    statement: >-
      OpenLineage documentation defines a column lineage dataset facet for describing column-level
      lineage.
    source_title: OpenLineage Column Lineage Facet
    source_url: https://openlineage.io/docs/spec/facets/dataset-facets/column_lineage_facet/
    confidence: medium
  - id: fact-computer-science-data-column-level-lineage-and-impact-analysis-2
    statement: >-
      OpenMetadata documentation describes column-level lineage as showing how columns are
      transformed across assets.
    source_title: OpenMetadata Column-Level Lineage
    source_url: https://docs.open-metadata.org/v1.11.x/how-to-guides/data-lineage/column
    confidence: medium
  - id: fact-computer-science-data-column-level-lineage-and-impact-analysis-3
    statement: >-
      Databricks Unity Catalog documentation describes data lineage across tables, columns,
      notebooks, workflows, and dashboards.
    source_title: Databricks Unity Catalog Lineage
    source_url: https://docs.databricks.com/aws/en/data-governance/unity-catalog/data-lineage
    confidence: medium
completeness: 0.83
known_gaps:
  - Column lineage quality depends on SQL parser coverage, UDF handling, notebooks, external tools, incremental jobs, permissions, and naming consistency.
disputed_statements: []
primary_sources:
  - title: OpenLineage Column Lineage Facet
    type: documentation
    year: 2026
    url: https://openlineage.io/docs/spec/facets/dataset-facets/column_lineage_facet/
    institution: OpenLineage
  - title: OpenMetadata Column-Level Lineage
    type: documentation
    year: 2026
    url: https://docs.open-metadata.org/v1.11.x/how-to-guides/data-lineage/column
    institution: OpenMetadata
  - title: Databricks Unity Catalog Lineage
    type: documentation
    year: 2026
    url: https://docs.databricks.com/aws/en/data-governance/unity-catalog/data-lineage
    institution: Databricks
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Column-level lineage lets agents trace how a field in a report, feature, or RAG index was derived from upstream data.

## Core Explanation

Table-level lineage can miss the exact blast radius of a schema or transformation change. Column-level lineage tracks how individual fields flow through queries, jobs, views, and downstream assets.

Agents should use column lineage for impact analysis before renaming, deleting, masking, or changing the semantics of a field. The answer should state whether lineage is parser-derived, platform-captured, manually curated, or incomplete.

## Source-Mapped Facts

- OpenLineage documentation defines a column lineage dataset facet for describing column-level lineage. ([source](https://openlineage.io/docs/spec/facets/dataset-facets/column_lineage_facet/))
- OpenMetadata documentation describes column-level lineage as showing how columns are transformed across assets. ([source](https://docs.open-metadata.org/v1.11.x/how-to-guides/data-lineage/column))
- Databricks Unity Catalog documentation describes data lineage across tables, columns, notebooks, workflows, and dashboards. ([source](https://docs.databricks.com/aws/en/data-governance/unity-catalog/data-lineage))

## Further Reading

- [OpenLineage Column Lineage Facet](https://openlineage.io/docs/spec/facets/dataset-facets/column_lineage_facet/)
- [OpenMetadata Column-Level Lineage](https://docs.open-metadata.org/v1.11.x/how-to-guides/data-lineage/column)
- [Databricks Unity Catalog Lineage](https://docs.databricks.com/aws/en/data-governance/unity-catalog/data-lineage)
