---
id: "kb-gd-033"
title: "叙事架构代码实现指南"
schema_type: "TechArticle"
category: "game-development"
language: "zh"
confidence: "high"
confidence_rationale: "游戏开发领域系统性知识，基于行业标准和实践经验"
last_verified: "2026-04-28"
generation_method: "human_only"
derived_from_human_seed: true
tags: ["narrative", "code", "architecture", "implementation"]
summary: "叙事架构代码示例：Etudes系统、对话树、变量管理、分支剧情实现"
primary_sources:
  - title: "游戏开发Wiki（个人知识库）"
    type: "knowledge_base"
    year: 2026
    note: "基于行业实践和标准参考文献的系统性整理"
completeness: 0.85
related_entities:
  - "entity:game-development"
ai_citations:
  last_citation_check: "2026-05-22"
---

# 叙事架构代码实现指南

本文档提供游戏叙事系统的核心代码实现示例，覆盖 Etudes 层级化状态机、对话树、变量管理和分支剧情等关键模块。所有代码均可直接运行或稍作修改后集成到项目中。

---

## 目录

1. [Etudes 系统（Owlcat Games）](#1-etudes-系统owlcat-games)
2. [对话系统代码结构](#2-对话系统代码结构)
3. [变量管理方案](#3-变量管理方案)
4. [分支剧情代码示例](#4-分支剧情代码示例)
5. [叙事工具集成](#5-叙事工具集成)

---

## 1. Etudes 系统（Owlcat Games）

Owlcat Games 在《开拓者》系列中使用 Etudes 系统替代传统全局 Flag，管理超过 30,000 个叙事变量。Etudes 是层级化的状态机，通过优先级排序和冲突检测实现可控的叙事状态管理。

### 1.1 核心概念：层级化状态机

与传统扁平的布尔 Flag 不同，Etudes 使用树状结构组织叙事状态。每个节点代表一个叙事片段或状态，子节点继承父节点的上下文。

```csharp
// Etudes系统核心数据模型（C#）
using System;
using System.Collections.Generic;
using System.Linq;

namespace NarrativeSystem.Etudes
{
    /// <summary>
    /// Etude节点状态枚举
    /// </summary>
    public enum EtudeState
    {
        Inactive,   // 未激活（灰色）
        Pending,    // 等待条件满足（橙色）
        Active      // 已激活（绿色）
    }

    /// <summary>
    /// Etude优先级定义
    /// 高优先级Etude可以覆盖低优先级的状态变更
    /// </summary>
    public enum EtudePriority
    {
        Background = 0,    // 背景叙事，最低优先级
        Normal = 100,      // 普通任务
        Important = 200,   // 重要剧情
        Critical = 300,    // 关键节点，最高优先级
        Blocking = 400     // 阻塞级，暂停其他叙事
    }

    /// <summary>
    /// Etude节点：叙事状态的基本单位
    /// </summary>
    public class EtudeNode
    {
        public string Id { get; set; }                    // 唯一标识符
        public string Name { get; set; }                  // 显示名称
        public string Description { get; set; }           // 描述
        public EtudePriority Priority { get; set; }       // 优先级
        public EtudeState State { get; private set; }     // 当前状态
        public EtudeNode Parent { get; set; }             // 父节点
        public List<EtudeNode> Children { get; set; }     // 子节点列表
        public List<IEtudeCondition> Conditions { get; set; } // 激活条件
        public List<IEtudeAction> OnActivate { get; set; }    // 激活时动作
        public List<IEtudeAction> OnDeactivate { get; set; }  // 取消激活时动作
        
        // 冲突规则：哪些Etude与此节点互斥
        public List<string> ConflictsWith { get; set; }

        public EtudeNode()
        {
            Children = new List<EtudeNode>();
            Conditions = new List<IEtudeCondition>();
            OnActivate = new List<IEtudeAction>();
            OnDeactivate = new List<IEtudeAction>();
            ConflictsWith = new List<string>();
            State = EtudeState.Inactive;
        }

        /// <summary>
        /// 评估当前节点是否应该激活
        /// 同时检查父节点状态和自身条件
        /// </summary>
        public bool Evaluate(EtudeManager manager)
        {
            // 如果父节点未激活，子节点不能激活
            if (Parent != null && Parent.State != EtudeState.Active)
                return false;

            // 检查所有条件是否满足
            return Conditions.All(c => c.Check(manager));
        }

        /// <summary>
        /// 激活此Etude节点
        /// </summary>
        public void Activate(EtudeManager manager)
        {
            if (State == EtudeState.Active) return;
            
            State = EtudeState.Active;
            foreach (var action in OnActivate)
            {
                action.Execute(manager);
            }
        }

        /// <summary>
        /// 取消激活此Etude节点
        /// </summary>
        public void Deactivate(EtudeManager manager)
        {
            if (State == EtudeState.Inactive) return;
            
            // 递归取消激活所有子节点
            foreach (var child in Children)
            {
                child.Deactivate(manager);
            }
            
            State = EtudeState.Inactive;
            foreach (var action in OnDeactivate)
            {
                action.Execute(manager);
            }
        }
    }

    /// <summary>
    /// 条件接口：所有激活条件必须实现
    /// </summary>
    public interface IEtudeCondition
    {
        bool Check(EtudeManager manager);
    }

    /// <summary>
    /// 动作接口：激活/取消激活时执行的操作
    /// </summary>
    public interface IEtudeAction
    {
        void Execute(EtudeManager manager);
    }
}
```

### 1.2 JSON 配置示例

Etudes 适合通过数据驱动配置，策划可以在 JSON 中定义复杂的叙事状态树。

```json
{
  "$schema": "etude-config-v1",
  "description": "第一章主线任务Etudes配置",
  "rootEtudes": [
    {
      "id": "chapter_01",
      "name": "第一章：觉醒",
      "description": "游戏开场章节",
      "priority": "Normal",
      "conditions": [
        { "type": "GameStarted", "value": true }
      ],
      "onActivate": [
        { "type": "SetFlag", "key": "chapter", "value": 1 },
        { "type": "UnlockMap", "mapId": "village" }
      ],
      "children": [
        {
          "id": "c01_intro",
          "name": "开场动画",
          "priority": "Critical",
          "conditions": [
            { "type": "EtudeActive", "etudeId": "chapter_01" }
          ],
          "onActivate": [
            { "type": "PlayCutscene", "cutsceneId": "intro_01" }
          ],
          "children": [
            {
              "id": "c01_talk_elder",
              "name": "与长老对话",
              "priority": "Important",
              "conditions": [
                { "type": "CutsceneFinished", "cutsceneId": "intro_01" }
              ],
              "onActivate": [
                { "type": "SpawnNPC", "npcId": "elder", "location": "village_center" },
                { "type": "AddDialogueOption", "npcId": "elder", "dialogueId": "c01_greeting" }
              ]
            },
            {
              "id": "c01_find_artifact",
              "name": "寻找古代遗物",
              "priority": "Important",
              "conditions": [
                { "type": "DialogueCompleted", "dialogueId": "c01_greeting" }
              ],
              "onActivate": [
                { "type": "AddQuest", "questId": "q01_artifact" },
                { "type": "SpawnItem", "itemId": "ancient_artifact", "location": "cave_depths" }
              ]
            }
          ]
        },
        {
          "id": "c01_secret_ending",
          "name": "隐藏结局触发",
          "priority": "Critical",
          "conditions": [
            { "type": "FlagEquals", "key": "karma", "value": -100 },
            { "type": "EtudeActive", "etudeId": "chapter_01" }
          ],
          "conflictsWith": ["c01_intro"],
          "onActivate": [
            { "type": "TriggerEnding", "endingId": "secret_dark" }
          ]
        }
      ]
    }
  ]
}
```

### 1.3 优先级排序与冲突检测

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

namespace NarrativeSystem.Etudes
{
    /// <summary>
    /// Etudes管理器：核心控制器
    /// 每帧或每个叙事事件发生时重新评估所有Etude状态
    /// </summary>
    public class EtudeManager
    {
        // 所有已注册的Etude节点
        private Dictionary<string, EtudeNode> _etudes = new Dictionary<string, EtudeNode>();
        
        // 全局变量存储
        private Dictionary<string, object> _globalFlags = new Dictionary<string, object>();
        
        // 冲突日志，用于调试
        public List<ConflictLog> ConflictLogs { get; private set; } = new List<ConflictLog>();

        /// <summary>
        /// 注册Etude节点到管理器
        /// </summary>
        public void RegisterEtude(EtudeNode etude)
        {
            if (_etudes.ContainsKey(etude.Id))
            {
                throw new ArgumentException($"Etude {etude.Id} 已存在！");
            }
            _etudes[etude.Id] = etude;
        }

        /// <summary>
        /// 设置全局变量
        /// </summary>
        public void SetFlag(string key, object value)
        {
            _globalFlags[key] = value;
            // 变量变更后重新评估所有Etude
            ReevaluateAll();
        }

        /// <summary>
        /// 获取全局变量
        /// </summary>
        public T GetFlag<T>(string key)
        {
            if (_globalFlags.TryGetValue(key, out var value) && value is T typed)
            {
                return typed;
            }
            return default;
        }

        /// <summary>
        /// 核心评估方法
        /// 1. 按优先级排序所有待激活Etude
        /// 2. 检测冲突
        /// 3. 执行状态变更
        /// </summary>
        public void ReevaluateAll()
        {
            // 收集所有可以激活的Etude（条件满足）
            var candidates = new List<EtudeNode>();
            foreach (var etude in _etudes.Values)
            {
                if (etude.Evaluate(this))
                {
                    candidates.Add(etude);
                }
                else if (etude.State == EtudeState.Active)
                {
                    // 如果已激活但条件不再满足，取消激活
                    etude.Deactivate(this);
                }
            }

            // 按优先级降序排序：高优先级先处理
            candidates.Sort((a, b) => b.Priority.CompareTo(a.Priority));

            // 已激活的Etude集合（用于冲突检测）
            var activatedIds = new HashSet<string>();
            ConflictLogs.Clear();

            foreach (var candidate in candidates)
            {
                // 检查是否与已激活的Etude冲突
                bool hasConflict = false;
                foreach (var conflictId in candidate.ConflictsWith)
                {
                    if (activatedIds.Contains(conflictId))
                    {
                        hasConflict = true;
                        ConflictLogs.Add(new ConflictLog
                        {
                            EtudeA = candidate.Id,
                            EtudeB = conflictId,
                            Resolution = candidate.Priority >= _etudes[conflictId].Priority 
                                ? "高优先级覆盖" 
                                : "低优先级被跳过"
                        });

                        // 如果当前优先级更高，覆盖冲突的Etude
                        if (candidate.Priority >= _etudes[conflictId].Priority)
                        {
                            _etudes[conflictId].Deactivate(this);
                            activatedIds.Remove(conflictId);
                        }
                        else
                        {
                            // 优先级低，跳过此候选
                            break;
                        }
                    }
                }

                if (!hasConflict || candidate.Priority >= candidate.ConflictsWith
                    .Where(c => activatedIds.Contains(c))
                    .Select(c => _etudes[c].Priority)
                    .DefaultIfEmpty(EtudePriority.Background)
                    .Max())
                {
                    candidate.Activate(this);
                    activatedIds.Add(candidate.Id);
                }
            }
        }
    }

    /// <summary>
    /// 冲突记录，用于可视化调试
    /// </summary>
    public class ConflictLog
    {
        public string EtudeA { get; set; }
        public string EtudeB { get; set; }
        public string Resolution { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
}
```

### 1.4 可视化调试工具

```python
# Etudes 状态树可视化（Python + 命令行）
# 可用于运行时调试，输出类似文件树的结构
# 绿色 = Active, 橙色 = Pending, 灰色 = Inactive

from enum import Enum
from typing import List, Dict, Optional
from dataclasses import dataclass, field

class EtudeState(Enum):
    INACTIVE = "inactive"
    PENDING = "pending"
    ACTIVE = "active"

# ANSI 颜色代码
COLOR_MAP = {
    EtudeState.ACTIVE: "\033[32m",     # 绿色
    EtudeState.PENDING: "\033[33m",    # 橙色
    EtudeState.INACTIVE: "\033[90m",   # 灰色
}
RESET = "\033[0m"

@dataclass
class EtudeNode:
    id: str
    name: str
    state: EtudeState
    priority: int = 100
    children: List['EtudeNode'] = field(default_factory=list)
    conflicts: List[str] = field(default_factory=list)

class EtudeVisualizer:
    """Etudes 状态树可视化器"""
    
    def __init__(self, root_nodes: List[EtudeNode]):
        self.roots = root_nodes
        self.conflict_logs: List[Dict] = []
    
    def _colorize(self, text: str, state: EtudeState) -> str:
        """根据状态给文本上色"""
        return f"{COLOR_MAP[state]}{text}{RESET}"
    
    def _render_node(self, node: EtudeNode, prefix: str = "", is_last: bool = True) -> str:
        """递归渲染单个节点"""
        connector = "└── " if is_last else "├── "
        state_icon = {
            EtudeState.ACTIVE: "[+]",
            EtudeState.PENDING: "[~]",
            EtudeState.INACTIVE: "[ ]",
        }[node.state]
        
        line = f"{prefix}{connector}{state_icon} {node.name} ({node.id})"
        colored_line = self._colorize(line, node.state)
        
        # 如果有冲突，附加警告
        if node.conflicts and node.state == EtudeState.ACTIVE:
            conflict_info = f" [冲突: {', '.join(node.conflicts)}]"
            colored_line += self._colorize(conflict_info, EtudeState.PENDING)
        
        result = [colored_line]
        
        # 递归渲染子节点
        child_prefix = prefix + ("    " if is_last else "│   ")
        for i, child in enumerate(node.children):
            is_last_child = (i == len(node.children) - 1)
            result.append(self._render_node(child, child_prefix, is_last_child))
        
        return "\n".join(result)
    
    def render(self) -> str:
        """渲染完整的Etudes状态树"""
        lines = []
        lines.append("=" * 50)
        lines.append("Etudes 状态树可视化")
        lines.append(f"图例: {self._colorize('[+] 激活', EtudeState.ACTIVE)} | "
                     f"{self._colorize('[~] 等待', EtudeState.PENDING)} | "
                     f"{self._colorize('[ ] 未激活', EtudeState.INACTIVE)}")
        lines.append("=" * 50)
        
        for root in self.roots:
            lines.append(self._render_node(root))
            lines.append("")
        
        # 输出冲突日志
        if self.conflict_logs:
            lines.append("-" * 50)
            lines.append("冲突日志:")
            for log in self.conflict_logs:
                lines.append(f"  [{log['timestamp']}] {log['a']} vs {log['b']}: {log['resolution']}")
        
        return "\n".join(lines)


# ===== 使用示例 =====
if __name__ == "__main__":
    # 构建示例Etudes树
    child1 = EtudeNode("c01_talk", "与长老对话", EtudeState.ACTIVE, priority=200)
    child2 = EtudeNode("c01_fight", "战斗事件", EtudeState.INACTIVE, priority=150)
    
    root = EtudeNode("chapter_01", "第一章：觉醒", EtudeState.ACTIVE, priority=100,
                     children=[child1, child2],
                     conflicts=["chapter_02"])
    
    visualizer = EtudeVisualizer([root])
    visualizer.conflict_logs = [
        {"timestamp": "10:23:05", "a": "chapter_01", "b": "chapter_02", "resolution": "高优先级覆盖"}
    ]
    
    print(visualizer.render())
```

**可视化输出示例：**

```text
==================================================
Etudes 状态树可视化
图例: [+] 激活 | [~] 等待 | [ ] 未激活
==================================================
└── [+] 第一章：觉醒 (chapter_01) [冲突: chapter_02]
    ├── [+] 与长老对话 (c01_talk)
    └── [ ] 战斗事件 (c01_fight)

--------------------------------------------------
冲突日志:
  [10:23:05] chapter_01 vs chapter_02: 高优先级覆盖
```

---

## 2. 对话系统代码结构

### 2.1 对话树数据结构

```csharp
// 对话树核心数据结构（C#）
using System;
using System.Collections.Generic;
using System.Linq;

namespace NarrativeSystem.Dialogue
{
    /// <summary>
    /// 对话节点基类
    /// 所有对话节点（文本、选择、条件、动作）的抽象基类
    /// </summary>
    public abstract class DialogueNode
    {
        public string Id { get; set; }
        public string OwnerId { get; set; }  // 说话者ID
        public List<string> NextNodes { get; set; } = new List<string>();
        public List<DialogueCondition> Conditions { get; set; } = new List<DialogueCondition>();
        
        /// <summary>
        /// 检查此节点是否可以显示
        /// </summary>
        public virtual bool CanDisplay(IDialogueContext context)
        {
            return Conditions.All(c => c.Evaluate(context));
        }
        
        /// <summary>
        /// 节点被访问时执行
        /// </summary>
        public abstract void OnVisit(IDialogueContext context);
    }

    /// <summary>
    /// 文本节点：显示NPC对话文本
    /// </summary>
    public class TextNode : DialogueNode
    {
        public string Text { get; set; }           // 对话文本（支持本地化Key）
        public string Emotion { get; set; }        // 情绪标签（影响立绘/动画）
        public float AutoAdvanceDelay { get; set; } // 自动推进延迟（-1表示手动）
        
        public override void OnVisit(IDialogueContext context)
        {
            context.DisplayText(OwnerId, Text, Emotion);
            
            if (AutoAdvanceDelay > 0)
            {
                context.ScheduleAdvance(AutoAdvanceDelay, NextNodes.FirstOrDefault());
            }
        }
    }

    /// <summary>
    /// 玩家选择节点：提供分支选项
    /// </summary>
    public class ChoiceNode : DialogueNode
    {
        public List<DialogueChoice> Choices { get; set; } = new List<DialogueChoice>();
        
        public override void OnVisit(IDialogueContext context)
        {
            // 过滤掉不满足条件的选项
            var availableChoices = Choices.Where(c => c.CanDisplay(context)).ToList();
            context.DisplayChoices(availableChoices);
        }
    }

    /// <summary>
    /// 单个选项定义
    /// </summary>
    public class DialogueChoice
    {
        public string Id { get; set; }
        public string Text { get; set; }
        public string Tooltip { get; set; }           // 鼠标悬停提示
        public List<DialogueCondition> Conditions { get; set; } = new List<DialogueCondition>();
        public List<DialogueAction> Actions { get; set; } = new List<DialogueAction>();
        public string NextNodeId { get; set; }
        
        public bool CanDisplay(IDialogueContext context)
        {
            return Conditions.All(c => c.Evaluate(context));
        }
    }

    /// <summary>
    /// 动作节点：执行无副作用的叙事动作
    /// </summary>
    public class ActionNode : DialogueNode
    {
        public List<DialogueAction> Actions { get; set; } = new List<DialogueAction>();
        
        public override void OnVisit(IDialogueContext context)
        {
            foreach (var action in Actions)
            {
                action.Execute(context);
            }
            // 自动跳转到下一个节点
            context.AdvanceTo(NextNodes.FirstOrDefault());
        }
    }

    /// <summary>
    /// 条件节点：根据条件走向不同分支
    /// </summary>
    public class BranchNode : DialogueNode
    {
        public List<ConditionalBranch> Branches { get; set; } = new List<ConditionalBranch>();
        public string DefaultNodeId { get; set; }  // 默认分支（无条件满足时）
        
        public override void OnVisit(IDialogueContext context)
        {
            foreach (var branch in Branches)
            {
                if (branch.Condition.Evaluate(context))
                {
                    context.AdvanceTo(branch.TargetNodeId);
                    return;
                }
            }
            context.AdvanceTo(DefaultNodeId);
        }
    }

    public class ConditionalBranch
    {
        public DialogueCondition Condition { get; set; }
        public string TargetNodeId { get; set; }
    }
}
```

### 2.2 条件判断系统

```csharp
namespace NarrativeSystem.Dialogue
{
    /// <summary>
    /// 条件接口：所有对话条件的基类
    /// </summary>
    public abstract class DialogueCondition
    {
        public abstract bool Evaluate(IDialogueContext context);
    }

    /// <summary>
    /// 变量比较条件
    /// </summary>
    public class VariableCondition : DialogueCondition
    {
        public string VariableName { get; set; }
        public ComparisonOperator Operator { get; set; }
        public object ExpectedValue { get; set; }
        
        public override bool Evaluate(IDialogueContext context)
        {
            var actualValue = context.GetVariable(VariableName);
            return CompareValues(actualValue, ExpectedValue, Operator);
        }
        
        private bool CompareValues(object actual, object expected, ComparisonOperator op)
        {
            if (actual == null || expected == null) return false;
            
            var comparable = Comparer<object>.Default;
            int result = comparable.Compare(actual, expected);
            
            return op switch
            {
                ComparisonOperator.Equals => result == 0,
                ComparisonOperator.NotEquals => result != 0,
                ComparisonOperator.GreaterThan => result > 0,
                ComparisonOperator.LessThan => result < 0,
                ComparisonOperator.GreaterOrEqual => result >= 0,
                ComparisonOperator.LessOrEqual => result <= 0,
                _ => false
            };
        }
    }

    /// <summary>
    /// 玩家背包物品检查
    /// </summary>
    public class HasItemCondition : DialogueCondition
    {
        public string ItemId { get; set; }
        public int Count { get; set; } = 1;
        
        public override bool Evaluate(IDialogueContext context)
        {
            return context.GetItemCount(ItemId) >= Count;
        }
    }

    /// <summary>
    /// 关系值条件
    /// </summary>
    public class RelationshipCondition : DialogueCondition
    {
        public string NpcId { get; set; }
        public ComparisonOperator Operator { get; set; }
        public int Value { get; set; }
        
        public override bool Evaluate(IDialogueContext context)
        {
            var relationship = context.GetRelationship(NpcId);
            return VariableCondition.CompareValues(relationship, Value, Operator);
        }
    }

    /// <summary>
    /// 复合条件：AND / OR / NOT
    /// </summary>
    public class CompositeCondition : DialogueCondition
    {
        public LogicOperator LogicOp { get; set; }
        public List<DialogueCondition> SubConditions { get; set; } = new List<DialogueCondition>();
        
        public override bool Evaluate(IDialogueContext context)
        {
            return LogicOp switch
            {
                LogicOperator.And => SubConditions.All(c => c.Evaluate(context)),
                LogicOperator.Or => SubConditions.Any(c => c.Evaluate(context)),
                LogicOperator.Not => !SubConditions.FirstOrDefault()?.Evaluate(context) ?? true,
                _ => false
            };
        }
    }

    public enum ComparisonOperator { Equals, NotEquals, GreaterThan, LessThan, GreaterOrEqual, LessOrEqual }
    public enum LogicOperator { And, Or, Not }
}
```

### 2.3 变量绑定与上下文

```csharp
namespace NarrativeSystem.Dialogue
{
    /// <summary>
    /// 对话上下文接口：提供对话系统与游戏世界的桥梁
    /// </summary>
    public interface IDialogueContext
    {
        // 变量访问
        object GetVariable(string name);
        void SetVariable(string name, object value);
        
        // 玩家数据
        int GetItemCount(string itemId);
        int GetRelationship(string npcId);
        
        // UI 交互
        void DisplayText(string speakerId, string text, string emotion);
        void DisplayChoices(List<DialogueChoice> choices);
        void AdvanceTo(string nodeId);
        void ScheduleAdvance(float delay, string nodeId);
    }

    /// <summary>
    /// 默认实现：对话上下文
    /// </summary>
    public class DefaultDialogueContext : IDialogueContext
    {
        private readonly Dictionary<string, object> _variables;
        private readonly IGameState _gameState;
        private readonly IDialogueUI _ui;
        
        public DefaultDialogueContext(IGameState gameState, IDialogueUI ui)
        {
            _gameState = gameState;
            _ui = ui;
            _variables = new Dictionary<string, object>();
        }
        
        public object GetVariable(string name)
        {
            // 优先从本地对话变量查找，再到全局游戏状态
            if (_variables.TryGetValue(name, out var localValue))
                return localValue;
            return _gameState.GetGlobalVariable(name);
        }
        
        public void SetVariable(string name, object value)
        {
            _variables[name] = value;
            // 同步到全局状态（如果需要持久化）
            _gameState.SetGlobalVariable(name, value);
        }
        
        public int GetItemCount(string itemId) => _gameState.Inventory.GetCount(itemId);
        public int GetRelationship(string npcId) => _gameState.Relationships.Get(npcId);
        
        public void DisplayText(string speakerId, string text, string emotion)
        {
            _ui.ShowText(speakerId, Localize(text), emotion);
        }
        
        public void DisplayChoices(List<DialogueChoice> choices)
        {
            _ui.ShowChoices(choices.Select(c => new UIChoice 
            { 
                Text = Localize(c.Text), 
                Tooltip = Localize(c.Tooltip),
                OnSelect = () => SelectChoice(c)
            }).ToList());
        }
        
        private void SelectChoice(DialogueChoice choice)
        {
            // 执行选项附带的所有动作
            foreach (var action in choice.Actions)
            {
                action.Execute(this);
            }
            AdvanceTo(choice.NextNodeId);
        }
        
        public void AdvanceTo(string nodeId)
        {
            if (!string.IsNullOrEmpty(nodeId))
            {
                _ui.Clear();
                _gameState.Dialogue.AdvanceToNode(nodeId);
            }
            else
            {
                _gameState.Dialogue.EndDialogue();
            }
        }
        
        public void ScheduleAdvance(float delay, string nodeId)
        {
            _ui.ScheduleAfterDelay(delay, () => AdvanceTo(nodeId));
        }
        
        private string Localize(string key) => _gameState.Localization.Get(key);
    }
}
```

### 2.4 对话数据 JSON 配置

```json
{
  "dialogueId": "dlg_elder_greeting",
  "participants": ["player", "elder"],
  "entryNode": "node_01",
  "nodes": {
    "node_01": {
      "type": "TextNode",
      "ownerId": "elder",
      "text": "TEXT_ELDER_GREETING",
      "emotion": "neutral",
      "nextNodes": ["node_02"]
    },
    "node_02": {
      "type": "ChoiceNode",
      "choices": [
        {
          "id": "choice_friendly",
          "text": "TEXT_CHOICE_FRIENDLY",
          "nextNodeId": "node_friendly",
          "actions": [
            { "type": "ModifyRelationship", "npcId": "elder", "delta": 10 }
          ]
        },
        {
          "id": "choice_rude",
          "text": "TEXT_CHOICE_RUDE",
          "nextNodeId": "node_rude",
          "actions": [
            { "type": "ModifyRelationship", "npcId": "elder", "delta": -20 }
          ]
        },
        {
          "id": "choice_quest",
          "text": "TEXT_CHOICE_QUEST",
          "conditions": [
            { "type": "HasItem", "itemId": "ancient_artifact", "count": 1 }
          ],
          "nextNodeId": "node_quest_complete",
          "actions": [
            { "type": "RemoveItem", "itemId": "ancient_artifact", "count": 1 },
            { "type": "CompleteQuest", "questId": "q01_artifact" }
          ]
        }
      ]
    },
    "node_friendly": {
      "type": "TextNode",
      "ownerId": "elder",
      "text": "TEXT_ELDER_FRIENDLY",
      "emotion": "happy",
      "nextNodes": ["node_end"]
    },
    "node_rude": {
      "type": "TextNode",
      "ownerId": "elder",
      "text": "TEXT_ELDER_ANGRY",
      "emotion": "angry",
      "nextNodes": ["node_end"]
    },
    "node_quest_complete": {
      "type": "TextNode",
      "ownerId": "elder",
      "text": "TEXT_ELDER_QUEST_DONE",
      "emotion": "surprised",
      "nextNodes": ["node_reward"]
    },
    "node_reward": {
      "type": "ActionNode",
      "actions": [
        { "type": "GiveItem", "itemId": "gold", "count": 100 },
        { "type": "SetFlag", "key": "elder_quest_done", "value": true }
      ],
      "nextNodes": ["node_end"]
    },
    "node_end": {
      "type": "ActionNode",
      "actions": [
        { "type": "EndDialogue" }
      ],
      "nextNodes": []
    }
  }
}
```

---

## 3. 变量管理方案

### 3.1 全局 Flag 方法（基础版）

```python
# 全局 Flag 管理器（Python）
# 适用于小型项目，简单直接

from typing import Any, Dict, Optional, Callable, List
from dataclasses import dataclass, field
from datetime import datetime
import json
import os

@dataclass
class FlagChangeEvent:
    """Flag 变更事件记录"""
    flag_name: str
    old_value: Any
    new_value: Any
    timestamp: datetime
    source: str  # 触发来源（对话、任务、脚本等）

class GlobalFlagManager:
    """
    全局 Flag 管理器
    适用场景：小型项目、原型开发
    局限性：变量过多时难以维护，无命名空间隔离
    """
    
    def __init__(self):
        self._flags: Dict[str, Any] = {}
        self._listeners: Dict[str, List[Callable]] = {}
        self._history: List[FlagChangeEvent] = []
        self._dirty = False  # 是否有未保存的变更
    
    def set(self, name: str, value: Any, source: str = "system") -> None:
        """设置Flag值"""
        old_value = self._flags.get(name)
        if old_value != value:
            self._flags[name] = value
            self._dirty = True
            
            # 记录变更历史
            event = FlagChangeEvent(name, old_value, value, datetime.now(), source)
            self._history.append(event)
            
            # 通知监听器
            self._notify(name, old_value, value)
    
    def get(self, name: str, default: Any = None) -> Any:
        """获取Flag值"""
        return self._flags.get(name, default)
    
    def toggle(self, name: str) -> bool:
        """切换布尔Flag"""
        current = bool(self.get(name, False))
        self.set(name, not current, source="toggle")
        return not current
    
    def increment(self, name: str, delta: int = 1) -> int:
        """数值Flag自增"""
        current = int(self.get(name, 0))
        new_value = current + delta
        self.set(name, new_value, source="increment")
        return new_value
    
    def add_listener(self, name: str, callback: Callable) -> None:
        """添加Flag变更监听器"""
        if name not in self._listeners:
            self._listeners[name] = []
        self._listeners[name].append(callback)
    
    def _notify(self, name: str, old_val: Any, new_val: Any) -> None:
        """触发监听器回调"""
        for listener in self._listeners.get(name, []):
            try:
                listener(name, old_val, new_val)
            except Exception as e:
                print(f"[FlagManager] 监听器异常: {e}")
    
    def save(self, filepath: str) -> None:
        """持久化到JSON文件"""
        data = {
            "flags": self._flags,
            "history": [
                {
                    "flag": e.flag_name,
                    "from": e.old_value,
                    "to": e.new_value,
                    "time": e.timestamp.isoformat(),
                    "source": e.source
                }
                for e in self._history
            ]
        }
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        self._dirty = False
    
    def load(self, filepath: str) -> None:
        """从JSON文件加载"""
        if not os.path.exists(filepath):
            return
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        self._flags = data.get("flags", {})
        self._dirty = False


# ===== 使用示例 =====
if __name__ == "__main__":
    flags = GlobalFlagManager()
    
    # 基础操作
    flags.set("player_level", 5, source="level_up")
    flags.set("has_met_elder", True, source="dialogue")
    
    # 数值操作
    flags.increment("karma", -10)
    print(f"当前业力值: {flags.get('karma')}")
    
    # 监听变更
    def on_karma_change(name, old, new):
        print(f"[事件] {name} 从 {old} 变为 {new}")
    
    flags.add_listener("karma", on_karma_change)
    flags.increment("karma", 5)  # 触发回调
    
    # 保存进度
    flags.save("save_data.json")
```

### 3.2 层级化状态机（进阶版）

```python
# 层级化命名空间状态机（Python）
# 适用于中型到大型项目，解决全局Flag混乱问题

from typing import Any, Dict, List, Optional, Set
from dataclasses import dataclass, field
from enum import Enum
import copy

class VariableType(Enum):
    """变量类型枚举，用于类型安全检查"""
    BOOL = "bool"
    INT = "int"
    FLOAT = "float"
    STRING = "string"
    VECTOR = "vector"  # 向量/列表

@dataclass
class VariableDefinition:
    """变量定义元数据"""
    name: str
    var_type: VariableType
    default_value: Any
    description: str = ""
    persistent: bool = True  # 是否持久化保存
    sync_to_ui: bool = False  # 是否同步到UI

class Namespace:
    """
    命名空间：隔离不同系统的变量
    例如：quest.*, player.*, world.*, dialogue.*
    """
    
    def __init__(self, name: str, parent: Optional['Namespace'] = None):
        self.name = name
        self.parent = parent
        self._variables: Dict[str, Any] = {}
        self._definitions: Dict[str, VariableDefinition] = {}
        self._children: Dict[str, 'Namespace'] = {}
    
    def define(self, definition: VariableDefinition) -> None:
        """注册变量定义（应在初始化时调用）"""
        self._definitions[definition.name] = definition
        self._variables[definition.name] = copy.deepcopy(definition.default_value)
    
    def set(self, name: str, value: Any) -> bool:
        """
        设置变量值，包含类型检查
        返回是否设置成功
        """
        if name not in self._definitions:
            raise KeyError(f"变量 {self.name}.{name} 未定义，请先调用 define()")
        
        definition = self._definitions[name]
        if not self._type_check(value, definition.var_type):
            raise TypeError(
                f"变量 {self.name}.{name} 类型错误，"
                f"期望 {definition.var_type.value}，实际 {type(value)}"
            )
        
        self._variables[name] = value
        return True
    
    def get(self, name: str) -> Any:
        """获取变量值，如不存在则向上查找父命名空间"""
        if name in self._variables:
            return self._variables[name]
        if self.parent:
            return self.parent.get(name)
        raise KeyError(f"变量 {name} 在命名空间 {self.name} 及其父空间中不存在")
    
    def get_child(self, name: str) -> 'Namespace':
        """获取或创建子命名空间"""
        if name not in self._children:
            self._children[name] = Namespace(f"{self.name}.{name}", parent=self)
        return self._children[name]
    
    def get_full_path(self, name: str) -> str:
        """获取变量完整路径"""
        return f"{self.name}.{name}"
    
    def list_all(self) -> Dict[str, Any]:
        """列出当前命名空间所有变量"""
        return dict(self._variables)
    
    @staticmethod
    def _type_check(value: Any, expected: VariableType) -> bool:
        """类型检查"""
        type_map = {
            VariableType.BOOL: bool,
            VariableType.INT: int,
            VariableType.FLOAT: (int, float),
            VariableType.STRING: str,
            VariableType.VECTOR: list,
        }
        return isinstance(value, type_map.get(expected, object))


class HierarchicalStateManager:
    """
    层级化状态管理器
    组织形式：root -> player / world / quests / dialogue / etudes
    """
    
    def __init__(self):
        self._root = Namespace("root")
        self._namespaces: Dict[str, Namespace] = {}
        self._setup_default_namespaces()
    
    def _setup_default_namespaces(self):
        """初始化默认命名空间结构"""
        # player 命名空间：玩家相关状态
        player = self.create_namespace("player")
        player.define(VariableDefinition("level", VariableType.INT, 1, "玩家等级"))
        player.define(VariableDefinition("exp", VariableType.INT, 0, "经验值"))
        player.define(VariableDefinition("name", VariableType.STRING, "", "玩家名称"))
        
        # world 命名空间：世界状态
        world = self.create_namespace("world")
        world.define(VariableDefinition("day", VariableType.INT, 1, "游戏天数"))
        world.define(VariableDefinition("time", VariableType.FLOAT, 8.0, "当前时间"))
        world.define(VariableDefinition("weather", VariableType.STRING, "sunny", "天气"))
        
        # quests 命名空间：任务状态（支持子命名空间）
        quests = self.create_namespace("quests")
        
        # dialogue 命名空间：对话记录
        dialogue = self.create_namespace("dialogue")
        dialogue.define(VariableDefinition("last_speaker", VariableType.STRING, "", "最后对话NPC"))
        dialogue.define(VariableDefinition("choices_made", VariableType.VECTOR, [], "已做选择记录"))
    
    def create_namespace(self, path: str) -> Namespace:
        """创建命名空间，支持点号路径如 'quests.main'"""
        parts = path.split(".")
        current = self._root
        
        for part in parts:
            if part not in current._children:
                current._children[part] = Namespace(part, parent=current)
            current = current._children[part]
        
        self._namespaces[path] = current
        return current
    
    def get(self, full_path: str) -> Any:
        """
        通过完整路径获取变量值
        格式：namespace.variable 或 namespace.child.variable
        """
        parts = full_path.split(".")
        if len(parts) < 2:
            raise ValueError("路径格式错误，应为 'namespace.variable'")
        
        # 逐级查找命名空间
        current = self._root
        for part in parts[:-1]:
            if part not in current._children:
                raise KeyError(f"命名空间 {part} 不存在")
            current = current._children[part]
        
        return current.get(parts[-1])
    
    def set(self, full_path: str, value: Any) -> None:
        """通过完整路径设置变量值"""
        parts = full_path.split(".")
        if len(parts) < 2:
            raise ValueError("路径格式错误")
        
        current = self._root
        for part in parts[:-1]:
            if part not in current._children:
                raise KeyError(f"命名空间 {part} 不存在")
            current = current._children[part]
        
        current.set(parts[-1], value)
    
    def query(self, pattern: str) -> Dict[str, Any]:
        """
        按模式查询变量
        例如：query("quests.*.status") 返回所有任务状态
        """
        results = {}
        # 简化的通配符匹配实现
        for ns_path, namespace in self._namespaces.items():
            for var_name, value in namespace.list_all().items():
                full = f"{ns_path}.{var_name}" if ns_path else var_name
                if self._match_pattern(full, pattern):
                    results[full] = value
        return results
    
    def _match_pattern(self, text: str, pattern: str) -> bool:
        """简单的通配符匹配"""
        import fnmatch
        return fnmatch.fnmatch(text, pattern)
    
    def export_namespace(self, path: str) -> Dict[str, Any]:
        """导出指定命名空间下所有变量（用于保存）"""
        if path not in self._namespaces:
            return {}
        return self._namespaces[path].list_all()


# ===== 使用示例 =====
if __name__ == "__main__":
    manager = HierarchicalStateManager()
    
    # 设置玩家数据
    manager.set("player.level", 5)
    manager.set("player.name", "亚瑟")
    
    # 设置世界状态
    manager.set("world.day", 3)
    manager.set("world.weather", "rainy")
    
    # 动态创建任务子命名空间
    q1 = manager.create_namespace("quests.q01_artifact")
    q1.define(VariableDefinition("status", VariableType.STRING, "active", "任务状态"))
    q1.define(VariableDefinition("progress", VariableType.INT, 0, "任务进度"))
    
    manager.set("quests.q01_artifact.status", "completed")
    manager.set("quests.q01_artifact.progress", 100)
    
    print(f"玩家等级: {manager.get('player.level')}")
    print(f"任务状态: {manager.get('quests.q01_artifact.status')}")
```

### 3.3 持久化存储方案

```csharp
// 持久化存储：存档系统（C#）
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace NarrativeSystem.Persistence
{
    /// <summary>
    /// 存档数据容器
    /// </summary>
    public class SaveGameData
    {
        [JsonPropertyName("version")]
        public int Version { get; set; } = 1;
        
        [JsonPropertyName("timestamp")]
        public DateTime Timestamp { get; set; }
        
        [JsonPropertyName("playTime")]
        public float PlayTimeSeconds { get; set; }
        
        [JsonPropertyName("variables")]
        public Dictionary<string, JsonElement> Variables { get; set; } = new();
        
        [JsonPropertyName("etudes")]
        public List<EtudeSaveData> Etudes { get; set; } = new();
        
        [JsonPropertyName("quests")]
        public List<QuestSaveData> Quests { get; set; } = new();
        
        [JsonPropertyName("dialogueHistory")]
        public List<DialogueHistoryEntry> DialogueHistory { get; set; } = new();
        
        [JsonPropertyName("playerPosition")]
        public Vector3SaveData PlayerPosition { get; set; }
        
        [JsonPropertyName("currentScene")]
        public string CurrentScene { get; set; }
    }

    public class EtudeSaveData
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }
        
        [JsonPropertyName("state")]
        public string State { get; set; }
        
        [JsonPropertyName("activationTime")]
        public DateTime? ActivationTime { get; set; }
    }

    public class QuestSaveData
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }
        
        [JsonPropertyName("status")]
        public string Status { get; set; }
        
        [JsonPropertyName("objectives")]
        public List<ObjectiveSaveData> Objectives { get; set; } = new();
    }

    public class ObjectiveSaveData
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }
        
        [JsonPropertyName("completed")]
        public bool Completed { get; set; }
        
        [JsonPropertyName("progress")]
        public int Progress { get; set; }
    }

    public class DialogueHistoryEntry
    {
        [JsonPropertyName("dialogueId")]
        public string DialogueId { get; set; }
        
        [JsonPropertyName("nodeId")]
        public string NodeId { get; set; }
        
        [JsonPropertyName("choiceId")]
        public string ChoiceId { get; set; }
        
        [JsonPropertyName("timestamp")]
        public DateTime Timestamp { get; set; }
    }

    public class Vector3SaveData
    {
        [JsonPropertyName("x")]
        public float X { get; set; }
        
        [JsonPropertyName("y")]
        public float Y { get; set; }
        
        [JsonPropertyName("z")]
        public float Z { get; set; }
    }

    /// <summary>
    /// 存档管理器
    /// </summary>
    public class SaveManager
    {
        private readonly string _saveDirectory;
        private readonly JsonSerializerOptions _jsonOptions;
        
        public SaveManager(string saveDirectory)
        {
            _saveDirectory = saveDirectory;
            _jsonOptions = new JsonSerializerOptions
            {
                WriteIndented = true,
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            
            if (!Directory.Exists(_saveDirectory))
            {
                Directory.CreateDirectory(_saveDirectory);
            }
        }
        
        /// <summary>
        /// 保存游戏
        /// </summary>
        public void SaveGame(int slot, SaveGameData data)
        {
            data.Timestamp = DateTime.UtcNow;
            var filepath = GetSaveFilePath(slot);
            var json = JsonSerializer.Serialize(data, _jsonOptions);
            File.WriteAllText(filepath, json);
        }
        
        /// <summary>
        /// 加载游戏
        /// </summary>
        public SaveGameData LoadGame(int slot)
        {
            var filepath = GetSaveFilePath(slot);
            if (!File.Exists(filepath))
            {
                throw new FileNotFoundException($"存档槽 {slot} 不存在");
            }
            
            var json = File.ReadAllText(filepath);
            return JsonSerializer.Deserialize<SaveGameData>(json, _jsonOptions);
        }
        
        /// <summary>
        /// 列出所有存档
        /// </summary>
        public List<SaveInfo> ListSaves()
        {
            var saves = new List<SaveInfo>();
            foreach (var file in Directory.GetFiles(_saveDirectory, "save_*.json"))
            {
                var slotStr = Path.GetFileNameWithoutExtension(file).Replace("save_", "");
                if (int.TryParse(slotStr, out int slot))
                {
                    try
                    {
                        var data = LoadGame(slot);
                        saves.Add(new SaveInfo
                        {
                            Slot = slot,
                            Timestamp = data.Timestamp,
                            PlayTime = TimeSpan.FromSeconds(data.PlayTimeSeconds),
                            CurrentScene = data.CurrentScene
                        });
                    }
                    catch { /* 忽略损坏的存档 */ }
                }
            }
            return saves;
        }
        
        private string GetSaveFilePath(int slot) =>
            Path.Combine(_saveDirectory, $"save_{slot}.json");
    }

    public class SaveInfo
    {
        public int Slot { get; set; }
        public DateTime Timestamp { get; set; }
        public TimeSpan PlayTime { get; set; }
        public string CurrentScene { get; set; }
    }
}
```

---

## 4. 分支剧情代码示例

### 4.1 简单分支（if-else）

```python
# 简单分支剧情实现（Python）
# 适用场景：少量分支、快速原型

def simple_branching_example(player_state):
    """
    简单的if-else分支示例
    player_state: 包含玩家选择记录的字典
    """
    has_saved_village = player_state.get("saved_village", False)
    has_betrayed_king = player_state.get("betrayed_king", False)
    karma = player_state.get("karma", 0)
    
    # 第一幕：村庄事件
    if has_saved_village:
        print("村民热情地迎接你，孩子们围上来索要糖果。")
        reward = "village_blessing"
    else:
        print("村庄一片废墟，幸存的村民用怨恨的眼神看着你。")
        reward = "guilt_memory"
    
    player_state["act1_reward"] = reward
    
    # 第二幕：王座厅
    if has_betrayed_king:
        print("王座厅戒备森严，国王拒绝接见叛徒。")
        if karma < -50:
            print("卫兵冲上来逮捕你！")
            return "arrest_ending"
    else:
        print("国王微笑着向你点头。")
        if karma > 50:
            print("国王授予你贵族头衔。")
            player_state["noble_title"] = True
    
    return "continue"


# 更优雅的数据驱动版本
BRANCH_TABLE = {
    "village_event": {
        "conditions": [
            {"if": "saved_village", "then": "village_saved_branch"},
            {"if": "burned_village", "then": "village_burned_branch"},
        ],
        "default": "village_neutral_branch"
    },
    "village_saved_branch": {
        "text": "村民热情地迎接你，孩子们围上来索要糖果。",
        "rewards": ["village_blessing", "+10_karma"],
        "next": "throne_room"
    },
    "village_burned_branch": {
        "text": "村庄一片废墟，幸存的村民用怨恨的眼神看着你。",
        "rewards": ["guilt_memory", "-20_karma"],
        "next": "throne_room"
    },
    "village_neutral_branch": {
        "text": "村庄宁静如常，似乎没人注意到你的到来。",
        "next": "throne_room"
    }
}

def evaluate_branch(branch_id, player_state):
    """评估分支表，返回对应的剧情内容"""
    branch = BRANCH_TABLE.get(branch_id)
    if not branch:
        return None
    
    # 检查是否有条件分支
    conditions = branch.get("conditions", [])
    for cond in conditions:
        flag = cond["if"]
        if player_state.get(flag, False):
            return evaluate_branch(cond["then"], player_state)
    
    # 返回默认分支
    default_id = branch.get("default")
    if default_id:
        return evaluate_branch(default_id, player_state)
    
    return branch
```

### 4.2 复杂分支（状态机）

```csharp
// 复杂分支剧情状态机（C#）
// 适用场景：多结局RPG、复杂叙事网络

using System;
using System.Collections.Generic;
using System.Linq;

namespace NarrativeSystem.Branching
{
    /// <summary>
    /// 故事状态机：管理复杂分支剧情
    /// </summary>
    public class StoryStateMachine
    {
        private readonly Dictionary<string, StoryState> _states;
        private StoryState _currentState;
        private readonly HashSet<string> _visitedStates;
        private readonly List<StoryTransition> _transitionHistory;
        
        // 全局变量存储
        private readonly Dictionary<string, object> _variables;
        
        // 结局注册表
        private readonly Dictionary<string, EndingDefinition> _endings;

        public StoryStateMachine()
        {
            _states = new Dictionary<string, StoryState>();
            _visitedStates = new HashSet<string>();
            _transitionHistory = new List<StoryTransition>();
            _variables = new Dictionary<string, object>();
            _endings = new Dictionary<string, EndingDefinition>();
        }

        /// <summary>
        /// 注册故事状态
        /// </summary>
        public void RegisterState(StoryState state)
        {
            _states[state.Id] = state;
        }

        /// <summary>
        /// 注册结局
        /// </summary>
        public void RegisterEnding(EndingDefinition ending)
        {
            _endings[ending.Id] = ending;
        }

        /// <summary>
        /// 初始化状态机，进入起始状态
        /// </summary>
        public void Start(string initialStateId)
        {
            if (!_states.TryGetValue(initialStateId, out _currentState))
            {
                throw new ArgumentException($"初始状态 {initialStateId} 不存在");
            }
            EnterState(_currentState);
        }

        /// <summary>
        /// 推进剧情：根据当前状态和变量条件进行转移
        /// </summary>
        public void Tick()
        {
            if (_currentState == null) return;

            // 执行当前状态的OnUpdate
            _currentState.OnUpdate(this);

            // 检查所有出边转移条件
            foreach (var transition in _currentState.Transitions)
            {
                if (transition.CanTransition(this))
                {
                    ExecuteTransition(transition);
                    return;
                }
            }
        }

        /// <summary>
        /// 玩家做出选择
        /// </summary>
        public void MakeChoice(string choiceId)
        {
            var choice = _currentState?.Choices.FirstOrDefault(c => c.Id == choiceId);
            if (choice == null) return;

            // 执行选择附带的效果
            foreach (var effect in choice.Effects)
            {
                effect.Apply(this);
            }

            // 记录选择
            RecordChoice(choiceId);

            // 转移到选择指定的下一状态
            if (!string.IsNullOrEmpty(choice.TargetStateId))
            {
                TransitionTo(choice.TargetStateId);
            }
        }

        private void ExecuteTransition(StoryTransition transition)
        {
            var fromId = _currentState?.Id;
            TransitionTo(transition.TargetStateId);
            
            _transitionHistory.Add(new StoryTransition
            {
                FromStateId = fromId,
                ToStateId = transition.TargetStateId,
                TriggerType = transition.TriggerType,
                Timestamp = DateTime.UtcNow
            });
        }

        private void TransitionTo(string stateId)
        {
            if (!_states.TryGetValue(stateId, out var nextState))
            {
                // 检查是否是结局
                if (_endings.TryGetValue(stateId, out var ending))
                {
                    TriggerEnding(ending);
                    return;
                }
                throw new ArgumentException($"目标状态 {stateId} 不存在");
            }

            // 退出当前状态
            _currentState?.OnExit(this);
            
            // 进入新状态
            _currentState = nextState;
            EnterState(_currentState);
        }

        private void EnterState(StoryState state)
        {
            _visitedStates.Add(state.Id);
            state.OnEnter(this);
        }

        private void TriggerEnding(EndingDefinition ending)
        {
            ending.OnTrigger(this);
            _currentState = null; // 状态机结束
        }

        // 变量操作
        public void SetVariable(string key, object value) => _variables[key] = value;
        public T GetVariable<T>(string key) => _variables.TryGetValue(key, out var v) ? (T)v : default;
        public bool HasVisited(string stateId) => _visitedStates.Contains(stateId);
        public IReadOnlyList<StoryTransition> GetHistory() => _transitionHistory;

        private void RecordChoice(string choiceId)
        {
            var choices = GetVariable<List<string>>("_choices") ?? new List<string>();
            choices.Add(choiceId);
            SetVariable("_choices", choices);
        }
    }

    /// <summary>
    /// 故事状态节点
    /// </summary>
    public class StoryState
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        
        // 自动转移条件（无需玩家选择）
        public List<StoryTransition> Transitions { get; set; } = new List<StoryTransition>();
        
        // 玩家可做的选择
        public List<PlayerChoice> Choices { get; set; } = new List<PlayerChoice>();

        // 状态生命周期回调
        public Action<StoryStateMachine> OnEnter { get; set; } = _ => { };
        public Action<StoryStateMachine> OnUpdate { get; set; } = _ => { };
        public Action<StoryStateMachine> OnExit { get; set; } = _ => { };
    }

    /// <summary>
    /// 状态转移定义
    /// </summary>
    public class StoryTransition
    {
        public string TargetStateId { get; set; }
        public TransitionTriggerType TriggerType { get; set; }
        public Func<StoryStateMachine, bool> Condition { get; set; }
        public DateTime Timestamp { get; set; }
        public string FromStateId { get; set; }
        public string ToStateId { get; set; }

        public bool CanTransition(StoryStateMachine machine) => Condition?.Invoke(machine) ?? true;
    }

    /// <summary>
    /// 玩家选择定义
    /// </summary>
    public class PlayerChoice
    {
        public string Id { get; set; }
        public string Text { get; set; }
        public string Tooltip { get; set; }
        public List<ChoiceEffect> Effects { get; set; } = new List<ChoiceEffect>();
        public string TargetStateId { get; set; }
        public Func<StoryStateMachine, bool> VisibilityCondition { get; set; } = _ => true;
    }

    /// <summary>
    /// 选择效果
    /// </summary>
    public class ChoiceEffect
    {
        public EffectType Type { get; set; }
        public Dictionary<string, object> Parameters { get; set; } = new Dictionary<string, object>();

        public void Apply(StoryStateMachine machine)
        {
            switch (Type)
            {
                case EffectType.SetVariable:
                    machine.SetVariable((string)Parameters["key"], Parameters["value"]);
                    break;
                case EffectType.ModifyRelationship:
                    // 实现关系值修改
                    break;
                case EffectType.AddItem:
                    // 实现添加物品
                    break;
                case EffectType.TriggerEvent:
                    // 实现事件触发
                    break;
            }
        }
    }

    public class EndingDefinition
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public EndingType Type { get; set; }
        public Action<StoryStateMachine> OnTrigger { get; set; }
    }

    public enum TransitionTriggerType { Automatic, Conditional, Event }
    public enum EffectType { SetVariable, ModifyRelationship, AddItem, TriggerEvent }
    public enum EndingType { Good, Bad, Neutral, Secret, True }
}
```

### 4.3 延迟反馈实现

```python
# 延迟反馈系统（Python）
# 实现"早期的选择在后期产生回响"的设计目标

