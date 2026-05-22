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
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Flask (Armin Ronacher, 2010) is a lightweight Python web framework — micro but extensible. Unlike Django's batteries-included, Flask starts minimal and grows via extensions (SQLAlchemy for ORM, Flask-Login for auth). Ideal for APIs, microservices, and prototypes.

## Core Explanation

Minimal app: `app = Flask(__name__); @app.route('/'); def hello(): return 'Hello'`. Jinja2 templating (shared with Django, different syntax). Blueprints: modular application components. Application factory pattern for scalable structure. Flask 3.0 (2023) added async support. Extensions: Flask-SQLAlchemy, Flask-Migrate (Alembic), Flask-RESTful.

## Further Reading

- [Flask Documentation](https://flask.palletsprojects.com/)
