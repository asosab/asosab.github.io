---
type: nota
status: activo
created: 2026-11-06
tags: [sitio, deuda]
---

# Deuda técnica y pendientes

Verificado al 2026-11-06 contra el código real.

- `_includes/analytics.html` es código muerto: GA4 con placeholder
  `G-XXXXXXXXXX` y ningún layout lo incluye. Lo que mide hoy es GTM-NSZ4MRB5.
  Queda decidir si se borra el include y el `google_analytics` huérfano de
  `_config.yml`, o si se completa la migración a GA4 por gtag directo.
- Bootstrap 3.2 por CDN. Viejo pero estable; tocarlo obliga a revisar todo el
  CSS del sitio.
- D3 v3 y v4 conviven en `assets/js/vendor/`; nadie auditó si v4 se usa.
- Sin Gemfile: el entorno local depende de tener Jekyll 3.x a mano.
- `automatizacion-de-mensajeria.md` sigue con `published: false`; convendría
  confirmar que sigue siendo intencional.

## Documentación desactualizada

- `AGENTS.md` raíz describe `somos10e7/` y `larga_noche_de_museos/` como
  directorios locales y da un path de repo de otra máquina. Esos subproyectos
  ya viven en repos propios; ver [[subproyectos]].
- `arquitectura.md` (en opencode) dice que el deploy es push a `main`; la rama
  real es `master`. También afirma que Analytics usa Universal Analytics: ya
  no, `analytics.html` está muerto y manda GTM.
- Google+ ya no aparece en el código, aunque el `PLAN/_index.md` lo sigue
  listando como pendiente.