import time
from typing import Dict, List, Callable, Any
from dataclasses import dataclass, field
from datetime import datetime, timedelta

@dataclass
class DelayedConsequence:
    """
    延迟后果：记录一个将在未来某个条件满足时触发的效果
    """
    consequence_id: str
    trigger_condition: Dict[str, Any]  # 触发条件
    effects: List[Dict[str, Any]]      # 触发后的效果列表
    source_choice: str                 # 来源于哪个选择
    description: str = ""
    expires_after: int = -1            # 多少秒后过期（-1表示不过期）
    created_at: datetime = field(default_factory=datetime.now)
    triggered: bool = False

class DelayedFeedbackSystem:
    """
    延迟反馈系统
    
    设计思路：
    - 玩家做出选择时，不一定立即看到所有后果
    - 某些后果被注册为"延迟后果"，在特定条件满足时触发
    - 条件可以是：到达某章节、进入某地图、与某NPC对话等
    """
    
    def __init__(self):
        self._pending: List[DelayedConsequence] = []
        self._history: List[DelayedConsequence] = []
        self._handlers: Dict[str, Callable] = {}
        self._event_count = 0  # 用于追踪游戏内"时间"
    
    def register_handler(self, effect_type: str, handler: Callable):
        """注册效果处理器"""
        self._handlers[effect_type] = handler
    
    def add_consequence(self, consequence: DelayedConsequence):
        """添加延迟后果"""
        self._pending.append(consequence)
        print(f"[延迟反馈] 注册后果: {consequence.description}")
    
    def tick(self, current_state: Dict[str, Any]):
        """
        每帧或每个叙事节点检查一次
        current_state: 当前游戏状态快照
        """
        self._event_count += 1
        to_remove = []
        
        for consequence in self._pending:
            if consequence.triggered:
                continue
            
            # 检查是否过期
            if consequence.expires_after > 0:
                elapsed = (datetime.now() - consequence.created_at).total_seconds()
                if elapsed > consequence.expires_after:
                    to_remove.append(consequence)
                    continue
            
            # 检查触发条件
            if self._check_condition(consequence.trigger_condition, current_state):
                self._trigger(consequence, current_state)
                to_remove.append(consequence)
        
        for c in to_remove:
            self._pending.remove(c)
    
    def _check_condition(self, condition: Dict[str, Any], state: Dict[str, Any]) -> bool:
        """检查条件是否满足"""
        condition_type = condition.get("type")
        
        if condition_type == "chapter_reached":
            return state.get("current_chapter") == condition["chapter"]
        
        elif condition_type == "location_entered":
            return state.get("current_location") == condition["location"]
        
        elif condition_type == "npc_met":
            met_npcs = state.get("met_npcs", [])
            return condition["npc"] in met_npcs
        
        elif condition_type == "flag_set":
            return state.get(condition["flag"]) == condition["value"]
        
        elif condition_type == "event_count":
            return self._event_count >= condition["count"]
        
        elif condition_type == "and":
            return all(self._check_condition(c, state) for c in condition["conditions"])
        
        elif condition_type == "or":
            return any(self._check_condition(c, state) for c in condition["conditions"])
        
        return False
    
    def _trigger(self, consequence: DelayedConsequence, state: Dict[str, Any]):
        """触发后果效果"""
        consequence.triggered = True
        self._history.append(consequence)
        
        print(f"\n[延迟反馈触发] {consequence.description}")
        for effect in consequence.effects:
            effect_type = effect["type"]
            handler = self._handlers.get(effect_type)
            if handler:
                handler(effect, state)
            else:
                print(f"  [效果] {effect_type}: {effect}")
    
    def get_pending(self) -> List[DelayedConsequence]:
        """获取待触发的后果列表（用于调试UI）"""
        return [c for c in self._pending if not c.triggered]
    
    def get_history(self) -> List[DelayedConsequence]:
        """获取已触发的历史记录"""
        return self._history


