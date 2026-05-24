---
id: text-to-speech
title: Text-to-Speech and Voice Synthesis
schema_type: TechArticle
category: ai
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: ai_assisted
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: f1
    statement: >-
      WaveNet (van den Oord et al. 2016, DeepMind) was the first generative model to produce raw audio waveforms directly, using dilated causal convolutions to achieve natural-sounding speech
      synthesis that halved the gap to human speech.
    source_title: "van den Oord, Aaron, et al. WaveNet: A Generative Model for Raw Audio. DeepMind 2016"
    source_url: https://arxiv.org/abs/1609.03499
    confidence: high
  - id: f2
    statement: >-
      Tacotron 2 (Shen et al. 2018, Google) generates mel spectrograms from text using a sequence-to-sequence model with attention, then synthesizes audio via a modified WaveNet vocoder, approaching
      human parity on MOS scores.
    source_title: Shen, Jonathan, et al. Natural TTS Synthesis by Conditioning WaveNet on Mel Spectrogram Predictions. 2018
    source_url: https://arxiv.org/abs/1712.05884
    confidence: high
  - id: f3
    statement: >-
      VALL-E (Wang et al. 2023, Microsoft) treats TTS as a conditional language modeling task using discrete audio codec tokens, enabling zero-shot voice cloning from just 3 seconds of reference
      audio.
    source_title: Wang, Chengyi, et al. Neural Codec Language Models are Zero-Shot Text to Speech Synthesizers. 2023
    source_url: https://arxiv.org/abs/2301.02111
    confidence: high
completeness: 0.9
known_gaps:
  - Zero-shot voice cloning ethics
  - Paralinguistic feature generation (laughter, emotion)
disputed_statements:
  - statement: No major disputed statements identified
primary_sources:
  - title: Natural TTS Synthesis by Conditioning WaveNet on Mel Spectrogram Predictions (Tacotron 2)
    type: academic_paper
    year: 2018
    url: https://arxiv.org/abs/1712.05884
    institution: ICASSP/Google
  - title: High Fidelity Neural Audio Compression (EnCodec)
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2210.13438
    institution: Meta AI
secondary_sources:
  - title: "NaturalSpeech: End-to-End Text-to-Speech Synthesis with Human-Level Quality"
    type: conference_paper
    year: 2024
    authors:
      - Tan, Xu
      - Chen, Jiawei
      - Liu, Haohe
      - et al.
    institution: Microsoft Research / ICML
    url: https://arxiv.org/abs/2205.04421
  - title: "WaveNet: A Generative Model for Raw Audio"
    type: conference_paper
    year: 2016
    authors:
      - van den Oord, Aäron
      - Dieleman, Sander
      - Zen, Heiga
      - et al.
    institution: Google DeepMind
    url: https://arxiv.org/abs/1609.03499
  - title: A Survey on Neural Text-to-Speech Synthesis
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: IEEE/ACM TASLP
    url: https://doi.org/10.1109/TASLP.2024.3385267
  - title: "Tacotron 2: Natural TTS Synthesis by Conditioning WaveNet on Mel Spectrogram Predictions"
    type: conference_paper
    year: 2018
    authors:
      - Shen, Jonathan
      - Pang, Ruoming
      - Weiss, Ron J.
      - et al.
    institution: Google
    url: https://arxiv.org/abs/1712.05884
updated: "2026-05-24"
---
## TL;DR
Modern TTS produces speech indistinguishable from human recordings, with voice cloning from one-minute samples and emotional expressiveness that captures laughter, whispers, and nuanced prosody.

## Core Explanation
Two-stage pipeline: text-to-spectrogram (Tacotron, FastSpeech) → spectrogram-to-waveform (WaveNet, HiFi-GAN). End-to-end models (VITS, Voicebox) unify these stages. Mel spectrograms compress audio into time-frequency representations suitable for neural processing.

## Detailed Analysis
FastSpeech 2 (Microsoft) enables parallel, non-autoregressive generation for real-time synthesis. Voicebox (Meta, 2023) approaches TTS as an in-context learning task — conditioning on a short audio sample to generate speech in any voice, including multilingual transfer.

## Further Reading
- Hugging Face: Text-to-Speech Models
- Coqui.ai TTS
- ISCA Speech Synthesis Workshop