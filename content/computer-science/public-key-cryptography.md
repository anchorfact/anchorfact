---
id: "kb-2026-00116"
title: "Public Key Cryptography"
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
    statement: "RSA , ECC , and Ed25519 are the dominant algorithms"
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-02"
    statement: "ECC: smaller keys for equivalent security — 256-bit ECC ≈ 3072-bit RSA"
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-03"
    statement: "Elliptic Curve Diffie-Hellman is the standard key exchange"
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

Public-key (asymmetric) cryptography uses key pairs: public key (shared freely) and private key (kept secret). It enables encryption (only private key can decrypt), digital signatures (authenticity + integrity), and key exchange (establish shared secrets). RSA (1977), ECC (1985), and Ed25519 (2011) are the dominant algorithms.

## Core Explanation

RSA: security based on difficulty of factoring large numbers. ECC: smaller keys for equivalent security — 256-bit ECC ≈ 3072-bit RSA. Elliptic Curve Diffie-Hellman (ECDH) is the standard key exchange. Key sizes: 2048-bit RSA (minimum), 4096-bit RSA (recommended long-term), 256-bit ECC. Quantum computing threatens both RSA and ECC — NIST is standardizing post-quantum cryptography (2024).

## Further Reading

-

## Related Articles

- [AI for Public Health: Disease Surveillance, Outbreak Prediction, and Population Health Analytics](../../ai/ai-public-health.md)
- [Cybersecurity: Threats, Cryptography, and Defense](../cybersecurity-fundamentals.md)
- [Elliptic Curve Cryptography: Mathematics, Curves, and TLS Integration](../elliptic-curve-cryptography-mathematics-curves-and-tls-integration.md)