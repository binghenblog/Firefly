---
title: OpenStack Train 云计算平台安装与管理指南
published: 2025-11-21 12:00:00
category: 云计算, 系统管理
---

# OpenStack Train 云计算平台安装指南

## 文档概述

本文档详细介绍了在openEuler 22.03-LTS-SP3系统上安装OpenStack Train版本的完整流程，包括环境准备、基础服务配置、核心组件安装等关键步骤。

## 前提准备

### 系统要求
- **操作系统**: openEuler-22.03-LTS-SP3-x86_64
- **OpenStack版本**: Train
- **硬件要求**: 
  - 控制节点: 4GB内存, 100GB磁盘, 2核CPU
  - 计算节点: 4GB内存, 100GB磁盘, 2核CPU

### 所需软件包
1. **系统镜像**: openEuler-22.03-LTS-SP3-x86_64-dvd.iso
   ```
   下载地址: https://www.openeuler.openatom.cn/zh/download/
   ```

2. **OpenStack本地仓库**: openStack-train.iso
   ```
   下载地址: https://pan.quark.cn/s/88ec2997a7ba?pwd=xk78
   ```

3. **测试镜像**: cirros-0.5.1-x86_64-disk.img
   ```
   下载地址: https://download.cirros-cloud.net/0.5.1/cirros-0.5.1-x86_64-disk.img
   ```

4. **远程管理工具**: MobaXterm
   ```
   下载地址: https://mobaxterm.mobatek.net/
   ```

5. **虚拟化平台**: VMware Workstation 17.6.0

## 1. 虚拟机环境配置

### 1.1 创建控制节点虚拟机

1. 打开VMware Workstation，选择"创建新的虚拟机"
2. 选择"自定义(高级)"配置
3. 选择"稍后安装操作系统"
4. 选择Linux操作系统，版本选择"openEuler 64位"
5. 设置虚拟机名称和存储位置
6. 配置处理器：2个处理器，每个处理器2个核心
7. 配置内存：4GB
8. 网络连接：选择"仅主机模式"
9. 选择I/O控制器类型：LSI Logic
10. 选择磁盘类型：SCSI
11. 选择"创建新虚拟磁盘"
12. 磁盘容量：100GB，选择"将虚拟磁盘存储为单个文件"

### 1.2 虚拟机硬件配置优化

1. 在虚拟机设置中，选择"自定义硬件"
2. 添加第二块网卡，选择"NAT模式"
3. 在处理器设置中，启用"虚拟化Intel VT-x/EPT或AMD-V/RVI"

### 1.3 网络配置

1. 在VMware菜单栏选择"编辑"→"虚拟网络编辑器"
2. 配置仅主机模式网络：子网地址192.168.10.0/24，启用DHCP
3. 配置NAT模式网络：子网地址192.168.20.0/24，启用DHCP

### 1.4 系统安装

1. 挂载openEuler系统镜像
2. 启动虚拟机，选择"Install openEuler 22.03-LTS-SP3"
3. 选择语言：中文-简体中文
4. 配置网络：
   - 打开ens33和ens34网卡
   - 设置主机名：controller
5. 设置root密码：openstack0#
6. 开始安装并重启系统

## 2. 基础环境配置

### 2.1 远程连接配置

1. 查看IP地址：
   ```bash
   ip a
   ```
   
2. 使用MobaXterm连接：
   - 新建SSH会话
   - 主机：192.168.10.100
   - 用户名：root
   - 密码：openstack0#

### 2.2 网络配置优化

配置静态IP地址：

```bash
# 进入网络配置目录
cd /etc/sysconfig/network-scripts/

# 配置ens33网卡（管理网络）
vi ifcfg-ens33
```

修改内容：
```ini
BOOTPROTO=static
IPADDR=192.168.10.100
PREFIX=24
GATEWAY=192.168.10.1
DNS1=8.8.8.8
```

```bash
# 配置ens34网卡（外部网络）
vi ifcfg-ens34
```

修改内容：
```ini
BOOTPROTO=static
IPADDR=192.168.20.100
PREFIX=24
GATEWAY=192.168.20.1
DNS1=8.8.8.8
```

重启网络服务：
```bash
nmcli con reload
nmcli con up ens34
nmcli con up ens33
```

### 2.3 主机名与域名解析

设置主机名：
```bash
hostnamectl set-hostname controller
```

配置本地域名解析：
```bash
vi /etc/hosts
```

添加内容：
```
192.168.10.100 controller
192.168.10.101 compute
```

测试连通性：
```bash
ping controller
ping compute
```

### 2.4 安全配置

关闭防火墙：
```bash
systemctl stop firewalld
systemctl disable firewalld
```

禁用SELinux：
```bash
vi /etc/selinux/config
```

修改内容：
```
SELINUX=disabled
```

临时禁用SELinux：
```bash
setenforce 0
```

### 2.5 计算节点配置

#### 节点配置规格
| 配置项 | 控制节点 | 计算节点 |
|--------|----------|----------|
| 主机名 | controller | compute |
| CPU | 2核 | 2核 |
| 内存 | 4GB | 4GB |
| 磁盘 | 100GB | 100GB |
| 管理网络 | 192.168.10.100 | 192.168.10.101 |
| 外部网络 | 192.168.20.100 | 192.168.20.101 |

#### 计算节点创建步骤

1. 在VMware中克隆控制节点虚拟机
2. 选择"完整克隆"
3. 修改网络配置：
   ```bash
   cd /etc/sysconfig/network-scripts/
   vi ifcfg-ens33
   ```
   
   修改IP地址：
   ```ini
   IPADDR=192.168.10.101
   ```
   
   ```bash
   vi ifcfg-ens34
   ```
   
   修改IP地址：
   ```ini
   IPADDR=192.168.20.101
   ```

4. 修改主机名：
   ```bash
   hostnamectl set-hostname compute
   ```

5. 重启网络服务
6. 更新/etc/hosts文件

### 2.6 本地软件仓库配置

#### 控制节点配置

挂载OpenStack ISO镜像：
```bash
cd /opt
mkdir openstack
mount openStack-train.iso openstack
```

配置自动挂载：
```bash
vi /etc/fstab
```

添加内容：
```
/opt/openStack-train.iso /opt/openstack iso9660 defaults 0 0
```

配置本地YUM源：
```bash
cd /etc/yum.repos.d/
mkdir bak
mv *.repo bak

vi openstack.repo
```

