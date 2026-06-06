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

## Known gaps / future work

- `#micros` section is empty — needs content if the section is meant to be visible
- Only one season tab exists; new seasons need tab + panel added
- `es_BO.txt` and `es_VE.txt` copyright year in footer says 2024 (index.html says 2024 too) — may need updating
- No privacy policy or cookie notice (GA + Firebase + ipify)
- `MEJORAS.md` → `## FRONTEND` contiene 8 recomendaciones de diseño pendientes (hero, tabs, cards, entrevistas, equipo, micro-interacciones, Páginas Blancas, paleta)

## Active plan

*(Describe the current task/feature being worked on here when starting work.)*
