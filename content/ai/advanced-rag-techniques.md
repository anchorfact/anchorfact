---
id: advanced-rag-techniques
title: 'Advanced RAG: From Naive Retrieval to Agentic RAG'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-05-28'
created_date: '2026-05-24'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: f1
    statement: The original RAG paper combines parametric sequence-to-sequence generation with non-parametric memory retrieved from a dense vector index.
    source_title: Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks
    source_url: https://arxiv.org/abs/2005.11401
    confidence: medium
  - id: f2
    statement: Self-RAG trains a model to retrieve, generate, and critique its own outputs through reflection tokens.
    source_title: 'Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection'
    source_url: https://arxiv.org/abs/2310.11511
    confidence: medium
  - id: f3
    statement: REALM studies retrieval-augmented language-model pre-training with a latent knowledge retriever.
    source_title: 'REALM: Retrieval-Augmented Language Model Pre-Training'
    source_url: https://arxiv.org/abs/2002.08909
    confidence: medium
primary_sources:
  - title: Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks
    type: academic_paper
    year: 2020
    authors:
      - Lewis, Patrick
      - Perez, Ethan
      - Piktus, Aleksandra
      - Petroni, Fabio
      - Karpukhin, Vladimir
    institution: arXiv / NeurIPS
    url: https://arxiv.org/abs/2005.11401
  - title: 'Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection'
    type: academic_paper
    year: 2023
    authors:
      - Asai, Akari
      - Wu, Zeqiu
      - Wang, Yizhong
      - Sil, Avirup
      - Hajishirzi, Hannaneh
    institution: arXiv / ICLR
    url: https://arxiv.org/abs/2310.11511
  - title: 'REALM: Retrieval-Augmented Language Model Pre-Training'
    type: academic_paper
    year: 2020
    authors:
      - Guu, Kelvin
      - Lee, Kenton
      - Tung, Zora
      - Pasupat, Panupong
      - Chang, Ming-Wei
    institution: arXiv / ICML
    url: https://arxiv.org/abs/2002.08909
completeness: 0.84
known_gaps:
  - This article covers selected RAG papers and does not benchmark current commercial RAG stacks.
---

## TL;DR

Advanced RAG techniques extend basic retrieve-then-generate systems with learned retrieval, self-critique, and tighter retriever-generator coupling.

## Core Explanation

This entry now keeps three source-mapped claims: original RAG, Self-RAG, and REALM. The wording avoids unsupported claims about broad hallucination reduction or agentic workflows that are not directly established by the cited papers.

## Further Reading

- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401)
- [Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection](https://arxiv.org/abs/2310.11511)
- [REALM: Retrieval-Augmented Language Model Pre-Training](https://arxiv.org/abs/2002.08909)

## Related Articles

- [Retrieval-Augmented Generation](../retrieval-augmented-generation-rag.md)
- [Vector Databases](../vector-databases.md)
- [AI Agents](../ai-agents.md)
