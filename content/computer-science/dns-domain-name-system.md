---
id:"kb-2026-00181"
title:"DNS (Domain Name System)"
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
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

DNS translates human-readable domain names (anchorfact.org) to IP addresses (172.67.x.x). It's a hierarchical, distributed database — the 'phone book of the Internet'. DNS resolution: browser cache → OS cache → recursive resolver → root nameserver → TLD nameserver → authoritative nameserver.

## Core Explanation

Record types: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), TXT (SPF/DKIM), NS (nameserver). TTL (Time to Live) controls caching duration. DNSSEC adds cryptographic signatures to prevent DNS spoofing. DNS over HTTPS (DoH) and DNS over TLS (DoT) encrypt DNS queries.

## Further Reading

- [undefined](undefined)
