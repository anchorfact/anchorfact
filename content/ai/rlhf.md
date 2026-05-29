---
id: kb-2026-00007
title: Reinforcement Learning from Human Feedback (RLHF)
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-05-30'
created_date: '2026-05-22'
generation_method: ai_structured
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-rlhf-1
    statement: Deep reinforcement learning from human preferences trains a reward predictor from human comparisons and uses that learned reward to train an agent.
    source_title: Deep Reinforcement Learning from Human Preferences
    source_url: https://arxiv.org/abs/1706.03741
    source_doi: 10.48550/arXiv.1706.03741
    confidence: medium
  - id: fact-ai-rlhf-2
    statement: InstructGPT used supervised fine-tuning, a reward model trained from human preference comparisons, and reinforcement learning with PPO to train instruction-following language models.
    source_title: Training Language Models to Follow Instructions with Human Feedback
    source_url: https://arxiv.org/abs/2203.02155
    source_doi: 10.48550/arXiv.2203.02155
    confidence: medium
  - id: fact-ai-rlhf-3
    statement: Direct Preference Optimization provides a preference-optimization alternative that uses preference data without fitting an explicit reward model in the same way as standard RLHF.
    source_title: 'Direct Preference Optimization: Your Language Model is Secretly a Reward Model'
    source_url: https://arxiv.org/abs/2305.18290
    source_doi: 10.48550/arXiv.2305.18290
    confidence: medium
completeness: 0.84
known_gaps:
  - This article covers the stable RLHF training pattern, not current vendor alignment pipelines.
  - Reward hacking, preference-data quality, safety policy design, and DPO-style alternatives require separate evaluation.
disputed_statements: []
primary_sources:
  - title: Deep Reinforcement Learning from Human Preferences
    authors:
      - Christiano, Paul
      - Leike, Jan
      - Brown, Tom B.
      - Martic, Miljan
      - Legg, Shane
      - Amodei, Dario
    type: academic_paper
    year: 2017
    url: https://arxiv.org/abs/1706.03741
    doi: 10.48550/arXiv.1706.03741
    institution: OpenAI / DeepMind
  - title: Training Language Models to Follow Instructions with Human Feedback
    authors:
      - Ouyang, Long
      - Wu, Jeffrey
      - Jiang, Xu
      - Almeida, Diogo
      - Wainwright, Carroll
      - Mishkin, Pamela
      - Zhang, Chong
      - Agarwal, Sandhini
      - Slama, Katarina
      - Schulman, John
      - Hilton, Jacob
      - Christiano, Paul
      - Leike, Jan
      - Lowe, Ryan
    type: academic_paper
    year: 2022
    url: https://arxiv.org/abs/2203.02155
    doi: 10.48550/arXiv.2203.02155
    institution: OpenAI
  - title: 'Direct Preference Optimization: Your Language Model is Secretly a Reward Model'
    authors:
      - Rafailov, Rafael
      - Sharma, Archit
      - Mitchell, Eric
      - Ermon, Stefano
      - Manning, Christopher D.
      - Finn, Chelsea
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2305.18290
    doi: 10.48550/arXiv.2305.18290
    institution: Stanford University
---

## TL;DR

Reinforcement Learning from Human Feedback, or RLHF, is a training pattern that uses human preference judgments to shape model behavior. In language-model training, the familiar form is supervised fine-tuning, reward-model training from comparisons, and policy optimization against that reward model.

## Core Claims

RLHF starts from preference data rather than only from demonstrations. Human comparisons are used to train a reward model that predicts which outputs people prefer.

InstructGPT made this pattern central for instruction-following language models. Its pipeline combined supervised fine-tuning, a reward model trained on ranked outputs, and PPO-based reinforcement learning.

DPO is a useful boundary case: it also uses preference data, but optimizes a policy through a direct objective rather than the same explicit reward-model plus reinforcement-learning loop used in standard RLHF.

## Citation Boundaries

Use this article for stable RLHF concepts. Do not use it for claims about the private alignment methods of a current commercial model, or for claims that RLHF fully solves safety, truthfulness, or reward hacking.

## Further Reading

- [Deep Reinforcement Learning from Human Preferences](https://arxiv.org/abs/1706.03741)
- [Training Language Models to Follow Instructions with Human Feedback](https://arxiv.org/abs/2203.02155)
- [Direct Preference Optimization: Your Language Model is Secretly a Reward Model](https://arxiv.org/abs/2305.18290)
