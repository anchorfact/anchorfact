---
id: language-modeling-theory
title: "Language Modeling: From N-grams to Scaling Laws and Information-Theoretic Foundations"
schema_type: article
category: ai
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: ai_assisted
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.85
atomic_facts:
  - id: af-language-modeling-theory-1
    statement: >-
      Kaplan et al. (2020, OpenAI) established neural scaling laws: model performance improves as a power law with model size (N), dataset size (D), and compute (C). Hoffmann et al. (2022, DeepMind,
      Chinchilla) refined this: optimal training requires 20 tokens per parameter (not Kaplan's larger models on same data), leading to the Chinchilla scaling law used by LLaMA, Mistral, and modern
      models.
    source_title: Kaplan et al. (OpenAI, 2020) -- Neural Scaling Laws / Hoffmann et al. (DeepMind, 2022) -- Chinchilla scaling law -- Training Compute-Optimal LLMs
    source_url: https://arxiv.org/abs/2001.08361
    confidence: high
  - id: af-language-modeling-theory-2
    statement: >-
      Perplexity -- the exponential of cross-entropy loss -- remains the primary LM evaluation metric. Human-level perplexity on English Wikipedia is ~12, while GPT-4 achieves ~8-12 on similar
      domains, suggesting near-human next-token prediction. The information-theoretic view frames language modeling as lossless compression: a better LM is a better compressor, and compression ratio
      directly measures modeling quality.
    source_title: Kaplan et al. (OpenAI, 2020) -- Scaling laws / GPT-4 technical report (2023) / Deletang et al., ICML 2024 -- Language Modeling as Compression
    source_url: https://arxiv.org/abs/2203.15556
    confidence: high
primary_sources:
  - id: ps-language-modeling-theory-1
    title: Scaling Laws for Neural Language Models (Kaplan et al., 2020)
    type: academic_paper
    year: 2020
    institution: arXiv / OpenAI
    url: https://arxiv.org/abs/2001.08361
  - id: ps-language-modeling-theory-2
    title: Training Compute-Optimal Large Language Models (Chinchilla -- Hoffmann et al., 2022)
    type: academic_paper
    year: 2022
    institution: NeurIPS / DeepMind
    url: https://arxiv.org/abs/2203.15556
known_gaps:
  - Scaling laws for reasoning (beyond next-token prediction)
  - Language model theory -- understanding why next-token prediction leads to emergent abilities
disputed_statements: []
secondary_sources:
  - title: A Neural Probabilistic Language Model (Seminal — Bengio et al.)
    type: journal_article
    year: 2003
    authors:
      - Bengio, Yoshua
      - Ducharme, Réjean
      - Vincent, Pascal
      - Jauvin, Christian
    institution: JMLR / University of Montreal
    url: https://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf
  - title: Attention Is All You Need (Transformer)
    type: conference_paper
    year: 2017
    authors:
      - Vaswani, Ashish
      - Shazeer, Noam
      - Parmar, Niki
      - et al.
    institution: Google Brain / NeurIPS
    url: https://proceedings.neurips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf
  - title: Language Models are Few-Shot Learners (GPT-3)
    type: conference_paper
    year: 2020
    authors:
      - Brown, Tom B.
      - Mann, Benjamin
      - Ryder, Nick
      - et al.
    institution: OpenAI / NeurIPS
    url: https://arxiv.org/abs/2005.14165
  - title: "A Comprehensive Survey on Pretrained Language Models: From BERT to ChatGPT to GPT-4"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: International Journal of Machine Learning & Cybernetics (Springer)
    url: https://doi.org/10.1007/s13042-024-02443-6
updated: "2026-05-24"
---
## TL;DR
Language modeling -- the simple task of predicting what word comes next -- is the improbable foundation behind GPT-4 and all modern LLMs. From Claude Shannon's 1948 information theory to scaling laws governing billion-parameter models, the mathematics of prediction unites statistical approaches, neural networks, and the emergent intelligence of large-scale pretraining.

## Core Explanation
The language modeling objective: given context tokens x1, x2, ..., x_{t-1}, predict P(x_t | x< t). Loss: negative log-likelihood = -log P(x_t | x< t). The exponential of average loss is perplexity. Evolution: (1) N-gram models (pre-2013) -- count-based sparse models; (2) Neural LMs (2013-2017) -- RNNs learning continuous word representations; (3) Transformer LMs (2017-present) -- GPT, BERT (masked LM), T5. Self-attention captures long-range dependencies, scales to trillion-token training.

## Detailed Analysis
Scaling laws (Kaplan et al., 2020): varied model size (768 to 1.5B params), dataset size, and compute. Key findings: (1) L(N) follows power law in model size; (2) Data scaling follows similar power law; (3) Larger models are more sample-efficient. Chinchilla (Hoffmann et al., 2022): the correction -- optimal training uses 20x more tokens than parameters. Chinchilla-70B matches Gopher-280B (4x larger). Information-theoretic view: language modeling IS compression. A perfect LM would achieve entropy of English (~1.0 bits/character). Current SOTA: ~0.8-1.0 bits/character. gzip + kNN beats BERT on text classification (Jiang et al., ACL 2023) -- demonstrating simple compressors capture linguistic structure. Key open question: why does next-token prediction lead to chain-of-thought reasoning and in-context learning? The theoretical understanding of emergent abilities remains incomplete.
