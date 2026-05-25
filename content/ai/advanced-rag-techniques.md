---
id: advanced-rag-techniques
title: "Advanced RAG: From Naive Retrieval to Agentic RAG"
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
      Retrieval-Augmented Generation (RAG) (Lewis et al. 2020, Meta AI) combines pre-trained language models with non-parametric memory via dense retrieval, significantly reducing hallucination in
      knowledge-intensive tasks.
    source_title: Lewis, Patrick, et al. Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. NeurIPS 2020
    source_url: https://arxiv.org/abs/2005.11401
    confidence: high
  - id: f2
    statement: >-
      Self-RAG (Asai et al. 2023, UW/Allen AI) introduces self-reflection tokens that enable the model to decide when to retrieve, critique its own generations, and select the best output during
      inference.
    source_title: "Asai, Akari, et al. Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection. ICLR 2024"
    source_url: https://arxiv.org/abs/2310.11511
    confidence: high
  - id: f3
    statement: >-
      REALM (Guu et al. 2020, Google) pioneered retrieval-augmented language model pre-training, jointly optimizing the retriever and language model to improve knowledge-intensive benchmarks like
      OpenQA.
    source_title: "Guu, Kelvin, et al. REALM: Retrieval-Augmented Language Model Pre-Training. ICML 2020"
    source_url: https://arxiv.org/abs/2002.08909
    confidence: high
completeness: 0.9
primary_sources:
  - title: "Retrieval-Augmented Generation for Large Language Models: A Survey"
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2312.10997
    institution: arXiv
  - title: "Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection"
    type: academic_paper
    year: 2024
    url: https://arxiv.org/abs/2310.11511
    institution: ICLR
known_gaps:
  - RAG hallucination quantification
  - Real-time RAG over streaming data
disputed_statements:
  - statement: No major disputed statements identified
secondary_sources:
  - title: Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (RAG — Meta AI)
    type: conference_paper
    year: 2020
    authors:
      - Lewis, Patrick
      - Perez, Ethan
      - Piktus, Aleksandra
      - et al.
    institution: Meta AI Research / NeurIPS
    url: https://arxiv.org/abs/2005.11401
  - title: "A Survey of Retrieval-Augmented Generation: From Basic to Advanced Techniques"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/3635100
  - title: "REALM: Retrieval-Augmented Language Model Pre-Training"
    type: conference_paper
    year: 2020
    authors:
      - Guu, Kelvin
      - Lee, Kenton
      - Tung, Zora
      - Pasupat, Panupong
      - Chang, Ming-Wei
    institution: Google Research / ICML
    url: https://arxiv.org/abs/2002.08909
  - title: "Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection"
    type: conference_paper
    year: 2023
    authors:
      - Asai, Akari
      - Wu, Zeqiu
      - Wang, Yizhong
      - Sil, Avirup
      - Hajishirzi, Hannaneh
    institution: University of Washington / ICLR
    url: https://arxiv.org/abs/2310.11511
updated: "2026-05-24"
---
## TL;DR
RAG (Retrieval-Augmented Generation) has evolved from simple chunk retrieval to sophisticated agentic architectures. Advanced techniques — HyDE, multi-hop, re-ranking, Self-RAG, Agentic RAG — have transformed it from a simple technique into a production-grade knowledge infrastructure.

## Core Explanation
RAG pipeline: document parsing → chunking (semantic, recursive, sliding window) → embedding → vector store → retrieval (sparse BM25 + dense embeddings = hybrid) → re-ranking → context assembly → generation. Chunking strategy is the most impactful design decision: too small loses context; too large dilutes relevance.

## Detailed Analysis
HyDE generates a hypothetical ideal answer, embeds it, and retrieves similar documents — often outperforms direct query embedding. Self-RAG trains the model to decide when to retrieve, critique its own generations, and self-correct. Agentic RAG delegates retrieval strategy to the LLM: "search for X, if not found try Y, then synthesize from Z."

## Further Reading
- LlamaIndex: Advanced RAG Guide
- LangChain RAG Documentation
- Microsoft: GraphRAG (Knowledge Graph + RAG)

## Related Articles

- [Retrieval-Augmented Generation (RAG)](../rag.md)
- [Agentic AI: Autonomous Agent Architectures, Planning, and Tool-Integrated Reasoning](../agentic-ai.md)
- [AI Personal Assistants: Task Automation, Proactive Intelligence, and Agentic Personal AI](../ai-personal-assistants.md)
