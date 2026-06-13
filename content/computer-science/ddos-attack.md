---
id: kb-2026-00118
title: DDoS Attack
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-14'
created_date: '2026-05-22'
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-ddos-001
    statement: >-
      CISA describes a denial-of-service attack as a condition where legitimate users
      cannot access information systems, devices, or network resources because malicious
      traffic or activity makes the target unable to respond or causes it to crash.
    source_title: Understanding Denial-of-Service Attacks
    source_url: https://www.cisa.gov/news-events/news/understanding-denial-service-attacks
    confidence: medium
  - id: fact-computer-science-ddos-002
    statement: >-
      CISA describes a distributed denial-of-service attack as multiple machines operating
      together against one target, often through a botnet of hijacked internet-connected
      devices.
    source_title: Understanding Denial-of-Service Attacks
    source_url: https://www.cisa.gov/news-events/news/understanding-denial-service-attacks
    confidence: medium
  - id: fact-computer-science-ddos-003
    statement: >-
      AWS Shield documentation groups detected DDoS attacks into network volumetric
      attacks at layer 3, network protocol attacks at layer 4, and application layer
      attacks at layer 7.
    source_title: How AWS Shield and Shield Advanced work
    source_url: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-overview.html
    confidence: medium
  - id: fact-computer-science-ddos-004
    statement: >-
      AWS Shield Advanced documentation says automatic application-layer DDoS mitigation
      can count or block web requests that are part of an attack by managing mitigation
      rules in an associated AWS WAF web ACL.
    source_title: Automating application layer DDoS mitigation with Shield Advanced
    source_url: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-automatic-app-layer-response.html
    confidence: medium
completeness: 0.82
known_gaps:
  - >-
    Coverage is intentionally defensive and conceptual; it does not enumerate exploit
    payloads, botnet operation, reflector abuse, or provider-specific configuration steps.
disputed_statements: []
primary_sources:
  - title: Understanding Denial-of-Service Attacks
    type: government_guidance
    year: 2026
    url: https://www.cisa.gov/news-events/news/understanding-denial-service-attacks
    institution: Cybersecurity and Infrastructure Security Agency
  - title: How AWS Shield and Shield Advanced work
    type: documentation
    year: 2026
    url: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-overview.html
    institution: Amazon Web Services
  - title: Automating application layer DDoS mitigation with Shield Advanced
    type: documentation
    year: 2026
    url: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-automatic-app-layer-response.html
    institution: Amazon Web Services
secondary_sources: []
updated: '2026-06-14'
---

## TL;DR

A DDoS attack is an availability attack in which many machines direct traffic or requests
at one target so legitimate users cannot use the service. Defensive analysis normally
separates network volumetric, network protocol, and application-layer attacks, then routes
mitigation through traffic filtering, provider protection services, web ACL rules, and
recovery planning.

## Core Explanation

The repaired article narrows the topic to source-backed defensive facts. CISA frames a DoS
condition as loss of access for legitimate users when malicious activity floods or crashes
a target. CISA distinguishes DDoS by its distributed source: multiple machines, often
coordinated through hijacked internet-connected devices, operate together against one
target.

AWS Shield documentation provides the layer-based taxonomy used here. Infrastructure attacks
include network volumetric attacks at layer 3 and protocol attacks at layer 4, while
application-layer attacks operate at layer 7 by flooding valid-looking application requests.
For mitigation, AWS Shield Advanced can manage AWS WAF web ACL rules that count or block web
requests identified as part of application-layer DDoS traffic. CISA also recommends
preparing recovery plans and using DoS protection services that detect abnormal flows and
filter traffic before clean traffic reaches the protected network.

## Further Reading

- [Understanding Denial-of-Service Attacks](https://www.cisa.gov/news-events/news/understanding-denial-service-attacks)
- [How AWS Shield and Shield Advanced work](https://docs.aws.amazon.com/waf/latest/developerguide/ddos-overview.html)
- [Automating application layer DDoS mitigation with Shield Advanced](https://docs.aws.amazon.com/waf/latest/developerguide/ddos-automatic-app-layer-response.html)

## Related Articles

- [Cybersecurity: Threats, Cryptography, and Defense](cybersecurity-fundamentals.md)
- [Firewall](firewall.md)
- [Content Delivery Network (CDN)](content-delivery-network-cdn.md)
