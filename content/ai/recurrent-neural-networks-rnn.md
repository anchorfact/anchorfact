---
id:"kb-2026-00270"
title:"Recurrent Neural Networks (RNN)"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Learning Phrase Representations using RNN Encoder-Decoder (Cho et al., 2014)"
    type:"paper"
    year:2014
    url:"https://arxiv.org/abs/1406.1078"
    institution:"arXiv"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

RNNs process sequential data (text, time series, speech) by maintaining a hidden state that captures information from previous steps. Unlike feedforward networks, RNNs have recurrent connections — output at time t depends on input at t and hidden state from t-1.

## Core Explanation

Vanilla RNN suffers vanishing/exploding gradients in long sequences. LSTM (Long Short-Term Memory, Hochreiter & Schmidhuber 1997): adds forget/input/output gates to control information flow. GRU (Gated Recurrent Unit, Cho 2014): simplified LSTM with reset/update gates. Transformers largely replaced RNNs for NLP (2017+), but RNNs remain relevant for small datasets and real-time streaming.

## Further Reading

- [Learning Phrase Representations using RNN Encoder-Decoder (Cho et al., 2014)](https://arxiv.org/abs/1406.1078)
