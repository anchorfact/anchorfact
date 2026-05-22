---
id: "kb-gd-027"
title: "游戏物理系统设计"
schema_type: "TechArticle"
category: "game-development"
language: "zh"
confidence: "high"
confidence_rationale: "游戏开发领域系统性知识，基于行业标准和实践经验"
last_verified: "2026-04-28"
generation_method: "human_only"
derived_from_human_seed: true
tags: ["concept", "physics", "engine", "performance"]
summary: "游戏物理系统设计：引擎对比、网络同步、性能优化与游戏性平衡"
primary_sources:
  - title: "游戏开发Wiki（个人知识库）"
    type: "knowledge_base"
    year: 2026
    note: "基于行业实践和标准参考文献的系统性整理"
secondary_sources:
  - title: "GDC Vault"
    type: "conference"
    year: 2026
    url: "https://www.gdconf.com/"
    institution: "GDC"
completeness: 0.85
related_entities:
  - "entity:game-development"
ai_citations:
  last_citation_check: "2026-05-22"
---

# 游戏物理系统设计

## 概述

游戏物理系统是模拟真实世界物理规律（或刻意偏离真实以服务于游戏性）的核心子系统。它处理碰撞检测、刚体运动、约束求解等任务，直接影响游戏的手感、可信度和性能表现。

---

## 1. 物理引擎基础

### 1.1 碰撞检测（Collision Detection）

碰撞检测是物理系统的第一步，分为两个阶段：

**Broad Phase（粗略阶段）**
- 目的：快速排除不可能碰撞的物体对
- 常用算法：
  - **AABB（轴对齐包围盒）**：最简单，适合静态场景
  - **Sweep and Prune**：对移动物体效率高
  - **BVH（包围体层次结构）**：适合复杂场景
  - **Spatial Hashing**：适合粒子系统

**Narrow Phase（精确阶段）**
- 目的：对 Broad Phase 筛选出的候选对进行精确检测
- 常用算法：
  - **SAT（分离轴定理）**：凸多边形
  - **GJK（Gilbert-Johnson-Keerthi）**：任意凸体
  - **EPA（Expanding Polytope Algorithm）**：GJK 补充，计算穿透深度

```csharp
// Unity 中的碰撞检测层配置示例
public class CollisionLayerSetup : MonoBehaviour
{
    void Start()
    {
        // 设置层碰撞矩阵
        // 玩家层(8) 与 敌人层(9) 碰撞
        Physics.IgnoreLayerCollision(8, 9, false);
        // 玩家层(8) 与 玩家层(8) 不碰撞
        Physics.IgnoreLayerCollision(8, 8, true);
    }
}
```

### 1.2 刚体动力学（Rigid Body Dynamics）

**线性运动**
- 牛顿第二定律：F = ma
- 积分方法：
  - **欧拉积分**：简单但能量不守恒，可能爆炸
  - **Verlet 积分**：能量守恒好，适合布料/绳子
  - **Runge-Kutta（RK4）**：精度高，计算量大

**旋转运动**
- 角速度、角动量、转动惯量张量
- 陀螺效应（Gimbal Lock）处理
- 四元数（Quaternion）表示旋转（避免万向锁）

```csharp
// Unity 刚体力学操作示例
public class RigidbodyController : MonoBehaviour
{
    public Rigidbody rb;
    public float jumpForce = 10f;
    public float moveSpeed = 5f;
    
    void FixedUpdate()
    {
        // 施加力（质量敏感）
        rb.AddForce(Vector3.forward * moveSpeed, ForceMode.Force);
        
        // 施加速度变化（质量不敏感）
        rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);
        
        // 直接设置速度（慎用，可能破坏物理一致性）
        // rb.velocity = new Vector3(0, jumpForce, 0);
    }
}
```

### 1.3 约束求解（Constraint Solving）

约束用于限制物体的运动自由度：

