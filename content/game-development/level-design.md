---
id: "kb-gd-022"
title: "level design"
schema_type: "TechArticle"
category: "game-development"
language: "zh"
confidence: "high"
last_verified: "2026-04-28"
created_date: "2026-04-28"
generation_method: "human_only"
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-gd-001"
    statement: "- **优点：** 叙事节奏可控，制作成本低 - **适用：** 剧情驱动游戏 - **示例：** 《半条命》、《神秘海域》  ### 2."
    source_title: "游戏开发Wiki（个人知识库）"
    source_url: "https://www.gdconf.com/"
    confidence: "medium"
  - id: "fact-gd-002"
    statement: "- **优点：** 玩家有选择权，方便回访 - **适用：** 3D 平台跳跃、RPG - **示例：** 《超级马里奥 64》、《质量效应》  ### 2."
    source_title: "游戏开发Wiki（个人知识库）"
    source_url: "https://www.gdconf.com/"
    confidence: "medium"
  - id: "fact-gd-003"
    statement: "- **优点：** 沉浸感强，玩家自主性高 - **缺点：** 制作成本极高，节奏难控制 - **示例：** 《荒野之息》、《上古卷轴》  ### 2."
    source_title: "游戏开发Wiki（个人知识库）"
    source_url: "https://www.gdconf.com/"
    confidence: "medium"
  - id: "fact-gd-004"
    statement: "- **优点：** 重复可玩性高，聚焦核心玩法 - **适用：** 动作游戏、射击游戏 - **示例：** 《战争机器》的部落模式  ### 2."
    source_title: "游戏开发Wiki（个人知识库）"
    source_url: "https://www.gdconf.com/"
    confidence: "medium"
  - id: "fact-gd-005"
    statement: "- 示例：线性关卡中穿插竞技场战斗 - 示例：开放世界中的地下城副本  ---  ## 3."
    source_title: "游戏开发Wiki（个人知识库）"
    source_url: "https://www.gdconf.com/"
    confidence: "medium"

completeness: 0.85

known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"

disputed_statements:
  - statement: "Narrative-versus-systems-driven game design is a fundamental debate: story-focused games emphasize authored emotional arcs, while systems-driven games prioritize emergent player-driven experiences"

primary_sources:
  - title: "游戏开发Wiki（个人知识库）"
    type: "knowledge_base"
    year: 2026
    url: "https://www.gdconf.com/"
    institution: "Game Developers Conference"

secondary_sources:
  - title: "GDC Vault"
    type: "conference"
    year: 2026
    url: "https://www.gdconf.com/"
    institution: "GDC"
  - title: "Game Engine Architecture (Jason Gregory, 3rd Ed)"
    type: "textbook"
    year: 2018
    url: "https://www.gameenginebook.com/"
    institution: "CRC Press"

---





## 2. 关卡架构类型

### 2.1 线性关卡

玩家沿固定路径前进。
- **优点：** 叙事节奏可控，制作成本低
- **适用：** 剧情驱动游戏
- **示例：** 《半条命》、《神秘海域》

### 2.2 枢纽型（Hub）

中心区域连接多个子关卡。
- **优点：** 玩家有选择权，方便回访
- **适用：** 3D 平台跳跃、RPG
- **示例：** 《超级马里奥 64》、《质量效应》

### 2.3 开放世界

大规模连贯地图，自由探索。
- **优点：** 沉浸感强，玩家自主性高
- **缺点：** 制作成本极高，节奏难控制
- **示例：** 《荒野之息》、《上古卷轴》

### 2.4 竞技场/生存

在有限空间内面对波次敌人。
- **优点：** 重复可玩性高，聚焦核心玩法
- **适用：** 动作游戏、射击游戏
- **示例：** 《战争机器》的部落模式

### 2.5 混合型

不同关卡类型混用，保持新鲜感。
- 示例：线性关卡中穿插竞技场战斗
- 示例：开放世界中的地下城副本

---

## 3. 环境叙事

环境叙事是"不写一个字"地讲故事。

### 3.1 场景布置技巧

