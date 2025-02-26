---
layout: cv
# multilingual page pair id, this must pair with translations of this page. (This name must be unique)
lng_pair: cv

# image for page specific usage
# img: ":about.jpg"
# publish date (used for seo)
# if not specified, site.time will be used.
#date: 2022-03-03 12:32:00 +0000

# for override items in _data/lang/[language].yml
#title: My title
#button_name: "My button"
# for override side_and_top_nav_buttons in _data/conf/main.yml
#icon: "fa fa-bath"

# seo
# if not specified, date will be used.
#meta_modify_date: 2022-03-03 12:32:00 +0000
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

PDF 请在此处下载： [简历](https://silencemountain-1313535466.cos.ap-guangzhou.myqcloud.com/cv.pdf)。

## 联系方式

- 邮箱： <changshanshi@outlook.com>
- 个人主页： <https://shichangshan.xyz>
- GitHub： <https://github.com/Bardreamaster>

---

## 教育及工作经历

- 帕西尼感知科技（深圳）有限公司， 机器人软件工程师 *2023/10-现在*
  - 开发方向：遥操作算法，人形机器人上肢控制算法，模仿学习等应用算法调优。
- 蓝胖子机器智能有限公司，机器人软件工程师 *2022/8-2023/9*
  - 工作语言：英语。
  - 开发方向： 拆码垛机器人算法及应用。
- 南方科技大学，机械与能源工程系，机器人工程本科 *2018/8-2022/7*
  - 修读课程： 现代控制与最优估计、控制工程基础、机器人建模与控制、工程机器学习、工程优化；信号与系统、模拟/数字电路、数据结构与算法分析；机械设计、材料力学.

---

## 论文

- Tianyu Wu, Yujian Dong, Xiaobo Liu, Xudong Han, Yang Xiao, **Jinqi Wei**, Fang Wan, Chaoyang Song. Vision-based tactile intelligence with soft robotic metamaterial, Materials & Design,Volume 238,2024,112629,ISSN 0264-1275, doi: 10.1016/j.matdes.2024.112629 . [[paper]](https://www.sciencedirect.com/science/article/pii/S0264127524000017)
- T. Wu, Y. Dong, Y. Xiao, **J. Wei**, F. Wan and C. Song, "Vision-based, Low-cost, Soft Robotic Tongs for Shareable and Reproducible Tactile Learning," 2024 International Conference on Advanced Robotics and Mechatronics (ICARM), Tokyo, Japan, 2024, pp. 388-393, doi: 10.1109/ICARM62033.2024.10715842. [[paper]](https://ieeexplore.ieee.org/document/10715842)

---

## 项目经历

### 帕西尼感知科技

- 人形机器人遥操作
  - 为内部自研人形机器人设计代码框架，独立实现轮式人形机器人遥操作软件开发。编写运动学控制代码，使用外部传感器控制机器人的底盘、腰部、上肢和头部。
  - 搭建完整的需求-验证-开发-测试-CI/CD流程。
  - Keywords: ROS2, kinematics, Python, System Management.
- 多模态数据采集与处理
  - 设计使用人体数据采集装置，采集人类行为和操作中的视觉、深度和位姿信息，对数据后处理用于模仿学习。
  - Keywords: Computer Vision(CV), Point Cloud Processing, Imitation Learning.

### 蓝胖子机器智能

- 某白酒业国企大型自动化生产线
  - 使用KUKA高负载机械臂，在视觉分割、识别、定位目标物体后，再经过线性规划区分来料垛型，从输送线上自动整层或整排或零散地执行订单所需的拆垛任务。
  - 使用Yaskawa中低负载机械臂，有序整层拆取码放完好的装有物料的箱体整垛，有序释放物料至指定区域，并重新码垛空余箱体。
  - Keywords: C/C++, Python, ROS2, Linux, Linear programming, KUKA KRL, CV.
- 拆码垛方案实验、验证、演示综合平台
  - 使用Yaskawa中低负载机械臂，开发和维护用于通用拆码垛场景的应用方案，并作为专用技术测试平台和稳定效果演示平台。
  - Keywords: C/C++, Python, ROS2, Path Planning, Trajectory Plan, CV, Linux, Socket.

### 宁泉科技-南方科技大学工学院 综合设计

- 结构化通用表征结构环境人机交互系统——远程控制与综合教学设计
  - 项⽬开发了⼀套包括硬件、软件、使用方案的完整系统，使用3D打印对硬件进⾏设计与加⼯，基于网页开发了⼀套交互式数据采集软件，并提供了详细的使⽤教程与应⽤样例，⼤幅降低了使⽤与学习成本，提⾼了机器⼈操作数据采集与相关知识学习的效率。项⽬系统在协作机器⼈课程中进⾏了为期2周的实验课程的教学，获得了丰富的反馈意⻅。部分效果与源码开放在GitHub。
  - Keywords: Python, CV ArucoCode PoseDetection, Learning by Demonstration, Imitation Learning, Human–Machine Interaction, UR.

### BionicDL Lab 机械臂项目实践

- 视觉识别的机械臂等设备的交互友好式操作 *2021.7-2021.9*
  - 以 UR 机械臂为样例开发调试了通过外置摄像头和移动二维码来远程非接触控制机械臂（或其它机械设备）的控制方式，并基于此简化对无知识背景的人的使用和操作成本，同时与 Franka、Aubo 的原始操作方式进行了对比.受权限限制，相关代码部分发布在 GitHub 上，显示效果部分以视频形式发布在 Bilibili 上：[小学生也可以自由地和机械臂玩耍](https://www.bilibili.com/video/BV1yM4y1V73B/)。
  - Keywords: C++, Python, Franka, Pose Detection, Human–Machine Interaction, Teaching Application, Remote Control.
- 视觉识别的机械臂垃圾分拣流水线 *2021.1-2021.6*
  - 使用 Franka 机械臂对移动传送带上的硬质物体进行识别分拣，并量化考量抛掷方式比移动方式的优势。在项目中负责视觉识别，机械臂控制逻辑，团队协作代码环境，技术文档编写。相关代码、文档及效果演示均发布在 [GitHub](https://github.com/Bardreamaster/ME336-Yellow-Team-Project) 上。
  - Keywords: C++, Python, Franka, Yolo, Machine Learning, Data Collection&Preparation&Training.

### 大疆 RoboMaster 机甲大师赛

- ARTINX 战队电控组成员、电子硬件组负责人 *2019.6-2020.10*
  - 负责机器人[主控板](https://github.com/Bardreamaster/Chasis)、[超级电容及功率控制模块](https://github.com/Bardreamaster/SuperCapacitor/tree/main)的开发制造，并负责使用 Keil 编写调试功率控制代码, 熟悉 vscode 编写、Keil 调试的工具链。
  - 使用 AltiumDesigner、KiCad、立创 EDA 进行电路设计、产品测试。
  - 熟练掌握手工 PCB 焊接、测试技术，熟练使用数字电源、信号发生器、示波器进行电路调试.
  - Keywords: Embedded System, PCB Design.
- ARTINX 战队机械组成员、财务管理 *2018.10-2019.5*
  - 使用 Solidworks设计步兵机器人.
  - 管理年度赛季资金流动(流水二十余万元)，撰写财务报表，寻找合适供应商，奔走采购、报价、报销流程.
  - Keywords: Mechanical Design, Cost Control, Project Management.

---

## 获奖经历

- 南方科技大学2021-2022学年综合设计一等奖(1/33)
- 南方科技大学2022届本科生优秀毕业设计（论文）：“结构化通用表征结构环境人机交互系统——远程控制与综合教学设计”
- 第十九届全国大学生机器人大赛 ROBOMASTER2020 机甲大师对抗赛全国三等奖
- 第十八届全国大学生机器人大赛 ROBOMASTER2019 南部分区赛三等奖
- 南方科技大学2018级入学奖学金