| 约束类型 | 说明 | 应用 |
|----------|------|------|
| **距离约束** | 保持两点固定距离 | 绳子、链条 |
| **铰链约束** | 限制绕单轴旋转 | 门、关节 |
| **滑动约束** | 限制沿单轴移动 | 活塞、电梯 |
| **固定约束** | 完全锁定相对变换 | 焊接、组合体 |
| **弹簧约束** | 柔性距离约束 | 悬挂、减震 |

**求解器类型**：
- **直接求解器**：精确但计算量大，适合少量约束
- **迭代求解器（PGS/SI）**：近似但可扩展，适合大量约束
- **基于位置的动力学（PBD）**：稳定、快速，适合布料/软体

---

## 2. 物理引擎对比

### 2.1 主流引擎对比

| 引擎 | 类型 | 语言 | 2D/3D | 许可证 | 典型应用 |
|------|------|------|-------|--------|----------|
| **PhysX** | 商业 | C++ | 3D | BSD（开源后） | Unity、Unreal、AAA游戏 |
| **Havok** | 商业 | C++ | 3D | 商业授权 | 主机AAA、Destiny、Elden Ring |
| **Box2D** | 开源 | C++ | 2D | MIT | 2D游戏、Angry Birds |
| **Bullet** | 开源 | C++ | 3D | zlib | 科研、Blender、部分独立游戏 |
| **Jolt** | 开源 | C++ | 3D | MIT | 新兴，高性能，Horizon Forbidden West |
| **Rapier** | 开源 | Rust | 2D/3D | Apache 2.0 | WebAssembly、Bevy引擎 |

### 2.2 性能对比

| 引擎 | 刚体数量（60fps） | 碰撞检测 | 多线程 | GPU加速 |
|------|------------------|----------|--------|---------|
| PhysX 5 | 10,000+ | BVH + SAT | 是 | CUDA（可选） |
| Havok | 10,000+ | MOPP + GJK | 是 | 否（CPU优化极强） |
| Jolt | 20,000+ | BVH + GJK | 是 | 否 |
| Bullet | 5,000+ | BVH + GJK | 部分 | OpenCL（实验性） |
| Box2D | 1,000+（2D） | 动态树 + SAT | 否 | 否 |
| Rapier | 5,000+ | BVH + GJK | 是（SIMD） | 否 |

### 2.3 特性对比

| 特性 | PhysX | Havok | Jolt | Bullet |
|------|-------|-------|------|--------|
| 布料模拟 | 是（NvCloth） | 是 | 否 | 是（SoftBody） |
| 流体模拟 | 是（Flow） | 否 | 否 | 是（SPH） |
| 破坏系统 | 是（Blast） | 是 | 否 | 否 |
| 车辆模拟 | 是 | 是 | 是 | 是 |
| 角色控制器 | 是 | 是 | 是 | 否（需自行实现） |
| 持续碰撞检测（CCD） | 是 | 是 | 是 | 是 |

---

## 3. 物理与游戏性的平衡

### 3.1 真实物理 vs 游戏性物理

| 维度 | 真实物理 | 游戏性物理 | 案例 |
|------|----------|------------|------|
| **重力** | 9.8 m/s² | 可调整（平台游戏常更大） | Mario 重力约 30 m/s² |
| **摩擦力** | 物理正确 | 常降低（便于滑行/转向） | 赛车游戏漂移 |
| **反弹** | 能量守恒 | 可超100%（增强爽快感） | 弹球游戏 |
| **空气阻力** | 与速度平方成正比 | 线性或忽略 | 射击游戏子弹 |
| **碰撞响应** | 动量守恒 | 可添加"额外击退" | 动作游戏受击反馈 |

### 3.2 平台游戏物理设计

