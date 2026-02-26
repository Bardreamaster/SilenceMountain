---
# multilingual page pair id, this must pair with translations of this page. (This name must be unique)
lng_pair: export-bv
title: 如何导出B站缓存视频

# post specific
# if not specified, .name will be used from _data/owner/[language].yml
#author: ""
# multiple category is not supported
category: auto generated
# multiple tag entries are possible
tags: [guide]
# thumbnail image for post
img: "https://i.pinimg.com/1200x/ce/0a/44/ce0a4475db8c42ed627723ff674754a9.jpg"
# disable comments on this page
comments_disable: true

# publish date
date: 2026-02-25 11:32:53 +0100

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
published: True
---

B 站的客户端可以缓存视频到本地，但是只能在 B 站的客户端上播放，其实这背后并没有复杂的加密技术，只是一些基础的混淆视线的做法。

去除这些混淆并不是困难的事情，不关心原理的话可以直接跳到最后，最后提供了 [python 脚本](https://github.com/Bardreamaster/bv_converter)用于导出缓存数据为 `.mp4` 文件。

我们知道这些视频文件被缓存到本地后，数据本身已经存在于本地了。只需要想办法找到这些数据并且以常规的方式显示出来即可。

不同平台默认的 B 站缓存路径如下：

- Windows: C:\Users\用户名\Videos\bilibili
- Mac: ~/Library/Application Support/Bilibili/com.bilibili.downloads/web_cache/data
- Android: Android/data/tv.danmaku.bili/download

但是不管默认在哪里，可以先在设置里面改到一个自己喜欢的地方。以 Mac 端为例，在左下角“设置”中打开的页面中可以找到“下载设置”，此处可以更改视频缓存目录。

如果缓存了一些视频到本地，打开 B 站缓存视频的文件夹可以看到，里面是很多数字命名的文件夹，每个文件夹中是缓存的一个视频的有关信息，包括一些写了 metadata 的 `videoInfo.json`，封面图、合集图，以及几个 `.m4s` 文件。通过对文件内容检查可以发现：
- 每个文件夹中的两个 `.m4s` 文件即为视频的视频流和音频流部分。不难判断，一般体积大的是视频部分，体积小的是音频部分。
- 每个 `.m4s` 文件的前面 9 个字节是干扰数据（通常是填充的 `0`），也就是有存在文件头偏移。

知道了缓存被如何混淆，那么处理这些缓存的思路就很清晰了：

1. 读取信息：从 `videoInfo.json` 中提取出 `bvid` 和 `title`，用来给输出的 MP4 文件直观命名。
2. 识别流：一个文件夹下会有两个较大的 `.m4s`。通常体积大的是视频，体积小的是音频。
3. 文件修复：跳过前 9 个字节，读取剩余的内容并保存。
4. 封包（Muxing）：使用 FFmpeg 将修复后的视频流和音频流合并成一个 MP4 容器。

根据这个思路，很容易写一个 python 脚本批量处理缓存文件夹下的所有视频，写好的脚本放在 [github](https://github.com/Bardreamaster/bv_converter) 上。也能从 pypi 直接安装 `pip install bv-converter`，然后 `bv_converter <cache_dir> <export_dir>` 即可。

网上有很多导出工具，不是要钱就是有病毒，没必要把简单的事情做的太复杂。
