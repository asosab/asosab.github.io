# AGENTS.md

Personal Jekyll site hosted on GitHub Pages (`asosab.github.io`). Repo root is
`C:\Users\asosa\Documents\workspace\asosab.github.io`; the working directory
shown to OpenCode is often `somos10e7/`, so always rebase paths to the repo
root before reading/editing.

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
  - `somos10e7/` — Somos 10⁷ podcast landing page
  - `larga_noche_de_museos/` — Larga Noche de Museos 2026 landing page
  - `vcv/`
  Treat them as static HTML; do not try to wire them into `_layouts/`.

## Local preview

There is no committed dev setup. To preview the blog locally you need
Jekyll 3.x with the whitelisted plugins:

```sh
gem install jekyll jekyll-gist rouge
jekyll serve         # http://localhost:4000
jekyll serve --drafts
```

The `somos10e7/`, `larga_noche_de_museos/`, and `vcv/` subprojects are plain
HTML and do not need a build — open `index.html` directly in a browser.

## Custom Liquid filter

`_plugins/external_link_filter.rb` adds `target="_blank"` to any `<a href="http…">`
emitted by `{{ content | external_link_filter }}` in `_layouts/default.html`.
It only runs for pages that go through that layout. The top-level
subproject pages (`somos10e7/index.html`, etc.) are not processed by
Jekyll templates, so the filter does **not** apply to them.

## `somos10e7/` — self-contained AGENTS.md

`somos10e7/` now has its own `AGENTS.md` with all Somos 10⁷ specifics
(locales, episode editing, Firebase, secrets). The root file delegates;
edit the local file when working inside that subproject.

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
