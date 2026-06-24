---
id: kb-2026-00250
title: Entity-Relationship Model
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-24'
created_date: '2026-05-22'
generation_method: ai_structured
ai_models:
  - gpt-5-codex
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-entity-relationship-model-001
    statement: >-
      Peter Chen's ACM Transactions on Database Systems article is titled "The
      entity-relationship model - toward a unified view of data."
    source_title: The entity-relationship model - toward a unified view of data
    source_url: https://doi.org/10.1145/320434.320440
    source_doi: 10.1145/320434.320440
    confidence: medium
  - id: fact-entity-relationship-model-002
    statement: >-
      IBM Informix documentation summarizes the entity-relationship data-modeling
      method as identifying principal data objects, relationships, and attributes;
      diagramming the objects; translating them into relational constructs; resolving
      the logical data model; and normalizing the logical data model.
    source_title: Overview of the entity-relationship data model
    source_url: https://www.ibm.com/docs/en/SSGU8G_12.1.0/com.ibm.ddi.doc/ids_ddi_163.htm
    confidence: medium
  - id: fact-entity-relationship-model-003
    statement: >-
      IBM Db2 documentation describes logical database design as the first database
      design task before implementation and describes logical data modeling as
      documenting business information requirements in an accurate and consistent format.
    source_title: Logical database design using entity-relationship modeling
    source_url: https://www.ibm.com/docs/en/db2-for-zos/12.0.0?topic=relationships-logical-database-design-using-entity-relationship-modeling
    confidence: medium
  - id: fact-entity-relationship-model-004
    statement: >-
      IBM Db2 documentation lists one-to-many, many-to-one, one-to-one, and many-to-many
      as relationship types that can be expressed in a relational database design.
    source_title: Entities for different types of relationships
    source_url: https://www.ibm.com/docs/en/db2-for-zos/12.0.0?topic=modeling-entities-different-types-relationships
    confidence: medium
  - id: fact-entity-relationship-model-005
    statement: >-
      Oracle SQL Developer Data Modeler documentation says cardinality defines how many
      occurrences of one entity exist for one occurrence of a related entity, including
      1:1, 1:N, and N:M cases, and maps N:M relationships to a reference table in the
      relational model.
    source_title: Data Modeler Concepts and Usage
    source_url: https://docs.oracle.com/database/sql-developer-data-modeler-17.4/DMDUG/data-modeler-concepts-usage.htm
    confidence: medium
completeness: 0.86
known_gaps:
  - >-
    This compact repair focuses on conceptual ER modeling and relational mapping; it does
    not cover every notation variant, conceptual-modeling extension, or CASE tool feature.
disputed_statements: []
primary_sources:
  - title: The entity-relationship model - toward a unified view of data
    authors:
      - Chen, Peter P.
    type: academic_paper
    year: 1976
    url: https://doi.org/10.1145/320434.320440
    doi: 10.1145/320434.320440
    institution: ACM Transactions on Database Systems
  - title: Overview of the entity-relationship data model
    type: documentation
    year: 2026
    url: https://www.ibm.com/docs/en/SSGU8G_12.1.0/com.ibm.ddi.doc/ids_ddi_163.htm
    institution: IBM
  - title: Logical database design using entity-relationship modeling
    type: documentation
    year: 2026
    url: https://www.ibm.com/docs/en/db2-for-zos/12.0.0?topic=relationships-logical-database-design-using-entity-relationship-modeling
    institution: IBM
  - title: Entities for different types of relationships
    type: documentation
    year: 2026
    url: https://www.ibm.com/docs/en/db2-for-zos/12.0.0?topic=modeling-entities-different-types-relationships
    institution: IBM
  - title: Data Modeler Concepts and Usage
    type: documentation
    year: 2017
    url: https://docs.oracle.com/database/sql-developer-data-modeler-17.4/DMDUG/data-modeler-concepts-usage.htm
    institution: Oracle
secondary_sources: []
updated: '2026-06-24'
---

## TL;DR

The Entity-Relationship (ER) model is a conceptual database modeling approach for
describing entities, their attributes, and relationships before committing to physical
tables. It is useful when a team needs a stable business-level data model that can later
be translated into relational schema structures.

## Core Explanation

ER modeling starts before database implementation. IBM frames logical design as the first
database design task and describes logical data modeling as documenting business information
requirements in a consistent format. In practice, that means naming the main entity types,
recording their attributes, and making the relationships between them explicit.

Relationship cardinality is the part of an ER model that says how many instances can
participate on each side of a relationship. Oracle's Data Modeler documentation gives the
common 1:1, 1:N, and N:M cases; IBM Db2 documentation also lists one-to-one, one-to-many,
many-to-one, and many-to-many relationship types. A many-to-many relationship usually needs
an extra relational structure, such as a reference or junction table, when translated into a
relational schema.

The repaired article keeps the scope deliberately narrow: ER modeling is treated as a
conceptual modeling technique, not as a complete tutorial on every diagram notation or
database vendor's modeling tool.

## Source-Mapped Facts

- Peter Chen's ACM Transactions on Database Systems article is titled "The entity-relationship model - toward a unified view of data." ([source](https://doi.org/10.1145/320434.320440))
- IBM Informix documentation summarizes the entity-relationship data-modeling method as identifying principal data objects, relationships, and attributes; diagramming the objects; translating them into relational constructs; resolving the logical data model; and normalizing the logical data model. ([source](https://www.ibm.com/docs/en/SSGU8G_12.1.0/com.ibm.ddi.doc/ids_ddi_163.htm))
- IBM Db2 documentation describes logical database design as the first database design task before implementation and describes logical data modeling as documenting business information requirements in an accurate and consistent format. ([source](https://www.ibm.com/docs/en/db2-for-zos/12.0.0?topic=relationships-logical-database-design-using-entity-relationship-modeling))
- IBM Db2 documentation lists one-to-many, many-to-one, one-to-one, and many-to-many as relationship types that can be expressed in a relational database design. ([source](https://www.ibm.com/docs/en/db2-for-zos/12.0.0?topic=modeling-entities-different-types-relationships))
- Oracle SQL Developer Data Modeler documentation says cardinality defines how many occurrences of one entity exist for one occurrence of a related entity, including 1:1, 1:N, and N:M cases, and maps N:M relationships to a reference table in the relational model. ([source](https://docs.oracle.com/database/sql-developer-data-modeler-17.4/DMDUG/data-modeler-concepts-usage.htm))

## Further Reading

- [The entity-relationship model - toward a unified view of data](https://doi.org/10.1145/320434.320440)
- [Overview of the entity-relationship data model](https://www.ibm.com/docs/en/SSGU8G_12.1.0/com.ibm.ddi.doc/ids_ddi_163.htm)
- [Logical database design using entity-relationship modeling](https://www.ibm.com/docs/en/db2-for-zos/12.0.0?topic=relationships-logical-database-design-using-entity-relationship-modeling)
- [Data Modeler Concepts and Usage](https://docs.oracle.com/database/sql-developer-data-modeler-17.4/DMDUG/data-modeler-concepts-usage.htm)

## Related Articles

- [Database Normalization](database-normalization.md)
- [SQL (Structured Query Language)](sql.md)
- [Database Indexing](database-indexing.md)
