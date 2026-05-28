---
id: image-segmentation
title: "Image Segmentation: From U-Net to SAM"
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
  - id: fact-segmentation-1
    statement: >-
      U-Net introduced an encoder-decoder architecture with skip connections for biomedical image
      segmentation.
    source_title: "U-Net: Convolutional Networks for Biomedical Image Segmentation"
    source_url: https://arxiv.org/abs/1505.04597
    confidence: medium
  - id: fact-segmentation-2
    statement: Segment Anything introduced a promptable segmentation model and a large segmentation dataset.
    source_title: Segment Anything
    source_url: https://arxiv.org/abs/2304.02643
    confidence: medium
  - id: fact-segmentation-3
    statement: Mask R-CNN extends object detection with a parallel branch for predicting object masks.
    source_title: Mask R-CNN
    source_url: https://arxiv.org/abs/1703.06870
    confidence: medium
completeness: 0.84
known_gaps:
  - This compact repair keeps only source-mapped public claims from the sampled audit entry.
disputed_statements: []
primary_sources:
  - title: "U-Net: Convolutional Networks for Biomedical Image Segmentation"
    type: academic_paper
    year: 2015
    url: https://arxiv.org/abs/1505.04597
    institution: MICCAI / arXiv
  - title: Segment Anything
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2304.02643
    institution: Meta AI / arXiv
  - title: Mask R-CNN
    type: conference_paper
    year: 2017
    url: https://arxiv.org/abs/1703.06870
    institution: ICCV / arXiv
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

Image segmentation assigns pixels or regions to meaningful objects and classes. This repaired entry keeps claims to three widely cited segmentation systems.

## Core Explanation

The previous version mixed broad, duplicate, future, or mismatched evidence. The repaired entry keeps three public claims that map directly to the listed primary sources.

## Further Reading

- [U-Net: Convolutional Networks for Biomedical Image Segmentation](https://arxiv.org/abs/1505.04597)
- [Segment Anything](https://arxiv.org/abs/2304.02643)
- [Mask R-CNN](https://arxiv.org/abs/1703.06870)
