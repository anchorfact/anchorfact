---
id:"speech-recognition"
title:"Speech Recognition: From HMMs to Whisper"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-24"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true

atomic_facts:
  - id:"af-speech-recognition-1"
    statement:"Whisper (OpenAI, 2023), trained on 680,000 hours of multilingual and multitask supervised data, approaches human-level robustness and accuracy in English speech recognition while supporting 99 languages."
    source_title:"Radford et al., OpenAI (2023)"
    confidence:"high"
  - id:"af-speech-recognition-2"
    statement:"Connectionist Temporal Classification (CTC, Graves et al., 2006) enables training sequence models without frame-level alignment by summing over all valid alignments between input and output sequences."
    source_title:"Graves et al., ICML (2006)"
    confidence:"high"

completeness:0.9

primary_sources:
  - title:"Robust Speech Recognition via Large-Scale Weak Supervision (Whisper)"
    type:"academic_paper"
    year:2023
    url:"https://arxiv.org/abs/2212.04356"
    institution:"OpenAI"
  - title:"Connectionist Temporal Classification"
    type:"academic_paper"
    year:2006
    url:"https://www.cs.toronto.edu/~graves/icml_2006.pdf"
    institution:"ICML"

known_gaps:
  - "Low-resource language ASR"
  - "Speaker diarization (who spoke when)"

disputed_statements:
  - statement:"No major disputed statements identified"

---

## TL;DR
Speech recognition converts audio signals to text. Modern end-to-end approaches — CTC, RNN-Transducer, Attention-based Encoder-Decoder — have replaced traditional HMM-GMM pipelines, with Whisper achieving near-human performance.

## Core Explanation
Traditional pipeline: feature extraction (MFCCs) → acoustic model (phoneme prediction) → pronunciation model (phoneme-to-word) → language model (word sequence scoring). End-to-end models collapse these into a single neural network trained on audio-text pairs.

## Detailed Analysis
Whisper's architecture: encoder-decoder transformer trained on diverse data (different recording conditions, accents, languages). Its multitask training format (transcribe/translate/language identification) improves robustness. Wav2Vec 2.0 (Facebook) uses self-supervised pretraining on raw audio followed by fine-tuning with limited labeled data.

## Further Reading
- OpenAI Whisper GitHub
- Kaldi ASR Toolkit
- Hugging Face: Automatic Speech Recognition