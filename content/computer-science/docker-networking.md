---
id:"kb-2026-00266"
title:"Docker Networking"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Docker Networking Documentation"
    type:"undefined"
    url:"undefined"
    institution:"Docker Inc."
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Docker networking provides container connectivity. Drivers: bridge (default, containers on same host), host (container shares host network), overlay (multi-host, Swarm), macvlan (container gets MAC address, appears as physical device), none (isolated). Custom networks enable DNS-based service discovery.

## Core Explanation

Bridge: Docker creates docker0 bridge, containers get IP from 172.17.0.0/16 subnet. `--link` (deprecated) vs. user-defined networks (DNS resolution: container names resolve). Overlay: VXLAN encapsulation across hosts. Port mapping: `-p 8080:80` maps host 8080 to container 80. Network isolation: containers on different networks can't communicate (unless explicitly connected).

## Further Reading

- [Docker Networking Documentation](undefined)
