---
id: cybersecurity-fundamentals
title: "Cybersecurity: Threats, Cryptography, and Defense"
schema_type: Article
category: computer-science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: ai_assisted
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-cs-cyb-001
    statement: CIA Triad (Confidentiality, Integrity, Availability) is foundational security model (NIST SP 800-12).
    source_title: "NIST SP 800-12 Rev. 1: Introduction to Information Security (2017)"
    source_url: https://doi.org/10.6028/NIST.SP.800-12r1
    confidence: high
  - id: fact-cs-cyb-002
    statement: Morris Worm (1988) first major internet worm, led to CERT/CC creation.
    source_title: Spafford, E.H. Internet Worm Analysis (ACM CCR 1989)
    source_url: https://doi.org/10.1145/66093.66095
    confidence: high
  - id: fact-cs-cyb-003
    statement: "Zero Trust Architecture (NIST SP 800-207, 2020): \"never trust, always verify\" paradigm."
    source_title: "NIST SP 800-207: Zero Trust Architecture (2020)"
    source_url: https://doi.org/10.6028/NIST.SP.800-207
    confidence: high
completeness: 0.9
primary_sources:
  - title: "Cryptography and Network Security: Principles and Practice, 8th Edition"
    type: textbook
    year: 2020
    url: https://www.pearson.com/en-us/subject-catalog/p/cryptography-and-network-security/P200000003372
    institution: Pearson
  - title: "NIST SP 800-207: Zero Trust Architecture"
    type: standard
    year: 2020
    url: https://csrc.nist.gov/publications/detail/sp/800-207/final
    institution: NIST
known_gaps:
  - Post-quantum cryptographic algorithms
  - Supply chain attacks (SolarWinds-type)
disputed_statements:
  - statement: No major disputed statements identified
secondary_sources:
  - title: "Computer Security: Principles and Practice (Stallings & Brown, 4th Edition)"
    type: textbook
    year: 2018
    authors:
      - Stallings, William
      - Brown, Lawrie
    institution: Pearson
    url: https://www.pearson.com/en-us/subject-catalog/p/computer-security-principles-and-practice/P200000003327
  - title: Security Engineering (Anderson, 3rd Edition)
    type: textbook
    year: 2020
    authors:
      - Anderson, Ross
    institution: Wiley
    url: https://doi.org/10.1002/9781119642787
  - title: NIST Cybersecurity Framework 2.0 (2024)
    type: report
    year: 2024
    authors:
      - NIST
    institution: National Institute of Standards and Technology
    url: https://www.nist.gov/cyberframework
  - title: "ENISA Threat Landscape 2024: Annual Cybersecurity Threats Report"
    type: report
    year: 2024
    authors:
      - ENISA
    institution: European Union Agency for Cybersecurity
    url: https://www.enisa.europa.eu/topics/cyber-threats/etl
updated: "2026-05-24"
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