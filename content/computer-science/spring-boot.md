---
id:"kb-2026-00291"
title:"Spring Boot"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Spring Boot Documentation"
    type:"documentation"
    year:2026
    url:"https://docs.spring.io/spring-boot/"
    institution:"VMware"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Spring Boot (Pivotal/VMware, 2014) simplifies Java enterprise development with auto-configuration, embedded servers (Tomcat, Jetty), and starter dependencies. Built on the Spring Framework (2002), it is the dominant Java backend framework. Spring Boot 3.x requires Java 17+ and Jakarta EE.

## Core Explanation

Starters: `spring-boot-starter-web` adds REST support, `spring-boot-starter-data-jpa` for database. Auto-configuration: detects libraries on classpath and configures automatically. `@SpringBootApplication` = `@Configuration` + `@EnableAutoConfiguration` + `@ComponentScan`. Application properties: `application.yml`. Actuator: production-ready features (health, metrics, env).

## Further Reading

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/)
