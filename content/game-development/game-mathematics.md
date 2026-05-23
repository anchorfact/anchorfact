---
id: kb-gd-017
title: 游戏数学
schema_type: TechArticle
category: game-development
language: zh
confidence: high
confidence_rationale: 游戏开发领域系统性知识，基于行业标准和实践经验
last_verified: "2026-04-28"
generation_method: human_only
derived_from_human_seed: true
tags:
  - math
  - probability
  - random
  - vectors
  - interpolation
  - algorithms
  - game-dev
summary: ""
primary_sources:
  - title: 游戏开发Wiki（个人知识库）
    type: knowledge_base
    year: 2026
    note: 基于行业实践和标准参考文献的系统性整理
secondary_sources:
  - title: GDC Vault
    type: conference
    year: 2026
    url: https://www.gdconf.com/
    institution: GDC
  - title: Game Engine Architecture (Jason Gregory, 3rd Ed)
    type: textbook
    year: 2018
    url: https://www.gameenginebook.com/
    institution: CRC Press
completeness: 0.85
known_gaps:
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
    context: See primary sources for competing interpretations
related_entities:
  - entity:game-development
ai_citations: null
---


# 游戏数学

> **游戏开发中 90% 的"感觉不对"问题，根源是数学没调好。** 随机太假、移动太僵、碰撞不准、概率失衡——都是数学。

---

## 目录

