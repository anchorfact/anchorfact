---
id: "self-supervised-learning"
title: "Self-Supervised Learning: Learning Without Labels"
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
  - id: "af-self-supervised-learning-1"
    statement: "Self-supervised learning (SSL) creates supervised signals from unlabeled data through pretext tasks — masked language modeling (BERT), next sentence prediction, image rotation prediction, or contrastive instance discrimination."
    source_title: "LeCun, AAAI 2020 Talk"
    confidence: "high"
  - id: "af-self-supervised-learning-2"
    statement: "SimCLR (Chen et al., 2020) demonstrated that contrastive learning with strong data augmentation, a nonlinear projection head, and large batch sizes can match or exceed supervised pretraining on ImageNet."
    source_title: "Chen et al., ICML (2020)"
    confidence: "high"

completeness: 0.9

known_gaps:
  - "Multi-modal SSL (CLIP, ALIGN)"
  - "SSL for structured data (tabular, graph)"

disputed_statements:
  - statement: "No major disputed statements identified"

primary_sources:
  - title: "A Simple Framework for Contrastive Learning of Visual Representations (SimCLR)"
    type: "academic_paper"
    year: 2020
    url: "https://arxiv.org/abs/2002.05709"
    institution: "ICML"
  - title: "BERT: Pre-training of Deep Bidirectional Transformers"
    type: "academic_paper"
    year: 2019
    url: "https://arxiv.org/abs/1810.04805"
    institution: "NAACL"

---


## TL;DR
Self-supervised learning extracts supervisory signals from unlabeled data, enabling models to learn useful representations without expensive human annotation. SSL underpins modern pretraining of foundation models.

## Core Explanation
Pretext tasks: masked language modeling (predict masked words from context — BERT), contrastive learning (pull similar instances together, push dissimilar apart — SimCLR, MoCo), and generative approaches (reconstruct corrupted input — masked autoencoders). The learned representations transfer to downstream tasks with minimal labeled data.

## Detailed Analysis
BYOL (Grill et al., 2020) eliminated negative pairs — using a momentum encoder and predictor to prevent representational collapse without contrastive loss. MAE (He et al., 2022) masks 75% of image patches, forcing the model to learn semantic understanding from sparse visible pixels.

## Further Reading
- LeCun: Self-Supervised Learning (AAAI 2020 Keynote)
- Lilian Weng: Self-Supervised Representation Learning
- Papers With Code: Self-Supervised Learning