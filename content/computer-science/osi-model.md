---
id: kb-2026-00184
title: OSI Model
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
ai_models:
  - claude-opus
derived_from_human_seed: true
known_gaps:
  - Sources reconstructed during quality audit; primary source details were corrupted during batch generation
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
    context: See primary sources for competing interpretations
atomic_facts:
  - id: fact-computer-science-01
    statement: The OSI model describes 7 layers of network communication
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-001
    statement: >-
      The OSI (Open Systems Interconnection) model describes 7 layers of network communication. While not literally implemented, it's the standard mental model for understanding networking. Layers:
      Physical, Data Link, Network, Transport, Session, Presentation, Application.
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-002
    statement: "TCP/IP model (4 layers): Link, Internet, Transport, Application — simpler, maps directly to real implementations."
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
completeness: 0.88
ai_citations: null
primary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
secondary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
---


## TL;DR

The OSI (Open Systems Interconnection) model describes 7 layers of network communication. While not literally implemented, it's the standard mental model for understanding networking. Layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.

## Core Explanation

Layer 1: cables, radio, bits on wire. Layer 2: MAC addresses, switches. Layer 3: IP addresses, routers. Layer 4: TCP/UDP, ports. Layers 5-7: often merged in TCP/IP model. TCP/IP model (4 layers): Link, Internet, Transport, Application — simpler, maps directly to real implementations.

## Further Reading

- [undefined](undefined)
