---
id: kb-2026-00005
title: Large Language Models (LLMs)
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-05-29'
created_date: '2026-05-22'
generation_method: ai_structured
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-llms-1
    statement: GPT-3 is an autoregressive language model with 175 billion parameters, and Brown et al. reported that scaling language models improves task-agnostic few-shot performance.
    source_title: Language Models are Few-Shot Learners
    source_url: https://arxiv.org/abs/2005.14165
    source_doi: 10.48550/arXiv.2005.14165
    confidence: medium
  - id: fact-ai-llms-2
    statement: Hoffmann et al. argued that compute-optimal language-model training should scale model size and training tokens together; their 70B-parameter Chinchilla model used about 1.4T tokens and outperformed larger undertrained models.
    source_title: Training Compute-Optimal Large Language Models
    source_url: https://arxiv.org/abs/2203.15556
    source_doi: 10.48550/arXiv.2203.15556
    confidence: medium
  - id: fact-ai-llms-3
    statement: Wei et al. define emergent abilities as abilities that are not present in smaller language models but are present in larger language models.
    source_title: Emergent Abilities of Large Language Models
    source_url: https://arxiv.org/abs/2206.07682
    source_doi: 10.48550/arXiv.2206.07682
    confidence: medium
completeness: 0.82
known_gaps:
  - This article covers durable scaling and behavior concepts, not live frontier-model rankings.
  - Proprietary parameter counts and current benchmark leaderboards should be checked from current primary sources.
  - Emergent-abilities framing remains a research interpretation and should be read with measurement critiques.
disputed_statements: []
primary_sources:
  - title: Language Models are Few-Shot Learners
    authors:
      - Brown, Tom B.
      - Mann, Benjamin
      - Ryder, Nick
      - Kaplan, Jared
    type: academic_paper
    year: 2020
    url: https://arxiv.org/abs/2005.14165
    doi: 10.48550/arXiv.2005.14165
    institution: OpenAI
  - title: Training Compute-Optimal Large Language Models
    authors:
      - Hoffmann, Jordan
      - Borgeaud, Sebastian
      - Mensch, Arthur
      - Sifre, Laurent
    type: academic_paper
    year: 2022
    url: https://arxiv.org/abs/2203.15556
    doi: 10.48550/arXiv.2203.15556
    institution: DeepMind
  - title: Emergent Abilities of Large Language Models
    authors:
      - Wei, Jason
      - Tay, Yi
      - Bommasani, Rishi
      - Raffel, Colin
    type: academic_paper
    year: 2022
    url: https://arxiv.org/abs/2206.07682
    doi: 10.48550/arXiv.2206.07682
    institution: Google Research
---

## TL;DR

Large language models are neural language models scaled to large parameter counts and large training corpora. For durable citation, this entry focuses on three stable ideas: GPT-3's few-shot scaling result, Chinchilla's compute-optimal training rule, and the research definition of emergent abilities.

## Core Claims

GPT-3 showed that a sufficiently large autoregressive language model can perform many tasks from instructions or a few examples in the prompt, without gradient updates for each task.

Chinchilla reframed scaling by arguing that many earlier large models were undertrained. Under a fixed compute budget, Hoffmann et al. found that model size and training-token count should increase together rather than spending most of the budget only on more parameters.

Emergent abilities are reported behaviors that appear at larger model scales even when smaller models do not show them. Treat that framing carefully: it is useful for describing scale-dependent behavior, but it is not a live leaderboard and does not by itself prove that a model is reliable.

## Citation Boundaries

Use this article for stable LLM concepts: few-shot prompting at scale, compute-optimal scaling, and the definition of emergent abilities. Do not use it for current model rankings, pricing, product availability, private parameter counts, or live benchmark claims.

## Further Reading

- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)
- [Emergent Abilities of Large Language Models](https://arxiv.org/abs/2206.07682)
