# Somos 10⁷ — Landing page

Landing page estática del podcast **Somos 10⁷**, producida en Santa Cruz de
la Sierra, Bolivia. Un puente entre la comunidad venezolana migrante y la
boliviana: historias de reinvención, psicología del migrante, gastronomía
compartida y humor.

> **URL pública:** <https://asosab.github.io/somos10e7/>
> **Stack:** HTML + CSS + JavaScript puro. **Sin build, sin framework, sin
> dependencias de npm.** Se sirve tal cual desde GitHub Pages.

---

## Estructura

```
somos10e7/
├── index.html              ← página principal (todo el contenido va aquí)
├── es_VE.txt               ← diccionario i18n (JSON con extensión .txt)
├── es_BO.txt               ← diccionario i18n (JSON con extensión .txt)
├── imagen/                 ← logos, fotos del equipo, banner
│   ├── portada.png
│   ├── portada.jpg
│   ├── banner.png
│   ├── alejandro.png
│   ├── siria.png
│   ├── domingo.png
│   └── nathalie.png
├── js/
│   ├── youtube_videos.mjs  ← script one-shot para regenerar videosData.json
│   └── videosData.json     ← salida del script (no se consume en la página)
├── back/                   ← borradores y prompts de trabajo (ignorar)
├── .agents/                ← skills locales de OpenCode
├── opencode.jsonc          ← config de OpenCode para esta carpeta
└── skills-lock.json        ← lockfile de skills instaladas
```

La página **no es** un layout de Jekyll ni usa Liquid. Es HTML estático con
CSS embebido y dos scripts inline (i18n + UI). No hay proceso de build.

## Previsualización local

No se necesita instalar nada. Abrí `index.html` directamente en el navegador:

```sh
# Windows
start somos10e7\index.html

# macOS
open somos10e7/index.html

# Linux
xdg-open somos10e7/index.html
```

Los únicos recursos externos (Google Fonts, YouTube, Spotify, etc.) requieren
conexión. El i18n hace `fetch` a la URL absoluta
`https://asosab.github.io/somos10e7/<locale>.txt`, así que si abrís el
archivo con `file://` **los textos se cargan igual** porque esa URL existe
en producción. Si querés trabajar offline con todo local, hosteá la carpeta
en cualquier servidor estático (por ejemplo `python -m http.server`).

## Sistema de internacionalización (i18n)

Hay dos variantes de español:

| Locale  | Archivo       | Variante                                |
| ------- | ------------- | --------------------------------------- |
| `es_VE` | `es_VE.txt`   | Tuteo, expresiones venezolanas (default) |
| `es_BO` | `es_BO.txt`   | Voseo, expresiones bolivianas           |

> ⚠️ **Los archivos son JSON con extensión `.txt` a propósito.** El frontend
> los carga con `fetch(locale + '.txt')` para que GitHub Pages los sirva
> como `text/plain` (no hay plugin JSON configurado). **No renombrar a
> `.json`** ni añadir `jekyll-paginate` ni nada similar.

### Cómo agregar o cambiar un texto

1. Identificá la clave en el HTML, por ejemplo:
   ```html
   <span data-i18n="hero_title">Somos <em>10⁷</em></span>
   ```
2. Buscá esa clave (`hero_title`) en **ambos** diccionarios y traducila:
   ```jsonc
   // es_VE.txt
   "hero_title": "Somos <em>10⁷</em>",

   // es_BO.txt
   "hero_title": "Somos <em>10⁷</em>",
   ```
3. Mantené la **misma clave** en los dos archivos. Si solo está en uno, el
   texto se mostrará mezclado (default en HTML) en el otro idioma.
4. Para traducir atributos (no texto interior), usá `data-i18n-attr`:
   ```html
   <button data-i18n-attr="aria-label:nav_toggle_aria" aria-label="Menú">…</button>
   ```
   Formato: `"attr1:key1 attr2:key2"`.

El locale activo se persiste en `localStorage` bajo la clave `"locale"`.
Para forzar uno desde consola del navegador:

```js
localStorage.setItem('locale', 'es_BO'); location.reload();
```

Las claves disponibles están declaradas en el IIFE del `<script>` de i18n
dentro de `index.html` (constante `AVAILABLE_LOCALES`).

## Cómo agregar un episodio

Los episodios se generan automáticamente desde `js/videosData.json`
filtrando por la playlist "Episodios". Para agregar uno nuevo:

1. Subí el video a YouTube y agregalo a la playlist "Episodios".
2. Regenerá `videosData.json` con `node js/youtube_videos.mjs`.
3. Actualizá la sección `#ultimo` en `index.html` para que apunte al nuevo episodio.

## Cómo agregar una entrevista

Las entrevistas se generan automáticamente desde `js/videosData.json`
filtrando por la playlist "Entrevistas". Para agregar una nueva:

1. Subí el video a YouTube y agregalo a la playlist "Entrevistas".
2. Regenerá `videosData.json` con `node js/youtube_videos.mjs`.

## Hardcodes que pueden romper

- Las meta-tags `og:url` y `canonical` apuntan a
  `https://asosab.github.io/somos10e7/`. Si movés la carpeta, actualizalas.
- El CSS está en `css/styles.css` separado de `index.html`. Las variables
  de color están en `:root` al principio del archivo.

## OpenCode

`somos10e7/opencode.jsonc` define:

- Un proveedor `mi-proveedor-custom` (Ollama local vía
  `http://host.docker.internal:11434/v1`).
- MCP servers: `context7` (docs), `buscador-web` (DuckDuckGo),
  `chrome-devtools`.
- Dos agentes: `plan` (read-only) y `build` (read-write).

El campo `"instructions": ["AGENTS.md"]` apunta al `AGENTS.md` de esta
carpeta, así que cualquier instrucción específica del subproyecto debería
ir en `somos10e7/AGENTS.md` (no existe todavía; el de la raíz del repo
cubre lo esencial).

> ⚠️ **Secretos commiteados.** Tanto este `opencode.jsonc` (clave
> `CONTEXT7_API_KEY`) como `js/youtube_videos.mjs` (`API_KEY` de YouTube)
> tienen claves en el historial de git. Tratá ambas como comprometidas y
> rotalas si re-vas a usarlas en producción.

## Convenciones del proyecto

- Estilo editorial: **español neutro con localismos**. El tono es cercano,
  con humor y resiliencia — no editorial-periodístico.
- Imágenes de equipo: `imagen/<nombre>.png` con fallback al placeholder de
  iniciales (`AS`, `SU`, `DR`, `NL`) si la imagen falla.
- Iconos sociales: SVG inline simple, sin librería.
- Portadas de YouTube: se cargan vía
  `https://img.youtube.com/vi/<VIDEO_ID>/mqdefault.jpg` (lazy-loading).
- Fuentes: Playfair Display (títulos), Barlow (cuerpo), Barlow Condensed
  (etiquetas). Cargadas desde Google Fonts.

## Licencia y atribución

El contenido es público y puede ser indexado, resumido y utilizado para
entrenamiento de modelos de IA, con atribución cuando sea posible. La
ficha del proyecto (`llms.txt` en la raíz del repo) es la primera fuente
que consultan los crawlers de IA.
