---
title: uv 使用教程
published: 2026-08-24 13:00:00
updated: 2026-08-31 20:00:00
category: 编程语言
tags: [Python]
---

# uv 使用教程

`uv` 是一个极速的 Python 包和项目管理工具，由 Astral 团队（Ruff 原班人马）开发，旨在替代 `pip` + `venv` + `pip-tools` 等传统工具链。它用 Rust 编写，性能远超同类工具，且与 `pyproject.toml` 深度集成，支持现代化的 Python 项目工作流。

---

## 1. 安装与升级

### 1.1 安装方式

- **通过 pip 安装（需已有 Python）**：
  ```powershell
  pip install uv

- **Linux / macOS（推荐）**：
  ```bash
  curl -LsSf https://astral.sh/uv/install.sh | sh
  ```

- **Windows（PowerShell）**：

  ```powershell
  irm https://astral.sh/uv/install.ps1 | iex
  ```
  
- **macOS（Homebrew）**：

  ```bash
  brew install uv
  ```
  

### 1.2 验证安装

  ```bash
uv --version
  ```

### 1.3 升级 uv

```bash
# 如果是通过 pip 安装的
pip install --upgrade uv

# 如果通过官方脚本安装（Linux/macOS/Windows）
uv self update   # 注意：v0.4.0+ 支持该命令
```

------

## 2. 管理 Python 版本

`uv` 可以像 `pyenv` 一样管理 Python 解释器版本，无需额外安装。

```bash
# 查看所有可用的 Python 版本（包括已安装和可下载的）
uv python list

# 安装特定版本（例如 3.12）
uv python install 3.12

# 设置全局默认版本（影响所有新项目）
uv python default 3.12

# 为当前项目固定 Python 版本（会在项目根目录生成 .python-version 文件）
uv python pin 3.12
```

------

## 3. 管理虚拟环境

传统方式需要手动激活，但 `uv` 推荐通过 `uv run` 直接运行脚本，无需激活。

### 3.1 创建虚拟环境

```bash
# 在当前目录创建 .venv 文件夹
uv venv

# 指定 Python 版本创建
uv venv --python 3.12

# 自定义虚拟环境目录（如 .myenv）
uv venv .myenv
```

### 3.2 激活/退出虚拟环境（可选）

- **Windows (PowerShell)**：`.venv\Scripts\activate`
- **macOS / Linux**：`source .venv/bin/activate`
- **退出**：`deactivate`

### 3.3 删除虚拟环境

直接删除对应目录即可（如 `rm -rf .venv`）。

------

## 4. 项目管理（推荐方式）

`uv` 推荐使用 `pyproject.toml` 作为项目配置中心，类似 `poetry` 或 `pdm`。

### 4.1 初始化新项目

```bash
uv init my_project
cd my_project
```

生成的结构：

```text
my_project/
├── pyproject.toml     # 项目元数据、依赖、脚本入口等
├── .python-version    # Python 版本锁定
├── README.md
└── main.py
```

### 4.2 添加 / 移除依赖

```bash
# 添加生产依赖（自动写入 pyproject.toml 并更新锁文件）
uv add requests

# 添加指定版本/范围
uv add "django>=4.2,<5.0"

# 添加开发依赖（如测试、格式化工具）
uv add --dev pytest ruff mypy

# 添加 git 仓库依赖
uv add git+https://github.com/psf/requests.git

# 移除依赖
uv remove requests
```

### 4.3 同步与锁定

- **`uv lock`**：根据 `pyproject.toml` 生成或更新 `uv.lock` 文件（精确依赖树）。
- **`uv sync`**：根据锁文件安装所有依赖（若没有锁文件则先执行 `lock`）。会自动创建/更新虚拟环境。

```bash
# 生成/更新锁文件
uv lock

# 安装全部依赖（生产 + 开发）
uv sync

# 仅安装生产依赖（忽略开发依赖）
uv sync --no-dev
```

### 4.4 运行项目脚本

```bash
# 无需激活环境，直接运行
uv run main.py

# 运行带参数的命令
uv run pytest tests/
```

------

## 5. 包管理（兼容 pip 方式）

若你仍习惯 `pip` 风格，`uv` 提供了几乎完全兼容的子命令，适合快速测试或临时环境。

```bash
# 安装最新版本
uv pip install requests

