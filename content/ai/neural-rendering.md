---
id: "neural-rendering"
title: "Neural Rendering: NeRF, View Synthesis, and Implicit Scene Representations"
schema_type: "article"
category: "ai"
language: "en"
confidence: "high"
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: "ai_assisted"
ai_models: ["claude-4.5-sonnet"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"
completeness: 0.85
atomic_facts:
  - id: "af-neural-rendering-1"
    statement: "NeRF (Neural Radiance Fields, Mildenhall et al., ECCV 2020) represented a scene as a continuous 5D function mapping 3D coordinates and 2D viewing direction to emitted color and volume density, trained from sparse input views. A 2020-2025 comprehensive survey (arxiv/Waterloo) documents the field's evolution to real-time rendering (Instant-NGP reducing training from hours to seconds via hash-grid encoding) and large-scale scenes (Block-NeRF rendering city blocks)."
    source_title: "NeRF, Mildenhall et al., ECCV 2020 / arxiv 2210.00379 (2025 update) -- NeRF 2020-2025 survey (Waterloo) / Instant-NGP (Muller et al., SIGGRAPH 2022)"
    source_url: "https://arxiv.org/abs/2003.08934"
    confidence: "high"
  - id: "af-neural-rendering-2"
    statement: "3D Gaussian Splatting (Kerbl et al., SIGGRAPH 2023 Best Paper) disrupted NeRF -- representing scenes as millions of 3D Gaussians with learnable position, covariance, color, and opacity -- enabling real-time differentiable rendering at 30+ FPS with quality matching NeRF. MDPI (2025) comparative assessment found 3DGS achieves 100-1000x faster rendering than NeRF, making it the dominant approach for production applications."
    source_title: "3D Gaussian Splatting (Kerbl et al., SIGGRAPH 2023 Best Paper) / MDPI Sensors (2025) -- Comparative Assessment of NeRF and 3DGS"
    source_url: "https://arxiv.org/abs/2308.04079"
    confidence: "high"
primary_sources:
  - id: "ps-neural-rendering-1"
    title: "NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis"
    type: "academic_paper"
    year: 2020
    institution: "ECCV / UC Berkeley, Google Research"
    url: "https://arxiv.org/abs/2003.08934"
  - id: "ps-neural-rendering-2"
    title: "3D Gaussian Splatting for Real-Time Radiance Field Rendering"
    type: "academic_paper"
    year: 2023
    institution: "ACM SIGGRAPH / INRIA, Max Planck"
    url: "https://arxiv.org/abs/2308.04079"
known_gaps:
  - "Dynamic scene rendering -- handling moving objects and changing lighting"
  - "Large-scale outdoor neural rendering with unbounded scenes"
disputed_statements: []
---

## TL;DR
Neural rendering creates photorealistic 3D scenes from photographs -- capturing a place or object and rendering it from any viewpoint. From NeRF (Neural Radiance Fields) to 3D Gaussian Splatting, these techniques are transforming computer graphics, VR, and digital heritage preservation.

## Core Explanation
Novel view synthesis: given images of a scene from different angles, generate a photorealistic image from any new viewpoint. Neural approach (NeRF): train a neural network F(x, y, z, theta, phi) -> (R, G, B, sigma) mapping every 3D point and viewing direction to color and density. To render a pixel: march a ray through the scene, sample points, query network at each point, accumulate color using volume rendering. The network IS the scene representation -- no explicit mesh or point cloud.

## Detailed Analysis
NeRF training: for each training image, sample random pixels, cast rays, minimize MSE between rendered and ground-truth colors. Instant-NGP: multi-resolution hash-grid encoding replaces positional encoding, enabling 100-1000x faster training (5 seconds vs hours). 3D Gaussian Splatting (2023): represent scene as 3D Gaussians with position, covariance, opacity, spherical harmonics. Rendering is rasterization of projected Gaussians -- orders of magnitude faster than NeRF's ray marching. Applications: VR scene capture (Luma AI, Polycam -- create 3D from phone video), movie VFX (digital set capture), cultural heritage digitization, real estate virtual tours. Key challenge: dynamic scenes -- NeRF/3DGS assume static scenes. Dynamic extensions (D-NeRF, 4DGS) exist but are less mature. The 2025 survey identifies outdoor, large-scale, and dynamic rendering as the key frontiers.
