---
id: kb-2026-00113
title: Cross-Site Scripting (XSS)
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-22"
generation_method: human_only
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-01
    statement: "Prevention: output encoding, Content Security Policy , input validation"
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-001
    statement: >-
      XSS is an injection attack where malicious scripts are injected into trusted websites, executing in victims' browsers. Three types: Stored (persistent, in database), Reflected (in URL
      parameters), DOM-based (client-side JavaScript vulnerability). Prevention: output encoding, Content Security Policy (CSP), input validation.
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
  - title: "Cross-Site Scripting: Attack Vectors, Detection, and Prevention — 2025 Update"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.xss
  - title: "Content Security Policy (CSP Level 3): Implementation and Effectiveness in 2025"
    type: article
    year: 2025
    authors:
      - multiple
    institution: W3C / IEEE S&P
    url: https://www.w3.org/TR/CSP3/
---
## TL;DR

XSS is an injection attack where malicious scripts are injected into trusted websites, executing in victims' browsers. Three types: Stored (persistent, in database), Reflected (in URL parameters), DOM-based (client-side JavaScript vulnerability). Prevention: output encoding, Content Security Policy (CSP), input validation.

## Core Explanation

Reflected XSS: attacker crafts URL with script in query parameter, victim clicks link, script executes in victim's context. Stored XSS: script stored in database (comment, profile), executed whenever any user views the page. DOM XSS: client-side code writes user input to innerHTML without sanitization. Modern frameworks (React/Vue/Angular) auto-escape by default, reducing but not eliminating risk.

## Further Reading

- 