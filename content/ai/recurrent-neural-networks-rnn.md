---
id: "kb-2026-00270"
title: "Recurrent Neural Networks (RNN)"
schema_type: "TechArticle"
category: "ai"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-ai-001"
    statement: "RNNs process sequential data (text, time series, speech) by maintaining a hidden state that captures information from previous steps. Unlike feedforward networks, RNNs have recurrent connections — output at time t depends on input at t and hidden state from t-1."
    source_title: "Learning Phrase Representations using RNN Encoder-Decoder for Statistical Machine Translation"
    source_url: "https://arxiv.org/abs/1406.1078"
    source_doi: "10.48550/arXiv.1406.1078"
    confidence: "high"
  - id: "fact-ai-002"
    statement: "LSTM (Long Short-Term Memory, Hochreiter & Schmidhuber 1997): adds forget/input/output gates to control information flow."
    source_title: "Long Short-Term Memory"
    source_url: "https://www.bioinf.jku.at/publications/older/2604.pdf"
    source_doi: "10.1162/neco.1997.9.8.1735"
    confidence: "high"
  - id: "fact-ai-003"
    statement: "GRU (Gated Recurrent Unit, Cho 2014): simplified LSTM with reset/update gates."
    source_title: "Learning Phrase Representations using RNN Encoder-Decoder for Statistical Machine Translation"
    source_url: "https://arxiv.org/abs/1406.1078"
    source_doi: "10.48550/arXiv.1406.1078"
    confidence: "high"
  - id: "fact-ai-004"
    statement: "Transformers largely replaced RNNs for NLP (2017+), but RNNs remain relevant for small datasets and real-time streaming."
    source_title: "Learning Phrase Representations using RNN Encoder-Decoder for Statistical Machine Translation"
    source_url: "https://arxiv.org/abs/1406.1078"
    source_doi: "10.48550/arXiv.1406.1078"
    confidence: "high"

completeness: 0.88

known_gaps:
  - "Statistics and data cited are from 2014 and earlier; more recent data may have become available since publication"
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
  - "Recent developments from 2025-2026 may not be reflected"

disputed_statements:
  - statement: "The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches"

primary_sources:
  - title: "Learning Phrase Representations using RNN Encoder-Decoder for Statistical Machine Translation"
    authors: ["Cho, Kyunghyun", "van Merrienboer, Bart", "Gulcehre, Caglar", "Bahdanau, Dzmitry", "Bougares, Fethi", "Schwenk, Holger", "Bengio, Yoshua"]
    type: "academic_paper"
    year: 2014
    url: "https://arxiv.org/abs/1406.1078"
    doi: "10.48550/arXiv.1406.1078"
    institution: "EMNLP 2014"

secondary_sources:
  - title: "Long Short-Term Memory"
    authors: ["Hochreiter, Sepp", "Schmidhuber, Jurgen"]
    type: "academic_paper"
    year: 1997
    url: "https://www.bioinf.jku.at/publications/older/2604.pdf"
    doi: "10.1162/neco.1997.9.8.1735"
    institution: "Neural Computation"

---



## TL;DR

RNNs process sequential data (text, time series, speech) by maintaining a hidden state that captures information from previous steps. Unlike feedforward networks, RNNs have recurrent connections — output at time t depends on input at t and hidden state from t-1.

## Core Explanation

Vanilla RNN suffers vanishing/exploding gradients in long sequences. LSTM (Long Short-Term Memory, Hochreiter & Schmidhuber 1997): adds forget/input/output gates to control information flow. GRU (Gated Recurrent Unit, Cho 2014): simplified LSTM with reset/update gates. Transformers largely replaced RNNs for NLP (2017+), but RNNs remain relevant for small datasets and real-time streaming.

## Further Reading

- [Learning Phrase Representations using RNN Encoder-Decoder (Cho et al., 2014)](https://arxiv.org/abs/1406.1078)