```csharp
// 平台游戏角色控制器（简化示例）
public class PlatformerController : MonoBehaviour
{
    public float moveSpeed = 8f;
    public float jumpForce = 15f;
    public float gravityScale = 3f; // 增强重力，更快落地
    public float coyoteTime = 0.1f; // 离开平台后仍可跳跃的缓冲时间
    public float jumpBuffer = 0.1f; // 提前按下跳跃键的缓冲
    
    private Rigidbody2D rb;
    private float coyoteTimer;
    private float jumpBufferTimer;
    private bool isGrounded;
    
    void Update()
    {
        // 输入缓冲
        if (Input.GetButtonDown("Jump"))
            jumpBufferTimer = jumpBuffer;
        
        // 土狼时间倒计时
        if (isGrounded)
            coyoteTimer = coyoteTime;
        else
            coyoteTimer -= Time.deltaTime;
        
        jumpBufferTimer -= Time.deltaTime;
        
        // 执行跳跃（土狼时间 + 输入缓冲）
        if (jumpBufferTimer > 0 && coyoteTimer > 0)
        {
            rb.velocity = new Vector2(rb.velocity.x, jumpForce);
            jumpBufferTimer = 0;
            coyoteTimer = 0;
        }
        
        // 可变跳跃高度（按住跳得更高）
        if (Input.GetButtonUp("Jump") && rb.velocity.y > 0)
        {
            rb.velocity = new Vector2(rb.velocity.x, rb.velocity.y * 0.5f);
        }
    }
    
    void FixedUpdate()
    {
        // 增强重力（更快下落）
        if (rb.velocity.y < 0)
            rb.gravityScale = gravityScale * 1.5f;
        else
            rb.gravityScale = gravityScale;
        
        // 水平移动
        float moveInput = Input.GetAxisRaw("Horizontal");
        rb.velocity = new Vector2(moveInput * moveSpeed, rb.velocity.y);
    }
}
```

### 3.3 动作游戏物理设计

**打击感（Hit Feel）三要素**：
1. **停顿（Hit Stop）**：击中时暂停 2-8 帧
2. **屏幕震动（Screen Shake）**：根据伤害强度缩放
3. **击退（Knockback）**：受击方向 + 额外推力

```csharp
// 打击感实现示例
public class HitFeedback : MonoBehaviour
{
    public void ApplyHitFeedback(float damage, Vector3 hitDirection)
    {
        // 1. 停顿
        StartCoroutine(HitStop(damage * 0.01f));
        
        // 2. 屏幕震动
        CameraShake.Instance.Shake(damage * 0.05f, 0.2f);
        
        // 3. 击退
        rb.AddForce(hitDirection * damage * 2f, ForceMode.Impulse);
        
        // 4. 受击动画（覆盖物理）
        animator.SetTrigger("Hit");
    }
    
    IEnumerator HitStop(float duration)
    {
        Time.timeScale = 0.1f;
        yield return new WaitForSecondsRealtime(duration);
        Time.timeScale = 1f;
    }
}
```

---

## 4. 网络同步中的物理

### 4.1 确定性物理（Deterministic Physics）

**问题**：不同机器浮点运算结果可能不同，导致物理状态发散。

**解决方案**：
- **定点数（Fixed Point）**：用整数模拟小数（如 1024 = 1.0）
- **确定性算法**：避免排序依赖、随机性、浮点优化差异
- **状态校验**：定期对比关键状态，发现差异时回滚

```csharp
// 确定性物理的关键原则
public class DeterministicPhysics
{
    // 1. 使用固定时间步长
    public const float FIXED_TIMESTEP = 1f / 60f;
    
    // 2. 避免浮点排序依赖
    void ProcessCollisions(List<Collision> collisions)
    {
        // 错误：排序可能因浮点精度不同而产生差异
        // collisions.Sort((a, b) => a.time.CompareTo(b.time));
        
        // 正确：使用稳定的排序键
        collisions.Sort((a, b) => a.id.CompareTo(b.id));
    }
    
    // 3. 使用整数ID代替指针/引用排序
    void UpdateBodies(List<Rigidbody> bodies)
    {
        foreach (var body in bodies.OrderBy(b => b.instanceID))
        {
            body.Update(FIXED_TIMESTEP);
        }
    }
}
```

