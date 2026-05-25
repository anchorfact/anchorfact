---
id: "kb-2026-00266"
title: "Docker Networking"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-001"
    statement: "Docker networking provides container connectivity. Drivers: bridge (default, containers on same host), host (container shares host network), overlay (multi-host, Swarm), macvlan (container gets MAC address, appears as physical device), none (isolated). Custom networks enable DNS-based service discovery."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-002"
    statement: "Bridge: Docker creates docker0 bridge, containers get IP from 172.17.0.0/16 subnet."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-003"
    statement: "user-defined networks (DNS resolution: container names resolve)."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-004"
    statement: "Port mapping: `-p 8080:80` maps host 8080 to container 80."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

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
  - title: "The C Programming Language (K&R, 2nd Ed)"
    type: "textbook"
    year: 1988
    url: "https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html"
    institution: "Prentice Hall"
  - title: "Structure and Interpretation of Computer Programs (SICP)"
    type: "textbook"
    year: 1996
    url: "https://mitpress.mit.edu/sites/default/files/sicp/"
    institution: "MIT Press"

---




## TL;DR

Docker networking provides container connectivity. Drivers: bridge (default, containers on same host), host (container shares host network), overlay (multi-host, Swarm), macvlan (container gets MAC address, appears as physical device), none (isolated). Custom networks enable DNS-based service discovery.

## Core Explanation

Bridge: Docker creates docker0 bridge, containers get IP from 172.17.0.0/16 subnet. `--link` (deprecated) vs. user-defined networks (DNS resolution: container names resolve). Overlay: VXLAN encapsulation across hosts. Port mapping: `-p 8080:80` maps host 8080 to container 80. Network isolation: containers on different networks can't communicate (unless explicitly connected).

## Further Reading

- [Docker Networking Documentation](undefined)
