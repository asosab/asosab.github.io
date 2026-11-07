---
type: nota
status: activo
created: 2026-11-06
tags: [sitio, blog]
---

# Blog

Trece archivos en `_posts/` (2016–2026); doce publicados.
`2024-06-20-automatizacion-de-mensajeria.md` tiene `published: false`.
Tres borradores en `_drafts/`: `about.md`, `contacto.md`, `pruebas.markdown`.

## Convenciones

- Permalink `/:title/`: la URL es el slug del nombre de archivo. Renombrar el
  archivo cambia la URL pública.
- Todo en castellano (`locale: es_ES`).
- Front matter habitual: `layout: post`, `title`, `date`, `categories`,
  `comments`, `description`, `image`, `tags`, `havecharts`, `published`.
- `havecharts: true` carga D3/C3 en el post.

## Datos

`data/` guarda los datasets de las gráficas: frecuencia de nombres venezolanos
por año (JSON/TSV/CSV, 1896–1996), egresados de computación UCV y JSONs sueltos
para posts puntuales.
