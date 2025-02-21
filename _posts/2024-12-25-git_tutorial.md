---
# multilingual page pair id, this must pair with translations of this page. (This name must be unique)
lng_pair: git_tutorial
title: 使用 Git 作为管理工具的软件开发指南

# post specific
# if not specified, .name will be used from _data/owner/[language].yml
#author: ""
# multiple category is not supported
category: auto generated
# multiple tag entries are possible
tags: [git, develop, coding]
# thumbnail image for post
img: ""
# disable comments on this page
comments_disable: true

# publish date
date: 2024-12-25 11:32:53 +0900

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

## 使用 Git 作为管理工具的软件开发指南

在软件开发的过程中，不可避免的会遇到需要版本管理的场景，Git 就是一种用来为代码类文件做版本管理的软件。尽管除此之外它还有其它作用，不过，本节将专注在介绍那些使用 Git 作为代码管理工具的软件在开发过程中的**通用工作流**。比如 GitHub 上的各种开源项目，或者某些项目、公司内部的开发项目。本节将要介绍的工作流会以 GitLab 平台为样例，介绍一种最常见、最基础最通用的工作流，在其它平台或工具下也具有类似的流程顺序，只是对应的操作名称、工具有差异。

此外，本指南面向对以下这些要素中的一项或多项有需求的人群，如果这些要素**全都不在**你的需求范围内，那么你不是本指南的受众：代码管理、版本管理、代码协作、软件开发、Git、开发流程、项目维护。

### 前置知识

本指南需要你具备一些前置知识，完成一些基本操作。

- 下载 Git
- 了解什么是终端/命令行/shell/terminal，并且会在其中执行命令
- 使用 Linux 或 Mac OS
- 写过代码
- 至少能够访问一种使用 Git 的代码管理平台，例如 GitHub, GitLab, Gitea 等

最好能了解一些概念，如果不了解也影响不是很大：

- graph
- hash code

### Git的常见操作

#### 初始化

- 在使用工具管理一组代码的时候，我们需要让这个工具知道哪些代码是它要管理的，那么对于Git来说，这个指令是：
	```bash
	git init
	```
	这个指令会把运行这个指令时所在的文件夹认为是一个Git仓库，也就是需要被它管理的地方。不管是你已经写了一些代码想开始用 Git 管理，还是想在一个空文件夹下面开始用 Git 管理，都可以使用这个指令。

#### 获取已经存在的仓库

- 对于已经由 Git 管理的代码仓库，可以使用这个指令将其下载到你本地：

	```bash
	git clone <git_url>
	```

	其中`<git_url>`请替换成你想获取的那个代码仓库的地址。这样会把对应的代码仓库下载到你运行这条指令的文件夹下。

#### 基本配置

- 很多情况下，用 Git 意味着你可能需要和其他人合作开发同一个代码仓库。那么你需要通过以下指令告诉 Git ，当前正在开发的人的身份：

	```bash
	git config --global user.name "[name]"
	git config --global user.email "[email address]"
	```

	不过要注意，这两条指令是全局配置，也就是说这台设备上的所有Git仓库默认都会以这个身份记录变化。所以如果你正在配置的设备不是你的私人设备，或者你可能会用不同身份向不同仓库提交代码，那么就不要加 `--global` 选项。

- 有的时候，你可能已经用Git在本地开发了一段时间，想把代码仓库上传到某个平台上去，那么那个不在你本地的平台一般称呼为远端/服务器/remote或者就是那个平台的名字。
	当你想为当前本地的仓库指定远端的地址时，使用：

	```bash
	git remote add origin [url]
	```

	这条指令的意思是将 `url` 所在的代码仓库设置为你当前仓库名为 `origin` 的远端对应仓库。

