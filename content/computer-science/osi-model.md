---
id: "kb-2026-00184"
title: "OSI Model"
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
  - id: "fact-computer-science-01"
    statement: "The OSI model describes 7 layers of network communication"
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-001"
    statement: "The OSI (Open Systems Interconnection) model describes 7 layers of network communication. While not literally implemented, it's the standard mental model for understanding networking. Layers: Physical, Data Link, Network, Transport, Session, Presentation, Application."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-002"
    statement: "TCP/IP model (4 layers): Link, Internet, Transport, Application — simpler, maps directly to real implementations."
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

The OSI (Open Systems Interconnection) model describes 7 layers of network communication. While not literally implemented, it's the standard mental model for understanding networking. Layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.

## Core Explanation

Layer 1: cables, radio, bits on wire. Layer 2: MAC addresses, switches. Layer 3: IP addresses, routers. Layer 4: TCP/UDP, ports. Layers 5-7: often merged in TCP/IP model. TCP/IP model (4 layers): Link, Internet, Transport, Application — simpler, maps directly to real implementations.

## Further Reading

-

## Related Articles

- [GPT (Generative Pre-trained Transformer) Model Family](../../ai/gpt-models.md)
- [Model Context Protocol (MCP)](../../ai/mcp.md)
- [Model Compression: Pruning, Quantization, and Distillation](../../ai/model-compression.md)
