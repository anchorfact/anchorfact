---
id: data-postgresql-row-level-security-policies
title: 'Data PostgreSQL Row-Level Security Policies'
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-09'
created_date: '2026-06-09'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-data-postgresql-row-level-security-policies-1
    statement: >-
      PostgreSQL documentation says row security policies can restrict which
      rows are returned or modified by normal queries.
    source_title: PostgreSQL Row Security Policies
    source_url: https://www.postgresql.org/docs/current/ddl-rowsecurity.html
    confidence: medium
  - id: fact-computer-science-data-postgresql-row-level-security-policies-2
    statement: >-
      PostgreSQL documentation says row-level security must be enabled on a
      table with ALTER TABLE ENABLE ROW LEVEL SECURITY.
    source_title: PostgreSQL Row Security Policies
    source_url: https://www.postgresql.org/docs/current/ddl-rowsecurity.html
    confidence: medium
  - id: fact-computer-science-data-postgresql-row-level-security-policies-3
    statement: >-
      PostgreSQL documentation says if row-level security is enabled but no
      policies exist for a table, a default-deny policy is used.
    source_title: PostgreSQL Row Security Policies
    source_url: https://www.postgresql.org/docs/current/ddl-rowsecurity.html
    confidence: medium
  - id: fact-computer-science-data-postgresql-row-level-security-policies-4
    statement: >-
      PostgreSQL CREATE POLICY documentation says a policy grants permission to
      select, insert, update, or delete rows that match policy expressions.
    source_title: PostgreSQL CREATE POLICY
    source_url: https://www.postgresql.org/docs/current/sql-createpolicy.html
    confidence: medium
  - id: fact-computer-science-data-postgresql-row-level-security-policies-5
    statement: >-
      PostgreSQL CREATE POLICY documentation defines USING and WITH CHECK
      expressions for controlling visible and allowed rows.
    source_title: PostgreSQL CREATE POLICY
    source_url: https://www.postgresql.org/docs/current/sql-createpolicy.html
    confidence: medium
completeness: 0.84
known_gaps:
  - PostgreSQL RLS diagnosis depends on table owner, BYPASSRLS attributes, FORCE ROW LEVEL SECURITY, permissive versus restrictive policies, command type, role membership, current_user, session variables, security definer functions, and whether application-side caching or vector indexing bypasses database filters.
disputed_statements: []
primary_sources:
  - title: PostgreSQL Row Security Policies
    type: documentation
    year: 2026
    url: https://www.postgresql.org/docs/current/ddl-rowsecurity.html
    institution: PostgreSQL
  - title: PostgreSQL CREATE POLICY
    type: documentation
    year: 2026
    url: https://www.postgresql.org/docs/current/sql-createpolicy.html
    institution: PostgreSQL
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

PostgreSQL row-level security evidence tells data agents whether a missing row is absent, filtered by policy, or leaked by a path that bypassed database policy enforcement.

## Core Explanation

RLS changes the meaning of a query result. A `SELECT` that returns no rows may be correct for one role and incomplete for another. Agents need policy evidence before treating query output as the full table truth.

Useful evidence includes table RLS settings, active policies, policy command type, role, owner status, BYPASSRLS privileges, current user, session variables, application claims, and whether downstream caches, exports, or vector indexes preserve the same row filters.

## Source-Mapped Facts

- PostgreSQL documentation says row security policies can restrict which rows are returned or modified by normal queries. ([source](https://www.postgresql.org/docs/current/ddl-rowsecurity.html))
- PostgreSQL documentation says row-level security must be enabled on a table with ALTER TABLE ENABLE ROW LEVEL SECURITY. ([source](https://www.postgresql.org/docs/current/ddl-rowsecurity.html))
- PostgreSQL documentation says if row-level security is enabled but no policies exist for a table, a default-deny policy is used. ([source](https://www.postgresql.org/docs/current/ddl-rowsecurity.html))
- PostgreSQL CREATE POLICY documentation says a policy grants permission to select, insert, update, or delete rows that match policy expressions. ([source](https://www.postgresql.org/docs/current/sql-createpolicy.html))
- PostgreSQL CREATE POLICY documentation defines USING and WITH CHECK expressions for controlling visible and allowed rows. ([source](https://www.postgresql.org/docs/current/sql-createpolicy.html))

## Further Reading

- [PostgreSQL Row Security Policies](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [PostgreSQL CREATE POLICY](https://www.postgresql.org/docs/current/sql-createpolicy.html)
