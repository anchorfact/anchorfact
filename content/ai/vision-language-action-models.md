---
id: vision-language-action-models
title: "Vision-Language-Action Models: Unified Multimodal Foundation Models for Embodied AI"
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
  - id: af-vision-language-action-models-1
    statement: >-
      A comprehensive VLA survey (arxiv 2505.04769, May 2025) and ScienceDirect review (2026) traced the evolution from cross-modal learning architectures to generalist embodied agents — VLA models
      unify visual perception (cameras, LiDAR), language understanding (instructions, dialogue), and action generation (robot arm trajectories, navigation commands) within a single transformer-based
      architecture, enabling zero-shot task generalization across unseen environments.
    source_title: "arxiv 2505.04769 (2025) — VLA Models: Concepts, Methods, Applications / ScienceDirect Information Fusion (2026) — VLA multimodal survey"
    source_url: https://arxiv.org/abs/2505.04769
    confidence: high
  - id: af-vision-language-action-models-2
    statement: >-
      Nature (January 2026) published Emu3 — demonstrating that a single next-token prediction objective can unify text, image, and video generation and perception within one model, matching
      task-specific SOTA methods. This "everything is a token" paradigm directly enables VLA systems where the same transformer predicts both language responses and robot control actions from
      multimodal input sequences.
    source_title: "Nature (2026) — Emu3: Multimodal learning with next-token prediction — doi:10.1038/s41586-025-10041-x"
    source_url: https://www.nature.com/articles/s41586-025-10041-x
    confidence: high
primary_sources:
  - id: ps-vision-language-action-models-1
    title: "Vision-Language-Action (VLA) Models: Concepts, Methods, and Applications (Comprehensive Survey)"
    type: academic_paper
    year: 2025
    institution: arXiv / ScienceDirect
    url: https://arxiv.org/abs/2505.04769
  - id: ps-vision-language-action-models-2
    title: "Emu3: Multimodal learning with next-token prediction for large multimodal models"
    type: academic_paper
    year: 2026
    institution: Nature
    doi: 10.1038/s41586-025-10041-x
    url: https://www.nature.com/articles/s41586-025-10041-x
known_gaps:
  - Safety verification of VLA actions in human environments
  - Data-efficient VLA training without millions of robot interaction trajectories
disputed_statements: []
secondary_sources:
  - title: "RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control"
    type: technical_report
    year: 2023
    authors:
      - Brohan, Anthony
      - Brown, Noah
      - Carbajal, Justice
      - et al.
    institution: Google DeepMind / Robotics
    url: https://arxiv.org/abs/2307.15818
  - title: "PaLM-E: An Embodied Multimodal Language Model"
    type: conference_paper
    year: 2023
    authors:
      - Driess, Danny
      - Xia, Fei
      - Sajjadi, Mehdi S. M.
      - et al.
    institution: Google / ICML
    url: https://arxiv.org/abs/2303.03378
  - title: "CLIP: Learning Transferable Visual Models From Natural Language Supervision"
    type: conference_paper
    year: 2021
    authors:
      - Radford, Alec
      - Kim, Jong Wook
      - Hallacy, Chris
      - et al.
    institution: OpenAI / ICML
    url: https://arxiv.org/abs/2103.00020
  - title: "A Survey of Vision-Language-Action Models for Robotics: From CLIP to RT-2"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: IEEE Access
    url: https://doi.org/10.1109/ACCESS.2024.3415265
updated: "2026-05-24"
---
## TL;DR
Vision-Language-Action (VLA) models extend multimodal AI to physical interaction — a single neural network that sees the environment, understands spoken instructions, and generates robot actions. From "pick up the red cup" to complex multi-step manipulation, VLA models represent the convergence of vision, language, and robotics into unified foundation models.

## Core Explanation
Traditional robotics stack: perception (object detection) → planning (task decomposition) → control (inverse kinematics). Each module is separate, error-prone, and task-specific. VLA paradigm: single transformer processes interleaved tokens — image patches from cameras, text tokens from instructions/context, and action tokens representing end-effector positions, joint angles, or navigation commands. The model is trained on large-scale robot interaction datasets (Open X-Embodiment, 1M+ trajectories across 60+ robot platforms) with next-token prediction or behavior cloning objectives. Key capability: zero-shot generalization — a VLA trained on diverse embodiments can control a novel robot it has never seen, following natural language instructions in novel environments.

## Detailed Analysis
Leading VLA models: (1) RT-2 (Google DeepMind, 2023) — fine-tuned PaLM-E vision-language model on robot trajectories, achieving 62% success on unseen tasks vs. 32% for specialized baselines; (2) Octo (UC Berkeley, 2024) — open-source generalist robot policy supporting multiple embodiments through a unified transformer; (3) OpenVLA (Stanford, 2024) — 7B-parameter VLA fine-tuned from Prismatic VLMs on Open X-Embodiment; (4) Emu3 (BAAI, Nature 2026) — demonstrates that next-token prediction alone suffices for multimodal generation and perception, providing the architectural foundation for unified perception-action models. Chinese VLA survey (自动化学报 Acta Automatica Sinica, 2025) documents the full VLA pipeline. MDPI VLA-MP framework (2025) integrates bird's-eye-view perception for autonomous driving decisions. Nature Emu3 (2026): trained on image tokenizers + text tokenizers with a single autoregressive objective — the same model generates images, videos, and text, implying seamless integration of action tokens. Key challenges: (1) Action tokenization — how to discretize continuous robot trajectories into tokens efficiently; (2) Real-world deployment — VLA policies must handle novel objects, lighting, and dynamics unseen in training; (3) Safety — VLA-commanded robots can cause physical harm; formal action constraints and human-in-the-loop override mechanisms are essential.

## Further Reading
- RT-2: Vision-Language-Action Models (Google DeepMind, 2023)
- Open X-Embodiment Dataset & RT-X (2024)
- Octo: An Open-Source Generalist Robot Policy

## Related Articles

- [Video Understanding: Action Recognition, Temporal Action Detection, and Video-Language Models](../video-understanding.md)
- [Visual Question Answering: Vision-Language Models for Image Understanding and Reasoning](../visual-question-answering.md)
- [AI for Genomics: Single-Cell Foundation Models and RNA Biology](../ai-for-genomics.md)
