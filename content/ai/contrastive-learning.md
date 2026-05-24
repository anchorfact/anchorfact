---
id: contrastive-learning
title: "Contrastive Learning: SimCLR, MoCo, and CLIP"
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
  - id: af-contrastive-learning-1
    statement: >-
      CLIP (Radford et al., OpenAI, 2021) trains on 400 million image-text pairs to learn joint visual-linguistic representations, achieving zero-shot classification that matches supervised ResNet-50
      on ImageNet without any ImageNet training data.
    source_title: Radford et al., ICML (2021)
    confidence: high
  - id: af-contrastive-learning-2
    statement: >-
      MoCo (Momentum Contrast, He et al., 2020) maintains a dynamic dictionary as a queue of encoded representations, decoupling dictionary size from batch size — enabling contrastive learning on
      commodity hardware.
    source_title: He et al., CVPR (2020)
    confidence: high
completeness: 0.9
known_gaps:
  - Contrastive learning theoretical understanding
  - Efficiency improvements for large-scale contrastive training
disputed_statements:
  - statement: No major disputed statements identified
primary_sources:
  - title: Learning Transferable Visual Models From Natural Language Supervision (CLIP)
    type: academic_paper
    year: 2021
    url: https://arxiv.org/abs/2103.00020
    institution: ICML/OpenAI
  - title: Momentum Contrast for Unsupervised Visual Representation Learning (MoCo)
    type: academic_paper
    year: 2020
    url: https://arxiv.org/abs/1911.05722
    institution: CVPR
secondary_sources:
  - title: "A Comprehensive Survey on Contrastive Learning: From SimCLR and MoCo to Modern Multi-Modal Approaches"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: Neurocomputing (Elsevier)
    url: https://doi.org/10.1016/j.neucom.2024.128639
  - title: A Simple Framework for Contrastive Learning of Visual Representations (SimCLR)
    type: conference_paper
    year: 2020
    authors:
      - Chen, Ting
      - Kornblith, Simon
      - Norouzi, Mohammad
      - Hinton, Geoffrey
    institution: Google Research / ICML
    url: https://arxiv.org/abs/2002.05709
  - title: Momentum Contrast for Unsupervised Visual Representation Learning (MoCo)
    type: conference_paper
    year: 2020
    authors:
      - He, Kaiming
      - Fan, Haoqi
      - Wu, Yuxin
      - Xie, Saining
      - Girshick, Ross
    institution: Facebook AI Research / CVPR
    url: https://arxiv.org/abs/1911.05722
  - title: "Bootstrap Your Own Latent: A New Approach to Self-Supervised Learning (BYOL)"
    type: conference_paper
    year: 2020
    authors:
      - Grill, Jean-Bastien
      - Strub, Florian
      - Altché, Florent
      - et al.
    institution: DeepMind / NeurIPS
    url: https://arxiv.org/abs/2006.07733
updated: "2026-05-24"
---
## TL;DR
Contrastive learning trains models to recognize what makes examples similar or different, learning representations by pulling positive pairs together and pushing negative pairs apart in embedding space.

## Core Explanation
The contrastive loss (InfoNCE) treats each training example as its own class: the positive pair (augmented version of same image) should be similar; all other examples in the batch are negatives. Key design choices: data augmentation strategy, batch size (larger = more negatives), projection head dimensionality, and temperature parameter.

## Detailed Analysis
CLIP extended contrastive learning to cross-modal pretraining — matching images with their captions across 400M examples. This enables zero-shot transfer: classify images by checking which text description (e.g., "a photo of a dog") has highest cosine similarity with the image embedding.

## Further Reading
- Lilian Weng: Contrastive Representation Learning
- OpenAI CLIP Blog Post
- Papers With Code: Contrastive Learning