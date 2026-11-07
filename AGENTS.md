# AGENTS.md

Personal Jekyll site hosted on GitHub Pages (`asosab.github.io`). In the
`desarrollo` workspace the repo sits at `desarrollo\asosab.github.io`; opencode
metadata (STATE, PLAN, CHANGELOG, arquitectura) lives **outside** the repo at
`desarrollo\opencode\asosab.github.io\`. The deploy branch is `master`.

## Stack at a glance

- Static site, built directly by **GitHub Pages** — no `Gemfile`, no
  `package.json`, no `.github/workflows`. There is nothing to install.
- No tests, no linter, no typecheck, no CI. Do not invent commands.
- `_config.yml` is the only build config. Plugins: `jekyll-gist`, `rouge`,
  and one local plugin in `_plugins/external_link_filter.rb`.

## Layout

- `_posts/YYYY-MM-DD-slug.md` — blog posts. `permalink: /:title/` in
  `_config.yml` means the **filename slug is the URL**; renaming a file
  changes its public URL.
- `_drafts/` — drafts. Not built in production (`jekyll serve --drafts`
  locally if you ever need to preview them).
- `_layouts/`, `_includes/`, `assets/` — standard Jekyll.
- `_site/` — generated, gitignored (`_site`, `.jekyll-metadata`). Never edit.
- `data/` — JSON/TSV/CSV datasets referenced by posts (D3 charts, etc.).
- Top-level project directories that are **NOT Jekyll posts** and are served
  as-is (no front matter, no layouts):
  - `buddy/` — Buddy platform landing
  - `lav/` — Línea Abierta Vecinal story site
  - `call_center_gobernacion/` — proposal for the Gobernación
  - `vcv/` — Voz Ciudadana Venezuela proposal
  Treat them as static HTML; do not try to wire them into `_layouts/`.
- Other project cards on the home (`/somos10e7/`, `/larga_noche_de_museos/`,
  `/nombres-venezolanos/`, `/ekvilibrolab/`, `/bot_sigue_linea/`) are **not**
  directories in this repo — each is its own GitHub repo served as a project
  page under the same domain. See `docs/sitio/subproyectos.md`.
- `docs/` — Obsidian vault (see below), excluded from the Jekyll build.

## Local preview

There is no committed dev setup. To preview the blog locally you need
Jekyll 3.x with the whitelisted plugins:

```sh
gem install jekyll jekyll-gist rouge
jekyll serve         # http://localhost:4000
jekyll serve --drafts
```

The local subprojects (`buddy/`, `lav/`, `call_center_gobernacion/`, `vcv/`)
are plain HTML and do not need a build — open `index.html` directly in a
browser.

## Custom Liquid filter

`_plugins/external_link_filter.rb` adds `target="_blank"` to any `<a href="http…">`
emitted by `{{ content | external_link_filter }}` in `_layouts/default.html`.
It only runs for pages that go through that layout. The top-level
subproject pages (`somos10e7/index.html`, etc.) are not processed by
Jekyll templates, so the filter does **not** apply to them.

## `somos10e7` — separate repo

Somos 10⁷ moved to its own GitHub repository (served at
`asosab.github.io/somos10e7/`) with its own `AGENTS.md` covering locales,
episode editing, Firebase and secrets. Work on it in that repo, not here.

## Obsidian vault

The repo root doubles as an Obsidian vault; `docs/` is the knowledge domain
(excluded from the Jekyll build via `exclude` in `_config.yml`). Start at
`docs/index.md` — atomic notes under `docs/sitio/`, session logs under
`docs/log/YYYY-MM-DD.md`, templates under `docs/templates/`. `.obsidian/`
shared config is committed; workspaces, plugins and themes are gitignored.
After a work session, record what was done in the day's log file.

## `llms.txt`

`llms.txt` at the repo root is a curated, human-readable index of the
site's notable pages and projects. Update it when adding a significant
post or subproject; this is the file AI crawlers tend to read first.

## Conventions worth preserving

- Posts are written in Spanish (`_config.yml` sets `locale: es_ES`).
- Permalink strips the date — when fixing broken links, update the
  filename slug, not the front matter.
- `desarrollo: true` in `_config.yml` switches CSS/JS to local
  `assets/` (offline dev); `false` uses CDN (production default). Flip
  locally if the CDN is blocked.
- The custom Ruby plugin is one file and intentionally tiny; keep it that
  way to stay within GitHub Pages' plugin whitelist constraints.
- Do not commit `_site/`, `.jekyll-metadata`, or shell history files
  (`*bash` is in `.gitignore`).
