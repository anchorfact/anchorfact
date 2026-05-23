---
id: "kb-2026-00288"


title: "Django"
schema_type: "TechArticle"


category: "computer-science"
language: "en"


confidence: "high"
last_verified: "2026-05-22"


generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Django Documentation"
    type: "documentation"


    year: 2026
    url: "https://docs.djangoproject.com/"

    institution: "Django Software Foundation"
    note: "Official Django docs: ORM, admin, authentication, MVT architecture, middleware"


secondary_sources:
  - title: "RESTful Web APIs"
    authors: ["Richardson, Leonard", "Amundsen, Mike"]
    type: "book"


    year: 2013
    url: "https://www.oreilly.com/library/view/restful-web-apis/9781449359713/"

    institution: "O'Reilly"
    note: "Django REST Framework (DRF) is the standard way to build REST APIs with Django"


atomic_facts:
  - id: fact-computer-science-01
    statement: Django is a high-level Python web framework that follows 'batteries-included' philosophy
    source_title: Django Documentation
    source_url: https://docs.djangoproject.com/
    confidence: medium
  - id: fact-computer-science-02
    statement: "Template language: Django Template Language with inheritance, filters, tags"

    source_title: Django Documentation
    source_url: https://docs.djangoproject.com/
    confidence: medium
  
completeness: 0.88
known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
ai_citations:
---

## TL;DR

Django is a high-level Python web framework (2005) that follows 'batteries-included' philosophy. ORM, admin interface, authentication, form handling, and templating are built-in. Follows MVT (Model-View-Template) architecture. Used by Instagram, Pinterest, Mozilla, Disqus.

## Core Explanation

ORM: `User.objects.filter(active=True)` — Python code maps to SQL. Admin: auto-generated CRUD interface from model definitions. URL routing: `urlpatterns` with regex/path converters. Template language: Django Template Language (DTL) with inheritance, filters, tags. Middleware: process request/response globally (auth, CSRF, sessions). Django REST Framework (DRF) adds REST APIs with serializers and viewsets.

## Further Reading

- [Django Documentation](https://docs.djangoproject.com/)
