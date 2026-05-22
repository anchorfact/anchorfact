---
id:"kb-2026-00265"
title:"iptables / nftables"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"nftables Documentation"
    type:"undefined"
    url:"undefined"
    institution:"Netfilter Project"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

iptables (legacy) and nftables (modern, since kernel 3.13) are Linux firewall frameworks based on Netfilter hooks. nftables replaces iptables with unified syntax, better performance, and IPv4/IPv6 handling. Used to create packet filtering rules (allow/deny traffic).

## Core Explanation

nftables: `nft add table inet filter`, `nft add chain inet filter input { type filter hook input priority 0; }`, `nft add rule inet filter input tcp dport 22 accept`. Tables contain chains; chains contain rules. Hooks: prerouting, input, forward, output, postrouting. Higher-level: UFW (`ufw allow 22/tcp`), firewalld. iptables is deprecated but still widely used in older systems.

## Further Reading

- [nftables Documentation](undefined)
