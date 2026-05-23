---
id: "kb-2026-00249"


title: "Data Warehousing"
schema_type: "TechArticle"


category: "computer-science"
language: "en"


confidence: "high"
last_verified: "2026-05-22"


generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true


disputed_statements:
  - statement: "Historians disagree on whether the Cold War was primarily an ideological struggle, a geopolitical power contest, or both; interpretations vary across revisionist, post-revisionist, and orthodox schools"
    confidence: "medium"

known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

atomic_facts:
  - id: fact-computer-science-01
    statement: "Slowly Changing Dimensions : how to handle historical changes"

    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  
completeness: 0.88
ai_citations:

primary_sources:
  - title: "ACM Digital Library"
    type: "repository"


    year: 2026
    url: "https://dl.acm.org/"

    institution: "ACM"
secondary_sources:
  - title: "ACM Digital Library"
    type: "repository"


    year: 2026
    url: "https://dl.acm.org/"

    institution: "ACM"
---

## TL;DR

A data warehouse is a centralized repository optimized for analytical queries (OLAP) rather than transactional operations (OLTP). Kimball methodology: star schema (fact tables + dimension tables). ETL (Extract-Transform-Load) pipelines populate the warehouse from operational systems. Columnar storage (Parquet, ORC) optimizes for analytics.

## Core Explanation

Star schema: central fact table (sales transactions) surrounded by dimension tables (date, product, customer). Slowly Changing Dimensions (SCD): how to handle historical changes (Type 1: overwrite, Type 2: add new row). Modern stack: Snowflake, BigQuery, Redshift (cloud-native). Data Lake: store raw data first (S3), transform later (ELT) — Databricks + Delta Lake.

## Further Reading

- [The Data Warehouse Toolkit (3rd Ed, Kimball & Ross)](undefined)
