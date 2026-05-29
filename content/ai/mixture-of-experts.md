---
id: kb-2026-00010
title: Mixture of Experts (MoE)
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-05-30'
created_date: '2026-05-22'
generation_method: ai_structured
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-moe-1
    statement: Sparsely-gated mixture-of-experts layers route each example to a small subset of expert networks rather than evaluating every expert for every input.
    source_title: 'Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer'
    source_url: https://arxiv.org/abs/1701.06538
    source_doi: 10.48550/arXiv.1701.06538
    confidence: medium
  - id: fact-ai-moe-2
    statement: Switch Transformers simplify sparse expert routing by sending each token to one selected expert.
    source_title: 'Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity'
    source_url: https://arxiv.org/abs/2101.03961
    source_doi: 10.48550/arXiv.2101.03961
    confidence: medium
  - id: fact-ai-moe-3
    statement: GLaM is a sparsely activated mixture-of-experts language model that activates only a subset of parameters for each token.
    source_title: 'GLaM: Efficient Scaling of Language Models with Mixture-of-Experts'
    source_url: https://arxiv.org/abs/2112.06905
    source_doi: 10.48550/arXiv.2112.06905
    confidence: medium
  - id: fact-ai-moe-4
    statement: Mixtral 8x7B is a sparse mixture-of-experts model that uses two selected experts per token among eight feed-forward experts.
    source_title: Mixtral of Experts
    source_url: https://arxiv.org/abs/2401.04088
    source_doi: 10.48550/arXiv.2401.04088
    confidence: medium
completeness: 0.84
known_gaps:
  - This article covers published MoE architectures, not private parameter counts or unconfirmed frontier-model designs.
  - Router load balancing, expert parallelism, serving cost, and fine-tuning stability require implementation-specific analysis.
disputed_statements: []
primary_sources:
  - title: 'Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer'
    authors:
      - Shazeer, Noam
      - Mirhoseini, Azalia
      - Maziarz, Krzysztof
      - Davis, Andy
      - Le, Quoc
      - Hinton, Geoffrey
      - Dean, Jeff
    type: academic_paper
    year: 2017
    url: https://arxiv.org/abs/1701.06538
    doi: 10.48550/arXiv.1701.06538
    institution: Google Brain
  - title: 'Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity'
    authors:
      - Fedus, William
      - Zoph, Barret
      - Shazeer, Noam
    type: academic_paper
    year: 2022
    url: https://arxiv.org/abs/2101.03961
    doi: 10.48550/arXiv.2101.03961
    institution: Google Research
  - title: 'GLaM: Efficient Scaling of Language Models with Mixture-of-Experts'
    authors:
      - Du, Nan
      - Huang, Yanping
      - Dai, Andrew M.
      - Tong, Simon
      - Lepikhin, Dmitry
      - Xu, Yuanzhong
      - Krikun, Maxim
      - Zhou, Yanqi
      - Yu, Adams Wei
      - Firat, Orhan
    type: academic_paper
    year: 2022
    url: https://arxiv.org/abs/2112.06905
    doi: 10.48550/arXiv.2112.06905
    institution: Google
  - title: Mixtral of Experts
    authors:
      - Jiang, Albert Q.
      - Sablayrolles, Alexandre
      - Roux, Antoine
      - Mensch, Arthur
      - Savary, Blanche
      - Bamford, Chris
      - Chaplot, Devendra Singh
      - de las Casas, Diego
      - Hanna, Emma Bou
      - Bressand, Florian
    type: academic_paper
    year: 2024
    url: https://arxiv.org/abs/2401.04088
    doi: 10.48550/arXiv.2401.04088
    institution: Mistral AI
---

## TL;DR

Mixture of Experts, or MoE, is a sparse neural-network architecture pattern in which a router sends each token or example to a subset of expert networks. The point is to increase total model capacity without evaluating every parameter for every token.

## Core Claims

Sparsely-gated MoE layers use learned routing so only selected experts process a given input. This separates total parameter count from active computation.

Switch Transformers simplify routing by selecting one expert per token. GLaM and Mixtral show MoE designs applied to large language models, with sparse activation making only a subset of parameters active for each token.

The main engineering challenge is routing quality. Practical MoE systems must manage load balancing, expert capacity, communication overhead, and expert specialization.

## Citation Boundaries

Use this article for stable MoE architecture concepts. Do not use it for unverified claims about private model parameter counts, current frontier-model internals, or product-specific serving costs.

## Further Reading

- [Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer](https://arxiv.org/abs/1701.06538)
- [Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity](https://arxiv.org/abs/2101.03961)
- [GLaM: Efficient Scaling of Language Models with Mixture-of-Experts](https://arxiv.org/abs/2112.06905)
- [Mixtral of Experts](https://arxiv.org/abs/2401.04088)
