---
id:"kb-2026-00299"
title:"Deno"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Deno Documentation"
    type:"documentation"
    year:2026
    url:"https://docs.deno.com/"
    institution:"Deno Land"
secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
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

Deno (Ryan Dahl, 2018, Node.js creator) is a secure JavaScript/TypeScript runtime built on Rust (Tokio) and V8. Native TypeScript support, security-first (no file/network access by default), built-in tooling (formatter, linter, test runner, bundler). Deno 2 (2024) added backward compatibility with Node.js/npm ecosystem.

## Core Explanation

Security: `--allow-net`, `--allow-read`, `--allow-write` explicitly grant permissions. `deno compile` creates standalone binaries. `deno fmt` / `deno lint` built-in. URL imports replace node_modules: `import {} from 'https://...'`. Deno 2: `deno add npm:express` — use npm packages natively. Fresh: Deno's full-stack web framework (Preact + islands architecture).

## Further Reading

- [Deno Documentation](https://docs.deno.com/)
