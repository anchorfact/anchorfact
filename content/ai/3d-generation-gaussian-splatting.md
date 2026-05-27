---
id: 3d-generation-gaussian-splatting
title: "3D Generation and Gaussian Splatting: From NeRF to Real-Time Rendering"
schema_type: article
category: ai
language: en
confidence: medium
last_verified: "2026-05-24"
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
  - id: f1
    statement: 3D Gaussian Splatting represents a scene as optimized anisotropic 3D Gaussians and renders them with a differentiable tile-based splatting pipeline.
    source_title: 3D Gaussian Splatting for Real-Time Radiance Field Rendering
    source_url: https://arxiv.org/abs/2308.04079
    confidence: medium
  - id: f2
    statement: NeRF represents scenes as neural radiance fields and synthesizes novel views by sampling points along camera rays.
    source_title: "NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis"
    source_url: https://arxiv.org/abs/2003.08934
    confidence: medium
  - id: f3
    statement: DreamFusion uses a pretrained text-to-image diffusion model to optimize a NeRF-like 3D representation from text prompts.
    source_title: "DreamFusion: Text-to-3D using 2D Diffusion"
    source_url: https://arxiv.org/abs/2209.14988
    confidence: medium
primary_sources:
  - id: ps-3d-generation-gaussian-splatting-1
    title: 3D Gaussian Splatting for Real-Time Radiance Field Rendering
    type: academic_paper
    year: 2023
    institution: SIGGRAPH
    url: https://arxiv.org/abs/2308.04079
  - id: ps-3d-generation-gaussian-splatting-2
    title: "NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis"
    type: academic_paper
    year: 2020
    institution: ECCV
    url: https://arxiv.org/abs/2003.08934
  - id: ps-3d-generation-gaussian-splatting-3
    title: "DreamFusion: Text-to-3D using 2D Diffusion"
    type: academic_paper
    year: 2022
    institution: arXiv
    url: https://arxiv.org/abs/2209.14988
known_gaps:
  - Large-scale city reconstruction with 3D Gaussian Splatting
  - Dynamic 4D Gaussian Splatting for video
disputed_statements: []
secondary_sources: []
updated: "2026-05-24"
---

## TL;DR

3D Gaussian Splatting is a neural rendering technique that represents a scene as many optimized 3D Gaussian primitives. Compared with NeRF-style implicit MLP representations, it is designed for fast differentiable rasterization and real-time novel view synthesis.

## Core Explanation

NeRF represents a scene as a neural radiance field queried along camera rays. 3D Gaussian Splatting instead optimizes explicit 3D Gaussians with position, covariance, opacity, and appearance parameters. Text-to-3D methods such as DreamFusion show a related generative direction, using diffusion-model guidance to optimize 3D representations from text prompts.

## Detailed Analysis

3DGS usually starts from a sparse reconstruction or point cloud, then optimizes Gaussian parameters and densifies the representation during training. It is best viewed as part of a broader neural rendering family that includes NeRF, point-based rendering, and text-guided 3D generation.

## Further Reading

- [3D Gaussian Splatting for Real-Time Radiance Field Rendering](https://arxiv.org/abs/2308.04079)
- [NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis](https://arxiv.org/abs/2003.08934)
- [DreamFusion: Text-to-3D using 2D Diffusion](https://arxiv.org/abs/2209.14988)

## Related Articles

- [AI for Call Centers: Speech Analytics, Real-Time Agent Assist, and Sentiment Detection](../ai-call-center.md)
- [AI for Augmented Reality: Real-Time Object Detection, Depth Estimation, and Scene Understanding](../ai-for-augmented-reality-real-time-object-detection-depth-estimation-and-scene-understanding.md)
- [AI for Augmented Reality: Real-Time Scene Understanding, Spatial Computing, and Contextual Overlays](../ai-for-augmented-reality.md)