- Git 是一个对代码进行版本管理的工具，它的应用场景是对有分行的文本内容进行管理，这就意味着 Git 不应该负责对除此类文件以外的其他文件管理，也无法做好对其它类型文件的管理。

	常见的应该由 Git 管理的文件例子：代码源码，有分行的文本文件，有分行的各种格式的配置文件，有分行的文档文本，所有开发者通用的配置文件。

	常见的不应该由 Git 直接管理的文件例子：图片，音频，可执行文件，压缩包等各种二进制文件，大型 3d 模型，无分行数据集。本地缓存文件，本地运行日志，本地特有的环境、IDE等配置文件。

	为了显式地告诉 Git 哪些是它不应该（直接）管理的文件，可以使用一些功能或工具：
	- `.gitignore`
		在 git 仓库下放置这个文件，在其中填写需要被 git 忽略的文件名所满足的条件之后，除非强制要求 git 记录，否则 git 不会追踪此文件中提及的所有文件。
	- [[#git-lfs|git-lfs]]
		对于一些大型文件，不经常变更版本，偶尔需要迭代的文件，例如文档中的图片，可以使用 [git-lfs](https://git-lfs.com/) 管理。
#### 作出改动

- 拉取远端所有最新的记录：

	```bash
	git pull
	```

- 将文件标记为准备记录它的快照：
	```bash
	git add <file-name>
	```

- 把目前所有标记好的文件都保存到历史记录中，并且添加一条信息，这个操作称为 commit ：
	```bash
	git commit -m "[descriptive message]"
	```

	每次commit，git将标记了需要管理的所有文件创建一份快照。不同的commit在git中表示为一个一个独立的节点，节点之间有先后关系。

- 将当前分支上的记录推送到远端仓库：
	```bash
	git push
	```

- 在很多commit的关系网中，每条线性的commit链被称为一个branch（分支）。可以通过一些指令灵活切换当前正在开发的位置、删除分支等。
- 切换分支：

	```bash
	git switch <branch-name>
	```

- 创建新分支：

	```bash
	git branch [branch-name]
	```

- 删除分支：

	```bash
	git branch -d [branch-name]
	```

- 当我们想标记某个 commit 为特殊的状态、版本，那么可以用如下指令为当前的 commit 打上 tag ：
	```bash
	git tag <tag-name>
	```

- 创建了新的分支后，使用如下指令将其推送到远端：
	```bash
	git push origin <new-branch-name>
	git push -u <remote-branch-name>
	```
- 每个分支总是从某个已有的commit产生出来的，当我们想变更一条分支的检出点（checkout 出的那个commit）时，可以使用：
	```bash
	git rebase <branch-name>
	git rebase -i HEAD~[n]
	```

	当我们从图（graph）的角度理解 git 的组织形式时，我们当前对 git 所管理的内容操作实际是我们使用了一个名为 `HEAD`的游标，指向 git graph 中的不同节点（commit）。

	当使用 `git rebase <branch-name>`时，这意味着把当前分支的检出点移动到`<branch-name>`的最新处。

	`HEAD`是指当前正在开发的位置所对应的 commit 。

	如果使用了`-i`选项，这意味着 rebase 的过程是交互式的，你需要动态地修改 git 反馈给你的 rebase 配置文件，来修改你想对每个具体的 commit 所进行的操作。每个选项的含义在反馈的配置文件中有出现，请仔细阅读。最常见的使用选项是 `pick` `fixup`，`pick` 意味着需要保留选定的 commit 和 message， `fixup`意味着将对应的 commit 与它前一个合并并丢弃本条 commit message.

- 暂存当前工作区中尚未commit的内容：

	```bash
	git stash
	# 查看暂存/应用最后一个暂存/丢弃最后一个暂存
	git stash list/pop/drop
	```

#### 查阅信息

- 当你想查看当前仓库的状态，比如有哪些文件已经提交了、哪些被改动了之类的信息，使用：

	```bash
	git status
	```

	Git 底层对所有文件、commit 的识别都是通过对应的 hash code 来进行的，所以 git 中的大部分操作需要指定分支名或别的什么名时，都可以用 hash code 指定；同时，查看状态时也可以查看 hash code 是否一致判断当前所在的 commit 是否一致。

- 查看当前分支：

	```bash
	git branch
	```

- 查看当前的开发记录：

	```bash
	git log
	```

### 工作流

一个完整且理想的大型仓库的 git graph 是这样的：

![[../../assets/images/git_graph_full.png]]
这张图片意味着：

- `master`分支上只含有关键的、重要的版本。
- `develop`分支负责对所有 feature 分支的维护，所有的新feature的开发都会合并在`feature`上。
- 当决定将要发布release时，指定状态的`develop`将会转移到`release`上，`release`会进行全面的测试和必要的 bug 修复的工作，确认无误后将确认后的状态合并到 `master`上并打上 `tag`。

在大多数中小型项目中，是几乎用不到这样完整的开发流的，一般，上述模型会被简化为只有两个主要部份：

![[two_branch_graph.png]]
那么开发时对每个分支的定义将变为：（不要关注branch的名字，关注它的作用，在不同组织、机构、公司命名可能有各自的习惯，但是作用是基本相同的。）

- 一个分支用于维护已经开发好的所有功能，来自开发中的各种 feature 都只能被 merge 进入此分支。此分支可能会叫做 `master`或者`develop`或某个特殊的项目名称`project_name`.后续我们暂时称为`master`
- 每个 feature、bugfix 都会从`master` checkout出去，然后进行实际开发，在对应的内容开发完毕并且通过各种测试后才能被合并回`master`
- 每隔一段时间，maintainer 会根据开发状态决定要不要发 release， 如果要的话，直接在`master`上对应的 commit 打上tag，将tag对应的状态发布为特定版本的release。

#### Developer 视角

本小节从 developer 的视角，阐述如果你想加入某个项目的开发，最基本的工作流是什么样子的。

0. Clone 源码至本地
	使用`git clone` 将需要开发的代码拉取到本地。然后配置自己的git个人信息。
1. 在新分支中开发
	先使用`git switch`切换到你想要开发的分支上，一般来说这个分支是`master`。然后使用`git checkout -b <new-branch-name>`从你想开发的分支上创建一个新的分支出来，记得满足项目所需的分支名命名规则。
2. 进行改动并测试
	在这个分支上完成一些独立且完整的功能开发，开发完成后进行测试。
	请记得遵守自己开发语言的 coding style 以及其它可能的代码规范.
3. 提交更改
	将每个完整独立的功能使用一个 commit 提交。如果在开发过程中混杂了一些临时的 commit，请使用 `git rebase`整理自己的提交记录，确保每个 commit 完整且独立，并且使用了[[#良好的 commit message]]或遵守项目的 commit message 要求。
	此外，对于具体的项目，可能还需要更新[[#CHANGELOG]]、文档或者其它文件。
4. 推送到远端
	使用`git push`将开发完成的代码推送到远端。
	提出 Merge Request 或 Pull Request 之前，一般需要确保分支已经 rebase 至目标分支的最新情况，来保持线性的开发历史。
5. 提出 Merge Request 或 Pull Request
	在对应的代码平台上，提交MR或者PR。按照项目的要求填写清楚信息，选择好项目指定的 tag。将reviewer修改为仓库指定的人选或者maintainer。如果MR已经准备完成，assign项目要求的人员或者maintainer；如果尚未完全准备好被review，assign你自己。
6. 等待服务器的自动化检查流程运行完毕，如果某些必要的自动化检查未通过，请按照未通过的原因修改自己的代码。重复2-4步直至可以动过全部必要的自动化检查。
	一般这些自动化检查会显示为一个红色或绿色的标识状态的图标。可能会叫做CI/CD，pipeline，action等。
7. 等待 reviewer 给出反馈，如果有需要改动的地方，根据意见重复2-4步，改动完成后回复提出意见的人，清楚地表明已经完成修改，直至reviewer认为没有问题。
8. 等待PR或MR被合并。一次单一的开发就完成了。
9. 继续使用项目，在发现有问题时，提交详细的问题描述至 issue 区。或者继续完成maintainer指派给你的开发任务。

#### Maintainer 视角

本小节从 maintainer 的视角，阐述如果你成为某个项目的 maintainer， 需要做好什么才能维护项目的工作流。

0. 确保你维护的项目已经为开发者提供了明确的指南，来指引正确地他们向你维护的项目提交符合你内心要求的代码。
1. 为你的项目设置必要的自动化检查流程。
	对于普通的提交，这些自动化检查可能会包括：对代码的静态检查，对文本、代码的格式、拼写检查，对某些代码的可编译性检查，对有需求的信息提供与否的检查，代码的测试、分支内容是否最新。
	对于合并后、打上tag的提交，这些自动化流程可能会包括：自动关闭有关联的 issue 或其它外部平台的资源，自动发布有关代码或构建后的产物至需要的目的地，自动更新某些描述、文档、运行中软件的版本等。
2. 等待新接收到的PR或MR所有自动化检查通过。
3. 对需要 review 的代码分配合理的 reviewer （小型项目一般就是你自己），让他检查所有需要人工检查的内容。比如：此问题的解决是否必要，目标分支是否正确，代码实现是否正确高效，是否提供了必要的注释或说明 ，是否出现了不应当出现的文本内容（有侮辱性的词汇，有风险的实现等）。
	检查后需要指引开发者完成有关修复，直至没有问题。
4. 合并分支至目标分支 。合并时可能需要注意：是否需要将本次 MR 或 PR 中所有的 commit 都合并成一个 commit 再合并，是否需要产生一个merge commit，是否需要自动将分支 rebase 至最新。
5. 及时根据项目情况，更新：
	1. 开发指南和有关文档
	2. 关闭已解决、不需要解决的 issue
	3. 为 issue 分配合适的开发者
	4. 检查 MR 或 PR 的进展
	5. 配置必要的自动检查流程

### 通用开发规范

以下是一些常见的、通用的开发规范，在具体项目中可能会有不同的具体要求，需要以具体项目的要求为准。但是在你自己创建项目时，或者项目还没有规则时，使用这些规则是一个不错的开始。

#### 良好的 commit message

commit message 必须简短明确，不要夹杂语义不明或重复性、含糊性的表述。请参考以下链接。

> https://wiki.openstack.org/wiki/GitCommitMessages#Information_in_commit_messages

当然，在某些项目中 commit message 可能还需要满足某些格式要求，以规范形式，或者使得某种自动化工具可以自动从中提取信息，具体情况应当按照具体项目的要求进行。

#### 分支

用不同的前缀来命名不同的分支，常见的分支前缀如下:

- `feature/` : 开发了新 features 或者相关改动的分支.
- `bugfix/` : 修复 bugs 的分支,例如: `bugfix/missing_validation_check`
- `backport/`:将更改应用到之前的版本上的操作。
- `wild/` : 前述未包含的其他分支, 例如临时分支，测试分支等.

在部分项目中，可能还需要在前缀中添加开发者姓名或开发子项目或子模块的名称：

- `prefix/your_name/usage`: 同时需要在前缀中加上你（开发者）的名字，明确分支所属权，例如: `feature/changshan/socket`
- 如果某个代码仓库包含多个子项目、子模块，或者多个开发的方向，则需要指名正在开发的子项目。例如存在某个叫做 `fire` 的子项目，那么为它开发 `feature` 的分支应当命名为 `feature/fire/<the-feature-name>`

#### [[versioning|版本控制]]

为了了解和标识软件的开发进展，有时候我们为代码打上 tag，标识当前的软件版本，版本的定义需遵循如下的规则： [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html)

#### CHANGELOG

Changelog 用来记录代码变更的情况，它的使用 遵循： [Keep A Changelog 1.0.0](https://keepachangelog.com/en/1.0.0/)

### 常见问题

- 你这也算常见/xxx？我以前在xxx就不是这样的。
	是的，你是对的。
- 为什么GitHub叫Pull Request，GitLab叫Merge Request？
	GitHub上维护的一般是开源的自由项目，从
- 如何配置一些自动化检查流程？
	- [GitHub Action](https://docs.github.com/en/actions)
	- [GitLab CI/CD](https://docs.gitlab.com/ee/ci/)
- 我想添加一个空文件到git中，怎么做？
	在文件夹下添加一个空的名为 `.gitkeep`的文件：`touch .gitkeep`
- 有没有什么 git 有关的 VSCode 插件推荐？
	- [Git Stash](https://marketplace.visualstudio.com/items?itemName=arturock.gitstash)
	- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
	- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)


### 其它有关需求传送门

如果本文中的内容你已全部理解掌握，仍然不能满足你的开发需求，那么说明你应该已经是一名具有搜索和学习能力的开发者了。这里提供了一些常见的进阶需求可能的技术方案或工具，你可以根据提供的链接或关键词自行搜索有关的资料。

- 将某个或某些已有的 commit 应用到指定的地方
	`git cherry-pick`: https://git-scm.com/docs/git-cherry-pick
- 利用git在commit前进行一些自动化检查和修改的工具
	pre-commit: https://pre-commit.com/
- 将某些文件永久地从git的历史中删除，比如有时曾经误将大型二进制文件提交进git导致仓库体积爆炸
	git-filter-repo: https://github.com/newren/git-filter-repo/?tab=readme-ov-file . 大体的操作是，先从pip安装这个git插件，然后用`git filter-repo --analyze`分析仓库结构，再用`git filter-repo --invert-paths --path <path>`剔除所有匹配的路径。
