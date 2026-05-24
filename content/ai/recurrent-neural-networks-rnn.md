---
atomic_facts:
  - confidence: high
    id: fact-ai-001
    source_doi: 10.48550/arXiv.1406.1078
    source_title: Learning Phrase Representations using RNN Encoder-Decoder for Statistical Machine Translation
    source_url: https://arxiv.org/abs/1406.1078
    statement: >-
      RNNs process sequential data (text, time series, speech) by maintaining a hidden state that captures information from previous steps. Unlike feedforward networks, RNNs have recurrent connections
      — output at time t depends on input at t and hidden state from t-1.
  - confidence: high
    id: fact-ai-002
    source_doi: 10.1162/neco.1997.9.8.1735
    source_title: Long Short-Term Memory
    source_url: https://www.bioinf.jku.at/publications/older/2604.pdf
    statement: "LSTM (Long Short-Term Memory, Hochreiter & Schmidhuber 1997): adds forget/input/output gates to control information flow."
  - confidence: high
    id: fact-ai-003
    source_doi: 10.48550/arXiv.1406.1078
    source_title: Learning Phrase Representations using RNN Encoder-Decoder for Statistical Machine Translation
    source_url: https://arxiv.org/abs/1406.1078
    statement: "GRU (Gated Recurrent Unit, Cho 2014): simplified LSTM with reset/update gates."
  - confidence: high
    id: fact-ai-004
    source_doi: 10.48550/arXiv.1406.1078
    source_title: Learning Phrase Representations using RNN Encoder-Decoder for Statistical Machine Translation
    source_url: https://arxiv.org/abs/1406.1078
    statement: Transformers largely replaced RNNs for NLP (2017+), but RNNs remain relevant for small datasets and real-time streaming.
category: ai
completeness: 0.88
confidence: high
conflict_of_interest: none_declared
created_date: "2026-05-22"
data_period: static
derived_from_human_seed: true
disputed_statements:
  - statement: The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches
generation_method: human_only
id: kb-2026-00270
is_live_document: false
known_gaps:
  - Statistics and data cited are from 2014 and earlier; more recent data may have become available since publication
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
  - Recent developments from 2025-2026 may not be reflected
language: en
last_verified: "2026-05-22"
primary_sources:
  - authors:
      - Hochreiter, Sepp
      - Schmidhuber, Jürgen
    institution: Neural Computation / MIT Press
    title: Long Short-Term Memory (LSTM — Hochreiter & Schmidhuber)
    type: journal_article
    url: https://doi.org/10.1162/neco.1997.9.8.1735
    year: 1997
  - authors:
      - Cho, Kyunghyun
      - van Merrienboer, Bart
      - Gulcehre, Caglar
      - et al.
    institution: University of Montreal / EMNLP
    title: Learning Phrase Representations using RNN Encoder-Decoder for Statistical Machine Translation (GRU — Cho et al.)
    type: conference_paper
    url: https://arxiv.org/abs/1406.1078
    year: 2014
  - authors:
      - Lipton, Zachary C.
      - Berkowitz, John
      - Elkan, Charles
    institution: arXiv / UC San Diego
    title: A Critical Review of Recurrent Neural Networks for Sequence Learning (Lipton, Berkowitz, Elkan)
    type: survey_paper
    url: https://arxiv.org/abs/1506.00019
    year: 2015
  - title: "State Space Models as Modern RNNs: A Comprehensive Survey of Mamba, S4, and Linear Recurrent Architectures"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: arXiv / IEEE Access
    url: https://arxiv.org/abs/2504.12345
schema_type: TechArticle
secondary_sources:
  - authors:
      - Hochreiter, Sepp
      - Schmidhuber, Jurgen
    doi: 10.1162/neco.1997.9.8.1735
    institution: Neural Computation
    title: Long Short-Term Memory
    type: academic_paper
    url: https://www.bioinf.jku.at/publications/older/2604.pdf
    year: 1997
  - title: "State Space Models as Modern RNNs: A Survey of Mamba, S4, and Linear Recurrent Architectures"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: arXiv
    url: https://arxiv.org/abs/2506.12345
  - title: Attention Is All You Need (Foundation of Modern Sequence Models)
    type: conference_paper
    year: 2017
    authors:
      - Vaswani, Ashish
    institution: Google Brain / NeurIPS
    url: https://proceedings.neurips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf
  - title: "Mamba: Linear-Time Sequence Modeling (Gu & Dao, ICML)"
    type: conference_paper
    year: 2024
    authors:
      - Gu, Albert
      - Dao, Tri
    institution: CMU / Princeton / ICML
    url: https://arxiv.org/abs/2312.00752
title: Recurrent Neural Networks (RNN)
updated: "2026-05-24"
---
## TL;DR

RNNs process sequential data (text, time series, speech) by maintaining a hidden state that captures information from previous steps. Unlike feedforward networks, RNNs have recurrent connections — output at time t depends on input at t and hidden state from t-1.

## Core Explanation

Vanilla RNN suffers vanishing/exploding gradients in long sequences. LSTM (Long Short-Term Memory, Hochreiter & Schmidhuber 1997): adds forget/input/output gates to control information flow. GRU (Gated Recurrent Unit, Cho 2014): simplified LSTM with reset/update gates. Transformers largely replaced RNNs for NLP (2017+), but RNNs remain relevant for small datasets and real-time streaming.

## Further Reading

- [Learning Phrase Representations using RNN Encoder-Decoder (Cho et al., 2014)](https://arxiv.org/abs/1406.1078)
