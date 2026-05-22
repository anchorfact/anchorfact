---
id:"kb-2026-00173"
title:"Package Managers (npm, yarn, pnpm)"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"npm Documentation"
    type:"documentation"
    year:2026
    url:"https://docs.npmjs.com/"
    institution:"npm Inc."
secondary_sources:
  - title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
    authors: ["Lewis", "Perez", "Piktus"]
    type: "academic_paper"
    year: 2020
    doi: "10.48550/arXiv.2005.11401"
    url: "https://arxiv.org/abs/2005.11401"
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

Package managers automate dependency installation, version management, and script execution. npm (Node Package Manager) is the default for Node.js with 2M+ packages. Yarn (Facebook, 2016) added deterministic installs via lockfiles. pnpm (2017) saves disk space via content-addressable storage (symlinked node_modules).

## Core Explanation

`package.json`: dependencies (runtime), devDependencies (build/test), peerDependencies (host provides), optionalDependencies. Semantic versioning (semver): MAJOR.MINOR.PATCH. `^1.2.3` allows minor/patch updates; `~1.2.3` allows patch only. `package-lock.json` pins exact versions for reproducible builds. `npx` runs packages without installing.

## Further Reading

- [npm Documentation](https://docs.npmjs.com/)
