---
id: "instruction-tuning"
title: "Instruction Tuning: Teaching LLMs to Follow Directions"
schema_type: "Article"
category: "ai"
language: "en"
confidence: "high"
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "af-instruction-tuning-1"
    statement: "Instruction tuning — fine-tuning LLMs on (instruction, response) pairs — was popularized by FLAN (Wei et al., 2022), which demonstrated that training on 1,800+ tasks formatted as instructions dramatically improved zero-shot performance on unseen tasks."
    source_title: "Wei et al., ICLR (2022)"
    confidence: "high"
  - id: "af-instruction-tuning-2"
    statement: "Self-Instruct (Wang et al., 2023) generates instruction-following training data from the model itself using few-shot prompting, bootstrapping high-quality instruction datasets without human annotation. Alpaca (Stanford, 2023) used this to fine-tune LLaMA 7B into an instruction-following model for under $600."
    source_title: "Wang et al., ACL (2023) / Taori et al., Alpaca (2023)"
    confidence: "high"

completeness: 0.9

primary_sources:
  - title: "Finetuned Language Models Are Zero-Shot Learners (FLAN)"
    type: "academic_paper"
    year: 2022
    url: "https://arxiv.org/abs/2109.01652"
    institution: "ICLR/Google"
  - title: "Self-Instruct: Aligning Language Models with Self-Generated Instructions"
    type: "academic_paper"
    year: 2023
    url: "https://arxiv.org/abs/2212.10560"
    institution: "ACL"

known_gaps:
  - "Instruction diversity impact on generalization"
  - "Multilingual instruction tuning"

disputed_statements:
  - statement: "No major disputed statements identified"

---

## TL;DR
Instruction tuning transforms raw language models into helpful assistants by training them to follow natural language instructions. It's the critical step between pretraining and deployment for modern LLMs.

## Core Explanation
The standard post-training pipeline: pretraining (next-token prediction on web data) → SFT (supervised fine-tuning on instruction-response pairs) → alignment (DPO/RLHF for helpfulness and safety). Instruction data sources: human-written (OpenAI), template-generated (T0, FLAN), model-generated (Self-Instruct, Evol-Instruct).

## Detailed Analysis
Instruction format: (system prompt + user instruction → assistant response). Data quality matters more than quantity — 1,000 high-quality diverse instructions often outperform 100,000 noisy ones. Evol-Instruct (WizardLM) iteratively rewrites simple instructions into increasingly complex versions.

## Further Reading
- HuggingFace: Instruction Datasets
- lmsys: Chatbot Arena
- Stanford Alpaca