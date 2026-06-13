---
id: kb-2026-00254
title: Data Lake Architecture
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-14'
created_date: '2026-05-22'
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-data-lake-001
    statement: >-
      AWS Lake Formation terminology defines a data lake as persistent data stored in
      Amazon S3 and managed through Lake Formation with a Data Catalog; it commonly
      stores structured and unstructured data as well as raw and transformed data.
    source_title: Lake Formation terminology
    source_url: https://docs.aws.amazon.com/lake-formation/latest/dg/how-it-works-terminology.html
    confidence: medium
  - id: fact-computer-science-data-lake-002
    statement: >-
      Microsoft describes Azure Data Lake Storage as big-data analytics capabilities
      built on Azure Blob Storage, implemented through Blob Storage with the hierarchical
      namespace setting enabled.
    source_title: Introduction to Azure Data Lake Storage
    source_url: https://learn.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-introduction
    confidence: medium
  - id: fact-computer-science-data-lake-003
    statement: >-
      Delta Lake documentation says Delta Lake provides ACID transactions, scalable
      metadata handling, and unified streaming and batch processing on top of existing
      data lakes such as S3, ADLS, GCS, and HDFS.
    source_title: Welcome to the Delta Lake documentation
    source_url: https://docs.delta.io/latest/index.html
    confidence: medium
  - id: fact-computer-science-data-lake-004
    statement: >-
      AWS Lake Formation documentation describes central governance, security, sharing,
      and fine-grained access control for data lake data on Amazon S3 and metadata in
      the AWS Glue Data Catalog.
    source_title: What is AWS Lake Formation?
    source_url: https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html
    confidence: medium
completeness: 0.8
known_gaps:
  - >-
    Coverage is limited to stable architectural layers and representative cloud/open-source
    documentation; it does not compare every data lake service, query engine, or table format.
disputed_statements: []
primary_sources:
  - title: Lake Formation terminology
    type: documentation
    year: 2026
    url: https://docs.aws.amazon.com/lake-formation/latest/dg/how-it-works-terminology.html
    institution: Amazon Web Services
  - title: Introduction to Azure Data Lake Storage
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-introduction
    institution: Microsoft
  - title: Welcome to the Delta Lake documentation
    type: documentation
    year: 2026
    url: https://docs.delta.io/latest/index.html
    institution: Delta Lake
  - title: What is AWS Lake Formation?
    type: documentation
    year: 2026
    url: https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html
    institution: Amazon Web Services
secondary_sources: []
updated: '2026-06-14'
---

## TL;DR

Data lake architecture keeps heterogeneous data in scalable storage, tracks it through a
catalog, and exposes it to analytics, machine learning, and governance services. Modern
implementations usually separate raw object storage, metadata/catalog services, access
controls, query engines, and an optional lakehouse table layer.

## Core Explanation

The repaired article narrows the concept to source-backed architecture layers. AWS Lake
Formation documentation anchors the storage and catalog model: data lake data lives in
Amazon S3, is managed with a Data Catalog, and can include structured, unstructured, raw,
and transformed data. Microsoft documentation anchors the storage-service layer in Azure,
where Data Lake Storage is built on Azure Blob Storage and enabled through hierarchical
namespaces for analytics workloads.

The lakehouse/table layer is separate from the base storage layer. Delta Lake documentation
describes a table layer that adds ACID transactions, scalable metadata handling, and unified
batch and streaming processing on top of existing data lakes such as S3, ADLS, GCS, and
HDFS. Governance is another separate layer: AWS Lake Formation documents centralized
governance, security, sharing, and fine-grained access controls over S3 data and Glue Data
Catalog metadata.

## Further Reading

- [Lake Formation terminology](https://docs.aws.amazon.com/lake-formation/latest/dg/how-it-works-terminology.html)
- [Introduction to Azure Data Lake Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-introduction)
- [Welcome to the Delta Lake documentation](https://docs.delta.io/latest/index.html)
- [What is AWS Lake Formation?](https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html)

## Related Articles

- [Data Lake Object Storage Layouts](data-lake-object-storage-layouts.md)
- [Data Catalogs and Metadata Lineage](data-catalogs-and-metadata-lineage.md)
- [Data Delta Lake Transaction Log and Checkpoints](data-delta-lake-transaction-log-and-checkpoints.md)
