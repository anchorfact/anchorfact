---
id: "kb-2026-00181"
title: "DNS (Domain Name System)"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "medium"
last_verified: "2026-05-30"
created_date: "2026-05-22"
generation_method: "human_only"
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-dns-1"
    statement: "RFC 1034 defines the Domain Name System as a distributed database using a hierarchical name space."
    source_title: "RFC 1034: Domain Names - Concepts and Facilities"
    source_url: "https://www.ietf.org/rfc/rfc1034.txt"
    confidence: "medium"
  - id: "fact-dns-2"
    statement: "RFC 1034 describes DNS as having three major components: the domain name space and resource records, name servers, and resolvers."
    source_title: "RFC 1034: Domain Names - Concepts and Facilities"
    source_url: "https://www.ietf.org/rfc/rfc1034.txt"
    confidence: "medium"
  - id: "fact-dns-3"
    statement: "RFC 4033 states that DNSSEC adds data origin authentication and data integrity to the DNS."
    source_title: "RFC 4033: DNS Security Introduction and Requirements"
    source_url: "https://www.ietf.org/rfc/rfc4033.txt"
    confidence: "medium"

completeness: 0.78

known_gaps:
  - "This compact repair does not cover every DNS transport extension or deployment statistic."

disputed_statements: []

primary_sources:
  - title: "RFC 1034: Domain Names - Concepts and Facilities"
    authors: ["Mockapetris, P."]
    type: "rfc"
    year: 1987
    url: "https://www.ietf.org/rfc/rfc1034.txt"
    institution: "IETF"
  - title: "RFC 1035: Domain Names - Implementation and Specification"
    authors: ["Mockapetris, P."]
    type: "rfc"
    year: 1987
    url: "https://www.ietf.org/rfc/rfc1035.txt"
    institution: "IETF"
  - title: "RFC 4033: DNS Security Introduction and Requirements"
    authors: ["Arends, R.", "Austein, R.", "Larson, M.", "Massey, D.", "Rose, S."]
    type: "rfc"
    year: 2005
    url: "https://www.ietf.org/rfc/rfc4033.txt"
    institution: "IETF"

secondary_sources: []
updated: "2026-05-30"
---

## TL;DR

DNS is the Internet's distributed naming system. It maps names into typed resource records through a hierarchy of zones, name servers, and resolvers. DNSSEC extends the base system with cryptographic checks for origin authentication and data integrity, while leaving DNS query contents visible unless a separate encrypted transport is used.

## Core Explanation

DNS avoids a single central hosts file by distributing responsibility across a hierarchical namespace. A resolver asks name servers for records such as address, name server, mail exchange, or text records, and caches answers according to the record data it receives.

The core architecture has three parts: the domain name space and its resource records, name servers that hold information about zones, and resolvers that query name servers on behalf of applications.

## Further Reading

- [RFC 1034: Domain Names - Concepts and Facilities](https://www.ietf.org/rfc/rfc1034.txt)
- [RFC 1035: Domain Names - Implementation and Specification](https://www.ietf.org/rfc/rfc1035.txt)
- [RFC 4033: DNS Security Introduction and Requirements](https://www.ietf.org/rfc/rfc4033.txt)

## Related Articles

- [DNS: The Domain Name System Architecture and Security](../dns-the-domain-name-system-architecture-and-security.md)
- [HTTPS / TLS (Transport Layer Security)](../https-tls.md)
- [TCP/IP Protocol Suite](../tcp-ip.md)
