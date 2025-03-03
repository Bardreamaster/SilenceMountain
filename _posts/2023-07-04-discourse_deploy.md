---
# multilingual page pair id, this must pair with translations of this page. (This name must be unique)
lng_pair: discourse_deploy
title: Deploy Discourse behind Nginx

# post specific
# if not specified, .name will be used from _data/owner/[language].yml
#author: ""
# multiple category is not supported
category: auto generated
# multiple tag entries are possible
tags: [app, deployment, web]
# thumbnail image for post
img: ""
# disable comments on this page
comments_disable: true

# publish date
date: 2023-07-04 11:32:53 +0900

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

## 0. Starting point

So let’s assume you have completed [the 30-minute standard installation](https://github.com/discourse/discourse/blob/main/docs/INSTALL-cloud.md) and let’s assume that you didn’t let discourse acquire a lets encrypt cert yet - because you don’t need it when using a reverse proxy. NGINX Proxy Manager will take care of that. It doesn’t matter, though, if you already have certificate. NGINX Proxy Manager will simply get a new one.

## 1. Install NGINX Proxy Manager

Next step is to [install NGINX Proxy Manager](https://nginxproxymanager.com/guide/#quick-setup) so that you will have two more docker containers running (NGINX Proxy Manager and its database container).

## 2. Configure app.yml to use websocket

Change your /var/discourse/containers/app.yml to add websocket and comment http/https:

```yml
# base templates used; can cut down to include less functionality per container templates:
  - "templates/postgres.template.yml"
  - "templates/redis.template.yml"
  - "templates/web.template.yml"
  # - "templates/web.ssl.template.yml" # remove - https will be handled by outer nginx
  # - "templates/web.letsencrypt.ssl.template.yml" # remove -- https will be handled by outer nginx
  - "templates/web.ratelimited.template.yml"
  - "templates/web.socketed.template.yml"  # Added
```

Be sure to remove or comment out the exposed ports.

```yml
# which ports to expose?
# expose: comment out entire section by putting a # in front of each line
# - "80:80"   # http
# - "443:443" # https
```

Now you can run this command to rebuild Discourse to make its data available to the socket.

```bash
/var/discourse/launcher rebuild app
```

## 3. Mount websocket in NGINX Proxy Manager container

We need to give NGINX Proxy Manager access to the websocket by mounting it as a volume, add volumes part in its `docker-compose.yml` into this:

```yml
volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
      - /var/discourse/shared/standalone/nginx.http.sock:/var/discourse/shared/standalone/nginx.http.sock
```

This is the final change to the default NGINX Proxy Manager docker compose file.

## 4. Configure NGINX Proxy Manager to use the websocket

Tell NGINX Proxy Manager to use the websocket. Add `location/` to the site Advanced Setting:

```conf
location / {
                proxy_pass http://unix:/var/discourse/shared/standalone/nginx.http.sock:;
                proxy_set_header Host $http_host;
                proxy_http_version 1.1;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-Real-IP $remote_addr;

}
```

like this:

![39ac432b6477b2ac6d05946d4d360c1f0f157d49_2_469x500.png](https://silencemountain-1313535466.cos.ap-guangzhou.myqcloud.com/39ac432b6477b2ac6d05946d4d360c1f0f157d49_2_469x500.png)

I did not get this to work under the “Custom locations” tab.

## 5. Activate SSL

Active SSL if needed like this:

![6d74e39b2c0d60f8b7bebab03d8591f22ef53c92.png](https://silencemountain-1313535466.cos.ap-guangzhou.myqcloud.com/6d74e39b2c0d60f8b7bebab03d8591f22ef53c92.png)

## 6. Heads up

Whenever you restart the discourse container, you **also need to restart the main NGINX Proxy Manager conainer** (no need to restart the db).

If you are accessing discourse through the websocket, you need to be aware that when you rebuild your discourse container (as is required every couple of months to update the base image), the previous websocket will be deleted and a new one created. As a consequence, NGINX Proxy Manager will loose contact to your discourse instance and throw a 502 error. Maybe a future update of NGINX Proxy Manager will be able to find the new websocket automatically, but currently (January 2022) NGINX Proxy Manager will not find your rebuilt discourse container unless you restart NGINX Proxy Manager.
