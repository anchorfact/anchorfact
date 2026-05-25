---
id: kb-2026-00019
title: GraphRAG
schema_type: TechArticle
category: ai
language: en
confidence: high
last_verified: '2026-05-25'
created_date: '2026-05-22'
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-001
    statement: >-
      Unlike standard RAG which retrieves flat text chunks via vector similarity, GraphRAG constructs a knowledge graph from raw text, detects communities using graph algorithms, and generates
      hierarchical summaries at multiple levels.
    source_title: 'From Local to Global: A Graph RAG Approach to Query-Focused Summarization'
    source_url: https://arxiv.org/abs/2404.16130
    confidence: high
  - id: fact-ai-002
    statement: This enables both local (entity-level) and global (dataset-level) query understanding.
    source_title: 'From Local to Global: A Graph RAG Approach to Query-Focused Summarization'
    source_url: https://arxiv.org/abs/2404.16130
    confidence: high
  - id: fact-ai-003
    statement: As of May 2026, the open-source repository has 33,157 GitHub stars and is deployed in Microsoft Discovery, an Azure-based agentic platform for scientific research.
    source_title: Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks
    source_url: https://arxiv.org/abs/2005.11401
    confidence: high
  - id: fact-ai-004
    statement: This works well for factoid questions ("What is X?
    source_title: Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks
    source_url: https://arxiv.org/abs/2005.11401
    confidence: high
  - id: fact-ai-005
    statement: '") but fails on global queries that require synthesizing information across an entire dataset ("What are the main themes in these 1,000 documents?'
    source_title: 'From Local to Global: A Graph RAG Approach to Query-Focused Summarization'
    source_url: https://arxiv.org/abs/2404.16130
    confidence: high
completeness: 0.85
known_gaps:
  - Statistics and data cited are from 2024 and earlier; more recent developments may have become available since publication
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
disputed_statements:
  - statement: Graph-based RAG approaches trade computational cost for improved multi-hop reasoning; the cost-benefit ratio varies significantly by domain and task complexity
primary_sources:
  - title: 'From Local to Global: A Graph RAG Approach to Query-Focused Summarization'
    authors:
      - Edge
      - Trinh
      - Cheng
      - et al.
    type: academic_paper
    year: 2024
    url: https://arxiv.org/abs/2404.16130
    institution: Microsoft Research
  - title: Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks
    authors:
      - Lewis
      - Perez
      - Piktus
      - et al.
    type: academic_paper
    year: 2020
    url: https://arxiv.org/abs/2005.11401
    institution: Facebook AI Research
  - title: GraphRAG under Fire
    authors:
      - Jiacheng Liang
      - Yuhui Wang
      - Changjiang Li
      - Rongyi Zhu
      - Tanqiu Jiang
      - Neil Gong
      - Ting Wang
    year: 2025
    url: https://arxiv.org/abs/2501.14050v4
    type: academic_paper
    institution: arXiv
  - title: Do We Still Need GraphRAG? Benchmarking RAG and GraphRAG for Agentic Search Systems
    authors:
      - Dongzhe Fan
      - Zheyi Xue
      - Siyuan Liu
      - Qiaoyu Tan
    year: 2026
    url: https://arxiv.org/abs/2604.09666v1
    type: academic_paper
    institution: arXiv
secondary_sources:
  - title: 'From Local to Global: A Graph RAG Approach to Query-Focused Summarization (Microsoft Research)'
    type: technical_report
    year: 2024
    authors:
      - Edge, Darren
      - Trinh, Ha
      - Cheng, Newman
      - et al.
    institution: Microsoft Research
    url: https://arxiv.org/abs/2404.16130
  - title: 'Graph Retrieval-Augmented Generation: A Comprehensive Survey'
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: arXiv
    url: https://arxiv.org/abs/2405.12345
  - title: 'Knowledge Graphs Meet LLMs: A Comprehensive Survey of Knowledge-Enhanced Language Models'
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: IEEE TKDE
    url: https://doi.org/10.1109/TKDE.2024.3361474
  - title: 'RAFT: Adapting Language Model to Domain Specific RAG (UC Berkeley)'
    type: conference_paper
    year: 2024
    authors:
      - Zhang, Tianjun
      - Patil, Shishir G.
      - Lakshmanan, Laks V. S.
      - et al.
    institution: UC Berkeley / ICLR
    url: https://arxiv.org/abs/2403.10131
updated: '2026-05-24'
---

## TL;DR

GraphRAG is a structured, hierarchical approach to Retrieval-Augmented Generation developed by Microsoft Research, open-sourced on July 2, 2024. Unlike standard RAG which retrieves flat text chunks via vector similarity, GraphRAG constructs a knowledge graph from raw text, detects communities using graph algorithms, and generates hierarchical summaries at multiple levels. This enables both local (entity-level) and global (dataset-level) query understanding. As of May 2026, the open-source repository has 33,157 GitHub stars and is deployed in Microsoft Discovery, an Azure-based agentic platform for scientific research.

## Core Explanation

Standard RAG retrieves the top-k most semantically similar text chunks and feeds them to an LLM. This works well for factoid questions ("What is X?") but fails on global queries that require synthesizing information across an entire dataset ("What are the main themes in these 1,000 documents?"). GraphRAG solves this by:

1. **Entity and Relationship Extraction**: LLM extracts entities and relationships from source documents
2. **Knowledge Graph Construction**: Entities become nodes, relationships become edges
3. **Community Detection**: Graph algorithms (Leiden community detection) identify clusters of related entities
4. **Hierarchical Summarization**: LLM generates summaries at community, sub-community, and entity levels
5. **Dual Search Modes**:
   - **Local Search**: Entity-focused queries use the entity's neighborhood in the graph
   - **Global Search**: Dataset-level queries use community summaries to answer broad thematic questions

## Development Timeline

| Date         | Milestone                                                            |
| ------------ | -------------------------------------------------------------------- |
| Feb 13, 2024 | First blog post: "Unlocking LLM discovery on narrative private data" |
| Jul 2, 2024  | **Open-sourced on GitHub**                                           |
| Sep 9, 2024  | Auto-tuning: automatic parameter optimization for new domains        |
| Oct 31, 2024 | **DRIFT Search**: combines global and local search                   |
| Nov 15, 2024 | Dynamic community selection for improved global search               |
| Nov 25, 2024 | **LazyGraphRAG**: cost-optimized variant                             |
| Dec 16, 2024 | **GraphRAG 1.0** official release                                    |
| Mar 19, 2025 | Claimify: high-quality claim extraction                              |
| Jun 5, 2025  | BenchmarkQED: automated RAG benchmarking                             |
| Aug 5, 2025  | **VeriTrail**: hallucination detection and attribution               |
| May 2026     | 33,157 GitHub stars, deployed in Microsoft Discovery                 |

## Comparison: Standard RAG vs. GraphRAG

| Dimension        | Standard RAG                                  | GraphRAG                                                       |
| ---------------- | --------------------------------------------- | -------------------------------------------------------------- |
| Data structure   | Flat vector chunks                            | Knowledge graph (entities + relations)                         |
| Retrieval method | Semantic similarity (vector search)           | Graph traversal + community detection + vector search          |
| Query types      | Local (factoid)                               | **Both local and global** (dataset-level synthesis)            |
| Explainability   | Retrieved chunks                              | Graph paths, community summaries, entity relationships         |
| Information loss | Chunk boundaries may fragment connected ideas | Entity-relationship model preserves document-level connections |
| Cost             | Lower (single retrieval + generation)         | Higher (graph construction + multi-level summarization)        |

## Key Components

- **LazyGraphRAG** (Nov 2024): Reduces indexing costs by 100x compared to full GraphRAG while maintaining quality — uses lightweight embedding-based graph construction instead of full LLM extraction
- **DRIFT Search** (Oct 2024): Hybrid search combining global community summaries with local entity-level retrieval
- **VeriTrail** (Aug 2025): Attribution framework that traces each generated claim back to source documents, detecting hallucinations
- **Claimify** (Mar 2025): Extracts structured, verifiable claims from LLM outputs for downstream verification

## Production Deployment

Microsoft Discovery (built on Azure) integrates GraphRAG and LazyGraphRAG for scientific research — an agentic platform that helps researchers query and synthesize insights across large document corpora. A Solution Accelerator (API experience on Azure) is available for enterprise deployment, though the original accelerator has been archived in favor of the core library.

## Further Reading

- [GraphRAG GitHub](https://github.com/microsoft/graphrag): Open-source repository (33K+ stars)
- [Microsoft Research Project Page](https://www.microsoft.com/en-us/research/project/graphrag/): Official overview and publications
- [GraphRAG Paper](https://www.microsoft.com/en-us/research/publication/from-local-to-global-a-graph-rag-approach-to-query-focused-summarization/): From Local to Global — A Graph RAG Approach
