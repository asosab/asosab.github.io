---
type: nota
status: activo
created: 2026-11-06
tags: [sitio, seo]
---

# SEO y metadatos

- `sitemap.xml` — Liquid sobre posts y páginas, más URLs fijas de los
  subproyectos (los de este repo y los de repos aparte). Hay que tocarla a mano
  al agregar un subproyecto.
- `robots.txt` — remite al sitemap.
- `feed.xml` — RSS de los últimos posts.
- `llms.txt` — índice curado para crawlers de IA; se actualiza al sumar un post
  o proyecto relevante.
- `opensearch.xml`, `info.json`, `info.xml` — descripción de búsqueda y
  endpoints oEmbed.
- `resume.json` — CV en formato JSON Resume.
- `_includes/seo.html` — OpenGraph, Twitter Cards, canonical y geo tags por
  página.

## Medición

El tracking real es Google Tag Manager `GTM-NSZ4MRB5`: el script va en
`head.html` y el noscript en `default.html`. `_includes/analytics.html` no está
incluido en ningún layout y conserva el placeholder `G-XXXXXXXXXX`;
`google_analytics` de `_config.yml` tampoco lo lee nadie. Ver [[deuda-tecnica]].
