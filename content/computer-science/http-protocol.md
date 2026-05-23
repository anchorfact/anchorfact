---
id: "kb-2026-00008"


title: "Hypertext Transfer Protocol (HTTP)"
schema_type: "TechArticle"


category: "computer-science"
language: "en"


confidence: "high"
confidence_rationale: "Based on IETF RFCs 9110-9114 (2022), which replaced RFCs 7230-7235. These are the definitive, community-reviewed Internet standards."


last_verified: "2026-05-22"
generation_method: "human_only"


atomic_facts:
  - id: fact-computer-science-01
    statement: >-
      Originally designed by Tim Berners-Lee at CERN in 1989, it defines how clients request resources from servers and
      how servers respond
    source_title: RFC 9110 — HTTP Semantics
    source_url: https://www.rfc-editor.org/rfc/rfc9110
    confidence: medium
  - id: fact-computer-science-02
    statement: HTTP is the foundational application-layer protocol of the World Wide Web, standardized by the IETF
    source_title: MDN Web Docs — HTTP
    source_url: https://developer.mozilla.org/en-US/docs/Web/HTTP
    confidence: medium
  
completeness: 0.90
known_gaps:
  - "HTTP adoption percentages are Web Almanac estimates (2024-2025); exact numbers vary by measurement methodology"
related_entities:
  - "entity:tcp-ip"
  - "entity:world-wide-web"
  - "entity:websocket"
  - "entity:rest-api"
primary_sources:
  - title: "RFC 9110 — HTTP Semantics"
    authors: ["Fielding, R.", "Nottingham, M.", "Reschke, J."]
    type: "standard"


    year: 2022
    url: "https://www.rfc-editor.org/rfc/rfc9110"

    institution: "IETF"
  - title: "RFC 9112 — HTTP/1.1"
    authors: ["Fielding, R.", "Nottingham, M.", "Reschke, J."]
    type: "standard"


    year: 2022
    url: "https://www.rfc-editor.org/rfc/rfc9112"

    institution: "IETF"
  - title: "RFC 9113 — HTTP/2"
    authors: ["Thomson, M.", "Benfield, C."]
    type: "standard"


    year: 2022
    url: "https://www.rfc-editor.org/rfc/rfc9113"

    institution: "IETF"
  - title: "RFC 9114 — HTTP/3"
    authors: ["Bishop, M."]
    type: "standard"


    year: 2022
    url: "https://www.rfc-editor.org/rfc/rfc9114"

    institution: "IETF"
secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"


    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"

    institution: "Mozilla"
    note: "Practical developer reference maintained by Mozilla"
  - title: "HTTP/3 Explained"
    authors: ["Stenberg, Daniel"]
    type: "book"


    year: 2024
    url: "https://http3-explained.haxx.se/"

    institution: "Self-published (curl author)"
    note: "Comprehensive technical guide by the creator of curl"


ai_citations:
  - title: "HTTP/2 (RFC 9113)"
    type: "standard"


    year: 2022
    url: "https://www.rfc-editor.org/rfc/rfc9113"

    institution: "IETF"
  - title: "HTTP/3 (RFC 9114)"
    type: "standard"


    year: 2022
    url: "https://www.rfc-editor.org/rfc/rfc9114"

    institution: "IETF"
  - title: "HTTP/3 (RFC 9114)"
    type: "standard"


    year: 2022
    url: "https://www.rfc-editor.org/rfc/rfc9114"

    institution: "IETF"
  - title: "HTTP/2 (RFC 9113)"
    type: "standard"


    year: 2022
    url: "https://www.rfc-editor.org/rfc/rfc9113"

    institution: "IETF"
---

## TL;DR

HTTP (Hypertext Transfer Protocol) is the foundational application-layer protocol of the World Wide Web, standardized by the IETF. Originally designed by Tim Berners-Lee at CERN in 1989, it defines how clients request resources from servers and how servers respond. HTTP has evolved through four major versions: HTTP/0.9 (1991), HTTP/1.0 (1996) and 1.1 (1997/1999), HTTP/2 (2015), and HTTP/3 (2022 — the first version not using TCP, instead using QUIC over UDP). As of 2025, HTTP/2 and HTTP/3 together carry ~60% of global web traffic, and HTTP/3's QUIC transport represents the most fundamental architectural shift since the protocol's inception.

## Core Explanation

HTTP is a request-response protocol. The fundamental cycle:

1. Client opens a connection to server
2. Client sends a **request message**
3. Server processes and returns a **response message**
4. Connection may be closed or reused

Each message consists of three parts:

