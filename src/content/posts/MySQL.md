---
title: MySQL
published: 2025-03-17 21:00:00
category: 编程
tags: [数据库, MySQL, SQL]
---

# MySQL数据库

## 📋 目录

- [MySQL简介](#mysql简介)
- [在Windows安装](#在windows安装)
- [登录MySQL](#登录mysql)
- [MySQL用户设置](#mysql用户设置)
- [管理MySQL](#管理mysql)
- [数据类型](#数据类型)
- [单表数据查询](#单表数据查询)
- [多表数据查询](#多表数据查询)
- [索引与约束](#索引与约束)
- [事务与锁](#事务与锁)
- [视图与存储过程](#视图与存储过程)
- [数据库备份与恢复](#数据库备份与恢复)
- [性能优化](#性能优化)
- [最佳实践](#最佳实践)
- [常见问题](#常见问题)
- [附录：MySQL 8.0 新特性](#附录mysql-80-新特性)

---

## MySQL简介

MySQL 是一个关系型数据库管理系统，由瑞典 MySQL AB 公司开发，目前属于 Oracle 公司。MySQL 是一种关联数据库管理系统，关联数据库将数据保存在不同的表中，而不是将所有数据放在一个大仓库内，这样就增加了速度并提高了灵活性。

## 在Windows安装

去官网下载[MySQL官网](https://dev.mysql.com/downloads/mysql/)建议选择LTS(长期支持版本)，里面有安装程序和ZIP压缩包

安装程序下载之后直接安装就行

而ZIP压缩包，下载下来找个位置直接解压(例:D:\web\mysql)

然后在该文件夹下创建my.ini配置文件，编辑my.ini文件

```ini
[client]
# 设置mysql客户端默认字符集,utf8mb4支持中文
default-character-set=utf8mb4

[mysqld]
# 设置3306端口
port=3306
# 设置mysql的安装目录
basedir=D:\web\mysql
# 设置 mysql数据库的数据的存放目录，MySQL 8+ 不需要以下配置，系统自己生成即可，否则有可能报错
datadir=D:\web\mysql\data
# 允许最大连接数
max_connections=20
# 服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8mb4
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
```

然后用管理员身份打开cmd命令行

如果数据库文件放到了C盘以外，cmd中切换盘符的指令为

```
D:
```

切换到对应的盘符然后再输

```cmd
cd D:\web\mysql\bin
```

初始化数据库

```cmd
mysqld --initialize --console
```

执行完成后，会输出root用户的初始默认密码如：

```
...
2018-04-20T02:35:05.464644Z 5 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: APWCY5ws&hjQ
...
```

**`APWCY5ws&hjQ`** 就是初始密码，后续登录需要用到，也可以在登陆后修改密码。

输入以下安装命令

```cmd
mysqld install
```

然后将数据库的bin文件夹路径添加环境变量

启动mysql服务，输入指令

```cmd
net start mysql
```

指令不行的话，就手动打开服务页面自己手动启动MySQL服务

## 在 Linux 安装（CentOS/Ubuntu）

### Ubuntu / Debian 系列

```bash
# 更新软件源
sudo apt update

# 安装 MySQL 服务器
sudo apt install -y mysql-server

# 查看运行状态
sudo systemctl status mysql

# 安全配置（设置root密码、删除匿名用户等）
sudo mysql_secure_installation

# 登录 MySQL（安装后默认用系统用户认证）
sudo mysql
```

安装完成后，进入 MySQL 修改 root 密码：

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY '你的密码';
FLUSH PRIVILEGES;
```

### CentOS / RHEL 系列

```bash
# 添加 MySQL 官方仓库
sudo yum install -y https://dev.mysql.com/get/mysql80-community-release-el7-7.noarch.rpm

# 安装 MySQL 8.0
sudo yum install -y mysql-community-server

# 启动并设置开机自启
sudo systemctl start mysqld
sudo systemctl enable mysqld

# 获取初始临时密码
sudo grep 'temporary password' /var/log/mysqld.log

# 用临时密码登录
mysql -u root -p

# 修改密码
ALTER USER 'root'@'localhost' IDENTIFIED BY '你的密码';
FLUSH PRIVILEGES;
```

### macOS 安装

```bash
# 使用 Homebrew 安装
brew install mysql

# 启动服务
brew services start mysql
```

## 登录MySQL

```cmd
mysql -h 主机名 -u 用户名 -p
```

参数说明：

- **-h** : 指定客户端所要登录的 MySQL 主机名, 登录本机(localhost 或 127.0.0.1)该参数可以省略;
- **-u** : 登录的用户名;
- **-p** : 告诉服务器将会使用一个密码来登录, 如果所要登录的用户名密码为空, 可以忽略此选项。

退出的话就输入**`quit`**或者**`exit`**或者**`\q`**

------

## MySQL用户设置

### 创建用户

```sql
CREATE USER 'username'@'host' IDENTIFIED BY 'password';
```

- `username`：用户名。
- `host`：指定用户可以从哪些主机连接。例如，`localhost` 仅允许本地连接，`%` 允许从任何主机连接。
- `password`：用户的密码。

### 授权权限

创建用户后，你需要授予他们访问权限，使用 **GRANT** 命令来授予权限：

```sql
GRANT privileges ON database_name.* TO 'username'@'host';
```

- `privileges`：所需的权限，如 `ALL PRIVILEGES`、`SELECT`、`INSERT`、`UPDATE`、`DELETE` 等。
- `database_name.*`：表示对某个数据库或表授予权限。`database_name.*` 表示对整个数据库的所有表授予权限，`database_name.table_name` 表示对指定的表授予权限。
- `TO 'username'@'host'`：指定授予权限的用户和主机。

### 刷新权限

授予或撤销权限后，需要刷新权限使更改生效：

```sql
FLUSH PRIVILEGES;
```

### 查看用户权限

要查看特定用户的权限，可以使用以下命令：

```sql
SHOW GRANTS FOR 'username'@'host';
```

### 撤销权限

要撤销用户的权限，使用 REVOKE 命令：

```sql
REVOKE privileges ON database_name.* FROM 'username'@'host';
```

### 删除用户

如果需要删除用户，可以使用以下命令：

```sql
DROP USER 'username'@'host';
```

------

## 管理MySQL

⭐为所有列（列是字段，行是记录）

所有代码不区分大小写(大写是为了方便区分)

### 查看数据库

```sql
SHOW DATABASES;
```

### 创建数据库

```sql
CREATE DATABASE 数据库名;
```

### 选择数据库

```sql
USE 数据库名;
```

### 创建数据表

```sql
CREATE TABLE 表名(
    column1 datatype,
    column2 datatype,
    ...
);
```

例子：

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    birthdate DATE,
    is_active BOOLEAN DEFAULT TRUE
);
```

- `id`: 用户 id，整数类型，自增长，作为主键。
- `username`: 用户名，变长字符串，不允许为空。
- `email`: 用户邮箱，变长字符串，不允许为空。
- `birthdate`: 用户的生日，日期类型。
- `is_active`: 用户是否已经激活，布尔类型，默认值为 true。

### 查询当前数据库中所有表

```sql
SHOW TABLES;
```

### 查询表结构

```sql
DESC 表名;
```

### 查询指定表的建表语句

```sql
SHOW CREATE TABLE 表名;
```

### 在表中添加数据

```sql
INSERT INTO 表名(字段1,字段2，...)VALUES(要添加的数据);
```

### 查看所有的列

```sql
SELECT * FROM 表名;
```

### 更新数据

```sql
UPDATE 表名 SET 字段 1=值 1, 字段 2=值 2 WHERE 条件;
```

示例：

```sql
-- 更新单个字段
UPDATE users SET email = 'new@example.com' WHERE id = 1;

-- 更新多个字段
UPDATE users SET email = 'new@example.com', username = 'newname' WHERE id = 1;

-- 批量更新
UPDATE users SET is_active = FALSE WHERE birthdate < '2000-01-01';
```

**注意**：UPDATE 语句一定要加 WHERE 条件，否则会更新表中所有记录！

### 删除数据

```sql
DELETE FROM 表名 WHERE 条件;
```

示例：

```sql
-- 删除单条记录
DELETE FROM users WHERE id = 1;

-- 删除多条记录
DELETE FROM users WHERE is_active = FALSE;

-- 删除所有记录（慎用）
DELETE FROM users;
```

**注意**：DELETE 语句不加 WHERE 条件会删除表中所有记录，但表结构保留。

### 修改表结构

#### 添加列

```sql
ALTER TABLE 表名 ADD COLUMN 列名 数据类型 [约束];
```

示例：

```sql
ALTER TABLE users ADD COLUMN phone VARCHAR(20);
ALTER TABLE users ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
```

#### 修改列

```sql
ALTER TABLE 表名 MODIFY COLUMN 列名 新数据类型;
-- 或修改列名
ALTER TABLE 表名 CHANGE COLUMN 旧列名 新列名 数据类型;
```

示例：

```sql
-- 修改数据类型
ALTER TABLE users MODIFY COLUMN email VARCHAR(200);

-- 修改列名
ALTER TABLE users CHANGE COLUMN username nickname VARCHAR(50);
```

#### 删除列

```sql
ALTER TABLE 表名 DROP COLUMN 列名;
```

示例：

```sql
ALTER TABLE users DROP COLUMN phone;
```

#### 添加主键

```sql
ALTER TABLE 表名 ADD PRIMARY KEY (列名);
```

#### 删除主键

```sql
ALTER TABLE 表名 DROP PRIMARY KEY;
```

### 删除表

```sql
DROP TABLE [IF EXISTS] 表名;
```

示例：

```sql
DROP TABLE IF EXISTS users;
```

### 删除数据库

```sql
DROP DATABASE [IF EXISTS] 数据库名;
```

示例：

```sql
DROP DATABASE IF EXISTS testdb;
```

------

## 数值类型

数值类型用于存储数字型数据，包括整数类型（TINYINT，SMALLINT，MEDIUMINT，INT，BIGINT）、浮点数类型（FLOAT，BOUBLE）和定点数类型（DECIMAL）

### 整数类型

| 数据类型  | 所占字节 | 存储范围(有符号) | 存储范围(无符号) |
| --------- | -------- | ---------------- | ---------------- |
| TINYINT   | 1字节    | -2^7 ~ 2^7 -1    | 0 ~ 2^8 -1       |
| SMALLINT  | 2字节    | -2^15 ~ 2^15 -1  | 0 ~ 2^16 -1      |
| MEDIUMINT | 3字节    | -2^23 ~ 2^23 -1  | 0 ~ 2^24 -1      |
| INT       | 4字节    | -2^31 ~ 2^31 -1  | 0 ~ 2^32 -1      |
| BIGINT    | 8字节    | -2^63 ~ 2^63 -1  | 0 ~ 2^ 64 -1     |

### 小数类型

| 数据类型 | 占用字节 |                    负数存储范围                     |                    非负数存储范围                    |
| :------: | :------: | :-------------------------------------------------: | :--------------------------------------------------: |
|  FLOAT   |  4字节   |      -3.402 823 466 E+38 ~ -1.175 494 351 E-38      |         0和1.175494351E-38 ~ 3.402823466E+38         |
|  DOUBLE  |  8字节   | -1.7976931348623157E+308 ~ -2.2250738585072014E-308 | 0和2.2250738585072014E-308 ~ 1.7976931348623157E+308 |
| DECIMAL  | M+2字节  |                    与DOUBLE相同                     |                     与DOUBLE相同                     |

### 日期和时间类型

|     数据类型      |     占用字节     |      存储格式       |                    存储范围                     |
| :---------------: | :--------------: | :-----------------: | :---------------------------------------------: |
|       YEAR        |      1字节       |        YYYY         |                    1901~2155                    |
|       DATE        |      3字节       |     YYYY-MM-DD      |              1000-01-01~9999-12-31              |
|       TIME        | 3字节+小数秒存储 |      HH:MM:SS       |              -838:59:59~838:59:59               |
|     DATETIME      | 5字节+小数秒存储 | YYYY-MM-DD HH:MM:SS |     1000-01-01 00:00:00~9999-12-31 23:59:59     |
| TIMESTAMP(时间戳) | 4字节+小数秒存储 | YYYY-MM-DD HH:MM:SS | 1970-01-01 00:00:01 UTC~2038-01-19 03:14:07 UTC |

### 字符串类型

|   类型名称   |     占用字节      |   存储范围   |
| :----------: | :---------------: | :----------: |
|   CHAR(M)    |      M*w字节      |   0≤M≤255    |
|  VARCHAR(M)  |      L+1字节      |  0≤M≤65535   |
|  BINARY(N)   |       N字节       |   0≤N≤255    |
| VARBINARY(N) |      L+1字节      |  0≤N≤65535   |
|     BLOB     |      L+2字节      |    L<2^16    |
|     TEXT     |      L+2字节      |    L<2^16    |
|     ENUM     |     1或2字节      |   0~65535    |
|     SET      | 1、2、3、4或8字节 | 最多64个成员 |

注：M表示非二进制字符串类型的声明列长度(以字符为单位)，L表示给定字符串值的实际字节长度(以字节为单位)

### 枚举与集合类型

**ENUM**: 枚举类型，用于存储单一值，可以选择一个预定义的集合。

**SET**: 集合类型，用于存储多个值，可以选择多个预定义的集合。

------

## 单表数据查询

### 简单数据记录查询

#### 查询所有字段

使用通配符`*`为所有列

```sql
SELECT * FROM 数据表;
```

#### 查询指定字段

```sql
SELECT 字段1,字段2,... FROM 数据表;
```

#### 查询指定记录

当想要查询数据库中符合一定条件的数据时，可以使用WHERE子句对表中的记录进行筛选，语法格式如下：

```sql
SELECT 字段1,字段2,... FROM 数据表 WHERE 条件;
```

WHERE子句中可以使用多条条件判断符

| 条件判断符 |    说明    |
| :--------: | :--------: |
|     =      |    等于    |
|     <      |    小于    |
|     >      |    大于    |
|   <>(!=)   |   不等于   |
|     <=     | 小于或等于 |
|     >=     | 大于或等于 |

#### 多条件查询

1. 使用`AND`关键字查询：只有符合所有条件的记录才会被返回

   ```sql
   -- 查询价格在 5 到 50 之间的商品信息。
   SELECT * FROM goods WHERE price >=5 and price <=50;
   ```

2. 使用`OR`关键字查询：只需要符合所有条件中的任意一条才会返回

   ```sql
   -- 查询库存数量大于 20 或者价格超过 100 的商品信息。
   SELECT * FROM goods WHERE num > 20 or price > 100;
   ```

3. 使用`IN`关键字查询：可以查询字段值等于指定集合中任意一个值的记录

   ```sql
   -- 查询goods表中id值为1和3的记录
   SELECT * FROM goods WHERE id IN(1,3);
   ```
   
   也可以和`OR`关键字一起使用
   
   ```sql
   -- 查询goods表中id值为1或7的记录
   SELECT * FROM goods WHERE id=1 OR id=7;
   ```
   
   也可以和`NOT`关键字一起使用
   
   ```sql
   -- 查询goods表中id值不为1和3的记录
   SELECT * FROM goods WHERE id NOT IN (1,3);
   ```

#### 查询空值

`IS NULL` 关键字，用于查询字段值为NULL的记录

```sql
-- 查询库存数量不为 NULL 的商品信息。
SELECT * FROM goods where num is not NULL;
```

#### 查询结果不重复

可以用`DISTINCT`关键字去重

```sql
-- 查询表中所有不同类型的商品，并去除重复项。
SELECT DISTINCT type from goods;
```

#### 范围查询

使用`BETWEEN AND`关键字：用于查询字段值在某个范围内的记录

```sql
-- 查询goods表中price值为50到100的商品信息
SELECT * FROM goods WHERE price BETWEEN 50 AND 100;
```

#### 字符匹配查询

使用`LIKE`关键字：该查询又称模糊查询，通常用于查询字段值包括某些字符的记录

```sql
-- 查询goods表中以"糖"字结尾的记录
SELECT * FROM goods WHERE name LIKE '%糖';
```

通配符`_`只能匹配一个字符

```sql
SELECT * FROM goods WHERE name LIKE '_瓜';
```

#### 排序查询

使用`ORDER BY`关键字：把查询结果按照指定的顺序排列

可以进行单字段排序，也可以进行多字段排序

```sql
-- 单字段排序
SELECT id,name FROM goods ORDER BY id;
-- 多字段排序
SELECT * FROM goods ORDER BY price,num;
```

使用`DESC`关键字：对查询的结果进行降序排序

```sql
SELECT * FROM goods ORDER BY price DESC;
```

当按照多字段进行排序的时候，也可以使用`DESC`关键字进行降序排序

```sql
-- 查询goods表中所有记录，并按照price字段和num字段先降序后升序排序
SELECT * FROM goods ORDER BY price DESC,num;
```

#### 限制查询结果的数量

使用`LIMIT`关键字：可以限制查询结果的数量

```sql
-- 查询goods表中前3条记录
SELECT * FROM goods LIMIT 3;
-- 查询goods表中从第三条记录开始，总条数为3的记录(也就是查询第3，4，5条记录)
SELECT * FROM goods LIMIT 2,3;
```

### 聚合函数和分组数据记录查询

#### 聚合函数

一共有五种分别为

- COUNT( )：计算表中记录的条数
- SUM( )：求和
- AVG( )：求平均值
- MAX( )：求最大值
- MIN( )：求最小值

`COUNT()`函数用于统计数据记录条数，返回表中总的记录条数或符合特定条件的记录条数

使用方法有两种

- `COUNT(*)`：计算表中总的记录数，不管表字段中是否包含NULL值
- `COUNT(col_name)`：计算表中指定字段的记录数，忽略NULL值

#### 分组查询

 分组查询是将查询结果按照某个或多个字段进行分组，MySQL是使用`GROUP BY`语句对数据进行分组

1. 简单分组查询

   将`GROUP BY`关键字与聚合函数`COUNT()`一起使用可以查询每组的数量

   ```sql
   -- 将goods表中的记录按照type字段进行分组，并统计每组的数量
   SELECT type,count(*) FROM goods GROUP BY type; 
   ```
   需要将每种类型中包含的商品名称显示出来，可以使用`group_concat()`函数

   ```sql
   -- 将goods表中的记录按照type字段进行分组，并显示每组中的商品名称
   SELECT type,group_concat(name) FROM goods GROUP BY type;
   ```

2. 使用`HAVING`过滤分组后数据

   `GROUP BY`和`HAVING`一起使用，可以指定显示记录所需满足的条件，只有满足条件的分组才会被显示

   ```sql
   -- 将goods表中的记录按照type字段分组并统计每组的数量，然后只取商品数量大于1的分组
   SELECT type,count(*) FROM goods GROUP BY type HAVING COUNT(*)>1;
   ```

3. 使用多个字段进行分组

   使用`GROUP BY`不止可以按照一个字段进行分组，还可以按多个字段进行分组，分组层次从左到右，按照第一个字段进行分组，然后对第一个字段值相同的记录，再根据第二个字段进行分组，以此类推

   ```sql
   -- 将goods表中的记录按照type和num字段进行分组并统计，显示每个分组中商品类别、库存、商品名称和商品数量
   SELECT type,num,group_concat(name),count(name) FROM goods GROUP BY type,num;
   ```

## 多表数据记录查询

### 连接查询

#### 内连接查询

普通内连接查询：

```sql
-- 两个表之间的关系通过 WHERE 连接
SELECT staff_id,name,sex,section_title,phone_number FROM staff,section WHERE staff.section_id = section.section_id;
```

显式内连接查询：

```sql
SELECT staff_id,name,sex,section_title,phone_number 
FROM staff 
INNER JOIN section ON staff.section_id = section.section_id;
```

自连接查询：

```sql
-- 从 staff 表中查询薪资低于 15000 的员工的 staff_id、name、money
SELECT s1.staff_id,s1.name,s2.money FROM staff AS s1 
INNER JOIN staff AS s2 ON s1.staff_id = s2.staff_id AND s2.money < 15000;
```

#### 外连接查询

外连接查询(OUTER JOIN)是以一张表为基表，根据连接条件，与另一张表的每一行进行匹配

1. **左外连接 (LEFT JOIN)**
   返回左表中的所有记录，以及右表中匹配的行

   ```sql
   -- 查询所有员工信息，包括部门名称（没有部门的员工部门显示为NULL）
   SELECT e.name, d.department_name
   FROM employees e
   LEFT JOIN departments d ON e.dept_id = d.id;
   ```

2. **右外连接 (RIGHT JOIN)**
   返回右表中的所有记录，以及左表中匹配的行

   ```sql
   -- 查询所有部门信息，包括员工（没有员工的部门员工信息显示为NULL）
   SELECT e.name, d.department_name
   FROM employees e
   RIGHT JOIN departments d ON e.dept_id = d.id;
   ```

3. **全外连接 (FULL OUTER JOIN)**
   返回两个表中的所有记录，匹配的行合并，没有匹配的显示为NULL

   ```sql
   -- MySQL不支持FULL OUTER JOIN，可以用UNION实现
   SELECT e.name, d.department_name
   FROM employees e
   LEFT JOIN departments d ON e.dept_id = d.id
   UNION
   SELECT e.name, d.department_name
   FROM employees e
   RIGHT JOIN departments d ON e.dept_id = d.id;
   ```

#### 子查询

子查询是将一个查询语句嵌套在另一个查询语句中

1. **标量子查询**：返回单一值

   ```sql
   -- 查询工资高于平均工资的员工
   SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);
   ```

2. **列子查询**：返回一列值

   ```sql
   -- 查询在"销售部"工作的所有员工
   SELECT * FROM employees WHERE dept_id IN (SELECT id FROM departments WHERE name = '销售部');
   ```

3. **表子查询**：返回多行多列

   ```sql
   -- 查询每个部门中工资最高的员工
   SELECT * FROM employees WHERE (dept_id, salary) IN (
       SELECT dept_id, MAX(salary) FROM employees GROUP BY dept_id
   );
   ```

---

## 索引与约束

### 索引

索引是用于加速数据检索的数据结构

#### 创建索引

```sql
-- 创建普通索引
CREATE INDEX idx_name ON employees(name);

-- 创建唯一索引
CREATE UNIQUE INDEX idx_email ON employees(email);

-- 创建复合索引
CREATE INDEX idx_dept_salary ON employees(dept_id, salary);

-- 在创建表时添加索引
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    INDEX idx_name (name)
);
```

#### 查看索引

```sql
SHOW INDEX FROM 表名;
```

#### 删除索引

```sql
DROP INDEX idx_name ON 表名;
```

### 约束

约束用于保证数据的完整性和一致性

| 约束类型 | 说明 | 示例 |
|---------|------|------|
| PRIMARY KEY | 主键，唯一且非空 | `id INT PRIMARY KEY` |
| NOT NULL | 非空约束 | `name VARCHAR(50) NOT NULL` |
| UNIQUE | 唯一约束 | `email VARCHAR(100) UNIQUE` |
| DEFAULT | 默认值 | `status VARCHAR(20) DEFAULT 'active'` |
| FOREIGN KEY | 外键约束 | `FOREIGN KEY (dept_id) REFERENCES departments(id)` |
| CHECK | 检查约束（MySQL 8.0.16+） | `CHECK (age >= 18)` |

#### 添加约束

```sql
-- 添加主键
ALTER TABLE 表名 ADD PRIMARY KEY (列名);

-- 添加外键
ALTER TABLE 表名 ADD FOREIGN KEY (列名) REFERENCES 关联表(关联列);

-- 添加唯一约束
ALTER TABLE 表名 ADD UNIQUE (列名);
```

---

## 事务与锁

### 事务

事务是一组SQL语句的执行单元，要么全部成功，要么全部失败

#### 事务控制语句

```sql
-- 开启事务
START TRANSACTION;

-- 或
BEGIN;

-- 提交事务
COMMIT;

-- 回滚事务
ROLLBACK;

-- 设置保存点
SAVEPOINT 保存点名称;

-- 回滚到保存点
ROLLBACK TO SAVEPOINT 保存点名称;
```

#### 事务特性（ACID）

- **A**tomicity（原子性）：事务是最小执行单位，不可分割
- **C**onsistency（一致性）：事务执行前后，数据库状态保持一致
- **I**solation（隔离性）：并发事务之间相互隔离
- **D**urability（持久性）：事务提交后，对数据库的修改永久保存

#### 事务隔离级别

```sql
-- 查看当前隔离级别
SELECT @@transaction_isolation;

-- 设置隔离级别
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

| 隔离级别 | 脏读 | 不可重复读 | 幻读 |
|---------|------|-----------|------|
| READ UNCOMMITTED | √ | √ | √ |
| READ COMMITTED | × | √ | √ |
| REPEATABLE READ | × | × | √ |
| SERIALIZABLE | × | × | × |

### 锁

锁用于控制并发访问

```sql
-- 表锁
LOCK TABLES 表名 READ;   -- 读锁
LOCK TABLES 表名 WRITE;  -- 写锁
UNLOCK TABLES;           -- 解锁

-- 行锁（在事务中使用）
SELECT * FROM 表名 WHERE id = 1 FOR UPDATE;  -- 排他锁
SELECT * FROM 表名 WHERE id = 1 LOCK IN SHARE MODE;  -- 共享锁
```

---

## 视图与存储过程

### 视图

视图是一个虚拟表，不存储数据，只存储查询定义

#### 创建视图

```sql
CREATE VIEW view_name AS
SELECT column1, column2
FROM table_name
WHERE condition;
```

#### 查看视图

```sql
-- 查看视图定义
SHOW CREATE VIEW view_name;

-- 查看所有视图
SELECT * FROM information_schema.VIEWS;
```

#### 更新和删除视图

```sql
-- 更新视图（可更新的条件：单表、无聚合、无DISTINCT等）
CREATE OR REPLACE VIEW view_name AS new_query;

-- 删除视图
DROP VIEW IF EXISTS view_name;
```

### 存储过程

存储过程是一组预编译的SQL语句，存储在数据库中

#### 创建存储过程

```sql
DELIMITER $$

CREATE PROCEDURE procedure_name(IN param1 INT, OUT param2 VARCHAR(50))
BEGIN
    DECLARE variable1 INT DEFAULT 0;
    
    -- SQL语句
    SELECT COUNT(*) INTO variable1 FROM table_name WHERE id = param1;
    
    SET param2 = CONCAT('Total: ', variable1);
END$$

DELIMITER ;
```

#### 调用存储过程

```sql
-- 调用存储过程
CALL procedure_name(1, @result);

-- 查看结果
SELECT @result;
```

#### 删除存储过程

```sql
DROP PROCEDURE IF EXISTS procedure_name;
```

### 存储函数

存储函数与存储过程类似，但必须返回单个值

```sql
DELIMITER $$

CREATE FUNCTION function_name(param1 INT)
RETURNS VARCHAR(50)
DETERMINISTIC
BEGIN
    DECLARE result VARCHAR(50);
    SELECT name INTO result FROM table_name WHERE id = param1;
    RETURN result;
END$$

DELIMITER ;

-- 调用
SELECT function_name(1);
```

---

## 常用命令速查

| 命令 | 说明 |
|------|------|
| `mysql -u root -p` | 登录 MySQL |
| `SHOW DATABASES;` | 查看所有数据库 |
| `CREATE DATABASE dbname;` | 创建数据库 |
| `USE dbname;` | 选择数据库 |
| `SHOW TABLES;` | 查看所有表 |
| `DESC tablename;` | 查看表结构 |
| `SELECT * FROM table;` | 查询所有数据 |
| `INSERT INTO table VALUES(...);` | 插入数据 |
| `UPDATE table SET col=val WHERE...;` | 更新数据 |
| `DELETE FROM table WHERE...;` | 删除数据 |
| `FLUSH PRIVILEGES;` | 刷新权限 |

---

## 数据库备份与恢复

### 使用 mysqldump 备份

#### 备份单个数据库

```bash
mysqldump -u root -p 数据库名 > 备份文件.sql
```

示例：

```bash
mysqldump -u root -p mydb > mydb_backup.sql
```

#### 备份多个数据库

```bash
mysqldump -u root -p --databases db1 db2 > backup.sql
```

#### 备份所有数据库

```bash
mysqldump -u root -p --all-databases > all_backup.sql
```

#### 只备份表结构（不备份数据）

```bash
mysqldump -u root -p --no-data 数据库名 > structure.sql
```

#### 只备份数据（不备份表结构）

```bash
mysqldump -u root -p --no-create-info 数据库名 > data.sql
```

### 恢复数据库

```bash
mysql -u root -p 数据库名 < 备份文件.sql
```

示例：

```bash
mysql -u root -p mydb < mydb_backup.sql
```

### 使用 SQL 命令备份和恢复

#### 导出查询结果到文件

```sql
SELECT * INTO OUTFILE '/path/to/file.csv'
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
FROM 表名;
```

#### 从文件导入数据

```sql
LOAD DATA INFILE '/path/to/file.csv'
INTO TABLE 表名
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n';
```

---

## 性能优化

### 索引优化

#### 适合创建索引的场景

- 主键和外键
- 经常用于 WHERE 子句的列
- 经常用于 JOIN 的列
- 经常用于 ORDER BY 的列
- 经常用于 GROUP BY 的列

#### 不适合创建索引的场景

- 表记录太少
- 经常增删改的表
- 数据重复且分布均匀的列
- 频繁更新的列

### 查询优化

#### 使用 EXPLAIN 分析查询

```sql
EXPLAIN SELECT * FROM users WHERE id = 1;
```

EXPLAIN 结果说明：

| 列名 | 说明 |
|------|------|
| id | SELECT 识别符，数字越大优先级越高 |
| select_type | SELECT 类型（SIMPLE、PRIMARY、SUBQUERY 等） |
| table | 输出行所引用的表 |
| type | 连接类型（system > const > eq_ref > ref > range > index > ALL） |
| possible_keys | 可能用到的索引 |
| key | 实际使用的索引 |
| rows | 估计需要扫描的行数 |
| Extra | 额外信息（Using index、Using where、Using temporary 等） |

#### 优化建议

1. **避免 SELECT ***：只查询需要的字段
2. **使用 LIMIT**：限制返回结果数量
3. **避免全表扫描**：确保 WHERE 条件使用索引
4. **优化 JOIN**：小表驱动大表，关联字段加索引
5. **避免子查询**：能用 JOIN 就不用子查询
6. **使用 UNION ALL**：比 UNION 效率高（不去重）

### 表优化

#### 优化表

```sql
OPTIMIZE TABLE 表名;
```

#### 分析表

```sql
ANALYZE TABLE 表名;
```

#### 检查表

```sql
CHECK TABLE 表名;
```

### 配置优化

#### 查看当前配置

```sql
SHOW VARIABLES;
SHOW VARIABLES LIKE 'max_connections';
```

#### 修改配置（临时）

```sql
SET GLOBAL max_connections = 500;
```

#### 修改配置（永久）

编辑 `my.ini` 或 `my.cnf` 文件：

```ini
[mysqld]
max_connections = 500
innodb_buffer_pool_size = 1G
query_cache_size = 64M
```

---

## 最佳实践

### 命名规范

- 数据库名、表名、字段名使用**小写字母**和**下划线**
- 避免使用 MySQL 保留字
- 使用有意义的名称

### 数据类型选择

- 优先选择**小**的数据类型
- 整数比字符串效率高
- 使用合适的长度，避免浪费空间

### 字符集

- 推荐使用 `utf8mb4`（支持 emoji 和更多字符）
- 排序规则推荐 `utf8mb4_0900_ai_ci`（MySQL 8.0+）

### 安全建议

1. 不要使用 root 用户连接应用程序
2. 为不同应用创建独立用户和数据库
3. 定期修改密码
4. 限制用户权限（最小权限原则）
5. 定期备份数据

### 性能建议

1. 使用连接池
2. 开启慢查询日志
3. 定期分析和优化表
4. 避免在数据库中进行复杂计算
5. 使用缓存（如 Redis）减轻数据库压力

---

## 常见问题

### 1. 忘记 root 密码怎么办？

1. 停止 MySQL 服务
2. 使用 `--skip-grant-tables` 参数启动 MySQL
3. 免密码登录后修改密码
4. 重启 MySQL 服务

### 2. 如何查看 MySQL 版本？

```sql
SELECT VERSION();
```

### 3. 如何查看当前连接数？

```sql
SHOW STATUS LIKE 'Threads_connected';
SHOW VARIABLES LIKE 'max_connections';
```

### 4. 如何杀掉长时间运行的查询？

```sql
-- 查看正在运行的进程
SHOW PROCESSLIST;

-- 杀掉指定进程
KILL 进程 ID;
```

### 5. 如何处理中文乱码？

```sql
-- 查看字符集设置
SHOW VARIABLES LIKE 'character%';

-- 临时修改
SET NAMES utf8mb4;

-- 永久修改：在 my.ini 中添加
[client]
default-character-set=utf8mb4

[mysql]
default-character-set=utf8mb4

[mysqld]
character-set-server=utf8mb4
collation-server=utf8mb4_0900_ai_ci
```

---

## 附录：MySQL 8.0 新特性

### 1. 窗口函数

```sql
-- 排名
SELECT name, salary, RANK() OVER (ORDER BY salary DESC) as rank FROM employees;

-- 累计求和
SELECT date, sales, SUM(sales) OVER (ORDER BY date) as total FROM sales;
```

### 2. 通用表表达式（CTE）

```sql
WITH RECURSIVE cte AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM cte WHERE n < 10
)
SELECT * FROM cte;
```

### 3. JSON 增强

```sql
-- 创建 JSON 字段
CREATE TABLE users (
    id INT PRIMARY KEY,
    info JSON
);

-- 查询 JSON 数据
SELECT info->'$.name' FROM users WHERE id = 1;
```

### 4. 隐藏索引

```sql
-- 隐藏索引（优化器不使用，但不删除）
ALTER TABLE 表名 ALTER INDEX 索引名 INVISIBLE;

-- 显示索引
ALTER TABLE 表名 ALTER INDEX 索引名 VISIBLE;
```
