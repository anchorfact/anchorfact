---
id: kb-2026-00275
title: Computer Vision
schema_type: TechArticle
category: ai
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: ai_assisted
ai_models:
  - claude-opus
derived_from_human_seed: true
atomic_facts:
  - id: fact-ai-001
    statement: >-
      Computer Vision enables machines to extract meaning from visual data. Key tasks: image classification (what is this?), object detection (where is it? + bounding box), segmentation (pixel-level
      labeling), pose estimation, depth estimation, 3D reconstruction. Deep learning (CNN, ViT) dominates since 2012.
    confidence: high
    source_url: https://szeliski.org/Book/
    source_title: "Computer Vision: Algorithms and Applications (2nd Ed)"
primary_sources:
  - title: "Computer Vision: Algorithms and Applications (2nd Ed)"
    type: textbook
    year: 2022
    url: https://szeliski.org/Book/
    institution: Springer
    authors:
      - Szeliski, Richard
  - title: ImageNet Classification with Deep Convolutional Neural Networks (AlexNet)
    type: academic_paper
    year: 2012
    url: https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html
    institution: NIPS / NeurIPS
    authors:
      - Krizhevsky
      - Sutskever
      - Hinton
secondary_sources:
  - title: "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale (ViT)"
    type: academic_paper
    year: 2020
    url: https://arxiv.org/abs/2010.11929
    institution: Google Research
    authors:
      - Dosovitskiy
      - Beyer
      - Kolesnikov
      - et al.
known_gaps:
  - Statistics and data cited are from 2024 and earlier; more recent developments may have become available since publication
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
disputed_statements:
  - statement: >-
      The relative merits of CNN-based vs Transformer-based vision architectures remain actively debated; ViT models excel with large-scale pretraining while CNNs retain advantages in data-efficient
      regimes
    context: See ViT paper and ConvNeXt comparison
completeness: 0.85
---
## TL;DR

Computer Vision enables machines to extract meaning from visual data. Key tasks: image classification (what is this?), object detection (where is it? + bounding box), segmentation (pixel-level labeling), pose estimation, depth estimation, 3D reconstruction. Deep learning (CNN, ViT) dominates since 2012.

## Core Explanation

Object detection: R-CNN family (region proposals), YOLO (single shot, real-time), DETR (Transformer-based). Segmentation: U-Net (biomedical), Mask R-CNN, SAM (Segment Anything Model, Meta 2023). Vision Transformer (ViT, 2020): apply Transformer to image patches — competitive with CNNs. Multimodal: CLIP (OpenAI 2021) learns joint image-text embeddings.

## Further Reading

- [Computer Vision: Algorithms and Applications (2nd Ed, Szeliski)](https://szeliski.org/Book/)
