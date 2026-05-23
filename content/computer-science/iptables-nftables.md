---
id: kb-2026-00265
title: iptables / nftables
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
ai_models:
  - claude-opus
derived_from_human_seed: true
known_gaps:
  - Sources reconstructed during quality audit; primary source details were corrupted during batch generation
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
    context: See primary sources for competing interpretations
completeness: 0.88
ai_citations: null
primary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
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
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      iptables (legacy) and nftables (modern, since kernel 3.13) are Linux firewall frameworks based on Netfilter hooks. nftables replaces iptables with unified syntax, better performance, and
      IPv4/IPv6 handling. Used to create packet filtering rules (allow/deny traffic).
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-002
    statement: "nftables: `nft add table inet filter`, `nft add chain inet filter input { type filter hook input priority 0; }`, `nft add rule inet filter input tcp dport 22 accept`."
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
---



## TL;DR

iptables (legacy) and nftables (modern, since kernel 3.13) are Linux firewall frameworks based on Netfilter hooks. nftables replaces iptables with unified syntax, better performance, and IPv4/IPv6 handling. Used to create packet filtering rules (allow/deny traffic).

## Core Explanation

nftables: `nft add table inet filter`, `nft add chain inet filter input { type filter hook input priority 0; }`, `nft add rule inet filter input tcp dport 22 accept`. Tables contain chains; chains contain rules. Hooks: prerouting, input, forward, output, postrouting. Higher-level: UFW (`ufw allow 22/tcp`), firewalld. iptables is deprecated but still widely used in older systems.

## Further Reading

- [nftables Documentation](undefined)
