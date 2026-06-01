---
id: foundation-models
title: "Foundation Models"
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: "2026-06-01"
created_date: "2026-05-24"
updated: "2026-06-01"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-foundation-models-001
    statement: "The Stanford foundation-models report defines foundation models as models trained on broad data at scale and adaptable to a wide range of downstream tasks."
    source_title: "On the Opportunities and Risks of Foundation Models"
    source_url: https://arxiv.org/abs/2108.07258
    confidence: medium
  - id: fact-foundation-models-002
    statement: "BERT showed that a pretrained bidirectional Transformer can be fine-tuned with an additional output layer for tasks such as question answering and language inference."
    source_title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"
    source_url: https://arxiv.org/abs/1810.04805
    confidence: medium
  - id: fact-foundation-models-003
    statement: "The Chinchilla paper reports that the compute-optimal model used the same compute budget as Gopher with 70B parameters and four times more data."
    source_title: "Training Compute-Optimal Large Language Models"
    source_url: https://arxiv.org/abs/2203.15556
    confidence: medium
  - id: fact-foundation-models-004
    statement: "The GPT-4 technical report describes GPT-4 as a large-scale multimodal model that accepts image and text inputs and produces text outputs."
    source_title: "GPT-4 Technical Report"
    source_url: https://arxiv.org/abs/2303.08774
    confidence: medium
completeness: 0.82
known_gaps:
  - "This entry does not compare current commercial model quality or licensing terms."
  - "Risk, evaluation, copyright, data provenance, and deployment governance need separate source-specific treatment."
disputed_statements: []
primary_sources:
  - title: "On the Opportunities and Risks of Foundation Models"
    type: research_report
    year: 2021
    url: https://arxiv.org/abs/2108.07258
    institution: Stanford CRFM
  - title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"
    type: academic_paper
    year: 2019
    url: https://arxiv.org/abs/1810.04805
    institution: NAACL
  - title: "Training Compute-Optimal Large Language Models"
    type: academic_paper
    year: 2022
    url: https://arxiv.org/abs/2203.15556
    institution: DeepMind
  - title: "GPT-4 Technical Report"
    type: technical_report
    year: 2023
    url: https://arxiv.org/abs/2303.08774
    institution: OpenAI
secondary_sources: []
---

## TL;DR

Foundation models are reusable AI base models trained at scale and adapted through prompting, fine-tuning, or tool use. They matter for AI programming agents because most coding, planning, retrieval, and multimodal tools are built on this base-model layer.

## Core Explanation

The public evidence supports a narrow, useful framing: foundation models are broad pretrained systems, adaptation methods make them useful for tasks, and scaling choices affect training efficiency. This article avoids current-product rankings and focuses on source-mapped architecture and training claims.

## Source-Mapped Facts

- The Stanford foundation-models report defines foundation models as models trained on broad data at scale and adaptable to a wide range of downstream tasks. ([source](https://arxiv.org/abs/2108.07258))
- BERT showed that a pretrained bidirectional Transformer can be fine-tuned with an additional output layer for tasks such as question answering and language inference. ([source](https://arxiv.org/abs/1810.04805))
- The Chinchilla paper reports that the compute-optimal model used the same compute budget as Gopher with 70B parameters and four times more data. ([source](https://arxiv.org/abs/2203.15556))
- The GPT-4 technical report describes GPT-4 as a large-scale multimodal model that accepts image and text inputs and produces text outputs. ([source](https://arxiv.org/abs/2303.08774))

## Further Reading

- [On the Opportunities and Risks of Foundation Models](https://arxiv.org/abs/2108.07258)
- [BERT](https://arxiv.org/abs/1810.04805)
- [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)
- [GPT-4 Technical Report](https://arxiv.org/abs/2303.08774)
