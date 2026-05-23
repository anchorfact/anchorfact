---
id: "kb-2026-00064"


title: "REST API"
schema_type: "TechArticle"


category: "computer-science"
language: "en"


confidence: "high"
confidence_rationale: "Based on Roy Fielding's doctoral dissertation (2000) and Richardson Maturity Model"


last_verified: "2026-05-22"
generation_method: "human_only"


ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "Architectural Styles and the Design of Network-based Software Architectures"
    authors: ["Fielding, Roy Thomas"]
    type: "dissertation"


    year: 2000
    url: "https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm"

    institution: "UC Irvine"
    note: "Chapter 5 defines REST"


secondary_sources:
  - title: "RESTful Web APIs"
    authors: ["Richardson", "Amundsen"]
    type: "book"


    year: 2013
    url: "https://www.oreilly.com/library/view/restful-web-apis/9781449359713/"

    institution: "O'Reilly"
atomic_facts:
  - id: fact-computer-science-01
    statement: >-
      REST is an architectural style for designing networked applications, defined by Roy Fielding in his 2000 doctoral
      dissertation at UC Irvine
    source_title: Architectural Styles and the Design of Network-based Software Architectures
    source_url: https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm
    confidence: medium
  - id: fact-computer-science-02
    statement: >-
      REST is the dominant API architecture on the web, used by virtually all major platforms including Google, Amazon,
      Twitter, and GitHub
    source_title: Architectural Styles and the Design of Network-based Software Architectures
    source_url: https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm
    confidence: medium
  
completeness: 0.88
known_gaps:
  - "Statistics and data cited are from 2013 and earlier; more recent data may have become available since publication"
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
  - "Recent developments from 2025-2026 may not be reflected"
related_entities:
  - "entity:http-protocol"
ai_citations:
---

## TL;DR

REST (Representational State Transfer) is an architectural style for designing networked applications, defined by Roy Fielding in his 2000 doctoral dissertation at UC Irvine. A REST API uses HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations on resources identified by URLs, with stateless communication and standardized response formats (typically JSON). REST is the dominant API architecture on the web, used by virtually all major platforms including Google, Amazon, Twitter, and GitHub.

## Core Constraints

- **Client-Server**: Separation of UI and data storage concerns
- **Stateless**: Each request contains all information needed; no server-side session state
- **Cacheable**: Responses explicitly marked as cacheable or non-cacheable
- **Uniform Interface**: Resources identified by URLs, manipulated via representations
- **Layered System**: Intermediaries (proxies, gateways) are transparent to client/server
- **Code on Demand** (optional): Server can extend client functionality by sending executable code

## Richardson Maturity Model

| Level | Description |
|:-----:|------------|
| 0 | Single endpoint, single method (RPC over HTTP) |
| 1 | Resources with individual URLs |
| 2 | HTTP verbs used properly (GET/POST/PUT/DELETE + status codes) |
| 3 | HATEOAS — hypermedia controls in responses |

## Further Reading

- [Fielding's Dissertation](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm): Chapter 5 defines REST
