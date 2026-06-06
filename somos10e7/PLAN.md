# PLAN.md — Somos 10⁷

## Current state

- Landing page published at `https://asosab.github.io/somos10e7/`
- One season (Temporada 1) with 5 episodes
- 7 interview cards
- 4 team member cards
- Firebase live visitor counter active
- i18n with es_VE (default) and es_BO
- Google Analytics (UA-84695-6)
- `#micros` section: placeholder, empty
- `AGENTS.md` — directrices para OpenCode
- `PLAN.md` — registro de plan y estado
- `CHANGELOG.md` — registro cronológico de cambios

## Completed

- **Refactor**: CSS separado a `css/styles.css` (antes inline en `<style>`)
- **Refactor**: i18n separado a `js/i18n.js` (cargado con `defer`)
- **Refactor**: Lógica del sitio (nav, tabs, scroll, anillos) separada a `js/main.js`
- **Refactor**: Firebase counter separado a `js/firebase-counter.js` (type="module")
- **Resultado**: `index.html` pasó de ~2241 → 748 líneas (~67% más corto)
- **Refactor**: Cards de ENTREVISTAS ahora se generan dinámicamente desde `js/videosData.json` filtrando por playlist "20 preguntas" (videos + colaboraciones), ordenados por fecha descendente. `index.html` redujo ~170 líneas más (de 748 → 578).
- **UI**: Overlay de play en entrevistas ahora oculto por defecto, visible solo en hover (como episodios)
- **UI**: Podcast links reemplazan emojis por SVGs inline (Spotify, Amazon Music, iVoox, YouTube)
- **UI**: Hero con gradiente animado vía `@keyframes heroGradient` (`background-position` en bucle lento)
- **UI**: Season tabs rediseñados con estilo underline (magazine-style `::after` con `scaleX`)

## Known gaps / future work

- `#micros` section is empty — needs content if the section is meant to be visible
- Only one season tab exists; new seasons need tab + panel added
- `es_BO.txt` and `es_VE.txt` copyright year in footer says 2024 (index.html says 2024 too) — may need updating
- No privacy policy or cookie notice (GA + Firebase + ipify)
- `MEJORAS.md` → `## FRONTEND` — 3/8 recomendaciones implementadas: hero animado, tabs underline, emojis→SVG. Pendientes: episode cards (alternar layout), entrevistas feature card, equipo hover overlay, nav auto-hide, scrollbar gradiente, verde en paleta, Páginas Blancas carrusel

## Active plan

*(Describe the current task/feature being worked on here when starting work.)*
