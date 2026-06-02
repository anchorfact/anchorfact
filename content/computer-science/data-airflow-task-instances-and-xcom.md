---
id: data-airflow-task-instances-and-xcom
title: 'Data Airflow Task Instances and XCom'
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-03'
created_date: '2026-06-03'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-cs-data-airflow-task-instances-and-xcom-1
    statement: >-
      Airflow documentation says a Task is the basic unit of execution in
      Airflow and that tasks are arranged into DAGs.
    source_title: Apache Airflow Tasks
    source_url: https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/tasks.html
    confidence: medium
  - id: fact-cs-data-airflow-task-instances-and-xcom-2
    statement: >-
      Airflow documentation says Task Instances represent task runs for a given
      DAG and data interval and have lifecycle states.
    source_title: Apache Airflow Tasks
    source_url: https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/tasks.html
    confidence: medium
  - id: fact-cs-data-airflow-task-instances-and-xcom-3
    statement: >-
      Airflow documentation says an XCom is identified by a key along with the
      task_id and dag_id it came from.
    source_title: Apache Airflow XComs
    source_url: https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/xcoms.html
    confidence: medium
completeness: 0.82
known_gaps:
  - Airflow diagnosis depends on scheduler version, DAG parse errors, data interval, retries, mapped tasks, executor type, pools, trigger rules, XCom backend, serialized payload size, and whether failures happened in scheduling, queueing, execution, or teardown.
disputed_statements: []
primary_sources:
  - title: Apache Airflow Tasks
    type: documentation
    year: 2026
    url: https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/tasks.html
    institution: Apache Airflow
  - title: Apache Airflow XComs
    type: documentation
    year: 2026
    url: https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/xcoms.html
    institution: Apache Airflow
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Airflow Task Instance and XCom evidence helps agents explain whether a pipeline failure is scheduling, dependency, execution, retry, or cross-task data passing.

## Core Explanation

Airflow agents should not treat a DAG as a flat script. A failed run has task instances with states, dependencies, retries, logs, and data intervals. XCom adds another layer because tasks can pass small structured values that downstream tasks rely on.

Useful evidence includes DAG ID, run ID, task ID, mapped index, data interval, state transitions, try number, upstream and downstream dependencies, XCom keys, XCom payload size, and executor logs. A task can fail because the code is wrong, because upstream state blocks it, or because a downstream task expected an XCom value that was never produced.

## Source-Mapped Facts

- Airflow documentation says a Task is the basic unit of execution in Airflow and that tasks are arranged into DAGs. ([source](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/tasks.html))
- Airflow documentation says Task Instances represent task runs for a given DAG and data interval and have lifecycle states. ([source](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/tasks.html))
- Airflow documentation says an XCom is identified by a key along with the task_id and dag_id it came from. ([source](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/xcoms.html))

## Further Reading

- [Apache Airflow Tasks](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/tasks.html)
- [Apache Airflow XComs](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/xcoms.html)
