---
id: "cybersecurity-fundamentals"
title: "Cybersecurity: Threats, Cryptography, and Defense"
schema_type: "Article"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "af-cybersecurity-fundamentals-1"
    statement: "RSA encryption (Rivest-Shamir-Adleman, 1977) uses the difficulty of factoring large semiprimes — a 2048-bit RSA key requires factoring a 617-digit number. Shor's quantum algorithm would break RSA, motivating post-quantum cryptography standards (NIST, 2024)."
    source_title: "Rivest, Shamir, Adleman (1977) / NIST PQC (2024)"
    confidence: "high"
  - id: "af-cybersecurity-fundamentals-2"
    statement: "Zero Trust architecture — \"never trust, always verify\" — replaces perimeter-based security with continuous authentication of every access request. NIST SP 800-207 (2020) defines the Zero Trust framework adopted by the US federal government."
    source_title: "NIST SP 800-207 (2020)"
    confidence: "high"

completeness: 0.9

primary_sources:
  - title: "Cryptography and Network Security: Principles and Practice, 8th Edition"
    type: "textbook"
    year: 2020
    url: "https://www.pearson.com/en-us/subject-catalog/p/cryptography-and-network-security/P200000003372"
    institution: "Pearson"
  - title: "NIST SP 800-207: Zero Trust Architecture"
    type: "standard"
    year: 2020
    url: "https://csrc.nist.gov/publications/detail/sp/800-207/final"
    institution: "NIST"

known_gaps:
  - "Post-quantum cryptographic algorithms"
  - "Supply chain attacks (SolarWinds-type)"

disputed_statements:
  - statement: "No major disputed statements identified"

---

## TL;DR
Cybersecurity protects digital systems through layered defense: cryptography secures data; network security blocks attacks; Zero Trust eliminates implicit trust. The threat landscape evolves as fast as the technology it defends.

## Core Explanation
The CIA triad: Confidentiality (encryption, access control), Integrity (hashing, digital signatures), Availability (DDoS protection, redundancy). Symmetric encryption (AES — same key encrypts/decrypts) vs asymmetric (RSA, ECC — public key encrypts, private key decrypts). Hashing (SHA-256) provides data integrity verification.

## Detailed Analysis
Defense layers: firewall (packet filtering), IDS/IPS (intrusion detection/prevention), endpoint protection (antivirus, EDR), SIEM (security information and event management). The human factor remains the weakest link — phishing accounts for 90% of data breaches.

## Further Reading
- OWASP Top 10
- NIST Cybersecurity Framework
- Krebs on Security