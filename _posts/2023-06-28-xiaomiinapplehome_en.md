---
# multilingual page pair id, this must pair with translations of this page. (This name must be unique)
lng_pair: miinapplehome
title: Control Xiaomi Smart Device on Apple Home

# post specific
# if not specified, .name will be used from _data/owner/[language].yml
#author: ""
# multiple category is not supported
category: auto generated
# multiple tag entries are possible
tags: [iot]
# thumbnail image for post
img: ""
# disable comments on this page
comments_disable: true

# publish date
date: 2023-06-28 11:32:53 +0900

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

## Install Home Assistant on Synoloy NAS

- Install “Docker” package on your Synology NAS
- Launch Docker-app and move to “Registry”-section
- Find “homeassistant/home-assistant” within registry and click on “Download”. Choose the "latest" tag.
- Wait for some time until your NAS has pulled the image
- Move to the “Image”-section of the Docker-app
- Click on “Launch”
- Within “Network” select “Use same network as Docker Host” and click Next
- Choose a container-name you want (e.g., “homeassistant”)
- Set “Enable auto-restart” if you like
- Click on “Advanced Settings”. To ensure that Home Assistant displays the correct timezone go to the “Environment” tab and click the plus sign then add variable = TZ & value = Europe/London choosing your correct timezone. Click Save to exit Advanced Settings.
- Click Next
- Within “Volume Settings” click on “Add Folder” and choose either an existing folder or add a new folder (e.g. in “docker” shared folder, add new folder named “homeassistant” and then within that new folder add another new folder “config”), then click Select. Then edit the “mount path” to be “/config”. This configures where Home Assistant will store configs and logs.
- Ensure “Run this container after the wizard is finished” is checked and click Done.
- Your Home Assistant within Docker should now run and will serve the web interface from port 8123 on your Docker host (this will be your Synology NAS IP address - for example http://192.168.1.10:8123)

## Install HACS on HA Manually

- Install [the latest release](https://github.com/hacs/integration/releases/) of HACS.
- Create a new folder named /custom_components under your home assistant install path like /docker/homeassistant/. This will be your plugin directory.
- Upload the .zip package to the directory and unzip it here with a single directory like /docker/homeassistant/custom_components/hacs/.
- Restart the homeassistant Container on Synoloy Docker Manager.
- Relogin to the HA dashboard.
- Search and install HACS on Configuration-Integration with your GitHub account.

## Install Xiaomi mioT

- Restart the HA on Configuration-Service Control-Restart.
- Search and install Xiaomi mioT or Xiaomi Auto.
- Scan device via Xiaomi account or local network scanning.
- Restart the HA again on Configuration-Service Control-Restart.
- Config Xiaomi Auto by adding device one by one which would be much more clear for you to control each of them if you have many devices.

## Config Homekit-Bridge

- Install Homekit-Bridge on HA Integration.
- Using your iPhone Home APP scan the QR code appear on new message after you added Homekit-Bridge to add HA as a bridge between Xiaomi devices and Apple Home.
- Add automations as you want in your Home APP.
- By the way, there should be a homepod(mini) or ipad to control your smart device remotely as a local server and run automation. Or you only could control them when you are in the same network with them.

## Ref

- Install Home Assistant on Synology
