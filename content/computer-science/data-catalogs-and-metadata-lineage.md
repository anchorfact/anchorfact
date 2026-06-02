---
id: data-catalogs-and-metadata-lineage
title: 'Data Catalogs and Metadata Lineage'
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
  - id: fact-cs-data-catalogs-and-metadata-lineage-1
    statement: >-
      OpenLineage documentation says its object model contains Jobs and Datasets and is designed
      to observe datasets as they move through complex pipelines.
    source_title: OpenLineage Object Model
    source_url: https://openlineage.io/docs/spec/object-model/
    confidence: medium
  - id: fact-cs-data-catalogs-and-metadata-lineage-2
    statement: >-
      OpenLineage documentation says a lineage graph can be created by weaving together
      observations of jobs across multiple platforms.
    source_title: OpenLineage Object Model
    source_url: https://openlineage.io/docs/spec/object-model/
    confidence: medium
  - id: fact-cs-data-catalogs-and-metadata-lineage-3
    statement: >-
      DataHub lineage documentation defines data lineage as a map showing how data flows through
      an organization, including where data originates, travels, and ends up.
    source_title: DataHub Lineage Documentation
    source_url: https://docs.datahub.com/docs/features/feature-guides/lineage
    confidence: medium
  - id: fact-cs-data-catalogs-and-metadata-lineage-4
    statement: >-
      The W3C PROV overview defines provenance as information about entities, activities, and
      people involved in producing a piece of data or thing.
    source_title: W3C PROV Overview
    source_url: https://www.w3.org/TR/prov-overview/
    confidence: medium
completeness: 0.84
known_gaps:
  - Catalog completeness depends on connector coverage, metadata freshness, ownership discipline, and lineage extraction accuracy.
  - This article does not compare commercial data catalog vendors.
disputed_statements: []
primary_sources:
  - title: OpenLineage Object Model
    type: standard
    year: 2026
    url: https://openlineage.io/docs/spec/object-model/
    institution: OpenLineage
  - title: DataHub Lineage Documentation
    type: documentation
    year: 2026
    url: https://docs.datahub.com/docs/features/feature-guides/lineage
    institution: DataHub
  - title: W3C PROV Overview
    type: standard
    year: 2013
    url: https://www.w3.org/TR/prov-overview/
    institution: W3C
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Data catalogs help people and agents discover data assets, while metadata lineage records how datasets are produced, transformed, and consumed.

## Core Explanation

A useful catalog combines business metadata, technical metadata, ownership, quality signals, and lineage. Lineage adds the graph structure: jobs consume input datasets, produce output datasets, and emit metadata about runs, schemas, ownership, and versions.

For AI and analytics systems, lineage matters because it answers impact questions before a change ships: which downstream tables, dashboards, models, or agents depend on this dataset?

## Source-Mapped Facts

- OpenLineage documentation says its object model contains Jobs and Datasets and is designed to observe datasets as they move through complex pipelines. ([source](https://openlineage.io/docs/spec/object-model/))
- OpenLineage documentation says a lineage graph can be created by weaving together observations of jobs across multiple platforms. ([source](https://openlineage.io/docs/spec/object-model/))
- DataHub lineage documentation defines data lineage as a map showing how data flows through an organization, including where data originates, travels, and ends up. ([source](https://docs.datahub.com/docs/features/feature-guides/lineage))
- The W3C PROV overview defines provenance as information about entities, activities, and people involved in producing a piece of data or thing. ([source](https://www.w3.org/TR/prov-overview/))

## Further Reading

- [OpenLineage Object Model](https://openlineage.io/docs/spec/object-model/)
- [DataHub Lineage Documentation](https://docs.datahub.com/docs/features/feature-guides/lineage)
- [W3C PROV Overview](https://www.w3.org/TR/prov-overview/)