1. [随机数与概率](#随机数与概率)
2. [向量与几何](#向量与几何)
3. [插值与缓动](#插值与缓动)
4. [空间算法](#空间算法)
5. [噪声函数](#噪声函数)
6. [游戏平衡数学](#游戏平衡数学)
7. [常用数学模式](#常用数学模式)

---

## 随机数与概率

### 伪随机数生成器（PRNG）

| 算法 | 周期 | 速度 | 质量 | 适用场景 |
|------|------|------|------|----------|
| **System.Random** | 2^31 | 快 | 低 | 非关键随机（如粒子偏移） |
| **xorshift** | 2^128 | 极快 | 中 | 高频调用（如每帧噪声） |
| **PCG** | 2^64 | 快 | 高 | 通用游戏随机，推荐 |
| **Mersenne Twister** | 2^19937 | 中 | 极高 | 需要统计级质量的场景 |

**种子（Seed）的重要性**：
```
使用确定性的种子可以让随机序列可复现：
- 程序化生成：相同种子 = 相同世界
- 调试：可以复现玩家报告的 bug
- 回放系统：记录种子而非所有随机结果
```

### 游戏常用概率分布

```
1. 均匀分布（Uniform）
   └── random(min, max)
   └── 适用：骰子、随机方向

2. 加权随机（Weighted Random）
   └── 按权重概率选择
   └── 适用：掉落表、稀有度

3. 正态分布（Normal/Gaussian）
   └── 中心值附近概率高
   └── 适用：属性生成、伤害浮动

4. 泊松分布（Poisson）
   └── 单位时间内事件发生次数
   └── 适用：敌人刷新、事件触发

5. 幂律分布（Power Law）
   └── 少数高值，多数低值
   └── 适用：经济系统、玩家财富分布
```

### 加权随机实现

```python
# 加权随机选择
def weighted_random(items, weights):
    total = sum(weights)
    r = random() * total
    cumulative = 0
    for item, weight in zip(items, weights):
        cumulative += weight
        if r <= cumulative:
            return item

# 掉落表示例
loot_table = {
    'common_sword': 50,    # 50% 权重
    'rare_axe': 30,        # 30% 权重
    'epic_staff': 15,      # 15% 权重
    'legendary_ring': 5,   # 5% 权重
}

# 验证：1000次抽取结果应接近理论分布
```

### 感知随机性

| 问题 | 现象 | 解决方案 |
|------|------|----------|
| **伪随机感** | 连续出同样结果 | 洗牌算法（Deck Shuffling） |
| **连败挫败** | 10次未命中 | 保底机制（Pity System） |
| **伪随机分布** | 结果太均匀 | 真正随机反而感觉不随机 |
| **预测性** | 玩家发现规律 | 多源随机混合 |

**保底机制（Pity System）**：
```python
# 抽卡保底实现
def draw_with_pity(pity_counter, base_rate=0.01, pity_threshold=90):
    """
    基础概率 1%，90抽保底
    随着抽数增加，概率线性提升
    """
    if pity_counter >= pity_threshold:
        return True, 0  # 强制命中，重置计数
    
    # 动态概率：越接近保底，概率越高
    dynamic_rate = base_rate + (pity_counter / pity_threshold) * 0.5
    
    if random() < dynamic_rate:
        return True, 0  # 命中，重置
    else:
        return False, pity_counter + 1  # 未命中，计数+1
```

---

## 向量与几何

### 游戏开发核心向量运算

| 运算 | 公式 | 用途 |
|------|------|------|
| **点积** | a·b = \|a\|\|b\|cosθ | 判断方向（面向/背向）、投影 |
| **叉积** | a×b = \|a\|\|b\|sinθ n | 计算法线、判断左右、面积 |
| **长度** | \|v\| = √(x²+y²+z²) | 距离计算 |
| **归一化** | v̂ = v / \|v\| | 方向向量 |
| **线性插值** | lerp(a,b,t) = a + (b-a)*t | 平滑过渡 |
| **反射** | r = d - 2(d·n)n | 弹道反弹、镜面反射 |

### 常用几何判断

```python
# 点是否在圆内
def point_in_circle(px, py, cx, cy, r):
    return (px-cx)**2 + (py-cy)**2 <= r**2

# 点是否在矩形内
def point_in_rect(px, py, rx, ry, rw, rh):
    return rx <= px <= rx+rw and ry <= py <= ry+rh

# 点到线段的最近距离
def dist_point_to_segment(px, py, x1, y1, x2, y2):
    # 投影参数 t
    dx, dy = x2-x1, y2-y1
    if dx == 0 and dy == 0:
        return sqrt((px-x1)**2 + (py-y1)**2)
    t = max(0, min(1, ((px-x1)*dx + (py-y1)*dy) / (dx*dx + dy*dy)))
    proj_x = x1 + t * dx
    proj_y = y1 + t * dy
    return sqrt((px-proj_x)**2 + (py-proj_y)**2)

# 两个圆是否相交
def circles_intersect(c1x, c1y, r1, c2x, c2y, r2):
    dist_sq = (c1x-c2x)**2 + (c1y-c2y)**2
    return dist_sq <= (r1+r2)**2
```

### 坐标系与变换

```
游戏常用坐标系：

2D 游戏：
├── 屏幕坐标（左上角原点，Y向下）
├── 世界坐标（自定义原点，Y向上/下）
└── 等距坐标（斜向网格）

3D 游戏：
├── 局部坐标（模型自身）
├── 世界坐标（游戏世界）
├── 观察坐标（相机视角）
├── 裁剪坐标（投影后）
└── 屏幕坐标（像素位置）

变换矩阵顺序（重要）：
  最终 = 投影 × 视图 × 模型
  （从右向左应用）
```

---

## 插值与缓动

### 基本插值函数

| 函数 | 公式 | 特点 |
|------|------|------|
| **Linear** | t | 匀速，最基础 |
| **Ease-In** | t² | 慢开始，快结束 |
| **Ease-Out** | 1-(1-t)² | 快开始，慢结束 |
| **Ease-In-Out** | t<0.5 ? 2t² : 1-2(1-t)² | 慢-快-慢 |
| **Smoothstep** | 3t²-2t³ | 更平滑的 ease-in-out |
| **Smootherstep** | 6t⁵-15t⁴+10t³ | 极平滑 |

### 常用缓动曲线

```python
# Unity 风格缓动函数（简化版）
def ease_in_quad(t): return t * t
def ease_out_quad(t): return 1 - (1-t) * (1-t)
def ease_in_out_quad(t):
    return 2*t*t if t < 0.5 else 1 - (-2*t+2)**2 / 2

def ease_in_cubic(t): return t * t * t
def ease_out_bounce(t):
    # 弹跳效果
    if t < 1/2.75:
        return 7.5625*t*t
    elif t < 2/2.75:
        t -= 1.5/2.75
        return 7.5625*t*t + 0.75
    elif t < 2.5/2.75:
        t -= 2.25/2.75
        return 7.5625*t*t + 0.9375
    else:
        t -= 2.625/2.75
        return 7.5625*t*t + 0.984375

def ease_out_elastic(t):
    # 弹性效果
    c4 = (2 * pi) / 3
    if t == 0: return 0
    if t == 1: return 1
    return 2**(-10*t) * sin((t*10-0.75)*c4) + 1
```

### 弹簧/阻尼插值

```python
# 弹簧物理插值（比 ease 更自然）
def spring_lerp(current, target, velocity, stiffness=0.1, damping=0.8, dt=1/60):
    """
    current: 当前值
    target: 目标值
    velocity: 当前速度（需要保存状态）
    stiffness: 刚度（0-1，越大越紧）
    damping: 阻尼（0-1，越小越弹）
    """
    force = (target - current) * stiffness
    velocity = (velocity + force) * damping
    current = current + velocity * dt
    return current, velocity

# 使用示例：相机跟随
# camera_pos, camera_vel = spring_lerp(camera_pos, player_pos, camera_vel)
```

---

## 空间算法

### 四叉树 / 八叉树

```
用途：加速空间查询（碰撞检测、邻居查找）

构建：
1. 根节点覆盖整个游戏世界
2. 每个节点最多包含 N 个对象
3. 超过 N 个时，分裂为 4（2D）或 8（3D）个子节点
4. 对象存储在完全包含它的最小节点中

查询：
- 查找某点/区域附近的对象：只需遍历相关节点
- 复杂度：O(log n) 平均，O(n) 最坏

适用：
- 大量动态对象的碰撞检测
- 大范围邻居查找
- 视锥剔除加速
```

### 网格空间哈希

```python
# 空间哈希（适合均匀分布的对象）
CELL_SIZE = 100

def hash_position(x, y):
    return (int(x // CELL_SIZE), int(y // CELL_SIZE))

def get_nearby_objects(obj_x, obj_y, grid):
    """获取相邻网格中的所有对象"""
    cell_x, cell_y = hash_position(obj_x, obj_y)
    nearby = []
    for dx in [-1, 0, 1]:
        for dy in [-1, 0, 1]:
            key = (cell_x + dx, cell_y + dy)
            if key in grid:
                nearby.extend(grid[key])
    return nearby

# 比四叉树更简单，适合对象均匀分布的场景
```

### 视锥剔除（Frustum Culling）

```python
# 简化版视锥剔除（2D）
def rect_in_frustum(rect, frustum_rect):
    """判断矩形是否在视锥范围内"""
    return not (
        rect.right < frustum_rect.left or
        rect.left > frustum_rect.right or
        rect.bottom < frustum_rect.top or
        rect.top > frustum_rect.bottom
    )

# 3D 视锥：用6个平面定义视锥体
# 判断包围盒（AABB）与6个平面的关系
# 完全在外部 → 剔除
# 相交或完全内部 → 保留
```

---

## 噪声函数

### 常用噪声对比

| 噪声 | 特性 | 适用场景 | 代码复杂度 |
|------|------|----------|-----------|
| **Value Noise** | 块状，简单 | 低要求场景 | 低 |
| **Perlin Noise** | 平滑连续，有方向性 | 地形、云、水 | 中 |
| **Simplex Noise** | Perlin改进，低维度高效 | 3D地形、动画 | 中 |
| **Worley Noise** | 细胞状，边缘清晰 | 石块、裂纹 | 中 |
| **FBM** | 多频段叠加 | 真实自然地形 | 中 |

### FBM（分形布朗运动）

```python
def fbm(x, y, octaves=4, persistence=0.5, lacunarity=2.0):
    """
    分形布朗运动：叠加多层噪声
    - octaves: 层数（细节层次）
    - persistence: 每层振幅衰减
    - lacunarity: 每层频率倍增
    """
    total = 0
    amplitude = 1
    frequency = 1
    max_value = 0
    
    for i in range(octaves):
        total += noise(x * frequency, y * frequency) * amplitude
        max_value += amplitude
        amplitude *= persistence
        frequency *= lacunarity
    
    return total / max_value  # 归一化到 0-1

# 典型参数
terrain = fbm(x, y, octaves=6, persistence=0.5, lacunarity=2.0)
clouds = fbm(x, y, octaves=4, persistence=0.6, lacunarity=2.2)
```

---

## 游戏平衡数学

### 伤害公式对比

| 公式类型 | 公式 | 特点 | 适用 |
|----------|------|------|------|
| **线性** | 伤害 = 攻击 - 防御 | 简单直观 | 简单RPG |
| **乘法** | 伤害 = 攻击 × (1 - 减伤率) | 避免防御过高无敌 | MOBA |
| **除法** | 伤害 = 攻击² / (攻击 + 防御) | 防御收益递减 | RPG |
| **穿透** | 伤害 = max(攻击 - 防御, 攻击×0.1) | 保底伤害 | 动作游戏 |

### 经验曲线设计

```python
# 常见经验曲线公式

def exp_linear(level):
    """线性：每级所需经验相同"""
    return level * 1000

def exp_exponential(level, base=1.5):
    """指数：后期升级极慢"""
    return int(1000 * (base ** level))

def exp_polynomial(level, power=2.5):
    """多项式：平滑递增（推荐）"""
    return int(1000 * (level ** power))

def exp_custom(level):
    """《魔兽世界》风格：每级经验 = 当前等级 × 基础值 × 系数"""
    base = 100
    if level <= 10:
        return level * base
    elif level <= 20:
        return level * base * 1.2
    else:
        return int(level * base * 1.5 * (1.1 ** (level - 20)))

# 设计要点：
# - 前10级快速，建立成就感
# - 中期稳定，保持进度感
# - 后期缓慢，延长游戏寿命
```

### 经济系统基础公式

```
经济健康度检查：

1. 货币流通速度 = 总交易金额 / 货币总量
   └── 健康范围：5-20（过低=囤积，过高=通胀）

2. 贫富差距系数（Gini）
   └── 0 = 完全平等，1 = 一人拥有全部
   └── 游戏建议：0.3-0.6（需要有贫富差距但不过度）

3. 物品稀缺度 = 需求 / 供给
   └── > 1.5：价格上涨压力
   └── < 0.5：价格下跌压力
```

---

## 常用数学模式

### 扇形/锥形检测

```python
def point_in_sector(px, py, cx, cy, direction, angle_width, radius):
    """判断点是否在扇形内（用于技能范围、视野检测）"""
    dx, dy = px - cx, py - cy
    dist_sq = dx*dx + dy*dy
    if dist_sq > radius * radius:
        return False
    
    # 计算点相对于中心的角度
    point_angle = atan2(dy, dx)
    angle_diff = abs(normalize_angle(point_angle - direction))
    return angle_diff <= angle_width / 2

def normalize_angle(angle):
    """将角度归一化到 [-pi, pi]"""
    while angle > pi: angle -= 2*pi
    while angle < -pi: angle += 2*pi
    return angle
```

### 贝塞尔曲线

```python
def bezier_quadratic(p0, p1, p2, t):
    """二次贝塞尔曲线：p0(起点), p1(控制点), p2(终点)"""
    return (1-t)**2 * p0 + 2*(1-t)*t * p1 + t**2 * p2

def bezier_cubic(p0, p1, p2, p3, t):
    """三次贝塞尔曲线：更平滑的曲线控制"""
    return (1-t)**3 * p0 + 3*(1-t)**2*t * p1 + 3*(1-t)*t**2 * p2 + t**3 * p3

# 用途：
# - UI 动画路径
# - 子弹/弹道曲线
# - 相机移动轨迹
# - 粒子运动路径
```

### 距离衰减公式

```python
def linear_falloff(distance, max_dist):
    """线性衰减：声音、光照"""
    return max(0, 1 - distance / max_dist)

def inverse_square_falloff(distance, max_dist):
    """平方反比衰减：真实物理（光照、引力）"""
    if distance >= max_dist:
        return 0
    return 1 / (1 + distance * distance)

def exponential_falloff(distance, max_dist, exponent=2):
    """指数衰减：可控的衰减曲线"""
    if distance >= max_dist:
        return 0
    return (1 - distance / max_dist) ** exponent
```

---

## 最佳实践

- [ ] **不要自己写随机数算法** — 使用经过验证的库（PCG、Mersenne Twister）
- [ ] **种子必须可配置** — 调试和可复现性
- [ ] **浮点数比较用 epsilon** — `abs(a-b) < 0.0001` 而非 `a == b`
- [ ] **预计算三角函数** — 高频调用时查表替代 `sin`/`cos`
- [ ] **缓动比线性好** — 几乎所有动画都应该有缓动
- [ ] **空间分区必须做** — 100+ 动态对象时碰撞检测从 O(n²) 降到 O(n log n)
- [ ] **伤害公式先纸上验证** — Excel 模拟 1000 次战斗再进代码
- [ ] **经验曲线画出来看** — 对数坐标检查是否平滑

---

## 相关页面

- [核心机制设计](core-mechanics.md) — 数学与机制的结合
- [程序化内容生成](procedural-content-generation.md) — 噪声与随机
- [游戏AI系统](game-ai-systems.md) — 向量运算与空间算法
- [物理系统](physics-systems.md) — 刚体动力学数学
