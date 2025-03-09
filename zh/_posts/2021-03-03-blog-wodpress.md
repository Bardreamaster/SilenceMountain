---
# multilingual page pair id, this must pair with translations of this page. (This name must be unique)
lng_pair: blog-wordpress
title: 搭建个人博客（Word Press）

# post specific
# if not specified, .name will be used from _data/owner/[language].yml
#author: ""
# multiple category is not supported
category: auto generated
# multiple tag entries are possible
tags: [blog, wordpress, web]
# thumbnail image for post
img: ""
# disable comments on this page
comments_disable: true

# publish date
date: 2021-03-03 11:32:53 +0900

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
# published: false
---
> 某日心血来潮想搭建个人博客，记录自己学习中踩到的坑，写写自己的所见所闻、所感所想，于是就有了这篇Blog中的HelloWorld！

## 必备环境和基本技能需求：

* 阿里云轻量应用服务器
* 基本Linux操作
* SSH连接远程主机
* 域名（已备案最好）
* SSL证书

## 环境准备

*阿里云产品自身的文档已经在阿里云官网十分详细的列出了，所以涉及到阿里云产品的文字都只是介绍一下过程~~凑字数~~，请自行参阅官方文档*。

### 购买阿里云轻量应用服务器

在[阿里云](https://cn.aliyun.com/)可以参加学生计划，购买低价服务器，除了轻量应用服务器，还有许多其他产品可以选择。通过学生认证之后，不同时间段有不同的活动，运气好的话还可以白嫖ECS，当然学生服务器的价格已经很便宜了，基本99一年上下，能续费到毕业。这里是[购买链接](https://developer.aliyun.com/plan/grow-up?spm=5176.19720258.J_8058803260.1213.54212c4aRXzAyg 开发者成长计划) 。

轻量应用服务器购买时可以选择预装应用，这里选用word press版的，是预装好word press和相关环境的，实际上的内置环境包含了LAMP应用，也就是Linux+Apache+MySQL+PHP,服务器的系统是CentOS。

购买到服务器之后需要进入[阿里云控制台](https://cn.aliyun.com/)，进入轻量应用服务器控制台，对服务器进行初始化，也就是**设置管理员账户密码**，这样后续才能SSH连接到服务器对服务器上的文件进行修改。

服务器可以直接通过公网IP访问，后续绑定域名之后可以通过域名访问。

对于绝对的小白，其实到此个人博客的服务器就已经搭建好了（是的没错，阿里云自带了现成的应用，我们只需买，然后使用）。但是由于阿里云本身附带的WordPress和PHP版本较低，后续对网站更换主题，插件和其他功能的支持限制过大，所以后续会一并阐述如何提前解决这些可能遇到的Bug。同时，服务器本身在没有域名的情况下只能通过公网IP直接访问，后续也将介绍如何优化网站的访问、外观和使用。

### 购买，绑定域名

同样，也可以在[阿里云](https://wanwang.aliyun.com/domain/)直接购买域名，当然在其他服务商购买也是可以的，直接在同一个公司买后续搭建会比较方便。以 .xyz/.top/.vip 结尾之类的普通域名基本都可以以每年10块以内的价格拿下，预算充足可以挑选其他喜欢的域名。

域名购买成功后，可以进入[阿里云控制台](https://cn.aliyun.com/)，将域名与服务器绑定，也就是让域名解析到服务器的IP上。

* 进入服务器控制台：控制台/产品与服务/轻量应用服务器
* 绑定域名：站点设置/域名/添加域名，输入你买的域名，就会自动添加一条A记录的解析。

### 域名备案

**在中华人民共和国境内提供互联网信息服务，应当依法履行ICP备案手续。**

阿里云也免费提供了一站式辅助网站备案的方案，可以直接遵循[网站](https://beian.aliyun.com/)指导进行。

备案时建议地点选择户籍所在地，可以避免部分地区对暂住证等额外证件的需要。备案时长不等，提交申请之后只需等待，可以继续进行后续步骤。不同地区的详细备案要求也可以在前一个链接中查看。

备案完成之后也应当按照相关要求将备案号及相关链接展示在网站的明显处。

### 申请并安装免费SSL证书

为网站安装SSL证书是为了后续实现HTTPS访问，也就是我们常见的浏览器打开网页之后在网址前方的小绿锁，提示网站是安全的。如果不需要HTTPS，可以忽略这一步。

在阿里云购买域名之后，可以[申请请免费的SSL证书](https://help.aliyun.com/document_detail/156645.html?spm=a2c4g.11174283.3.4.17266fd4S7k7sK)，并且[一键安装到服务器](https://help.aliyun.com/document_detail/127000.html?spm=a2c4g.11186623.6.664.68397f6dJZr5RP)上，不需要再进行额外的操作。

安装成功之后在服务器控制台的站点设置下可以看到HTTPSS状态为已开启，并且在防火墙的解析条目中增加了HTTPS对应的端口记录。

## 升级PHP

后续升级Word Press，需要足够新的PHP支持，所以我们先升级PHP。

* 使用```vim php_update.sh```命令在服务器上新建脚本，将如下代码[^1]粘贴在文件中并保存。随后运行```sh php_update.sh```即可将PHP升级至7.3版本，其他版本需要更改脚本内的下载文件及相关文件名。脚本依次执行了安装依赖-配置SWAP-安装libzip-链接-编译-安装-修改Apache配置-重启服务。

  ```shell
  #!/bin/bash
  WORKDIR=/tmp/
  PHP73_DIR=/usr/local/php73
  DEFAULT_SWAP=0

  createSwap(){
    if [ `cat /proc/meminfo | grep SwapTotal | awk -F " " '{print $2}'` -ne 0 ]
    then
      return 0
    fi
    if [ `cat /proc/meminfo | grep MemTotal | awk -F " " '{print $2}'` -le 1048576 ]
    then
      echo "Mem lower than 1GB,creating swap..."
      dd if=/dev/zero of=/swap bs=1M count=2048
      mkswap -f /swap
      swapon /swap && echo "SWAP create success."
      DEFAULT_SWAP=1
    fi
  }

  installDependence(){
    yum install -y libxml2-devel openssl-devel  curl-devel libjpeg libjpeg-devel libpng libpng-devel freetype freetype-devel xslt libxslt-devel
    yum update -y curl curl-devel
    yum remove -y libzip
  }

  compileLibzip(){
    echo "start install libzip."
    cd ${WORKDIR}
    if [ -f libzip-1.2.0.tar.gz ]
    then
      rm -rf libzip-1.2.0.tar.gz
    fi
    wget https://code.aliyun.com/yh11/download/raw/master/libzip-1.2.0.tar.gz
    tar -zxvf libzip-1.2.0.tar.gz
    cd libzip-1.2.0
    ./configure
    make && make install
    if [ $? -ne 0 ]
    then
      echo "libzip install failed."
      exit 127
    fi
    ln -s /usr/local/lib/libzip/include/zipconf.h /usr/local/include
  }

  installPHP(){
    echo "Install PHP 7.3"
    cd ${WORKDIR}
    if [ -f php-7.3.9.tar.gz ]
    then
      rm -rf php-7.3.9.tar.gz
    fi
    wget https://code.aliyun.com/yh11/download/raw/master/php-7.3.9.tar.gz
    tar -xvf php-7.3.9.tar.gz
    cd php-7.3.9
    ./configure --prefix=/usr/local/php73  --enable-soap --enable-cgi --with-mysql=/usr/local/mysql --with-mysqli=mysqlnd --with-gd --with-pdo-mysql=mysqlnd --with-zlib --enable-zip --enable-fpm --without-pear --disable-phar --with-openssl --enable-mbstring=all --with-jpeg-dir=/usr --with-png-dir=/usr --with-curl --with-freetype-dir=/usr --enable-gd-native-ttf --with-xsl=/usr --enable-calendar --enable-exif --enable-ftp --with-iconv --enable-bcmath --with-mcrypt=/usr/local/libmcrypt --enable-opcache
    make && make install
    if [ $? -ne 0 ]
    then
      echo "PHP install failed."
      exit 127
    fi
    cp sapi/fpm/init.d.php-fpm /etc/init.d/php-fpm73
    cp ${PHP73_DIR}/etc/php-fpm.conf.default ${PHP73_DIR}/etc/php-fpm.conf
    chmod +x /etc/init.d/php-fpm73
  }

  createConfig(){

  cat << EOF > ${PHP73_DIR}/etc/php-fpm.d/www.conf
  [www]
  listen = /home/www/logs/php73-fpm.sock
  listen.mode = 0666
  user = www
  group = www
  pm = dynamic
  pm.max_children = 128
  pm.start_servers = 5
  pm.min_spare_servers = 5
  pm.max_spare_servers = 15
  pm.max_requests = 300
  rlimit_files = 1024
  slowlog = /home/www/logs/php73-fpm-slow.log
  EOF

  }

  modifyApache(){
    sed -i 's#ProxyPassMatch ^/(.*\.php(/.*)?)$ unix:/home/www/logs/php-fpm.sock|fcgi://127.0.0.1/home/www/htdocs#ProxyPassMatch ^/(.*\\.php(/.*)?)$ unix:/home/www/logs/php73-fpm.sock|fcgi://127.0.0.1/home/www/htdocs#g' /usr/local/apache/conf/httpd.conf
  }

  restartService(){
    chkconfig php-fpm off
    chkconfig php-fpm73 on
    /etc/init.d/php-fpm stop
    /etc/init.d/php-fpm73 start
    /etc/init.d/apachectl restart
  }

  delSwap(){
    if [ ${DEFAULT_SWAP} -eq 1 ]
    then
      swapoff /swap
      rm -rf /swap
    fi
  }

  createSwap
  installDependence
  compileLibzip
  installPHP
  createConfig
  modifyApache
  restartService
  delSwap
  ```

* 运行下述命令将下载文件中的```php.ini-development```文件复制到```/usr/local/php73/lib```，命名为php.ini，并重新启动服务器。

  ```shell
  cp /root/php-7.3.9/php.ini-development /usr/local/php73/lib/php.ini   #移动文件
  /etc/init.d/php-fpm73 start   #重启php
  /usr/local/apache/bin/apachectl restart   #重启apache
  ```

* 升级完成后，在后续的使用中可能会遇到上传某些文件大小和数量的限制，可以在上述的```php.ini```中修改```upload_max_filesize = 20M```等相关参数。[^2]

* 安装完成后，在站点根目录下放置php探针以验证安装成功，并查看相关信息。

  将如下代码保存到```phpinfo.php```文件中，将此文件上传到站点的根目录``` /home/www/htdocs/```，然后访问```http://域名/phpinfo.php```,出现了PHP版本等相关信息即为配置成功。

```php
  <?php
	phpinfo ( ) ;
  ?>
```

## 配置WordPress

### 升级WordPress

Word Press官网在国内难以以常规方式快捷访问，导致在站点控制台中直接升级时频繁报错，并无法正常升级，所以需要手动进行升级。

* 首先到Word Press网站[^3]上下载（需要能够访问外网）你需要的升级版本的.zip文件到本地（也可以直接下载在服务器的/tmp或其他地方，只要不是原本的安装目录下就行）。
* 解压此文件，删除其中的```wp-content```文件夹和```wordpresswp-config-sample.php```文件，将其它内容上传至站点根目录``` /home/www/htdocs/```，替换原有文件。
* 访问站点的后台，查看升级情况，后台会提示需要升级数据库，跟随提示等待升级即可。

### 强制HTTPS访问+301重定向

进行此步前请确保你的服务器防火墙HTTPS的443端口是放行的。

开启HTTPS是为了提高网站安全性，提高网站在搜索引擎中搜索结果的比重，301重定向是为了满足百度对网站收录的相关要求，如没有对应的需求可以适当舍弃部分操作，并不影响站点的正常运行。

* 在``` /home/www/htdocs/```目录下的```.htaccess```文件末尾添加如下代码，保存文件。

  ```php
  RewriteEngine On
  RewriteCond %{SERVER_PORT} !^443$
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  ```

* 尝试使用HTTPS访问你自己的网站，如果访问成功，进入Word Press控制台，在设置中将站点url更改为https开头，请务必确保访问成功再修改站点url，否则有可能导致无法进入站点控制台。

* 生效之后使用域名访问会强制转跳至HTTPS，浏览器会显示绿色的小（绿）锁并提示网站安全。301重定向是否成功可以随便在搜索引擎搜一个网站状态检测检查。

### 站点优化

* Word Press官方和第三方有大量可供免费使用的主题，只需在网络上搜索心仪的主题根据其教程安装即可使用。

* 插件推荐

  * 首先强调的是并不推荐使用过多的插件，因为服务器的内存有限，插件过多可能会导致服务器卡顿、死机，其次过多的插件会拖慢网站的加载速度，影响访问体验，最后就是插件也存在各种各样的bug，慎重使用。

  * **Yoast SEO**：第一个真正意义上的 WordPress 全能SEO解决方案！包含了页面内容分析、XML站点地图和更多功能。

  * **Easy WP SMTP**：通过 SMTP 从您的 WordPress 博客发送邮件。

  * **All-in-One WP Migration**：所有博客数据的迁移工具。 只需点击一下即可导入或导出您的博客内容。

    进行各种升级、安装新插件前请做好备份，保护自己的数据，可以通过服务器保存服务器快照，也可以通过上述插件保存博客相关数据，同时应养成定时多备份的习惯。

## 知识补充及辅助工具推荐

### 服务器上各服务的安装位置

* Apache：/usr/local/apache

* PHP：/usr/local/php56 或者 /usr/local/php73 （取决于版本）
* MySQL：/usr/local/mysql
* WordPress ：/home/www/htdocs

### 初始管理密码获取

* Word Press：

  在服务器上运行该命令获取：```sudo grep wordpress_admin_passwd /root/env.txt```

  管理员登录地址：```http://{yourIP}/wp-login.php```

* MySQL：

  在服务器上运行该命令获取：```sudo grep mysql_root_passwd /root/env.txt```

### 其他推荐

* linux修改主机名：```hostnamectl set-hostname <newhostname>```

* 通过链接下载：```wget {url_you_want_to_download_from} ```

* 利用wget断点续传,网络环境差时可以使用：```wget -c {url_you_want_to_download_from} ```

* **MobaXterm**：SSH终端，支持拖动文件操作，[官方](https://mobaxterm.mobatek.net/)有免费版。

* 手动SSH连接：```ssh  name@IP```例如```ssh  hahaha@192.168.1.1```

* vim简易操作：```i```键进入编辑模式，保存并退出 ```esc```加```:wq```，退出 ```esc```加```:q```.

* Linux命令行多窗口工具：screen

## 引用

[^1]: https://developer.aliyun.com/article/717769   “PHP升级脚本”
[^2]: https://www.cnblogs.com/wstong/p/12770528.html   “php.ini配置”
[^3]: https://cn.wordpress.org/download/   "WordPress/Download"
