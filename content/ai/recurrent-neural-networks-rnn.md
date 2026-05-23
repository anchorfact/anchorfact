---
id: "kb-2026-00270"


title: "Recurrent Neural Networks (RNN)"
schema_type: "TechArticle"


category: "ai"
language: "en"


confidence: "high"
last_verified: "2026-05-22"


generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Learning Phrase Representations using RNN Encoder-Decoder for Statistical Machine Translation"
    authors: ["Cho, Kyunghyun", "van Merrienboer, Bart", "Gulcehre, Caglar", "Bahdanau, Dzmitry", "Bougares, Fethi", "Schwenk, Holger", "Bengio, Yoshua"]
    type: "academic_paper"


    year: 2014
    doi: "10.48550/arXiv.1406.1078"


    url: "https://arxiv.org/abs/1406.1078"
    institution: "EMNLP 2014"


    note: "Introduced the GRU (Gated Recurrent Unit). 36,000+ citations."
secondary_sources:
  - title: "Long Short-Term Memory"
    authors: ["Hochreiter, Sepp", "Schmidhuber, Jurgen"]
    type: "academic_paper"


    year: 1997
    doi: "10.1162/neco.1997.9.8.1735"


    url: "https://www.bioinf.jku.at/publications/older/2604.pdf"
    institution: "Neural Computation"


    note: "The original LSTM paper — 100,000+ citations. Foundation of recurrent neural network research."
completeness: 0.88
disputed_statements:
  - statement: "The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches"
    confidence: "medium"

known_gaps:
  - "Statistics and data cited are from 2014 and earlier; more recent data may have become available since publication"
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
  - "Recent developments from 2025-2026 may not be reflected"
ai_citations:
---

## TL;DR

RNNs process sequential data (text, time series, speech) by maintaining a hidden state that captures information from previous steps. Unlike feedforward networks, RNNs have recurrent connections — output at time t depends on input at t and hidden state from t-1.

## Core Explanation

Vanilla RNN suffers vanishing/exploding gradients in long sequences. LSTM (Long Short-Term Memory, Hochreiter & Schmidhuber 1997): adds forget/input/output gates to control information flow. GRU (Gated Recurrent Unit, Cho 2014): simplified LSTM with reset/update gates. Transformers largely replaced RNNs for NLP (2017+), but RNNs remain relevant for small datasets and real-time streaming.

## Further Reading

- [Learning Phrase Representations using RNN Encoder-Decoder (Cho et al., 2014)](https://arxiv.org/abs/1406.1078)