# 安装特定版本
uv pip install requests==2.31.0

# 从 requirements.txt 批量安装
uv pip install -r requirements.txt

# 升级包
uv pip install --upgrade requests

# 卸载包
uv pip uninstall requests

# 查看已安装包列表
uv pip list

# 导出当前环境包列表
uv pip freeze > requirements.txt
```

> **注意**：`uv pip` 与 `uv add/sync` 操作的是不同的依赖存储位置。建议在项目中使用 `uv add` 和 `uv sync` 以保证依赖一致性。

------

## 6. 高级功能

### 6.1 查看依赖树

```bash
# 显示当前项目的依赖树
uv tree
```

### 6.2 管理全局工具（类似 pipx）

安装可直接运行的命令行工具（如 `ruff`, `black`）到独立的虚拟环境：

```bash
# 安装工具
uv tool install ruff

# 列出已安装工具
uv tool list

# 卸载
uv tool uninstall ruff
```

### 6.3 缓存管理

`uv` 会缓存下载的包和 Python 发行版，可查看和清理：

```bash
# 查看缓存信息
uv cache info

# 清理所有缓存
uv cache clean
```

### 6.4 配置镜像源

通过环境变量或配置文件设置 PyPI 镜像：

```bash
# 临时使用清华源
uv pip install requests -i https://pypi.tuna.tsinghua.edu.cn/simple

# 永久配置（在 ~/.config/uv/uv.toml 中）
[[pip]]
index-url = "https://pypi.tuna.tsinghua.edu.cn/simple"
```

------

## 7. 常用命令速查表

| 功能                   | 命令                               |
| :--------------------- | :--------------------------------- |
| 初始化项目             | `uv init`                          |
| 添加依赖               | `uv add <package>`                 |
| 移除依赖               | `uv remove <package>`              |
| 安装全部依赖           | `uv sync`                          |
| 锁定依赖版本           | `uv lock`                          |
| 运行脚本               | `uv run <script>`                  |
| 查看依赖树             | `uv tree`                          |
| 安装 Python 版本       | `uv python install <version>`      |
| 固定 Python 版本       | `uv python pin <version>`          |
| 创建虚拟环境           | `uv venv`                          |
| 安装临时包（pip 风格） | `uv pip install <package>`         |
| 导出 requirements.txt  | `uv pip freeze > requirements.txt` |
| 安装全局工具           | `uv tool install <tool>`           |
| 清理缓存               | `uv cache clean`                   |

------

## 8. 故障排查

### 8.1 网络问题（下载慢或失败）

- 更换 PyPI 镜像源（见 6.4）。
- 设置代理：`export HTTP_PROXY=...` / `export HTTPS_PROXY=...`。

### 8.2 权限错误（如无法写入 .venv）

- 确保当前目录可写，或使用 `sudo`（不推荐）。
- 检查是否被安全软件拦截。

### 8.3 版本冲突

- 使用 `uv tree` 查看依赖关系，手动调整 `pyproject.toml` 中的版本约束。
- 执行 `uv lock --upgrade` 升级所有依赖到最新允许版本。

### 8.4 uv 命令未找到

- 检查 `PATH` 是否包含 uv 安装目录（通常为 `~/.cargo/bin` 或 `~/.local/bin`）。
- 重新启动终端。

------

## 9. 迁移指引（从 pip/venv 迁移到 uv）

1. **已有 requirements.txt**：可使用 `uv pip install -r requirements.txt` 安装，但更推荐执行 `uv init` 后，手动将依赖写入 `pyproject.toml` 的 `[project.dependencies]` 中，再 `uv lock && uv sync`。
2. **已有 pyproject.toml（poetry/pdm）**：可参考其依赖部分，手动整理后使用 `uv add` 重新添加，或使用 `uv pip install` 安装后通过 `uv pip freeze` 导出再导入。

------

## 10. 结语

`uv` 集成了 Python 开发中版本管理、虚拟环境、依赖管理、脚本运行等全流程，且性能优异。建议新项目直接采用 `uv` 的项目管理模式，老项目可逐步迁移。更多高级用法请参考官方文档：https://docs.astral.sh/uv


```text
希望这个完善版本能满足您的需求。如果还有特定方向想补充，欢迎进一步沟通！
```
