---
id:"kb-2026-00190"
title:"QUIC Protocol"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
ai_models:["claude-opus"]
derived_from_human_seed:true


known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
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

QUIC is a UDP-based transport protocol developed by Google (2012) and standardized as IETF RFC 9000 (2021). It is the foundation of HTTP/3. Key innovations: 0-RTT connection, multiplexed streams without head-of-line blocking, built-in TLS 1.3 encryption, and connection migration (survives IP changes).

## Core Explanation

QUIC eliminates TCP's head-of-line blocking by treating each stream independently — lost packets in one stream don't block others. 0-RTT: for previously visited servers, data can be sent immediately. Connection ID enables seamless WiFi-to-cellular switching. QUIC is mandatory encrypted (TLS 1.3 built-in). Adoption: all Google services, Facebook, Cloudflare, ~35% of web traffic.

## Further Reading

- [undefined](undefined)
