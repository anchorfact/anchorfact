---
id: contrastive-learning
title: "Contrastive Learning: SimCLR, MoCo, and CLIP"
schema_type: TechArticle
category: ai
language: en
confidence: high
last_verified: "2026-05-28"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-contrastive-1
    statement: >-
      SimCLR showed that strong augmentations, a nonlinear projection head, and contrastive loss can learn
      effective visual representations without labels.
    source_title: A Simple Framework for Contrastive Learning of Visual Representations
    source_url: https://arxiv.org/abs/2002.05709
    confidence: low
  - id: fact-contrastive-2
    statement: >-
      MoCo used a queue and momentum encoder to maintain a large and consistent dictionary of negative
      examples for contrastive learning.
    source_title: Momentum Contrast for Unsupervised Visual Representation Learning
    source_url: https://arxiv.org/abs/1911.05722
    confidence: low
  - id: fact-contrastive-3
    statement: >-
      CLIP trained image and text encoders with natural-language supervision to learn transferable visual
      models.
    source_title: Learning Transferable Visual Models From Natural Language Supervision
    source_url: https://arxiv.org/abs/2103.00020
    confidence: low
completeness: 0.86
known_gaps:
  - This compact entry does not cover non-contrastive self-supervised approaches such as BYOL in depth.
disputed_statements: []
primary_sources:
  - title: A Simple Framework for Contrastive Learning of Visual Representations
    type: conference_paper
    year: 2020
    url: https://arxiv.org/abs/2002.05709
    institution: ICML / Google Research
    authors:
      - Ting Chen
      - Simon Kornblith
      - Mohammad Norouzi
      - Geoffrey Hinton
  - title: Momentum Contrast for Unsupervised Visual Representation Learning
    type: conference_paper
    year: 2020
    url: https://arxiv.org/abs/1911.05722
    institution: CVPR / Facebook AI Research
    authors:
      - Kaiming He
      - Haoqi Fan
      - Yuxin Wu
      - Saining Xie
      - Ross Girshick
  - title: Learning Transferable Visual Models From Natural Language Supervision
    type: conference_paper
    year: 2021
    url: https://arxiv.org/abs/2103.00020
    institution: ICML / OpenAI
    authors:
      - Alec Radford
      - Jong Wook Kim
      - Chris Hallacy
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

Contrastive learning trains representations by bringing related views closer and pushing unrelated examples apart. This repair removes duplicate source metadata and aligns the public claims to SimCLR, MoCo, and CLIP.

## Core Explanation

SimCLR emphasizes augmentation and projection heads, MoCo emphasizes a momentum dictionary, and CLIP extends contrastive pretraining across image-text pairs.

## Further Reading

- [SimCLR](https://arxiv.org/abs/2002.05709)
- [MoCo](https://arxiv.org/abs/1911.05722)
- [CLIP](https://arxiv.org/abs/2103.00020)

## Related Articles

- [CLIP](../clip-contrastive-language-image-pre-training.md)
- [Self-Supervised Learning](../self-supervised-learning.md)
