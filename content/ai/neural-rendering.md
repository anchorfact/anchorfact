---
id: neural-rendering
title: "Neural Rendering: NeRF, View Synthesis, and Implicit Scene Representations"
schema_type: article
category: ai
language: en
confidence: high
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
    statement: >-
      NeRF (Mildenhall et al. 2020, Google/UC Berkeley) represents scenes as continuous volumetric radiance fields parameterized by MLPs, enabling photorealistic novel view synthesis from sparse 2D
      images.
    source_title: "Mildenhall, Ben, et al. NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis. ECCV 2020"
    source_url: https://arxiv.org/abs/2003.08934
    confidence: high
  - id: f2
    statement: >-
      3D Gaussian Splatting (Kerbl et al. 2023, Inria) achieved real-time radiance field rendering by representing scenes as 3D Gaussians with differentiable rasterization, winning SIGGRAPH 2023 Best
      Paper.
    source_title: Kerbl, Bernhard, et al. 3D Gaussian Splatting for Real-Time Radiance Field Rendering. SIGGRAPH 2023
    source_url: https://arxiv.org/abs/2308.04079
    confidence: high
  - id: f3
    statement: Instant NGP (Müller et al. 2022, NVIDIA) introduced multi-resolution hash encoding that accelerates NeRF training from hours to seconds, enabling real-time neural graphics applications.
    source_title: Müller, Thomas, et al. Instant Neural Graphics Primitives with a Multiresolution Hash Encoding. SIGGRAPH 2022
    source_url: https://doi.org/10.1145/3528223.3530127
    confidence: high
primary_sources:
  - id: ps-neural-rendering-1
    title: "NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis"
    type: academic_paper
    year: 2020
    institution: ECCV / UC Berkeley, Google Research
    url: https://arxiv.org/abs/2003.08934
  - id: ps-neural-rendering-2
    title: 3D Gaussian Splatting for Real-Time Radiance Field Rendering
    type: academic_paper
    year: 2023
    institution: ACM SIGGRAPH / INRIA, Max Planck
    url: https://arxiv.org/abs/2308.04079
known_gaps:
  - Dynamic scene rendering -- handling moving objects and changing lighting
  - Large-scale outdoor neural rendering with unbounded scenes
disputed_statements: []
secondary_sources:
  - title: "NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis"
    type: conference_paper
    year: 2020
    authors:
      - Mildenhall, Ben
      - Srinivasan, Pratul P.
      - Tancik, Matthew
      - Barron, Jonathan T.
      - Ramamoorthi, Ravi
      - Ng, Ren
    institution: Google Research / UC Berkeley / ECCV
    url: https://arxiv.org/abs/2003.08934
  - title: "NeRF: Neural Radiance Field in 3D Vision — A Comprehensive Review"
    type: survey_paper
    year: 2022
    authors:
      - multiple
    institution: arXiv
    url: https://arxiv.org/abs/2210.00379
  - title: "NeRF-based Multi-View Synthesis Techniques: A Survey"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: IEEE Access
    url: https://doi.org/10.1109/ACCESS.2024.3406987
  - title: "A Survey of 3D Reconstruction: From Multi-View Geometry to NeRF and 3D Gaussian Splatting"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: Sensors (MDPI)
    url: https://doi.org/10.3390/s25185748
updated: "2026-05-24"
---
## TL;DR
Neural rendering creates photorealistic 3D scenes from photographs -- capturing a place or object and rendering it from any viewpoint. From NeRF (Neural Radiance Fields) to 3D Gaussian Splatting, these techniques are transforming computer graphics, VR, and digital heritage preservation.

## Core Explanation
Novel view synthesis: given images of a scene from different angles, generate a photorealistic image from any new viewpoint. Neural approach (NeRF): train a neural network F(x, y, z, theta, phi) -> (R, G, B, sigma) mapping every 3D point and viewing direction to color and density. To render a pixel: march a ray through the scene, sample points, query network at each point, accumulate color using volume rendering. The network IS the scene representation -- no explicit mesh or point cloud.

## Detailed Analysis
NeRF training: for each training image, sample random pixels, cast rays, minimize MSE between rendered and ground-truth colors. Instant-NGP: multi-resolution hash-grid encoding replaces positional encoding, enabling 100-1000x faster training (5 seconds vs hours). 3D Gaussian Splatting (2023): represent scene as 3D Gaussians with position, covariance, opacity, spherical harmonics. Rendering is rasterization of projected Gaussians -- orders of magnitude faster than NeRF's ray marching. Applications: VR scene capture (Luma AI, Polycam -- create 3D from phone video), movie VFX (digital set capture), cultural heritage digitization, real estate virtual tours. Key challenge: dynamic scenes -- NeRF/3DGS assume static scenes. Dynamic extensions (D-NeRF, 4DGS) exist but are less mature. The 2025 survey identifies outdoor, large-scale, and dynamic rendering as the key frontiers.

## Related Articles

- [NeRF: Neural Radiance Fields for View Synthesis](../nerf-neural-radiance-fields-for-view-synthesis.md)
- [Neural Radiance Fields (NeRF): 3D Scene Representation from Images](../../computer-science/neural-radiance-fields-nerf-3d-scene-representation-from-images.md)
- [3D Generation and Gaussian Splatting: From NeRF to Real-Time Rendering](../3d-generation-gaussian-splatting.md)