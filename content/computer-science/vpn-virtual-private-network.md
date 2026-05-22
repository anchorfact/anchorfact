---
id:"kb-2026-00122"
title:"VPN (Virtual Private Network)"
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

A VPN creates an encrypted tunnel between a device and a network, protecting data in transit and masking the user's IP address. Protocols: IPsec (network layer, site-to-site), OpenVPN/WireGuard (application layer, client-to-server). WireGuard (2020, Linux kernel since 5.6) is faster and simpler than IPsec/OpenVPN.

## Core Explanation

WireGuard uses state-of-the-art cryptography: Curve25519 (key exchange), ChaCha20 (encryption), Poly1305 (authentication), BLAKE2s (hashing). Only ~4000 lines of code vs. ~600K for OpenVPN — dramatically smaller attack surface. VPNs do NOT provide anonymity — they shift trust from ISP to VPN provider. Tor (onion routing) provides stronger anonymity via three-hop circuit.

## Further Reading

- [undefined](undefined)
