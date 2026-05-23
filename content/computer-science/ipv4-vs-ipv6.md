---
id:"kb-2026-00183"
title:"IPv4 vs IPv6"
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

IPv4 (1981) uses 32-bit addresses (~4.3 billion). IPv6 (1998) uses 128-bit addresses (340 undecillion). IPv4 exhausted in 2019 (last /8 allocated). IPv6 adoption: ~45% globally (2025). IPv6 eliminates NAT (every device gets public IP) and simplifies header format.

## Core Explanation

IPv4: `192.168.1.1`, NAT needed due to address shortage. IPv6: `2001:db8::1`, no broadcast (uses multicast), built-in IPsec, autoconfiguration (SLAAC), larger payload. Key challenges: dual-stack transition, legacy application compatibility. Most cloud providers and CDNs (Cloudflare, AWS) support IPv6.

## Further Reading

- [undefined](undefined)
- [undefined](undefined)
