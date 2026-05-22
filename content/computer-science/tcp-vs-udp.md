---
id:"kb-2026-00182"
title:"TCP vs UDP"
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
    institution:"IETF"
  - title:"undefined"
    type:"undefined"
    url:"undefined"
    institution:"IETF"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

TCP (Transmission Control Protocol) provides reliable, ordered, error-checked delivery — the 'guaranteed delivery' protocol. UDP (User Datagram Protocol) provides bare-bones, best-effort delivery — the 'fire and forget' protocol. TCP is for web pages, email, file transfers; UDP is for real-time (VoIP, gaming, streaming).

## Core Explanation

TCP features: three-way handshake (SYN→SYN-ACK→ACK), sequence numbers, acknowledgments, flow control (sliding window), congestion control. UDP features: no connection establishment, no ordering guarantee, no retransmission, 8-byte header. QUIC (HTTP/3) uses UDP to implement TCP-like reliability with better performance.

## Further Reading

- [undefined](undefined)
- [undefined](undefined)
