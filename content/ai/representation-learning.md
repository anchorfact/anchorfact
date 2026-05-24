---
id: "representation-learning"
title: "Representation Learning: Autoencoders, VAEs, and MAEs"
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
  - id: "af-representation-learning-1"
    statement: "Variational Autoencoders (VAE, Kingma & Welling, 2014) learn a probabilistic latent space where each point maps to a distribution — enabling controlled generation via sampling and smooth interpolation in latent space."
    source_title: "Kingma & Welling, ICLR (2014)"
    confidence: "high"
  - id: "af-representation-learning-2"
    statement: "Masked Autoencoders (MAE, He et al., 2022) mask 75% of image patches and train an asymmetric encoder-decoder to reconstruct only the masked regions — achieving state-of-the-art self-supervised visual representation learning."
    source_title: "He et al., CVPR (2022)"
    confidence: "high"

completeness: 0.9

primary_sources:
  - title: "Auto-Encoding Variational Bayes (VAE)"
    type: "academic_paper"
    year: 2014
    url: "https://arxiv.org/abs/1312.6114"
    institution: "ICLR"
  - title: "Masked Autoencoders Are Scalable Vision Learners (MAE)"
    type: "academic_paper"
    year: 2022
    url: "https://arxiv.org/abs/2111.06377"
    institution: "CVPR"

known_gaps:
  - "Disentangled representation learning"
  - "Information bottleneck theory in deep learning"

disputed_statements:
  - statement: "No major disputed statements identified"

---

## TL;DR
Representation learning transforms raw data (pixels, text) into meaningful vector spaces where similarity corresponds to semantic relatedness. Autoencoders compress and reconstruct; VAEs add probabilistic generation; MAEs learn by masking.

## Core Explanation
Autoencoders: encoder compresses input to latent representation; decoder reconstructs. The bottleneck forces the model to learn salient features. Standard autoencoders produce deterministic embeddings. VAEs output distribution parameters (μ, σ), with KL divergence regularization keeping the latent space smooth and generative.

## Detailed Analysis
MAE's key insight: masking a high proportion (75%+) of image patches creates a challenging self-supervised task where the model must understand visual semantics to reconstruct missing patches. The asymmetric design (encoder sees only visible patches; lightweight decoder reconstructs all) enables efficient training.

## Further Reading
- Lilian Weng: From Autoencoder to Beta-VAE
- Keras: Autoencoder Tutorial
- PyTorch: MAE Implementation