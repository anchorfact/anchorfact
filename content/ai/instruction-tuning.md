---
id: instruction-tuning
title: "Instruction Tuning: Teaching LLMs to Follow Directions"
schema_type: Article
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
      FLAN (Wei et al. 2022, Google, ICLR) showed that fine-tuning language models on a diverse set of NLP tasks phrased as instructions enables zero-shot generalization to unseen tasks — inaugurating
      instruction tuning.
    source_title: Wei, Jason, et al. Finetuned Language Models Are Zero-Shot Learners. ICLR 2022
    source_url: https://arxiv.org/abs/2109.01652
    confidence: high
  - id: f2
    statement: >-
      Scaling instruction tuning (Chung et al. 2022, Google, JMLR) with FLAN-T5 and FLAN-PaLM demonstrated that increasing the diversity and number of instruction-following tasks significantly
      improves generalization.
    source_title: Chung, Hyung Won, et al. Scaling Instruction-Finetuned Language Models. JMLR 2023
    source_url: https://arxiv.org/abs/2210.11416
    confidence: high
  - id: f3
    statement: >-
      Instruction tuning is distinct from RLHF — it teaches models to follow natural language instructions via supervised learning on (instruction, response) pairs, forming the foundation of
      ChatGPT-style conversational abilities.
    source_title: Ouyang, Long, et al. Training Language Models to Follow Instructions with Human Feedback. NeurIPS 2022
    source_url: https://arxiv.org/abs/2203.02155
    confidence: high
completeness: 0.9
primary_sources:
  - title: Finetuned Language Models Are Zero-Shot Learners (FLAN)
    type: academic_paper
    year: 2022
    url: https://arxiv.org/abs/2109.01652
    institution: ICLR/Google
  - title: "Self-Instruct: Aligning Language Models with Self-Generated Instructions"
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2212.10560
    institution: ACL
known_gaps:
  - Instruction diversity impact on generalization
  - Multilingual instruction tuning
disputed_statements:
  - statement: No major disputed statements identified
secondary_sources:
  - title: Finetuned Language Models Are Zero-Shot Learners (FLAN / Google)
    type: conference_paper
    year: 2022
    authors:
      - Wei, Jason
      - Bosma, Maarten
      - Zhao, Vincent Y.
      - et al.
    institution: Google Research / ICLR
    url: https://arxiv.org/abs/2109.01652
  - title: Scaling Instruction-Finetuned Language Models (FLAN-T5 / FLAN-PaLM)
    type: journal_article
    year: 2023
    authors:
      - Chung, Hyung Won
      - Hou, Le
      - Longpre, Shayne
      - et al.
    institution: Google Research / JMLR
    url: https://arxiv.org/abs/2210.11416
  - title: Training a Helpful and Harmless Assistant from Human Feedback (Claude / Anthropic)
    type: technical_report
    year: 2022
    authors:
      - Bai, Yuntao
      - Jones, Andy
      - Ndousse, Kamal
      - et al.
    institution: Anthropic
    url: https://arxiv.org/abs/2204.05862
  - title: "A Survey of Instruction Tuning: From Fine-Tuning to Alignment to Generalization"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/3635100
updated: "2026-05-24"
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

## Related Articles

- [AI for Code Generation: LLMs as Software Engineering Copilots](../ai-for-code-generation.md)
- [Large Language Models (LLMs)](../llms.md)
- [Parameter-Efficient Fine-Tuning: LoRA, QLoRA, and Adapters](../parameter-efficient-fine-tuning.md)
