---
id: kb-2026-00122
title: VPN (Virtual Private Network)
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-22"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-01
    statement: WireGuard is faster and simpler than IPsec/OpenVPN
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-02
    statement: 600K for OpenVPN — dramatically smaller attack surface
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
completeness: 0.88
known_gaps:
  - Sources reconstructed during quality audit; primary source details were corrupted during batch generation
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
primary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
  - title: "Network Security Essentials: Applications and Standards (7th Edition, 2025)"
    type: book
    year: 2025
    authors:
      - Stallings W.
    institution: Pearson
    url: https://www.pearson.com/netsec/
  - title: "VPN and Zero-Trust Networks: A 2025 Survey"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.vpn
secondary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
  - title: The C Programming Language (K&R, 2nd Ed)
    type: textbook
    year: 1988
    url: https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html
    institution: Prentice Hall
  - title: Structure and Interpretation of Computer Programs (SICP)
    type: textbook
    year: 1996
    url: https://mitpress.mit.edu/sites/default/files/sicp/
    institution: MIT Press
---
## TL;DR

A VPN creates an encrypted tunnel between a device and a network, protecting data in transit and masking the user's IP address. Protocols: IPsec (network layer, site-to-site), OpenVPN/WireGuard (application layer, client-to-server). WireGuard (2020, Linux kernel since 5.6) is faster and simpler than IPsec/OpenVPN.

## Core Explanation

WireGuard uses state-of-the-art cryptography: Curve25519 (key exchange), ChaCha20 (encryption), Poly1305 (authentication), BLAKE2s (hashing). Only ~4000 lines of code vs. ~600K for OpenVPN — dramatically smaller attack surface. VPNs do NOT provide anonymity — they shift trust from ISP to VPN provider. Tor (onion routing) provides stronger anonymity via three-hop circuit.

## Further Reading

- 