YUM源配置内容：
```ini
[OS]
name=OS
baseurl=file:///opt/openstack/OS
enabled=1
gpgcheck=0

[everything]
name=everything
baseurl=file:///opt/openstack/everything
enabled=1
gpgcheck=0

[EPOL]
name=EPOL
baseurl=file:///opt/openstack/EPOL
enabled=1
gpgcheck=0

[update]
name=update
baseurl=file:///opt/openstack/update
enabled=1
gpgcheck=0

[OpenStack_Train]
name=OpenStack_Train
baseurl=file:///opt/openstack/OpenStack_Train
enabled=1
gpgcheck=0
```

重建YUM缓存：
```bash
yum clean all
yum makecache
```

配置FTP服务器：
```bash
yum -y install vsftpd

vi /etc/vsftpd/vsftpd.conf
```

修改配置：
```ini
anonymous_enable=YES
anon_root=/opt
```

启动FTP服务：
```bash
systemctl start vsftpd
systemctl enable vsftpd
```

#### 计算节点配置

配置远程YUM源：
```bash
cd /etc/yum.repos.d/
mkdir bak
mv *.repo bak

scp root@controller:/etc/yum.repos.d/openstack.repo .

vi openstack.repo
```

修改baseurl为FTP地址：
```ini
baseurl=ftp://controller/openstack/OS
```

重建YUM缓存：
```bash
yum clean all
yum makecache
```

## 3. 基础服务安装

### 3.1 时间同步服务（Chrony）

#### 控制节点配置
```bash
vi /etc/chrony.conf
```

添加配置：
```
local stratum 1
allow 192.168.10.0/24
```

重启服务：
```bash
systemctl restart chronyd
systemctl enable chronyd
```

#### 计算节点配置
```bash
vi /etc/chrony.conf
```

修改配置：
```
server controller iburst
```

重启服务：
```bash
systemctl restart chronyd
systemctl enable chronyd
```

验证时间同步：
```bash
chronyc sources
```

### 3.2 OpenStack基础框架安装

在两个节点上执行：
```bash
yum -y install openstack-release-train
rm -rf /etc/yum.repos.d/openstack-train.repo
yum clean all
yum makecache
yum -y upgrade
```

安装OpenStack客户端：
```bash
yum -y install python-openstackclient
```

### 3.3 MariaDB数据库安装（控制节点）

安装数据库：
```bash
yum -y install mariadb-server python-PyMySQL
```

配置数据库：
```bash
vi /etc/my.cnf.d/openstack.cnf
```

配置内容：
```ini
[mysqld]
bind-address = 0.0.0.0
default-storage-engine = innodb
innodb_file_per_table = on
max_connections = 4096
collation-server = utf8_general_ci
character-set-server = utf8
```

启动数据库：
```bash
systemctl enable mariadb
systemctl start mariadb
```

安全初始化：
```bash
mysql_secure_installation
```

### 3.4 RabbitMQ消息队列服务（控制节点）

安装RabbitMQ：
```bash
yum -y install rabbitmq-server
systemctl enable rabbitmq-server
systemctl start rabbitmq-server
```

配置用户：
```bash
rabbitmqctl add_user rabbitmq 000000
rabbitmqctl set_permissions rabbitmq ".*" ".*" ".*"
```

验证服务：
```bash
netstat -tulnp | grep 5672
```

### 3.5 Memcached缓存服务（控制节点）

安装Memcached：
```bash
yum -y install memcached python-memcached
```

配置服务：
```bash
vi /etc/sysconfig/memcached
```

修改配置：
```
OPTIONS="-l 0.0.0.0,::1"
```

启动服务：
```bash
systemctl enable memcached
systemctl start memcached
```

### 3.6 etcd分布式存储（控制节点）

安装etcd：
```bash
yum -y install etcd
```

配置etcd：
```bash
vi /etc/etcd/etcd.conf
```

配置内容：
```ini
ETCD_NAME=controller
ETCD_LISTEN_PEER_URLS="http://192.168.10.100:2380"
ETCD_LISTEN_CLIENT_URLS="http://localhost:2379,http://192.168.10.100:2379"
ETCD_INITIAL_ADVERTISE_PEER_URLS="http://192.168.10.100:2380"
ETCD_INITIAL_CLUSTER="controller=http://192.168.10.100:2380"
ETCD_INITIAL_CLUSTER_STATE="new"
ETCD_INITIAL_CLUSTER_TOKEN="etcd-cluster-01"
ETCD_ADVERTISE_CLIENT_URLS="http://192.168.10.100:2379"
```

启动服务：
```bash
systemctl enable etcd
systemctl start etcd
```

## 4. OpenStack核心服务安装

### 4.1 认证服务（Keystone）

#### 4.1.1 安装Keystone
```bash
yum -y install openstack-keystone httpd mod_wsgi
```

#### 4.1.2 创建数据库
```bash
mysql -uroot -p000000
```

SQL命令：
```sql
CREATE DATABASE keystone;
GRANT ALL PRIVILEGES ON keystone.* TO 'keystone'@'localhost' IDENTIFIED BY '000000';
GRANT ALL PRIVILEGES ON keystone.* TO 'keystone'@'%' IDENTIFIED BY '000000';
```

#### 4.1.3 配置Keystone
```bash
vi /etc/keystone/keystone.conf
```

关键配置：
```ini
[database]
connection = mysql+pymysql://keystone:000000@controller/keystone

[token]
provider = fernet
```

#### 4.1.4 初始化数据库
```bash
su keystone -s /bin/sh -c "keystone-manage db_sync"
```

#### 4.1.5 初始化密钥库
```bash
keystone-manage fernet_setup --keystone-user keystone --keystone-group keystone
keystone-manage credential_setup --keystone-user keystone --keystone-group keystone
```

#### 4.1.6 引导身份服务
```bash
keystone-manage bootstrap \
  --bootstrap-password 000000 \
  --bootstrap-admin-url http://controller:5000/v3 \
  --bootstrap-internal-url http://controller:5000/v3 \
  --bootstrap-public-url http://controller:5000/v3 \
  --bootstrap-region-id RegionOne
```

#### 4.1.7 配置Web服务
```bash
ln -s /usr/share/keystone/wsgi-keystone.conf /etc/httpd/conf.d/

vi /etc/httpd/conf/httpd.conf
```

