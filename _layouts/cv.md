---
layout: default
---

{%- include multi_lng/get-lng-by-url.liquid -%}
{%- assign lng = get_lng -%}

<div class="cv-container">
  <header class="cv-header">
    <h1>{{ site.data.translations[lng].cv.title | default: "Curriculum Vitae" }}</h1>
  </header>

  <div class="cv-content">
    {{ content }}
  </div>
</div>
