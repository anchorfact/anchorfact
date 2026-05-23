---
id: "text-to-speech"
title: "Text-to-Speech and Voice Synthesis"
schema_type: "TechArticle"
category: "ai"
language: "en"
confidence: "high"
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "af-text-to-speech-1"
    statement: "Tacotron 2 (Google, 2018) combines a sequence-to-sequence model with modified WaveNet vocoder, achieving MOS (Mean Opinion Score) of 4.53 — comparable to professional human recordings (4.58)."
    source_title: "Shen et al., ICASSP (2018)"
    confidence: "high"
  - id: "af-text-to-speech-2"
    statement: "ElevenLabs (2023) introduced voice cloning from 1-minute audio samples, generating emotionally expressive speech with natural prosody and intonation patterns that can whisper, laugh, and convey 10+ distinct emotions."
    source_title: "ElevenLabs Research Blog (2023)"
    confidence: "high"

completeness: 0.9

known_gaps:
  - "Zero-shot voice cloning ethics"
  - "Paralinguistic feature generation (laughter, emotion)"

disputed_statements:
  - statement: "No major disputed statements identified"

primary_sources:
  - title: "Natural TTS Synthesis by Conditioning WaveNet on Mel Spectrogram Predictions (Tacotron 2)"
    type: "academic_paper"
    year: 2018
    url: "https://arxiv.org/abs/1712.05884"
    institution: "ICASSP/Google"
  - title: "High Fidelity Neural Audio Compression (EnCodec)"
    type: "academic_paper"
    year: 2023
    url: "https://arxiv.org/abs/2210.13438"
    institution: "Meta AI"

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