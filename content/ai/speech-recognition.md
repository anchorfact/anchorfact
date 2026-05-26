---
id: speech-recognition
title: "Speech Recognition: From HMMs to Whisper"
schema_type: TechArticle
category: ai
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: f1
    statement: >-
      Whisper (Radford et al. 2022, OpenAI) trained on 680K hours of weakly supervised multilingual speech data, achieving near-human-level accuracy on English ASR and demonstrating robust zero-shot
      transfer to 99 languages.
    source_title: Radford, Alec, et al. Robust Speech Recognition via Large-Scale Weak Supervision. OpenAI 2022
    source_url: https://arxiv.org/abs/2212.04356
    confidence: high
  - id: f2
    statement: >-
      Wav2Vec 2.0 (Baevski et al. 2020, Meta AI, NeurIPS) learns speech representations via self-supervised contrastive learning on raw audio, then fine-tunes on as little as 10 minutes of labeled
      data for competitive ASR.
    source_title: "Baevski, Alexei, et al. Wav2Vec 2.0: A Framework for Self-Supervised Learning of Speech Representations. NeurIPS 2020"
    source_url: https://arxiv.org/abs/2006.11477
    confidence: high
  - id: f3
    statement: >-
      DeepSpeech 2 (Amodei et al. 2016, Baidu) demonstrated that end-to-end deep learning could surpass traditional HMM-based ASR systems, using a unified RNN with CTC loss trained on thousands of
      hours of speech.
    source_title: "Amodei, Dario, et al. Deep Speech 2: End-to-End Speech Recognition in English and Mandarin. ICML 2016"
    source_url: https://arxiv.org/abs/1512.02595
    confidence: high
completeness: 0.9
known_gaps:
  - Low-resource language ASR
  - Speaker diarization (who spoke when)
disputed_statements:
  - statement: No major disputed statements identified
primary_sources:
  - title: Robust Speech Recognition via Large-Scale Weak Supervision (Whisper)
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2212.04356
    institution: OpenAI
  - title: Connectionist Temporal Classification
    type: academic_paper
    year: 2006
    url: https://www.cs.toronto.edu/~graves/icml_2006.pdf
    institution: ICML
secondary_sources:
  - title: Robust Speech Recognition via Large-Scale Weak Supervision (Whisper)
    type: technical_report
    year: 2022
    authors:
      - Radford, Alec
      - Kim, Jong Wook
      - Xu, Tao
      - Brockman, Greg
      - McLeavey, Christine
      - Sutskever, Ilya
    institution: OpenAI
    url: https://arxiv.org/abs/2212.04356
  - title: "End-to-End Speech Recognition: A Survey"
    type: survey_paper
    year: 2023
    authors:
      - Prabhavalkar, Rohit
      - Hori, Takaaki
      - Sainath, Tara N.
      - Schlüter, Ralf
      - Watanabe, Shinji
    institution: IEEE/ACM TASLP
    url: https://doi.org/10.1109/TASLP.2023.3328283
  - title: "Automatic Speech Recognition in the Modern Era: A Comprehensive Survey"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: arXiv / ScienceDirect
    url: https://arxiv.org/abs/2510.12827
  - title: Deep Neural Networks for Acoustic Modeling in Speech Recognition
    type: journal_article
    year: 2012
    authors:
      - Hinton, Geoffrey
      - Deng, Li
      - Yu, Dong
      - Dahl, George
      - Mohamed, Abdel-rahman
      - Jaitly, Navdeep
      - Senior, Andrew
      - Vanhoucke, Vincent
      - Nguyen, Patrick
      - Sainath, Tara
      - Kingsbury, Brian
    institution: IEEE Signal Processing Magazine / Microsoft Research
    url: https://doi.org/10.1109/MSP.2012.2205597
updated: "2026-05-24"
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

## Related Articles

- [AI for Audio Processing: Speech Recognition, Music Generation, and Sound Understanding](../ai-for-audio-processing-speech-recognition-music-generation-and-sound-understanding.md)
- [AI for Speech Emotion Recognition: Vocal Biomarkers, Mental Health Screening, and Affective Computing](../ai-for-speech-emotion-recognition.md)
- [Affective Computing: Multimodal Emotion Recognition, Sentiment Analysis, and Empathetic AI](../affective-computing.md)