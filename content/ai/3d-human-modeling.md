---
id: 3d-human-modeling
title: "3D Human Modeling: Parametric Body Models, Mesh Recovery, and Digital Avatars"
schema_type: article
category: ai
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.85
atomic_facts:
  - id: af-3d-human-modeling-1
    statement: >-
      The SMPL paper introduced a skinned multi-person linear body model learned from registered
      body scans, with separate parameters for body shape and pose.
    source_title: "SMPL: A Skinned Multi-Person Linear Model"
    source_url: https://doi.org/10.1145/2816795.2818013
    confidence: medium
  - id: af-3d-human-modeling-2
    statement: >-
      HMR reconstructs a full 3D human body mesh from a single RGB image by directly inferring SMPL
      shape and 3D pose parameters.
    source_title: End-to-end Recovery of Human Shape and Pose
    source_url: https://arxiv.org/abs/1712.06584
    confidence: medium
  - id: af-3d-human-modeling-3
    statement: >-
      SMPL-X extends SMPL with articulated hands and an expressive face, supporting full-body
      fitting from a single monocular image.
    source_title: "Expressive Body Capture: 3D Hands, Face, and Body from a Single Image"
    source_url: https://arxiv.org/abs/1904.05866
    confidence: medium
primary_sources:
  - id: ps-3d-human-modeling-1
    title: "SMPL: A Skinned Multi-Person Linear Model"
    type: academic_paper
    year: 2015
    authors:
      - Loper, Matthew
      - Mahmood, Naureen
      - Romero, Javier
      - Pons-Moll, Gerard
      - Black, Michael J.
    institution: ACM Transactions on Graphics
    url: https://doi.org/10.1145/2816795.2818013
    doi: 10.1145/2816795.2818013
  - id: ps-3d-human-modeling-2
    title: End-to-end Recovery of Human Shape and Pose
    type: academic_paper
    year: 2018
    authors:
      - Kanazawa, Angjoo
      - Black, Michael J.
      - Jacobs, David W.
      - Malik, Jitendra
    institution: CVPR / arXiv
    url: https://arxiv.org/abs/1712.06584
  - id: ps-3d-human-modeling-3
    title: "Expressive Body Capture: 3D Hands, Face, and Body from a Single Image"
    type: academic_paper
    year: 2019
    authors:
      - Pavlakos, Georgios
      - Choutas, Vasileios
      - Ghorbani, Nima
      - Bolkart, Timo
      - Osman, Ahmed A. A.
      - Tzionas, Dimitrios
      - Black, Michael J.
    institution: CVPR / arXiv
    url: https://arxiv.org/abs/1904.05866
known_gaps:
  - >-
    Clothed-body reconstruction and garment dynamics require separate models beyond basic body
    shape.
  - Single-view 3D recovery remains ambiguous under occlusion and unusual camera viewpoints.
disputed_statements: []
secondary_sources: []
updated: "2026-05-28"
---
## TL;DR
3D human modeling estimates body shape, pose, and mesh geometry from images or video. The public evidence here is narrowed to three well-specified sources: SMPL for parametric body modeling, HMR for single-image mesh recovery, and SMPL-X for hands and face.

## Core Explanation
SMPL made 3D human modeling practical by representing body shape and pose with a compact, learned, animatable model. HMR then showed how a neural model could infer SMPL pose and shape from a single RGB image. SMPL-X broadened the representation to include hands and facial expression, which is important for expressive avatars and richer human capture.

## Related Articles

- [Human Pose Estimation: 2D/3D Keypoint Detection and Transformer-Based Body Tracking](../human-pose-estimation.md)
- [Neural Rendering: NeRFs, Gaussian Splatting, and Differentiable Scene Representations](../neural-rendering.md)
- [Computer Vision: Convolution, Feature Detection, and Image Understanding](../../computer-science/computer-vision-convolution-feature-detection-and-image-understanding.md)
