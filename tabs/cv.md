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
PDF is avalible here: [CV-en.pdf](https://silencemountain-1313535466.cos.ap-guangzhou.myqcloud.com/cv-en.pdf).

## Contact

- Mail： <changshanshi@outlook.com>
- Home Page： <https://shichangshan.xyz>
- GitHub： <https://github.com/Bardreamaster>

---

## Education and Work Experience

- PaXini Technology (Shenzhen) Co., Ltd. Robotics Software Engineer. *2023/10-Now*
  - Responsibilities：Humanoid & Teleoperation algorithm, imitation learning data collection.
- Dorabot Inc. Robotics Software Engineer. *2022/8-2023/9*
  - Working Language：English.
  - Responsibilities： Depalletizing robot application and unloading algorithm and software development.
- [Department of Mechanical and Energy Engineering](https://mee.sustech.edu.cn/?lang=en)(MEE), [Southern University of Science and Technology](https://www.sustech.edu.cn/en/)（SUSTech）. Bachelor of Robotics Engineering. *2018/8-2022/7*
  - [Bionic Design + Learning Lab (BionicDL Lab)](https://bionicdl.ancorasir.com/)

---

## Publication

- Tianyu Wu, Yujian Dong, Xiaobo Liu, Xudong Han, Yang Xiao, **Jinqi Wei**, Fang Wan, Chaoyang Song. Vision-based tactile intelligence with soft robotic metamaterial, Materials & Design,Volume 238,2024,112629,ISSN 0264-1275, doi: 10.1016/j.matdes.2024.112629 . [[paper]](https://www.sciencedirect.com/science/article/pii/S0264127524000017)
- T. Wu, Y. Dong, Y. Xiao, **J. Wei**, F. Wan and C. Song, "Vision-based, Low-cost, Soft Robotic Tongs for Shareable and Reproducible Tactile Learning," 2024 International Conference on Advanced Robotics and Mechatronics (ICARM), Tokyo, Japan, 2024, pp. 388-393, doi: 10.1109/ICARM62033.2024.10715842. [[paper]](https://ieeexplore.ieee.org/document/10715842)

---

## Projects

### PaXini Technology (Shenzhen) Co., Ltd.

- Teleoperation of Humanoid Robots
  - Designed software framework independently for teleoperation of wheeled humanoid robots. Using external sensors' data to control the robot's chassis, waist, arms, and head .
  - Build a complete Requirements-Verification-Development-Test-CI/CD process.
  - Keywords: ROS2, kinematics, Python, System Management.
- Multimodal Data Acquisition and Processing
  - Design and use a human data acquisition device to capture visual, depth, and pose information from human behavior and manipulation, and post-processes the data for robot imitation learning.
  - Keywords: Computer Vision(CV), Point Cloud Processing, Imitation Learning.

### Dorabot

- Large-scale automated production line of a state-owned enterprise in the liquor industry
  - KUKA high load robot arm is used to visually segment, identify and locate the target object, and then differentiate the incoming pallet type through linear planning, and automatically perform the depalletizing tasks required by the order from the conveyor line in whole layers, rows or pieces.
  - Using Yaskawa's low and medium load robot arms, we can depalletize a full layer of fully palletized containers, release the materials to a designated area, and repalletize the empty containers in an orderly manner.
  - Keywords: C/C++, Python, ROS2, Linux, Linear programming, KUKA KRL, CV.
- Comprehensive platform for experimentation, verification, and demonstration of depalletizing solutions
  - Yaskawa's low and medium load robot arms are used to develop and maintain application solutions for generalized depalletizing scenarios, and to serve as a dedicated technology testing platform and a platform for demonstrating stable results.
  - Keywords: C/C++, Python, ROS2, Path Planning, Trajectory Plan, CV, Linux, Socket.

### Ningquan Science and Technology Inc. & College of Engineering, SUSTech. Comprehensive Design

- Design Science for Reproducible and Shareable Robot Learning —— Remote Control and Teaching.
  - We proposed a novel method by focusing on rich and intuitive representation, visualization,tracking,processing,and storage of manipulation data from the manual operation of open-sourced tools with soft tips and AR markers to provide force-sensitive information with low-cost hardware in a web-based interface, namely the DeepClaw ASYST tool kit.The development of the DeepClaw ASYST aims at a hacker-level kit to be released through crowdfunding for mass adoption as an intuitive human-machine interface for interactive data collection
  - Keywords: Python, CV ArucoCode PoseDetection, Learning by Demonstration, Imitation Learning, Human–Machine Interaction, UR.

### BionicDL Lab Robot Arm Project

- Interactive and user-friendly operation of robotic arms and other devices with visual recognition *2021.7-2021.9*
  - Using the UR robotic arm as an example, we have developed  a way to remotely and non-contactly control the robotic arm (or other mechanical devices) via an external camera and a mobile QR code, and based on this, we have simplified the cost of using and operating the robotic arm for people with no knowledge of it, and we have also compared it to the original way of operating the robotic arm by Franka and Aubo. The code is posted on GitHub due to permission limitations, and the display is posted as a video on Bilibili：[小学生也可以自由地和机械臂玩耍](https://www.bilibili.com/video/BV1yM4y1V73B/)。
  - Keywords: C++, Python, Franka, Pose Detection, Human–Machine Interaction, Teaching Application, Remote Control.
- Robotic Waste Sorting Line with Visual Recognition *2021.1-2021.6*
  - Recognized and sorted hard objects on a moving conveyor using a Franka robot arm and quantified the advantages of the throwing method over the moving method. Responsible for visual recognition, robot arm control logic, teamwork on code environment, and technical documentation on the project. Code, documentation and demos are posted on github. [GitHub](https://github.com/Bardreamaster/ME336-Yellow-Team-Project) 。
  - Keywords: C++, Python, Franka, Yolo, Machine Learning, Data Collection&Preparation&Training.

### DJI RoboMaster University Championship

- Member of the electrical control team & Head of the electronic hardware team of the ARTINX team. *2019.6-2020.10*
  - Responsible for the development and manufacturing of robot [main control boards](https://github.com/Bardreamaster/Chasis), [supercapacitors, and power control modules](https://github.com/Bardreamaster/SuperCapacitor/tree/main). Responsible for writing and debugging power control code using Keil, familiar with vscode writing and Keil debugging tool chain.
  - Utilized Altium Designer, KiCad, and LCEDA(EasyEDA) for circuit design and product testing.
  - Skilled in manual PCB soldering, testing techniques, and circuit debugging using digital power supplies, signal generators, and oscilloscopes.
  - Keywords: Embedded System, PCB Design.
- Member of the Mechanical Team of the ARTINX team & Financial Management *2018.10-2019.5*
  - Mechanical design using Solidworks, AutoCAD, optimizing PrusaSlicer, ideaMaker print parameters.
  - Managed annual seasonal cash flow (over ￥200,000), prepared financial statements, and traveled through purchasing, quoting, and reimbursement processes.
  - Keywords: Mechanical Design, Cost Control, Project Management.

---

## Awards

- SUSTech First Prize in Comprehensive Design for the 2021-2022 Academic Year (1/33)
- Outstanding Undergraduate Graduation Design (Thesis) of the Southern University of Science and Technology in 2022：“Design Science for Reproducible and Shareable Robot Learning——Remote Control and Teaching Design”
- The 19th National University Robotics Competition, RoboMaster2020  University Championship National Third Prize
