---
id:"kb-2026-00287"
title:"Express.js"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Express.js Documentation"
    type:"documentation"
    year:2026
    url:"https://expressjs.com/"
    institution:"OpenJS Foundation"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Express.js is a minimal, unopinionated web framework for Node.js, created by TJ Holowaychuk (2010). It provides routing, middleware, request/response handling, and template engines. Express is the most popular Node.js framework and the foundation of MERN/MEAN stacks.

## Core Explanation

Middleware: functions with (req, res, next) — can modify request, end response, or pass control. `app.use(middleware)` for global, `app.get(path, handler)` for routes. Built on Node's http module. `express.Router()` for modular route handling. Error handling: four-argument middleware (err, req, res, next). Express 5.0 (2024) added Promise-based error handling and path regex changes.

## Further Reading

- [Express.js Documentation](https://expressjs.com/)
