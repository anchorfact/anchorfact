---
id: kb-2026-00062
title: LoRA (Low-Rank Adaptation)
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-22"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-lora-1
    statement: LoRA freezes pretrained model weights and injects trainable low-rank matrices into layers.
    source_title: "LoRA: Low-Rank Adaptation of Large Language Models"
    source_url: https://arxiv.org/abs/2106.09685
    confidence: medium
  - id: fact-lora-2
    statement: >-
      QLoRA combines quantization with low-rank adapters to fine-tune large language models
      efficiently.
    source_title: "QLoRA: Efficient Finetuning of Quantized LLMs"
    source_url: https://arxiv.org/abs/2305.14314
    confidence: medium
  - id: fact-lora-3
    statement: >-
      Adapter modules are an earlier parameter-efficient transfer-learning approach that inserts
      small trainable modules into pretrained models.
    source_title: Parameter-Efficient Transfer Learning for NLP
    source_url: https://arxiv.org/abs/1902.00751
    confidence: medium
completeness: 0.88
known_gaps:
  - This compact repair keeps only source-mapped public claims from the sampled audit entry.
disputed_statements: []
primary_sources:
  - title: "LoRA: Low-Rank Adaptation of Large Language Models"
    type: academic_paper
    year: 2021
    url: https://arxiv.org/abs/2106.09685
    institution: arXiv
  - title: "QLoRA: Efficient Finetuning of Quantized LLMs"
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2305.14314
    institution: arXiv
  - title: Parameter-Efficient Transfer Learning for NLP
    type: academic_paper
    year: 2019
    url: https://arxiv.org/abs/1902.00751
    institution: arXiv
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

LoRA is a parameter-efficient fine-tuning method that adds low-rank adaptation matrices instead of updating every model weight. This repair maps LoRA claims to direct PEFT sources.

## Core Explanation

The repaired version removes weak or duplicate PEFT claims and uses LoRA, QLoRA, and adapter references.

## Further Reading

- [LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685)
- [QLoRA: Efficient Finetuning of Quantized LLMs](https://arxiv.org/abs/2305.14314)
- [Parameter-Efficient Transfer Learning for NLP](https://arxiv.org/abs/1902.00751)
