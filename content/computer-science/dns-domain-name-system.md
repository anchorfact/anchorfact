---
id: "kb-2026-00181"
title: "DNS (Domain Name System)"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-01"
    statement: "Designed by Paul Mockapetris in 1983 , DNS is one of the oldest Internet protocols still in active use and is a critical dependency for virtually every Internet application"
    source_title: "RFC 4033 — DNS Security Introduction and Requirements"
    source_url: "https://www.rfc-editor.org/rfc/rfc4033"
    confidence: "medium"
  - id: "fact-computer-science-02"
    statement: "The Domain Name System is a hierarchical, distributed database that translates human-readable domain names into machine-readable IP addresses"
    source_title: "RFC 1035 — Domain Names — Implementation and Specification"
    source_url: "https://www.rfc-editor.org/rfc/rfc1035"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "DNS-over-QUIC (RFC 9250, 2022) is an emerging standard not yet widely deployed; not covered in depth"

disputed_statements:
  - statement: "The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches"

primary_sources:
  - title: "RFC 1035 — Domain Names — Implementation and Specification"
    authors: ["Mockapetris, P."]
    type: "standard"
    year: 1987
    url: "https://www.rfc-editor.org/rfc/rfc1035"
    institution: "IETF"
  - title: "RFC 4033 — DNS Security Introduction and Requirements"
    authors: ["Arends, R.", "Austein, R.", "Larson, M.", "Massey, D.", "Rose, S."]
    type: "standard"
    year: 2005
    url: "https://www.rfc-editor.org/rfc/rfc4033"
    institution: "IETF"

secondary_sources:
  - title: "DNS and BIND (5th Edition)"
    authors: ["Liu, Cricket", "Albitz, Paul"]
    type: "book"
    year: 2006
    url: "https://www.oreilly.com/library/view/dns-and-bind/0596100574/"
    institution: "O'Reilly"
  - title: "DNS-over-HTTPS (RFC 8484)"
    authors: ["Hoffman, P.", "McManus, P."]
    type: "standard"
    year: 2018
    url: "https://www.rfc-editor.org/rfc/rfc8484"
    institution: "IETF"

---


## TL;DR

The Domain Name System (DNS) is a hierarchical, distributed database that translates human-readable domain names (e.g., `anchorfact.org`) into machine-readable IP addresses (e.g., `172.67.x.x`). Designed by Paul Mockapetris in 1983 (RFCs 882/883, superseded by RFCs 1034/1035 in 1987), DNS is one of the oldest Internet protocols still in active use and is a critical dependency for virtually every Internet application. A typical DNS resolution traverses: browser cache → OS cache (stub resolver) → recursive resolver (ISP/public) → root nameserver → TLD nameserver → authoritative nameserver, completing in typically 20-120 milliseconds. DNSSEC (RFCs 4033-4035, 2005) adds cryptographic signatures to prevent spoofing; DoH/DoT (RFCs 8484/7858, 2018) encrypt queries to prevent eavesdropping.

## Core Explanation

DNS operates as a tree of nameservers, each responsible for a zone of the namespace:

```
                         . (root)
              ┌───────────┼───────────┐
             org          com         net
          ┌───┴───┐      ...
    anchorfact   wikipedia
```

### Resolution Process

When a user types `anchorfact.org` into a browser:

1. **Browser cache**: Check if the IP is cached locally (typically 1-5 minutes for most domains)
2. **OS stub resolver** (`/etc/resolv.conf` or systemd-resolved): Checks OS-level cache
3. **Recursive resolver** (ISP or public: `8.8.8.8`, `1.1.1.1`): If not cached, begins full resolution:
   - Queries a **root nameserver**: "Who handles `.org`?"
   - Root responds with the `.org` TLD nameserver addresses
   - Queries the `.org` **TLD nameserver**: "Who handles `anchorfact.org`?"
   - TLD responds with Cloudflare's authoritative nameservers
   - Queries the **authoritative nameserver**: "What's the IP for `anchorfact.org`?"
   - Gets the A/AAAA record and returns it to the client
4. Browser connects to the IP address

