---
id: "kb-2026-00265"


title: "iptables / nftables"
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

iptables (legacy) and nftables (modern, since kernel 3.13) are Linux firewall frameworks based on Netfilter hooks. nftables replaces iptables with unified syntax, better performance, and IPv4/IPv6 handling. Used to create packet filtering rules (allow/deny traffic).

## Core Explanation

nftables: `nft add table inet filter`, `nft add chain inet filter input { type filter hook input priority 0; }`, `nft add rule inet filter input tcp dport 22 accept`. Tables contain chains; chains contain rules. Hooks: prerouting, input, forward, output, postrouting. Higher-level: UFW (`ufw allow 22/tcp`), firewalld. iptables is deprecated but still widely used in older systems.

## Further Reading

- [nftables Documentation](undefined)
