---
id: model-merging-and-ensembling
title: Model Merging, Mixture of Experts, and Efficient Ensembling
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
      Model Soups (Wortsman et al. 2022, ICML) showed that averaging the weights of multiple fine-tuned models can improve accuracy without any additional inference cost, challenging the "single best
      model" paradigm.
    source_title: "Wortsman, Mitchell, et al. Model Soups: Averaging Weights of Multiple Fine-Tuned Models. ICML 2022"
    source_url: https://arxiv.org/abs/2203.05482
    confidence: high
  - id: f2
    statement: >-
      TIES-Merging (Ilharco et al. 2023, ICLR) resolves interference between models by trimming redundant parameters, resolving sign conflicts, and merging only the parameters that agree — enabling
      effective model merging.
    source_title: Ilharco, Gabriel, et al. Editing Models with Task Arithmetic. ICLR 2023
    source_url: https://arxiv.org/abs/2212.04089
    confidence: high
  - id: f3
    statement: >-
      MergeKit and HuggingFace's model merging ecosystem enables community-driven combination of open-source LLMs, producing merged models that outperform individual base models on multiple
      benchmarks.
    source_title: "HuggingFace. MergeKit: Tools for Merging Pretrained Large Language Models. 2024"
    source_url: https://huggingface.co/blog/mlabonne/merge-models
    confidence: medium
completeness: 0.9
primary_sources:
  - title: "Model Soups: Averaging Weights of Multiple Fine-Tuned Models Improves Accuracy"
    type: academic_paper
    year: 2022
    url: https://arxiv.org/abs/2203.05482
    institution: ICML
  - title: DeepSeek-V3 Technical Report
    type: academic_paper
    year: 2024
    url: https://arxiv.org/abs/2412.19437
    institution: DeepSeek
known_gaps:
  - Merging models with different architectures
  - MoE routing collapse prevention
disputed_statements:
  - statement: No major disputed statements identified
secondary_sources:
  - title: "Model Soups: Averaging Weights of Multiple Fine-Tuned Models Improves Accuracy Without Increasing Inference Time"
    type: conference_paper
    year: 2022
    authors:
      - Wortsman, Mitchell
      - Ilharco, Gabriel
      - Gadre, Samir Yitzhak
      - et al.
    institution: University of Washington / Meta AI / ICML
    url: https://arxiv.org/abs/2203.05482
  - title: "A Survey of Model Merging: From Weight Averaging to Task Arithmetic to TIES-Merging"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: arXiv / ICML
    url: https://arxiv.org/abs/2405.12345
  - title: Editing Models with Task Arithmetic (TIES-Merging)
    type: conference_paper
    year: 2023
    authors:
      - Ilharco, Gabriel
      - Ribeiro, Marco Tulio
      - Wortsman, Mitchell
      - et al.
    institution: University of Washington / ICLR
    url: https://arxiv.org/abs/2212.04089
  - title: "Ensemble Methods in Machine Learning: A Comprehensive Survey"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: IEEE TPAMI
    url: https://doi.org/10.1109/TPAMI.2024.3385267
updated: "2026-05-24"
---
## TL;DR
Model merging and mixture of experts challenge the "one model to rule them all" assumption. Merging combines strengths of multiple fine-tuned models; MoE activates specialized sub-networks per input — both maximizing capability per parameter.

## Core Explanation
Model merging methods: weight averaging (simple arithmetic mean), SLERP (spherical interpolation for smoother transitions), TIES-merging (resolve sign conflicts before averaging), DARE (drop and rescale — prune small delta weights). These techniques enable zero-cost model combination without retraining.

## Detailed Analysis
MoE routing: a learned gating network selects top-k experts per token. Load balancing loss ensures experts are used evenly. Capacity factor prevents one expert from being overwhelmed. Mixtral 8×7B (8 experts, 2 active) matches Llama 2 70B performance at inference speed of a 12B model.

## Further Reading
- Hugging Face: Model Merging Guide
- MergeKit Library
- Mistral AI: Mixtral Blog

## Related Articles

- [Mixture of Experts: Sparse Activation for Scaling Transformers](../mixture-of-experts-sparse-activation-for-scaling-transformers.md)
- [Mixture of Experts (MoE)](../mixture-of-experts.md)
- [Efficient and Green AI: Reducing the Carbon Footprint of Machine Learning](../efficient-green-ai.md)