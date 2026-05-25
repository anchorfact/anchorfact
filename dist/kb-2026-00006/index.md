---
id: "kb-2026-00006"
title: "Retrieval-Augmented Generation (RAG)"
schema_type: "TechArticle"
category: "ai"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-ai-01"
    statement: "Retrieval-Augmented Generation is an AI architecture introduced by Lewis et al"
    source_title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
    source_url: "https://arxiv.org/abs/2005.11401"
    source_doi: "10.48550/arXiv.2005.11401"
    confidence: "high"
  - id: "fact-ai-02"
    statement: "RAG underpins AI search engines , enterprise knowledge bases, and research assistants — making it the dominant architecture for production AI systems requiring factual accuracy"
    source_title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
    source_url: "https://arxiv.org/abs/2005.11401"
    source_doi: "10.48550/arXiv.2005.11401"
    confidence: "high"
  - id: "fact-ai-03"
    statement: "A model trained in early 2025 cannot answer questions about events after that date; a general-purpose model lacks domain-specific knowledge about a company's internal documentation"
    source_title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
    source_url: "https://arxiv.org/abs/2005.11401"
    source_doi: "10.48550/arXiv.2005.11401"
    confidence: "high"

completeness: 0.92

known_gaps:
  - "Hallucination reduction percentages are empirical estimates from practitioner reports; vary significantly by domain and implementation quality"
  - "RAG is actively evolving; agentic and graph-based variants are recent innovations with limited long-term benchmarking"

disputed_statements:
  - statement: "The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches"

primary_sources:
  - title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
    authors: ["Lewis, Patrick", "Perez, Ethan", "Piktus, Aleksandra", "Petroni, Fabio", "Karpukhin, Vladimir", "Goyal, Naman", "Küttler, Heinrich", "Lewis, Mike", "Yih, Wen-tau", "Rocktäschel, Tim", "Riedel, Sebastian", "Kiela, Douwe"]
    type: "academic_paper"
    year: 2020
    url: "https://arxiv.org/abs/2005.11401"
    doi: "10.48550/arXiv.2005.11401"
    institution: "Facebook AI Research"
  - title: "Dense Passage Retrieval for Open-Domain Question Answering"
    authors: ["Karpukhin, Vladimir", "Oguz, Barlas", "Min, Sewon", "Lewis, Patrick", "Wu, Ledell", "Edunov, Sergey", "Chen, Danqi", "Yih, Wen-tau"]
    type: "academic_paper"
    year: 2020
    url: "https://arxiv.org/abs/2004.04906"
    doi: "10.48550/arXiv.2004.04906"
    institution: "Facebook AI Research"

secondary_sources:
  - title: "LangChain RAG Documentation"
    type: "documentation"
    year: 2026
    url: "https://python.langchain.com/docs/tutorials/rag/"
    institution: "Langchain"
  - title: "LlamaIndex Documentation"
    type: "documentation"
    year: 2026
    url: "https://docs.llamaindex.ai/"
    institution: "Llamaindex"

---


## TL;DR

Retrieval-Augmented Generation (RAG) is an AI architecture introduced by Lewis et al. (2020) at Facebook AI Research that combines large language models with real-time external knowledge retrieval. Instead of relying solely on parametric knowledge (what the model memorized during training), RAG retrieves relevant documents from a knowledge base and provides them as context for generation. This reduces hallucination by ~50% in empirical studies, enables responses grounded in up-to-date and domain-specific information, and provides source attribution. RAG underpins AI search engines (Perplexity, Google AI Overviews, ChatGPT Search), enterprise knowledge bases, and research assistants (Elicit, Consensus) — making it the dominant architecture for production AI systems requiring factual accuracy.

## Core Explanation

Traditional LLMs have a fundamental limitation: their knowledge is frozen at training time. A model trained in early 2025 cannot answer questions about events after that date; a general-purpose model lacks domain-specific knowledge about a company's internal documentation. RAG solves both problems by **decoupling knowledge storage from language generation**:

### Two-Phase Architecture

**Phase 1 — Indexing (offline)**:
1. Documents are split into overlapping chunks (typically 256-1024 tokens)
2. Each chunk is embedded into a dense vector (768-3072 dimensions) using an encoder model
3. Vectors are stored in a vector database (Pinecone, Weaviate, pgvector, Qdrant)
4. Often indexed with Approximate Nearest Neighbor (ANN) algorithms like HNSW

**Phase 2 — Retrieval + Generation (online)**:
1. User query is embedded into the same vector space
2. Top-k most similar document chunks are retrieved (typically k=5–20) by cosine similarity or dot product
3. Retrieved context is concatenated with the query and fed to the LLM: `"Answer based on: [Document 1] ... [Document k]. Question: [user query]"`
4. LLM generates a response grounded in the provided context

