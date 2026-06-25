# PLAN.md — Somos 10⁷

## Current state

- Landing page published at `https://asosab.github.io/somos10e7/`
- 5 episodes (dinámicos desde `videosData.json`)
- 7 interview cards (dinámicos desde `videosData.json`)
- 4 team member cards
- Firebase live visitor counter active
- Google Analytics (UA-84695-6)
- i18n removido — texto estático en tuteo venezolano (es_VE), sin capa de internacionalización
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
- **UI**: Season tabs eliminados — episodios ahora secuenciales sin temporadas

## Known gaps / future work

- `#micros` section is empty — needs content if the section is meant to be visible
- No privacy policy or cookie notice (GA + Firebase + ipify)
- `MEJORAS.md` → `## FRONTEND` — 2/8 recomendaciones implementadas: hero animado, emojis→SVG. Pendientes: episode cards (alternar layout), entrevistas feature card, equipo hover overlay, nav auto-hide, scrollbar gradiente, verde en paleta, Páginas Blancas carrusel

## Active plan

- **2026-06-25**: Breaking news section — `#ultimo` reemplazado con video de emergencia (Terremoto en Venezuela, 24-jun-2026). Se agregó barra roja animada, pill "EMERGENCIA", latido en label, borde rojo glow en video-wrapper. Nav y hero CTA actualizados a "Noticias". El episodio más reciente se puede ver en la grilla de #episodios.
