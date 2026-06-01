---
id: instruction-tuning
title: "Instruction Tuning"
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: "2026-06-01"
created_date: "2026-05-24"
updated: "2026-06-01"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-instruction-tuning-001
    statement: "FLAN fine-tuned a pretrained language model on many tasks expressed through natural-language instructions."
    source_title: "Finetuned Language Models Are Zero-Shot Learners"
    source_url: https://arxiv.org/abs/2109.01652
    confidence: medium
  - id: fact-instruction-tuning-002
    statement: "The FLAN ablations report that the number of fine-tuning datasets, model scale, and natural-language instructions are key factors in instruction-tuning success."
    source_title: "Finetuned Language Models Are Zero-Shot Learners"
    source_url: https://arxiv.org/abs/2109.01652
    confidence: medium
  - id: fact-instruction-tuning-003
    statement: "Scaling Instruction-Finetuned Language Models studies instruction finetuning by scaling task count, model size, and chain-of-thought data."
    source_title: "Scaling Instruction-Finetuned Language Models"
    source_url: https://arxiv.org/abs/2210.11416
    confidence: medium
  - id: fact-instruction-tuning-004
    statement: "InstructGPT collected labeler-written demonstrations and used them to fine-tune GPT-3 with supervised learning before RLHF."
    source_title: "Training Language Models to Follow Instructions with Human Feedback"
    source_url: https://arxiv.org/abs/2203.02155
    confidence: medium
completeness: 0.82
known_gaps:
  - "This entry does not cover DPO, constitutional AI, red-teaming datasets, or current vendor-specific post-training pipelines."
  - "Instruction data quality and safety policy design require separate evaluation before deployment."
disputed_statements: []
primary_sources:
  - title: "Finetuned Language Models Are Zero-Shot Learners"
    type: academic_paper
    year: 2022
    url: https://arxiv.org/abs/2109.01652
    institution: ICLR
  - title: "Scaling Instruction-Finetuned Language Models"
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2210.11416
    institution: JMLR
  - title: "Training Language Models to Follow Instructions with Human Feedback"
    type: academic_paper
    year: 2022
    url: https://arxiv.org/abs/2203.02155
    institution: OpenAI
secondary_sources: []
---

## TL;DR

Instruction tuning turns a pretrained language model into a model that is better at following natural-language tasks. For AI programming agents, this is one of the reasons a model can interpret task descriptions, constraints, and tool instructions.

## Core Explanation

Instruction tuning is not the same thing as every alignment method. In the source-mapped slice here, it means supervised fine-tuning or task fine-tuning on instruction-shaped examples, sometimes followed by preference or reinforcement learning stages.

## Source-Mapped Facts

- FLAN fine-tuned a pretrained language model on many tasks expressed through natural-language instructions. ([source](https://arxiv.org/abs/2109.01652))
- The FLAN ablations report that the number of fine-tuning datasets, model scale, and natural-language instructions are key factors in instruction-tuning success. ([source](https://arxiv.org/abs/2109.01652))
- Scaling Instruction-Finetuned Language Models studies instruction finetuning by scaling task count, model size, and chain-of-thought data. ([source](https://arxiv.org/abs/2210.11416))
- InstructGPT collected labeler-written demonstrations and used them to fine-tune GPT-3 with supervised learning before RLHF. ([source](https://arxiv.org/abs/2203.02155))

## Further Reading

- [Finetuned Language Models Are Zero-Shot Learners](https://arxiv.org/abs/2109.01652)
- [Scaling Instruction-Finetuned Language Models](https://arxiv.org/abs/2210.11416)
- [Training Language Models to Follow Instructions with Human Feedback](https://arxiv.org/abs/2203.02155)
