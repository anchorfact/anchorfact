---
id: neural-rendering
title: "Neural Rendering: NeRF, View Synthesis, and Implicit Scene Representations"
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
  - id: fact-neural-rendering-1
    statement: NeRF represents scenes with a neural radiance field for novel view synthesis.
    source_title: "NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis"
    source_url: https://arxiv.org/abs/2003.08934
    confidence: medium
  - id: fact-neural-rendering-2
    statement: >-
      Mip-NeRF improves NeRF rendering quality by representing conical frustums instead of single
      rays.
    source_title: "Mip-NeRF: A Multiscale Representation for Anti-Aliasing Neural Radiance Fields"
    source_url: https://arxiv.org/abs/2103.13415
    confidence: medium
  - id: fact-neural-rendering-3
    statement: 3D Gaussian Splatting uses anisotropic 3D Gaussians for real-time radiance field rendering.
    source_title: 3D Gaussian Splatting for Real-Time Radiance Field Rendering
    source_url: https://arxiv.org/abs/2308.04079
    confidence: medium
primary_sources:
  - title: "NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis"
    type: academic_paper
    year: 2020
    url: https://arxiv.org/abs/2003.08934
    institution: ECCV / arXiv
  - title: "Mip-NeRF: A Multiscale Representation for Anti-Aliasing Neural Radiance Fields"
    type: academic_paper
    year: 2021
    url: https://arxiv.org/abs/2103.13415
    institution: ICCV / arXiv
  - title: 3D Gaussian Splatting for Real-Time Radiance Field Rendering
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2308.04079
    institution: ACM TOG / arXiv
known_gaps:
  - This compact repair keeps only source-mapped public claims from the sampled audit entry.
disputed_statements: []
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

Neural rendering uses learned scene representations to synthesize views, from NeRF to 3D Gaussian Splatting. This repair maps rendering claims to primary papers.

## Core Explanation

The prior article had weak source coverage. This version keeps three direct claims about NeRF, mip-NeRF, and 3D Gaussian Splatting.

## Further Reading

- [NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis](https://arxiv.org/abs/2003.08934)
- [Mip-NeRF: A Multiscale Representation for Anti-Aliasing Neural Radiance Fields](https://arxiv.org/abs/2103.13415)
- [3D Gaussian Splatting for Real-Time Radiance Field Rendering](https://arxiv.org/abs/2308.04079)
