---
id:"kb-2026-00295"
title:"GraphQL Schema Design"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"GraphQL Best Practices"
    type:"guide"
    year:2024
    url:"https://graphql.org/learn/best-practices/"
    institution:"GraphQL Foundation"
secondary_sources:
  - title: "Learning GraphQL"
    authors: ["Porcello", "Banks"]
    type: "book"
    year: 2018
    url: "https://www.oreilly.com/library/view/learning-graphql/9781492030706/"
    institution: "O'Reilly"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

GraphQL schema design defines types, queries, mutations, and relationships. Best practices: design around business domain (not database schema), use Relay-style pagination (edges/nodes), avoid deeply nested queries (N+1 solved by DataLoader), version via evolution (add fields, deprecate old ones — never remove).

## Core Explanation

Types: Object types (User, Post), Scalar types (String, Int, Float, Boolean, ID), Enum types, Input types (for mutations), Interface/Union. Connections (Relay spec): `edges { node, cursor }`, `pageInfo { hasNextPage }`. DataLoader: batching + caching — solves N+1. Nullability: non-null `String!` vs. nullable `String` — prefer non-null unless field can legitimately be null.

## Further Reading

- [GraphQL Best Practices](https://graphql.org/learn/best-practices/)
