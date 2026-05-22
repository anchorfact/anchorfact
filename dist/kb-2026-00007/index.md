---
id: "kb-2026-00007"
title: "Reinforcement Learning from Human Feedback (RLHF)"
schema_type: "TechArticle"
category: "ai"
language: "en"
confidence: "high"
confidence_rationale: "Based on the original Christiano et al. (2017) and InstructGPT (Ouyang et al., 2022) papers"
last_verified: "2026-05-22"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "Training language models to follow instructions with human feedback (InstructGPT)"
    authors: ["Ouyang, Long", "Wu, Jeffrey", "Jiang, Xu", et al.]
    type: "academic_paper"
    year: 2022
    doi: "10.48550/arXiv.2203.02155"
    url: "https://arxiv.org/abs/2203.02155"
  - title: "Deep Reinforcement Learning from Human Preferences"
    authors: ["Christiano, Paul", "Leike, Jan", "Brown, Tom B.", "Martic, Miljan", "Legg, Shane", "Amodei, Dario"]
    type: "academic_paper"
    year: 2017
    doi: "10.48550/arXiv.1706.03741"
    url: "https://arxiv.org/abs/1706.03741"
secondary_sources:
  - title: "Language Models are Few-Shot Learners"
    authors: ["Brown", "Mann", "Ryder"]
    type: "academic_paper"
    year: 2020
    doi: "10.48550/arXiv.2005.14165"
    url: "https://arxiv.org/abs/2005.14165"
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
completeness: 0.85
related_entities:
  - "entity:large-language-models"
  - "entity:gpt-models"
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

RLHF (Reinforcement Learning from Human Feedback) is a technique for aligning AI models with human preferences by using human feedback as a reward signal for reinforcement learning. First demonstrated for Atari games and robotics (Christiano et al., 2017), RLHF became the standard alignment method for production LLMs with OpenAI's InstructGPT (2022), which showed that models fine-tuned with RLHF produce more helpful, harmless, and honest outputs than those trained with supervised fine-tuning alone. As of 2026, RLHF is used by virtually all major LLM providers.

## Core Explanation

RLHF trains a language model in three stages:

1. **Supervised Fine-Tuning (SFT)** : Human labelers write ideal responses for a diverse set of prompts. The base model is fine-tuned on these prompt-response pairs.

2. **Reward Model (RM) Training** : Human labelers rank multiple model-generated responses for the same prompt from best to worst. A reward model is trained to predict these human preference rankings — essentially learning "what humans consider a good response."

3. **PPO Reinforcement Learning**: The SFT model is further optimized using Proximal Policy Optimization (PPO) against the reward model. The model generates responses, the RM scores them, and PPO updates the policy to maximize the reward while staying close to the SFT baseline.

The result is a model that internalizes human preferences about helpfulness, harmlessness, and honesty — without requiring humans to explicitly specify every desired behavior.

## Detailed Analysis

### Why SFT Alone Is Not Enough

Supervised fine-tuning teaches a model to mimic ideal responses, but has key limitations:
- Human labelers can only write a finite number of examples, leaving distribution gaps
- Models may produce plausible but subtly unhelpful outputs in new situations
- SFT does not directly optimize for safety properties like refusing harmful requests

RLHF addresses these by training the model to optimize a learned reward signal that generalizes human preferences to unseen situations.

### The Alignment Tax

RLHF introduces a well-documented trade-off: aligned models perform slightly worse on academic benchmarks than their base counterparts. For example, InstructGPT showed a 1-2% regression on certain NLP benchmarks compared to GPT-3. This "alignment tax" represents the cost of making models safer and more useful at the expense of raw capability.

Research by Anthropic (Constitutional AI, 2023) and others has worked to minimize this tax by using AI-generated feedback to supplement human labels.

### Key Variants

| Method | Description | Advantages |
|--------|------------|-----------|
| **Standard RLHF** (OpenAI) | Human labelers rank responses | Gold standard for quality |
| **Constitutional AI** (Anthropic) | AI critiques its own outputs against a written constitution | Scalable, reduces human labeling cost |
| **Direct Preference Optimization (DPO)** | Bypasses explicit reward model training | Simpler, competitive performance |
| **Reinforcement Learning from AI Feedback (RLAIF)** | AI ranks responses instead of humans | Scalable to more domains |

### Production Adoption

RLHF is the alignment backbone for most frontier LLMs:
- **ChatGPT / GPT-4 / GPT-5** (OpenAI): Standard RLHF with professional human labelers
- **Claude** (Anthropic): Constitutional AI — AI self-critique against harmlessness principles
- **Gemini** (Google DeepMind): RLHF with diverse rater populations across 100+ languages
- **LLaMA 3 / 4** (Meta): RLHF + DPO for open-weight models
- **Grok** (xAI): RLHF with real-time data from X/Twitter

## Further Reading

- [InstructGPT Paper](https://arxiv.org/abs/2203.02155): Training language models to follow instructions
- [Constitutional AI](https://arxiv.org/abs/2212.08073): Anthropic's self-alignment approach
- [Direct Preference Optimization](https://arxiv.org/abs/2305.18290): Simpler alternative to RLHF