修改配置：
```
ServerName controller
```

启动服务：
```bash
systemctl enable httpd
systemctl start httpd
```

#### 4.1.8 环境变量配置
```bash
vi admin-login
```

内容：
```bash
export OS_USERNAME=admin
export OS_PASSWORD=000000
export OS_PROJECT_NAME=admin
export OS_USER_DOMAIN_NAME=Default
export OS_PROJECT_DOMAIN_NAME=Default
export OS_AUTH_URL=http://controller:5000/v3
export OS_IDENTITY_API_VERSION=3
export OS_IMAGE_API_VERSION=2
```

加载环境变量：
```bash
source admin-login
```

#### 4.1.9 服务验证
创建测试项目：
```bash
openstack project create --domain default project
openstack project list
```

创建角色：
```bash
openstack role create user
openstack role list
```

### 4.2 镜像服务（Glance）

#### 4.2.1 安装Glance
```bash
yum -y install openstack-glance
```

#### 4.2.2 创建数据库
```bash
mysql -uroot -p000000
```

SQL命令：
```sql
CREATE DATABASE glance;
GRANT ALL PRIVILEGES ON glance.* TO 'glance'@'localhost' IDENTIFIED BY '000000';
GRANT ALL PRIVILEGES ON glance.* TO 'glance'@'%' IDENTIFIED BY '000000';
```

#### 4.2.3 配置Glance
```bash
cp /etc/glance/glance-api.conf /etc/glance/glance-api.bak
grep -Ev '^$|#' /etc/glance/glance-api.bak > /etc/glance/glance-api.conf

vi /etc/glance/glance-api.conf
```

关键配置：
```ini
[database]
connection = mysql+pymysql://glance:000000@controller/glance

[keystone_authtoken]
auth_url = http://controller:5000
memcached_servers = controller:11211
auth_type = password
username = glance
password = 000000
project_name = project
user_domain_name = Default
project_domain_name = Default

[paste_deploy]
flavor = keystone

[glance_store]
stores = file
default_store = file
filesystem_store_datadir = /var/lib/glance/images/
```

#### 4.2.4 初始化数据库
```bash
su glance -s /bin/sh -c "glance-manage db_sync"
```

#### 4.2.5 创建Glance用户
```bash
source admin-login

openstack user create --domain default --password 000000 glance
openstack role add --project project --user glance admin
```

#### 4.2.6 创建服务端点
```bash
openstack service create --name glance image

openstack endpoint create --region RegionOne glance public http://controller:9292
openstack endpoint create --region RegionOne glance internal http://controller:9292
openstack endpoint create --region RegionOne glance admin http://controller:9292
```

### 4.2.7 上传测试镜像

下载测试镜像：
```bash
# 下载Cirros测试镜像
wget https://download.cirros-cloud.net/0.5.1/cirros-0.5.1-x86_64-disk.img
```

上传镜像到Glance：
```bash
source admin-login

openstack image create --file cirros-0.5.1-x86_64-disk.img \
  --disk-format qcow2 --container-format bare --public cirros
```

验证镜像：
```bash
openstack image list
ll /var/lib/glance/images/
```

## 4.3 放置服务（Placement）

### 4.3.1 安装Placement
```bash
yum -y install openstack-placement-api
```

### 4.3.2 创建数据库
```bash
mysql -uroot -p000000
```

SQL命令：
```sql
CREATE DATABASE placement;
GRANT ALL PRIVILEGES ON placement.* TO 'placement'@'localhost' IDENTIFIED BY '000000';
GRANT ALL PRIVILEGES ON placement.* TO 'placement'@'%' IDENTIFIED BY '000000';
```

### 4.3.3 配置Placement
```bash
cp /etc/placement/placement.conf /etc/placement/placement.bak
grep -Ev '^$|#' /etc/placement/placement.bak > /etc/placement/placement.conf

vi /etc/placement/placement.conf
```

关键配置：
```ini
[api]
auth_strategy = keystone

[keystone_authtoken]
auth_url = http://controller:5000
memcached_servers = controller:11211
auth_type = password
project_domain_name = Default
user_domain_name = Default
project_name = project
username = placement
password = 000000

[placement_database]
connection = mysql+pymysql://placement:000000@controller/placement
```

### 4.3.4 初始化数据库
```bash
su placement -s /bin/sh -c "placement-manage db sync"
```

### 4.3.5 创建Placement用户
```bash
source admin-login

openstack user create --domain default --password 000000 placement
openstack role add --project project --user placement admin
```

### 4.3.6 创建服务端点
```bash
openstack service create --name placement placement

openstack endpoint create --region RegionOne placement public http://controller:8778
openstack endpoint create --region RegionOne placement internal http://controller:8778
openstack endpoint create --region RegionOne placement admin http://controller:8778
```

### 4.3.7 重启服务
```bash
systemctl restart httpd
```

验证服务：
```bash
netstat -tnlup | grep 8778
curl http://controller:8778
```

## 4.4 计算服务（Nova）

### 4.4.1 控制节点安装

安装Nova软件包：
```bash
yum -y install openstack-nova-api openstack-nova-conductor \
  openstack-nova-scheduler openstack-nova-novncproxy
```

### 4.4.2 创建数据库
```bash
mysql -uroot -p000000
```

SQL命令：
```sql
CREATE DATABASE nova_api;
CREATE DATABASE nova_cell0;
CREATE DATABASE nova;

GRANT ALL PRIVILEGES ON nova.* TO 'nova'@'localhost' IDENTIFIED BY '000000';
GRANT ALL PRIVILEGES ON nova.* TO 'nova'@'%' IDENTIFIED BY '000000';
GRANT ALL PRIVILEGES ON nova_api.* TO 'nova'@'localhost' IDENTIFIED BY '000000';
GRANT ALL PRIVILEGES ON nova_api.* TO 'nova'@'%' IDENTIFIED BY '000000';
GRANT ALL PRIVILEGES ON nova_cell0.* TO 'nova'@'localhost' IDENTIFIED BY '000000';
GRANT ALL PRIVILEGES ON nova_cell0.* TO 'nova'@'%' IDENTIFIED BY '000000';
```

### 4.4.3 配置Nova
```bash
cp /etc/nova/nova.conf /etc/nova/nova.bak
grep -Ev '^$|#' /etc/nova/nova.bak > /etc/nova/nova.conf

vi /etc/nova/nova.conf
```

