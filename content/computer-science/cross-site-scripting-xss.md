---
id: "kb-2026-00113"



title: "Cross-Site Scripting (XSS)"
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

atomic_facts:
  - id: fact-computer-science-01
    statement: "Prevention: output encoding, Content Security Policy , input validation"


    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  
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

XSS is an injection attack where malicious scripts are injected into trusted websites, executing in victims' browsers. Three types: Stored (persistent, in database), Reflected (in URL parameters), DOM-based (client-side JavaScript vulnerability). Prevention: output encoding, Content Security Policy (CSP), input validation.

## Core Explanation

Reflected XSS: attacker crafts URL with script in query parameter, victim clicks link, script executes in victim's context. Stored XSS: script stored in database (comment, profile), executed whenever any user views the page. DOM XSS: client-side code writes user input to innerHTML without sanitization. Modern frameworks (React/Vue/Angular) auto-escape by default, reducing but not eliminating risk.

## Further Reading

- [undefined](undefined)
