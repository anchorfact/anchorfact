---
id: "kb-2026-00201"


title: "Number Theory"
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

atomic_facts:
  - id: fact-computer-science-01
    statement: Chinese Remainder Theorem reconstructs numbers from modular residues
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  
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

Number theory is the study of integers — prime numbers, divisibility, modular arithmetic. It is the mathematical foundation of modern cryptography (RSA, ECC, Diffie-Hellman). Primes are infinite (Euclid's proof). Fundamental Theorem of Arithmetic: every integer >1 has unique prime factorization.

## Core Explanation

Modular arithmetic: a ≡ b (mod n) means a - b is divisible by n. RSA: security from difficulty of factoring large semiprimes (n = p*q). Euler's totient φ(n) counts numbers coprime to n. Fermat's Little Theorem: a^(p-1) ≡ 1 (mod p) for prime p. GCD via Euclidean algorithm (O(log n)). Chinese Remainder Theorem reconstructs numbers from modular residues.

## Further Reading

- [undefined](undefined)
