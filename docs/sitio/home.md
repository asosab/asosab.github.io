---
type: nota
status: activo
created: 2026-11-06
tags: [sitio, home]
---

# Home (`index.html`)

La portada ya no es un listado de blog: es una página de proyectos. Usa
`layout: default` y tiene dos secciones.

## Proyectos

Grid de tarjetas (`.grid`, `.card`) con imagen, título, descripción y botón.
Once tarjetas hoy:

| Tarjeta | Destino | ¿En este repo? |
|---|---|---|
| 100 años de nombres en Venezuela | `/nombres-venezolanos/` | no, repo aparte |
| Statetty | `statetty.com` | externo |
| ARBAT | `arbatarchery.com` | externo |
| Larga Noche de Museos | `/larga_noche_de_museos/` | no, repo aparte |
| Somos 10⁷ | `/somos10e7/` | no, repo aparte |
| Una Línea al Día | `audio.com` (colección) | externo |
| Buddy | `/buddy/` | sí |
| Línea Abierta Vecinal | `/lav/` | sí |
| Centro de Atención Ciudadana | `/call_center_gobernacion/` | sí |
| ekvilibroLab | `/ekvilibrolab/` | no, repo aparte |
| Arturito | `/bot_sigue_linea/` | no, repo aparte |

Las imágenes de las tarjetas salen de `imagen/`, salvo LAV y Centro de Atención
Ciudadana, que las toman de sus propios subdirectorios. Las tarjetas de repos
aparte usan igualmente imágenes locales de este repo.

## Notas y artículos

Lista simple de `site.posts`: título enlazado, sin fecha ni extracto. Debajo va
`{% include tag-list.html %}`, pero solo se renderiza con más de 20 posts; hoy
hay 13, así que no aparece.

Relacionado: [[blog]], [[subproyectos]].
