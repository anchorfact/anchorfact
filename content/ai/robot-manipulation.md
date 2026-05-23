---
id: "robot-manipulation"
title: "Robot Manipulation: Dexterous Grasping, Sim-to-Real Transfer, and Tactile Sensing"
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
  - id: "af-robot-manipulation-1"
    statement: "arxiv (February 2025) demonstrated practical sim-to-real reinforcement learning for dexterous manipulation on humanoid robots — training RL policies in GPU-accelerated simulation (Isaac Gym) for three challenging tasks (grasp-and-reach, box lift, object reorientation) with domain randomization (randomizing friction, object mass, lighting, camera position) and successfully transferring policies zero-shot to a real humanoid robot achieving 85-92% task success rates across all three tasks."
    source_title: "arxiv 2502.20396 (2025) — Sim-to-Real RL for Vision-Based Dexterous Manipulation on Humanoid Robots"
    source_url: "https://arxiv.org/abs/2502.20396"
    confidence: "high"
  - id: "af-robot-manipulation-2"
    statement: "Springer AI Review (July 2025) published a comprehensive survey of learning-based dexterous grasping — reviewing 200+ papers across five categories: grasp detection (identifying stable grasp points from visual input), grasp planning (trajectory optimization), reinforcement learning for dexterous hands (training multi-fingered policies), sim-to-real transfer (bridging the simulation-reality gap), and tactile sensing integration (using fingertip force/torque sensors to adapt grasps in real-time)."
    source_title: "Springer AI Review (2025) — Learning-based dexterous grasping survey — doi:10.1007/s10462-025-11262-2"
    source_url: "https://link.springer.com/article/10.1007/s10462-025-11262-2"
    confidence: "high"
primary_sources:
  - id: "ps-robot-manipulation-1"
    title: "Sim-to-Real Reinforcement Learning for Vision-Based Dexterous Manipulation on Humanoid Robots"
    type: "academic_paper"
    year: 2025
    institution: "arXiv / Google DeepMind"
    url: "https://arxiv.org/abs/2502.20396"
  - id: "ps-robot-manipulation-2"
    title: "An overview of learning-based dexterous grasping: recent advances, challenges, and future directions"
    type: "academic_paper"
    year: 2025
    institution: "Springer AI Review"
    doi: "10.1007/s10462-025-11262-2"
    url: "https://link.springer.com/article/10.1007/s10462-025-11262-2"
known_gaps:
  - "General-purpose manipulation across diverse objects without per-object training"
  - "Safe human-robot physical interaction during shared manipulation tasks"
disputed_statements: []
---

## TL;DR
Robot manipulation — the ability to grasp, lift, and manipulate objects — remains one of AI's hardest physical challenges. While AI can write poetry and prove theorems, a robot still struggles to fold laundry or pick a specific grape without crushing it. The frontier combines sim-to-real reinforcement learning, dexterous multi-fingered hands, and tactile sensing to bridge the gap between simulation and the messy physical world.

## Core Explanation
Manipulation pipeline: Perception (RGB-D cameras → object pose/shape estimation) → Grasp detection (where to place fingers) → Motion planning (trajectory from current pose to grasp) → Execution (force control, compliance). Traditional approach: analytical grasp synthesis uses geometric models of object and hand to compute force-closure grasps. Limitations: requires accurate object models, struggles with deformable/unknown objects. AI approach: (1) Grasp detection — CNN predicts grasp rectangles from RGB-D images (GG-CNN, GR-ConvNet, Dex-Net 4.0); (2) Reinforcement learning — agent explores in simulation, learning policies that maximize grasp success; (3) Imitation learning — learn from human demonstrations (teleoperation, video); (4) Sim-to-real — policies trained entirely in simulation (Isaac Gym, MuJoCo) transfer to real robots through domain randomization.

## Detailed Analysis
Dexterous hands: multi-fingered hands (Shadow Hand: 24 DOF, Allegro: 16 DOF, LEAP: 16 DOF) enable human-like manipulation — in-hand reorientation, precision pinch grasping. The high-dimensional action space (20+ continuous joints) makes RL more challenging than parallel-jaw grippers. arxiv 2025 sim-to-real humanoid: trains in Isaac Gym with 4,096 parallel environments. Domain randomization: randomize lighting, textures, camera extrinsics, object mass/friction, and joint dynamics. After randomization → the policy learns to be robust to any specific setting → transfers zero-shot. MDPI 2025 human-like dexterous grasping RL: reward engineering for multi-fingered grasping — rewards for finger-object contact, object lift height, and grasp stability over time. Key techniques: (A) Curriculum learning — start with simple shapes, progress to complex objects; (B) Tactile sensing — GelSight, DIGIT optical tactile sensors provide high-resolution contact information, enabling reactive grasp adjustment; (C) Bimanual manipulation — two hands coordinating (Bi-Touch, Bristol 2023-2025). Springer 2025 survey: the sim-to-real gap remains the primary bottleneck — even with domain randomization, policies trained without tactile feedback transfer poorly (30-50% success drop vs. simulation). Frontiers 2025 interactive imitation learning survey combines human demonstrations with autonomous RL refinement. Applications: warehouse picking (Amazon, Ocado), surgical robotics, home assistance.

## Further Reading
- Dex-Net: Deep Grasping Dataset (UC Berkeley)
- NVIDIA Isaac Gym: GPU-Accelerated RL Simulation
- GelSight/DIGIT: Optical Tactile Sensors
