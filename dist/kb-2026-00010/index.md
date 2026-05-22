---
id: "kb-2026-00010"
title: "Mixture of Experts (MoE)"
schema_type: "TechArticle"
category: "ai"
language: "en"
confidence: "high"
confidence_rationale: "Based on Shazeer et al. (2017) and the GPT-4 technical report"
last_verified: "2026-05-22"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer"
    authors: ["Shazeer, Noam", "Mirhoseini, Azalia", "Maziarz, Krzysztof", "Davis, Andy", "Le, Quoc", "Hinton, Geoffrey", "Dean, Jeff"]
    type: "academic_paper"
    year: 2017
    doi: "10.48550/arXiv.1701.06538"
    url: "https://arxiv.org/abs/1701.06538"
  - title: "GPT-4 Technical Report"
    authors: ["OpenAI"]
    type: "technical_report"
    year: 2023
    doi: "10.48550/arXiv.2303.08774"
    url: "https://arxiv.org/abs/2303.08774"
secondary_sources:
  - title: "Attention Is All You Need"
    authors: ["Vaswani", "Shazeer", "Parmar", "Uszkoreit", "Jones", "Gomez", "Kaiser", "Polosukhin"]
    type: "academic_paper"
    year: 2017
    doi: "10.48550/arXiv.1706.03762"
    url: "https://arxiv.org/abs/1706.03762"
    institution: "NeurIPS"
  - title: "Language Models are Few-Shot Learners"
    authors: ["Brown", "Mann", "Ryder"]
    type: "academic_paper"
    year: 2020
    doi: "10.48550/arXiv.2005.14165"
    url: "https://arxiv.org/abs/2005.14165"
completeness: 0.88
related_entities:
  - "entity:gpt-models"
  - "entity:transformer-architecture"
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

Mixture of Experts (MoE) is a neural network architecture that divides a model into multiple specialized "expert" sub-networks, with a learned gating mechanism routing each input token to only a subset of experts. This enables models with trillions of total parameters while keeping inference cost proportional to a much smaller "active" parameter count. GPT-4 reportedly uses MoE with 8 experts per layer and approximately 1.76 trillion total parameters but only ~280 billion active per forward pass. MoE is the dominant architecture for frontier-scale models as of 2026.

## Core Explanation

A traditional dense Transformer computes every parameter for every token. An MoE Transformer replaces some feed-forward layers with an MoE layer containing N expert FFNs plus a learned router (gate). For each token:

1. The router computes a probability distribution over experts
2. The top-k experts (typically k=2) are selected via a softmax gate
3. The token is processed only by the selected experts
4. Outputs are combined (weighted sum by gate scores)

This creates a sparsely-activated model: although the total parameter count is enormous (e.g., 1.76T), only a fraction (e.g., 280B) is activated for any single token. Training and inference costs are thus proportional to the active parameter count, not the total.

## Key Innovations

The MoE approach traces back to Jacobs et al. (1991), but was made practical for deep learning by Shazeer et al. (2017) at Google Brain:

1. **Sparsely-gated MoE**: Only top-k experts are activated per token, dramatically reducing computation
2. **Load balancing loss**: An auxiliary loss prevents the router from collapsing to always picking the same expert
3. **Expert capacity**: Each expert has a fixed token capacity per batch; overflow tokens are dropped or passed through a residual connection

## Detailed Analysis

### Why MoE at Scale

Dense scaling follows diminishing returns — each doubling of compute yields smaller improvements. MoE enables "sparsely-activated scaling" where total parameters grow much faster than compute cost. Using 8 experts with top-2 gating, a model can have ~4x the total parameters of a dense model at approximately the same inference cost.

### Router Design

The router (gate) is typically a simple linear layer: `g(x) = softmax(W · x)`. Top-k selection introduces non-differentiability, but the straight-through estimator allows gradient flow during training. Expert choice routing (Zhou et al., 2022) reverses the selection — experts choose tokens rather than tokens choosing experts, ensuring perfect load balancing.

### Known MoE Deployments

| Model | Total Params | Active Params | Experts/Layer | Year |
|-------|:-----------:|:------------:|:------------:|:----:|
| GShard | 600B | ~200B | 2048 / top-2 | 2020 |
| Switch Transformer | 1.6T | ~25B | 2048 / top-1 | 2021 |
| GLaM | 1.2T | ~96B | 64 / top-2 | 2021 |
| GPT-4 (reported) | ~1.76T | ~280B | 8 / top-2 | 2023 |
| Gemini Ultra | 1T+ | ~200B+ | MoE | 2024 |
| Mixtral 8x7B | 46.7B | 12.9B | 8 / top-2 | 2024 |

### Challenges

- **Load imbalance**: Some experts may receive disproportionately more tokens, degrading utilization
- **Memory overhead**: All experts must be stored in memory, even if inactive
- **Communication cost**: Expert parallelism across GPUs incurs all-to-all communication
- **Fine-tuning instability**: MoE models are harder to fine-tune than dense models

## Further Reading

- [Original MoE Paper](https://arxiv.org/abs/1701.06538): Shazeer et al., 2017
- [Switch Transformers](https://arxiv.org/abs/2101.03961): Scaling to trillion parameters
- [Mixtral of Experts](https://mistral.ai/news/mixtral-of-experts/): Open-source MoE
