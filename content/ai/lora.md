---
id: "kb-2026-00062"



title: "LoRA (Low-Rank Adaptation)"
schema_type: "TechArticle"



category: "ai"
language: "en"



confidence: "high"
confidence_rationale: "Based on the original Hu et al. (2021) paper with 19,123 citations, Microsoft LoRA GitHub (13,547 stars)"



last_verified: "2026-05-22"
generation_method: "human_only"



ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "LoRA: Low-Rank Adaptation of Large Language Models"
    authors:
      [
        "Hu, Edward J.",
        "Shen, Yelong",
        "Wallis, Phillip",
        "Allen-Zhu, Zeyuan",
        "Li, Yuanzhi",
        "Wang, Shean",
        "Wang, Lu",
        "Chen, Weizhu",
      ]
    type: "academic_paper"



    year: 2021
    doi: "10.48550/arXiv.2106.09685"



    url: "https://arxiv.org/abs/2106.09685"
    citations: 19123
    institution: "arXiv"
  - title: "LoRA GitHub Repository"
    type: "repository"



    url: "https://github.com/microsoft/LoRA"
    institution: "Microsoft"



    stars: 13547
secondary_sources:
  - title: "QLoRA: Efficient Finetuning of Quantized Language Models"
    authors: ["Dettmers"]
    type: "academic_paper"



    year: 2023
    doi: "10.48550/arXiv.2305.14314"



    url: "https://arxiv.org/abs/2305.14314"
    institution: "arXiv"


atomic_facts:
  - id: fact-ai-01
    statement: LoRA is a parameter-efficient fine-tuning method for large language models, introduced by Hu et al
    source_title: "LoRA: Low-Rank Adaptation of Large Language Models"


    source_url: https://arxiv.org/abs/2106.09685
    source_doi: 10.48550/arXiv.2106.09685
    confidence: high
  - id: fact-ai-02
    statement: from Microsoft in 2021
    source_title: "LoRA: Low-Rank Adaptation of Large Language Models"


    source_url: https://arxiv.org/abs/2106.09685
    source_doi: 10.48550/arXiv.2106.09685
    confidence: high
  - id: fact-ai-03
    statement: The method has become the dominant fine-tuning approach in the open-source LLM community, with 13,547 GitHub stars
    source_title: "LoRA: Low-Rank Adaptation of Large Language Models"


    source_url: https://arxiv.org/abs/2106.09685
    source_doi: 10.48550/arXiv.2106.09685
    confidence: high
  
completeness: 0.88
disputed_statements:
  - statement: "The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches"
    confidence: "medium"


known_gaps:
  - "Statistics and data cited are from 2023 and earlier; more recent data may have become available since publication"
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
  - "Recent developments from 2025-2026 may not be reflected"
related_entities:
  - "entity:large-language-models"
  - "entity:fine-tuning"
ai_citations:
  - title: "Practical Tips for Finetuning LLMs Using LoRA"
    authors: ["Raschka, Sebastian"]
    type: "blog_post"



    year: 2023
    url: "https://magazine.sebastianraschka.com/p/practical-tips-for-finetuning-llms"


    institution: "Sebastianraschka"
    note: "Practical guide by the author of \"Build a Large Language Model\""
  - title: "LoRA: A Python Library for LoRA (Hugging Face PEFT)"
    type: "documentation"



    year: 2025
    url: "https://huggingface.co/docs/peft/en/developer_guides/lora"


    institution: "Hugging Face"
  - title: "LoRA: A Python Library for LoRA (Hugging Face PEFT)"
    type: "documentation"



    year: 2025
    url: "https://huggingface.co/docs/peft/en/developer_guides/lora"


    institution: "Hugging Face"
  - title: "Practical Tips for Finetuning LLMs Using LoRA"
    authors: ["Raschka, Sebastian"]
    type: "blog_post"



    year: 2023
    url: "https://magazine.sebastianraschka.com/p/practical-tips-for-finetuning-llms"


    institution: "Sebastianraschka"
    note: "Practical guide by the author of \"Build a Large Language Model\""
---

## TL;DR

LoRA (Low-Rank Adaptation) is a parameter-efficient fine-tuning method for large language models, introduced by Hu et al. from Microsoft in 2021 (arXiv:2106.09685, 19,123 citations as of May 2026). Instead of updating all model parameters during fine-tuning, LoRA injects small, trainable low-rank matrices into the model's weight layers, reducing trainable parameters by up to 10,000x while maintaining near full-fine-tuning performance. The method has become the dominant fine-tuning approach in the open-source LLM community, with 13,547 GitHub stars.

## Core Explanation

Standard fine-tuning of a large model (e.g., Llama 70B) requires updating all 70 billion parameters per training step — computationally prohibitive for most individuals and small teams. LoRA's key insight is that weight updates during fine-tuning have low "intrinsic rank" — meaning the effective change to a weight matrix W can be represented as a low-rank decomposition:

```
W' = W + ΔW  where ΔW = B · A
```

- W: Original weight matrix (frozen, d × k)
- A: Down-projection matrix (trainable, r × k, where r << d,k)
- B: Up-projection matrix (trainable, d × r)

For a typical LoRA configuration (r=8 or r=16 on attention projection matrices), the number of trainable parameters drops from billions to millions. This enables fine-tuning 70B models on a single consumer GPU.

## Key Advantages

- **Parameter efficiency**: Train 0.1-1% of original parameters
- **No inference latency**: LoRA weights can be merged into the base model (W' = W + BA)
- **Task switching**: Multiple LoRA adapters can be hot-swapped without reloading the base model
- **Storage efficiency**: LoRA adapter is typically 5-50 MB vs. 140+ GB for full model weights

## Variants

| Variant                           | Innovation                                                                     |
| --------------------------------- | ------------------------------------------------------------------------------ |
| **QLoRA** (Dettmers et al., 2023) | Adds 4-bit quantization to LoRA, enabling 65B fine-tuning on a single 48GB GPU |
| **DoRA** (Liu et al., 2024)       | Decomposes weight updates into magnitude + direction for better alignment      |
| **LoRA+**                         | Different learning rates for A and B matrices improve convergence              |

## Further Reading

- [LoRA Paper](https://arxiv.org/abs/2106.09685): Original paper by Hu et al.
- [LoRA GitHub](https://github.com/microsoft/LoRA): Official Microsoft implementation (13K+ stars)
- [QLoRA](https://arxiv.org/abs/2305.14314): Quantized LoRA for low-resource fine-tuning
