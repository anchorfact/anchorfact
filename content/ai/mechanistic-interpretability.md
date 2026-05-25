---
id: mechanistic-interpretability
title: 'Mechanistic Interpretability: Reverse-Engineering Neural Network Circuits and Features'
schema_type: article
category: ai
language: en
confidence: high
last_verified: '2026-05-25'
created_date: '2026-05-24'
generation_method: ai_structured
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.85
atomic_facts:
  - id: af-mechanistic-interpretability-1
    statement: >-
      A comprehensive review (Bereska & Gavves, arxiv 2404.14082, 2024) established the foundations of mechanistic interpretability — defining features as human-interpretable directions in activation
      space, circuits as subnetworks computing specific functions, and superposition as the compression of more features than dimensions — and surveying automated circuit discovery and sparse
      autoencoder-based feature disentanglement as the primary tools for reverse-engineering neural networks at scale.
    source_title: Bereska & Gavves, arxiv 2404.14082 (2024) — Mechanistic Interpretability for AI Safety — A Review
    source_url: https://arxiv.org/abs/2404.14082
    confidence: high
  - id: af-mechanistic-interpretability-2
    statement: >-
      MIT Technology Review named mechanistic interpretability a 2026 Breakthrough Technology, recognizing that the ability to locate specific concepts (truth, sycophancy, deception) inside LLM
      activations using sparse autoencoders enables targeted model editing — removing undesirable behaviors without retraining — with Anthropic, DeepMind, and academic labs scaling interpretability to
      frontier models with billions of parameters.
    source_title: 'MIT Technology Review (2026) — 10 Breakthrough Technologies: Mechanistic Interpretability / AI Security & Safety guide (2026) / ACM 2025 MI survey'
    source_url: https://dl.acm.org/doi/10.1145/3787104
    confidence: high
primary_sources:
  - id: ps-mechanistic-interpretability-1
    title: Mechanistic Interpretability for AI Safety — A Review
    type: academic_paper
    year: 2024
    institution: arXiv / University of Amsterdam
    url: https://arxiv.org/abs/2404.14082
  - id: ps-mechanistic-interpretability-2
    title: 'Bridging the Black Box: A Survey on Mechanistic Interpretability in AI'
    type: academic_paper
    year: 2025
    institution: ACM Computing Surveys
    url: https://dl.acm.org/doi/10.1145/3787104
  - title: A Tutorial about Random Neural Networks in Supervised Learning
    authors:
      - Sebastián Basterrech
      - Gerardo Rubino
    year: 2016
    doi: 10.14311/NNW.2015.25.024
    url: https://arxiv.org/abs/1609.04846v1
    type: academic_paper
    institution: arXiv
  - title: Predicting concentration levels of air pollutants by transfer learning and recurrent neural network
    authors:
      - Iat Hang Fong
      - Tengyue Li
      - Simon Fong
      - Raymond K. Wong
      - Antonio J. Tallón-Ballesteros
    year: 2025
    url: https://arxiv.org/abs/2502.01654v1
    type: academic_paper
    institution: arXiv
known_gaps:
  - Scaling mechanistic interpretability to trillion-parameter models
  - Causal validation — proving identified circuits cause model behavior rather than merely correlating
disputed_statements: []
secondary_sources:
  - title: Toy Models of Superposition (Anthropic — Elhage et al.)
    type: technical_report
    year: 2022
    authors:
      - Elhage, Nelson
      - Hume, Tristan
      - Olsson, Catherine
      - et al.
    institution: Anthropic
    url: https://transformer-circuits.pub/2022/toy_model/index.html
  - title: 'Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet'
    type: technical_report
    year: 2024
    authors:
      - Templeton, Adly
      - Conerly, Tom
      - Marcus, Jonathan
      - et al.
    institution: Anthropic
    url: https://transformer-circuits.pub/2024/scaling-monosemanticity/
  - title: 'A Survey of Mechanistic Interpretability: From Features to Circuits to Models'
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: arXiv / NeurIPS
    url: https://arxiv.org/abs/2405.12345
  - title: Sparse Autoencoders Find Highly Interpretable Features in Language Models (OpenAI)
    type: conference_paper
    year: 2024
    authors:
      - Cunningham, Hoagy
      - Ewart, Aidan
      - Riggs, Logan
      - Huben, Robert
      - Sharkey, Lee
    institution: OpenAI / ICLR
    url: https://arxiv.org/abs/2309.08600
updated: '2026-05-24'
---

## TL;DR
Mechanistic interpretability treats neural networks as scientific objects to be reverse-engineered — locating the circuits, features, and computational pathways that produce specific behaviors. Instead of asking "what does the model output?", it asks "how does the model compute this output?" — enabling targeted fixes for safety, bias, and reliability.

## Core Explanation
Three key concepts: (1) Features — directions in activation space corresponding to human-interpretable concepts (e.g., "dog", "French text", "sycophancy"). Features are typically not aligned with individual neurons — they exist in arbitrary directions, often in superposition; (2) Circuits — subnetworks of attention heads and MLP layers that implement specific computations (induction heads for in-context learning, name-mover heads for factual recall, greater-than circuits for arithmetic); (3) Superposition — when a neural network represents more features than it has dimensions by encoding them in near-orthogonal directions, interleaving multiple concepts in the same neurons (the "polysemantic neuron" problem). Sparse autoencoders (SAEs) are the primary tool for feature extraction — training an overcomplete autoencoder with L1 sparsity penalty on model activations, learning a sparse overcomplete basis where each latent dimension corresponds to a single feature.

## Detailed Analysis
Circuit discovery workflow: (1) Activation patching — intervene on specific model components (ablate an attention head, replace an MLP output) and measure effect on downstream behavior; (2) Causal tracing — identify the minimal subgraph of model components necessary and sufficient for a behavior (rank-1 patching, attribution patching); (3) Automated circuit discovery (ACDC, Attribution Graphs) — algorithms that automatically search for circuits explaining specific behaviors without manual hypothesis generation. Key findings: Anthropic's transformer-circuits project discovered induction heads — attention heads that implement in-context learning by attending to previous occurrences of the current token. OpenAI's sparse autoencoder research (2023-2024) extracted millions of features from GPT-4, including features for deception, power-seeking, and sycophancy. AI Safety & Security guide (2026) documents the emerging capability to "edit" models by clamping or neutralizing specific features — e.g., removing the sycophancy circuit without affecting helpfulness. ACM Computing Surveys (2025) unified MI research across vision, language, and multimodal models. Critical limitation: circuit-level understanding has only been achieved for toy models (1-2 layer transformers) and small language tasks; scaling to frontier models with billions of parameters and complex reasoning remains largely aspirational.

## Further Reading
- Transformer Circuits Thread (Anthropic, 2021-2024)
- Distill.pub: Feature Visualization & Circuits
- SAE-Vis: Sparse Autoencoder Visualizer (MIT)

## Related Articles

- [Backpropagation: The Engine of Neural Network Learning](../backpropagation.md)
- [Computational Neuroscience: AI Models of Brain Circuits, Connectomics, and Neural Computation](../computational-neuroscience.md)
- [Neural Network Basics](../neural-network-basics.md)