| 方法 | 说明 | 示例 |
|------|------|------|
| **空间叙事** | 物品布局揭示事件 | 办公室 → 翻倒的椅子 → 打斗痕迹 |
| **对比展示** | 同一空间的过去vs现在 | 破败前的照片 vs 现况 |
| **环境线索** | 物品暗示角色和故事 | 儿童房间 → 生病的孩子 → 寻找药的笔记 |
| **时间线索** | 不同时间层的痕迹 | 墙上多个年代的海报 |

### 3.2 可收集叙事元素

| 类型 | 特点 | 最佳用法 |
|------|------|----------|
| **信件/便条** | 提供背景故事 | 填补主线之外的细节 |
| **日记** | 展现角色心理 | 让反派/配角更立体 |
| **录音/语音日志** | 即时信息传递 | 不适合回看的场景 |
| **环境物品** | 隐含信息 | 需要玩家主动观察 |

**设计要点：**
- 可收集叙事内容**不是必需的**（不收集不影响通关）
- 内容与当前位置/情境相关
- 短小精悍（玩家没耐心读长文）
- 奖励探索行为

### 3.3 世界构建分层

| 层次 | 说明 | 玩家触达率 |
|------|------|-----------|
| **第一层** | 主线剧情 | 100% 玩家 |
| **第二层** | 支线任务、NPC 对话 | 60-80% 玩家 |
| **第三层** | 环境叙事、可收集文本 | 30-50% 玩家 |
| **第四层** | 隐藏房间、秘密物品 | 10-20% 玩家 |

每一层都应该有世界构建信息，但**核心故事必须在第一层完成**。

---

## 4. 关卡制作流程

### 4.1 白盒阶段（Blockout）

用简单几何体搭建关卡骨架。

**目标：**
- 验证核心玩法和关卡循环
- 测试空间尺寸和比例
- 确定玩家动线

**工具：** Unity 的 ProBuilder、Unreal 的 BSP、Godot 的 CSG

**注意：** 不要在美术资源上花任何时间，这一阶段所有东西都是灰的。

### 4.2 灰盒阶段（Greybox）

使用临时美术资源和placeholder。

**目标：**
- 验证节奏和难度曲线
- 测试敌人/陷阱放置
- 玩家反馈收集

**迭代重点：**
- 调整空间尺寸
- 优化敌人波次
- 修正引导问题

### 4.3 美术阶段（Art Pass）

替换为最终美术资源。

**目标：**
- 光照和氛围
- 材质和贴图
- 粒子特效和动画
- 性能优化（LOD、遮挡剔除）

### 4.4 最终抛光（Polish）

- 音效集成（环境音、音效、BGM）
- UI 和交互提示
- Bug 修复
- 性能优化最终检查

---

## 5. 难度曲线与动态调整

### 5.1 标准难度曲线

```
难度
  ↑
  │        ┌─── 最终Boss
  │      ┌─┘
  │   ┌──┘
  │ ┌─┘
  │┌┘
  └────────────────────→ 进度
   新手期  成长期  精通期
```

### 5.2 动态难度调整（DDA）

**隐性 DDA 方法：**
- AI 精准度/血量根据玩家表现微调
- 掉宝率动态变化（连续不出货时提高概率）
- 敌人波次强度根据玩家道具等级调整

**显性 DDA 方法：**
- 可选的难度切换
- 失败后的"复活加强"选项
- 辅助模式（自动瞄准、慢动作）

### 5.3 难度设计检查表

- [ ] 前 5 分钟没有任何惩罚性设计
- [ ] 每个新机制先教学，再应用
- [ ] Boss 战前有充足的补给
- [ ] 失败后重生点合理（不会让玩家重打太多内容）
- [ ] 玩家可以选择绕开过于困难的挑战

---

## 6. 关卡设计中的心理学应用

参见：[player-psychology.md#心流理论]

- **好奇驱动：** 在转角放置视觉线索（发光物、特殊建筑）引导探索
- **预期回报：** 岔路尽头放奖励，强化"探索有价值"的心理
- **节奏控制：** 战斗区域之后一定安排安全区
- **地标记忆：** 独特的地标帮助玩家建立空间认知

---

## 参考来源

- Jesse Schell: The Art of Game Design
- Chris Totten: Level Design: Processes and Experiences
- 3D Game Environments: Level Design (3D World)
- GDC Talks on Level Design (multiple)
- [参见：game-design-principles.md#核心游戏循环]
- [参见：player-psychology.md#心流理论]
