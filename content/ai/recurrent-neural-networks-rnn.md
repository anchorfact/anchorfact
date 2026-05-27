---
id: kb-2026-00270
title: Recurrent Neural Networks (RNN)
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-05-25'
created_date: '2026-05-22'
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-001
    statement: Recurrent neural networks process sequences by maintaining a hidden state that is updated over time.
    source_title: Learning Phrase Representations using RNN Encoder-Decoder for Statistical Machine Translation
    source_url: https://arxiv.org/abs/1406.1078
    source_doi: 10.48550/arXiv.1406.1078
    confidence: medium
  - id: fact-ai-002
    statement: Long Short-Term Memory introduced gating mechanisms designed to help recurrent networks learn long-range dependencies.
    source_title: Long Short-Term Memory
    source_url: https://doi.org/10.1162/neco.1997.9.8.1735
    source_doi: 10.1162/neco.1997.9.8.1735
    confidence: medium
  - id: fact-ai-003
    statement: The GRU encoder-decoder paper introduced gated recurrent units with update and reset gates for neural machine translation.
    source_title: Learning Phrase Representations using RNN Encoder-Decoder for Statistical Machine Translation
    source_url: https://arxiv.org/abs/1406.1078
    source_doi: 10.48550/arXiv.1406.1078
    confidence: medium
  - id: fact-ai-004
    statement: The Transformer paper replaced recurrence with attention for sequence transduction, helping shift many NLP systems away from RNN-centered architectures.
    source_title: Attention Is All You Need
    source_url: https://arxiv.org/abs/1706.03762
    confidence: medium
completeness: 0.88
known_gaps:
  - Statistics and data cited are from 2017 and earlier; newer sequence architectures are not exhaustively covered
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
primary_sources:
  - title: Long Short-Term Memory
    type: journal_article
    year: 1997
    authors:
      - Hochreiter, Sepp
      - Schmidhuber, Jurgen
    institution: Neural Computation
    url: https://doi.org/10.1162/neco.1997.9.8.1735
  - title: Learning Phrase Representations using RNN Encoder-Decoder for Statistical Machine Translation
    type: conference_paper
    year: 2014
    authors:
      - Cho, Kyunghyun
      - van Merrienboer, Bart
      - Gulcehre, Caglar
      - Bahdanau, Dzmitry
      - Bougares, Fethi
      - Schwenk, Holger
      - Bengio, Yoshua
    institution: EMNLP
    url: https://arxiv.org/abs/1406.1078
  - title: Attention Is All You Need
    type: conference_paper
    year: 2017
    authors:
      - Vaswani, Ashish
      - Shazeer, Noam
      - Parmar, Niki
    institution: NeurIPS
    url: https://arxiv.org/abs/1706.03762
secondary_sources: []
updated: '2026-05-24'
---

## TL;DR

Recurrent neural networks process sequences by updating a hidden state over time. LSTM and GRU architectures add gates to make recurrent models easier to train on longer dependencies.

## Core Explanation

Vanilla RNNs can struggle with vanishing or exploding gradients over long sequences. LSTMs use gates to regulate memory flow, while GRUs simplify the gated design. Transformers later showed that attention-only sequence models could replace recurrence for many machine-translation and NLP tasks, though recurrent designs remain useful in some streaming and resource-constrained settings.

## Further Reading

- [Long Short-Term Memory](https://doi.org/10.1162/neco.1997.9.8.1735)
- [Learning Phrase Representations using RNN Encoder-Decoder](https://arxiv.org/abs/1406.1078)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

## Related Articles

- [Activation Functions in Neural Networks](../activation-functions.md)
- [AI for Fraud Detection: Graph Neural Networks, Anti-Money Laundering, and Financial Crime](../ai-for-fraud-detection.md)
- [Convolutional Neural Networks (CNN)](../convolutional-neural-networks-cnn.md)