关键配置：
```ini
[DEFAULT]
enabled_apis = osapi_compute,metadata
transport_url = rabbit://rabbitmq:000000@controller:5672
my_ip = 192.168.10.100
use_neutron = true
firewall_driver = nova.virt.firewall.NoopFirewallDriver

[api]
auth_strategy = keystone

[api_database]
connection = mysql+pymysql://nova:000000@controller/nova_api

[database]
connection = mysql+pymysql://nova:000000@controller/nova

[glance]
api_servers = http://controller:9292

[keystone_authtoken]
auth_url = http://controller:5000/v3
memcached_servers = controller:11211
auth_type = password
project_domain_name = Default
user_domain_name = Default
project_name = project
username = nova
password = 000000

[oslo_concurrency]
lock_path = /var/lib/nova/tmp

[placement]
auth_url = http://controller:5000/v3
auth_type = password
project_domain_name = Default
user_domain_name = Default
project_name = project
username = placement
password = 000000
region_name = RegionOne

[vnc]
enabled = true
server_listen = $my_ip
server_proxyclient_address = $my_ip
novncproxy_base_url = http://controller:6080/vnc_auto.html
```

### 4.4.4 初始化数据库
```bash
su nova -s /bin/sh -c "nova-manage api_db sync"
su nova -s /bin/sh -c "nova-manage cell_v2 create_cell --name=cell1"
su nova -s /bin/sh -c "nova-manage cell_v2 map_cell0"
su nova -s /bin/sh -c "nova-manage db sync"
```

验证单元：
```bash
nova-manage cell_v2 list_cells
```

### 4.4.5 创建Nova用户
```bash
source admin-login

openstack user create --domain default --password 000000 nova
openstack role add --project project --user nova admin
```

### 4.4.6 创建服务端点
```bash
openstack service create --name nova compute

openstack endpoint create --region RegionOne nova public http://controller:8774/v2.1
openstack endpoint create --region RegionOne nova internal http://controller:8774/v2.1
openstack endpoint create --region RegionOne nova admin http://controller:8774/v2.1
```

### 4.4.7 启动控制节点服务
```bash
systemctl enable openstack-nova-api openstack-nova-scheduler \
  openstack-nova-conductor openstack-nova-novncproxy

systemctl start openstack-nova-api openstack-nova-scheduler \
  openstack-nova-conductor openstack-nova-novncproxy
```

验证服务：
```bash
netstat -pulnt | grep 877
openstack compute service list
```

### 4.4.8 计算节点安装

在计算节点上安装Nova：
```bash
yum -y install openstack-nova-compute
```

配置计算节点：
```bash
cp /etc/nova/nova.conf /etc/nova/nova.bak
grep -Ev '^$|#' /etc/nova/nova.bak > /etc/nova/nova.conf

vi /etc/nova/nova.conf
```

关键配置：
```ini
[DEFAULT]
enabled_apis = osapi_compute,metadata
transport_url = rabbit://rabbitmq:000000@controller:5672
my_ip = 192.168.10.101
use_neutron = true
firewall_driver = nova.virt.firewall.NoopFirewallDriver
compute_driver = libvirt.LibvirtDriver
instances_path = /var/lib/nova/instances/

[api]
auth_strategy = keystone

[glance]
api_servers = http://controller:9292

[keystone_authtoken]
auth_url = http://controller:5000/v3
memcached_servers = controller:11211
auth_type = password
project_domain_name = Default
user_domain_name = Default
project_name = project
username = nova
password = 000000

[libvirt]
virt_type = kvm

[oslo_concurrency]
lock_path = /var/lib/nova/tmp

[placement]
auth_url = http://controller:5000/v3
auth_type = password
project_domain_name = Default
user_domain_name = Default
project_name = project
username = placement
password = 000000
region_name = RegionOne

[vnc]
enabled = true
server_listen = 0.0.0.0
server_proxyclient_address = $my_ip
novncproxy_base_url = http://192.168.10.100:6080/vnc_auto.html
```

### 4.4.9 启动计算节点服务
```bash
systemctl enable libvirtd openstack-nova-compute
systemctl start libvirtd openstack-nova-compute
```

### 4.4.10 发现计算节点

在控制节点上执行：
```bash
source admin-login

su nova -s /bin/sh -c "nova-manage cell_v2 discover_hosts --verbose"
```

设置自动发现：
```bash
vi /etc/nova/nova.conf
```

添加配置：
```ini
[scheduler]
discover_hosts_in_cells_interval = 60
```

重启服务：
```bash
systemctl restart openstack-nova-api
```

验证计算服务：
```bash
openstack compute service list
nova-manage cell_v2 list_hosts
```

## 4.5 网络服务（Neutron）

### 4.5.1 控制节点安装

安装Neutron软件包：
```bash
yum -y install openstack-neutron openstack-neutron-ml2 \
  openstack-neutron-linuxbridge ebtables
```

### 4.5.2 创建数据库
```bash
mysql -uroot -p000000
```

SQL命令：
```sql
CREATE DATABASE neutron;
GRANT ALL PRIVILEGES ON neutron.* TO 'neutron'@'localhost' IDENTIFIED BY '000000';
GRANT ALL PRIVILEGES ON neutron.* TO 'neutron'@'%' IDENTIFIED BY '000000';
```

### 4.5.3 配置Neutron
```bash
cp /etc/neutron/neutron.conf /etc/neutron/neutron.bak
grep -Ev '^$|#' /etc/neutron/neutron.bak > /etc/neutron/neutron.conf

vi /etc/neutron/neutron.conf
```

关键配置：
```ini
[database]
connection = mysql+pymysql://neutron:000000@controller/neutron

[DEFAULT]
core_plugin = ml2
service_plugins =
transport_url = rabbit://rabbitmq:000000@controller:5672
auth_strategy = keystone
notify_nova_on_port_status_changes = true
notify_nova_on_port_data_changes = true

[keystone_authtoken]
auth_url = http://controller:5000
memcached_servers = controller:11211
auth_type = password
project_domain_name = default
user_domain_name = default
project_name = project
username = neutron
password = 000000

[nova]
auth_url = http://controller:5000
auth_type = password
project_domain_name = default
user_domain_name = default
project_name = project
username = nova
password = 000000

[oslo_concurrency]
lock_path = /var/lib/neutron/tmp
```

