---
id: text-to-speech
title: "Text-to-Speech and Voice Synthesis"
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: "2026-06-01"
created_date: "2026-05-24"
updated: "2026-06-01"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-tts-001
    statement: "WaveNet introduced a deep generative model that directly models raw audio waveforms."
    source_title: "WaveNet: A Generative Model for Raw Audio"
    source_url: https://arxiv.org/abs/1609.03499
    confidence: medium
  - id: fact-tts-002
    statement: "Tacotron 2 combines a sequence-to-sequence feature prediction network that maps text to mel spectrograms with a modified WaveNet vocoder."
    source_title: "Natural TTS Synthesis by Conditioning WaveNet on Mel Spectrogram Predictions"
    source_url: https://arxiv.org/abs/1712.05884
    confidence: medium
  - id: fact-tts-003
    statement: "VALL-E frames text-to-speech as conditional language modeling over discrete neural audio codec codes."
    source_title: "Neural Codec Language Models are Zero-Shot Text to Speech Synthesizers"
    source_url: https://arxiv.org/abs/2301.02111
    confidence: medium
completeness: 0.82
known_gaps:
  - "Voice cloning safety, consent, watermarking, and identity misuse controls are not covered in this compact source-mapped article."
  - "Commercial text-to-speech product behavior changes quickly and should be verified against current vendor documentation."
disputed_statements: []
primary_sources:
  - title: "WaveNet: A Generative Model for Raw Audio"
    type: academic_paper
    year: 2016
    url: https://arxiv.org/abs/1609.03499
    institution: Google DeepMind
  - title: "Natural TTS Synthesis by Conditioning WaveNet on Mel Spectrogram Predictions"
    type: academic_paper
    year: 2018
    url: https://arxiv.org/abs/1712.05884
    institution: Google
  - title: "Neural Codec Language Models are Zero-Shot Text to Speech Synthesizers"
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2301.02111
    institution: Microsoft
secondary_sources: []
---

## TL;DR

Modern text-to-speech systems moved from waveform modeling to spectrogram pipelines and then to codec-token language modeling. For agentic media workflows, the safe claim is architectural: generated speech depends on model design, reference audio, and downstream review.

## Core Explanation

AI coding or media agents may use TTS for narration prototypes, accessibility previews, NPC voice mockups, or automated video drafts. Production use needs consent, licensing, review, and abuse controls; these operational constraints are separate from the model architecture facts below.

## Source-Mapped Facts

- WaveNet introduced a deep generative model that directly models raw audio waveforms. ([source](https://arxiv.org/abs/1609.03499))
- Tacotron 2 combines a sequence-to-sequence feature prediction network that maps text to mel spectrograms with a modified WaveNet vocoder. ([source](https://arxiv.org/abs/1712.05884))
- VALL-E frames text-to-speech as conditional language modeling over discrete neural audio codec codes. ([source](https://arxiv.org/abs/2301.02111))

## Further Reading

- [WaveNet](https://arxiv.org/abs/1609.03499)
- [Tacotron 2](https://arxiv.org/abs/1712.05884)
- [VALL-E](https://arxiv.org/abs/2301.02111)