```
REQUEST                              RESPONSE
GET /index.html HTTP/1.1            HTTP/1.1 200 OK
Host: example.com                   Content-Type: text/html
Accept: text/html                   Content-Length: 1234
                                    Cache-Control: max-age=3600
[empty line]                        [empty line]
                                    <!DOCTYPE html>...
```

- **Start line**: Method + target + version (request) | Version + status code + reason (response)
- **Headers**: Key-value pairs — metadata about the request/response
- **Body** (optional): The payload (HTML, JSON, binary data)

HTTP is fundamentally **stateless**: each request is independent. Application state is managed through higher-level mechanisms — cookies (`Set-Cookie` / `Cookie` headers), tokens (Authorization headers), or URL parameters.

## Detailed Analysis

### Version Evolution

| Version | Year | Transport | Key Innovation | Head-of-Line Blocking? |
|---------|:----:|-----------|---------------|:----------------------:|
| HTTP/0.9 | 1991 | TCP | `GET /path` → HTML response. Single line. No headers. | N/A (single request) |
| HTTP/1.0 | 1996 | TCP | Headers, status codes, `Content-Type`. One request per connection by default. | Yes |
| HTTP/1.1 | 1997 | TCP | Persistent connections, pipelining (broken in practice), chunked transfer, Host header, caching (Cache-Control). Dominant for 20 years. | Yes (pipelining didn't solve it) |
| HTTP/2 | 2015 | TCP | Binary framing, multiplexed streams, header compression (HPACK), server push. | At transport layer (TCP); streams fine |
| HTTP/3 | 2022 | QUIC (UDP) | 0-RTT resumption, no HOL blocking, connection migration, mandatory TLS 1.3 | No |

The head-of-line blocking problem: In HTTP/1.1, if the first of 6 parallel requests stalls, all 6 stall — because responses must be delivered in order. HTTP/2 solves this by multiplexing requests over independent streams, but TCP itself can still cause HOL blocking at the transport layer (a lost TCP packet blocks all streams). HTTP/3's QUIC solves this definitively: each stream is independent at the transport layer, so a lost packet affects only its stream.

### HTTP Methods

| Method | Semantics | Idempotent? | Safe? | Body? |
|--------|-----------|:----------:|:-----:|:-----:|
| **GET** | Retrieve a resource | Yes | Yes | No |
| **HEAD** | Like GET but no response body | Yes | Yes | No |
| **POST** | Submit data, create resource | No | No | Yes |
| **PUT** | Replace or create a resource at a known URI | Yes | No | Yes |
| **DELETE** | Remove a resource | Yes | No | No |
| **PATCH** | Partial update of a resource | No | No | Yes |
| **OPTIONS** | Describe communication options for a resource | Yes | Yes | No |

- **Idempotent**: Multiple identical requests have the same effect as a single request. Safe to retry on failure.
- **Safe**: Does not modify the resource. Can be cached, pre-fetched, and crawled freely.

### Status Code Classes

| Class | Meaning | Key Codes |
|:-----:|---------|-----------|
| **1xx** | Informational | `100 Continue`, `101 Switching Protocols` (WebSocket upgrade) |
| **2xx** | Success | `200 OK`, `201 Created`, `204 No Content` |
| **3xx** | Redirection | `301 Moved Permanently`, `302 Found`, `304 Not Modified` (caching) |
| **4xx** | Client Error | `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `429 Too Many Requests` |
| **5xx** | Server Error | `500 Internal Server Error`, `502 Bad Gateway`, `503 Service Unavailable` |

### HTTP/3 Deep Dive: Why QUIC Matters

HTTP/3's use of QUIC (RFC 9000, 2021) is the most significant change in HTTP's history:

| Feature | TCP (HTTP/2) | QUIC (HTTP/3) |
|---------|:-----------:|:------------:|
| Handshake | 1-RTT (TCP + TLS 1.3) | 0-RTT for previously visited sites |
| Stream multiplexing | Shared TCP congestion control | Independent per-stream |
| Head-of-line blocking | TCP level: lost packet blocks all | No transport-level HOL blocking |
| Connection migration | Breaks on IP change | Survives WiFi→cellular switches |
| Encryption | Optional (but commonly TLS) | Mandatory TLS 1.3 |

These improvements are most noticeable on mobile networks (frequent IP changes, higher packet loss) and for multiplexed applications (video streaming with chat, collaborative editing).

## Further Reading

- [RFC 9110 — HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110): The definitive HTTP standard
- [MDN HTTP Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP): Practical developer reference
- [HTTP/3 Explained](https://http3-explained.haxx.se/): By Daniel Stenberg, curl author
