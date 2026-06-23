---
title: Claude Code 完整安装与配置教程
published: 2026-05-15 9:00:00
category: AI工具教程
tags: [AI, Claude-Code]
---

# Claude Code 完整安装与配置教程

本教程涵盖 Windows / Linux / macOS 三大平台，包括无 sudo 环境、国内网络优化、接入 DeepSeek 等替代模型、项目配置和故障排除。

---

## 一、环境检查

安装前先确认现有环境：

```powershell
# 检查是否已有 Node.js
node --version      # 需要 v18+，推荐 v20+
npm --version       # 需要 v9+

# 检查是否已有 claude
claude --version    # 已有则跳过安装
```

> **版本要求**：Claude Code 需要 Node.js 18+，推荐 20 LTS 或 24 LTS。

---

## 二、安装 Node.js

直接去官网[Node.js — 下载 Node.js®](https://nodejs.org/zh-cn/download) 下载安装程序或输入安装命令

---

## 三、安装 Claude Code

### 安装步骤

```powershell
# 1. 设置国内镜像源（加速下载）
npm config set registry https://registry.npmmirror.com

# 2. 安装最新版本
npm install -g @anthropic-ai/claude-code

# 3. 切回官方源（重要！防自动更新拉错包）
npm config set registry https://registry.npmjs.org
```

### 验证安装

```shell
claude --version   # 查看版本号
claude             # 启动交互界面
```

### 无 sudo 安装补充

如果 `npm install -g` 提示权限错误（Linux/macOS）：

```shell
# 方案一：设置 npm 全局路径到用户目录
npm config set prefix ~/.npm-global
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# 然后再安装
npm install -g @anthropic-ai/claude-code
```

---

## 四、跳过开箱引导

安装后首次启动会进入引导界面。直接编辑配置文件跳过：

```shell
# 找到 .claude.json（通常在 ~/.claude.json 或项目根目录）
nano ~/.claude.json
```

在 JSON 中添加：
```json
{
  "hasCompletedOnboarding": true
}
```

### `.claude.json` 常用配置说明

```json
{
  "hasCompletedOnboarding": true,       // 跳过引导
  "apiKey": "sk-ant-xxxxxxxxxxxx",      // 直接配置 API Key（可选，也可用环境变量）
  "allowedTools": ["Terminal", "FileEdit", "Read"],
                                         // 允许 Claude 使用的工具
  "model": "claude-sonnet-4-20250514",  // 指定模型（CC Switch 接管后不生效）
  "maxTokens": 128000,                  // 最大 token 数
  "theme": "dark"                       // 界面主题
}
```

---

## 五、接入其他模型（CC Switch）

Claude Code 默认只支持 Anthropic 官方模型。用 **CC Switch** 可以接入 DeepSeek、通义千问、GLM 等国内模型。

### 5.1 安装 CC Switch

访问 [CC Switch 官网](https://www.ccswitch.io/zh/) 下载安装。

### 5.2 配置 DeepSeek（完整流程）

```
① 打开 CC Switch
  → 点击右上角 ➕ 号

② 添加供应商
  → 选择「Claude 供应商」→「DeepSeek」

③ 填写 API Key
  → 在 [DeepSeek 开放平台](https://platform.deepseek.com/) 申请
  → ⚠️ API Key 只出现一次，一定要保存好，千万不能分享

④ 配置模型名
  → 在「配置模型」栏填写：
    deepseek-v4-flash[1m]      # 快速版（推荐日常使用）
    或
    deepseek-v4-pro[1m]        # 增强版
  → 后面的 [1m] 表示 1M 上下文，不加可能会用 128k

⑤ 保存 → 关闭 CC Switch
```

### 5.3 验证

```shell
claude                    # 启动
/model                    # 查看可用模型列表
# 应出现 deepseek-v4-flash 或 deepseek-v4-pro
# 正常对话即配置成功
```

### 其他国内模型参考

| 模型 | 供应商 | 模型名示例 |
|------|--------|-----------|
| 通义千问 | 阿里云 | `qwen-max` |
| GLM-4 | 智谱 | `glm-4-plus` |
| DeepSeek V4 | DeepSeek | `deepseek-v4-flash[1m]` |

---

## 六、项目配置（CLAUDE.md / AGENTS.md）

这是 Claude Code **最重要的进阶功能**——通过项目级配置文件告诉 AI 你的项目上下文。

### CLAUDE.md — 项目核心规则

在项目根目录创建 `CLAUDE.md`，告诉 Claude Code 你的项目约定：

```markdown
# 项目指南

## 技术栈
- 前端：React 18 + TypeScript + Tailwind CSS
- 后端：Python 3.11 + FastAPI
- 数据库：PostgreSQL 16

## 代码风格
- 使用函数式组件 + Hooks，不用 class 组件
- API 路由统一用 `/api/v1/` 前缀
- 测试用 pytest，测试文件放在 `tests/` 目录

## 常用命令
- 启动：`npm run dev`
- 测试：`pytest tests/`
- 构建：`npm run build`
```

### AGENTS.md — 团队/Agent 协作规则

更适合多人项目或跨 Agent 协作：

```markdown
# Agent 协作规则

## 工作流
1. 收到任务后先写出实现计划
2. 让其他 Agent 审查计划
3. 分步实现，每步提交测试
4. 全部通过后合并

## 通信规则
- 任何破坏性变更（改数据库、删文件）必须确认
- API 变更要同步更新文档
- 测试覆盖率不低于 80%
```

### 最佳组合

```
项目根目录/
├── CLAUDE.md      # 技术细节：技术栈、代码风格、命令
├── AGENTS.md      # 协作规则：工作流、审查流程
└── .claude.json   # Claude Code 自身配置
```

---

## 七、常用命令速查

| 命令 | 说明 |
|------|------|
| `claude` | 启动交互模式 |
| `claude -p "你的问题"` | 单次提问模式 |
| `/help` | 查看所有可用命令 |
| `/model` | 切换/查看当前模型 |
| `/cost` | 查看当前会话费用 |
| `/compact` | 压缩上下文（感觉卡顿时用） |
| `/clear` | 清空当前对话 |
| `/settings` | 打开设置面板 |
| `claude --version` | 查看版本号 |
| `claude --update` | 手动检查更新 |

---

## 八、汉化界面

如果你想要中文界面，可以安装社区汉化插件：

[taekchef/claude-code-zh-cn](https://github.com/taekchef/claude-code-zh-cn)

开源桌宠（支持claudecode、codex等）：[clawd-on-desk](https://github.com/rullerzhou-afk/clawd-on-desk)

---

## 九、故障排除 FAQ

### Q1: `claude: command not found`

**原因**：npm 全局安装路径不在 PATH 中

**解决**：

```shell
# 查看 npm 全局安装位置
npm root -g

# 找到后加入 PATH
echo 'export PATH="$(npm root -g)/../bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### Q2: `npm install -g` 权限错误（EACCES）

**原因**：普通用户无权限写系统目录

**解决**：

```shell
# 方案一：设置用户级 prefix（推荐）
npm config set prefix ~/.npm-global

# 方案二：使用 Node Version Manager
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
nvm install 20
```

### Q3: 国内网络慢 / 下载失败

**解决**：

```shell
# 临时用镜像源安装
npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com

# Node.js 二进制用镜像下载
curl -fsSL https://npmmirror.com/mirrors/node/v24.0.0/node-v24.0.0-linux-x64.tar.xz
```

### Q4: CC Switch 连不上 / API 调用失败

**检查清单**：
- ✅ 代理/VPN 是否开启？（国内访问 DeepSeek API 一般不需要代理）
- ✅ API Key 是否正确？有没有过期？
- ✅ 模型名是否填了 `[1m]` 后缀？
- ✅ CC Switch 是最新版吗？
- ✅ 网络能访问 `api.deepseek.com` 吗？`curl https://api.deepseek.com/v1/models`

### Q5: 对话越来越卡 / 费用飞涨

**解决**：
- 使用 `/compact` 压缩上下文（减少历史对话占用的 token）
- 使用 `/clear` 开始新对话
- 检查 `/cost` 查看费用消耗

### Q6: Claude Code 自动更新失败

**原因**：镜像源切回官方源但网络不通

**解决**：

```shell
# 手动更新
npm update -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com

# 或者重新安装
npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com
```

---

## 十、环境变量参考

| 变量 | 说明 | 示例 |
|------|------|------|
| `ANTHROPIC_API_KEY` | Anthropic API Key（默认渠道） | `sk-ant-xxxxx` |
| `DEEPSEEK_API_KEY` | DeepSeek API Key（CC Switch 用） | `sk-xxxxx` |
| `HTTP_PROXY` | HTTP 代理（国内网络必要） | `http://127.0.0.1:7890` |
| `HTTPS_PROXY` | HTTPS 代理 | `http://127.0.0.1:7890` |

设置方式：
```shell
# Linux/macOS
export ANTHROPIC_API_KEY="sk-ant-xxxxxxxx"

# Windows PowerShell
$env:ANTHROPIC_API_KEY="sk-ant-xxxxxxxx"
```

---

> **版本记录**：教程适用于 Claude Code v2.x，Node.js v20+/v24+。
> 如有问题，欢迎查阅 [Claude Code 官方文档](https://docs.anthropic.com/en/docs/claude-code/overview)。
