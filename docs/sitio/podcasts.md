---
type: nota
status: activo
created: 2026-11-06
tags: [podcasts, generador]
---

# Podcasts

Hub de podcasts en `/podcasts/`. Motivo: el dominio de Spotify no se puede
visitar desde Venezuela, así que el sitio sirve los audios por su cuenta.

## Cómo funciona

- `_scripts/build_podcasts.py` baja los cinco RSS de Anchor (lista `FEEDS`
  al inicio del script) y genera:
  - `podcasts/index.html` — tarjetas de los cinco programas, buscador y los
    últimos cinco episodios.
  - `podcasts/<programa>/index.html` — portada, descripción y lista de
    episodios con reproductor `<audio>` por episodio.
  - `podcasts/<programa>/<episodio>/index.html` — una página por episodio
    con reproductor, notas completas, JSON-LD `PodcastEpisode`, navegación
    anterior/siguiente y buscador.
  - `podcasts/podcasts.js` — `window.PODCASTS` con los RSS y todos los
    metadatos; lo usan el reproductor y el buscador.
  - `imagen/podcasts/<programa>.jpg` — portadas locales (og:image).
  - `imagen/podcasts.jpg` — mosaico de portadas para la tarjeta del [[home]].
- Las páginas llevan `layout: default` con `permalink` explícito: heredan
  header, footer, GTM y entran solas al `sitemap.xml`.
- El audio sale de la URL directa de CloudFront que va embebida en el
  `enclosure` de Anchor; ni `anchor.fm` ni `podcasters.spotify.com`
  participan en la reproducción.
- Los archivos `index.html` de `podcasts/` llevan la marca
  «generado por _scripts/build_podcasts.py»; no editarlos a mano. El script
  borra `podcasts/<programa>/` al regenerar. Editables: `podcasts.css`,
  `podcasts-app.js`.

## Actualizar episodios

```
python _scripts/build_podcasts.py
git add podcasts imagen/podcasts imagen/podcasts.jpg && git commit && git push
```

## Buscador

`podcasts-app.js` indexa título + texto plano de cada episodio (sin tildes)
y filtra en vivo. Mismo componente en las tres vistas.

## Relacionado

- [[subproyectos]] — convención de directorios servidos tal cual
- [[seo-metadata]] — sitemap automático por `site.pages`, llms.txt
