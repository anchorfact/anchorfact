---
id: long-context-models
title: 'Long-Context Language Models: Memory, Retrieval, and Evaluation'
schema_type: article
category: ai
language: en
confidence: medium
last_verified: '2026-05-30'
created_date: '2026-05-24'
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.72
atomic_facts:
  - id: af-long-context-models-1
    statement: 'Transformer-XL extends Transformer language models by reusing hidden states from prior segments and adding relative positional encodings for longer-term dependency modeling.'
    source_title: 'Transformer-XL: Attentive Language Models Beyond a Fixed-Length Context'
    source_url: https://arxiv.org/abs/1901.02860
    confidence: medium
  - id: af-long-context-models-2
    statement: 'Longformer reduces attention cost for long documents by combining local sliding-window attention with optional global attention tokens.'
    source_title: 'Longformer: The Long-Document Transformer'
    source_url: https://arxiv.org/abs/2004.05150
    confidence: medium
  - id: af-long-context-models-3
    statement: 'RULER evaluates long-context language models with synthetic tasks intended to measure usable context length beyond simple needle-in-a-haystack retrieval.'
    source_title: "RULER: What's the Real Context Size of Your Long-Context Language Models?"
    source_url: https://arxiv.org/abs/2404.06654
    confidence: medium
primary_sources:
  - id: ps-long-context-models-1
    title: 'Transformer-XL: Attentive Language Models Beyond a Fixed-Length Context'
    type: conference_paper
    year: 2019
    institution: ACL
    url: https://arxiv.org/abs/1901.02860
  - id: ps-long-context-models-2
    title: 'Longformer: The Long-Document Transformer'
    type: conference_paper
    year: 2020
    institution: arXiv
    url: https://arxiv.org/abs/2004.05150
  - id: ps-long-context-models-3
    title: "RULER: What's the Real Context Size of Your Long-Context Language Models?"
    type: conference_paper
    year: 2024
    institution: COLM
    url: https://arxiv.org/abs/2404.06654
known_gaps:
  - A large advertised context window does not prove reliable use of every token in the window.
  - Long-context inference can be expensive because attention, memory, and KV-cache costs grow with sequence length.
disputed_statements: []
secondary_sources: []
updated: '2026-05-30'
---

## TL;DR

Long-context language models try to use more of the prompt, document, or conversation history at once. The important distinction is advertised context length versus usable context length: a model can accept many tokens while still missing details, over-weighting endpoints, or paying high inference cost.

## Core Explanation

The standard Transformer has strong sequence modeling behavior, but full attention becomes expensive as context length grows. Transformer-XL introduced recurrence across segments so a model could reuse past hidden states. Longformer changed the attention pattern, using local sliding windows and selected global tokens to make long-document processing cheaper.

Evaluation is its own problem. Needle-style retrieval tests can show that a model finds one inserted fact, but they do not cover all long-context behaviors. Benchmarks such as RULER test multiple synthetic tasks so researchers can compare practical context use rather than only nominal token limits.

## Related Articles

- [Large Language Models (LLMs)](../llms.md)
- [Retrieval-Augmented Generation (RAG)](../rag.md)
- [Attention Mechanism: Query-Key-Value and Contextual Representation](../attention-mechanism.md)
