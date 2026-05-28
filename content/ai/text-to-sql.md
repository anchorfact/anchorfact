---
id: text-to-sql
title: 'Text-to-SQL: Natural Language Database Querying with Large Language Models'
schema_type: article
category: ai
language: en
confidence: medium
last_verified: '2026-05-28'
created_date: '2026-05-24'
generation_method: ai_structured
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.85
atomic_facts:
  - id: af-text-to-sql-1
    statement: Seq2SQL studied generating SQL queries from natural language and used reinforcement learning to optimize unordered query components.
    source_title: 'Seq2SQL: Generating Structured Queries from Natural Language using Reinforcement Learning'
    source_url: https://arxiv.org/abs/1709.00103
    confidence: medium
  - id: af-text-to-sql-2
    statement: Spider is a cross-domain semantic parsing and text-to-SQL dataset designed to test generalization to unseen database schemas.
    source_title: 'Spider: A Large-Scale Human-Labeled Dataset for Complex and Cross-Domain Semantic Parsing and Text-to-SQL Task'
    source_url: https://arxiv.org/abs/1809.08887
    confidence: medium
  - id: af-text-to-sql-3
    statement: PICARD constrains auto-regressive decoding by incrementally parsing generated SQL and rejecting invalid continuations.
    source_title: 'PICARD: Parsing Incrementally for Constrained Auto-Regressive Decoding from Language Models'
    source_url: https://arxiv.org/abs/2109.05093
    confidence: medium
primary_sources:
  - id: ps-text-to-sql-1
    title: 'Seq2SQL: Generating Structured Queries from Natural Language using Reinforcement Learning'
    type: academic_paper
    year: 2017
    institution: arXiv
    url: https://arxiv.org/abs/1709.00103
  - id: ps-text-to-sql-2
    title: 'Spider: A Large-Scale Human-Labeled Dataset for Complex and Cross-Domain Semantic Parsing and Text-to-SQL Task'
    type: academic_paper
    year: 2018
    institution: arXiv
    url: https://arxiv.org/abs/1809.08887
  - id: ps-text-to-sql-3
    title: 'PICARD: Parsing Incrementally for Constrained Auto-Regressive Decoding from Language Models'
    type: academic_paper
    year: 2021
    institution: arXiv
    url: https://arxiv.org/abs/2109.05093
known_gaps:
  - Execution safety and permissioning when generated SQL runs against production databases
  - Robust handling of ambiguous business terminology and unseen schemas
disputed_statements: []
secondary_sources: []
updated: '2026-05-28'
---
## TL;DR
Text-to-SQL converts natural-language questions into database queries. Strong public claims should stay tied to datasets, semantic parsing methods, and decoding constraints.

## Core Explanation
A text-to-SQL system must understand a user's question, map it to a database schema, and produce executable SQL. The challenge is harder when schemas are unseen, table relationships are complex, or the user's wording is ambiguous.

## Detailed Analysis
The repaired evidence focuses on three stable anchors: early neural SQL generation, the Spider cross-domain benchmark, and constrained decoding through PICARD. It avoids unsupported claims about production accuracy or autonomous database access.

## Related Articles

- [Large Language Models (LLMs)](../llms.md)
- [LoRA: Low-Rank Adaptation of Large Language Models](../lora-low-rank-adaptation-of-large-language-models.md)
- [AI Red Teaming: Security Testing for Language Models](../ai-red-teaming-and-safety.md)
