# Cloudflare WAF 配置清单

> 在 Cloudflare Dashboard → Security → WAF 中手动添加

## 规则 1：屏蔽 WordPress 攻击扫描

```
字段: URI Path
运算符: contains
值: /wp-admin
操作: Block
```

## 规则 2：速率限制恶意爬虫

```
字段: URI Path
运算符: contains
值: /wp-
操作: JS Challenge
```

## 规则 3：速率限制单 IP 高频请求

```
路径: /*
速率: 100 requests / 10 seconds
操作: JS Challenge
持续时间: 1 minute
```

## 规则 4：托管规则（一键开启）

```
Cloudflare Managed Ruleset → 开启
- SQLi 防护
- XSS 防护
- 文件包含防护
OWASP Core Ruleset → 开启（如可用）
```

## 规则 5：Bot Fight Mode（一键开启）

```
Security → Bots → Bot Fight Mode → ON
```

**操作步骤**：
1. 登录 [dash.cloudflare.com](https://dash.cloudflare.com)
2. 选择 `anchorfact.org`
3. Security → WAF → Create rule
4. 添加上述规则
5. Security → Bots → 开启 Bot Fight Mode
