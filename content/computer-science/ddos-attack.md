---
id: "kb-2026-00118"



title: "DDoS Attack"
schema_type: "TechArticle"



category: "computer-science"
language: "en"



confidence: "high"
last_verified: "2026-05-22"



generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true


known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"
    context: "See primary sources for competing interpretations"

completeness: 0.88
ai_citations:

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

A Distributed Denial-of-Service (DDoS) attack overwhelms a target with traffic from multiple sources, making it unavailable to legitimate users. Types: volumetric (saturate bandwidth), protocol (exploit TCP/SYN, DNS amplification), application-layer (HTTP flood, Slowloris). Defense: CDN scrubbing (Cloudflare, Akamai), rate limiting, anycast distribution.

## Core Explanation

SYN flood: attacker sends TCP SYN packets but never completes handshake, exhausting server's connection table. DNS amplification: attacker spoofs victim's IP, sends small queries to open DNS resolvers that reply with large responses. Mitigation: SYN cookies, connection rate limiting, IP reputation filtering. Cloud providers (AWS Shield, Google Cloud Armor) provide built-in DDoS protection.

## Further Reading

- [undefined](undefined)
