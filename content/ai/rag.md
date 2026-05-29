---
id: kb-2026-00006
title: Retrieval-Augmented Generation (RAG)
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-05-30'
created_date: '2026-05-22'
generation_method: ai_structured
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-rag-1
    statement: Retrieval-Augmented Generation combines a parametric sequence-to-sequence model with a non-parametric memory accessed by a neural retriever.
    source_title: Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks
    source_url: https://arxiv.org/abs/2005.11401
    source_doi: 10.48550/arXiv.2005.11401
    confidence: medium
  - id: fact-ai-rag-2
    statement: Dense Passage Retrieval uses dense vector representations for questions and passages to retrieve evidence for open-domain question answering.
    source_title: Dense Passage Retrieval for Open-Domain Question Answering
    source_url: https://arxiv.org/abs/2004.04906
    source_doi: 10.48550/arXiv.2004.04906
    confidence: medium
  - id: fact-ai-rag-3
    statement: REALM jointly pretrains a neural retriever and language model so the model can retrieve and attend to external text during pretraining.
    source_title: 'REALM: Retrieval-Augmented Language Model Pre-Training'
    source_url: https://arxiv.org/abs/2002.08909
    source_doi: 10.48550/arXiv.2002.08909
    confidence: medium
completeness: 0.84
known_gaps:
  - This article covers the stable RAG architecture, not current vendor search products or live quality rankings.
  - Chunking, reranking, graph retrieval, access control, and evaluation require separate implementation-specific analysis.
disputed_statements: []
primary_sources:
  - title: Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks
    authors:
      - Lewis, Patrick
      - Perez, Ethan
      - Piktus, Aleksandra
      - Petroni, Fabio
      - Karpukhin, Vladimir
      - Goyal, Naman
      - Lewis, Mike
      - Yih, Wen-tau
      - Riedel, Sebastian
      - Kiela, Douwe
    type: academic_paper
    year: 2020
    url: https://arxiv.org/abs/2005.11401
    doi: 10.48550/arXiv.2005.11401
    institution: Facebook AI Research
  - title: Dense Passage Retrieval for Open-Domain Question Answering
    authors:
      - Karpukhin, Vladimir
      - Oguz, Barlas
      - Min, Sewon
      - Lewis, Patrick
      - Wu, Ledell
      - Edunov, Sergey
      - Chen, Danqi
      - Yih, Wen-tau
    type: academic_paper
    year: 2020
    url: https://arxiv.org/abs/2004.04906
    doi: 10.48550/arXiv.2004.04906
    institution: Facebook AI Research
  - title: 'REALM: Retrieval-Augmented Language Model Pre-Training'
    authors:
      - Guu, Kelvin
      - Lee, Kenton
      - Tung, Zora
      - Pasupat, Panupong
      - Chang, Ming-Wei
    type: academic_paper
    year: 2020
    url: https://arxiv.org/abs/2002.08909
    doi: 10.48550/arXiv.2002.08909
    institution: Google Research
---

## TL;DR

Retrieval-Augmented Generation, or RAG, is a language-model architecture pattern that retrieves external evidence and conditions generation on that evidence. It is useful when an answer should be grounded in a document collection rather than only in a model's stored parameters.

## Core Claims

The original RAG formulation combines a generator with a retriever over external text. The retriever selects documents or passages; the generator uses retrieved evidence while producing an answer.

Dense Passage Retrieval is a common retrieval foundation for this pattern. It represents questions and passages as dense vectors, enabling nearest-neighbor retrieval for open-domain question answering.

REALM is an adjacent retrieval-augmented pretraining approach: the model learns to retrieve text from a corpus and use that retrieved text during language-model pretraining.

## Citation Boundaries

Use this article for stable RAG concepts: retrieval, external memory, dense passage retrieval, and evidence-conditioned generation. Do not use it to claim a system is factual unless the specific retrieval corpus, ranking, and citation behavior have been evaluated.

## Further Reading

- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401)
- [Dense Passage Retrieval for Open-Domain Question Answering](https://arxiv.org/abs/2004.04906)
- [REALM: Retrieval-Augmented Language Model Pre-Training](https://arxiv.org/abs/2002.08909)