# ===== 使用示例：早期选择，后期回响 =====
def demo_delayed_feedback():
    system = DelayedFeedbackSystem()
    
    # 注册效果处理器
    def handle_dialogue(effect, state):
        print(f"  -> 触发对话: {effect['dialogue_id']}")
    
    def handle_flag(effect, state):
        state[effect["key"]] = effect["value"]
        print(f"  -> 设置变量: {effect['key']} = {effect['value']}")
    
    system.register_handler("show_dialogue", handle_dialogue)
    system.register_handler("set_flag", handle_flag)
    
    # 模拟游戏状态
    game_state = {
        "current_chapter": 1,
        "current_location": "village",
        "met_npcs": [],
        "karma": 0
    }
    
    # 第1章：玩家在村庄做出选择——偷了商人的钱
    print("=" * 50)
    print("[第1章] 玩家偷了商人的钱...")
    
    system.add_consequence(DelayedConsequence(
        consequence_id="stolen_money_echo",
        trigger_condition={
            "type": "chapter_reached",
            "chapter": 3
        },
        effects=[
            {"type": "show_dialogue", "dialogue_id": "merchant_revenge"},
            {"type": "set_flag", "key": "merchant_hates_you", "value": True}
        ],
        source_choice="steal_from_merchant",
        description="第1章偷钱的行为在第3章被商人记住"
    ))
    
    # 第2章：正常推进
    print("\n[第2章] 推进剧情...")
    game_state["current_chapter"] = 2
    system.tick(game_state)  # 无触发
    
    # 第3章：延迟反馈触发！
    print("\n[第3章] 到达首都...")
    game_state["current_chapter"] = 3
    game_state["current_location"] = "capital"
    system.tick(game_state)  # 触发商人复仇

