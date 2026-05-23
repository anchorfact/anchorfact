---
id: "post-training-alignment"
title: "Post-Training Alignment: DPO, GRPO, and Beyond"
schema_type: "TechArticle"
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
  - id: "af-post-training-alignment-1"
    statement: "Direct Preference Optimization (DPO, Rafailov et al., Stanford, 2023) eliminates the need for a separate reward model by directly optimizing the policy from preference data, reducing RLHF complexity from 4 models to 2 while achieving comparable or superior alignment."
    source_title: "Rafailov et al., NeurIPS (2023)"
    confidence: "high"
  - id: "af-post-training-alignment-2"
    statement: "Group Relative Policy Optimization (GRPO, DeepSeek, 2025) replaces the critic model with group-based advantage estimation, enabling stable RL training for reasoning models without requiring a separate value network — key to DeepSeek-R1's success."
    source_title: "DeepSeekMath & DeepSeek-R1 Technical Reports (2025)"
    confidence: "high"

completeness: 0.9

known_gaps:
  - "Alignment tax measurement (capability loss from alignment)"
  - "Scalable oversight for superhuman models"

disputed_statements:
  - statement: "No major disputed statements identified"

primary_sources:
  - title: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model"
    type: "academic_paper"
    year: 2023
    url: "https://arxiv.org/abs/2305.18290"
    institution: "NeurIPS/Stanford"
  - title: "DeepSeek-R1 Technical Report"
    type: "academic_paper"
    year: 2025
    url: "https://arxiv.org/abs/2501.12948"
    institution: "DeepSeek"

---


## TL;DR
Post-training alignment makes base models useful and safe. DPO simplified RLHF by removing the reward model; GRPO enabled DeepSeek-R1's reasoning breakthrough. The alignment pipeline (SFT→DPO/RL→reasoning) is now standard across the industry.

## Core Explanation
The alignment workflow: (1) Supervised Fine-Tuning (SFT) on instruction-following demonstrations. (2) Preference alignment: PPO-RLHF (4-model pipeline), DPO (direct optimization, no reward model), or GRPO (group-based RL, no critic). (3) Optional reasoning training. KTO and ORPO extend DPO for scenarios with only positive or unpaired feedback.

## Detailed Analysis
PPO-RLHF was the original approach (InstructGPT, ChatGPT). Its complexity — reward model training, policy optimization, KL divergence constraint — motivated simpler alternatives. DPO treats alignment as a classification problem on preference pairs. Constitutional AI (Anthropic) uses principle-based self-critique to generate training data.

## Further Reading
- Hugging Face Alignment Handbook
- OpenAI: InstructGPT Paper
- Lilian Weng: Learning from Human Preferences