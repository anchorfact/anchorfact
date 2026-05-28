---
id: speech-recognition
title: "Speech Recognition: From HMMs to Whisper"
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-speech-recognition-1
    statement: Deep Speech used end-to-end deep learning for speech recognition.
    source_title: "Deep Speech: Scaling up end-to-end speech recognition"
    source_url: https://arxiv.org/abs/1412.5567
    confidence: medium
  - id: fact-speech-recognition-2
    statement: wav2vec 2.0 learns speech representations through self-supervised pretraining on raw audio.
    source_title: "wav2vec 2.0: A Framework for Self-Supervised Learning of Speech Representations"
    source_url: https://arxiv.org/abs/2006.11477
    confidence: medium
  - id: fact-speech-recognition-3
    statement: >-
      Whisper was trained for robust speech recognition and translation using large-scale weak
      supervision.
    source_title: Robust Speech Recognition via Large-Scale Weak Supervision
    source_url: https://arxiv.org/abs/2212.04356
    confidence: medium
completeness: 0.9
known_gaps:
  - This compact repair keeps only source-mapped public claims from the sampled audit entry.
disputed_statements: []
primary_sources:
  - title: "Deep Speech: Scaling up end-to-end speech recognition"
    type: academic_paper
    year: 2014
    url: https://arxiv.org/abs/1412.5567
    institution: Baidu / arXiv
  - title: "wav2vec 2.0: A Framework for Self-Supervised Learning of Speech Representations"
    type: academic_paper
    year: 2020
    url: https://arxiv.org/abs/2006.11477
    institution: Facebook AI / arXiv
  - title: Robust Speech Recognition via Large-Scale Weak Supervision
    type: academic_paper
    year: 2022
    url: https://arxiv.org/abs/2212.04356
    institution: OpenAI / arXiv
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

Speech recognition converts audio into text using acoustic modeling, self-supervised pretraining, and sequence decoding. This repair maps claims to primary ASR papers.

## Core Explanation

The previous article had partial source coverage. This version keeps three direct claims from Deep Speech, wav2vec 2.0, and Whisper.

## Further Reading

- [Deep Speech: Scaling up end-to-end speech recognition](https://arxiv.org/abs/1412.5567)
- [wav2vec 2.0: A Framework for Self-Supervised Learning of Speech Representations](https://arxiv.org/abs/2006.11477)
- [Robust Speech Recognition via Large-Scale Weak Supervision](https://arxiv.org/abs/2212.04356)