### 4.5.4 配置ML2插件
```bash
vi /etc/neutron/plugins/ml2/ml2_conf.ini
```

关键配置：
```ini
[ml2]
type_drivers = flat,vlan
tenant_network_types = flat
mechanism_drivers = linuxbridge
extension_drivers = port_security

[ml2_type_flat]
flat_networks = provider

[securitygroup]
enable_ipset = true
```

### 4.5.5 配置Linux Bridge代理
```bash
vi /etc/neutron/plugins/ml2/linuxbridge_agent.ini
```

关键配置：
```ini
[linux_bridge]
physical_interface_mappings = provider:ens34

[vxlan]
enable_vxlan = false

[securitygroup]
enable_security_group = true
firewall_driver = neutron.agent.linux.iptables_firewall.IptablesFirewallDriver
```

### 4.5.6 配置DHCP代理
```bash
vi /etc/neutron/dhcp_agent.ini
```

关键配置：
```ini
[DEFAULT]
interface_driver = linuxbridge
dhcp_driver = neutron.agent.linux.dhcp.Dnsmasq
enable_isolated_metadata = true
```

### 4.5.7 配置元数据代理
```bash
vi /etc/neutron/metadata_agent.ini
```

关键配置：
```ini
[DEFAULT]
nova_metadata_host = controller
metadata_proxy_shared_secret = 000000
```

### 4.5.8 修改Nova配置
```bash
vi /etc/nova/nova.conf
```

添加配置：
```ini
[neutron]
auth_url = http://controller:5000
auth_type = password
project_domain_name = default
user_domain_name = default
region_name = RegionOne
project_name = project
username = neutron
password = 000000
service_metadata_proxy = true
metadata_proxy_shared_secret = 000000
```

### 4.5.9 初始化数据库
```bash
ln -s /etc/neutron/plugins/ml2/ml2_conf.ini /etc/neutron/plugin.ini

su neutron -s /bin/sh -c "neutron-db-manage --config-file /etc/neutron/neutron.conf \
  --config-file /etc/neutron/plugins/ml2/ml2_conf.ini upgrade head"
```

### 4.5.10 创建Neutron用户
```bash
source admin-login

openstack user create --domain default --password 000000 neutron
openstack role add --project project --user neutron admin
```

### 4.5.11 创建服务端点
```bash
openstack service create --name neutron network

openstack endpoint create --region RegionOne neutron public http://controller:9696
openstack endpoint create --region RegionOne neutron internal http://controller:9696
openstack endpoint create --region RegionOne neutron admin http://controller:9696
```

### 4.5.12 启动控制节点服务
```bash
systemctl restart openstack-nova-api

systemctl enable neutron-server neutron-linuxbridge-agent \
  neutron-dhcp-agent neutron-metadata-agent

systemctl start neutron-server neutron-linuxbridge-agent \
  neutron-dhcp-agent neutron-metadata-agent
```

### 4.5.13 计算节点安装

在计算节点上安装Neutron：
```bash
yum -y install openstack-neutron-linuxbridge ebtables ipset
```

配置计算节点：
```bash
cp /etc/neutron/neutron.conf /etc/neutron/neutron.bak
grep -Ev '^$|#' /etc/neutron/neutron.bak > /etc/neutron/neutron.conf

vi /etc/neutron/neutron.conf
```

关键配置：
```ini
[DEFAULT]
transport_url = rabbit://rabbitmq:000000@controller:5672
auth_strategy = keystone

[keystone_authtoken]
auth_url = http://controller:5000
memcached_servers = controller:11211
auth_type = password
project_domain_name = default
user_domain_name = default
project_name = project
username = neutron
password = 000000

[oslo_concurrency]
lock_path = /var/lib/neutron/tmp
```

配置Linux Bridge代理：
```bash
vi /etc/neutron/plugins/ml2/linuxbridge_agent.ini
```

关键配置：
```ini
[linux_bridge]
physical_interface_mappings = provider:ens34

[vxlan]
enable_vxlan = false

[securitygroup]
enable_security_group = true
firewall_driver = neutron.agent.linux.iptables_firewall.IptablesFirewallDriver
```

修改Nova配置：
```bash
vi /etc/nova/nova.conf
```

添加配置：
```ini
[neutron]
auth_url = http://controller:5000
auth_type = password
project_domain_name = default
user_domain_name = default
region_name = RegionOne
project_name = project
username = neutron
password = 000000
```

### 4.5.14 启动计算节点服务
```bash
systemctl restart openstack-nova-compute

systemctl enable neutron-linuxbridge-agent
systemctl start neutron-linuxbridge-agent
```

验证网络服务：
```bash
openstack network agent list
```

## 4.6 仪表板服务（Dashboard）

### 4.6.1 安装Dashboard

在控制节点上安装：
```bash
yum -y install openstack-dashboard
```

### 4.6.2 配置Dashboard
```bash
vi /etc/openstack-dashboard/local_settings
```

关键配置：
```python
ALLOWED_HOSTS = ['*']

SESSION_ENGINE = 'django.contrib.sessions.backends.cache'

CACHES = {
    'default': {
         'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
         'LOCATION': 'controller:11211',
    }
}

OPENSTACK_KEYSTONE_URL = "http://controller:5000/v3"
OPENSTACK_KEYSTONE_MULTIDOMAIN_SUPPORT = True

OPENSTACK_API_VERSIONS = {
    "identity": 3,
    "image": 2,
    "volume": 3,
}

OPENSTACK_KEYSTONE_DEFAULT_DOMAIN = "Default"
OPENSTACK_KEYSTONE_DEFAULT_ROLE = "user"

TIME_ZONE = "Asia/Shanghai"
```

### 4.6.3 重启Web服务
```bash
systemctl restart httpd
```

### 4.6.4 访问Dashboard

打开浏览器，访问：`http://192.168.10.100/dashboard`

登录信息：
- 域：Default
- 用户名：admin
- 密码：000000

## 4.7 块存储服务（Cinder）

### 4.7.1 控制节点安装

安装Cinder软件包：
```bash
yum -y install openstack-cinder
```

### 4.7.2 创建数据库
```bash
mysql -uroot -p000000
```

SQL命令：
```sql
CREATE DATABASE cinder;
GRANT ALL PRIVILEGES ON cinder.* TO 'cinder'@'localhost' IDENTIFIED BY '000000';
GRANT ALL PRIVILEGES ON cinder.* TO 'cinder'@'%' IDENTIFIED BY '000000';
```

