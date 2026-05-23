---
id: "kb-2026-00189"



title: "gRPC"
schema_type: "TechArticle"



category: "computer-science"
language: "en"



confidence: "high"
last_verified: "2026-05-22"



generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true


known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"
    context: "See primary sources for competing interpretations"

atomic_facts:
  - id: fact-computer-science-01
    statement: gRPC is a high-performance RPC framework developed by Google
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-02
    statement: "Compared to REST: faster , strongly typed, but harder to debug"


    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  
completeness: 0.88
ai_citations:

primary_sources:
  - title: "ACM Digital Library"
    type: "repository"



    year: 2026
    url: "https://dl.acm.org/"


    institution: "ACM"
secondary_sources:
  - title: "ACM Digital Library"
    type: "repository"



    year: 2026
    url: "https://dl.acm.org/"


    institution: "ACM"
---

## TL;DR

gRPC is a high-performance RPC framework developed by Google (2015, graduated CNCF). It uses Protocol Buffers (protobuf) for binary serialization and HTTP/2 for transport, supporting unary, server-streaming, client-streaming, and bidirectional streaming. gRPC inter-service communication is the backbone of microservices at Google, Netflix, and Square.

## Core Explanation

Protobuf `.proto` files define service and message types. gRPC generates client/server code in 12+ languages. Streaming modes: unary (single request/response), server streaming, client streaming, bidirectional. Compared to REST: faster (binary, no JSON parsing), strongly typed, but harder to debug (needs grpcurl). gRPC-Web bridges gRPC to browsers.

## Further Reading

- [undefined](undefined)
