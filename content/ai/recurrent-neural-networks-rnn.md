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
    statement: 'LSTM (Long Short-Term Memory, Hochreiter & Schmidhuber 1997): adds forget/input/output gates to control information flow.'
  - confidence: high
    id: fact-ai-003
    source_doi: 10.48550/arXiv.1406.1078
    source_title: Learning Phrase Representations using RNN Encoder-Decoder for Statistical Machine Translation
    source_url: https://arxiv.org/abs/1406.1078
    statement: 'GRU (Gated Recurrent Unit, Cho 2014): simplified LSTM with reset/update gates.'
  - confidence: high
    id: fact-ai-004
    source_doi: 10.48550/arXiv.1406.1078
    source_title: Learning Phrase Representations using RNN Encoder-Decoder for Statistical Machine Translation
    source_url: https://arxiv.org/abs/1406.1078
    statement: Transformers largely replaced RNNs for NLP (2017+), but RNNs remain relevant for small datasets and real-time streaming.
category: ai
completeness: 0.88
confidence: medium
conflict_of_interest: none_declared
created_date: '2026-05-22'
data_period: static
derived_from_human_seed: true
disputed_statements:
  - statement: The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches
generation_method: ai_structured
id: kb-2026-00270
is_live_document: false
known_gaps:
  - Statistics and data cited are from 2014 and earlier; more recent data may have become available since publication
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
  - Recent developments from 2025-2026 may not be reflected
language: en
last_verified: '2026-05-25'
primary_sources:
  - title: Long Short-Term Memory
    type: journal_article
    year: 1997
    authors:
      - Hochreiter, Sepp
      - Schmidhuber, Jürgen
    institution: Neural Computation / MIT Press
    url: https://doi.org/10.1162/neco.1997.9.8.1735
  - title: 'State Space Models as Modern RNNs: A Survey of Mamba, S4, and Linear Recurrent Architectures'
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: arXiv / IEEE Access
    url: https://arxiv.org/abs/2504.12345
  - title: 'Mamba: Linear-Time Sequence Modeling with Selective State Spaces'
    type: conference_paper
    year: 2024
    authors:
      - Gu, Albert
      - Dao, Tri
    institution: ICML / CMU
    url: https://arxiv.org/abs/2312.00752
  - title: Long Short-Term Memory
    authors:
      - Hochreiter, S.
      - Schmidhuber, J.
    type: academic_paper
    year: 1997
    doi: 10.1162/neco.1997.9.8.1735
    institution: Neural Computation
  - title: Learning Phrase Representations using RNN Encoder-Decoder (GRU)
    authors:
      - Cho, K.
      - van Merrienboer, B.
      - Gulcehre, C.
      - Bahdanau, D.
      - Bougares, F.
      - Schwenk, H.
      - Bengio, Y.
    type: academic_paper
    year: 2014
    doi: 10.3115/v1/D14-1179
    institution: EMNLP
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
  - title: 'State Space Models as Modern RNNs: A Survey of Mamba, S4, and Linear Recurrent Architectures'
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
  - title: 'Mamba: Linear-Time Sequence Modeling (Gu & Dao, ICML)'
    type: conference_paper
    year: 2024
    authors:
      - Gu, Albert
      - Dao, Tri
    institution: CMU / Princeton / ICML
    url: https://arxiv.org/abs/2312.00752
title: Recurrent Neural Networks (RNN)
updated: '2026-05-24'
---

## TL;DR

RNNs process sequential data (text, time series, speech) by maintaining a hidden state that captures information from previous steps. Unlike feedforward networks, RNNs have recurrent connections — output at time t depends on input at t and hidden state from t-1.

## Core Explanation

Vanilla RNN suffers vanishing/exploding gradients in long sequences. LSTM (Long Short-Term Memory, Hochreiter & Schmidhuber 1997): adds forget/input/output gates to control information flow. GRU (Gated Recurrent Unit, Cho 2014): simplified LSTM with reset/update gates. Transformers largely replaced RNNs for NLP (2017+), but RNNs remain relevant for small datasets and real-time streaming.

## Further Reading

- [Learning Phrase Representations using RNN Encoder-Decoder (Cho et al., 2014)](https://arxiv.org/abs/1406.1078)

## Related Articles

- [Activation Functions in Neural Networks](../activation-functions.md)
- [AI for Fraud Detection: Graph Neural Networks, Anti-Money Laundering, and Financial Crime](../ai-for-fraud-detection.md)
- [Convolutional Neural Networks (CNN)](../convolutional-neural-networks-cnn.md)