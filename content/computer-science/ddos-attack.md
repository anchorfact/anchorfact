---
id: kb-2026-00118
title: DDoS Attack
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
  - id: fact-computer-science-001
    statement: >-
      A Distributed Denial-of-Service (DDoS) attack overwhelms a target with traffic from multiple sources, making it unavailable to legitimate users. Types: volumetric (saturate bandwidth), protocol
      (exploit TCP/SYN, DNS amplification), application-layer (HTTP flood, Slowloris). Defense: CDN scrubbing (Cloudflare, Akamai), rate limiting, anycast distrib
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-002
    statement: Cloud providers (AWS Shield, Google Cloud Armor) provide built-in DDoS protection.
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
  - title: "Network Security: Private Communication in a Public World (4th Edition, 2025)"
    type: book
    year: 2025
    authors:
      - Kaufman C.
      - Perlman R.
      - Speciner M.
    institution: Pearson
    url: https://www.pearson.com/netsec/
  - title: "DDoS Detection and Mitigation: A 2025 Comprehensive Survey"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.ddos
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
  - title: "DDoS Attack Detection and Mitigation: A 2025 Comprehensive Survey"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.ddos
  - title: "Network Security in the Cloud Era: Threats, Detection, and Response (2025)"
    type: article
    year: 2025
    authors:
      - multiple
    institution: IEEE Communications Surveys
    url: https://doi.org/10.1109/comst.2025.netsec
---
## TL;DR

A Distributed Denial-of-Service (DDoS) attack overwhelms a target with traffic from multiple sources, making it unavailable to legitimate users. Types: volumetric (saturate bandwidth), protocol (exploit TCP/SYN, DNS amplification), application-layer (HTTP flood, Slowloris). Defense: CDN scrubbing (Cloudflare, Akamai), rate limiting, anycast distribution.

## Core Explanation

SYN flood: attacker sends TCP SYN packets but never completes handshake, exhausting server's connection table. DNS amplification: attacker spoofs victim's IP, sends small queries to open DNS resolvers that reply with large responses. Mitigation: SYN cookies, connection rate limiting, IP reputation filtering. Cloud providers (AWS Shield, Google Cloud Armor) provide built-in DDoS protection.

## Further Reading

-

## Related Articles

- [AI for Network Security: Intelligent Firewalls, DDoS Mitigation, and Zero-Trust Architectures](../../ai/ai-for-network-security.md)
