---
id: geometric-deep-learning
title: "Geometric Deep Learning: Group Equivariance and Symmetry"
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
  - id: af-geometric-deep-learning-1
    statement: >-
      Bronstein, Bruna, Cohen, and Veličković (2021/2023) unified CNNs, GNNs, and Transformers under the Geometric Deep Learning blueprint — convolutional architectures over domains with symmetry
      groups — showing that equivariance to group transformations is the common design principle.
    source_title: Bronstein et al., AI Review (2023)
    source_url: https://link.springer.com/article/10.1007/s10462-023-10502-7
    confidence: high
  - id: af-geometric-deep-learning-2
    statement: >-
      Gauge equivariant CNNs extend convolution to curved manifolds (e.g., spheres, 3D meshes) by defining convolutional filters in local tangent frames connected by parallel transport — enabling CNNs
      on non-Euclidean domains like the cortical surface (brain imaging) and climate data on the sphere.
    source_title: Cohen et al., AI Review / NeurIPS (2019)
    source_url: https://geometricdeeplearning.com/
    confidence: high
primary_sources:
  - id: ps-geometric-deep-learning-1
    title: Geometric Deep Learning and Equivariant Neural Networks
    type: academic_paper
    year: 2023
    institution: AI Review / Springer
    url: https://link.springer.com/article/10.1007/s10462-023-10502-7
  - id: ps-geometric-deep-learning-2
    title: "Geometric Deep Learning: Grids, Groups, Graphs, Geodesics, and Gauges"
    type: textbook
    year: 2021
    institution: arXiv
    url: https://geometricdeeplearning.com/
known_gaps:
  - Efficient equivariant networks at scale
  - Equivariant architectures for video and temporal data
disputed_statements: []
secondary_sources:
  - title: "Geometric Deep Learning: Grids, Groups, Graphs, Geodesics, and Gauges (Bronstein et al. — Seminal Textbook)"
    type: textbook
    year: 2021
    authors:
      - Bronstein, Michael M.
      - Bruna, Joan
      - Cohen, Taco
      - Veličković, Petar
    institution: arXiv / Oxford / DeepMind / Imperial College
    url: https://arxiv.org/abs/2104.13478
  - title: "Geometric Deep Learning and Equivariant Neural Networks: A Comprehensive Survey"
    type: survey_paper
    year: 2023
    authors:
      - Gerken, Jan
      - Aronsson, Jimmy
      - Carlsson, Oscar
      - et al.
    institution: Artificial Intelligence Review (Springer)
    url: https://doi.org/10.1007/s10462-023-10502-7
  - title: Mathematical Foundations of Geometric Deep Learning (Bronstein)
    type: survey_paper
    year: 2025
    authors:
      - Bronstein, Michael M.
    institution: arXiv / USI Lugano
    url: https://arxiv.org/abs/2508.02723
  - title: E(n) Equivariant Graph Neural Networks (EGNN)
    type: conference_paper
    year: 2021
    authors:
      - Satorras, Victor Garcia
      - Hoogeboom, Emiel
      - Welling, Max
    institution: University of Amsterdam / ICML
    url: https://arxiv.org/abs/2102.09844
updated: "2026-05-24"
---
## TL;DR
Geometric Deep Learning reveals that CNNs, GNNs, and Transformers share a common mathematical blueprint — equivariance to symmetry groups. Group-equivariant networks exploit this insight to achieve better sample efficiency and generalization on structured data.

## Core Explanation
Symmetry principle: if a transformation (translation, rotation, permutation) applied to the input should produce a corresponding transformation in the output, the network should respect this equivariance. Traditional CNNs are translation-equivariant by design (shared weights). GDL extends this to arbitrary groups: rotation-equivariant CNNs for medical imaging, permutation-equivariant GNNs for molecular graphs, gauge-equivariant networks for spherical data.

## Detailed Analysis
Group convolution generalizes standard convolution: instead of shifting a filter across spatial positions, transform the filter by all group elements. SE(3)-equivariant networks respect 3D rotation and translation — critical for protein structure prediction and molecular dynamics. Steerable CNNs learn filters expressed as linear combinations of basis functions, guaranteeing equivariance by construction. AlphaFold 2 and 3 leverage SE(3)-equivariant message passing.

## Further Reading
- Geometric Deep Learning Course (AMMI)
- e3nn PyTorch Library
- Equivariant Self-Attention (SE3-Transformer)
