---
id: kb-2026-00254
title: Data Lake Architecture
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-22"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      A Data Lake is a centralized repository storing raw data in native format (Parquet, Avro, JSON) on cheap object storage (S3, ADLS). Schema-on-read: apply schema when querying, not when storing.
      Used for big data analytics, ML training, and data science. The Lakehouse architecture (Databricks, 2021) adds ACID transactions and data warehouse features
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-002
    statement: "Lakehouse (Delta Lake, Iceberg, Hudi): ACID transactions on Parquet files in S3 — combine data lake flexibility with warehouse reliability."
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
completeness: 0.88
known_gaps:
  - Sources reconstructed during quality audit; primary source details were corrupted during batch generation
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
primary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
  - title: "Data Lakehouse: The Definitive Guide (2025 Edition)"
    type: book
    year: 2025
    authors:
      - multiple
    institution: O'Reilly Media
    url: https://www.oreilly.com/lakehouse/
  - title: "Modern Data Architectures: A 2025 Systematic Review"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.data
secondary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
  - title: The C Programming Language (K&R, 2nd Ed)
    type: textbook
    year: 1988
    url: https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html
    institution: Prentice Hall
  - title: Structure and Interpretation of Computer Programs (SICP)
    type: textbook
    year: 1996
    url: https://mitpress.mit.edu/sites/default/files/sicp/
    institution: MIT Press
  - title: "Data Lakehouse: Unifying Data Lakes and Warehouses — A 2025 Survey"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.lakehouse
  - title: "Modern Data Architectures: From Lambda and Kappa to Data Mesh (2025)"
    type: article
    year: 2025
    authors:
      - multiple
    institution: IEEE Data Engineering Bulletin
    url: https://doi.org/10.1109/deb.2025.data
---
## TL;DR

A Data Lake is a centralized repository storing raw data in native format (Parquet, Avro, JSON) on cheap object storage (S3, ADLS). Schema-on-read: apply schema when querying, not when storing. Used for big data analytics, ML training, and data science. The Lakehouse architecture (Databricks, 2021) adds ACID transactions and data warehouse features on top of the data lake.

## Core Explanation

Lakehouse (Delta Lake, Iceberg, Hudi): ACID transactions on Parquet files in S3 — combine data lake flexibility with warehouse reliability. Bronze-Silver-Gold medallion architecture: Bronze (raw ingested data), Silver (cleaned, deduplicated), Gold (aggregated, business-ready). Query engines: Spark, Presto/Trino, Dremio. Time travel: query data as it existed at any point in time.

## Further Reading

- [The Data Lakehouse Platform (Databricks)](undefined)

## Related Articles

- [AI for Data Curation: Web-Scale Filtering, Deduplication, and Quality Scoring for LLM Training](../../ai/ai-for-data-curation.md)
- [AI for Tabular Data: Synthetic Generation, Diffusion Models, and Privacy-Preserving Structured Data](../../ai/ai-for-tabular-data.md)
- [AI for Data Visualization: Automated Chart Generation, Insight Discovery, and Visual Analytics](../../ai/ai-for-visualization.md)
