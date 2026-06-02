---
id: api-cors-preflight-and-browser-agent-requests
title: 'API CORS Preflight and Browser Agent Requests'
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-02'
created_date: '2026-06-02'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-cs-api-cors-preflight-and-browser-agent-requests-1
    statement: >-
      MDN documentation describes CORS as using HTTP headers to let a server indicate which
      origins are permitted to load resources.
    source_title: MDN CORS
    source_url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
    confidence: medium
  - id: fact-cs-api-cors-preflight-and-browser-agent-requests-2
    statement: >-
      MDN Fetch API documentation describes credentials in fetch requests and CORS interaction.
    source_title: MDN Using Fetch
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    confidence: medium
  - id: fact-cs-api-cors-preflight-and-browser-agent-requests-3
    statement: >-
      Cloudflare Workers documentation provides an example of adding CORS headers to responses.
    source_title: Cloudflare Workers CORS Headers
    source_url: https://developers.cloudflare.com/workers/examples/cors-header-proxy/
    confidence: medium
completeness: 0.83
known_gaps:
  - Browser request behavior depends on origin, credentials mode, allowed methods, allowed headers, preflight cache, redirects, cookies, private network access, and edge proxy behavior.
disputed_statements: []
primary_sources:
  - title: MDN CORS
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
    institution: Mozilla
  - title: MDN Using Fetch
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    institution: Mozilla
  - title: Cloudflare Workers CORS Headers
    type: documentation
    year: 2026
    url: https://developers.cloudflare.com/workers/examples/cors-header-proxy/
    institution: Cloudflare
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

CORS and preflight behavior explain why a browser-based agent may fail to call an API that works from curl or a server.

## Core Explanation

Agents running in a browser inherit browser security rules. A request with custom headers, credentials, or non-simple methods can require a preflight exchange before the actual request. If the server or edge function does not answer the preflight with the right headers, the browser blocks the call.

The agent should inspect the request origin, credentials mode, method, headers, OPTIONS response, and CORS response headers. A CORS failure is often a policy mismatch, not an API authentication failure.

## Source-Mapped Facts

- MDN documentation describes CORS as using HTTP headers to let a server indicate which origins are permitted to load resources. ([source](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS))
- MDN Fetch API documentation describes credentials in fetch requests and CORS interaction. ([source](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch))
- Cloudflare Workers documentation provides an example of adding CORS headers to responses. ([source](https://developers.cloudflare.com/workers/examples/cors-header-proxy/))

## Further Reading

- [MDN CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)
- [MDN Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Cloudflare Workers CORS Headers](https://developers.cloudflare.com/workers/examples/cors-header-proxy/)
