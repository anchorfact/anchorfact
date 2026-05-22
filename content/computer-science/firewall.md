---
id:"kb-2026-00121"
title:"Firewall"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"undefined"
    type:"undefined"
    url:"undefined"
    institution:"NIST"
secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

A firewall is a network security system that monitors and controls incoming/outgoing traffic based on predetermined rules. Types: packet filtering (stateless, layer 3/4), stateful inspection (tracks connection state), application-layer (WAF, layer 7), next-generation (NGFW, combines all).

## Core Explanation

Packet filters examine source/destination IP, port, protocol. Stateful firewalls maintain connection tables and can make contextual decisions (allow reply packets for established connections). WAF (Web Application Firewall) inspects HTTP requests for SQL injection, XSS, and other application attacks. Modern cloud-native approaches: security groups (AWS), network policies (Kubernetes).

## Further Reading

- [undefined](undefined)