### 4.7.3 配置Cinder
```bash
cp /etc/cinder/cinder.conf /etc/cinder/cinder.bak
grep -Ev '^$|#' /etc/cinder/cinder.bak > /etc/cinder/cinder.conf

vi /etc/cinder/cinder.conf
```

关键配置：
```ini
[DEFAULT]
auth_strategy = keystone
transport_url = rabbit://rabbitmq:000000@controller:5672

[database]
connection = mysql+pymysql://cinder:000000@controller/cinder

[keystone_authtoken]
auth_url = http://controller:5000/v3
memcached_servers = controller:11211
auth_type = password
project_domain_name = Default
user_domain_name = Default
project_name = project
username = cinder
password = 000000

[oslo_concurrency]
lock_path = /var/lib/cinder/tmp
```

修改Nova配置：
```bash
vi /etc/nova/nova.conf
```

添加配置：
```ini
[cinder]
os_region_name = RegionOne
```

### 4.7.4 初始化数据库
```bash
su cinder -s /bin/sh -c "cinder-manage db sync"
```

### 4.7.5 创建Cinder用户
```bash
source admin-login

openstack user create --domain default --password 000000 cinder
openstack role add --project project --user cinder admin
```

### 4.7.6 创建服务端点
```bash
openstack service create --name cinderv3 volumev3

openstack endpoint create --region RegionOne volumev3 public \
  http://controller:8776/v3/%\(project_id\)s
openstack endpoint create --region RegionOne volumev3 internal \
  http://controller:8776/v3/%\(project_id\)s
openstack endpoint create --region RegionOne volumev3 admin \
  http://controller:8776/v3/%\(project_id\)s
```

### 4.7.7 启动控制节点服务
```bash
systemctl restart openstack-nova-api

systemctl enable openstack-cinder-api openstack-cinder-scheduler
systemctl start openstack-cinder-api openstack-cinder-scheduler
```

验证服务：
```bash
netstat -tulnp | grep 8776
openstack volume service list
```

### 4.7.8 存储节点配置

在计算节点上添加一块新硬盘（建议100GB）作为存储设备。

创建LVM卷组：
```bash
# 查看新磁盘
lsblk

# 创建物理卷
pvcreate /dev/sdb

# 创建卷组
vgcreate cinder-volumes /dev/sdb

# 配置LVM过滤
vi /etc/lvm/lvm.conf
```

修改配置：
```
filter = ["a/sda/", "a/sdb/", "r/.*/"]
```

### 4.7.9 计算节点安装Cinder

安装软件包：
```bash
yum -y install openstack-cinder targetcli python-keystone
```

配置Cinder：
```bash
cp /etc/cinder/cinder.conf /etc/cinder/cinder.bak
grep -Ev '^$|#' /etc/cinder/cinder.bak > /etc/cinder/cinder.conf

vi /etc/cinder/cinder.conf
```

关键配置：
```ini
[DEFAULT]
auth_strategy = keystone
transport_url = rabbit://rabbitmq:000000@controller:5672
glance_api_servers = http://controller:9292
enabled_backends = lvm

[database]
connection = mysql+pymysql://cinder:000000@controller/cinder

[keystone_authtoken]
auth_url = http://controller:5000/v3
memcached_servers = controller:11211
auth_type = password
project_domain_name = Default
user_domain_name = Default
project_name = project
username = cinder
password = 000000

[oslo_concurrency]
lock_path = /var/lib/cinder/tmp

[lvm]
volume_driver = cinder.volume.drivers.lvm.LVMVolumeDriver
volume_group = cinder-volumes
target_protocol = iscsi
target_helper = lioadm
```

### 4.7.10 启动存储节点服务
```bash
systemctl enable openstack-cinder-volume target
systemctl start openstack-cinder-volume target
```

验证块存储服务：
```bash
openstack volume service list
```

### 4.7.11 创建测试卷
```bash
source admin-login

# 创建卷
openstack volume create --size 8 volume1

# 查看卷列表
openstack volume list
```

# 5. 虚拟网络与云主机管理

## 5.1 虚拟网络配置

### 5.1.1 安装网桥工具

在两个节点上安装：
```bash
yum -y install bridge-utils
```

### 5.1.2 使用命令创建虚拟网络

创建外部网络：
```bash
source admin-login

openstack network create --share --external \
  --provider-physical-network provider \
  --provider-network-type flat vm-network
```

创建子网：
```bash
openstack subnet create --network vm-network \
  --allocation-pool start=192.168.20.100,end=192.168.20.200 \
  --dns-nameserver 114.114.114.114 \
  --gateway 192.168.20.2 \
  --subnet-range 192.168.20.0/24 vm-subnetwork
```

验证网络：
```bash
openstack network list
openstack subnet list
ip a
brctl show
```

## 5.2 实例类型管理

### 5.2.1 创建实例类型

使用命令创建：
```bash
source admin-login

openstack flavor create --id auto --vcpus 1 --ram 1024 --disk 10 myflavor
```

查看实例类型：
```bash
openstack flavor list
openstack flavor show myflavor
```

## 5.3 云主机管理

### 5.3.1 创建云主机

使用命令创建云主机：
```bash
source admin-login

# 查看可用镜像
openstack image list

# 查看可用网络
openstack network list

# 查看可用实例类型
openstack flavor list

# 创建云主机
# 从上面的网络列表中复制网络ID替换<网络ID>
openstack server create --flavor myflavor \
  --image cirros \
  --nic net-id=<网络ID> \
  --security-group default \
  myinstance
```

### 5.3.2 管理云主机

查看云主机状态：
```bash
openstack server list
openstack server show myinstance
```

控制云主机：
```bash
# 启动云主机
openstack server start myinstance

# 停止云主机
openstack server stop myinstance

# 重启云主机
openstack server reboot myinstance

# 删除云主机
openstack server delete myinstance
```

访问云主机控制台：
```bash
# 获取VNC控制台URL
openstack console url show myinstance
```

## 故障排除与注意事项

### 常见问题

1. **网络连接问题**：检查防火墙和SELinux状态
2. **服务启动失败**：查看日志文件 `/var/log/<service>/`
3. **数据库连接问题**：验证数据库服务状态和连接参数

