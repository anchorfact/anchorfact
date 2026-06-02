---
id: llm-evaluation-mteb-embedding-retrieval-benchmarks
title: 'LLM Evaluation MTEB Embedding and Retrieval Benchmarks'
schema_type: TechArticle
category: ai
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
  - id: fact-ai-llm-evaluation-mteb-embedding-retrieval-benchmarks-1
    statement: >-
      The MTEB paper introduces Massive Text Embedding Benchmark as a benchmark
      for evaluating text embeddings across diverse tasks.
    source_title: MTEB Massive Text Embedding Benchmark
    source_url: https://arxiv.org/abs/2210.07316
    source_doi: 10.18653/v1/2023.eacl-main.148
    confidence: medium
  - id: fact-ai-llm-evaluation-mteb-embedding-retrieval-benchmarks-2
    statement: >-
      The MTEB paper evaluates embedding models across task categories including
      retrieval, clustering, classification, reranking, and semantic textual
      similarity.
    source_title: MTEB Massive Text Embedding Benchmark
    source_url: https://arxiv.org/abs/2210.07316
    source_doi: 10.18653/v1/2023.eacl-main.148
    confidence: medium
  - id: fact-ai-llm-evaluation-mteb-embedding-retrieval-benchmarks-3
    statement: >-
      The MTEB repository describes MTEB as a toolbox for evaluating embeddings
      and retrieval systems.
    source_title: MTEB Repository
    source_url: https://github.com/embeddings-benchmark/mteb
    confidence: medium
completeness: 0.82
known_gaps:
  - Embedding benchmark results depend on task selection, language mix, pooling method, query/document formatting, instruction prompts, retrieval corpus domain, evaluation split, and whether the application needs recall, reranking, or generation quality.
disputed_statements: []
primary_sources:
  - title: MTEB Massive Text Embedding Benchmark
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2210.07316
    doi: 10.18653/v1/2023.eacl-main.148
    institution: ACL Anthology
  - title: MTEB Repository
    type: repository_documentation
    year: 2026
    url: https://github.com/embeddings-benchmark/mteb
    institution: MTEB
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

MTEB helps agents compare embedding models across retrieval and non-retrieval tasks instead of relying on a single vector-search demo.

## Core Explanation

Embedding models are often chosen for RAG systems, semantic search, clustering, classification, and reranking. A model that performs well on one benchmark or language may not be the right model for another corpus.

Agents should keep the benchmark name, task subset, language, model version, pooling or instruction format, retrieval metric, and application corpus separate. For RAG decisions, MTEB-style results are evidence about representation quality, not proof that generated answers will be grounded or useful.

## Source-Mapped Facts

- The MTEB paper introduces Massive Text Embedding Benchmark as a benchmark for evaluating text embeddings across diverse tasks. ([source](https://arxiv.org/abs/2210.07316))
- The MTEB paper evaluates embedding models across task categories including retrieval, clustering, classification, reranking, and semantic textual similarity. ([source](https://arxiv.org/abs/2210.07316))
- The MTEB repository describes MTEB as a toolbox for evaluating embeddings and retrieval systems. ([source](https://github.com/embeddings-benchmark/mteb))

## Further Reading

- [MTEB: Massive Text Embedding Benchmark](https://arxiv.org/abs/2210.07316)
- [MTEB Repository](https://github.com/embeddings-benchmark/mteb)
