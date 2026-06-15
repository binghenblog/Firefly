---
title: Linux命令大全
published: 2024-12-26 12:20:00
updated: 2026-05-10 20:00:00
category: 系统
---

本文档整理了Linux系统中常用的各类命令，方便日常使用和查阅。

---

## 📋 目录

- [常用基础命令](#1️⃣-常用基础命令) - pwd, ls, cd, mkdir, rm, cp, mv, cat, head, tail
- [文件管理命令](#2️⃣-文件管理命令) - tree, stat, ln
- [文本处理命令](#3️⃣-文本处理命令) - grep, awk, sed, cut, sort, uniq, wc
- [系统信息命令](#4️⃣-系统信息命令) - uname, hostname, date, free, df, du, top, htop
- [网络相关命令](#5️⃣-网络相关命令) - ping, curl, wget, netstat, ss, ip, ifconfig
- [进程管理命令](#6️⃣-进程管理命令) - ps, kill, pkill, pgrep, jobs, fg/bg, nohup
- [权限管理命令](#7️⃣-权限管理命令) - chmod, chown, chgrp, umask
- [压缩与解压命令](#8️⃣-压缩与解压命令) - tar, zip, unzip, gzip, bzip2
- [查找命令](#9️⃣-查找命令) - find, locate, which, whereis
- [其他实用命令](#🔟-其他实用命令) - man, help, alias, history, source, echo, env, export, read
- [用户和组管理命令](#1️⃣1️⃣-用户和组管理命令) - useradd, groupadd, usermod, passwd, sudo
- [软件包管理命令](#1️⃣2️⃣-软件包管理命令yumrpm) - yum, rpm, apt, dnf
- [Vim文本编辑器](#1️⃣3️⃣-vim文本编辑器) - 常用操作和快捷键
- [常用技巧与快捷键](#💡-常用技巧与快捷键) - 终端快捷键汇总
- [注意事项](#📝-注意事项) - 使用提醒

---

## 1️⃣ 常用基础命令

| 命令      | 功能描述       | 示例                                                  |
| ------- | ---------- | --------------------------------------------------- |
| `pwd`   | 显示当前工作目录路径 | `$ pwd`                                           |
| `ls`    | 列出目录内容     | `$ ls -l`（详细列表）<br>`$ ls -a`（包含隐藏文件）          |
| `cd`    | 切换目录       | `$ cd /home/user`  <br>`$ cd ..`（上级目录）          |
| `mkdir` | 创建目录       | `$ mkdir new_folder`                              |
| `rmdir` | 删除空目录      | `$ rmdir empty_dir`                               |
| `touch` | 创建/更新文件    | `$ touch file.txt`                                |
| `rm`    | 删除文件或目录    | `$ rm file.txt`  <br>`$ rm -rf dir/`（强制递归）      |
| `cp`    | 复制文件或目录    | `$ cp src dest`  <br>`$ cp -r src_dir dest_dir` |
| `mv`    | 移动或重命名文件   | `$ mv old_name new_name`                          |
| `cat`   | 查看文件内容     | `$ cat file.txt`                                  |
| `head`  | 显示文件前几行    | `$ head -n 10 file.txt`                           |
| `tail`  | 显示文件后几行    | `$ tail -f logfile.log`（实时跟踪）                     |

---

## 2️⃣ 文件管理命令

|命令|功能描述|示例|
|---|---|---|
|`tree`|显示目录树形结构|`$ tree -L 2`（限制层级）|
|`stat`|查看文件详细信息|`$ stat file.txt`|
|`ln`|创建链接|`$ ln source target`  <br>`$ ln -s source link`（软链接）|

---

## 3️⃣ 文本处理命令

|命令|功能描述|示例|
|---|---|---|
|`grep`|搜索文件内容|`$ grep "pattern" file.txt`  <br>`$ grep -r "pattern" ./`（递归）|
|`awk`|文本处理与格式化输出|`$ awk '{print $1}' file.txt`  <br>`$ awk 'NR==1' file.txt`（第一行）|
|`sed`|流编辑器，替换/删除内容|`$ sed 's/old/new/g' file.txt`  <br>`$ sed -i 's/old/new/g' file.txt`（原地修改）|
|`cut`|提取列数据|`$ cut -d',' -f1,3 data.csv`|
|`sort`|排序文本|`$ sort file.txt`  <br>`$ sort -n file.txt`（数字排序）|
|`uniq`|去除重复行|`$ uniq file.txt`  <br>`$ uniq -c file.txt`（统计次数）|
|`wc`|统计字符/单词/行数|`$ wc -l file.txt`（行数）  <br>`$ wc -w file.txt`（单词数）|

---

## 4️⃣ 系统信息命令

|命令|功能描述|示例|
|---|---|---|
|`uname`|显示系统信息|`$ uname -a`  <br>`$ uname -r`（内核版本）|
|`hostname`|查看主机名|`$ hostname`|
|`whoami`|当前用户|`$ whoami`|
|`date`|显示日期时间|`$ date +%Y-%m-%d\ %H:%M:%S`|
|`uptime`|系统运行时间|`$ uptime`|
|`free`|内存使用情况|`$ free -h`（人类可读）|
|`df`|磁盘空间使用|`$ df -h`  <br>`$ df -i`（inode使用率）|
|`du`|目录大小统计|`$ du -sh dir/`  <br>`$ du -ah --max-depth=1 /path`|
|`top`|实时查看进程资源占用|`$ top`  <br>`$ top -b -n 3`（批处理模式）|
|`htop`|增强版top命令|`$ htop`|

---

## 5️⃣ 网络相关命令

|命令|功能描述|示例|
|---|---|---|
|`ping`|测试网络连接|`$ ping google.com`  <br>`$ ping -c 4 google.com`（发送4次）|
|`curl`|HTTP请求工具|`$ curl https://example.com`  <br>`$ curl -X POST -d "data" url`|
|`wget`|下载文件|`$ wget http://example.com/file.zip`|
|`netstat`|网络状态查看|`$ netstat -tulpn`（监听端口）|
|`ss`|替代netstat命令|`$ ss -tulpn`|
|`ip`|网络接口配置|`$ ip addr show`  <br>`$ ip route show`|
|`ifconfig`|查看/设置网卡（较旧）|`$ ifconfig eth0`|
|`scp`|远程文件复制（SSH协议）|`$ scp file.txt user@host:/path/`  <br>`$ scp -r dir/ user@host:/path/`（递归）|
|`rsync`|远程同步/备份工具|`$ rsync -avz source/ user@host:/dest/`  <br>`$ rsync -avz --delete source/ user@host:/dest/`|

## 6️⃣ 进程管理命令

| 命令      | 功能描述    | 示例                                        |
| ------- | ------- | ----------------------------------------- |
| `ps`    | 显示进程状态  | `$ ps -ef`  <br>`$ ps aux`（详细）        |
| `kill`  | 终止进程    | `$ kill PID`  <br>`$ kill -9 PID`（强制） |
| `pkill` | 按名称杀进程  | `$ pkill process_name`                  |
| `pgrep` | 查找进程PID | `$ pgrep process_name`                  |
| `jobs`  | 查看后台任务  | `$ jobs`                                |
| `fg/bg` | 前台/后台切换 | `$ fg %1`  <br>`$ bg %1`              |

---

## 7️⃣ 权限管理命令

|命令|功能描述|示例|
|---|---|---|
|`chmod`|修改文件权限|`$ chmod +x script.sh`（可执行）  <br>`$ chmod 755 file.txt`|
|`chown`|修改文件所有者|`$ chown user:group file.txt`|
|`chgrp`|修改文件所属组|`$ chgrp groupname file.txt`|
|`umask`|设置默认权限掩码|`$ umask 022`（设置）<br>`$ umask`（查看当前值）|

---

## 8️⃣ 压缩与解压命令

|命令|功能描述|示例|
|---|---|---|
|`tar`|打包/解包工具|`$ tar -czvf archive.tar.gz dir/`（创建gzip压缩包）  <br>`$ tar -xzf archive.tar.gz`（解压）|
|`zip`|压缩为zip格式|`$ zip file.zip file.txt`|
|`unzip`|解压zip文件|`$ unzip file.zip`|

---

## 9️⃣ 查找命令

|命令|功能描述|示例|
|---|---|---|
|`find`|查找文件或目录|`$ find /path -name "*.txt"`  <br>`$ find . -type f -size +10M`|
|`locate`|快速定位文件（需更新数据库）|`$ updatedb`（更新数据库）<br>`$ locate filename`|
|`which`|查找命令的完整路径|`$ which python`|
|`whereis`|查找命令位置|`$ whereis grep`|

---

## 🔟 其他实用命令

|命令|功能描述|示例|
|---|---|---|
|`man`|查看命令手册|`$ man ls`（查看ls手册）<br>`$ man -k keyword`（搜索关键字）<br>`$ man -section number command`（查看指定章节）|
|`help`|查看内置命令帮助|`$ help cd`|
|`alias`|创建别名|`$ alias ll='ls -l'`（创建别名）<br>`$ alias`（查看所有别名）<br>`$ unalias ll`（删除别名）|
|`history`|查看历史命令|`$ history`（查看）<br>`$ history 10`（最近10条）<br>`$ !!`（执行上一条命令）<br>`$ !n`（执行第n条命令）<br>`$ !-1`（执行倒数第一条）|
|`clear`|清屏|`$ clear` 或 `Ctrl + L`|
|`exit`|退出终端|`$ exit` 或 `Ctrl + D`|
|`source`|执行文件中的命令|`$ source file.sh`（相当于 `. file.sh`）|
|`echo`|输出文本|`$ echo "hello world"`<br>`$ echo $PATH`（输出变量）|
|`env`|查看环境变量|`$ env`（查看所有）<br>`$ env VAR=value`（临时设置）|
|`export`|设置环境变量|`$ export PATH=$PATH:/new/path`（添加到PATH）|
|`read`|读取用户输入|`$ read -p "请输入:" var`（提示并读取）|

---

## 1️⃣1️⃣ 用户和组管理命令

| 命令 | 功能描述 | 示例 |
|------|---------|------|
| `useradd` | 创建用户 | `$ useradd -m username`（创建用户并创建家目录）<br>`$ useradd -u 1000 -g groupname username`（指定UID和主组）<br>`$ useradd -G group1,group2 username`（添加附加组）<br>`$ useradd -e 2025-12-31 username`（指定失效时间） |
| `groupadd` | 创建组 | `$ groupadd groupname` |
| `userdel` | 删除用户 | `$ userdel username`（保留家目录）<br>`$ userdel -r username`（删除用户及家目录） |
| `groupdel` | 删除组 | `$ groupdel groupname` |
| `usermod` | 修改用户信息 | `$ usermod -l newname oldname`（修改用户名）<br>`$ usermod -u newuid username`（修改UID）<br>`$ usermod -g groupname username`（修改主组）<br>`$ usermod -aG groupname username`（追加附加组） |
| `passwd` | 修改密码 | `$ passwd username`（修改指定用户密码）<br>`$ passwd -l username`（锁定用户）<br>`$ passwd -u username`（解锁用户） |
| `gpasswd` | 组密码管理 | `$ gpasswd -a username groupname`（添加用户到组）<br>`$ gpasswd -d username groupname`（从组中删除用户） |
| `su` | 切换用户 | `$ su - username`（切换用户并加载环境）<br>`$ su - root`（切换到root） |
| `sudo` | 以root权限执行命令 | `$ sudo command`（使用root权限执行）<br>配置方法：运行 `visudo` 添加 `username ALL=(ALL) ALL` |
| `id` | 显示用户身份信息 | `$ id username`（查看指定用户UID和组）<br>`$ id`（查看当前用户） |
| `who` | 查看当前登录用户 | `$ who`（查看登录用户）<br>`$ who -b`（查看系统启动时间） |
| `w` | 查看登录用户及操作 | `$ w` |

---

## 1️⃣2️⃣ 软件包管理命令（YUM/RPM）

| 命令 | 功能描述 | 示例 |
|------|---------|------|
| `yum` | RPM包管理器 | `$ yum install package`（安装）<br>`$ yum remove package`（卸载）<br>`$ yum update package`（更新）<br>`$ yum search keyword`（搜索）<br>`$ yum list installed`（已安装包）<br>`$ yum info package`（查看包信息）<br>`$ yum clean all`（清理缓存） |
| `rpm` | RPM包查询 | `$ rpm -qa`（查询所有已安装）<br>`$ rpm -q package`（查询指定包）<br>`$ rpm -qi package`（详细信息）<br>`$ rpm -ql package`（列出文件）<br>`$ rpm -qf /path/to/file`（查询文件所属包） |
| `apt` | Debian/Ubuntu包管理器 | `$ apt install package`（安装）<br>`$ apt remove package`（卸载）<br>`$ apt update`（更新软件源）<br>`$ apt upgrade`（升级软件包）<br>`$ apt search keyword`（搜索） |
| `dnf` | Fedora包管理器 | 用法同yum |

---

## 1️⃣3️⃣ Vim文本编辑器

### 基本操作

| 命令 | 功能描述 |
|------|---------|
| `vim file` | 打开文件 |
| `vim +n file` | 打开文件并跳转到第n行 |
| `vim +/关键词 file` | 打开文件并高亮关键词 |

### 光标移动

| 命令 | 功能描述 |
|------|---------|
| `h/j/k/l` | 左/下/上/右移动 |
| `gg` | 跳转到首行 |
| `G` | 跳转到末行 |
| `nG` | 跳转到第n行 |
| `0` 或 `^` | 跳转到行首 |
| `$` | 跳转到行尾 |
| `w` | 跳转到下一个单词 |
| `b` | 跳转到上一个单词 |
| `Ctrl + b` | 向上翻页 |
| `Ctrl + f` | 向下翻页 |

### 编辑操作

| 命令 | 功能描述 |
|------|---------|
| `yy` | 复制当前行 |
| `nyy` | 复制n行 |
| `p` | 粘贴到光标后 |
| `P` | 粘贴到光标前 |
| `dd` | 剪切/删除当前行 |
| `ndd` | 剪切/删除n行 |
| `D` | 删除光标到行尾（保留空行） |
| `x` | 删除光标处字符 |
| `u` | 撤销 |
| `Ctrl + r` | 重做 |

### 末行模式（按 `:` 进入）

| 命令 | 功能描述 |
|------|---------|
| `:w` | 保存 |
| `:q` | 退出 |
| `:wq` 或 `:x` | 保存并退出 |
| `:q!` | 强制退出不保存 |
| `:w!` | 强制保存 |
| `:n` | 跳转到第n行 |
| `:set nu` | 显示行号 |
| `:set nonu` | 隐藏行号 |
| `:/关键词` | 搜索关键词 |
| `:nohl` | 取消高亮 |
| `:%s/old/new/g` | 全文替换 |

---

## 1️⃣4️⃣ 服务管理命令（systemd）

| 命令 | 功能描述 | 示例 |
|------|---------|------|
| `systemctl start` | 启动服务 | `$ sudo systemctl start nginx` |
| `systemctl stop` | 停止服务 | `$ sudo systemctl stop nginx` |
| `systemctl restart` | 重启服务 | `$ sudo systemctl restart nginx` |
| `systemctl reload` | 重新加载配置（不中断） | `$ sudo systemctl reload nginx` |
| `systemctl enable` | 设置开机自启 | `$ sudo systemctl enable nginx` |
| `systemctl disable` | 取消开机自启 | `$ sudo systemctl disable nginx` |
| `systemctl status` | 查看服务状态 | `$ systemctl status nginx` |
| `systemctl list-units` | 列出所有运行中的服务 | `$ systemctl list-units --type=service` |
| `journalctl` | 查看系统日志 | `$ journalctl -u nginx`（按服务过滤）<br>`$ journalctl -f`（实时跟踪）<br>`$ journalctl --since "1 hour ago"`（按时间） |
| `systemctl daemon-reload` | 重新加载 systemd 配置 | `$ sudo systemctl daemon-reload` |

## 1️⃣5️⃣ 定时任务命令（Crontab）

| 命令 | 功能描述 | 示例 |
|------|---------|------|
| `crontab -l` | 查看当前用户的定时任务 | `$ crontab -l` |
| `crontab -e` | 编辑定时任务 | `$ crontab -e` |
| `crontab -r` | 删除所有定时任务 | `$ crontab -r` |
| `crontab -u user` | 管理其他用户的定时任务 | `$ sudo crontab -u username -l` |

### Crontab 时间格式

```
* * * * * command_to_execute
│ │ │ │ │
│ │ │ │ └── 星期 (0-7, 0和7都表示周日)
│ │ │ └──── 月份 (1-12)
│ │ └────── 日期 (1-31)
│ └──────── 小时 (0-23)
└────────── 分钟 (0-59)
```

示例：

```bash
# 每天凌晨 2 点执行备份脚本
0 2 * * * /home/user/backup.sh

# 每隔 10 分钟检查一次服务器状态
*/10 * * * * /usr/bin/healthcheck.sh

# 每周一至周五上午 9:30 执行
30 9 * * 1-5 /home/user/report.sh

# 每月1号凌晨执行
0 0 1 * * /home/user/monthly_clean.sh
```

### 常用时间简写

| 简写 | 等价于 | 说明 |
|------|--------|------|
| `@reboot` | - | 系统启动时执行 |
| `@daily` | `0 0 * * *` | 每天执行一次 |
| `@weekly` | `0 0 * * 0` | 每周执行一次 |
| `@monthly` | `0 0 1 * *` | 每月执行一次 |
| `@yearly` | `0 0 1 1 *` | 每年执行一次 |

---

## 💡 常用技巧与快捷键

|操作|快捷键/命令|
|---|---|
|撤销上一步|`Ctrl + Z`（挂起）<br>`fg`（恢复）|
|取消当前输入|`Ctrl + C`|
|结束输入/退出|`Ctrl + D`（发送EOF）|
|复制粘贴|`Ctrl + Shift + V` / `Ctrl + Alt + V`|
|快速搜索命令历史|`Ctrl + R`（正向搜索）<br>`Ctrl + G`（退出搜索）|
|光标移动|`Ctrl + A`（行首）<br>`Ctrl + E`（行尾）<br>`Ctrl + B`（后退）<br>`Ctrl + F`（前进）|
|删除|`Ctrl + K`（删除到行尾）<br>`Ctrl + U`（删除到行首）<br>`Ctrl + W`（删除前一个单词）|
|清屏|`Ctrl + L` 或 `clear`|
|查看命令参数帮助|`command --help` 或 `command -h`|

---

## 📝 注意事项

1. **权限问题**：某些操作需要sudo/root权限，如修改系统文件、安装软件等。使用 `$ sudo command` 提权执行。
2. **备份重要数据**：执行删除或覆盖操作前请确认路径正确，建议先使用 `-i` 参数确认。
3. **命令别名**：常用命令可创建别名提高效率（如 `alias ll='ls -l'`），别名通常存放在 `~/.bashrc` 或 `~/.zshrc` 中。
4. **环境变量**：
   - 查看当前环境变量使用 `$ env` 或 `$ printenv`
   - 临时设置变量：`$ VAR=value command`
   - 永久设置：添加到 `~/.bashrc` 或 `~/.profile`
5. **路径通配符**：
   - `*` 匹配任意字符（如 `*.txt`）
   - `?` 匹配单个字符
   - `[]` 匹配括号内的任意字符
6. **命令连接**：
   - `cmd1 && cmd2`（cmd1成功才执行cmd2）
   - `cmd1 || cmd2`（cmd1失败才执行cmd2）
   - `cmd1 | cmd2`（cmd1的输出作为cmd2的输入）
   - `cmd1 ; cmd2`（顺序执行）
7. **Tab补全**：输入命令或文件名时按 `Tab` 键自动补全，连续按两次可显示所有可能选项。
8. **使用引号**：包含空格或特殊字符的路径/字符串需用引号括起来，如 `"my file.txt"`、`'string'`。