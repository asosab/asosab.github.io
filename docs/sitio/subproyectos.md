---
type: nota
status: activo
created: 2026-11-06
tags: [sitio, subproyectos]
---

# Subproyectos

Páginas de proyectos servidas bajo `asosab.github.io/<nombre>/`. Hay dos grupos
y conviene no mezclarlos.

## En este repo (HTML estático autocontenido)

Sin front matter ni layouts de Jekyll; GitHub Pages los copia tal cual. El
`external_link_filter` no les aplica.

| Dir | Qué es |
|---|---|
| `buddy/` | Landing de Buddy, plataforma para darle servicios a sitios estáticos |
| `lav/` | Línea Abierta Vecinal, historia del call center ciudadano |
| `call_center_gobernacion/` | Propuesta técnica para la Gobernación de Santa Cruz |
| `vcv/` | Voz Ciudadana Venezuela, propuesta interactiva en un solo HTML |

## En repos aparte (project pages de GitHub)

No existen como directorios aquí (`git ls-files` lo confirma): cada uno es un
repo propio con Pages activado, servido bajo el mismo dominio. Sus tarjetas en
el home usan imágenes locales de `imagen/` de este repo.

- `somos10e7` — podcast Somos 10⁷ (repo aparte, con su propio AGENTS.md)
- `larga_noche_de_museos` — podcast documental
- `nombres-venezolanos` — gráfica interactiva de nombres
- `ekvilibrolab` — laboratorio de fermentación
- `bot_sigue_linea` — Arturito, robot seguidor de línea

## Discrepancia registrada

El `AGENTS.md` raíz todavía describe `somos10e7/` y `larga_noche_de_museos/`
como directorios locales. Ya no están en este repo. Anotado también en el
`STATE.md` de opencode el 2026-11-06.
