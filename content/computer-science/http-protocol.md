---
id: "kb-2026-00008"
title: "Hypertext Transfer Protocol (HTTP)"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
confidence_rationale: "Based on IETF RFCs 7230-7235 and RFC 9110-9114, the definitive standards"
last_verified: "2026-05-22"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
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
completeness: 0.90
related_entities:
  - "entity:tcp-ip"
  - "entity:world-wide-web"
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

HTTP (Hypertext Transfer Protocol) is the foundational application-layer protocol of the World Wide Web, standardized by the IETF. It defines how clients (browsers, apps) request resources from servers and how servers respond. HTTP has evolved through four major versions: HTTP/0.9 (1991), HTTP/1.0 and 1.1 (1996-1997), HTTP/2 (2015), and HTTP/3 (2022). As of 2026, HTTP/2 and HTTP/3 together carry the majority of global web traffic, and HTTP/3's use of QUIC (UDP-based instead of TCP) represents a fundamental architectural shift.

## Core Explanation

HTTP is a request-response protocol operating over a transport layer. A client sends a request message to a server, which processes it and returns a response. Each message consists of:

1. **Start line**: Method (GET, POST), target URL, and protocol version (request); status code and reason (response)
2. **Headers**: Key-value metadata (Content-Type, Authorization, Cache-Control)
3. **Body** (optional): The actual payload (HTML, JSON, binary)

HTTP is stateless — each request is independent. State is managed through cookies, tokens, or other application-layer mechanisms.

## Detailed Analysis

### Version Evolution

| Version | Year | Transport | Key Innovation | Adoption (2026) |
|---------|:----:|-----------|---------------|:---------------:|
| HTTP/0.9 | 1991 | TCP | Single-line requests, HTML only | 0% |
| HTTP/1.0 | 1996 | TCP | Headers, status codes, content negotiation | 0% |
| HTTP/1.1 | 1997 | TCP | Persistent connections, chunked transfer, caching | ~40% |
| HTTP/2 | 2015 | TCP | Multiplexed streams, header compression (HPACK), server push | ~45% |
| HTTP/3 | 2022 | QUIC (UDP) | 0-RTT connection, no head-of-line blocking, migration | ~15% |

### HTTP Methods

| Method | Semantics | Idempotent | Safe |
|--------|-----------|:---------:|:----:|
| **GET** | Retrieve a resource | Yes | Yes |
| **POST** | Submit data, create resource | No | No |
| **PUT** | Replace or create a resource | Yes | No |
| **DELETE** | Remove a resource | Yes | No |
| **PATCH** | Partial update | No | No |
| **HEAD** | Like GET but no body | Yes | Yes |
| **OPTIONS** | Describe communication options | Yes | Yes |

### Status Codes

HTTP status codes are three-digit integers grouped by the first digit:

- **1xx Informational**: Request received, continuing process (100 Continue, 101 Switching Protocols)
- **2xx Success**: Request successfully processed (200 OK, 201 Created, 204 No Content)
- **3xx Redirection**: Further action needed (301 Moved Permanently, 302 Found, 304 Not Modified)
- **4xx Client Error**: Request invalid or cannot be fulfilled (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests)
- **5xx Server Error**: Server failed to process valid request (500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable)

### HTTP/3 and QUIC

HTTP/3 represents the most significant architectural change in HTTP's history. Instead of TCP, it uses QUIC — a UDP-based transport protocol developed by Google and standardized by the IETF. Key benefits:

- **0-RTT connection establishment**: For previously visited sites, data can be sent immediately
- **No head-of-line blocking**: Lost packets affect only the affected stream, not all concurrent streams
- **Connection migration**: Connections survive IP address changes (WiFi → cellular)
- **Built-in encryption**: TLS 1.3 is mandatory, not optional

## Further Reading

- [RFC 9110 — HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110): The definitive HTTP standard
- [MDN HTTP Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP): Practical developer reference
- [HTTP/3 Explained](https://http3-explained.haxx.se/): Comprehensive guide by Daniel Stenberg (curl author)
