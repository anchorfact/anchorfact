---
id: "kb-2026-00010"


title: "Mixture of Experts (MoE)"
schema_type: "TechArticle"


category: "ai"
language: "en"


confidence: "high"
confidence_rationale: "Based on Shazeer et al. (2017, ICLR), Switch Transformers (Fedus et al., 2022, JMLR), and the GPT-4 technical report (OpenAI, 2023)"


last_verified: "2026-05-22"
generation_method: "human_only"


atomic_facts:
  - id: fact-ai-01
    statement: >-
      at Google Brain, MoE is the dominant architecture for frontier-scale models as of 2026: GPT-4 reportedly uses MoE
      with approximately 1.76T total parameters but only 280B active per forward pass
    source_title: "Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity"

    source_url: https://arxiv.org/abs/2101.03961
    source_doi: 10.48550/arXiv.2101.03961
    confidence: high
  - id: fact-ai-02
    statement: >-
      Mixture of Experts is a neural network architecture that divides a model into multiple specialized "expert"
      sub-networks, with a learned gating mechanism routing each input token to only a subset of experts
    source_title: "Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer"

    source_url: https://arxiv.org/abs/1701.06538
    source_doi: 10.48550/arXiv.1701.06538
    confidence: high
  - id: fact-ai-03
    statement: First made practical for deep learning by Shazeer et al
    source_title: "Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer"

    source_url: https://arxiv.org/abs/1701.06538
    source_doi: 10.48550/arXiv.1701.06538
    confidence: high
  
completeness: 0.88
disputed_statements:
  - statement: "The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches"
    confidence: "medium"

known_gaps:
  - "GPT-4 MoE configuration is based on external analysis (SemiAnalysis, press reports), not official OpenAI documentation"
  - "MoE training dynamics (load balancing, expert specialization) remain active research areas"
related_entities:
  - "entity:gpt-models"
  - "entity:transformer-architecture"
  - "entity:llms"
primary_sources:
  - title: "Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer"
    authors: ["Shazeer, Noam", "Mirhoseini, Azalia", "Maziarz, Krzysztof", "Davis, Andy", "Le, Quoc", "Hinton, Geoffrey", "Dean, Jeff"]
    type: "academic_paper"


    year: 2017
    doi: "10.48550/arXiv.1701.06538"


    url: "https://arxiv.org/abs/1701.06538"
    institution: "Google Brain"


    note: "Published at ICLR 2017. The paper that made MoE practical for deep learning. Introduced sparsely-gated MoE and load-balancing loss."
  - title: "Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity"
    authors: ["Fedus, William", "Zoph, Barret", "Shazeer, Noam"]
    type: "academic_paper"


    year: 2022
    doi: "10.48550/arXiv.2101.03961"


    url: "https://arxiv.org/abs/2101.03961"
    institution: "Google Brain"


    note: "Published at JMLR 2022. Simplified MoE to top-1 routing (Switch layer), enabling trillion-parameter models. Introduced expert capacity and token dropping."
  - title: "GPT-4 Technical Report"
    authors: ["OpenAI"]
    type: "technical_report"


    year: 2023
    doi: "10.48550/arXiv.2303.08774"


    url: "https://arxiv.org/abs/2303.08774"
    institution: "OpenAI"


secondary_sources:
  - title: "Mixtral of Experts"
    authors: ["Jiang, Albert Q.", "Sablayrolles, Alexandre", "Roux, Antoine", "Mensch, Arthur", "Savary, Blanche", "Bamford, Chris", "Chaplot, Devendra Singh", "de las Casas, Diego", "Hanna, Emma Bou", "Bressand, Florian", et al.]
    type: "academic_paper"


    year: 2024
    doi: "10.48550/arXiv.2401.04088"


    url: "https://arxiv.org/abs/2401.04088"
    institution: "Mistral AI"


    note: "Open-source MoE model (8 experts × 7B total, top-2 routing). Demonstrated MoE efficiency for publicly available models."
ai_citations:
---

## TL;DR

Mixture of Experts (MoE) is a neural network architecture that divides a model into multiple specialized "expert" sub-networks, with a learned gating mechanism routing each input token to only a subset of experts. This enables models with trillions of total parameters while keeping inference cost proportional to a much smaller "active" parameter count. First made practical for deep learning by Shazeer et al. (2017) at Google Brain, MoE is the dominant architecture for frontier-scale models as of 2026: GPT-4 reportedly uses MoE with approximately 1.76T total parameters but only ~280B active per forward pass. Open-source implementations (Mixtral, DeepSeek-V2) have brought MoE to the wider community.

## Core Explanation

