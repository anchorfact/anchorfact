---
id: "kb-2026-00190"
title: "QUIC Protocol"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "medium"
last_verified: "2026-05-30"
created_date: "2026-05-22"
generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-quic-1"
    statement: "RFC 9000 defines QUIC as a UDP-based multiplexed and secure transport protocol."
    source_title: "RFC 9000: QUIC: A UDP-Based Multiplexed and Secure Transport"
    source_url: "https://www.ietf.org/rfc/rfc9000.html"
    confidence: "medium"
  - id: "fact-quic-2"
    statement: "RFC 9000 states that QUIC provides stream multiplexing, per-stream flow control, and low-latency connection establishment."
    source_title: "RFC 9000: QUIC: A UDP-Based Multiplexed and Secure Transport"
    source_url: "https://www.ietf.org/rfc/rfc9000.html"
    confidence: "medium"
  - id: "fact-quic-3"
    statement: "RFC 9001 specifies the use of TLS to secure QUIC."
    source_title: "RFC 9001: Using TLS to Secure QUIC"
    source_url: "https://www.ietf.org/rfc/rfc9001.html"
    confidence: "medium"
  - id: "fact-quic-4"
    statement: "RFC 9114 defines HTTP/3 as a mapping of HTTP semantics over QUIC."
    source_title: "RFC 9114: HTTP/3"
    source_url: "https://www.ietf.org/rfc/rfc9114.html"
    confidence: "medium"

completeness: 0.8

known_gaps:
  - "This compact repair avoids deployment-share claims and focuses on the standardized protocol model."

disputed_statements: []

primary_sources:
  - title: "RFC 9000: QUIC: A UDP-Based Multiplexed and Secure Transport"
    authors: ["Iyengar, J.", "Thomson, M."]
    type: "rfc"
    year: 2021
    url: "https://www.ietf.org/rfc/rfc9000.html"
    institution: "IETF"
  - title: "RFC 9001: Using TLS to Secure QUIC"
    authors: ["Thomson, M.", "Turner, S."]
    type: "rfc"
    year: 2021
    url: "https://www.ietf.org/rfc/rfc9001.html"
    institution: "IETF"
  - title: "RFC 9114: HTTP/3"
    authors: ["Bishop, M."]
    type: "rfc"
    year: 2022
    url: "https://www.ietf.org/rfc/rfc9114.html"
    institution: "IETF"

secondary_sources: []
updated: "2026-05-30"
---

## TL;DR

QUIC is a secure transport protocol built on UDP. It provides multiplexed streams, flow control, low-latency connection setup, and the transport foundation used by HTTP/3.

## Core Explanation

QUIC moves several transport responsibilities into an encrypted UDP-based protocol. Its stream model lets independent streams share one connection while retaining separate flow control.

The protocol is secured with TLS as specified for QUIC, and HTTP/3 maps HTTP semantics onto QUIC rather than onto TCP. That makes QUIC especially important for agents and applications that need to understand modern web transport behavior.

## Further Reading

- [RFC 9000: QUIC: A UDP-Based Multiplexed and Secure Transport](https://www.ietf.org/rfc/rfc9000.html)
- [RFC 9001: Using TLS to Secure QUIC](https://www.ietf.org/rfc/rfc9001.html)
- [RFC 9114: HTTP/3](https://www.ietf.org/rfc/rfc9114.html)

## Related Articles

- [HTTP/3: QUIC Protocol and Next-Generation Web Transport](../http-3-quic-protocol-and-next-generation-web-transport.md)
- [Hypertext Transfer Protocol (HTTP)](../http-protocol.md)
- [gRPC](../grpc.md)
