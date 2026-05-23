---
id: "continual-learning"
title: "Continual Learning and Catastrophic Forgetting: EWC to MESU"
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
  - id: "af-continual-learning-1"
    statement: "Elastic Weight Consolidation (Kirkpatrick et al., PNAS 2017) prevents catastrophic forgetting by adding a quadratic penalty on weight changes proportional to the Fisher Information Matrix — effectively \"freezing\" parameters most important for previous tasks."
    source_title: "Kirkpatrick et al., PNAS (2017) — DeepMind"
    source_url: "https://www.pnas.org/doi/10.1073/pnas.1611835114"
    confidence: "high"
  - id: "af-continual-learning-2"
    statement: "MESU (Metaplasticity from Synaptic Uncertainty, Nature Communications 2025) introduces a Bayesian update rule scaling each parameter's learning by its uncertainty — achieving continual learning without storing previous task data or computing Fisher matrices, inspired by synaptic metaplasticity in biological brains."
    source_title: "MESU, Nature Communications (2025)"
    source_url: "https://www.nature.com/articles/s41467-025-64601-w"
    confidence: "high"
primary_sources:
  - id: "ps-continual-learning-1"
    title: "Overcoming catastrophic forgetting in neural networks (EWC)"
    type: "academic_paper"
    year: 2017
    institution: "PNAS / DeepMind"
    url: "https://www.pnas.org/doi/10.1073/pnas.1611835114"
  - id: "ps-continual-learning-2"
    title: "Bayesian continual learning and forgetting in artificial neural networks (MESU)"
    type: "academic_paper"
    year: 2025
    institution: "Nature Communications"
    url: "https://www.nature.com/articles/s41467-025-64601-w"
known_gaps:
  - "Task-free continual learning without task boundaries"
  - "Continual learning for large language models"
disputed_statements: []
---

## TL;DR
Continual learning enables neural networks to learn new tasks without forgetting previous ones. From EWC's Fisher-based regularization to MESU's Bayesian uncertainty approach, the field targets the fundamental challenge of catastrophic forgetting.

## Core Explanation
Catastrophic forgetting: when a neural network trains on Task B after Task A, gradient updates for B overwrite weights that encode A's knowledge, causing sudden performance drop on A. Three solution families: (1) Regularization (EWC, SI) — penalize weight changes on important parameters; (2) Replay (Experience Replay, GEM) — store and replay previous task samples; (3) Architecture (Progressive Networks) — grow capacity for each task.

## Detailed Analysis
EWC identifies important weights via the diagonal of the Fisher Information Matrix, approximated from gradients of the previous task's loss. MESU advances this by maintaining per-parameter uncertainty estimates — high-uncertainty parameters remain plastic while low-uncertainty ones consolidate, mimicking biological synaptic metaplasticity. Dynamic architecture methods (PackNet) prune and reallocate capacity.

## Further Reading
- ContinualAI Community and Avalanche Library
- "A Continual Learning Survey" (Parisi et al.)
- NeurIPS 2024 Continual Learning Workshop
