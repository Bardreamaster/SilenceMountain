---
# multilingual page pair id, this must pair with translations of this page. (This name must be unique)
lng_pair: frpforwindows
title: 利用frp远程访问内网中的Windows计算机

# post specific
# if not specified, .name will be used from _data/owner/[language].yml
#author: ""
# multiple category is not supported
category: auto generated
# multiple tag entries are possible
tags: [内网穿透]
# thumbnail image for post
img: ""
# disable comments on this page
comments_disable: true

# publish date
date: 2022-05-24 11:32:53 +0900

# seo
# if not specified, date will be used.
#meta_modify_date: 2021-08-10 11:32:53 +0900
# check the meta_common_description in _data/owner/[language].yml
#meta_description: ""

# optional
# please use the "image_viewer_on" below to enable image viewer for individual pages or posts (_posts/ or [language]/_posts folders).
# image viewer can be enabled or disabled for all posts using the "image_viewer_posts: true" setting in _data/conf/main.yml.
#image_viewer_on: true
# please use the "image_lazy_loader_on" below to enable image lazy loader for individual pages or posts (_posts/ or [language]/_posts folders).
# image lazy loader can be enabled or disabled for all posts using the "image_lazy_loader_posts: true" setting in _data/conf/main.yml.
#image_lazy_loader_on: true
# exclude from on site search
#on_site_search_exclude: true
# exclude from search engines
#search_engine_exclude: true
# to disable this page, simply set published: false or delete this file
#published: false
---

**本文默认读者具备以下条件或理解以下内容表达的含义：**

* 在公网上拥有一台具有固定公网IP的设备
* 能够连接到服务器并能够更改其中的文件，能够修改其防火墙规则
* 被访问的Windows具有被远程控制的功能

满足以上条件可以通过如下方式：

