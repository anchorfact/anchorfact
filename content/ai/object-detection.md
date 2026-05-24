---
id: object-detection
title: "Object Detection: YOLO, R-CNN, and DETR"
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
  - id: af-object-detection-1
    statement: >-
      YOLO (You Only Look Once, Redmon et al., 2016) treats object detection as a single regression problem — predicting bounding boxes and class probabilities directly from full images in one
      evaluation, achieving 45 FPS while matching two-stage detectors.
    source_title: Redmon et al., CVPR (2016)
    confidence: high
  - id: af-object-detection-2
    statement: >-
      DETR (DEtection TRansformer, Carion et al., 2020) reformulates object detection as a direct set prediction problem using a transformer encoder-decoder with bipartite matching loss, eliminating
      the need for hand-crafted components like NMS and anchor boxes.
    source_title: Carion et al., ECCV (2020)
    confidence: high
completeness: 0.9
known_gaps:
  - Few-shot object detection
  - 3D object detection (LiDAR, point clouds)
disputed_statements:
  - statement: No major disputed statements identified
primary_sources:
  - title: "You Only Look Once: Unified, Real-Time Object Detection"
    type: academic_paper
    year: 2016
    url: https://arxiv.org/abs/1506.02640
    institution: CVPR
  - title: End-to-End Object Detection with Transformers (DETR)
    type: academic_paper
    year: 2020
    url: https://arxiv.org/abs/2005.12872
    institution: ECCV
secondary_sources:
  - title: "Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks"
    type: conference_paper
    year: 2015
    authors:
      - Ren, Shaoqing
      - He, Kaiming
      - Girshick, Ross
      - Sun, Jian
    institution: Microsoft Research / NeurIPS
    url: https://arxiv.org/abs/1506.01497
  - title: "You Only Look Once: Unified, Real-Time Object Detection (YOLO)"
    type: conference_paper
    year: 2016
    authors:
      - Redmon, Joseph
      - Divvala, Santosh
      - Girshick, Ross
      - Farhadi, Ali
    institution: University of Washington / CVPR
    url: https://arxiv.org/abs/1506.02640
  - title: "DETR: End-to-End Object Detection with Transformers"
    type: conference_paper
    year: 2020
    authors:
      - Carion, Nicolas
      - Massa, Francisco
      - Synnaeve, Gabriel
      - Usunier, Nicolas
      - Kirillov, Alexander
      - Zagoruyko, Sergey
    institution: Facebook AI Research / ECCV
    url: https://arxiv.org/abs/2005.12872
  - title: "A Comprehensive Survey of Deep Learning-Based Object Detection: From CNNs to Transformers"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: IEEE TPAMI
    url: https://doi.org/10.1109/TPAMI.2024.3385267
updated: "2026-05-24"
---
## TL;DR
Object detection identifies and localizes objects within images. Two-stage detectors (R-CNN family) prioritize accuracy; single-stage detectors (YOLO, SSD) prioritize speed; transformer-based detectors (DETR) simplify the pipeline.

## Core Explanation
R-CNN progression: R-CNN (region proposals + CNN) → Fast R-CNN (shared convolutions) → Faster R-CNN (Region Proposal Network) → Mask R-CNN (adds instance segmentation). YOLO divides the image into a grid, predicting bounding boxes and class probabilities per cell. DETR uses learned object queries as input to a transformer decoder.

## Detailed Analysis
Anchor boxes were the dominant approach for years — predefined bounding box templates at multiple scales and aspect ratios. Anchor-free methods (CornerNet, CenterNet) and transformer methods (DETR, Deformable DETR) have simplified detection pipelines. Non-maximum suppression (NMS) remains essential for removing duplicate predictions.

## Further Reading
- Papers With Code: Object Detection
- YOLO Official Documentation (Ultralytics)
- MMDetection Open-source Toolbox