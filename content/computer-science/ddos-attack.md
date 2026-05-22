---
id:"kb-2026-00118"
title:"DDoS Attack"
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
    institution:"NIST"
secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
  - title: "DNS and BIND (5th Ed)"
    authors: ["Liu", "Albitz"]
    type: "book"
    year: 2006
    url: "https://www.oreilly.com/library/view/dns-and-bind/0596100574/"
    institution: "O'Reilly"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

A Distributed Denial-of-Service (DDoS) attack overwhelms a target with traffic from multiple sources, making it unavailable to legitimate users. Types: volumetric (saturate bandwidth), protocol (exploit TCP/SYN, DNS amplification), application-layer (HTTP flood, Slowloris). Defense: CDN scrubbing (Cloudflare, Akamai), rate limiting, anycast distribution.

## Core Explanation

SYN flood: attacker sends TCP SYN packets but never completes handshake, exhausting server's connection table. DNS amplification: attacker spoofs victim's IP, sends small queries to open DNS resolvers that reply with large responses. Mitigation: SYN cookies, connection rate limiting, IP reputation filtering. Cloud providers (AWS Shield, Google Cloud Armor) provide built-in DDoS protection.

## Further Reading

- [undefined](undefined)
