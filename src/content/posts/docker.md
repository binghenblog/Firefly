---
title: Docker
published: 2026-04-20 9:00:00
updated: 2026-05-10 20:00:00
category: Linux
---

实例系统：CentOS7

### Docker基础命令

```shell
# 拉取镜像（如官方Nginx镜像）
docker pull nginx

# 运行容器（-d 后台运行，-p 映射端口）
docker run -d -p 80:80 nginx

# 查看运行中的容器
docker ps

# 构建镜像（基于当前目录的Dockerfile）
docker build -t my-app .

# 进入容器内部
docker exec -it <容器ID> /bin/bash
```

### 安装docker

1. 卸载旧版本（可选，如果之前安装过，建议先清理干净）

```shell
sudo yum remove -y docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine
```

2. 安装依赖工具

```shell
sudo yum install -y yum-utils
```

3. 添加Docker官方仓库（使用清华源）

```shell
sudo yum-config-manager --add-repo https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/docker-ce.repo
```

4. 安装 Docker 引擎

```shell
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

5. 启动 Docker 并设置开机自启动

```shell
sudo systemctl start docker
sudo systemctl enable docker
```

6. 配置国内镜像加速
```shell
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
  "https://docker.xuanyuan.me",
  "https://docker.m.daocloud.io",
  "https://docker.mirrors.ustc.edu.cn/",
  "https://hub-mirror.c.163.com/"
   ],
   "log-driver": "json-file",
   "log-opts": {
  "max-size": "100m",
  "max-file": "3"
   }
 }
EOF
```

7. 重启Docker

```shell
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### Dockerfile 编写指南

Dockerfile 是用于定义镜像构建过程的脚本，常用指令如下：

| 指令 | 用途 | 示例 |
|------|------|------|
| `FROM` | 指定基础镜像 | `FROM node:18-alpine` |
| `WORKDIR` | 设置工作目录 | `WORKDIR /app` |
| `COPY` | 复制文件到镜像 | `COPY . .` |
| `RUN` | 在构建时执行命令 | `RUN npm install` |
| `EXPOSE` | 声明容器运行时监听的端口 | `EXPOSE 3000` |
| `ENV` | 设置环境变量 | `ENV NODE_ENV=production` |
| `CMD` | 设置容器启动时的默认命令 | `CMD ["node", "server.js"]` |
| `ENTRYPOINT` | 设置容器启动入口（可覆盖性不同） | `ENTRYPOINT ["python", "app.py"]` |
| `ARG` | 构建时变量 | `ARG VERSION=1.0` |
| `VOLUME` | 创建挂载点 | `VOLUME /data` |

#### Node.js 项目示例

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

#### Python 项目示例

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["gunicorn", "app:app", "-b", "0.0.0.0:8000"]
```

#### 多阶段构建示例

```dockerfile
# 第一阶段：编译
FROM golang:1.21 AS builder
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 go build -o server .

# 第二阶段：运行（极小镜像）
FROM alpine:3.19
RUN apk --no-cache add ca-certificates
COPY --from=builder /app/server /server
EXPOSE 8080
CMD ["/server"]
```

### Docker Compose 使用指南

Docker Compose 通过 `docker-compose.yml` 文件定义和运行多容器应用。

#### 基础示例：Web + 数据库

```yaml
version: "3.8"
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=db
      - DB_USER=root
      - DB_PASSWORD=secret
    depends_on:
      - db

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: myapp
    volumes:
      - db_data:/var/lib/mysql
    ports:
      - "3306:3306"

volumes:
  db_data:
```

#### 常用 Compose 命令

| 命令 | 说明 |
|------|------|
| `docker compose up -d` | 后台启动所有服务 |
| `docker compose down` | 停止并删除容器和网络 |
| `docker compose logs -f` | 实时查看日志 |
| `docker compose ps` | 查看服务状态 |
| `docker compose exec web bash` | 进入指定容器 |
| `docker compose build` | 重新构建镜像 |
| `docker compose restart` | 重启所有服务 |

### 卸载 docker

删除安装包：

```shell
yum remove docker-ce
```

删除镜像、容器、配置文件等内容：

```shell
rm -rf /var/lib/docker
```

### 常用的 Docker 客户端命令：

| **命令**              | **功能**                                         | **示例**                                   |
| :-------------------- | :----------------------------------------------- | :----------------------------------------- |
| `docker run`          | 启动一个新的容器并运行命令                       | `docker run -d ubuntu`                     |
| `docker ps`           | 列出当前正在运行的容器                           | `docker ps`                                |
| `docker ps -a`        | 列出所有容器（包括已停止的容器）                 | `docker ps -a`                             |
| `docker build`        | 使用 Dockerfile 构建镜像                         | `docker build -t my-image .`               |
| `docker images`       | 列出本地存储的所有镜像                           | `docker images`                            |
| `docker pull`         | 从 Docker 仓库拉取镜像                           | `docker pull ubuntu`                       |
| `docker push`         | 将镜像推送到 Docker 仓库                         | `docker push my-image`                     |
| `docker exec`         | 在运行的容器中执行命令                           | `docker exec -it container_name bash`      |
| `docker stop`         | 停止一个或多个容器                               | `docker stop container_name`               |
| `docker start`        | 启动已停止的容器                                 | `docker start container_name`              |
| `docker restart`      | 重启一个容器                                     | `docker restart container_name`            |
| `docker rm`           | 删除一个或多个容器                               | `docker rm container_name`                 |
| `docker rmi`          | 删除一个或多个镜像                               | `docker rmi my-image`                      |
| `docker logs`         | 查看容器的日志                                   | `docker logs container_name`               |
| `docker inspect`      | 获取容器或镜像的详细信息                         | `docker inspect container_name`            |
| `docker exec -it`     | 进入容器的交互式终端                             | `docker exec -it container_name /bin/bash` |
| `docker network ls`   | 列出所有 Docker 网络                             | `docker network ls`                        |
| `docker volume ls`    | 列出所有 Docker 卷                               | `docker volume ls`                         |
| `docker-compose up`   | 启动多容器应用（从 `docker-compose.yml` 文件）   | `docker-compose up`                        |
| `docker-compose down` | 停止并删除由 `docker-compose` 启动的容器、网络等 | `docker-compose down`                      |
| `docker info`         | 显示 Docker 系统的详细信息                       | `docker info`                              |
| `docker version`      | 显示 Docker 客户端和守护进程的版本信息           | `docker version`                           |
| `docker stats`        | 显示容器的实时资源使用情况                       | `docker stats`                             |
| `docker login`        | 登录 Docker 仓库                                 | `docker login`                             |
| `docker logout`       | 登出 Docker 仓库                                 | `docker logout`                            |

**常用选项说明:**

- **`-d`**：后台运行容器，例如 `docker run -d ubuntu`。
- **`-it`**：以交互式终端运行容器，例如 `docker exec -it container_name bash`。
- **`-t`**：为镜像指定标签，例如 `docker build -t my-image .`。