A traditional dense Transformer computes every parameter for every token. An MoE Transformer replaces some feed-forward layers with an MoE layer containing N expert FFNs plus a learned router (gate):

For each token x:
1. **Gate**: g(x) = softmax(W_g · x)  → probability distribution over N experts
2. **Top-k selection**: Select k experts with highest gate values (k=1 for Switch, k=2 for most MoE models)
3. **Sparse computation**: Route token x to selected experts; other experts are skipped entirely
4. **Combine**: y = Σᵢ g(x)ᵢ · Expertᵢ(x)  → weighted sum of expert outputs

This creates a **sparsely-activated** model: although the total parameter count is enormous, only a fraction is activated for any single token. Training and inference costs are proportional to the active parameter count, not the total.

### Load Balancing

Without intervention, the router collapses to always selecting the same few experts ("rich getting richer"). Shazeer et al. (2017) introduced an **auxiliary load-balancing loss**:

```
L_balance = N · Σᵢ fᵢ · Pᵢ
```
where fᵢ = fraction of tokens routed to expert i, Pᵢ = average gate probability for expert i. This loss is minimized when all experts receive equal load (fᵢ = 1/N). It is added to the main training loss with a small coefficient (α ≈ 0.01).

The Switch Transformer (Fedus et al., 2022) further introduced **expert capacity**: each expert has a fixed token capacity per batch; overflow tokens are "dropped" (passed through a residual connection instead). This ensures predictable memory usage and computational load. Token dropping also serves as a regularizer — dropped tokens still see their FNN input through the residual connection.

## Detailed Analysis

### MoE Scaling Advantage

| Configuration | Total Params | Active Params | Token/Batch | Expert Computation |
|--------------|:-----------:|:------------:|:-----------:|:------------------:|
| Dense | 175B | 175B | All | 100% of FFN |
| MoE, N=8, k=2 | 175B × 8 = 1.4T | ~350B | Each → 2 experts | ~25% of FFN |

With 8 experts and top-2 gating, total parameters grow ~4× compared to a dense model with the same active parameters. The cost per token is approximately the dense cost to compute the gate + k expert FFN computations, while the model has access to k·N× the parameter capacity.

### Known MoE Deployments

| Model | Total Params | Active Params | N Experts | k | Year |
|-------|:-----------:|:------------:|:---------:|:---:|:----:|
| Sparsely-Gated MoE | 137B | ~34B | 2048 | 2-4 | 2017 |
| GShard | 600B | ~200B | 2048 | 2 | 2020 |
| Switch Transformer | 1.6T | ~25B | 2048 | 1 | 2021 |
| GLaM | 1.2T | ~96B | 64 | 2 | 2021 |
| GPT-4 (reported) | ~1.76T | ~280B | 8 | 2 | 2023 |
| Mixtral 8×7B | 46.7B | 12.9B | 8 | 2 | 2024 |
| DeepSeek-V2 | 236B | 21B | 160 | 6 | 2024 |
| Gemini 1.5 | Trillions | ~200B+ | Multi | MoE | 2024 |

### Router Design Choices

| Approach | Description | Trade-off |
|----------|------------|----------|
| **Top-k Gating** | Select k experts with highest gate scores | Standard; k=2 common |
| **Expert Choice** (Zhou et al., 2022) | Experts choose tokens (not vice versa) | Perfect load balance; harder to implement |
| **Soft MoE** (Puigcerver et al., 2023) | Weighted combinations of all experts (no hard routing) | Simpler training; more computation |
| **DeepSeekMoE** (Dai et al., 2024) | Shared experts + routed experts | Efficiency at large scale |

### Challenges

| Challenge | Description | Mitigation |
|-----------|------------|-----------|
| **Load imbalance** | Some experts receive disproportionately more tokens | Load-balancing loss, expert capacity, expert choice routing |
| **Memory overhead** | All experts must be stored in GPU memory | Expert parallelism (distribute across devices), quantization |
| **Communication cost** | All-to-all collectives when experts span GPUs | Token buffering, overlapping compute and communication |
| **Fine-tuning instability** | MoE harder to fine-tune than dense models | Gradual unfreezing, QLoRA, expert dropout |
| **Expert collapse** | Some experts learn nothing useful | Reinitialize inactive experts, dynamic expert count |

## Further Reading

- [Shazeer et al. (2017)](https://arxiv.org/abs/1701.06538): Original sparsely-gated MoE paper
- [Switch Transformers](https://arxiv.org/abs/2101.03961): Scaling to trillion parameters (Fedus et al., 2022)
- [Mixtral Paper](https://arxiv.org/abs/2401.04088): Open-source MoE by Mistral AI
