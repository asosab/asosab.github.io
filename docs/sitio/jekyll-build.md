---
type: nota
status: activo
created: 2026-11-06
tags: [sitio, jekyll]
---

# Jekyll y publicación

## Stack

Jekyll 3.x compilado por GitHub Pages. Sin Gemfile, sin package.json, sin CI.
Liquid + Kramdown (GFM) + Rouge. Bootstrap 3.2 por CDN en producción, D3 v3 y
C3 para gráficas, jQuery 3.2.1 local, Font Awesome 4.6 local. Comentarios
Disqus (`codigo-nuestro`) en posts con `comments: true`.

## Config (`_config.yml`)

- `desarrollo: false` — en `true` toma CSS/JS de `assets/`, desactiva Disqus y
  analytics, y marca el título con «(desarrollo)».
- `permalink: /:title/` — ver [[blog]].
- `plugins: jekyll-gist, rouge`.
- `exclude: docs` — el vault no se publica.
- `author.*` concentra redes, email y metadatos geo; lo consumen `seo.html`,
  el footer y `social_links.html`.
- `google_analytics` existe pero nada lo lee; ver [[deuda-tecnica]].

## Layouts

`default` es la base (head, header, footer, credit). `post` y `page` heredan de
él; `iframe` va solo, sin chrome. En default,
`{{ content | external_link_filter }}` agrega `target="_blank"` a cualquier
`<a href="http…">` del contenido — solo aplica a páginas que pasan por ese
layout, no a los subproyectos locales.

## Pipeline

`git push` a `master` → GitHub Pages compila → sitio en vivo. No hay pasos
intermedios; un push con error de build frena el deploy hasta corregirse y
GitHub avisa por correo.

## Preview local

No hay setup versionado. Con Jekyll 3.x instalado: `jekyll serve`
(`--drafts` para ver borradores). Los subproyectos locales son HTML plano:
abrir el `index.html` directo en el navegador.
