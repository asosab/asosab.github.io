# AGENTS.md — somos10e7 (Somos 10⁷)

Static podcast landing page at `https://asosab.github.io/somos10e7/`. Plain HTML +
CSS + vanilla JS. No build, no framework, no npm, no Jekyll processing.

## Key facts

- **No tests, no linter, no CI.** Do not invent commands for these.
- **No build step.** To preview: open `index.html` in a browser or serve with any
  static server (`python -m http.server`). `start index.html` on Windows.

## Workflow: PLAN.md first

Before editing any feature or content, read `PLAN.md` to understand current
state and planned work. After making changes, update `PLAN.md` to reflect
what was done, what changed, and any new gaps or next steps discovered.
Also add a line to `CHANGELOG.md` with date, category, and description.

## Editing content

- **Episodes:** auto-generados desde `videosData.json` filtrando por playlist "Episodios".
  Para agregar uno nuevo basta con subir el video a YouTube, agregarlo a la playlist
  "Episodios" y regenerar `videosData.json` con `node js/youtube_videos.mjs`.
  Luego actualizar la sección `#ultimo` para que apunte al nuevo episodio.
- **Interviews:** auto-generados desde `videosData.json` filtrando por playlist "Entrevistas".
- **Emprendedores:** auto-generados desde `videosData.json` filtrando por playlist "Emprendedores". Misma card style que entrevistas.
- **Team:** hand-written `.equipo-card` blocks. Photos in `imagen/<name>.png`;
  fallback to initials via `onerror`.

## Secrets in git history (compromised, do not reuse)

- YouTube API key in `js/youtube_videos.mjs`
- Context7 API key in `opencode.jsonc`
- Firebase config (apiKey, projectId, etc.) in `index.html` (Firebase module script)
- If you re-run `youtube_videos.mjs`, rotate the YouTube key first.

## `js/youtube_videos.mjs`

One-shot Node script that fetches YouTube Data API v3 and writes
`js/videosData.json`. Consumed by the landing page to render episodes and
interviews dynamically. Requires Node 18+, `npm install node-fetch`. Run from
`js/` as `node youtube_videos.mjs`.

## Firebase live visitor counter

A Firestore-based counter in the last `<script type="module">` of `index.html`.
It registers a doc per IP every 30 min and queries active visitors. The orbital
ring animation (`renderizarAnillos`) drives off `window.usuariosActivos`.

## Other gotchas

- `back/` directory contains rough drafts and working notes — ignore for production.
- `#micros` section exists in the nav and footer but is empty (placeholder).
- Text color scheme is dark (`--oscuro: #0D1B2A`) with crema text — all new
  sections should follow the same palette defined in `:root`.
- Google Analytics (`UA-84695-6`) is loaded in the second-to-last `<script>`.
- OpenCode config in `opencode.jsonc` points `instructions` to this file;
  installed skills: `find-skills`, `frontend-design`.
