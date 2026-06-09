---
id: retrieval-faiss-index-types-and-nprobe-tuning
title: 'Retrieval FAISS Index Types and nprobe Tuning'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-09'
created_date: '2026-06-09'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-retrieval-faiss-index-types-and-nprobe-tuning-1
    statement: >-
      The FAISS wiki lists IndexFlatL2 as an exact L2 search index that uses
      brute-force search.
    source_title: FAISS Indexes Wiki
    source_url: https://github.com/facebookresearch/faiss/wiki/Faiss-indexes
    confidence: medium
  - id: fact-ai-retrieval-faiss-index-types-and-nprobe-tuning-2
    statement: >-
      The FAISS wiki lists IndexHNSWFlat as a hierarchical navigable small-world
      graph index.
    source_title: FAISS Indexes Wiki
    source_url: https://github.com/facebookresearch/faiss/wiki/Faiss-indexes
    confidence: medium
  - id: fact-ai-retrieval-faiss-index-types-and-nprobe-tuning-3
    statement: >-
      The FAISS wiki lists IndexIVFPQ as an IVFADC index that combines a coarse
      quantizer with product quantization on residuals.
    source_title: FAISS Indexes Wiki
    source_url: https://github.com/facebookresearch/faiss/wiki/Faiss-indexes
    confidence: medium
  - id: fact-ai-retrieval-faiss-index-types-and-nprobe-tuning-4
    statement: >-
      FAISS getting-started documentation says all indexes need vector
      dimensionality when built, and most indexes also require a training phase.
    source_title: FAISS Getting Started
    source_url: https://github.com/facebookresearch/faiss/wiki/Getting-started
    confidence: medium
  - id: fact-ai-retrieval-faiss-index-types-and-nprobe-tuning-5
    statement: >-
      The FAISS wiki says nprobe is specified at query time for IVF indexes and
      is useful for measuring speed and accuracy tradeoffs.
    source_title: FAISS Indexes Wiki
    source_url: https://github.com/facebookresearch/faiss/wiki/Faiss-indexes
    confidence: medium
completeness: 0.82
known_gaps:
  - FAISS retrieval diagnosis depends on embedding dimension, distance metric, normalization, index factory string, training set representativeness, nlist, nprobe, HNSW parameters, quantization type, GPU or CPU backend, deleted vectors, ID mapping, and recall measured against an exact baseline.
disputed_statements: []
primary_sources:
  - title: FAISS Indexes Wiki
    type: documentation
    year: 2025
    url: https://github.com/facebookresearch/faiss/wiki/Faiss-indexes
    institution: Meta AI
  - title: FAISS Getting Started
    type: documentation
    year: 2025
    url: https://github.com/facebookresearch/faiss/wiki/Getting-started
    institution: Meta AI
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

FAISS index evidence tells retrieval agents whether a miss comes from exact search, approximate index choice, quantization, training, or query-time nprobe settings.

## Core Explanation

FAISS is often hidden behind a vector-store wrapper, but the index type still controls recall, memory, and latency. A flat index gives an exact baseline, while HNSW and IVF/PQ variants introduce approximate search and tuning parameters. Agents need the actual index configuration before changing prompts or embeddings.

Useful evidence includes vector dimensionality, metric, normalization, index type, training status, `nlist`, `nprobe`, HNSW settings, quantization settings, hardware backend, and exact-search comparison results. A faster index that drops answer-bearing neighbors is a retrieval regression even if the generated answer looks fluent.

## Source-Mapped Facts

- The FAISS wiki lists IndexFlatL2 as an exact L2 search index that uses brute-force search. ([source](https://github.com/facebookresearch/faiss/wiki/Faiss-indexes))
- The FAISS wiki lists IndexHNSWFlat as a hierarchical navigable small-world graph index. ([source](https://github.com/facebookresearch/faiss/wiki/Faiss-indexes))
- The FAISS wiki lists IndexIVFPQ as an IVFADC index that combines a coarse quantizer with product quantization on residuals. ([source](https://github.com/facebookresearch/faiss/wiki/Faiss-indexes))
- FAISS getting-started documentation says all indexes need vector dimensionality when built, and most indexes also require a training phase. ([source](https://github.com/facebookresearch/faiss/wiki/Getting-started))
- The FAISS wiki says nprobe is specified at query time for IVF indexes and is useful for measuring speed and accuracy tradeoffs. ([source](https://github.com/facebookresearch/faiss/wiki/Faiss-indexes))

## Further Reading

- [FAISS Indexes Wiki](https://github.com/facebookresearch/faiss/wiki/Faiss-indexes)
- [FAISS Getting Started](https://github.com/facebookresearch/faiss/wiki/Getting-started)
