---
title: 升级 PowerShell 7
published: 2026-7-19 22:00:00
category: Windows
tags: [系统, Windows]
---

# 升级 PowerShell 7

本文档用于将 Windows 自带的 PowerShell 5.x 升级到 PowerShell 7。

## 检查当前版本

在升级之前，先确认当前 PowerShell 版本：

```powershell
$PSVersionTable.PSVersion
```

如果主版本号小于 7，说明需要升级。

## 安装程序安装

传统的可靠安装方法。

1. 访问 PowerShell 的官方 GitHub 发布页：[PowerShell](https://github.com/PowerShell/PowerShell/releases)
2. 找到与你当前系统架构匹配的安装包（如果不确定下载哪个，可以用下面的命令行方式安装）
3. 运行安装程序
4. **注意**：安装过程中一定要勾选 **Add PowerShell to PATH**

## 命令行安装

以管理员身份运行 PowerShell 或 CMD，搜索并安装最新版的 PowerShell 7：

```powershell
winget install --id Microsoft.PowerShell --source winget
```

### 常见问题排查

#### 问题 1：系统无法识别 winget

如果提示以下内容，说明系统中没有安装或无法正常识别 winget（Windows 包管理器）：

```powershell
winget : 无法将"winget"项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径正确，然后再试一次。
```

**解决方法**：使用内部修复命令

1. 以管理员身份运行 PowerShell
2. 输入 `Repair-WinGetPackageManager`
3. 等待修复完毕，然后重启电脑
4. 重启后重新打开 PowerShell 并运行 `winget --version` 验证是否修复成功

#### 问题 2：缺少 WinGet.Client 模块

如果显示以下内容，说明 PowerShell 环境中缺少 `Microsoft.WinGet.Client` 模块，需要重新安装并修复：

```powershell
Repair-WinGetPackageManager : 无法将"Repair-WinGetPackageManager"项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径正确，然后再试一次。
```

**解决步骤**：

1. 安装 NuGet 包提供程序（可能会弹出确认提示，输入 `Y` 回车即可）

   ```powershell
   Install-PackageProvider -Name NuGet -Force | Out-Null
   ```

2. 安装 WinGet 客户端模块

   ```powershell
   Install-Module -Name Microsoft.WinGet.Client -Force -Repository PSGallery | Out-Null
   ```

3. 执行修复命令

   ```powershell
   Repair-WinGetPackageManager -Force -Latest
   ```

4. 验证修复结果

   ```powershell
   winget --version
   ```

5. 重新执行安装命令

   ```powershell
   winget install --id Microsoft.PowerShell --source winget
   ```

## 验证安装

安装完成后，**重新打开终端**，运行以下命令确认安装成功：

```powershell
pwsh --version
```

或在新终端中查看详细版本信息：

```powershell
$PSVersionTable.PSVersion
```

输出主版本号为 7 即表示升级成功。