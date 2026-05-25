---
id: post-training-alignment
title: "Post-Training Alignment: DPO, GRPO, and Beyond"
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
  - id: f1
    statement: >-
      RLHF (Ouyang et al. 2022, OpenAI) fine-tunes LLMs using human preference feedback to align outputs with human values, training a reward model from comparisons and optimizing the policy via PPO.
      This is how InstructGPT/ChatGPT were built.
    source_title: Ouyang, Long, et al. Training Language Models to Follow Instructions with Human Feedback. NeurIPS 2022
    source_url: https://arxiv.org/abs/2203.02155
    confidence: high
  - id: f2
    statement: >-
      DPO (Rafailov et al. 2023, Stanford) simplifies alignment by directly optimizing a preference-based objective without training a separate reward model, achieving comparable results to RLHF with
      greater stability.
    source_title: "Rafailov, Rafael, et al. Direct Preference Optimization: Your Language Model is Secretly a Reward Model. NeurIPS 2023"
    source_url: https://arxiv.org/abs/2305.18290
    confidence: high
  - id: f3
    statement: >-
      Constitutional AI (Anthropic 2022) enables self-alignment by having the model critique and revise its own outputs based on predefined principles, reducing human annotation cost while improving
      harmlessness.
    source_title: "Bai, Yuntao, et al. Constitutional AI: Harmlessness from AI Feedback. Anthropic 2022"
    source_url: https://arxiv.org/abs/2212.08073
    confidence: high
completeness: 0.9
known_gaps:
  - Alignment tax measurement (capability loss from alignment)
  - Scalable oversight for superhuman models
disputed_statements:
  - statement: No major disputed statements identified
primary_sources:
  - title: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model"
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2305.18290
    institution: NeurIPS/Stanford
  - title: DeepSeek-R1 Technical Report
    type: academic_paper
    year: 2025
    url: https://arxiv.org/abs/2501.12948
    institution: DeepSeek
secondary_sources:
  - title: Training Language Models to Follow Instructions with Human Feedback (InstructGPT / OpenAI)
    type: conference_paper
    year: 2022
    authors:
      - Ouyang, Long
      - Wu, Jeffrey
      - Jiang, Xu
      - et al.
    institution: OpenAI / NeurIPS
    url: https://arxiv.org/abs/2203.02155
  - title: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model (DPO)"
    type: conference_paper
    year: 2023
    authors:
      - Rafailov, Rafael
      - Sharma, Archit
      - Mitchell, Eric
      - et al.
    institution: Stanford / NeurIPS
    url: https://arxiv.org/abs/2305.18290
  - title: "Constitutional AI: Harmlessness from AI Feedback (Anthropic)"
    type: technical_report
    year: 2022
    authors:
      - Bai, Yuntao
      - Kadavath, Saurav
      - Kundu, Sandipan
      - et al.
    institution: Anthropic
    url: https://arxiv.org/abs/2212.08073
  - title: "A Survey of LLM Alignment: From RLHF to DPO to Constitutional AI"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/3635100
updated: "2026-05-24"
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