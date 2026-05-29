---
id: prompt-engineering
title: Prompt Engineering and Chain-of-Thought Prompting
schema_type: TechArticle
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
atomic_facts:
  - id: fact-ai-prompt-engineering-1
    statement: Brown et al. reported that GPT-3 could perform many tasks from natural-language instructions and a small number of examples in the prompt without task-specific gradient updates.
    source_title: Language Models are Few-Shot Learners
    source_url: https://arxiv.org/abs/2005.14165
    source_doi: 10.48550/arXiv.2005.14165
    confidence: medium
  - id: fact-ai-prompt-engineering-2
    statement: Chain-of-thought prompting uses examples with intermediate reasoning steps, and Wei et al. reported improvements on arithmetic, commonsense, and symbolic reasoning tasks for large language models.
    source_title: Chain-of-Thought Prompting Elicits Reasoning in Large Language Models
    source_url: https://arxiv.org/abs/2201.11903
    source_doi: 10.48550/arXiv.2201.11903
    confidence: medium
  - id: fact-ai-prompt-engineering-3
    statement: Self-consistency samples multiple reasoning paths and selects the most consistent answer, improving chain-of-thought reasoning results in Wang et al.'s experiments.
    source_title: Self-Consistency Improves Chain of Thought Reasoning in Language Models
    source_url: https://arxiv.org/abs/2203.11171
    source_doi: 10.48550/arXiv.2203.11171
    confidence: medium
  - id: fact-ai-prompt-engineering-4
    statement: ReAct combines reasoning traces and task-specific actions so language models can interleave verbal reasoning with external tool or environment interactions.
    source_title: 'ReAct: Synergizing Reasoning and Acting in Language Models'
    source_url: https://arxiv.org/abs/2210.03629
    source_doi: 10.48550/arXiv.2210.03629
    confidence: medium
completeness: 0.84
known_gaps:
  - Prompt injection, jailbreak resistance, and product-specific prompting APIs require separate current security review.
  - This article covers stable prompting techniques, not vendor-specific prompt templates or current model quirks.
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
  - title: Chain-of-Thought Prompting Elicits Reasoning in Large Language Models
    authors:
      - Wei, Jason
      - Wang, Xuezhi
      - Schuurmans, Dale
      - Bosma, Maarten
      - Ichter, Brian
      - Xia, Fei
      - Chi, Ed H.
      - Le, Quoc V.
      - Zhou, Denny
    type: academic_paper
    year: 2022
    url: https://arxiv.org/abs/2201.11903
    doi: 10.48550/arXiv.2201.11903
    institution: Google Research
  - title: Self-Consistency Improves Chain of Thought Reasoning in Language Models
    authors:
      - Wang, Xuezhi
      - Wei, Jason
      - Schuurmans, Dale
      - Le, Quoc V.
      - Chi, Ed H.
      - Narang, Sharan
      - Chowdhery, Aakanksha
      - Zhou, Denny
    type: academic_paper
    year: 2022
    url: https://arxiv.org/abs/2203.11171
    doi: 10.48550/arXiv.2203.11171
    institution: Google Research
  - title: 'ReAct: Synergizing Reasoning and Acting in Language Models'
    authors:
      - Yao, Shunyu
      - Zhao, Jeffrey
      - Yu, Dian
      - Du, Nan
      - Shafran, Izhak
      - Narasimhan, Karthik
      - Cao, Yuan
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2210.03629
    doi: 10.48550/arXiv.2210.03629
    institution: Princeton University / Google Research
---

## TL;DR

Prompt engineering is the practice of shaping model inputs so a language model follows a task, format, or reasoning pattern. For durable citation, this entry focuses on few-shot prompting, chain-of-thought prompting, self-consistency, and ReAct-style reasoning plus action.

## Core Claims

Few-shot prompting uses examples inside the prompt as task demonstrations. GPT-3 made this pattern prominent by showing that large language models could perform many tasks from instructions and examples without per-task fine-tuning.

Chain-of-thought prompting adds intermediate reasoning steps to examples. Self-consistency extends that pattern by sampling multiple reasoning paths and choosing the answer that appears most consistently.

ReAct-style prompting links reasoning with action. Instead of producing only a final answer, the model can alternate between reasoning traces and actions such as search, lookup, or environment interaction.

## Citation Boundaries

Use this article for stable prompting concepts. Do not use it for current vendor prompt-template advice, claims about hidden chain-of-thought disclosure, or prompt-injection security guarantees.

## Further Reading

- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](https://arxiv.org/abs/2201.11903)
- [Self-Consistency Improves Chain of Thought Reasoning in Language Models](https://arxiv.org/abs/2203.11171)
- [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)