This architecture enables the knowledge base to be updated in real-time without any model retraining. New documents can be added, stale documents removed, and access can be controlled per user — all without touching the LLM.

## Detailed Analysis

### RAG vs. Standard LLM Approaches

| Aspect | Standard LLM (Parametric Only) | RAG (Parametric + Retrieval) |
|--------|:-----------------------------:|:----------------------------:|
| Knowledge freshness | Frozen at training cutoff | Updated in real-time |
| Hallucination rate | Higher on factual/specific queries | Reduced by ~50% (empirical, domain-dependent) |
| Source attribution | None (model's "memory") | Retrieved documents are citable |
| Domain adaptation | Requires fine-tuning | Swap or augment the knowledge base |
| Inference cost | Lower (single forward pass) | Higher (retrieval adds 200ms–2s latency) |
| Factual precision on niche topics | Lower | Higher when knowledge base covers the domain |
| Deployment complexity | Simple | Moderate (maintain vector DB + embedding pipeline) |

### Chunking Strategies

How documents are split significantly impacts retrieval quality:

| Strategy | Method | Best For |
|----------|--------|----------|
| **Fixed-size** | 256-1024 token chunks with 10-20% overlap | General purpose, simple to implement |
| **Semantic** | Split at natural boundaries (paragraphs, sections) | Narrative documents, articles |
| **Recursive** | Hierarchical chunks (parent → child) at different granularities | Long documents requiring multi-level context |
| **Sentence-based** | One or few sentences per chunk | Factoid QA, precise retrieval |
| **Agentic** | LLM determines optimal split points | Complex, heterogeneous documents |

A common pattern: use smaller chunks for precise retrieval (~256 tokens), but expand to surrounding context (parent document, adjacent chunks) for generation — this combines retrieval precision with generation context richness.

### Embedding Models

The quality of the embedding model is one of the strongest determinants of RAG performance. Key models as of 2025-2026:

| Model | Dimensions | Context Length | Developer | Open? |
|-------|:---------:|:-------------:|-----------|:-----:|
| text-embedding-3-large | 256-3072 (variable) | 8,191 | OpenAI | ❌ |
| text-embedding-3-small | 512-1536 | 8,191 | OpenAI | ❌ |
| Cohere Embed v3 | 1024 | 512 | Cohere | ❌ |
| BGE-M3 | 1024 | 8,192 | BAAI | ✅ |
| E5-mistral-7b-instruct | 4096 | 32,768 | Microsoft | ✅ |

*The ability to tune embedding dimensions trades accuracy for storage/performance — text-embedding-3 at 256 dimensions retains ~98% of the MTEB score while using 1/12th the storage.*

### Retrieval Enhancement: Re-ranking

After initial retrieval (fast but approximate), a cross-encoder model re-scores the top-k candidates (slow but precise). This two-stage pipeline is standard in production RAG systems:

1. **Stage 1**: Bi-encoder (embedding model) retrieves top-50 or top-100 candidates
2. **Stage 2**: Cross-encoder scores query-document pairs jointly, re-ranking to top-5 or top-10

Cross-encoders are significantly more accurate but also much slower (they process query + document together, rather than pre-computing document embeddings). The two-stage approach balances speed and quality.

### RAG Variants

| Variant | Description | Use Case |
|---------|------------|----------|
| **Naive RAG** | Single retrieval → single generation, no enhancement | Simple Q&A over small document sets |
| **Advanced RAG** | Query rewriting + re-ranking + context compression | Production enterprise systems |
| **Agentic RAG** | Multi-step retrieval with tool use (search→filter→verify→generate) | Complex research, multi-hop questions |
| **Graph RAG** | Retrieves from knowledge graphs (entities + relationships, not just vectors) | Entity-rich domains, relationship queries |
| **Multimodal RAG** | Retrieves and reasons over images, tables, and text | Healthcare, legal, technical docs |

### Applications

RAG is the underlying architecture for most production AI systems requiring factual accuracy:

| Application | Examples | How RAG Is Used |
|------------|----------|----------------|
| AI Search Engines | Perplexity, Google AI Overviews, ChatGPT Search | Retrieve web pages, cite sources per claim |
| Enterprise KB | Internal docs Q&A, customer support | Index company documentation, restrict by access |
| Research | Elicit, Consensus, Scite | Retrieve academic papers, synthesize findings with citations |
| Legal | Contract analysis, regulatory compliance | Index laws and precedents, ground analysis in documents |
| Healthcare | Clinical decision support | Retrieve medical literature, ground recommendations in evidence |

## Further Reading

- [RAG Paper (Lewis et al., 2020)](https://arxiv.org/abs/2005.11401): The foundational RAG paper (5K+ citations)
- [DPR Paper (Karpukhin et al., 2020)](https://arxiv.org/abs/2004.04906): Dense passage retrieval
- [LangChain RAG Tutorial](https://python.langchain.com/docs/tutorials/rag/): Practical implementation