### 重要提醒

- 安装过程中建议定期创建虚拟机快照
- 所有密码建议使用更复杂的组合
- 生产环境应启用适当的安全配置
- 定期检查服务状态和日志文件

# 7. 备份与恢复策略

## 7.1 数据库备份

### 7.1.1 定期备份
```bash
# 备份所有OpenStack数据库
mysqldump -uroot -p000000 --all-databases > openstack_backup_$(date +%Y%m%d).sql

# 备份单个服务数据库
mysqldump -uroot -p000000 keystone > keystone_backup_$(date +%Y%m%d).sql
mysqldump -uroot -p000000 glance > glance_backup_$(date +%Y%m%d).sql
mysqldump -uroot -p000000 nova > nova_backup_$(date +%Y%m%d).sql
mysqldump -uroot -p000000 neutron > neutron_backup_$(date +%Y%m%d).sql
mysqldump -uroot -p000000 cinder > cinder_backup_$(date +%Y%m%d).sql
mysqldump -uroot -p000000 placement > placement_backup_$(date +%Y%m%d).sql
```

### 7.1.2 数据库恢复
```bash
# 恢复所有数据库
mysql -uroot -p000000 < openstack_backup_20251121.sql

# 恢复单个服务数据库
mysql -uroot -p000000 keystone < keystone_backup_20251121.sql
```

## 7.2 配置文件备份

### 7.2.1 定期备份配置文件
```bash
# 备份OpenStack配置文件
tar -czvf openstack_configs_$(date +%Y%m%d).tar.gz /etc/{keystone,glance,nova,neutron,cinder,placement,openstack-dashboard}

# 备份系统配置文件
tar -czvf system_configs_$(date +%Y%m%d).tar.gz /etc/{sysconfig,network-scripts,yum.repos.d}
```

### 7.2.2 配置文件恢复
```bash
# 恢复配置文件
tar -xzvf openstack_configs_20251121.tar.gz -C /
```

## 7.3 镜像和卷备份

### 7.3.1 镜像备份
```bash
# 导出镜像
glance image-download --file cirros_backup.qcow2 cirros

# 导入镜像
glance image-create --file cirros_backup.qcow2 --disk-format qcow2 --container-format bare --name cirros_restored
```

### 7.3.2 卷备份
```bash
# 创建卷备份
openstack volume backup create --name volume1_backup volume1

# 恢复卷
openstack volume backup restore volume1_backup volume1
```

# 8. 安全加固措施

## 8.1 网络安全

### 8.1.1 防火墙配置
```bash
# 启用防火墙
systemctl start firewalld
systemctl enable firewalld

# 配置防火墙规则
firewall-cmd --permanent --add-service=ssh
firewall-cmd --permanent --add-port=5000/tcp  # Keystone
firewall-cmd --permanent --add-port=9292/tcp  # Glance
firewall-cmd --permanent --add-port=8774/tcp  # Nova
firewall-cmd --permanent --add-port=8776/tcp  # Cinder
firewall-cmd --permanent --add-port=9696/tcp  # Neutron
firewall-cmd --permanent --add-port=8778/tcp  # Placement
firewall-cmd --permanent --add-port=6080/tcp  # Nova VNC
firewall-cmd --permanent --add-port=3306/tcp  # MySQL
firewall-cmd --permanent --add-port=5672/tcp  # RabbitMQ
firewall-cmd --permanent --add-port=11211/tcp # Memcached
firewall-cmd --permanent --add-port=2379/tcp  # etcd
firewall-cmd --permanent --add-port=2380/tcp  # etcd peer
firewall-cmd --reload
```

### 8.1.2 网络隔离
- 管理网络（192.168.10.0/24）：仅用于OpenStack组件间通信
- 外部网络（192.168.20.0/24）：用于云主机访问外部网络
- 租户网络：用于云主机间通信

## 8.2 认证安全

### 8.2.1 密码策略
```bash
# 修改密码策略
vi /etc/security/pwquality.conf

# 配置示例
minlen = 12
minclass = 4
dcredit = -1
ucredit = -1
lcredit = -1
ocredit = -1
```

### 8.2.2 令牌安全
```bash
# 配置令牌过期时间
vi /etc/keystone/keystone.conf

[token]
expiration = 3600  # 1小时
```

### 8.2.3 访问控制
- 最小权限原则：只为用户分配必要的角色
- 定期审查用户权限
- 启用多因素认证（如可能）

## 8.3 TLS/SSL配置

### 8.3.1 配置HTTPS
```bash
# 生成自签名证书
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/pki/tls/private/httpd.key \
  -out /etc/pki/tls/certs/httpd.crt

# 配置Apache使用HTTPS
vi /etc/httpd/conf.d/ssl.conf
```

### 8.3.2 配置服务使用HTTPS
```bash
# 配置Keystone使用HTTPS
vi /etc/keystone/keystone.conf

[ssl]
certfile = /etc/pki/tls/certs/httpd.crt
keyfile = /etc/pki/tls/private/httpd.key
```

# 9. 监控与告警方案

## 9.1 监控工具

### 9.1.1 安装Prometheus和Grafana
```bash
# 安装Prometheus
yum -y install prometheus

# 安装Grafana
yum -y install grafana

# 启动服务
systemctl enable prometheus grafana-server
systemctl start prometheus grafana-server
```

### 9.1.2 配置Prometheus
```yaml
# /etc/prometheus/prometheus.yml
scrape_configs:
  - job_name: 'openstack'
    static_configs:
      - targets: ['controller:9100', 'compute:9100']
  - job_name: 'mysql'
    static_configs:
      - targets: ['controller:9104']
  - job_name: 'rabbitmq'
    static_configs:
      - targets: ['controller:9419']
```

## 9.2 关键监控指标

### 9.2.1 系统指标
- CPU使用率
- 内存使用率
- 磁盘空间
- 网络流量

### 9.2.2 OpenStack服务指标
- 服务状态
- API响应时间
- 队列长度
- 错误率

### 9.2.3 云主机指标
- 云主机数量
- 资源使用率
- 启动/关闭时间

## 9.3 告警配置

### 9.3.1 Prometheus告警规则
```yaml
# /etc/prometheus/rules/openstack.rules
groups:
- name: openstack_alerts
  rules:
  - alert: InstanceDown
    expr: up == 0
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "Instance {{ $labels.instance }} down"
      description: "{{ $labels.instance }} has been down for more than 5 minutes"

  - alert: HighCPU
    expr: (100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "High CPU usage on {{ $labels.instance }}"
      description: "CPU usage is above 80% for 5 minutes"
```

