---
title: Hermes agent安装教程
published: 2026-05-21 19:00:00
category: AI工具教程
---

# 简介

Hermes agent由硅谷AI实验室 Nous Research 于2026年2月开源发布的一款具备**自我进化能力**的AI智能体框架。

官网：[Hermes-agent](https://github.com/NousResearch/hermes-agent)

核心亮点：**自我进化与学习闭环**、**强大的记忆系统**、**极高的兼容性与易用性**

与OpenClaw的区别：

- **OpenClaw（龙虾）**：像一个**执行力超强的管家**。它的技能需要人类预设或手动安装，行为非常稳定可控，适合处理步骤明确的批量任务，生态成熟，上手极快。
- **Hermes（爱马仕）**：像一个**会动脑子的学徒/员工**。它强调从任务中自动“长出”能力，技能自动生成并迭代，拥有跨平台的长期记忆，适合需要长期积累和优化的复杂工作流。

# 快速安装(官方)

Linux、macOS、WSL2、Termux

```shell
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

Windows-测试版（不建议安装）

```powershell
iex (irm https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.ps1)
```

# 快速安装(国内)

如果访问不了外网或官方链接遇到网络问题可以用国内的链接
使用中文社区维护的镜像版，优先走国内直链路线

参考链接：[Hermes Agent 中文社区](https://hermesagent.org.cn/docs/getting-started/installation)

Linux、macOS、WSL2、Termux

```shell
curl -fsSL https://res1.hermesagent.org.cn/install.sh | bash
```

⚠️ **警告**：Windows 版本目前处于测试阶段，可能存在兼容性问题，**不建议**生产环境使用。
如果你仍想尝试，请在 PowerShell 中执行：

```
irm https://res1.hermesagent.org.cn/install.ps1 | iex
```

# 安装后操作

Linux、WSL2

```shell
source ~/.bashrc   # 或：source ~/.zshrc
hermes             # 开始聊天
```

Windows PowerShell

```powershell
# 关闭并重新打开 PowerShell 后再运行
hermes
```

后续设置

```shell
hermes model          # 选择大语言模型提供商和模型
hermes tools          # 配置启用哪些工具
hermes gateway setup  # 设置消息平台
hermes config set     # 单独设置某个配置项
hermes setup          # 或再次运行完整设置向导
```

更新到最新版本：`hermes update`

查看当前版本：`hermes version`

卸载：`hermes uninstall`

# 拓展

图形界面（非官方）：[Hermes-web-ui](https://github.com/EKKOLearnAI/hermes-web-ui)

skills站

- [专为中国用户优化的Skills社区](https://skillhub.tencent.com/#featured)
- [ClawHub](https://clawhub.ai/)
- <https://agent-skills.cc/>
- <https://skillsmp.com/>
- <https://www.skills.sh/trending>

