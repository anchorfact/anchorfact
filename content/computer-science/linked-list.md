---
id: kb-2026-00127
title: Linked List
schema_type: TechArticle
category: computer-science
language: en
confidence: low
last_verified: "2026-05-28"
created_date: "2026-05-22"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-linked-list-1
    statement: A linked list is a data structure whose nodes contain data and links to other nodes.
    source_title: linked list
    source_url: https://xlinux.nist.gov/dads/HTML/linkedList.html
    confidence: low
  - id: fact-linked-list-2
    statement: Singly linked lists store a reference from each node to the next node in the sequence.
    source_title: Linked Lists
    source_url: https://opendatastructures.org/ods-python/3_Linked_Lists.html
    confidence: low
  - id: fact-linked-list-3
    statement: Linked-list traversal follows node references rather than using contiguous array indexing.
    source_title: Linked Lists
    source_url: https://opendatastructures.org/ods-python/3_Linked_Lists.html
    confidence: low
completeness: 0.88
known_gaps:
  - This compact repair keeps only source-mapped public claims from the sampled audit entry.
disputed_statements: []
primary_sources:
  - title: linked list
    type: government_report
    year: 2020
    url: https://xlinux.nist.gov/dads/HTML/linkedList.html
    institution: NIST Dictionary of Algorithms and Data Structures
  - title: Linked Lists
    type: course_material
    year: 2013
    url: https://opendatastructures.org/ods-python/3_Linked_Lists.html
    institution: Open Data Structures
  - title: Sequence Data Structures
    type: course_material
    year: 2013
    url: https://opendatastructures.org/ods-python/2_Sequence_Data_Structures.html
    institution: Open Data Structures
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

A linked list stores data in nodes connected by links, trading indexed access for local insertion and deletion flexibility. This repair maps linked-list claims to data-structure sources.

## Core Explanation

The previous article had low source verification. This version keeps three simple data-structure facts with direct references.

## Further Reading

- [linked list](https://xlinux.nist.gov/dads/HTML/linkedList.html)
- [Linked Lists](https://opendatastructures.org/ods-python/3_Linked_Lists.html)
- [Sequence Data Structures](https://opendatastructures.org/ods-python/2_Sequence_Data_Structures.html)