if __name__ == "__main__":
    demo_delayed_feedback()
```

### 4.4 多结局管理

```python
# 多结局管理系统（Python）
# 根据玩家全程的选择组合计算最终结局

from typing import Dict, List, Callable, Optional
from dataclasses import dataclass
from enum import Enum

class EndingTier(Enum):
    """结局层级"""
    NORMAL = "normal"
    GOOD = "good"
    BAD = "bad"
    SECRET = "secret"
    TRUE_END = "true_end"

@dataclass
class Ending:
    """结局定义"""
    ending_id: str
    title: str
    description: str
    tier: EndingTier
    conditions: List[Dict]  # 解锁条件
    epilogue_text: str = ""

class MultipleEndingManager:
    """
    多结局管理器
    
    核心机制：
    1. 每个结局有一组条件（变量值、选择记录、 visited状态等）
    2. 结局按优先级排序（秘密结局 > 真结局 > 好/坏结局 > 普通结局）
    3. 支持多条件组合：AND（必须全部满足）或 OR（满足任一）
    """
    
    def __init__(self):
        self._endings: Dict[str, Ending] = {}
        self._priority_order = [
            EndingTier.TRUE_END,
            EndingTier.SECRET,
            EndingTier.GOOD,
            EndingTier.BAD,
            EndingTier.NORMAL
        ]
    
    def register_ending(self, ending: Ending):
        """注册结局"""
        self._endings[ending.ending_id] = ending
    
    def calculate_ending(self, player_state: Dict) -> Optional[Ending]:
        """
        根据玩家状态计算最终结局
        返回优先级最高的满足条件的结局
        """
        candidates = []
        
        for ending in self._endings.values():
            if self._check_ending_conditions(ending.conditions, player_state):
                candidates.append(ending)
        
        if not candidates:
            return None
        
        # 按优先级排序，返回最高优先级
        candidates.sort(key=lambda e: self._priority_order.index(e.tier))
        return candidates[0]
    
    def _check_ending_conditions(self, conditions: List[Dict], state: Dict) -> bool:
        """检查结局条件是否满足"""
        for cond in conditions:
            if not self._evaluate_condition(cond, state):
                return False
        return True
    
    def _evaluate_condition(self, cond: Dict, state: Dict) -> bool:
        """评估单个条件"""
        cond_type = cond.get("type")
        
        if cond_type == "flag_equals":
            return state.get(cond["flag"]) == cond["value"]
        
        elif cond_type == "flag_gte":
            return state.get(cond["flag"], 0) >= cond["value"]
        
        elif cond_type == "flag_lte":
            return state.get(cond["flag"], 0) <= cond["value"]
        
        elif cond_type == "choice_made":
            choices = state.get("choices_made", [])
            return cond["choice_id"] in choices
        
        elif cond_type == "all_choices":
            choices = state.get("choices_made", [])
            return all(c in choices for c in cond["choice_ids"])
        
        elif cond_type == "any_choice":
            choices = state.get("choices_made", [])
            return any(c in choices for c in cond["choice_ids"])
        
        elif cond_type == "visited_state":
            visited = state.get("visited_states", [])
            return cond["state_id"] in visited
        
        elif cond_type == "not":
            return not self._evaluate_condition(cond["condition"], state)
        
        return False
    
    def preview_endings(self, player_state: Dict) -> List[Dict]:
        """
        预览：显示当前状态下各结局的解锁进度
        用于游戏中的"结局收集"UI
        """
        previews = []
        for ending in self._endings.values():
            total = len(ending.conditions)
            met = sum(1 for c in ending.conditions if self._evaluate_condition(c, player_state))
            previews.append({
                "ending_id": ending.ending_id,
                "title": ending.title,
                "tier": ending.tier.value,
                "progress": f"{met}/{total}",
                "unlocked": met == total,
                "percentage": (met / total * 100) if total > 0 else 0
            })
        return sorted(previews, key=lambda x: x["percentage"], reverse=True)


