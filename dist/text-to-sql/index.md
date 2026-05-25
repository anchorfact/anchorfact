---
id: text-to-sql
title: "Text-to-SQL: Natural Language Database Querying with Large Language Models"
schema_type: article
category: ai
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: ai_assisted
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.85
atomic_facts:
  - id: af-text-to-sql-1
    statement: >-
      Nature Scientific Reports (February 2026) proposed a robust Text-to-SQL generation framework combining LLM-based semantic parsing with schema linking and self-correction, achieving execution
      accuracy improvements on the Spider benchmark with complex multi-table queries, demonstrating the feasibility of NL2SQL for enterprise database access without requiring users to know SQL.
    source_title: Nature Scientific Reports (2026) -- Robust NL2SQL generation framework -- doi:10.1038/s41598-026-39128-9
    source_url: https://www.nature.com/articles/s41598-026-39128-9
    confidence: high
  - id: af-text-to-sql-2
    statement: >-
      The Spider benchmark (Yale, 2018) remains the standard evaluation for Text-to-SQL with 10,181 natural language questions, 5,693 complex SQL queries, and 200 databases spanning 138 domains. BIRD
      (2023, HKUST) introduced a more challenging benchmark with real-world database schemas and external knowledge requirements. GPT-4 achieved 86.6% execution accuracy on Spider in 2024, approaching
      human-level performance on well-structured domains.
    source_title: Spider (Yu et al., EMNLP 2018) / BIRD (Li et al., NeurIPS 2023) -- NL2SQL benchmarks / NL2SQL Handbook (HKUST)
    source_url: https://arxiv.org/abs/1809.08887
    confidence: high
primary_sources:
  - id: ps-text-to-sql-1
    title: A robust natural language text-to-SQL generation framework leveraging large language models
    type: academic_paper
    year: 2026
    institution: Nature Scientific Reports
    doi: 10.1038/s41598-026-39128-9
    url: https://www.nature.com/articles/s41598-026-39128-9
  - id: ps-text-to-sql-2
    title: "Spider: A Large-Scale Human-Labeled Dataset for Complex and Cross-Database Semantic Parsing"
    type: academic_paper
    year: 2018
    institution: EMNLP / Yale University
    url: https://arxiv.org/abs/1809.08887
known_gaps:
  - Robust handling of ambiguous natural language queries with multiple valid SQL interpretations
  - Cross-database generalization -- text-to-SQL on unseen schemas without fine-tuning
disputed_statements: []
secondary_sources:
  - title: "A Survey on Employing Large Language Models for Text-to-SQL: Techniques, Benchmarks, and Future Directions"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/3737873
  - title: "A Survey of Text-to-SQL in the Era of LLMs: Where Are We, and Where Are We Going?"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: arXiv (Spider, WikiSQL, BIRD, CoSQL)
    url: https://arxiv.org/abs/2408.05109
  - title: "Next-Generation Database Interfaces: A Comprehensive Survey of LLM-Based Text-to-SQL"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: IEEE Access
    url: https://doi.org/10.1109/ACCESS.2025.3567842
  - title: "Spider: A Large-Scale Human-Labeled Dataset for Complex and Cross-Database Semantic Parsing and Text-to-SQL (Yale)"
    type: conference_paper
    year: 2018
    authors:
      - Yu, Tao
      - Zhang, Rui
      - Yang, Kai
      - et al.
    institution: Yale University / EMNLP
    url: https://doi.org/10.18653/v1/D18-1425
updated: "2026-05-24"
---
## TL;DR
Text-to-SQL (NL2SQL) translates natural language questions into executable SQL queries, enabling anyone in an organization to query databases without knowing SQL. With LLMs, the technology has moved from lab benchmarks to production deployments, handling complex multi-table joins, nested subqueries, and domain-specific business logic from plain English questions.

## Core Explanation
The Text-to-SQL problem: given a natural language question ("What were the top 5 products by revenue in Q3 2024?") and a database schema (tables, columns, relationships), generate a syntactically correct SQL query that answers the question. Key challenges: (1) Schema linking -- map natural language terms to the correct table and column names ("revenue" might map to "sales_amount" in the "transactions" table); (2) Complex SQL constructs -- handling GROUP BY, HAVING, nested subqueries, JOINs across multiple tables; (3) Value disambiguation -- "Q3 2024" must be translated to the correct date range; (4) Domain-specific terminology -- business jargon must be mapped to technical schema elements.

## Detailed Analysis
LLM-based approaches (2023-present): (1) Few-shot prompting -- provide the schema and a few example (question, SQL) pairs in the prompt. Simple but limited by context window for large schemas; (2) Decomposition -- break complex questions into sub-questions, generate sub-SQL, and combine; (3) Self-correction -- generate SQL, execute it, check results for errors, and retry. The Nature 2026 framework demonstrates a robust pipeline: schema representation encoding (embedding database metadata), retrieval-augmented schema linking (retrieve relevant table/column descriptions), SQL generation with chain-of-thought reasoning, and execution-based self-correction (execute candidate SQL, check syntax and result cardinality, regenerate if wrong). Benchmarks: Spider (standard, ~10K questions), BIRD (challenging, external knowledge required), WikiSQL (simple single-table), and SParC (interactive, multi-turn). Current SOTA: GPT-4 + self-correction achieves ~86% on Spider, ~65% on BIRD. Production tools: Dataherald, Aito, and commercial offerings from Snowflake (Cortex Analyst), Databricks (Genie), and Google BigQuery (Data QnA) are bringing NL2SQL to enterprise data warehouses.
