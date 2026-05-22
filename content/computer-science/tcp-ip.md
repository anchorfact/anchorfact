---
id: "kb-2026-00011"
title: "TCP/IP Protocol Suite"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
confidence_rationale: "Based on IETF RFCs 793, 791, and the OSI model"
last_verified: "2026-05-22"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "RFC 793 — Transmission Control Protocol"
    authors: ["Postel, J."]
    type: "standard"
    year: 1981
    url: "https://www.rfc-editor.org/rfc/rfc793"
    institution: "IETF"
  - title: "RFC 791 — Internet Protocol"
    authors: ["Postel, J."]
    type: "standard"
    year: 1981
    url: "https://www.rfc-editor.org/rfc/rfc791"
    institution: "IETF"
secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
completeness: 0.85
related_entities:
  - "entity:http-protocol"
  - "entity:internet"
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

TCP/IP is the foundational protocol suite of the Internet, consisting of four abstraction layers that enable reliable, end-to-end communication between devices across heterogeneous networks. TCP (Transmission Control Protocol) provides reliable, ordered, error-checked delivery of byte streams, while IP (Internet Protocol) handles addressing and routing of packets across network boundaries. Standardized in 1981 by Jon Postel through RFC 791 and RFC 793, TCP/IP has scaled from ARPANET to powering over 5 billion Internet users as of 2026.

## Core Explanation

TCP/IP organizes network communication into four layers:

1. **Link Layer**: Physical transmission (Ethernet, WiFi, fiber optic)
2. **Internet Layer (IP)** : Packet routing and addressing — IPv4 (32-bit) and IPv6 (128-bit)
3. **Transport Layer (TCP/UDP)** : End-to-end communication, reliability, flow control
4. **Application Layer**: Protocols consumed by applications (HTTP, DNS, SMTP, SSH)

TCP guarantees reliable delivery through acknowledgments (ACKs), sequence numbers, retransmission of lost packets, and flow control (sliding window). UDP (User Datagram Protocol) provides bare-bones datagram delivery without reliability guarantees — trading reliability for lower latency.

## Key Mechanisms of TCP

- **Three-Way Handshake**: SYN → SYN-ACK → ACK establishes a connection
- **Sequence Numbers**: Each byte is numbered; receiver can reorder out-of-sequence packets
- **Sliding Window**: Dynamic flow control based on receiver's buffer capacity
- **Congestion Control**: Slow start, congestion avoidance (AIMD), fast retransmit, fast recovery
- **Four-Way Teardown**: FIN → ACK → FIN → ACK gracefully closes a connection

## Further Reading

- [RFC 793 — TCP](https://www.rfc-editor.org/rfc/rfc793): The protocol that powers the Internet
- [RFC 791 — IP](https://www.rfc-editor.org/rfc/rfc791): Internet Protocol specification