# ===== 使用示例：多结局配置 =====
def setup_endings():
    manager = MultipleEndingManager()
    
    # 真结局：最严格的条件
    manager.register_ending(Ending(
        ending_id="true_end",
        title="世界守护者",
        description="你拯救了所有人，包括你的敌人。",
        tier=EndingTier.TRUE_END,
        conditions=[
            {"type": "flag_gte", "flag": "karma", "value": 80},
            {"type": "all_choices", "choice_ids": ["spare_boss", "save_village", "redeem_rival"]},
            {"type": "visited_state", "state_id": "secret_garden"},
            {"type": "flag_equals", "flag": "true_artifact_restored", "value": True}
        ],
        epilogue_text="在光芒中，世界获得了新生..."
    ))
    
    # 好结局
    manager.register_ending(Ending(
        ending_id="good_end",
        title="英雄归来",
        description="你成为了人们口中的英雄。",
        tier=EndingTier.GOOD,
        conditions=[
            {"type": "flag_gte", "flag": "karma", "value": 30},
            {"type": "flag_equals", "flag": "boss_defeated", "value": True}
        ],
        epilogue_text="王座上，新的传说开始了..."
    ))
    
    # 坏结局
    manager.register_ending(Ending(
        ending_id="bad_end",
        title="孤独的王座",
        description="你获得了力量，但失去了所有。",
        tier=EndingTier.BAD,
        conditions=[
            {"type": "flag_lte", "flag": "karma", "value": -30},
            {"type": "flag_equals", "flag": "boss_defeated", "value": True}
        ],
        epilogue_text="王座冰冷，无人分享..."
    ))
    
    # 秘密结局
    manager.register_ending(Ending(
        ending_id="secret_end",
        title="幕后黑手",
        description="原来你才是最终的幕后操纵者。",
        tier=EndingTier.SECRET,
        conditions=[
            {"type": "choice_made", "choice_id": "join_dark_cult"},
            {"type": "flag_equals", "flag": "betrayed_all", "value": True},
            {"type": "flag_equals", "flag": "secret_ritual_done", "value": True}
        ],
        epilogue_text="在阴影中，你露出了微笑..."
    ))
    
    # 普通结局（保底）
    manager.register_ending(Ending(
        ending_id="normal_end",
        title="旅程的终点",
        description="冒险结束，生活继续。",
        tier=EndingTier.NORMAL,
        conditions=[
            {"type": "flag_equals", "flag": "game_completed", "value": True}
        ]
    ))
    
    return manager


