---
id: "kb-2026-00182"


title: "TCP vs UDP"
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

TCP (Transmission Control Protocol) provides reliable, ordered, error-checked delivery — the 'guaranteed delivery' protocol. UDP (User Datagram Protocol) provides bare-bones, best-effort delivery — the 'fire and forget' protocol. TCP is for web pages, email, file transfers; UDP is for real-time (VoIP, gaming, streaming).

## Core Explanation

TCP features: three-way handshake (SYN→SYN-ACK→ACK), sequence numbers, acknowledgments, flow control (sliding window), congestion control. UDP features: no connection establishment, no ordering guarantee, no retransmission, 8-byte header. QUIC (HTTP/3) uses UDP to implement TCP-like reliability with better performance.

## Further Reading

- [undefined](undefined)
- [undefined](undefined)
