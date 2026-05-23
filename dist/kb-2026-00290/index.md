---
id:"kb-2026-00290"
title:"Ruby on Rails"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Ruby on Rails Guides"
    type: "documentation"
    year: 2026
    url: "https://guides.rubyonrails.org/"
    institution: "Rails Core Team"
    note: "MVC web framework: ActiveRecord, ActionPack, convention over configuration, Hotwire"
secondary_sources:
  - title: "RESTful Web APIs"
    authors: ["Richardson, Leonard", "Amundsen, Mike"]
    type: "book"
    year: 2013
    url: "https://www.oreilly.com/library/view/restful-web-apis/9781449359713/"
    institution: "O'Reilly"
    note: "Rails pioneered RESTful API design in web frameworks — DHH's convention-over-configuration REST approach"
    type: "book"
    year: 2013
    url: "https://www.oreilly.com/library/view/restful-web-apis/9781449359713/"
    institution: "O'Reilly"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Rails (David Heinemeier Hansson, 2004) is a convention-over-configuration web framework in Ruby. It popularized MVC in web development, RESTful routing, database migrations, and scaffolding. Rails 7 (2021) introduced Hotwire (Turbo + Stimulus) for reactive UIs without heavy JavaScript.

## Core Explanation

Conventions: model file name maps to table name, controller actions map to URL patterns. ActiveRecord: ORM with migrations, validations, associations (has_many, belongs_to). Scaffold generates CRUD: `rails generate scaffold Post title:string body:text`. Asset Pipeline (Sprockets) and Webpacker for frontend. Turbo: replaces Rails UJS — faster page updates without full reload.

## Further Reading

- [Ruby on Rails Guides](https://guides.rubyonrails.org/)
