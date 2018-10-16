---
title: Rendall Koski's resume
layout: resume.njk
---
# {{ name }}
## Objective
To be everything to everyone
## Experience
{%- for item in experience %}
  ### {{ item.firm }}
  {{ item.description }}
{% endfor -%}