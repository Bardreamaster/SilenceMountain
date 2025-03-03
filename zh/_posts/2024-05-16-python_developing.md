---
# multilingual page pair id, this must pair with translations of this page. (This name must be unique)
lng_pair: bppythonlogging
title: Best practice for python logging in module

# post specific
# if not specified, .name will be used from _data/owner/[language].yml
#author: ""
# multiple category is not supported
category: auto generated
# multiple tag entries are possible
tags: [python]
# thumbnail image for post
img: ""
# disable comments on this page
comments_disable: true

# publish date
date: 2024-05-16 11:32:53 +0900

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

##

### Overview

开发一些带有 logging 的 python 模块时， 我们希望能够用一些简单的办法在模块中随意的调用 logging， 避免为每个子模块反复初始化不同的记录策略。同时，当我们将开发好的模块继承在其他项目中时，或者将模块提供给其他开发者作为他们项目的一部分使用时，最好能够确保我们开发的模块内部的 logger 能够按照其他开发者的目的和意图方便地变更记录策略。结合 [Python logging HOWTO](https://docs.python.org/3/howto/logging.html#configuring-logging-for-a-library) 中的阐述和开发经验，我尝试使用这样一种结构使得 logging 在模块中的使用方便起来。

> 读者最好能够已经预先了解 [Python logging HOWTO](https://docs.python.org/3/howto/logging.html#configuring-logging-for-a-library) 中提及了和未提及的内容。 文档中已经清晰阐述过的一些内容作者将默认读者已了解。

因此本文所述内容有几个前提需要读者知晓：

1. 你开发的模块需要 logging 作为日志或相关信息的解决方案。
2. 你不希望使用你的模块的其他开发者在未经显式地配置 logging 记录策略时就主动将一些信息强制打印出来或者记录在根记录器上。

### Usage

假定我们创建了一个叫做 `parent_package` 并且包含 `sub_module`的包. 文件结构如下：

```text
--- parent_package
    |--- __init__.py
    |--- parent_module.py
    |--- logger.py
    |--- sub_package
        |--- __init__.py
        |--- sub_module.py
```

1. 给模块添加一个通用的 logger 生成器.

    如下的代码可以让你在模块中的任意地方获取到一个以调用模块的名称全称为名的 logger， 这样就不需要手动为自己的大量文件指定 logger 名称。

    之所以要这样做，是因为 python logger 之间具有层级关系，命名为 `a.b.c` 的 logger 可以在通过修改顶层 `a` 的情况下，使得全部子层级（比如 `b` `c`）的 logger 具有（不是覆盖， sub-logger 可以有独立的一些表现）同样的表现。 这样方便我们对庞大模块中的 logger 进行管理。

    ```python
    # logger.py
    import inspect
    import logging
    from logging import Logger


    def get_logger(name: None) -> Logger:
        """Get logger for the calling module.

        Returns:
            Logger: Logger object for the calling module. For example, if this function is called from module `parent_package/sub_package/sub_module.py`, the logger will be named `parent_package.sub_package.sub_module`.
        """
        if name is None:
            return logging.getLogger(inspect.currentframe().f_back.f_globals["__name__"])
        else:
            return logging.getLogger(name)
    ```

2. 在模块顶层添加一个 `NullHandler` 这样所有以 `parent_package.` 为前缀的 logger 都将表现为同样的情况： 没有任何输出。

    ```python
    # parent_package/__init__.py
    import logger

    _logger = logger.get_logger()   # this logger will be named `parent_package`
    _logger.addHandler(logging.NullHandler())

    def get_logger():
        return _logger
    ```

3. 在模块外部调用模块时， 给模块添加一个想要的 logger 功能。

    比如这里我们在模块之外添加一个调用了它的 `main.py`:

    ```text
    --- main.py
    --- parent_package
        |--- __init__.py
        |--- parent_module.py
        |--- logger.py
        |--- sub_package
            |--- __init__.py
            |--- sub_module.py
    ```

    在这个例子中，我们添加一个最简单的 `StreamHandler` 给 logger `parent_package`，这样这个 logger 可以在终端显示log信息。

    ```python
    # main.py which uses the parent_package
    import logging

    import parent_package

    def main():
        # Method 1
        _logger = parent_package.get_logger()
        # Method 2
        # _logger = parent_package.logger.get_logger("parent_package")

        sh = logging.StreamHandler()
        sh.setLevel(logging.DEBUG)
        sh.setFormatter(
            logging.Formatter(
                "[%(levelname)s]: %(message)s [%(asctime)s](%(filename)s:%(lineno)d)"
            )
        )
        _logger.addHandler(sh)

        # do something else

    if __name__ == "__main__":
        main()
    ```

    这样一来，我们在自己开发模块时可以自由地修改不同模块中我们想查看的 log level。 在将模块给其他开发者使用时，我们只需要给他们提供一个获取到我们的模块的 logger 的接口，或者就是告诉他们我们的 logger 的名字，他们就可以根据情况控制模块中 log 的表现。 当然我觉得提供一个接口是比较优雅的，这样即使 logger 未来有名称或者结构上的变更， 只要这个接口 API 向下兼容就不需要修改使用了这个模块的代码， 避免了硬编码一些不必要的东西在代码中。

## Reference

- [Python logging HOWTO](https://docs.python.org/3/howto/logging.html#configuring-logging-for-a-library)
