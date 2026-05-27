---
id: kb-gd-019
title: 游戏测试方法论
schema_type: TechArticle
category: game-development
language: zh
confidence: medium
last_verified: '2026-05-25'
created_date: '2026-04-28'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-gd-001
    statement: Unity Test Framework 将测试分为 Edit Mode 与 Play Mode，两者用于不同运行环境和测试目标。
    source_title: Edit Mode vs. Play Mode tests
    source_url: https://docs.unity.cn/Packages/com.unity.test-framework@2.0/manual/edit-mode-vs-play-mode-tests.html
    confidence: medium
  - id: fact-gd-002
    statement: Unity Build Automation 支持在构建配置中启用单元测试，以便在交付前发现问题并防止回归。
    source_title: Unit tests
    source_url: https://docs.unity.com/en-us/build-automation/reference/unit-tests
    confidence: medium
  - id: fact-gd-003
    statement: Unreal Engine Automation System 支持单元测试、功能测试和内容压力测试等自动化测试类型。
    source_title: Automation System Overview
    source_url: https://dev.epicgames.com/documentation/en-us/unreal-engine/automation-system-overview?application_version=4.27
    confidence: medium
completeness: 0.85
known_gaps:
  - 本文只覆盖测试流程和自动化测试入口，不展开具体游戏项目的测试用例设计。
  - Unity 与 Unreal 文档会随引擎版本变化，具体 API 应以项目使用的版本为准。
primary_sources:
  - title: Edit Mode vs. Play Mode tests
    type: documentation
    year: 2022
    url: https://docs.unity.cn/Packages/com.unity.test-framework@2.0/manual/edit-mode-vs-play-mode-tests.html
    institution: Unity
  - title: Unit tests
    type: documentation
    year: 2026
    url: https://docs.unity.com/en-us/build-automation/reference/unit-tests
    institution: Unity
  - title: Automation System Overview
    type: documentation
    year: 2026
    url: https://dev.epicgames.com/documentation/en-us/unreal-engine/automation-system-overview?application_version=4.27
    institution: Epic Games
secondary_sources: []
---

# 游戏测试方法论

## 概览

游戏测试的目标是尽早发现功能、性能、兼容性、稳定性和体验问题。和普通软件测试相比，游戏测试通常还要关注玩法循环、关卡节奏、输入响应、帧率稳定性和多人同步等体验因素。

## 测试层级

- **功能测试**：验证核心玩法、UI、存档、网络、商店和任务流程是否按设计工作。
- **回归测试**：确认 bug 修复没有引入新问题。
- **性能测试**：监控帧率、帧时间、CPU/GPU 占用、内存和加载时间。
- **兼容性测试**：覆盖目标设备、操作系统、分辨率、输入设备和网络环境。
- **玩家测试**：通过内部测试、封闭测试或公开测试收集体验反馈。

## 自动化测试

Unity Test Framework 区分 Edit Mode 与 Play Mode 测试。Edit Mode 更适合编辑器逻辑和纯代码验证，Play Mode 更适合运行时行为。Unity Build Automation 可以在构建流程中启用测试，帮助团队在交付前发现回归。Unreal Engine 的 Automation System 也提供单元测试、功能测试和内容压力测试等能力。

## 实践建议

先把高风险、可重复、容易自动化的逻辑纳入自动化测试，例如存档读写、战斗数值、经济系统、输入映射和关键 UI 流程。主观体验类问题仍需要人工测试和玩家反馈，但应配合清晰的 bug 报告模板、复现步骤和版本信息。

## 参考来源

- [Edit Mode vs. Play Mode tests](https://docs.unity.cn/Packages/com.unity.test-framework@2.0/manual/edit-mode-vs-play-mode-tests.html)
- [Unit tests](https://docs.unity.com/en-us/build-automation/reference/unit-tests)
- [Automation System Overview](https://dev.epicgames.com/documentation/en-us/unreal-engine/automation-system-overview?application_version=4.27)
