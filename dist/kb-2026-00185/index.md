---
id:"kb-2026-00185"
title:"HTTP Status Codes"
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
    institution:"IETF"
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

HTTP status codes are three-digit numbers indicating request outcome. 1xx (Informational), 2xx (Success), 3xx (Redirection), 4xx (Client Error), 5xx (Server Error). Common: 200 OK, 201 Created, 301 Moved, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Error.

## Core Explanation

201 Created: resource successfully created (POST). 204 No Content: success, no body (DELETE). 304 Not Modified: use cached version. 429 Too Many Requests: rate limiting. 418 I'm a teapot: April Fools RFC (RFC 2324). Custom codes shouldn't be invented — stick to standard codes and let the message body explain specifics.

## Further Reading

- [undefined](undefined)