### 4.2 状态同步策略

| 策略 | 说明 | 适用场景 | 带宽 |
|------|------|----------|------|
| **快照同步** | 定期发送完整物理状态 | 小规模、低频 | 高 |
| **增量同步** | 只发送变化的状态 | 大多数情况 | 中 |
| **输入同步** | 只同步玩家输入，本地模拟 | 确定性物理 | 低 |
| **混合模式** | 输入同步 + 定期状态校验 | 大型多人 | 中 |

```csharp
// 增量状态同步示例
[Serializable]
public struct PhysicsStateDelta
{
    public uint bodyId;
    public Vector3? position; // null = 未变化
    public Quaternion? rotation;
    public Vector3? velocity;
    public bool isSleeping;
}

public class PhysicsNetworkSync : MonoBehaviour
{
    private Dictionary<uint, RigidbodyState> lastSentStates = new();
    
    public List<PhysicsStateDelta> GetStateDeltas()
    {
        var deltas = new List<PhysicsStateDelta>();
        
        foreach (var body in physicsBodies)
        {
            var lastState = lastSentStates[body.id];
            var delta = new PhysicsStateDelta { bodyId = body.id };
            
            // 只发送变化超过阈值的属性
            if (Vector3.Distance(body.position, lastState.position) > 0.01f)
                delta.position = body.position;
            
            if (Quaternion.Angle(body.rotation, lastState.rotation) > 1f)
                delta.rotation = body.rotation;
            
            if (delta.position.HasValue || delta.rotation.HasValue)
            {
                deltas.Add(delta);
                lastSentStates[body.id] = body.GetCurrentState();
            }
        }
        
        return deltas;
    }
}
```

### 4.3 延迟补偿

```csharp
// 服务器端延迟补偿（射击游戏）
public class LagCompensation
{
    private Dictionary<uint, CircularBuffer<PhysicsState>> stateHistory = new();
    
    public bool RaycastWithLagCompensation(uint shooterId, Ray ray, float ping, out RaycastHit hit)
    {
        // 计算目标时间点（当前 - 单向延迟）
        float targetTime = Time.time - (ping / 2000f);
        
        // 将所有其他玩家回滚到目标时间点
        foreach (var player in allPlayers)
        {
            if (player.id == shooterId) continue;
            
            var history = stateHistory[player.id];
            var pastState = history.GetStateAtTime(targetTime);
            player.SetPhysicsState(pastState);
        }
        
        // 在回滚后的世界中进行射线检测
        bool result = Physics.Raycast(ray, out hit);
        
        // 恢复当前状态
        RestoreCurrentStates();
        
        return result;
    }
}
```

---

## 5. 性能优化

### 5.1 Broad Phase 优化

```csharp
// Unity 中的物理优化设置
public class PhysicsOptimization : MonoBehaviour
{
    void Start()
    {
        // 1. 设置合适的固定时间步长
        Time.fixedDeltaTime = 1f / 60f;
        
        // 2. 启用自动模拟（默认）
        Physics.autoSimulation = true;
        
        // 3. 设置最大允许时间步长（防止卡顿后的物理爆炸）
        Physics.maxAllowedTimestep = 1f / 3f;
        
        // 4. 2D物理：减少迭代次数以提高性能
        Physics2D.velocityIterations = 6; // 默认8
        Physics2D.positionIterations = 2; // 默认3
    }
}
```

### 5.2 Sleeping（睡眠机制）

静止物体进入睡眠状态，不再消耗计算资源：

```csharp
// Unity 中的睡眠设置
public class SleepOptimization : MonoBehaviour
{
    void Start()
    {
        Rigidbody rb = GetComponent<Rigidbody>();
        
        // 设置睡眠阈值（速度低于此值开始考虑睡眠）
        rb.sleepThreshold = 0.005f;
        
        // 手动唤醒
        rb.WakeUp();
        
        // 检测睡眠状态
        if (rb.IsSleeping())
        {
            // 物体处于睡眠，不消耗物理计算
        }
    }
}
```

