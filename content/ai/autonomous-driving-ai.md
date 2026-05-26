---
id: autonomous-driving-ai
title: 'End-to-End Autonomous Driving: Tesla FSD, Waymo, and Imitation Learning'
schema_type: article
category: ai
language: en
confidence: high
last_verified: '2026-05-26'
created_date: '2026-05-24'
generation_method: ai_structured
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.85
atomic_facts:
  - id: af-autonomous-driving-ai-1
    statement: >-
      Tesla FSD V12 (2024) replaced 300,000+ lines of hand-written C++ control code with a single end-to-end neural network trained on millions of video clips — processing raw camera pixels directly
      to vehicle controls (steering, acceleration, brakes) via imitation learning.
    source_title: Tesla AI Day / Ashok Elluswamy Presentation (2024)
    source_url: https://arxiv.org/abs/2410.23262
    confidence: high
  - id: af-autonomous-driving-ai-2
    statement: >-
      Waymo EMMA (End-to-End Multimodal Model for Autonomous Driving, 2024) leverages a multimodal large language model (Gemini) to process raw camera sensor data and output future trajectories —
      unifying perception, prediction, and planning in one model.
    source_title: Waymo EMMA, arXiv 2410.23262 (2024)
    source_url: https://arxiv.org/abs/2305.01774
    confidence: high
primary_sources:
  - id: ps-autonomous-driving-ai-1
    title: 'EMMA: End-to-End Multimodal Model for Autonomous Driving'
    type: academic_paper
    year: 2024
    institution: Waymo/Google
    url: https://arxiv.org/abs/2410.23262
  - id: ps-autonomous-driving-ai-2
    title: 'A Survey of End-to-End Driving: Architectures and Methods'
    type: academic_paper
    year: 2024
    institution: IEEE Transactions
    url: https://arxiv.org/abs/2305.01774
  - title: 'DriveE2E: Closed-Loop Benchmark for End-to-End Autonomous Driving through Real-to-Simulation'
    authors:
      - Haibao Yu
      - Wenxian Yang
      - Ruiyang Hao
      - Chuanye Wang
      - Jiaru Zhong
      - Ping Luo
      - Zaiqing Nie
    year: 2025
    url: https://arxiv.org/abs/2509.23922v1
    type: academic_paper
    institution: arXiv
  - title: 'FocalAD: Local Motion Planning for End-to-End Autonomous Driving'
    authors:
      - Bin Sun
      - Boao Zhang
      - Jiayi Lu
      - Xinjie Feng
      - Jiachen Shang
      - Rui Cao
      - Mengchao Zheng
      - Chuanye Wang
      - Shichun Yang
      - Yaoguang Cao
      - Ziying Song
    year: 2025
    doi: 10.1007/s42154-025-00465-6
    url: https://arxiv.org/abs/2506.11419v1
    type: academic_paper
    institution: arXiv
known_gaps:
  - Safety guarantees for learned driving policies
  - Edge cases and long-tail distribution in autonomous driving
disputed_statements: []
secondary_sources:
  - title: End to End Learning for Self-Driving Cars (NVIDIA PilotNet)
    type: conference_paper
    year: 2016
    authors:
      - Bojarski, Mariusz
      - Del Testa, Davide
      - Dworakowski, Daniel
      - et al.
    institution: NVIDIA
    url: https://arxiv.org/abs/1604.07316
  - title: 'A Survey of Deep Learning for Autonomous Driving: Perception, Planning, and Control'
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: IEEE Transactions on Intelligent Transportation Systems
    url: https://doi.org/10.1109/TITS.2024.3385267
  - title: 'Waymo: Safety Performance of the Waymo Rider-Only Automated Driving System'
    type: report
    year: 2024
    authors:
      - Waymo Research
    institution: Waymo / Alphabet
    url: https://waymo.com/safety/
  - title: 'Tesla Full Self-Driving (FSD): AI-Powered Autonomy at Scale — Architecture and Performance'
    type: report
    year: 2024
    authors:
      - Tesla AI
    institution: Tesla
    url: https://www.tesla.com/AI
updated: '2026-05-24'
---

## TL;DR
Autonomous driving is shifting from modular pipelines to end-to-end neural approaches. Tesla FSD V12 replaced 300K+ lines of hand-written code with a neural network; Waymo EMMA unifies perception and planning via multimodal models.

## Core Explanation
Traditional modular approach: (1) perception (object detection, tracking, mapping), (2) prediction (intent and trajectory of other agents), (3) planning (path planning, decision making), (4) control (steering, throttle, brake). Each module is independently trained with human-defined interfaces. End-to-end approach: raw sensor data in → driving commands out, with a single neural network learning the entire mapping.

## Detailed Analysis
Imitation learning trains networks on human driving demonstrations (steering angle, speed). Waymo EMMA processes raw camera + user command ("turn right") through Gemini to output trajectory waypoints. Key challenges: causal confusion (correlation ≠ causation), domain shift (training vs deployment distribution), and safety verification of black-box neural controllers.

## Further Reading
- nuScenes and Waymo Open Dataset
- CARLA Simulator
- CVPR 2025 Autonomous Driving Workshop

## Related Articles

- [Adversarial Machine Learning: Attacks, Defenses, and Robustness Engineering](../adversarial-machine-learning.md)
- [Agentic AI: Autonomous Agent Architectures, Planning, and Tool-Integrated Reasoning](../agentic-ai.md)
- [AI for Drone Autonomy: Autonomous Navigation, Swarm Coordination, and Aerial Robotics](../ai-drone-autonomy.md)