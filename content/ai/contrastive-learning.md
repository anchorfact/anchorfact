---
id: contrastive-learning
title: "Contrastive Learning: SimCLR, MoCo, and CLIP"
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
  - id: fact-cl-1
    statement: >-
      SimCLR (Chen et al. 2020) demonstrated that a simple framework combining data augmentation, a learnable nonlinear projection head, and contrastive loss can achieve state-of-the-art
      self-supervised visual representations.
    source_title: Chen, Ting, Simon Kornblith, Mohammad Norouzi, and Geoffrey Hinton. A Simple Framework for Contrastive Learning of Visual Representations. ICML 2020
    source_url: https://arxiv.org/abs/2002.05709
    confidence: high
  - id: fact-cl-2
    statement: MoCo (He et al. 2020) maintains a dynamic dictionary with a queue and a moving-averaged encoder, enabling contrastive learning with large and consistent negative sample sets.
    source_title: He, Kaiming, Haoqi Fan, Yuxin Wu, Saining Xie, and Ross Girshick. Momentum Contrast for Unsupervised Visual Representation Learning. CVPR 2020
    source_url: https://arxiv.org/abs/1911.05722
    confidence: high
  - id: fact-cl-3
    statement: >-
      BYOL (Grill et al. 2020, DeepMind) showed that contrastive learning can work without negative pairs, using a target network updated via exponential moving average to avoid representational
      collapse.
    source_title: Grill, Jean-Bastien, et al. Bootstrap Your Own Latent. NeurIPS 2020
    source_url: https://arxiv.org/abs/2006.07733
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