* 租用一台云服务器，或在公网上运行一台具有公网固定IP的设备
* [MobaXterm free Xserver and tabbed SSH client for Windows (mobatek.net)](https://mobaxterm.mobatek.net/)
* 将被访问的Windows升级至专业版，或使用其它软件以开放家庭版的远程控制功能，在此查看[远程桌面客户端支持的配置](https://docs.microsoft.com/zh-cn/windows-server/remote/remote-desktop-services/clients/remote-desktop-supported-config)

**实现远程访问Windows设备过程中用到的软件、技术等皆有更多的用途，稍加尝试和理解即可将此方法推广至更多的场景，本文仅针对以下情况的使用做出介绍：**

* 服务器为阿里云服务器，带宽2M，Linux系统。
* 受控端处在内网环境，为Windows10专业版。
* 控制端为不特定的PC，特定的iPad，Android移动端，网络环境不定（可能在受控端的局域网内，也可能在公网）

## 使用反向代理实现内网穿透

### frp 一款开源的反向代理应用

> frp是一个专注于内网穿透的高性能的反向代理应用，支持 TCP、UDP、HTTP、HTTPS 等多种协议。可以将内网服务以安全、便捷的方式通过具有公网 IP 节点的中转暴露到公网.
>
> 开源地址：[frp/README.md at dev · fatedier/frp (github.com)](https://github.com/fatedier/frp/blob/dev/README.md)
>
> 官方文档：[文档frp](https://gofrp.org/docs/)

首先需要了解的是， frp 通过两部分组件帮助使用者实现方向代理/内网穿透的效果。一部分是服务端的 frps ，用于**在公网上**为能访问公网的设备**提供一个中转站**；另一部分是客户端的 frpc ，用于**将**需要把自己暴露在公网上的**内网设备连接到公网的服务端**。当一台设备连接公网上服务器的指定端口，就可以将数据转发至内网的客户端，或者建立起 P2P 的隧道进行直接通信。

### frp参数配置

* 第一步，到[Release Page](https://github.com/fatedier/frp/releases)为服务器和被访问的设备下载合适版本的包。

  *比如，为运行Linux的阿里云服务器下载 Linux_amd64 的包；为受控的 Windows PC 下载 Windows_amd64 的包。*

  将其解压后文件夹中的**指定组件**放置在两台设备上你知晓的且不含中文的路径下。

  指定组件：服务器保留`frps`和`frps.ini`;客户端保留`frpc.exe`和`frpc.ini`.

* 第二步，为其`*.ini`文件填写配置。

  ```ini
  #frps.ini
  [common]
  #监听全部ipv6和ipv4的访问
  bind_addr = 0.0.0.0
  #用于反向代理连接的端口
  bind_port = 4396

  #dashboard config 可以不填 访问服务器的dashbord_port即可访问dashboard
  dashboard_port = 12345
  dashboard_user = Jack
  dashboard_pwd = Jackspassword

  #验证身份用 可以不填
  token = mytoken



  #frpc.ini
  [common]
  #启用tls验证
  tls_enable = true
  #服务器的IP 请修改为你使用的frps所在的服务器的IP和端口 server_port即为服务器设置的bind_port
  server_addr = 8.8.8.8
  server_port = 4396
  #验证身份 请确保两端都有且一致或两端都没有
  token = mytoken

  #标识符，确保其唯一
  [tcp]
  #转发协议 有需要可以用udp
  type = tcp
  #客户端的IP和端口，此处的IP是本机，端口是远程桌面的默认端口
  local_ip = 127.0.0.1
  local_port = 3389
  #暴露在公网上的端口，在公网上访问server_ip:remoteport等于访问local_ip:local_port
  remote_port = 10086
  ```

* 第三步，分别启动服务器和客户端上的`frp*`服务,必须在terminal中启动。

### 局限性和改进方法

* 速度：上述方式连接的带宽受限于三个设备，控制端、服务器端、受控端，其中主要的限制在服务器端，个人租用的云服务器一般只有2M以内的带宽，对于日常使用，也可以满足需求。如果控制端是一台固定的PC而不需要时常更换，比如控制端是随身携带的笔记本电脑，受控端是在某处固定的Windows主力机，可以使用 frp 的 P2P 模式（type = xtcp），这样将建立起受控端与被控端之间点到点的隧道，提高传输的带宽，而不受服务器性能的限制。需要注意的是， P2P 模式下，受控端和控制端都需要安装 frpc . 并且，并非任意的网络环境都可以成功建立起 P2P 隧道，需要在真实网络环境进行测试。

* 安全：上述方式会将服务器的若干端口暴露出来，无法对使用于远程连接的端口进行访问限制或可视性隐藏，有一定的安全隐患，容易受到外部的攻击，**请勿在涉有隐私和重要安全权限的设备上进行私自的、未经加密的、对公网开放的反向代理**。个人使用的情况下，如果控制端是固定PC，可以使用 frp 的 stcp 模式，这样不需要暴露额外的`remote_port`用于访问，可以在一定程度上提高安全性。同时，对安全性有需求的也可以开启身份验证。上述方式中的 token 仅作为客户端与服务器建立连接的识别符，只能阻止 token 不匹配的客户端的连接，但是并不能阻止任意源对端口的访问。（如果暴露出来的端口是服务器的门，token只能阻止没有钥匙的人打不开门，但是并不能阻止外面的人不停的敲门。）

  有更高安全性需求场景的需要自行搭建VPN。（VPN可以使身份未经验证的人看不到门。）

* 便捷：上述方式运行frp需要有terminal在前台保持服务的唤醒，为了使使用更加便捷，后文将介绍如何在Linux和Windows上使frp的服务可以自动在后台运行。

### 为反向代理服务设置自动启动和后台运行

**Windows：**

使用[NSSM - the Non-Sucking Service Manager](https://nssm.cc/)将应用程序封装成Windows服务，使frp作为服务开机自启且在后台运行。

1. [下载](https://nssm.cc/download) ，放置在一个你知晓并且不含中文的路径下。
2. 在命令行中进入`nssm.exe`所在文件夹，使用`nssm install`运行。
3. 将Application Path选择为` frpc.exe` 所在的位置，Arguments:填入`-c frpc.ini`，填写 Service name 为你想要的服务的名称，比如 frpc . 然后Install Service。
4. 在任务管理器>服务界面中找到你刚才install的服务，右键启动它，它将会在开机时持续自动运行。如果服务无法启动或者处在暂停状态，说明 frpc 的运行返回了错误，请手动在命令行中运行`frpc -c frpc.ini`，根据返回的报错信息进行修复。请确保连接中每台设备的防火墙规则是正确的，`frp*.ini` 的配置也没有错误。

NSSM的其它指令：

```shell
nssm install servername

nssm start servername

nssm stop servername

nssm restart servername

nssm remove servername
```

**Linux：**

1. 连接到服务器，使用命令`sudo vim /lib/systemd/system/frps.service`为frps创建服务。其实是在 `/lib/systemd/system `下面新建一个文件`frps.service`. 在文件中写入下述内容：

   ```ini
   [Unit]
   Description=frps daemon

   [Service]
   Type=simple
   #此处把/root替换成 frps 的实际安装目录
   ExecStart=/root/frps -c /root/frps.ini

   [Install]
   WantedBy=multi-user.target
   ```

2. 使用`sudo systemctl start frps`启动服务。其它可用的指令：

   ```shell
   sudo systemctl enable frps  #自启动
   sudo systemctl restart frps #重启应用
   sudo systemctl stop frps    #停止应用
   sudo systemctl status frps  #查看日志

   sudo netstat -tunlp         # netstat查看占用端口情况
   							# -t - 显示 TCP 端口。
   							# -u - 显示 UDP 端口。
   							# -n - 显示数字地址而不是主机名。
   							# -l - 仅显示侦听端口。
   							# -p - 显示进程的 PID 和名称。仅当您以 root 或 sudo 用户身份运行命令时，才会显示此信息
   ```

## 使用远程桌面客户端进行连接

* 配置被访问端的状态：[远程桌面 - 允许访问你的电脑 - Microsoft Docs](https://docs.microsoft.com/zh-cn/windows-server/remote/remote-desktop-services/clients/remote-desktop-allow-access)

* 使用访问端的[远程桌面客户端](https://docs.microsoft.com/zh-cn/windows-server/remote/remote-desktop-services/clients/remote-desktop-clients)控制进行访问：

  连接目标主机填写 `server_ip:srever_port`;

  其中网络身份验证需要填写的用户名和密码为受控端登陆的微软账户的账号和密码，需要以其他身份登录的，可以在Windows>设置>系统>远程桌面>用户账户中进行配置。

至此，即可以成功在公网上远程访问处在内网的Windows。两设备同在局域网内时，建议直接使用局域网IP直接连接，有ipv6地址的可以使用ipv6地址。