Recursive resolvers cache aggressively: the root and TLD nameservers see only a fraction of queries because their responses are cached at the resolver layer. The root nameservers handle approximately 2% of global DNS traffic — the rest is answered from cache.

## Detailed Analysis

### DNS Resource Record Types

| Type | Name | Purpose | Example Value |
|------|------|---------|---------------|
| **A** | Address | Maps hostname to IPv4 address | `203.0.113.1` |
| **AAAA** | IPv6 Address | Maps hostname to IPv6 address | `2001:db8::1` |
| **CNAME** | Canonical Name | Alias: one domain to another | `www.example.com → example.com` |
| **MX** | Mail Exchange | Email server for domain | `10 mail.example.com` (priority 10) |
| **NS** | Nameserver | Authoritative nameserver for domain | `ns1.example.com` |
| **TXT** | Text | Arbitrary text (SPF, DKIM, DMARC, verification) | `v=spf1 include:_spf.google.com ~all` |
| **SOA** | Start of Authority | Administrative information for zone | Serial number, refresh interval, retry, expiry |

**TTL** (Time To Live): Each record has a TTL (in seconds) that tells resolvers how long to cache it. Low TTL (60-300s) enables rapid DNS changes (useful for failover); high TTL (3600-86400s) reduces query load and improves performance. The SOA record's `minimum` field acts as the default TTL for negative responses (NXDOMAIN caching).

### DNS Security Extensions

**DNSSEC** (RFCs 4033-4035, 2005): Adds cryptographic signatures to DNS responses, allowing resolvers to verify that:
1. The response came from the legitimate authoritative nameserver (origin authentication)
2. The response was not modified in transit (data integrity)

It does NOT encrypt the query or response — it only signs them. DNSSEC uses a chain of trust: root zone signed → TLD zone signed by root → domain zone signed by TLD. Each parent zone publishes a DS (Delegation Signer) record for its child zones.

**Encrypted DNS: DoT and DoH:**

| Protocol | Transport | Port | Standard |
|----------|-----------|:----:|----------|
| **DoT** (DNS over TLS) | TCP + TLS | 853 | RFC 7858 (2016) |
| **DoH** (DNS over HTTPS) | TCP + HTTPS (HTTP/2) | 443 | RFC 8484 (2018) |
| **DoQ** (DNS over QUIC) | UDP + QUIC | 853 | RFC 9250 (2022) |

DoH is indistinguishable from regular HTTPS traffic (port 443), making it harder to block and easier to deploy (works through most firewalls). DoT uses a dedicated port, making it easier for network administrators to manage. Public encrypted DNS providers include Cloudflare (`1.1.1.1`), Google (`8.8.8.8`), and Quad9 (`9.9.9.9`).

### DNS in Practice

| Property | Typical Value |
|----------|:------------:|
| Maximum UDP packet size | 512 bytes (standard), up to 4096 with EDNS0 |
| Timeout for recursive query | 2-5 seconds (multiple attempts) |
| Root nameservers | 13 logical (letters A-M), ~1,700 physical instances (anycast) |
| TLDs | ~1,500 (2026, includes new gTLDs) |
| DNSSEC adoption | ~30% of domains (varies by TLD; .gov, .se near 100%) |

## Further Reading

- [RFC 1035 — DNS Specification](https://www.rfc-editor.org/rfc/rfc1035): The core DNS protocol (Mockapetris, 1987)
- [DNSSEC (RFCs 4033-4035)](https://www.rfc-editor.org/rfc/rfc4033): Cryptographic DNS security
- [DNS and BIND (O'Reilly)](https://www.oreilly.com/library/view/dns-and-bind/0596100574/): The canonical DNS reference

## Related Articles

- [AI for Climate Science: Weather Prediction and Earth System Modeling](../../ai/ai-for-climate-science.md)
- [AI for Digital Twins: Real-Time Simulation, Predictive Maintenance, and System Optimization](../../ai/ai-for-digital-twins.md)
- [Conversational AI: Task-Oriented Dialogue and Open-Domain Chatbots](../../ai/conversational-ai-systems.md)