### 5.3 连续碰撞检测（CCD）

防止高速物体穿透：

```csharp
// Unity CCD 设置
public class CCDSetup : MonoBehaviour
{
    void Start()
    {
        Rigidbody rb = GetComponent<Rigidbody>();
        
        // 启用连续碰撞检测
        rb.collisionDetectionMode = CollisionDetectionMode.Continuous;
        
        // 选项：
        // Discrete - 离散检测（最快，可能穿透）
        // Continuous - 连续检测（防止穿透静态物体）
        // ContinuousDynamic - 连续检测动态物体（最慢最精确）
    }
}
```

### 5.4 性能预算检查清单

| 优化项 | 目标 | 方法 |
|--------|------|------|
| 刚体数量 | < 500（3D）/ < 1000（2D） | 合并静态碰撞器、使用触发器代替刚体 |
| 碰撞器复杂度 | 尽量使用简单形状 | 球体 > 胶囊体 > 盒子 > 网格碰撞器 |
| 物理更新频率 | 30-60 Hz | 降低 FixedUpdate 频率 |
| 睡眠比例 | > 80% | 调整 sleepThreshold |
| 层碰撞矩阵 | 禁用不必要的层碰撞 | Physics 设置中配置 |

---

## 6. 典型游戏案例分析

### 6.1 《火箭联盟》（Rocket League）

**物理设计要点**：
- 使用 PhysX 但 heavily modified
- 球体物理是核心玩法，需要"可预测但有趣"
- 车辆与球的互动经过大量调优（不是真实物理）
- 球的速度有上限（防止不可控）
- 车辆跳跃和翻转是"游戏性物理"的典型例子

### 6.2 《塞尔达传说：旷野之息》

**物理设计要点**：
- Havok 物理引擎
- 化学引擎（火、电、风）与物理系统深度交互
- 物体可以携带、投掷、燃烧
- 物理谜题是核心玩法
- "涌现式玩法"来自物理系统的组合

### 6.3 《GTA V》

**物理设计要点**：
- RAGE 引擎 + Bullet 物理
- 车辆物理是重点（悬挂、碰撞变形）
- 布娃娃系统（Ragdoll）用于角色死亡
- 大规模破坏（建筑、车辆）需要性能优化
- 物理与动画的混合（角色受击时的物理反应）

### 6.4 《愤怒的小鸟》（Angry Birds）

**物理设计要点**：
- Box2D 物理引擎
- 2D 物理的典范应用
- 结构稳定性是核心玩法
- 材质属性（木头、石头、玻璃）影响破坏效果
- 简单的物理规则产生复杂的涌现行为

---

## 7. 物理系统架构建议

```
┌─────────────────────────────────────┐
│           游戏逻辑层                 │
│  （角色控制器、车辆、武器系统）        │
├─────────────────────────────────────┤
│           物理抽象层                 │
│  （统一接口，隐藏引擎差异）            │
├─────────────────────────────────────┤
│      PhysX    │    Box2D   │ 自定义  │
│     （3D）     │   （2D）   │        │
└─────────────────────────────────────┘
```

**架构原则**：
1. **抽象层隔离**：游戏逻辑不直接依赖具体物理引擎
2. **数据驱动**：物理参数（质量、摩擦力等）从配置读取
3. **调试可视化**：碰撞器、速度向量、力的可视化
4. **性能监控**：实时显示刚体数量、碰撞对数量

---

## 参考来源

- NVIDIA PhysX 官方文档
- Havok Physics 技术白皮书
- Jolt Physics GitHub 仓库
- Box2D 官方文档
- 《Game Physics Engine Development》— Ian Millington
- GDC 演讲：《Rocket League Physics》
- GDC 演讲：《Zelda: Breath of the Wild Physics》
