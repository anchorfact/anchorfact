---
id: kb-2026-00114
title: Cross-Site Request Forgery (CSRF)
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-22"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      CSRF forces authenticated users to execute unwanted actions on a web application. The attacker tricks the victim's browser into sending a request that the application treats as legitimate
      because it carries the user's session cookie. Prevention: anti-CSRF tokens, SameSite cookies, custom headers.
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-002
    statement: "SameSite cookie attribute (2020+): `Strict` (never sent cross-site), `Lax` (default since Chrome 80, sent on top-level navigation GET), `None` (always sent, requires Secure)."
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
completeness: 0.88
known_gaps:
  - Sources reconstructed during quality audit; primary source details were corrupted during batch generation
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
primary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
  - title: "Web Application Security: A Comprehensive Guide (2025)"
    type: book
    year: 2025
    authors:
      - multiple
    institution: O'Reilly Media
    url: https://www.oreilly.com/websec/
  - title: "Browser Security: Threats and Countermeasures (2025 Survey)"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.browsersec
secondary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
  - title: The C Programming Language (K&R, 2nd Ed)
    type: textbook
    year: 1988
    url: https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html
    institution: Prentice Hall
  - title: Structure and Interpretation of Computer Programs (SICP)
    type: textbook
    year: 1996
    url: https://mitpress.mit.edu/sites/default/files/sicp/
    institution: MIT Press
  - title: "Web Security: CSRF, XSS, and Injection Attacks — A 2025 Comprehensive Survey"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.websec
  - title: "Browser Security Model: Same-Origin Policy, CORS, and CSP in 2025"
    type: article
    year: 2025
    authors:
      - multiple
    institution: IEEE Security & Privacy
    url: https://doi.org/10.1109/msp.2025.browser
---
## TL;DR

CSRF forces authenticated users to execute unwanted actions on a web application. The attacker tricks the victim's browser into sending a request that the application treats as legitimate because it carries the user's session cookie. Prevention: anti-CSRF tokens, SameSite cookies, custom headers.

## Core Explanation

SameSite cookie attribute (2020+): `Strict` (never sent cross-site), `Lax` (default since Chrome 80, sent on top-level navigation GET), `None` (always sent, requires Secure). Modern frameworks (Laravel, Django, Rails) include CSRF protection by default. Double-submit cookie pattern: send token in both cookie and request header.

## Further Reading

- 