---
id:"kb-2026-00291"
title:"Spring Boot"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Spring Boot Documentation"
    type: "documentation"
    year: 2026
    url: "https://docs.spring.io/spring-boot/"
    institution: "VMware"
    note: "Java framework: auto-configuration, starters, actuator, Spring Data, embedded servers"
secondary_sources:
  - title: "Cloud Native Java (2nd Edition)"
    authors: ["Long, Josh", "Bastani, Kenny"]
    type: "book"
    year: 2021
    url: "https://www.oreilly.com/library/view/cloud-native-java/9781492056284/"
    institution: "O'Reilly"
    note: "Spring Boot in production: 12-factor apps, cloud-native patterns, Kubernetes integration"
    type: "book"
    year: 2013
    url: "https://www.oreilly.com/library/view/restful-web-apis/9781449359713/"
    institution: "O'Reilly"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Spring Boot (Pivotal/VMware, 2014) simplifies Java enterprise development with auto-configuration, embedded servers (Tomcat, Jetty), and starter dependencies. Built on the Spring Framework (2002), it is the dominant Java backend framework. Spring Boot 3.x requires Java 17+ and Jakarta EE.

## Core Explanation

Starters: `spring-boot-starter-web` adds REST support, `spring-boot-starter-data-jpa` for database. Auto-configuration: detects libraries on classpath and configures automatically. `@SpringBootApplication` = `@Configuration` + `@EnableAutoConfiguration` + `@ComponentScan`. Application properties: `application.yml`. Actuator: production-ready features (health, metrics, env).

## Further Reading

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/)
