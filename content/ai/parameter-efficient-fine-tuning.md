---
id: parameter-efficient-fine-tuning
title: "Parameter-Efficient Fine-Tuning: LoRA, QLoRA, and Adapters"
schema_type: TechArticle
category: ai
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: ai_assisted
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: af-parameter-efficient-fine-tuning-1
    statement: >-
      LoRA (Low-Rank Adaptation, Hu et al., 2021) freezes pre-trained weights and injects trainable low-rank matrices into attention layers — reducing trainable parameters by 10,000x while matching
      full fine-tuning performance. A 7B model can be fine-tuned on a single consumer GPU.
    source_title: Hu et al., ICLR (2022)
    confidence: high
  - id: af-parameter-efficient-fine-tuning-2
    statement: >-
      QLoRA (Dettmers et al., 2023) combines 4-bit NormalFloat quantization with LoRA, enabling fine-tuning of 65B parameter models on a single 48GB GPU — democratizing access to LLM customization
      that previously required multiple A100s.
    source_title: Dettmers et al., NeurIPS (2023)
    confidence: high
completeness: 0.9
primary_sources:
  - title: "LoRA: Low-Rank Adaptation of Large Language Models"
    type: academic_paper
    year: 2022
    url: https://arxiv.org/abs/2106.09685
    institution: ICLR
  - title: "QLoRA: Efficient Finetuning of Quantized Language Models"
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2305.14314
    institution: NeurIPS
known_gaps:
  - Multi-task LoRA merging
  - LoRA for vision and multimodal models
disputed_statements:
  - statement: No major disputed statements identified
secondary_sources:
  - title: "LoRA: Low-Rank Adaptation of Large Language Models"
    type: conference_paper
    year: 2022
    authors:
      - Hu, Edward J.
      - Shen, Yelong
      - Wallis, Phillip
      - et al.
    institution: Microsoft / ICLR
    url: https://arxiv.org/abs/2106.09685
  - title: "QLoRA: Efficient Finetuning of Quantized LLMs"
    type: conference_paper
    year: 2023
    authors:
      - Dettmers, Tim
      - Pagnoni, Artidoro
      - Holtzman, Ari
      - Zettlemoyer, Luke
    institution: University of Washington / NeurIPS
    url: https://arxiv.org/abs/2305.14314
  - title: "A Survey of Parameter-Efficient Fine-Tuning: From LoRA to Adapters to Prompt Tuning"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/3635100
  - title: "Prefix-Tuning: Optimizing Continuous Prompts for Generation"
    type: conference_paper
    year: 2021
    authors:
      - Li, Xiang Lisa
      - Liang, Percy
    institution: Stanford / ACL
    url: https://arxiv.org/abs/2101.00190
updated: "2026-05-24"
---
## TL;DR
Parameter-efficient fine-tuning (PEFT) adapts large pre-trained models to new tasks by training only a small fraction of parameters. LoRA and QLoRA have democratized LLM customization — GPT-equivalent quality fine-tuning now runs on consumer hardware.

## Core Explanation
The full fine-tuning problem: updating all 175B parameters of GPT-3 requires 350GB of GPU memory just for optimizer states. PEFT solutions: (1) Adapters — small bottleneck layers inserted between transformer blocks; (2) Prefix tuning — learnable prefix vectors prepended to input; (3) LoRA — low-rank weight updates (ΔW = BA where A and B are small matrices).

## Detailed Analysis
LoRA typically applies to attention projection matrices (W_q, W_v). Rank r=8-64 provides good performance. Multiple LoRA adapters can be hot-swapped for different tasks without reloading the base model. DORA (2024) adds magnitude-direction decomposition for improved performance.

## Further Reading
- HuggingFace PEFT Library
- Unsloth: Fast Fine-Tuning
- Axolotl: Fine-Tuning Framework