# 模拟结算
if __name__ == "__main__":
    manager = setup_endings()
    
    # 玩家A：走真结局路线
    player_a = {
        "karma": 90,
        "choices_made": ["spare_boss", "save_village", "redeem_rival", "help_stranger"],
        "visited_states": ["secret_garden", "capital", "dungeon"],
        "true_artifact_restored": True,
        "game_completed": True
    }
    
    ending = manager.calculate_ending(player_a)
    print(f"玩家A结局: {ending.title} [{ending.tier.value}]")
    
    # 预览所有结局进度
    print("\n结局收集进度:")
    for preview in manager.preview_endings(player_a):
        status = "已解锁" if preview["unlocked"] else f"{preview['progress']}"
        print(f"  [{preview['tier']}] {preview['title']}: {status}")
```

---

## 5. 叙事工具集成

### 5.1 articy:draft X API 集成

```csharp
// articy:draft X 运行时集成（C# / Unity）
// articy 导出为 JSON 或 Unity Plugin 后，通过以下接口加载

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace NarrativeSystem.Integrations.Articy
{
    /// <summary>
    /// articy:draft X 导出数据加载器
    /// </summary>
    public class ArticyDataLoader
    {
        private JObject _root;
        private Dictionary<string, ArticyNode> _nodes;
        private Dictionary<string, ArticyDialogue> _dialogues;

        /// <summary>
        /// 从 articy 导出的 JSON 文件加载
        /// </summary>
        public void LoadFromJson(string filepath)
        {
            var json = File.ReadAllText(filepath);
            _root = JObject.Parse(json);
            _nodes = new Dictionary<string, ArticyNode>();
            _dialogues = new Dictionary<string, ArticyDialogue>();
            
            ParsePackages();
        }

        private void ParsePackages()
        {
            var packages = _root["Packages"] as JArray;
            foreach (var pkg in packages)
            {
                ParseModels(pkg["Models"] as JArray);
            }
        }

        private void ParseModels(JArray models)
        {
            foreach (var model in models)
            {
                var type = model["Type"]?.ToString();
                var id = model["Id"]?.ToString();
                
                switch (type)
                {
                    case "Dialogue":
                        _dialogues[id] = ParseDialogue(model);
                        break;
                    case "DialogueFragment":
                        _nodes[id] = ParseFragment(model);
                        break;
                    case "Hub":
                        _nodes[id] = ParseHub(model);
                        break;
                    case "Jump":
                        _nodes[id] = ParseJump(model);
                        break;
                }
            }
        }

        private ArticyDialogue ParseDialogue(JToken model)
        {
            return new ArticyDialogue
            {
                Id = model["Id"].ToString(),
                TechnicalName = model["TechnicalName"].ToString(),
                DisplayName = model["DisplayName"]?.ToString(),
                // 解析输入/输出引脚连接
                InputPins = ParsePins(model["InputPins"] as JArray),
                OutputPins = ParsePins(model["OutputPins"] as JArray)
            };
        }

        private ArticyFragment ParseFragment(JToken model)
        {
            return new ArticyFragment
            {
                Id = model["Id"].ToString(),
                TechnicalName = model["TechnicalName"].ToString(),
                Text = model["Text"]?.ToString(),
                StageDirections = model["StageDirections"]?.ToString(),
                Speaker = model["Speaker"]?.ToString(),
                InputPins = ParsePins(model["InputPins"] as JArray),
                OutputPins = ParsePins(model["OutputPins"] as JArray)
            };
        }

        private List<ArticyPin> ParsePins(JArray pins)
        {
            if (pins == null) return new List<ArticyPin>();
            
            return pins.Select(p => new ArticyPin
            {
                Id = p["Id"]?.ToString(),
                Text = p["Text"]?.ToString(),
                Connections = (p["Connections"] as JArray)?.Select(c => c["Target"]?.ToString()).ToList()
                    ?? new List<string>()
            }).ToList();
        }

        public ArticyDialogue GetDialogue(string id) => _dialogues.GetValueOrDefault(id);
        public ArticyNode GetNode(string id) => _nodes.GetValueOrDefault(id);
    }

    // articy 数据模型
    public class ArticyNode
    {
        public string Id { get; set; }
        public string TechnicalName { get; set; }
        public List<ArticyPin> InputPins { get; set; } = new List<ArticyPin>();
        public List<ArticyPin> OutputPins { get; set; } = new List<ArticyPin>();
    }

    public class ArticyDialogue : ArticyNode
    {
        public string DisplayName { get; set; }
    }

    public class ArticyFragment : ArticyNode
    {
        public string Text { get; set; }
        public string StageDirections { get; set; }
        public string Speaker { get; set; }
    }

    public class ArticyHub : ArticyNode { }
    public class ArticyJump : ArticyNode
    {
        public string Target { get; set; }
    }

    public class ArticyPin
    {
        public string Id { get; set; }
        public string Text { get; set; }
        public List<string> Connections { get; set; } = new List<string>();
    }
}
```

### 5.2 ink (Inkle) 脚本集成

```csharp
// ink 运行时集成（C#）
// 使用官方 ink-engine-runtime 包：Install-Package Ink-engine-runtime

using Ink.Runtime;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace NarrativeSystem.Integrations.Ink
{
    /// <summary>
    /// Ink 故事包装器
    /// </summary>
    public class InkStoryRunner
    {
        private Story _story;
        private readonly Dictionary<string, Action<object>> _externalFunctions;

        public InkStoryRunner(string jsonFilePath)
        {
            var json = File.ReadAllText(jsonFilePath);
            _story = new Story(json);
            _externalFunctions = new Dictionary<string, Action<object>>();
        }

        /// <summary>
        /// 注册外部函数供 ink 脚本调用
        /// ink 中使用：~ my_function(param)
        /// </summary>
        public void BindExternalFunction(string name, Func<object> func)
        {
            _story.BindExternalFunction(name, func);
        }

        public void BindExternalFunction<T>(string name, Func<T, object> func)
        {
            _story.BindExternalFunction(name, func);
        }

        /// <summary>
        /// 推进故事：获取当前段落文本
        /// </summary>
        public string Continue()
        {
            if (_story.canContinue)
            {
                return _story.Continue();
            }
            return null;
        }

        /// <summary>
        /// 当前是否有选项
        /// </summary>
        public bool HasChoices => _story.currentChoices.Count > 0;

        /// <summary>
        /// 获取当前可选选项
        /// </summary>
        public List<InkChoice> GetCurrentChoices()
        {
            return _story.currentChoices.Select(c => new InkChoice
            {
                Index = c.index,
                Text = c.text,
                OriginalChoice = c
            }).ToList();
        }

        /// <summary>
        /// 做出选择
        /// </summary>
        public void ChooseChoiceIndex(int index)
        {
            _story.ChooseChoiceIndex(index);
        }

        /// <summary>
        /// 设置 ink 变量
        /// </summary>
        public void SetVariable(string name, object value)
        {
            _story.variablesState[name] = value;
        }

        /// <summary>
        /// 获取 ink 变量
        /// </summary>
        public object GetVariable(string name)
        {
            return _story.variablesState[name];
        }

        /// <summary>
        /// 观察变量变更
        /// </summary>
        public void ObserveVariable(string name, Action<string, object> callback)
        {
            _story.ObserveVariable(name, (varName, newValue) => callback(varName, newValue));
        }

        /// <summary>
        /// 故事是否结束
        /// </summary>
        public bool IsEnded => !_story.canContinue && !HasChoices;

        /// <summary>
        /// 获取当前标签（用于触发游戏事件）
        /// ink 中使用：# trigger_event: battle_boss
        /// </summary>
        public List<string> CurrentTags => _story.currentTags ?? new List<string>();
    }

    public class InkChoice
    {
        public int Index { get; set; }
        public string Text { get; set; }
        public object OriginalChoice { get; set; }
    }
}
```

```ink
// 示例 ink 脚本（.ink 文件）
// ink 是 Inkle Studios 开发的叙事脚本语言

// === 变量定义 ===
VAR karma = 0
VAR has_artifact = false
VAR elder_trust = 50

// ===  knots（章节/段落） ===
-> elder_meeting

=== elder_meeting ===
# location: village_center
# music: peaceful

长老看着你，眼神中带着审视。

* [恭敬地打招呼]
    ~ elder_trust += 10
    长老微微点头："年轻人，你很有礼貌。"
    -> elder_quest_offer
    
* [直接索要奖励]
    ~ elder_trust -= 20
    ~ karma -= 5
    长老皱眉："无礼！我们还没有正式认识。"
    -> elder_cold

* {has_artifact} [展示古代遗物]
    长老瞪大了眼睛："这...这是传说中的圣物！"
    ~ elder_trust = 100
    -> elder_artifact_reaction

=== elder_quest_offer ===
"村子的东边出现了怪物，你愿意帮忙吗？"

* [接受任务]
    ~ karma += 5
    太好了，我会给你丰厚的报酬。
    -> quest_accepted
    
* [拒绝]
    ~ elder_trust -= 10
    好吧...我们找别人。
    -> village_leave

=== elder_cold ===
{ elder_trust < 30:
    长老转身不再理你。
    # trigger_event: elder_ignores_player
- else:
    虽然不满，长老还是保持了礼貌。
}
-> village_leave

