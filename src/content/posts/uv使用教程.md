---
title: uv使用教程
published: 2026-8-24 13:00:00
category: 编程语言
tags: [Python]
---

# 1. 安装

电脑上已经有python的话，输入以下命令用pip安装器安装uv

```powershell
pip install uv
```

Liunx上安装：`curl -LsSf https://astral.sh/uv/install.sh | sh`

Windows上安装：`irm https://astral.sh/uv/install.ps1 | iex`

macOS上安装：`brew install uv`

安装完成后验证是否安装成功：`uv --version`，有版本号输出就表示安装成功

# 2. 管理python版本

查看可用的python版本：`uv python list`

安装特定版本的python：`uv python install 3.12`

设置全局默认python版本：`uv python default 3.12`

为当前项目固定python版本：`uv python pin 3.12`

# 3. 管理虚拟环境

创建虚拟环境：`uv venv`

使用指定python版本创建虚拟环境：`uv venv --python 3.12`

激活虚拟环境：win的pwsh：`.venv\Scripts\activate`，macOS或Linux：`source .venv/bin/activate`

退出虚拟环境：`deactivate`

日常可使用 `uv run` 直接运行脚本，无需手动激活虚拟环境

# 4. 包管理（与pip兼容）

安装包：

​    安装最新版本：`uv pip install requests`

​    安装特定版本：`uv pip install requests==2.31.0`

​    从requirments.txt批量安装：`uv pip install -r requirments.txt`

升级包：`uv pip install --upgrade requests`

卸载包：`uv pip uninstall requests`

查看已安装的包：`uv pip list`

导出当前环境已经安装的包：`uv pip freeze > requirements.txt`

# 5. 项目管理（推荐）

uv支持以pyproject.toml为中心的现代化项目管理方式

初始化项目：`uv init`

会创建以下基本项目结构：

```
my_project/
├── pyproject.toml    # 项目配置和依赖声明
├── .python-version   # 固定 Python 版本
├── README.md
└── main.py
```

添加和移除依赖

```
# 添加生产依赖
uv add requests

# 添加指定版本的依赖
uv add "requests>=2.31.0"

# 添加开发依赖（只在开发环境使用，如测试框架）
uv add --dev pytest ruff

# 移除依赖
uv remove requests
```

安装项目全部依赖（项目中有pyproject.toml）：`uv sync`

生成或更新锁文件：`uv lock`

# 6. 运行脚本

直接运行main.py（无需手动激活虚拟环境）：`uv run main.py`
