---
layout: projects
# multilingual page pair id, this must pair with translations of this page. (This name must be unique)
lng_pair: id_projects

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
image_viewer_on: true
# please use the "image_lazy_loader_on" below to enable image lazy loader for individual pages or posts (_posts/ or [language]/_posts folders).
# image lazy loader can be enabled or disabled for all posts using the "image_lazy_loader_posts: true" setting in _data/conf/main.yml.
image_lazy_loader_on: true
# exclude from on site search
#on_site_search_exclude: true
# exclude from search engines
#search_engine_exclude: true
# to disable this page, simply set published: false or delete this file
# published: false

# you can move this content to front matter of [language]/tabs/projects.md
###########################################################
#                Projects Page Data
###########################################################
page_data:
  main:
    header: "Projects"
    info: "Selected projects."
    text_color: "oklch(0.5691 0.1998 297.01)"
    # if you don't want to use background image, comment it. back_color will be activated.
    # img: ":projects-heading.jpg"
    # back_color: "lightblue"

  category:
    - title: "Research & Academic"
      type: research
      color: "oklch(0.5544 0.1727 4.76)"
    - title: "Work"
      type: work
      color: "oklch(0.5544 0.1061 243)"
    - title: "Personal & Open-source"
      type: personal
      color: "oklch(0.6426 0.1751 148.76)"

  list:
    - project_name: "Hand Tracking & PaXini DexH13 Robot Hand"
      type: work
      project_excerpt: "PaXini"
      date: "2025-03-05"
      img: ":mwc_hand.png"
      post: |
        Control robot hand with any camera by recognizing hand gestures.

        ## Demo Video

        Showed on The Mobile World Congress (MWC) 2025 with Honor(a Chinese smartphone manufacturer).

        - Bilibili

          <iframe src="//player.bilibili.com/player.html?isOutside=true&aid=114149174612651&bvid=BV12TQHYuEeC&cid=28827912513&p=1&autoplay=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" height=300 width="80%"></iframe>

        - YouTube

          <iframe width="560" height="315" src="https://www.youtube.com/embed/8TTFJpAT584?si=uPx_T_A1dzjhC4VA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

    - project_name: "Dora Depalletizer"
      type: work
      project_excerpt: "Dorabot"
      img: ":layer_depalletizing.jpg"
      img_title: "Dora Depalletizer"
      date: "2023-09-01"
      post: |

        Developed large-scale (de)palletizing application using heavy-duty KUKA robots and Mixed Integer Programs (MIPs) for industry automated warehouses, achieving a processing speed of up to 1200 boxes per hour per single robot.

        ## Demo Video

        ### Depalletizing by layer
        <iframe src="//player.bilibili.com/player.html?isOutside=true&aid=214440726&bvid=BV1Ga411j7Ck&cid=730826047&p=1&autoplay=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"  height=300 width="80%"></iframe>

        ### Depalletizing by row
        <iframe src="//player.bilibili.com/player.html?isOutside=true&aid=683577867&bvid=BV13S4y1w7Lm&cid=713979829&p=1&autoplay=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"  height=300 width="80%"></iframe>

    - type: research
      project_name: "Design Science for Reproducible and Shareable Robot Learning"
      project_excerpt: "Yujian Dong, Jinqi Wei, Yang Xiao."
      img: ":design_science_post.jpg"
      img_title: "Design Science for Reproducible and Shareable Robot Learning poster"
      date: "2022-06-01"
      post: |
        Proposed a novel method for reproducible and shareable robot learning by focusing on rich and intuitive representation, processing, and storage of manipulation data. This was achieved through the [DeepClaw](https://me336.ancorasir.com/?page_id=312) system that features a unified data storage format, easily accessible web-based software, and open-source, low-cost hardware for teleoperation and data collection.

    - type: research
      project_name: "Automated Robotic Waste Sorting"
      project_excerpt: "ME336 Collaborative Robot Learning"
      date: "2021-05-27"
      img: ":workspace_setup.png"
      img_title: "workspace setup"
      post: |

        - [GitHub](https://github.com/Bardreamaster/ME336-Yellow-Team-Project)

        Designed and implemented an automated robotic waste sorting line with visual recognition. Improved sorting efficiency with a throw method rather than a traditional pick-and-place approach.

        ## Demo Video

        <iframe width="560" height="315" src="https://www.youtube.com/embed/s47ovT3Vu1s?si=r-UO6IE467hjhCX7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>






---
