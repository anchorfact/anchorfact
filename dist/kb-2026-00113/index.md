---
id:"kb-2026-00113"
title:"Cross-Site Scripting (XSS)"
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
    institution:"OWASP"
secondary_sources:
  - title: "The Rust Programming Language (2nd Ed)"
    authors: ["Klabnik", "Nichols"]
    type: "book"
    year: 2023
    url: "https://nostarch.com/rust-programming-language-2nd-edition"
    institution: "No Starch Press"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

XSS is an injection attack where malicious scripts are injected into trusted websites, executing in victims' browsers. Three types: Stored (persistent, in database), Reflected (in URL parameters), DOM-based (client-side JavaScript vulnerability). Prevention: output encoding, Content Security Policy (CSP), input validation.

## Core Explanation

Reflected XSS: attacker crafts URL with script in query parameter, victim clicks link, script executes in victim's context. Stored XSS: script stored in database (comment, profile), executed whenever any user views the page. DOM XSS: client-side code writes user input to innerHTML without sanitization. Modern frameworks (React/Vue/Angular) auto-escape by default, reducing but not eliminating risk.

## Further Reading

- [undefined](undefined)