=== quest_accepted ===
// 这里可以使用 ink 的线程和拼接功能
你接受了任务，准备前往东边的森林。
# trigger_event: spawn_forest_monsters
-> END

=== village_leave ===
你离开了村庄。
-> END

=== elder_artifact_reaction ===
长老激动地握住你的手...
// 特殊剧情分支
-> END
```

### 5.3 Yarn Spinner 集成

```csharp
// Yarn Spinner 集成（Unity / C#）
// 使用 Yarn Spinner Unity 包

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnityEngine;
using Yarn;
using Yarn.Unity;

namespace NarrativeSystem.Integrations.YarnSpinner
{
    /// <summary>
    /// Yarn Spinner 对话系统桥接
    /// </summary>
    public class YarnDialogueBridge : MonoBehaviour
    {
        [SerializeField] private DialogueRunner dialogueRunner;
        [SerializeField] private DialogueUI dialogueUI;
        
        // 游戏状态引用
        private IGameState _gameState;
        
        private void Start()
        {
            // 注册命令（Yarn 中的 <<command>>）
            RegisterCommands();
            
            // 注册函数（Yarn 中的 {function()}）
            RegisterFunctions();
            
            // 监听变量变更
            dialogueRunner.VariableStorage.OnVariableChange += OnVariableChanged;
        }

        private void RegisterCommands()
        {
            // <<give_item item_id count>>
            dialogueRunner.AddCommandHandler<string, int>(
                "give_item", 
                (itemId, count) => _gameState.Inventory.Add(itemId, count)
            );
            
            // <<set_relationship npc_id value>>
            dialogueRunner.AddCommandHandler<string, int>(
                "set_relationship",
                (npcId, value) => _gameState.Relationships.Set(npcId, value)
            );
            
            // <<trigger_event event_id>>
            dialogueRunner.AddCommandHandler<string>(
                "trigger_event",
                (eventId) => _gameState.Events.Trigger(eventId)
            );
            
            // <<fade_in duration>>
            dialogueRunner.AddCommandHandler<float>(
                "fade_in",
                async (duration) => await ScreenFader.FadeIn(duration)
            );
            
            // <<wait seconds>>
            dialogueRunner.AddCommandHandler<float>(
                "wait",
                async (seconds) => await Task.Delay(TimeSpan.FromSeconds(seconds))
            );
        }

        private void RegisterFunctions()
        {
            // {has_item("sword")}
            dialogueRunner.AddFunction<bool>("has_item", HasItem);
            
            // {get_relationship("elder")}
            dialogueRunner.AddFunction<int>("get_relationship", GetRelationship);
            
            // {random_range(1, 100)}
            dialogueRunner.AddFunction<int>("random_range", RandomRange);
        }

        private bool HasItem(string itemId)
        {
            return _gameState.Inventory.Has(itemId);
        }

        private int GetRelationship(string npcId)
        {
            return _gameState.Relationships.Get(npcId);
        }

        private int RandomRange(int min, int max)
        {
            return UnityEngine.Random.Range(min, max + 1);
        }

        private void OnVariableChanged(string name, Yarn.IVariableStorage.Value value)
        {
            // 同步 Yarn 变量到游戏状态
            _gameState.SetVariable($"yarn.{name}", ConvertYarnValue(value));
        }

        private object ConvertYarnValue(Yarn.IVariableStorage.Value value)
        {
            return value.type switch
            {
                Yarn.IVariableStorage.Type.Number => value.numberValue,
                Yarn.IVariableStorage.Type.String => value.stringValue,
                Yarn.IVariableStorage.Type.Bool => value.boolValue,
                _ => null
            };
        }

        /// <summary>
        /// 启动 Yarn 对话
        /// </summary>
        public void StartDialogue(string nodeName)
        {
            if (dialogueRunner.IsDialogueRunning)
            {
                dialogueRunner.Stop();
            }
            
            // 同步游戏变量到 Yarn
            SyncVariablesToYarn();
            
            dialogueRunner.StartDialogue(nodeName);
        }

        private void SyncVariablesToYarn()
        {
            // 将游戏状态中的变量注入 Yarn
            foreach (var kvp in _gameState.GetAllVariables())
            {
                var yarnName = kvp.Key.Replace("yarn.", "");
                switch (kvp.Value)
                {
                    case int i:
                        dialogueRunner.VariableStorage.SetValue(yarnName, (float)i);
                        break;
                    case float f:
                        dialogueRunner.VariableStorage.SetValue(yarnName, f);
                        break;
                    case string s:
                        dialogueRunner.VariableStorage.SetValue(yarnName, s);
                        break;
                    case bool b:
                        dialogueRunner.VariableStorage.SetValue(yarnName, b);
                        break;
                }
            }
        }
    }
}
```

```yarn
// 示例 Yarn 脚本（.yarn 文件）
// Yarn Spinner 使用类似 Markdown 的语法

// === 节点定义 ===
title: ElderGreeting
 tags: #location:village #npc:elder
---
<<if $visited_elder is true>>
    长老：你又来了，有什么事吗？
<<else>>
    长老：欢迎来到我们的村庄，旅行者。
    <<set $visited_elder to true>>
<<endif>>

-> 我想接一些任务
    <<jump QuestBoard>>
    
-> 我想了解一下这里的历史
    <<if $player_level >= 5>>
        长老：既然你已经有一定实力了，我可以告诉你关于古代遗迹的事...
        <<set $knows_about_ruins to true>>
        <<jump RuinsHistory>>
    <<else>>
        长老：你还太年轻了，等变强一些再来吧。
        <<set $elder_trust to $elder_trust - 5>>
    <<endif>>
    
-> { $has_artifact } 我找到了这个古代遗物
    长老：天啊！我以为这只是传说！
    <<give_item gold 500>>
    <<set_relationship elder 100>>
    <<trigger_event elder_special_quest>>
    
-> 再见
    长老：愿风指引你的道路。
    <<stop>>
===

// === 另一个节点 ===
title: QuestBoard
---
任务公告板上贴着几张泛黄的纸：

-> [清理东边的狼群]（推荐等级：3）
    <<if $player_level < 3>>
        你觉得自己还不够强大...
        -> 还是算了
            <<jump ElderGreeting>>
    <<endif>>
    你接下了委托。
    <<set $quest_wolves to "active">>
    <<trigger_event spawn_wolves>>
    
-> [寻找丢失的项链]
    一个简单的小任务。
    <<set $quest_necklace to "active">>

<<stop>>
===
```

### 5.4 Twine 导出与解析

```python
# Twine (Harlowe/SugarCube) 故事解析器（Python）
# Twine 导出为 HTML 后，可以提取其中的故事数据

from html.parser import HTMLParser
from dataclasses import dataclass, field
from typing import Dict, List, Optional
import re
import json

@dataclass
class TwinePassage:
    """Twine 段落节点"""
    pid: str
    name: str
    text: str
    tags: List[str] = field(default_factory=list)
    links: List[str] = field(default_factory=list)  # [[链接文本->目标]]
    position: tuple = (0, 0)  # 编辑器中的位置

class TwineHtmlParser(HTMLParser):
    """
    解析 Twine 导出的 HTML 文件
    Twine 使用 <tw-storydata> 标签存储故事数据
    """
    
    def __init__(self):
        super().__init__()
        self.story_name = ""
        self.story_data = ""
        self.passages: List[TwinePassage] = []
        self._current_passage = None
        self._in_passage = False
        self._capture_data = False
    
    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        
        if tag == "tw-storydata":
            self.story_name = attrs_dict.get("name", "")
            self.story_data = attrs_dict.get("options", "")
        
        elif tag == "tw-passagedata":
            self._in_passage = True
            self._current_passage = {
                "pid": attrs_dict.get("pid", ""),
                "name": attrs_dict.get("name", ""),
                "tags": attrs_dict.get("tags", "").split() if attrs_dict.get("tags") else [],
                "position": (
                    int(attrs_dict.get("position", "0,0").split(",")[0]),
                    int(attrs_dict.get("position", "0,0").split(",")[1])
                ) if "position" in attrs_dict else (0, 0),
                "text": ""
            }
    
    def handle_endtag(self, tag):
        if tag == "tw-passagedata" and self._current_passage:
            text = self._current_passage["text"]
            links = self._extract_links(text)
            
            passage = TwinePassage(
                pid=self._current_passage["pid"],
                name=self._current_passage["name"],
                text=text,
                tags=self._current_passage["tags"],
                links=links,
                position=self._current_passage["position"]
            )
            self.passages.append(passage)
            self._in_passage = False
            self._current_passage = None
    
    def handle_data(self, data):
        if self._in_passage and self._current_passage is not None:
            self._current_passage["text"] += data
    
    def _extract_links(self, text: str) -> List[str]:
        """提取 Twine 链接语法：[[目标]] 或 [[文本->目标]] 或 [[目标|文本]]"""
        pattern = r'\[\[(.*?)\]\]'
        matches = re.findall(pattern, text)
        targets = []
        for match in matches:
            # 处理 "文本->目标" 或 "目标|文本" 格式
            if '->' in match:
                targets.append(match.split('->')[-1].strip())
            elif '|' in match:
                targets.append(match.split('|')[0].strip())
            else:
                targets.append(match.strip())
        return targets


class TwineToCustomConverter:
    """
    将 Twine 故事转换为自定义 JSON 格式
    便于导入到自定义游戏引擎
    """
    
    def convert(self, parser: TwineHtmlParser) -> dict:
        passages = {}
        for p in parser.passages:
            passages[p.name] = {
                "id": p.pid,
                "text": p.text,
                "tags": p.tags,
                "links": [
                    {
                        "target": link,
                        "conditions": []  # Twine 基础版无内置条件
                    }
                    for link in p.links
                ],
                "position": p.position
            }
        
        return {
            "source": "twine",
            "story_name": parser.story_name,
            "format": "custom-v1",
            "entry_point": parser.passages[0].name if parser.passages else "",
            "passages": passages
        }
    
    def convert_with_macros(self, parser: TwineHtmlParser) -> dict:
        """
        增强版本：解析 SugarCube 宏命令
        支持 (if:), (set:), (goto:) 等
        """
        passages = {}
        for p in parser.passages:
            parsed = self._parse_macros(p.text)
            passages[p.name] = {
                "id": p.pid,
                "text": parsed["display_text"],
                "tags": p.tags,
                "conditions": parsed["conditions"],
                "variable_ops": parsed["set_ops"],
                "links": parsed["links"],
                "position": p.position
            }
        
        return {
            "source": "twine-sugarcube",
            "story_name": parser.story_name,
            "format": "custom-v1",
            "entry_point": parser.passages[0].name if parser.passages else "",
            "passages": passages
        }
    
    def _parse_macros(self, text: str) -> dict:
        """解析 SugarCube 宏"""
        result = {
            "display_text": text,
            "conditions": [],
            "set_ops": [],
            "links": []
        }
        
        # 解析 (set: $var to value)
        set_pattern = r'\(set:\s*\$(\w+)\s+to\s+([^)]+)\)'
        for match in re.finditer(set_pattern, text):
            result["set_ops"].append({
                "variable": match.group(1),
                "value": self._parse_value(match.group(2).strip())
            })
        
        # 解析 (if: $var > value)[内容]
        if_pattern = r'\(if:\s*([^)]+)\)\[(.*?)\]'
        for match in re.finditer(if_pattern, text, re.DOTALL):
            result["conditions"].append({
                "expression": match.group(1).strip(),
                "content": match.group(2).strip()
            })
        
        # 重新提取纯文本（去除宏）
        clean_text = re.sub(r'\([^)]+\)', '', text)
        clean_text = re.sub(r'\[.*?\]', '', clean_text, flags=re.DOTALL)
        result["display_text"] = clean_text.strip()
        
        # 提取链接
        link_pattern = r'\[\[(.*?)\]\]'
        for match in re.finditer(link_pattern, text):
            link_text = match.group(1)
            if '->' in link_text:
                target = link_text.split('->')[-1].strip()
            elif '|' in link_text:
                target = link_text.split('|')[0].strip()
            else:
                target = link_text.strip()
            result["links"].append(target)
        
        return result
    
    def _parse_value(self, val_str: str):
        """解析字符串值为 Python 类型"""
        val_str = val_str.strip().strip('"').strip("'")
        if val_str.lower() == "true":
            return True
        if val_str.lower() == "false":
            return False
        try:
            if "." in val_str:
                return float(val_str)
            return int(val_str)
        except ValueError:
            return val_str


