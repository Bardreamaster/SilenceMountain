# Silence Mountain · 墨山

Personal site of Wei Jinqi, built with [Astro](https://astro.build) and deployed on Cloudflare Pages.
Pages are static HTML with no client framework; the only script is a few lines for the dark-mode toggle.

## Writing

Everything is Markdown under `src/content/`. Each collection has one folder per language, and an
entry exists only in the languages you write it in.

| What | Where | URL |
| --- | --- | --- |
| Posts | `src/content/posts/<lang>/<slug>.md` | `/posts/<slug>/`, `/zh/posts/<slug>/` |
| Pages (CV, links, …) | `src/content/pages/<lang>/<slug>.md` | `/<slug>/`, `/zh/<slug>/` |
| Home intro | `src/content/pages/<lang>/home.md` | shown above the post list |
| Projects | `src/content/projects/<lang>/<slug>.md` | `/projects/`, `/projects/<slug>/` |

Post front matter:

```yaml
---
title: My post
date: 2026-10-12
tags: [robotics]
description: Optional summary for search engines and RSS
translationKey: my-post   # optional; same key in en/ and zh/ links the two versions
draft: true               # optional; drafts show in `npm run dev` but are not published
---
```

Images: put them next to the content (e.g. `src/content/posts/img/`) and link with a relative path,
`![alt](../img/photo.jpg)`. They are resized and converted to WebP at build time.

Projects: add `url: https://name.project.weijinqi.com` for a project that has its own site; its card
then links there instead of to a page on this site. `cover`, `category` and `featured` are optional.

### Life timeline

`src/content/life/<lang>/<slug>.md` feeds `/life/`, grouped by year with a type filter (no JavaScript).

```yaml
---
title: Bologna
type: city          # travel | museum | event | city | hobby | book | film
date: 2025-09-01
end: 2026-07-01     # optional; a city without `end` shows "now"
place: Bologna, Italy
rating: 4           # books and films, 1–5
photos:
  - ../img/bologna-1.jpg
---
One or two sentences.
```

Prepare photos first, which shrinks them and removes GPS and other metadata:

```sh
npm run photos -- ~/Pictures/trip            # writes to src/content/life/img/
npm run photos -- a.heic b.jpg --size 2000   # long edge in px (default 2400)
```

### CV

`src/content/pages/<lang>/cv.md` uses `layout: cv`, a résumé style modelled on the PDF. In that file,
any heading or line written as `Left | Right` puts the right part on the right edge:

```md
## Education

### University of Bologna | Bologna, Italy
Master of Science in Artificial Intelligence | 2025.09 – 2027.07

#### A project inside the entry | 2023.12 – 2025.07
- bullet points as usual
```

The page also prints cleanly (Ctrl/Cmd + P).

## Customising

- `src/site.config.ts`: site name, author, menus and interface text per language, social links,
  avatar, share-card colours, home page post count, analytics.
- `src/styles/theme.css`: colours (OKLCH), fonts and widths. Changing `--accent-hue` re-colours the site.
- Add a language: add it to `locales` in the config and create `<lang>/` folders in the collections.

Share-card images (`og:image`) are generated at build time for every post under `/og/`.

## Commands

```sh
npm install
npm run dev       # live preview at http://localhost:4321
npm run build     # output in dist/
npm run preview   # serve dist/ locally
```

## Deploying on Cloudflare Pages

Connect the repository in Cloudflare (Workers & Pages → Create → Pages → Connect to Git) and use the
Astro preset: build command `npm run build`, output directory `dist`. Old Jekyll URLs are redirected by
`public/_redirects`.
