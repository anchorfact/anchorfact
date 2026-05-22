---
id:"kb-2026-00189"
title:"gRPC"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"undefined"
    type:"undefined"
    url:"undefined"
    institution:"CNCF"
secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

gRPC is a high-performance RPC framework developed by Google (2015, graduated CNCF). It uses Protocol Buffers (protobuf) for binary serialization and HTTP/2 for transport, supporting unary, server-streaming, client-streaming, and bidirectional streaming. gRPC inter-service communication is the backbone of microservices at Google, Netflix, and Square.

## Core Explanation

Protobuf `.proto` files define service and message types. gRPC generates client/server code in 12+ languages. Streaming modes: unary (single request/response), server streaming, client streaming, bidirectional. Compared to REST: faster (binary, no JSON parsing), strongly typed, but harder to debug (needs grpcurl). gRPC-Web bridges gRPC to browsers.

## Further Reading

- [undefined](undefined)
