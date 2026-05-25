---
id: parameter-efficient-fine-tuning
title: "Parameter-Efficient Fine-Tuning: LoRA, QLoRA, and Adapters"
schema_type: TechArticle
category: ai
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: f1
    statement: >-
      LoRA (Hu et al. 2022, Microsoft, ICLR) decomposes weight updates into low-rank matrices, reducing trainable parameters by 10,000× while maintaining full fine-tuning quality — enabling adaptation
      of 175B models on a single GPU.
    source_title: "Hu, Edward J., et al. LoRA: Low-Rank Adaptation of Large Language Models. ICLR 2022"
    source_url: https://arxiv.org/abs/2106.09685
    confidence: high
  - id: f2
    statement: >-
      QLoRA (Dettmers et al. 2023, NeurIPS) combines 4-bit quantization with LoRA, enabling fine-tuning of a 65B parameter model on a single 48GB GPU while preserving 99.3% of 16-bit fine-tuning
      performance.
    source_title: "Dettmers, Tim, et al. QLoRA: Efficient Finetuning of Quantized LLMs. NeurIPS 2023"
    source_url: https://arxiv.org/abs/2305.14314
    confidence: high
  - id: f3
    statement: >-
      Prefix-Tuning (Li & Liang 2021, Stanford, ACL) prepends learnable continuous vectors to the input, achieving GPT-3-comparable performance while only training 0.1% of parameters — demonstrating
      that prompting can be optimized via gradient descent.
    source_title: "Li, Xiang Lisa, and Percy Liang. Prefix-Tuning: Optimizing Continuous Prompts for Generation. ACL 2021"
    source_url: https://arxiv.org/abs/2101.00190
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

## Related Articles

- [Efficient and Green AI: Reducing the Carbon Footprint of Machine Learning](../efficient-green-ai.md)
- [Instruction Tuning: Teaching LLMs to Follow Directions](../instruction-tuning.md)
- [LoRA (Low-Rank Adaptation)](../lora.md)
