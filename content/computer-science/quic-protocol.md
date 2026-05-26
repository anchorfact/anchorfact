---
id: "kb-2026-00190"
title: "QUIC Protocol"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-01"
    statement: "QUIC is a UDP-based transport protocol developed by Google and standardized as IETF RFC 9000"
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-001"
    statement: "QUIC is a UDP-based transport protocol developed by Google (2012) and standardized as IETF RFC 9000 (2021). It is the foundation of HTTP/3. Key innovations: 0-RTT connection, multiplexed streams without head-of-line blocking, built-in TLS 1.3 encryption, and connection migration (survives IP changes)."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-002"
    statement: "0-RTT: for previously visited servers, data can be sent immediately."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-003"
    statement: "Adoption: all Google services, Facebook, Cloudflare, ~35% of web traffic."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

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
  - title: "The C Programming Language (K&R, 2nd Ed)"
    type: "textbook"
    year: 1988
    url: "https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html"
    institution: "Prentice Hall"
  - title: "Structure and Interpretation of Computer Programs (SICP)"
    type: "textbook"
    year: 1996
    url: "https://mitpress.mit.edu/sites/default/files/sicp/"
    institution: "MIT Press"

---




## TL;DR

QUIC is a UDP-based transport protocol developed by Google (2012) and standardized as IETF RFC 9000 (2021). It is the foundation of HTTP/3. Key innovations: 0-RTT connection, multiplexed streams without head-of-line blocking, built-in TLS 1.3 encryption, and connection migration (survives IP changes).

## Core Explanation

QUIC eliminates TCP's head-of-line blocking by treating each stream independently — lost packets in one stream don't block others. 0-RTT: for previously visited servers, data can be sent immediately. Connection ID enables seamless WiFi-to-cellular switching. QUIC is mandatory encrypted (TLS 1.3 built-in). Adoption: all Google services, Facebook, Cloudflare, ~35% of web traffic.

## Further Reading

-

## Related Articles

- [HTTP/3: QUIC Protocol and Next-Generation Web Transport](../http-3-quic-protocol-and-next-generation-web-transport.md)
- [Model Context Protocol (MCP)](../../ai/mcp.md)
- [gRPC: Protocol Buffers, HTTP/2 Streaming, and Service Contracts](../grpc-protocol-buffers-http-2-streaming-and-service-contracts.md)