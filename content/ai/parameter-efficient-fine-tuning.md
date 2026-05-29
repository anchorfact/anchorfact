---
id: parameter-efficient-fine-tuning
title: Parameter-Efficient Fine-Tuning for Language Models (PEFT)
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
  - id: fact-ai-peft-1
    statement: Adapter-based transfer learning inserts small trainable modules into a pretrained model while keeping most original parameters fixed.
    source_title: Parameter-Efficient Transfer Learning for NLP
    source_url: https://arxiv.org/abs/1902.00751
    source_doi: 10.48550/arXiv.1902.00751
    confidence: medium
  - id: fact-ai-peft-2
    statement: Prefix-tuning optimizes continuous task-specific vectors prepended to the model input while keeping language-model parameters frozen.
    source_title: 'Prefix-Tuning: Optimizing Continuous Prompts for Generation'
    source_url: https://arxiv.org/abs/2101.00190
    source_doi: 10.48550/arXiv.2101.00190
    confidence: medium
  - id: fact-ai-peft-3
    statement: LoRA represents fine-tuning updates with low-rank matrices and freezes the pretrained model weights during adaptation.
    source_title: 'LoRA: Low-Rank Adaptation of Large Language Models'
    source_url: https://arxiv.org/abs/2106.09685
    source_doi: 10.48550/arXiv.2106.09685
    confidence: medium
  - id: fact-ai-peft-4
    statement: QLoRA combines quantized base models with low-rank adapters to reduce memory requirements for supervised fine-tuning.
    source_title: 'QLoRA: Efficient Finetuning of Quantized LLMs'
    source_url: https://arxiv.org/abs/2305.14314
    source_doi: 10.48550/arXiv.2305.14314
    confidence: medium
completeness: 0.84
known_gaps:
  - This article covers PEFT method families, not current framework recommendations or benchmark leaderboards.
  - Adapter merging, rank selection, quantization details, and multimodal PEFT require task-specific evaluation.
disputed_statements: []
primary_sources:
  - title: Parameter-Efficient Transfer Learning for NLP
    authors:
      - Houlsby, Neil
      - Giurgiu, Andrei
      - Jastrzebski, Stanislaw
      - Morrone, Bruna
      - de Laroussilhe, Quentin
      - Gesmundo, Andrea
      - Attariyan, Mona
      - Gelly, Sylvain
    type: academic_paper
    year: 2019
    url: https://arxiv.org/abs/1902.00751
    doi: 10.48550/arXiv.1902.00751
    institution: Google Research
  - title: 'Prefix-Tuning: Optimizing Continuous Prompts for Generation'
    authors:
      - Li, Xiang Lisa
      - Liang, Percy
    type: academic_paper
    year: 2021
    url: https://arxiv.org/abs/2101.00190
    doi: 10.48550/arXiv.2101.00190
    institution: Stanford University
  - title: 'LoRA: Low-Rank Adaptation of Large Language Models'
    authors:
      - Hu, Edward J.
      - Shen, Yelong
      - Wallis, Phillip
      - Allen-Zhu, Zeyuan
      - Li, Yuanzhi
      - Wang, Shean
      - Wang, Lu
      - Chen, Weizhu
    type: academic_paper
    year: 2022
    url: https://arxiv.org/abs/2106.09685
    doi: 10.48550/arXiv.2106.09685
    institution: Microsoft
  - title: 'QLoRA: Efficient Finetuning of Quantized LLMs'
    authors:
      - Dettmers, Tim
      - Pagnoni, Artidoro
      - Holtzman, Ari
      - Zettlemoyer, Luke
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2305.14314
    doi: 10.48550/arXiv.2305.14314
    institution: University of Washington
---

## TL;DR

Parameter-efficient fine-tuning, or PEFT, adapts large pretrained language models by training a small set of extra or low-rank parameters while leaving most base-model weights fixed. This makes adaptation cheaper than full fine-tuning and allows multiple task adapters to share one base model.

## Core Claims

Adapters insert small trainable modules into a pretrained network. The base model can remain mostly frozen, while each task gets its own lightweight parameters.

Prefix-tuning moves adaptation into continuous prompt-like vectors. Instead of updating the whole model, training learns vectors that condition generation for a task.

LoRA and QLoRA are widely cited PEFT variants. LoRA trains low-rank update matrices for selected weights; QLoRA combines low-rank adapters with quantized base-model weights to reduce memory use during fine-tuning.

## Citation Boundaries

Use this article for stable PEFT concepts. Do not use it to choose a current fine-tuning framework, claim consumer-hardware feasibility for a specific model, or compare current commercial fine-tuning products.

## Further Reading

- [Parameter-Efficient Transfer Learning for NLP](https://arxiv.org/abs/1902.00751)
- [Prefix-Tuning: Optimizing Continuous Prompts for Generation](https://arxiv.org/abs/2101.00190)
- [LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685)
- [QLoRA: Efficient Finetuning of Quantized LLMs](https://arxiv.org/abs/2305.14314)
