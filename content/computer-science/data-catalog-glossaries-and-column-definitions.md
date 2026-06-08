---
id: data-catalog-glossaries-and-column-definitions
title: 'Data Catalog Glossaries and Column Definitions'
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
  - id: fact-cs-data-catalog-glossaries-and-column-definitions-1
    statement: >-
      OpenMetadata documentation describes glossary terms as shared definitions
      used for data assets.
    source_title: OpenMetadata Glossary
    source_url: https://docs.open-metadata.org/latest/how-to-guides/data-governance/glossary
    confidence: medium
  - id: fact-cs-data-catalog-glossaries-and-column-definitions-2
    statement: >-
      DataHub documentation provides a business glossary ingestion source for
      ingesting glossary terms.
    source_title: DataHub Business Glossary Source
    source_url: https://docs.datahub.com/docs/generated/ingestion/sources/business-glossary
    confidence: medium
  - id: fact-cs-data-catalog-glossaries-and-column-definitions-3
    statement: >-
      dbt documentation says semantic models contain entities, dimensions, and
      measures.
    source_title: dbt Semantic Models
    source_url: https://docs.getdbt.com/docs/build/semantic-models
    confidence: medium
completeness: 0.84
known_gaps:
  - Business definitions depend on domain ownership, approval workflow, steward review, lineage, data quality, and whether terms are mapped down to fields or only to datasets.
  - Glossary and semantic-layer tools use different metadata models, so term coverage must be checked per platform before an agent relies on it.
disputed_statements: []
primary_sources:
  - title: OpenMetadata Glossary
    type: documentation
    year: 2026
    url: https://docs.open-metadata.org/latest/how-to-guides/data-governance/glossary
    institution: OpenMetadata
  - title: DataHub Business Glossary Source
    type: documentation
    year: 2026
    url: https://docs.datahub.com/docs/generated/ingestion/sources/business-glossary
    institution: DataHub
  - title: dbt Semantic Models
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/docs/build/semantic-models
    institution: dbt Labs
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

Glossaries and column definitions help agents distinguish business meaning from raw field names, especially in analytics and RAG over data catalogs.

## Core Explanation

Column names are often too terse for reliable agent reasoning. A field named `status`, `amount`, or `created_at` may mean different things across domains. A data catalog glossary gives the agent a controlled vocabulary for business terms, while field descriptions and semantic models connect those terms to concrete datasets.

Useful evidence includes term name, approved definition, synonyms, steward, mapped assets, mapped columns, semantic-model measures, lineage, and last review time. That metadata helps an agent answer "what does this metric mean" before it writes SQL, summarizes a dashboard, or generates a data-quality rule.

Agents should still treat glossary entries as governed context, not as proof that a dataset is correct. The definition may be stale, unmapped to the field being queried, or inconsistent with a downstream metric layer.

## Source-Mapped Facts

- OpenMetadata documentation describes glossary terms as shared definitions used for data assets. ([source](https://docs.open-metadata.org/latest/how-to-guides/data-governance/glossary))
- DataHub documentation provides a business glossary ingestion source for ingesting glossary terms. ([source](https://docs.datahub.com/docs/generated/ingestion/sources/business-glossary))
- dbt documentation says semantic models contain entities, dimensions, and measures. ([source](https://docs.getdbt.com/docs/build/semantic-models))

## Further Reading

- [OpenMetadata Glossary](https://docs.open-metadata.org/latest/how-to-guides/data-governance/glossary)
- [DataHub Business Glossary Source](https://docs.datahub.com/docs/generated/ingestion/sources/business-glossary)
- [dbt Semantic Models](https://docs.getdbt.com/docs/build/semantic-models)
