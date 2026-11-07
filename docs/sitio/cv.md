---
type: nota
status: activo
created: 2026-11-06
tags: [sitio, cv]
---

# CV (`/cv/`)

`cv.md` con `layout: page` y `permalink: /cv/`. Los estilos van inline en el
propio archivo (`.cv-section`, `.cv-role`, `.skill-grid`) y usan las variables
CSS de `main.css`.

- Contenido: perfil, experiencia (diez roles), habilidades, idiomas,
  certificaciones, intereses y contacto.
- Botón «Imprimir PDF» que llama a `window.print()`.
- Datos fuente: `assets/docs/asb.json`; en la raíz también hay `resume.json`
  en formato JSON Resume.
- Entrada desde el header: enlace «CV» en la nav de `_includes/header.html`.
- PDF estático en `assets/docs/CV_ASB.pdf`.
