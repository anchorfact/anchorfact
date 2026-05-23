---
id:"kb-2026-00188"
title:"MQTT Protocol"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
ai_models:["claude-opus"]
derived_from_human_seed:true


known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
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

MQTT is a lightweight publish-subscribe messaging protocol designed for constrained devices and low-bandwidth networks. Created by IBM (1999), standardized by OASIS. Used extensively in IoT: smart homes, industrial sensors, connected vehicles. QoS levels: 0 (at most once), 1 (at least once), 2 (exactly once).

## Core Explanation

Architecture: Broker (central server) + Clients (publishers and subscribers). Topics use hierarchical structure: `home/livingroom/temperature`. Retained messages: new subscribers receive last published message. Last Will and Testament (LWT): message published if client disconnects unexpectedly.

## Further Reading

- [undefined](undefined)
