# Changelog — Somos 10⁷

Formato: `YYYY-MM-DD | categoría | descripción`

## 2026-06-06

| Categoría | Descripción |
|-----------|-------------|
| **Refactor** | CSS separado de `index.html` a `css/styles.css` |
| **Refactor** | i18n separado a `js/i18n.js` (cargado con `defer` en `<head>`) |
| **Refactor** | Lógica del sitio (nav, tabs, scroll, anillos) separada a `js/main.js` |
| **Refactor** | Firebase counter separado a `js/firebase-counter.js` (type="module") |
| **Refactor** | Sección ENTREVISTAS: cards generados dinámicamente desde `js/videosData.json`, filtrados por playlist "20 preguntas", ordenados por fecha descendente.~170 líneas menos en `index.html` |
| **Config** | Creación de `AGENTS.md` con directrices para OpenCode |
| **Config** | Creación de `PLAN.md` con estado actual y gaps del proyecto |
| **Config** | Creación de `CHANGELOG.md` para registro de cambios |
| **Config** | Creación de `MEJORAS.md` con 8 recomendaciones de diseño frontend |
| **Docs** | `es_VE.txt` actualizado |

## 2026-06-05

| Categoría | Descripción |
|-----------|-------------|
| **UI** | Correcciones y arreglos visuales en `index.html` |
| **Docs** | Actualización de `README.md` |
| **UI** | Ajustes de layout y contenido |

## 2026-05-27

| Categoría | Descripción |
|-----------|-------------|
| **Feature** | Implementación de contador de visitantes activos vía Firebase (IP única, 30 min de ventana) |
| **Content** | Enlace a formulario de Páginas Blancas actualizado |

## 2026-05-26

| Categoría | Descripción |
|-----------|-------------|
| **i18n** | Migración de locale files de `.json` a `.txt` (para servirlos como `text/plain`) |
| **Content** | Equipo completado con Nathalie Laborit |
| **Content** | Agregadas entrevistas: Mariana Cubillán, Enden Hidalgo, Siria Useche, Giovanni Sánchez, Giorgio Cannatta, Adriana Justi, Bárbara Callama, Norce Lugo |
| **i18n** | Sistema de internacionalización con es_VE (default) y es_BO |
| **Feature** | Sección Páginas Blancas con formulario a Google Forms |
| **UI** | Hero con anillo orbital, scroll-spy, fade-in animations |
| **Content** | Temporada 1 con 5 episodios (YouTube embeds) |
| **UI** | Nav fijo con mobile toggle, footer con secciones |
| **SEO** | Open Graph, Twitter Cards, JSON-LD Schema.org (PodcastSeries) |
| **Infra** | Google Analytics (UA-84695-6) agregado |

## 2026-05-25

| Categoría | Descripción |
|-----------|-------------|
| **Infra** | Inicialización del proyecto `somos10e7` como subdirectorio estático |
| **Assets** | Imágenes: banner, portada, domingo.png, siria.png |
