---
id: "kb-2026-00006"
title: "Retrieval-Augmented Generation (RAG)"
schema_type: "TechArticle"
category: "ai"
language: "en"
confidence: "high"
confidence_rationale: "Based on the original Lewis et al. (2020) paper and multiple peer-reviewed follow-ups"
last_verified: "2026-05-22"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
    authors: ["Lewis, Patrick", "Perez, Ethan", "Piktus, Aleksandra", "Petroni, Fabio", "Karpukhin, Vladimir", "Goyal, Naman", "Küttler, Heinrich", "Lewis, Mike", "Yih, Wen-tau", "Rocktäschel, Tim", "Riedel, Sebastian", "Kiela, Douwe"]
    type: "academic_paper"
    year: 2020
    doi: "10.48550/arXiv.2005.11401"
    url: "https://arxiv.org/abs/2005.11401"
secondary_sources:
  - title: "LangChain RAG Documentation"
    type: "documentation"
    url: "https://python.langchain.com/docs/tutorials/rag/"
  - title: "LlamaIndex Documentation"
    type: "documentation"
    url: "https://docs.llamaindex.ai/"
completeness: 0.90
related_entities:
  - "entity:large-language-models"
  - "entity:vector-databases"
  - "entity:transformer-architecture"
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

Retrieval-Augmented Generation (RAG) is an AI architecture that combines large language models with external knowledge retrieval to produce more accurate, up-to-date, and source-attributed responses. Instead of relying solely on parametric knowledge (what the model memorized during training), RAG retrieves relevant documents from a knowledge base in real-time and provides them as context to the generation model. Google Scholar (2026) reports over 5,000 citations for the original RAG paper, reflecting its foundational role in modern AI systems.

## Core Explanation

Traditional LLMs have a critical limitation: their knowledge is frozen at training time. RAG solves this by decoupling knowledge storage (a vector database of documents) from language generation (the LLM). When a user asks a question, the system first retrieves the most semantically relevant documents using embedding-based similarity search, then feeds them as context alongside the user's query to the LLM for answer generation.

The architecture has two phases:

1. **Indexing** (offline): Documents are split into chunks, embedded into vectors using an encoder model, and stored in a vector database
2. **Retrieval + Generation** (online): The user query is embedded, similar vectors are retrieved (typically top-k = 5-20), and they are fed to the LLM as additional context

This decoupling enables RAG systems to be updated without retraining the LLM — new documents can be added to the knowledge base at any time. RAG also provides source attribution, as the retrieved documents can be cited in the response.

## Detailed Analysis

### RAG vs. Standard LLM Approaches

| Aspect | Standard LLM (Parametric Only) | RAG (Parametric + Retrieval) |
|--------|:-----------------------------:|:----------------------------:|
| Knowledge freshness | Frozen at training cutoff | Updated in real-time |
| Hallucination rate | Higher on factual queries | Reduced by ~50% (empirical) |
| Source attribution | None | Retrieved documents are citable |
| Domain adaptation | Requires fine-tuning | Just swap the knowledge base |
| Inference cost | Lower | Higher (retrieval adds latency) |
| Factual precision | Lower for niche topics | Higher when knowledge base covers the domain |

### Key Components

**Embedding Models**: Convert text into dense vector representations where semantically similar texts are close in vector space. Popular choices include OpenAI's `text-embedding-3` (2024, 256-3072 dimensions), Cohere Embed, and open-source models like BGE and E5. The quality of the embedding model is one of the strongest determinants of RAG performance.

**Vector Databases**: Store and index document embeddings for fast similarity search. Popular options include:
- Pinecone: Managed, serverless
- Weaviate: Open-source, hybrid search (vector + keyword)
- Qdrant: Rust-based, high-performance
- pgvector: PostgreSQL extension, simplest to adopt
- Chroma: Lightweight, developer-friendly

**Chunking Strategies**: How documents are split significantly impacts retrieval quality. Common approaches:
- Fixed-size chunks (256-1024 tokens) with overlap: Simple but can cut sentences mid-thought
- Semantic chunking: Split at natural boundaries (paragraphs, sections)
- Recursive chunking: Build a hierarchy of chunks at different granularities
- Agentic chunking: Use an LLM to determine optimal split points

**Re-ranking**: After initial retrieval, a cross-encoder model re-scores the top-k candidates for higher relevance. This two-stage approach (bi-encoder retrieval → cross-encoder re-rank) is standard in production RAG systems.

### Advantages and Limitations

**Advantages**:
- Reduces hallucination on factual queries by grounding responses in retrieved evidence
- Enables real-time knowledge updates without model retraining
- Provides verifiable source attribution for each claim
- Allows domain-specific knowledge bases without fine-tuning
- Supports access-controlled knowledge (different users see different documents)

**Limitations**:
- Adds latency (typically 200ms-2s for retrieval phase)
- Retrieval quality is bottlenecked by embedding model and chunking strategy
- Cannot reason across documents that were retrieved in separate chunks unless explicitly combined
- Requires ongoing maintenance of the knowledge base
- Complex queries may require multi-step retrieval (agentic RAG)

### RAG Variants

| Variant | Description | Use Case |
|---------|------------|----------|
| **Naive RAG** | Single retrieval → single generation | Simple Q&A over documents |
| **Advanced RAG** | Adds query rewriting, re-ranking, context compression | Higher accuracy at moderate cost |
| **Agentic RAG** | Multi-step retrieval with tool use and reasoning | Complex research tasks |
| **Graph RAG** | Retrieves from knowledge graphs (not just vectors) | Entity-rich domains |
| **Multimodal RAG** | Retrieves images, tables, and text | Healthcare, legal, technical docs |

### Applications

RAG is the architecture underlying most production AI systems that require factual accuracy:
- **AI Search Engines**: Perplexity, Google AI Overviews, ChatGPT Search
- **Enterprise Knowledge Bases**: Internal documentation Q&A, customer support
- **Research Assistants**: Elicit, Consensus, Scite — all use RAG over academic papers
- **Legal and Compliance**: Contract analysis, regulation Q&A
- **Healthcare**: Clinical decision support, literature retrieval

## Further Reading

- [Original RAG Paper](https://arxiv.org/abs/2005.11401): Lewis et al., 2020
- [LangChain RAG Tutorial](https://python.langchain.com/docs/tutorials/rag/): Practical implementation guide
- [LlamaIndex](https://docs.llamaindex.ai/): RAG-focused framework