# ===== 使用示例 =====
if __name__ == "__main__":
    # 模拟 Twine 导出的 HTML 内容
    sample_html = """
    <tw-storydata name="Demo Adventure" startnode="1">
        <tw-passagedata pid="1" name="Start" tags="intro" position="100,100">
            你站在一个分岔路口。
            [[向左走->Forest]]
            [[向右走->Village]]
        </tw-passagedata>
        <tw-passagedata pid="2" name="Forest" tags="danger" position="50,250">
            森林里很暗，你听到了奇怪的声音。
            (set: $fear to $fear + 1)
            [[继续深入->DeepForest]]
            [[返回->Start]]
        </tw-passagedata>
        <tw-passagedata pid="3" name="Village" tags="safe" position="150,250">
            村民们热情地欢迎了你。
            (if: $visited_village)[欢迎回来！]
            (set: $visited_village to true)
            [[离开->Start]]
        </tw-passagedata>
    </tw-storydata>
    """
    
    parser = TwineHtmlParser()
    parser.feed(sample_html)
    
    print(f"故事名: {parser.story_name}")
    print(f"段落数: {len(parser.passages)}")
    
    for p in parser.passages:
        print(f"\n--- {p.name} [{p.pid}] ---")
        print(f"标签: {p.tags}")
        print(f"链接: {p.links}")
        print(f"文本:\n{p.text[:200]}...")
    
    # 转换为自定义格式
    converter = TwineToCustomConverter()
    custom_format = converter.convert_with_macros(parser)
    print("\n\n转换后的 JSON:")
    print(json.dumps(custom_format, ensure_ascii=False, indent=2))
```

---

## 6. 综合示例：小型叙事系统完整实现

以下是一个可运行的最小完整示例，整合了上述多个概念。

```python
# mini_narrative_system.py
# 最小可运行叙事系统：整合 Etudes + 对话树 + 分支 + 变量

from typing import Dict, List, Optional, Callable, Any
from dataclasses import dataclass, field
from enum import Enum
import json

# ===== 核心枚举 =====
class NodeState(Enum):
    INACTIVE = 0
    ACTIVE = 1
    COMPLETED = 2

class Priority(Enum):
    LOW = 1
    NORMAL = 2
    HIGH = 3
    CRITICAL = 4

# ===== 数据模型 =====
@dataclass
class NarrativeNode:
    """叙事节点（简化版 Etude）"""
    id: str
    name: str
    priority: Priority = Priority.NORMAL
    state: NodeState = NodeState.INACTIVE
    required_flags: Dict[str, Any] = field(default_factory=dict)
    set_flags_on_enter: Dict[str, Any] = field(default_factory=dict)
    children: List[str] = field(default_factory=list)
    dialogue_entry: Optional[str] = None
    conflicts: List[str] = field(default_factory=list)

@dataclass
class DialogueEntry:
    """对话条目"""
    id: str
    speaker: str
    text: str
    choices: List['DialogueChoice'] = field(default_factory=list)
    auto_jump: Optional[str] = None

@dataclass
class DialogueChoice:
    """玩家选择"""
    text: str
    target_dialogue: Optional[str] = None
    target_node: Optional[str] = None  # 选择后跳转到叙事节点
    set_flags: Dict[str, Any] = field(default_factory=dict)

# ===== 核心系统 =====
class MiniNarrativeSystem:
    """
    最小叙事系统
    整合：Etudes式状态管理 + 对话树 + 变量系统
    """
    
    def __init__(self):
        self.flags: Dict[str, Any] = {}
        self.nodes: Dict[str, NarrativeNode] = {}
        self.dialogues: Dict[str, DialogueEntry] = {}
        self.current_node: Optional[NarrativeNode] = None
        self.current_dialogue: Optional[DialogueEntry] = None
        self.choice_history: List[str] = []
        self.event_log: List[str] = []
    
    def register_node(self, node: NarrativeNode):
        self.nodes[node.id] = node
    
    def register_dialogue(self, dialogue: DialogueEntry):
        self.dialogues[dialogue.id] = dialogue
    
    def set_flag(self, key: str, value: Any):
        old = self.flags.get(key)
        self.flags[key] = value
        self.event_log.append(f"[Flag] {key}: {old} -> {value}")
    
    def get_flag(self, key: str, default=None):
        return self.flags.get(key, default)
    
    def evaluate_nodes(self):
        """评估所有节点，激活满足条件的"""
        candidates = []
        for node in self.nodes.values():
            if node.state == NodeState.COMPLETED:
                continue
            if self._check_conditions(node.required_flags):
                candidates.append(node)
        
        # 按优先级排序
        candidates.sort(key=lambda n: n.priority.value, reverse=True)
        
        # 激活最高优先级且不冲突的
        activated = []
        for node in candidates:
            if any(conflict in activated for conflict in node.conflicts):
                continue
            activated.append(node.id)
            if node.state == NodeState.INACTIVE:
                self._activate_node(node)
    
    def _check_conditions(self, conditions: Dict[str, Any]) -> bool:
        for key, expected in conditions.items():
            if self.flags.get(key) != expected:
                return False
        return True
    
    def _activate_node(self, node: NarrativeNode):
        node.state = NodeState.ACTIVE
        self.event_log.append(f"[Node] 激活: {node.name} ({node.id})")
        
        # 设置进入标志
        for k, v in node.set_flags_on_enter.items():
            self.set_flag(k, v)
        
        # 如果有关联对话，自动进入
        if node.dialogue_entry and node.dialogue_entry in self.dialogues:
            self.current_node = node
            self.start_dialogue(node.dialogue_entry)
    
    def start_dialogue(self, dialogue_id: str):
        if dialogue_id not in self.dialogues:
            return
        self.current_dialogue = self.dialogues[dialogue_id]
        self._render_dialogue()
    
    def _render_dialogue(self):
        if not self.current_dialogue:
            return
        d = self.current_dialogue
        print(f"\n{'='*40}")
        print(f"[{d.speaker}]")
        print(f"{d.text}")
        print(f"{'='*40}")
        
        if d.auto_jump:
            print(f"(自动跳转至: {d.auto_jump})")
            self._jump_to(d.auto_jump)
            return
        
        if d.choices:
            for i, choice in enumerate(d.choices, 1):
                print(f"  {i}. {choice.text}")
    
    def select_choice(self, index: int):
        """玩家选择选项（0-based index）"""
        if not self.current_dialogue:
            return
        
        choices = self.current_dialogue.choices
        if index < 0 or index >= len(choices):
            return
        
        choice = choices[index]
        self.choice_history.append(choice.text)
        self.event_log.append(f"[Choice] 选择: {choice.text}")
        
        # 应用选择效果
        for k, v in choice.set_flags.items():
            self.set_flag(k, v)
        
        # 跳转
        if choice.target_dialogue:
            self._jump_to(choice.target_dialogue)
        elif choice.target_node:
            self.current_dialogue = None
            self._activate_node(self.nodes[choice.target_node])
        else:
            self.current_dialogue = None
            # 对话结束，重新评估节点
            self.evaluate_nodes()
    
    def _jump_to(self, target: str):
        if target in self.dialogues:
            self.start_dialogue(target)
        elif target in self.nodes:
            self.current_dialogue = None
            self._activate_node(self.nodes[target])
    
    def complete_current_node(self):
        """完成当前节点"""
        if self.current_node:
            self.current_node.state = NodeState.COMPLETED
            self.event_log.append(f"[Node] 完成: {self.current_node.name}")
            self.current_node = None
            self.evaluate_nodes()
    
    def save(self) -> str:
        """导出为 JSON 存档"""
        data = {
            "flags": self.flags,
            "node_states": {nid: n.state.value for nid, n in self.nodes.items()},
            "choice_history": self.choice_history,
            "event_log": self.event_log
        }
        return json.dumps(data, ensure_ascii=False, indent=2)


# ===== 使用示例：完整流程 =====
def demo_full_system():
    sys = MiniNarrativeSystem()
    
    # 注册叙事节点
    sys.register_node(NarrativeNode(
        id="intro",
        name="开场",
        priority=Priority.CRITICAL,
        dialogue_entry="dlg_intro"
    ))
    
    sys.register_node(NarrativeNode(
        id="village_quest",
        name="村庄任务",
        priority=Priority.NORMAL,
        required_flags={"intro_completed": True},
        dialogue_entry="dlg_village"
    ))
    
    sys.register_node(NarrativeNode(
        id="forest_quest",
        name="森林任务",
        priority=Priority.NORMAL,
        required_flags={"intro_completed": True},
        dialogue_entry="dlg_forest",
        conflicts=["village_quest"]  # 与村庄任务互斥
    ))
    
    # 注册对话
    sys.register_dialogue(DialogueEntry(
        id="dlg_intro",
        speaker="旁白",
        text="你醒来在一个陌生的房间里。门开着，外面似乎有声音。",
        choices=[
            DialogueChoice(
                text="走出去看看",
                target_dialogue="dlg_outside",
                set_flags={"intro_completed": True}
            ),
            DialogueChoice(
                text="先在房间里搜索",
                target_dialogue="dlg_search_room"
            )
        ]
    ))
    
    sys.register_dialogue(DialogueEntry(
        id="dlg_search_room",
        speaker="旁白",
        text="你发现了一把生锈的钥匙，但没有其他有价值的东西。",
        choices=[
            DialogueChoice(
                text="走出去",
                target_dialogue="dlg_outside",
                set_flags={"intro_completed": True, "has_key": True}
            )
        ]
    ))
    
    sys.register_dialogue(DialogueEntry(
        id="dlg_outside",
        speaker="旁白",
        text="你来到外面。左边是村庄，右边是森林。",
        choices=[
            DialogueChoice(
                text="去村庄",
                target_node="village_quest"
            ),
            DialogueChoice(
                text="去森林",
                target_node="forest_quest"
            )
        ]
    ))
    
    sys.register_dialogue(DialogueEntry(
        id="dlg_village",
        speaker="村长",
        text="欢迎，旅行者！我们正被狼群困扰，你能帮忙吗？",
        choices=[
            DialogueChoice(
                text="接受任务",
                set_flags={"quest_wolves": "accepted"}
            ),
            DialogueChoice(
                text="拒绝",
                set_flags={"quest_wolves": "refused"}
            )
        ]
    ))
    
    sys.register_dialogue(DialogueEntry(
        id="dlg_forest",
        speaker="神秘声音",
        text="森林深处传来低语...你确定要继续吗？",
        choices=[
            DialogueChoice(
                text="深入探索",
                set_flags={"forest_explored": True}
            ),
            DialogueChoice(
                text="退回去",
                target_dialogue="dlg_outside"
            )
        ]
    ))
    
    # 启动系统
    print("=" * 50)
    print("启动叙事系统演示")
    print("=" * 50)
    sys.evaluate_nodes()
    
    # 模拟玩家交互
    # 在实际游戏中，这些来自UI输入
    sys.select_choice(1)  # 先搜索房间
    sys.select_choice(0)  # 走出去
    sys.select_choice(0)  # 去村庄
    sys.select_choice(0)  # 接受任务
    
    print("\n" + "=" * 50)
    print("事件日志:")
    print("=" * 50)
    for log in sys.event_log:
        print(log)
    
    print("\n" + "=" * 50)
    print("存档数据:")
    print("=" * 50)
    print(sys.save())


if __name__ == "__main__":
    demo_full_system()
```

---

## 总结

本文档覆盖了游戏叙事架构的五个核心领域：

| 模块 | 关键技术 | 适用规模 |
|------|----------|----------|
| Etudes 系统 | 层级化状态机、优先级排序、冲突检测 | 大型RPG |
| 对话系统 | 节点树、条件判断、变量绑定 | 通用 |
| 变量管理 | 全局Flag、命名空间、持久化 | 通用 |
| 分支剧情 | 状态机、延迟反馈、多结局 | 叙事驱动游戏 |
| 工具集成 | articy、ink、Yarn、Twine | 通用 |

**选型建议：**

- **小型项目/原型**：直接用 JSON + 简单状态机，或集成 Twine
- **中型项目**：使用 ink 或 Yarn Spinner，自研轻量状态机
- **大型项目**：参考 Etudes 架构，自研层级化状态管理，或集成 articy:draft X

---

## 参考来源

- Owlcat Games: GDC 2026 — Managing 30,000+ Narrative Variables
- Inkle Studios: ink 脚本语言官方文档 (https://github.com/inkle/ink)
- Yarn Spinner: 官方文档 (https://docs.yarnspinner.dev/)
- articy:draft X: 官方开发者文档
- Twine: Harlowe / SugarCube 格式规范
