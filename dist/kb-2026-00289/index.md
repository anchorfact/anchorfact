---
id:"kb-2026-00289"
title:"Flask"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Flask Documentation"
    type:"documentation"
    year:2026
    url:"https://flask.palletsprojects.com/"
    institution:"Pallets Projects"
secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
  - title: "Fluent Python (2nd Ed)"
    authors: ["Ramalho"]
    type: "book"
    year: 2021
    url: "https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/"
    institution: "O'Reilly"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Flask (Armin Ronacher, 2010) is a lightweight Python web framework — micro but extensible. Unlike Django's batteries-included, Flask starts minimal and grows via extensions (SQLAlchemy for ORM, Flask-Login for auth). Ideal for APIs, microservices, and prototypes.

## Core Explanation

Minimal app: `app = Flask(__name__); @app.route('/'); def hello(): return 'Hello'`. Jinja2 templating (shared with Django, different syntax). Blueprints: modular application components. Application factory pattern for scalable structure. Flask 3.0 (2023) added async support. Extensions: Flask-SQLAlchemy, Flask-Migrate (Alembic), Flask-RESTful.

## Further Reading

- [Flask Documentation](https://flask.palletsprojects.com/)
