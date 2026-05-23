---
id: "kb-2026-00114"



title: "Cross-Site Request Forgery (CSRF)"
schema_type: "TechArticle"



category: "computer-science"
language: "en"



confidence: "high"
last_verified: "2026-05-22"



generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true


known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"
    context: "See primary sources for competing interpretations"

completeness: 0.88
ai_citations:

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

CSRF forces authenticated users to execute unwanted actions on a web application. The attacker tricks the victim's browser into sending a request that the application treats as legitimate because it carries the user's session cookie. Prevention: anti-CSRF tokens, SameSite cookies, custom headers.

## Core Explanation

SameSite cookie attribute (2020+): `Strict` (never sent cross-site), `Lax` (default since Chrome 80, sent on top-level navigation GET), `None` (always sent, requires Secure). Modern frameworks (Laravel, Django, Rails) include CSRF protection by default. Double-submit cookie pattern: send token in both cookie and request header.

## Further Reading

- [undefined](undefined)
