---
type: moc
status: activo
created: 2026-11-06
tags: [indice]
---

# El código nuestro de cada día — vault

Vault de Obsidian del sitio personal `asosab.github.io`. La raíz del repo es el
vault; `docs/` es el dominio de conocimiento. Jekyll no publica estas notas:
`docs` está en el `exclude` de `_config.yml`.

## Notas del sitio

- [[home]] — portada, tarjetas de proyectos y lista de posts
- [[blog]] — posts, drafts, front matter y datasets
- [[cv]] — página `/cv/` y sus fuentes de datos
- [[subproyectos]] — landings locales y project pages de otros repos
- [[jekyll-build]] — stack, configuración y pipeline de publicación
- [[seo-metadata]] — sitemap, feed, llms.txt y metadatos
- [[deuda-tecnica]] — pendientes verificados y documentación desactualizada

## Sesiones

- [[2026-11-06]] — estudio del sitio y creación del vault

## Convenciones

- Notas atómicas con frontmatter YAML (`type`, `status`, `created`, `tags`).
- Enlaces con `[[wikilinks]]`; se navega desde este índice, no por carpetas.
- Registro de trabajo en `docs/log/YYYY-MM-DD.md`, una entrada por sesión.
- Plantillas en `docs/templates/` (nota y sesión).
- `.obsidian/` va versionado; workspaces, plugins y temas quedan fuera de git.
- La prosa en castellano pasa por el skill `humanamente` antes de commitear.

## Punteros fuera del vault

- Estado operativo y planes: `opencode/asosab.github.io/` en el workspace padre
  (`STATE.md`, `PLAN/_index.md`, `CHANGELOG.md`, `arquitectura.md`). No están en
  el repo; viven al lado, en `D:\empresas\Alejandro Sosa Briceño\desarrollo\opencode\`.
