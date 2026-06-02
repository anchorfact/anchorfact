---
id: retrieval-relevance-judgments-and-qrels
title: 'Retrieval Relevance Judgments and Qrels'
schema_type: TechArticle
category: ai
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
  - id: fact-ai-retrieval-relevance-judgments-and-qrels-1
    statement: >-
      NIST describes TREC as providing the infrastructure for large-scale evaluation of text
      retrieval methodologies.
    source_title: NIST TREC Overview
    source_url: https://trec.nist.gov/overview.html
    confidence: medium
  - id: fact-ai-retrieval-relevance-judgments-and-qrels-2
    statement: >-
      The trec_eval package is distributed by NIST for evaluating ad hoc retrieval results
      using TREC-style relevance judgments.
    source_title: NIST trec_eval
    source_url: https://trec.nist.gov/trec_eval/
    confidence: medium
  - id: fact-ai-retrieval-relevance-judgments-and-qrels-3
    statement: >-
      The BEIR paper presents a heterogeneous benchmark for zero-shot evaluation of information
      retrieval models.
    source_title: BEIR Benchmark Paper
    source_url: https://arxiv.org/abs/2104.08663
    confidence: medium
completeness: 0.83
known_gaps:
  - Relevance judgments can be incomplete, query-dependent, assessor-dependent, and mismatched to downstream answer quality in RAG systems.
disputed_statements: []
primary_sources:
  - title: NIST TREC Overview
    type: documentation
    year: 2026
    url: https://trec.nist.gov/overview.html
    institution: National Institute of Standards and Technology
  - title: NIST trec_eval
    type: software
    year: 2026
    url: https://trec.nist.gov/trec_eval/
    institution: National Institute of Standards and Technology
  - title: BEIR Benchmark Paper
    type: academic_paper
    year: 2021
    url: https://arxiv.org/abs/2104.08663
    institution: arXiv
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Qrels are query-document relevance labels; they let RAG and search teams measure retriever quality before judging generated answers.

## Core Explanation

Retrieval evaluation starts with a question: for this query, which documents should count as relevant? A qrels file records that judgment so systems can be compared with metrics such as recall, nDCG, MRR, precision, and average precision.

For agents, qrels are useful because they separate retrieval failure from generation failure. If the relevant evidence was not retrieved, answer quality cannot be fixed only by changing the prompt. If evidence was retrieved but not used, the problem moves to context packing, attribution, or answer synthesis.

## Source-Mapped Facts

- NIST describes TREC as providing the infrastructure for large-scale evaluation of text retrieval methodologies. ([source](https://trec.nist.gov/overview.html))
- The trec_eval package is distributed by NIST for evaluating ad hoc retrieval results using TREC-style relevance judgments. ([source](https://trec.nist.gov/trec_eval/))
- The BEIR paper presents a heterogeneous benchmark for zero-shot evaluation of information retrieval models. ([source](https://arxiv.org/abs/2104.08663))

## Further Reading

- [NIST TREC Overview](https://trec.nist.gov/overview.html)
- [NIST trec_eval](https://trec.nist.gov/trec_eval/)
- [BEIR Benchmark Paper](https://arxiv.org/abs/2104.08663)
