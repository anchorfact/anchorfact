---
id: vision-language-action-models
title: 'Vision-Language-Action Models: Unified Multimodal Foundation Models for Embodied AI'
schema_type: article
category: ai
language: en
confidence: medium
last_verified: '2026-05-28'
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
  - id: af-vision-language-action-models-1
    statement: PaLM-E integrates language, vision, and continuous sensor inputs for embodied reasoning tasks.
    source_title: 'PaLM-E: An Embodied Multimodal Language Model'
    source_url: https://arxiv.org/abs/2303.03378
    confidence: medium
  - id: af-vision-language-action-models-2
    statement: RT-2 represents robot actions as tokens so that vision-language models can be adapted to robotic control.
    source_title: 'RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control'
    source_url: https://arxiv.org/abs/2307.15818
    confidence: medium
  - id: af-vision-language-action-models-3
    statement: OpenVLA presents an open-source vision-language-action model trained for generalist robot manipulation.
    source_title: 'OpenVLA: An Open-Source Vision-Language-Action Model'
    source_url: https://arxiv.org/abs/2406.09246
    confidence: medium
primary_sources:
  - id: ps-vision-language-action-models-1
    title: 'PaLM-E: An Embodied Multimodal Language Model'
    type: academic_paper
    year: 2023
    institution: arXiv
    url: https://arxiv.org/abs/2303.03378
  - id: ps-vision-language-action-models-2
    title: 'RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control'
    type: academic_paper
    year: 2023
    institution: arXiv
    url: https://arxiv.org/abs/2307.15818
  - id: ps-vision-language-action-models-3
    title: 'OpenVLA: An Open-Source Vision-Language-Action Model'
    type: academic_paper
    year: 2024
    institution: arXiv
    url: https://arxiv.org/abs/2406.09246
known_gaps:
  - Reliable generalization from benchmark robot tasks to open-ended physical environments
  - Safety guarantees for language-conditioned actions in real-world robotics
disputed_statements: []
secondary_sources: []
updated: '2026-05-28'
---
## TL;DR
Vision-language-action models connect perception, language understanding, and robot actions. The field is promising, but evidence-backed claims should describe specific model formulations rather than imply general robot autonomy.

## Core Explanation
These systems extend multimodal models into embodied settings. Instead of only answering questions about images, they may condition action prediction on visual observations and language instructions.

## Detailed Analysis
PaLM-E, RT-2, and OpenVLA provide a grounded sequence of sources for the public article: embodied multimodal modeling, action-as-token robotic control, and open-source VLA training. Safety and real-world generalization remain open gaps.

## Related Articles

- [Multimodal AI: Vision-Language Models from CLIP to GPT-4V](../multimodal-ai-vision-language-models-from-clip-to-gpt-4v.md)
- [Video Understanding: Action Recognition, Temporal Action Detection, and Video-Language Models](../video-understanding.md)
- [Visual Question Answering: Vision-Language Models for Image Understanding and Reasoning](../visual-question-answering.md)
