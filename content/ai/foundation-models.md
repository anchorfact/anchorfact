---
id: foundation-models
title: "Foundation Models: Paradigm Shift in AI"
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
    statement: Foundation models (Bommasani et al. 2021, Stanford CRFM) are large-scale models trained on broad data that can be adapted to a wide range of downstream tasks via fine-tuning or prompting.
    source_title: Bommasani, Rishi, et al. On the Opportunities and Risks of Foundation Models. Stanford CRFM 2021
    source_url: https://arxiv.org/abs/2108.07258
    confidence: high
  - id: f2
    statement: >-
      Chinchilla scaling laws (Hoffmann et al. 2022, DeepMind) showed that for compute-optimal training, model size and training tokens should scale equally — many LLMs were undertrained relative to
      their parameter count.
    source_title: Hoffmann, Jordan, et al. Training Compute-Optimal Large Language Models. NeurIPS 2022
    source_url: https://arxiv.org/abs/2203.15556
    confidence: high
  - id: f3
    statement: BERT (Devlin et al. 2019) pioneered the pretrain-then-finetune paradigm with masked language modeling, establishing the foundation model approach that led to GPT, T5, and modern LLMs.
    source_title: "Devlin, Jacob, et al. BERT: Pre-training of Deep Bidirectional Transformers. NAACL 2019"
    source_url: https://arxiv.org/abs/1810.04805
    confidence: high
  - id: f4
    statement: >-
      GPT-4 (OpenAI 2023) demonstrated that scaling foundation models yields multimodal capabilities, advanced reasoning, and human-level performance on professional benchmarks like the bar exam (90th
      percentile).
    source_title: OpenAI. GPT-4 Technical Report. 2023
    source_url: https://arxiv.org/abs/2303.08774
    confidence: high
completeness: 0.9
known_gaps:
  - Multilingual foundation model equity
  - Foundation models for scientific discovery
disputed_statements:
  - statement: No major disputed statements identified
primary_sources:
  - title: On the Opportunities and Risks of Foundation Models
    type: academic_paper
    year: 2021
    url: https://arxiv.org/abs/2108.07258
    institution: Stanford CRFM
  - title: Scaling Laws for Neural Language Models
    type: academic_paper
    year: 2020
    url: https://arxiv.org/abs/2001.08361
    institution: NeurIPS
secondary_sources:
  - title: "A Comprehensive Survey on Pretrained Foundation Models: A History from BERT to ChatGPT to GPT-4"
    type: survey_paper
    year: 2024
    authors:
      - Zhou, Ce
      - Li, Qian
      - Li, Chen
      - et al.
    institution: International Journal of Machine Learning & Cybernetics (Springer)
    url: https://doi.org/10.1007/s13042-024-02443-6
  - title: On the Opportunities and Risks of Foundation Models (Stanford CRFM)
    type: report
    year: 2021
    authors:
      - Bommasani, Rishi
      - Hudson, Drew A.
      - Adeli, Ehsan
      - et al. (100+ authors)
    institution: Stanford Center for Research on Foundation Models
    url: https://arxiv.org/abs/2108.07258
  - title: Training Compute-Optimal Large Language Models (Chinchilla Scaling Laws)
    type: conference_paper
    year: 2022
    authors:
      - Hoffmann, Jordan
      - Borgeaud, Sebastian
      - Mensch, Arthur
      - et al.
    institution: DeepMind / NeurIPS
    url: https://arxiv.org/abs/2203.15556
  - title: Scaling Laws for Neural Language Models (Kaplan et al.)
    type: conference_paper
    year: 2020
    authors:
      - Kaplan, Jared
      - McCandlish, Sam
      - Henighan, Tom
      - et al.
    institution: OpenAI
    url: https://arxiv.org/abs/2001.08361
updated: "2026-05-24"
---
## TL;DR
Foundation models represent a paradigm shift — pretrain once on massive data, then adapt to thousands of downstream tasks via fine-tuning, prompting, or in-context learning.

## Core Explanation
Emergent abilities: capabilities that appear only at sufficient scale — chain-of-thought reasoning, instruction following, theory of mind, and tool use. These were NOT explicitly trained for; they emerged as model size crossed thresholds. Chinchilla scaling laws (Hoffmann et al., 2022) showed that for a given compute budget, model size and training tokens should scale equally.

## Detailed Analysis
The foundation model ecosystem: closed (GPT-4, Claude, Gemini), open-weight (Llama, Mistral, Qwen, DeepSeek), and fully open (OLMo, Pythia). Fine-tuning approaches include full fine-tuning, parameter-efficient methods (LoRA, QLoRA), and instruction tuning. The ecosystem increasingly demands transparency in training data composition.

## Further Reading
- Stanford CRFM: Foundation Model Research
- Hugging Face: Open LLM Leaderboard
- Epoch AI: Compute Trends

## Related Articles

- [AI for Genomics: Single-Cell Foundation Models and RNA Biology](../ai-for-genomics.md)
- [AI for Remote Sensing: Foundation Models, Satellite Image Analysis, and Earth Observation](../ai-for-remote-sensing.md)
- [Vision-Language-Action Models: Unified Multimodal Foundation Models for Embodied AI](../vision-language-action-models.md)
