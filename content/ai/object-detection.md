---
id: object-detection
title: "Object Detection: YOLO, R-CNN, and DETR"
schema_type: TechArticle
category: ai
language: en
confidence: medium
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
  - id: fact-object-detection-1
    statement: >-
      R-CNN combines region proposals with convolutional neural network features for object
      detection.
    source_title: Rich feature hierarchies for accurate object detection and semantic segmentation
    source_url: https://arxiv.org/abs/1311.2524
    confidence: medium
  - id: fact-object-detection-2
    statement: Faster R-CNN introduced a Region Proposal Network for end-to-end object detection.
    source_title: "Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks"
    source_url: https://arxiv.org/abs/1506.01497
    confidence: medium
  - id: fact-object-detection-3
    statement: >-
      YOLO frames object detection as a single regression problem from image pixels to bounding
      boxes and class probabilities.
    source_title: "You Only Look Once: Unified, Real-Time Object Detection"
    source_url: https://arxiv.org/abs/1506.02640
    confidence: medium
completeness: 0.9
known_gaps:
  - This compact repair keeps only source-mapped public claims from the sampled audit entry.
disputed_statements: []
primary_sources:
  - title: Rich feature hierarchies for accurate object detection and semantic segmentation
    type: academic_paper
    year: 2014
    url: https://arxiv.org/abs/1311.2524
    institution: CVPR / arXiv
  - title: "Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks"
    type: academic_paper
    year: 2015
    url: https://arxiv.org/abs/1506.01497
    institution: NeurIPS / arXiv
  - title: "You Only Look Once: Unified, Real-Time Object Detection"
    type: academic_paper
    year: 2016
    url: https://arxiv.org/abs/1506.02640
    institution: CVPR / arXiv
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

Object detection localizes and classifies objects in images, with R-CNN, Faster R-CNN, and YOLO as major model families. This repair maps claims to primary papers.

## Core Explanation

The previous entry had partial source coverage. This version keeps three source-backed object-detection milestones.

## Further Reading

- [Rich feature hierarchies for accurate object detection and semantic segmentation](https://arxiv.org/abs/1311.2524)
- [Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks](https://arxiv.org/abs/1506.01497)
- [You Only Look Once: Unified, Real-Time Object Detection](https://arxiv.org/abs/1506.02640)
