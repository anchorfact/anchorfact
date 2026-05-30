---
id: post-training-alignment
title: 'Post-Training Alignment: RLHF, DPO, and Constitutional AI'
schema_type: article
category: ai
language: en
confidence: medium
last_verified: '2026-05-30'
created_date: '2026-05-24'
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.72
atomic_facts:
  - id: af-post-training-alignment-1
    statement: 'InstructGPT used human demonstrations and preference comparisons to train instruction-following models, including a reward model and PPO-based policy optimization.'
    source_title: 'Training Language Models to Follow Instructions with Human Feedback'
    source_url: https://arxiv.org/abs/2203.02155
    confidence: medium
  - id: af-post-training-alignment-2
    statement: 'Direct Preference Optimization formulates preference learning as a direct objective on preferred and dispreferred responses, avoiding an explicit reward-model training step.'
    source_title: 'Direct Preference Optimization: Your Language Model is Secretly a Reward Model'
    source_url: https://arxiv.org/abs/2305.18290
    confidence: medium
  - id: af-post-training-alignment-3
    statement: 'Constitutional AI uses written principles to guide model self-critique and revision, then uses AI-generated preference feedback for harmlessness training.'
    source_title: 'Constitutional AI: Harmlessness from AI Feedback'
    source_url: https://arxiv.org/abs/2212.08073
    confidence: medium
primary_sources:
  - id: ps-post-training-alignment-1
    title: 'Training Language Models to Follow Instructions with Human Feedback'
    type: conference_paper
    year: 2022
    institution: NeurIPS
    url: https://arxiv.org/abs/2203.02155
  - id: ps-post-training-alignment-2
    title: 'Direct Preference Optimization: Your Language Model is Secretly a Reward Model'
    type: conference_paper
    year: 2023
    institution: NeurIPS
    url: https://arxiv.org/abs/2305.18290
  - id: ps-post-training-alignment-3
    title: 'Constitutional AI: Harmlessness from AI Feedback'
    type: academic_paper
    year: 2022
    institution: arXiv
    url: https://arxiv.org/abs/2212.08073
known_gaps:
  - Alignment methods can change helpfulness, harmlessness, refusal behavior, and capability in ways that require task-specific evaluation.
  - Preference data and written principles encode human choices, so alignment is not value-neutral or automatically complete.
disputed_statements: []
secondary_sources: []
updated: '2026-05-30'
---

## TL;DR

Post-training alignment adapts a pretrained language model so it follows instructions, prefers helpful answers, and avoids unsafe behavior more often. RLHF, DPO, and Constitutional AI are three important approaches, but none removes the need for evaluation.

## Core Explanation

RLHF usually starts with supervised fine-tuning, then trains a reward model from human preferences, then optimizes the model with a reinforcement-learning method such as PPO. DPO simplifies the preference-learning path by optimizing directly on pairs of preferred and dispreferred responses. Constitutional AI uses written principles so a model can critique and revise outputs, and then uses AI feedback as part of the harmlessness training process.

The practical lesson is that alignment is a post-training layer, not a magic safety proof. It changes model behavior according to collected preferences, principles, and evaluation targets, so it needs ongoing measurement.

## Related Articles

- [RLHF: Reinforcement Learning from Human Feedback](../rlhf.md)
- [AI Red Teaming: Security Testing for Language Models](../ai-red-teaming-and-safety.md)
- [AI Training Data Curation: Quality at Scale](../ai-training-data-curation.md)