### 9.3.2 告警通知
```yaml
# /etc/prometheus/alertmanager.yml
global:
  smtp_smarthost: 'smtp.example.com:587'
  smtp_from: 'alerts@example.com'
  smtp_auth_username: 'alerts@example.com'
  smtp_auth_password: 'password'

route:
  group_by: ['alertname']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  receiver: 'email'

receivers:
- name: 'email'
  email_configs:
  - to: 'admin@example.com'
    send_resolved: true
```

# 10. 性能调优建议

## 10.1 系统调优

### 10.1.1 内核参数调优
```bash
# 编辑sysctl配置
vi /etc/sysctl.conf

# 添加以下配置
net.core.somaxconn = 4096
net.ipv4.tcp_max_syn_backlog = 4096
net.ipv4.tcp_fin_timeout = 30
net.ipv4.tcp_keepalive_time = 300
net.ipv4.tcp_keepalive_probes = 5
net.ipv4.tcp_keepalive_intvl = 15

# 应用配置
sysctl -p
```

### 10.1.2 内存管理调优
```bash
# 编辑内存配置
vi /etc/sysctl.conf

# 添加以下配置
vm.swappiness = 10
vm.overcommit_memory = 1

# 应用配置
sysctl -p
```

## 10.2 OpenStack服务调优

### 10.2.1 Nova调优
```bash
# 编辑Nova配置
vi /etc/nova/nova.conf

[DEFAULT]
# 增加并发处理
rpc_thread_pool_size = 32
# 增加API超时时间
api_timeout = 60
# 启用实例自动发现
discover_hosts_in_cells_interval = 60

[conductor]
# 增加并发处理
workers = 4

[scheduler]
# 增加并发处理
workers = 4
```

### 10.2.2 Neutron调优
```bash
# 编辑Neutron配置
vi /etc/neutron/neutron.conf

[DEFAULT]
# 增加并发处理
rpc_thread_pool_size = 32
# 增加API超时时间
api_timeout = 60

[agent]
# 增加并发处理
num_agents = 4
```

### 10.2.3 Cinder调优
```bash
# 编辑Cinder配置
vi /etc/cinder/cinder.conf

[DEFAULT]
# 增加并发处理
rpc_thread_pool_size = 32
# 增加API超时时间
api_timeout = 60

[scheduler]
# 增加并发处理
workers = 4
```

## 10.3 数据库调优

### 10.3.1 MariaDB调优
```bash
# 编辑MySQL配置
vi /etc/my.cnf.d/openstack.cnf

[mysqld]
# 增加最大连接数
max_connections = 4096
# 增加缓冲池大小
innodb_buffer_pool_size = 2G
# 增加日志文件大小
innodb_log_file_size = 512M
# 启用查询缓存
query_cache_size = 64M
query_cache_type = 1
```

# 11. 高可用部署方案

## 11.1 架构设计

### 11.1.1 多控制节点架构
- 2-3个控制节点
- 负载均衡器（如HAProxy）
- 共享存储（如NFS或Ceph）
- 数据库集群（如MariaDB Galera）
- 消息队列集群（如RabbitMQ集群）

### 11.1.2 网络设计
- 管理网络：用于控制节点间通信
- 外部网络：用于云主机访问外部
- 内部网络：用于计算节点间通信
- 存储网络：用于存储设备通信

## 11.2 部署步骤

### 11.2.1 准备工作
- 配置负载均衡器
- 配置共享存储
- 配置数据库集群
- 配置消息队列集群

### 11.2.2 控制节点部署
- 在每个控制节点上安装相同的OpenStack服务
- 配置服务使用共享数据库和消息队列
- 配置负载均衡器指向所有控制节点

### 11.2.3 服务配置
```bash
# 配置Keystone使用数据库集群
vi /etc/keystone/keystone.conf

[database]
connection = mysql+pymysql://keystone:000000@controller1,controller2,controller3/keystone?read_default_file=/etc/my.cnf.d/openstack.cnf&read_timeout=60&write_timeout=60&autocommit=1&charset=utf8

# 配置RabbitMQ集群
vi /etc/nova/nova.conf

[DEFAULT]
transport_url = rabbit://rabbitmq:000000@controller1:5672,controller2:5672,controller3:5672
```

# 12. 升级与维护指南

## 12.1 升级步骤

### 12.1.1 准备工作
- 备份所有数据和配置
- 停止所有OpenStack服务
- 更新系统包

### 12.1.2 服务升级
- 升级数据库模式
- 升级服务软件包
- 启动服务
- 验证服务状态

### 12.1.3 验证升级
- 检查服务状态
- 测试API功能
- 验证云主机操作

## 12.2 日常维护

### 12.2.1 定期维护
- 备份数据和配置
- 更新系统和服务包
- 清理日志文件
- 检查磁盘空间

### 12.2.2 故障处理
- 查看服务日志
- 检查服务状态
- 验证网络连接
- 测试数据库连接
- 重启故障服务

## 总结

本文档提供了OpenStack Train版本在openEuler系统上的完整安装指南，涵盖了从环境准备到核心服务配置的全过程。

### 已安装的核心服务

| 服务名称 | 功能描述 | 安装节点 |
|---------|---------|---------|
| Keystone | 身份认证服务 | 控制节点 |
| Glance | 镜像服务 | 控制节点 |
| Placement | 放置服务 | 控制节点 |
| Nova | 计算服务 | 控制节点 + 计算节点 |
| Neutron | 网络服务 | 控制节点 + 计算节点 |
| Dashboard | 仪表板服务 | 控制节点 |
| Cinder | 块存储服务 | 控制节点 + 存储节点 |

### 后续学习建议

1. **深入理解架构**：学习OpenStack各组件之间的交互关系
2. **高可用部署**：研究多控制节点的高可用架构方案
3. **性能优化**：了解OpenStack平台的性能调优方法
4. **故障排查**：掌握常见问题的诊断和解决方法
5. **安全加固**：学习OpenStack平台的安全配置最佳实践

按照本文档步骤操作，可以成功搭建一个功能完整的OpenStack云计算平台，支持虚拟网络的创建和云主机的生命周期管理。