---
id:"kb-2026-00288"
title:"Django"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Django Documentation"
    type:"documentation"
    year:2026
    url:"https://docs.djangoproject.com/"
    institution:"Django Software Foundation"
secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
  - title: "RESTful Web APIs"
    authors: ["Richardson", "Amundsen"]
    type: "book"
    year: 2013
    url: "https://www.oreilly.com/library/view/restful-web-apis/9781449359713/"
    institution: "O'Reilly"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Django is a high-level Python web framework (2005) that follows 'batteries-included' philosophy. ORM, admin interface, authentication, form handling, and templating are built-in. Follows MVT (Model-View-Template) architecture. Used by Instagram, Pinterest, Mozilla, Disqus.

## Core Explanation

ORM: `User.objects.filter(active=True)` — Python code maps to SQL. Admin: auto-generated CRUD interface from model definitions. URL routing: `urlpatterns` with regex/path converters. Template language: Django Template Language (DTL) with inheritance, filters, tags. Middleware: process request/response globally (auth, CSRF, sessions). Django REST Framework (DRF) adds REST APIs with serializers and viewsets.

## Further Reading

- [Django Documentation](https://docs.djangoproject.com/)
