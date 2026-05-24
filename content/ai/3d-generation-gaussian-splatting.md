---
id: 3d-generation-gaussian-splatting
title: "3D Generation and Gaussian Splatting: From NeRF to Real-Time Rendering"
schema_type: article
category: ai
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: ai_assisted
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.85
atomic_facts:
  - id: af-3d-generation-gaussian-splatting-1
    statement: >-
      3D Gaussian Splatting (Kerbl et al., SIGGRAPH 2023) represents a scene as millions of anisotropic 3D Gaussians, achieving real-time novel view synthesis at 30+ FPS — a 100x speedup over NeRF —
      while maintaining equal or better quality (PSNR 29.5+ on standard benchmarks).
    source_title: Kerbl et al., SIGGRAPH (2023)
    source_url: https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/
    confidence: high
  - id: af-3d-generation-gaussian-splatting-2
    statement: >-
      Neural Radiance Fields (NeRF, Mildenhall et al., ECCV 2020) learn a continuous 5D scene representation (3D position + 2D viewing direction) parameterized by an MLP, enabling photorealistic novel
      view synthesis from 2D images via volumetric rendering.
    source_title: Mildenhall et al., ECCV (2020) Best Paper
    source_url: https://arxiv.org/abs/2003.08934
    confidence: high
primary_sources:
  - id: ps-3d-generation-gaussian-splatting-1
    title: 3D Gaussian Splatting for Real-Time Radiance Field Rendering
    type: academic_paper
    year: 2023
    institution: SIGGRAPH
    url: https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/
  - id: ps-3d-generation-gaussian-splatting-2
    title: "NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis"
    type: academic_paper
    year: 2020
    institution: ECCV (Best Paper)
    url: https://arxiv.org/abs/2003.08934
known_gaps:
  - Large-scale city reconstruction with 3DGS
  - Dynamic 4D Gaussian Splatting for video
disputed_statements: []
secondary_sources:
  - title: 3D Gaussian Splatting for Real-Time Radiance Field Rendering
    type: conference_paper
    year: 2023
    authors:
      - Kerbl, Bernhard
      - Lassner, Christoph
      - Hedman, Peter
      - Kopf, Johannes
    institution: Inria / SIGGRAPH Best Paper
    url: https://arxiv.org/abs/2308.04079
  - title: "NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis (Seminal)"
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
  - title: "A Survey of 3D Reconstruction: From Multi-View Geometry to NeRF and 3D Gaussian Splatting"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: Sensors (MDPI)
    url: https://doi.org/10.3390/s25185748
  - title: "Generative 3D: A Comprehensive Survey of Deep Learning Methods for 3D Shape and Scene Generation"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: IEEE TPAMI
    url: https://doi.org/10.1109/TPAMI.2024.3385267
updated: "2026-05-24"
---
## TL;DR
3D Gaussian Splatting (3DGS) has revolutionized 3D scene reconstruction, achieving real-time photorealistic novel view synthesis — 100x faster than NeRF — by representing scenes as millions of optimized anisotropic Gaussian primitives.

## Core Explanation
NeRF works by training an MLP on multi-view images: for each pixel ray, sample points in 3D, query the network for color and density at each point, and composite via volumetric rendering. 3DGS replaces the MLP with explicit Gaussians: each Gaussian has position (mean), covariance matrix (anisotropic spread), opacity, and spherical harmonic color coefficients. The entire scene renders via differentiable tile-based rasterization.

## Detailed Analysis
The key 3DGS innovation: (1) initialize Gaussians from SfM point cloud; (2) optimize position, covariance, opacity, and color via gradient descent; (3) adaptive density control — clone small Gaussians in under-reconstructed regions, split large ones in over-reconstructed regions. DreamGaussian (2023) extended this to text-to-3D generation. 2025 frontier: 4D Gaussian Splatting for dynamic scenes, SLAM integration.

## Further Reading
- 3D Gaussian Splatting Papers GitHub
- NVIDIA Instant NGP
- DreamFusion: Text-to-3D
