---
id: "kb-2026-00095"



title: "Same-Origin Policy"
schema_type: "TechArticle"



category: "computer-science"
language: "en"



confidence: "high"
confidence_rationale: "Based on authoritative sources and industry standards"



last_verified: "2026-05-22"
generation_method: "human_only"



derived_from_human_seed: true
primary_sources:
  - title: "Same-Origin Policy (MDN Web Docs)"
    type: "documentation"



    year: 2024
    url: "https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy"


    institution: "Mozilla"

secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"



    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"


    institution: "Mozilla"
  - title: "RESTful Web APIs"
    authors: ["Richardson", "Amundsen"]
    type: "book"



    year: 2013
    url: "https://www.oreilly.com/library/view/restful-web-apis/9781449359713/"


    institution: "O'Reilly"
known_gaps:
  - "Content verified during quality audit; citations cross-referenced with authoritative sources"
disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"
    context: "See primary sources for competing interpretations"

completeness: 0.88
ai_citations:
---

## TL;DR

The Same-Origin Policy (SOP) is a critical web security mechanism restricting how documents and scripts from one origin interact with resources from another origin. Origin = protocol + host + port. SOP prevents malicious websites from reading sensitive data from other sites.

## Core Explanation

SOP restricts: DOM access (a page on origin A cannot read origin B's iframe/document content), XMLHttpRequest/Fetch to different origins (unless CORS permits), and cookie/WebStorage access. It does NOT restrict: embedding resources (`<img>`, `<script>`, `<link>`), form submissions, or redirects. SOP is fundamental to browser security and predates CORS.

## Further Reading

- [Same-Origin Policy (MDN Web Docs)](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
