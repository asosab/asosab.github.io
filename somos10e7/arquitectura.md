# Arquitectura — Somos 10⁷ Landing

Diagrama de la landing page estática en `somos10e7/`. La aplicación es un
sitio HTML/CSS/JS puro, sin build, sin backend propio, servido por GitHub
Pages. Todo el "runtime" ocurre en el navegador del visitante.

---

## 1. Vista de despliegue y servicios externos

```mermaid
flowchart LR
    subgraph Repo["📁 Repo asosab.github.io (origen)"]
        direction TB
        J["_config.yml<br/>(Jekyll, plugins whitelist)"]
        SP["somos10e7/<br/>(subdir estático,<br/>no procesado por Jekyll)"]
        SP --> SPHTML["index.html"]
        SP --> SPLOC["es_VE.txt<br/>es_BO.txt<br/>(JSON con ext .txt)"]
        SP --> SPIMG["imagen/<br/>*.png, *.jpg"]
        SP --> SPBACK["back/<br/>(borradores)"]
        SP --> SPJS["js/youtube_videos.mjs<br/>(offline)"]
        SP --> SPOC["opencode.jsonc<br/>(config OpenCode local)"]
    end

    GH["GitHub Pages<br/>CDN + TLS + Jekyll build"]:::infra
    BR["🌐 Navegador del visitante"]:::client

    GF["Google Fonts<br/>(Playfair, Barlow)"]:::ext
    YT["YouTube<br/>i/embed + thumbnails"]:::ext
    FORMS["Google Forms<br/>(Páginas Blancas)"]:::ext
    YTAPI["YouTube Data API v3<br/>(solo script offline)"]:::ext

    Repo -- "git push" --> GH
    GH -- "HTTPS GET<br/>asosab.github.io/somos10e7/" --> BR
    BR -- "fetch CSS woff2" --> GF
    BR -- "iframe + img.youtube.com" --> YT
    BR -- "link a forms.gle" --> FORMS
    SPJS -. "node script<br/>(no se ejecuta en deploy)" .-> YTAPI
    YTAPI -. "videosData.json" .-> SPJS

    classDef infra fill:#e8f0ff,stroke:#1A3A6B,color:#0D1B2A
    classDef client fill:#fff3d6,stroke:#F4B400,color:#0D1B2A
    classDef ext fill:#ffe6e6,stroke:#CF2F35,color:#0D1B2A
```

**Notas:**
- El repo raíz usa Jekyll (`_config.yml`), pero `somos10e7/` es un
  subdirectorio sin front matter: GitHub Pages lo sirve **tal cual**.
- `back/` y `opencode.jsonc` no se sirven en producción: están en
  `.gitignore` lógico (no se listan en el HTML generado) y no se
  referencian desde la página.
- El script `youtube_videos.mjs` no forma parte del runtime; es una
  utilidad local para regenerar `videosData.json`, que **no se consume**
  por la landing.

---

## 2. Flujo de carga de la página (runtime del visitante)

```mermaid
sequenceDiagram
    autonumber
    actor U as Visitante
    participant B as Navegador
    participant GH as GitHub Pages
    participant GF as Google Fonts
    participant I18N as i18n IIFE<br/>(inline en index.html)
    participant LS as localStorage
    participant LOC as es_VE.txt / es_BO.txt<br/>(servido por GH Pages)
    participant YT as YouTube

    U->>B: Pega https://asosab.github.io/somos10e7/
    B->>GH: GET /somos10e7/
    GH-->>B: 200 index.html (HTML + CSS embebido + JS inline)
    B->>B: Parsea HTML, descubre recursos
    B->>GF: GET CSS de Playfair, Barlow (woff2)
    GF-->>B: fuentes

    Note over B,I18N: DOMContentLoaded
    B->>I18N: Ejecuta IIFE
    I18N->>LS: getItem("locale")
    LS-->>I18N: "es_VE" | "es_BO" | null
    I18N->>I18N: Fallback a "es_VE" si vacío o inválido
    I18N->>LOC: GET https://asosab.github.io/somos10e7/{locale}.txt
    LOC-->>I18N: 200 application/json (servido como text/plain)
    I18N->>I18N: Parsea JSON, expone window._i18nDict
    I18N->>B: Aplica data-i18n y data-i18n-attr al DOM
    I18N->>B: Actualiza document.documentElement.lang

    B->>YT: GET iframe embed + thumbnails img.youtube.com
    YT-->>B: HTML del reproductor + JPEGs

    Note over B: IntersectionObserver.attach
    B->>B: Scroll → fade-in de .fade-up
    B->>B: Scroll → scroll-spy resalta link activo del nav
    U->>B: Click en sección
    B->>B: showSeason(id) si es tab de temporada<br/>o navLinks.classList.toggle si es mobile
```

**Puntos críticos del flujo:**

1. El **fetch del locale** es no bloqueante: el HTML ya muestra textos
   por defecto; el JS los reemplaza cuando llega el JSON.
2. La URL del i18n es **absoluta** (`https://asosab.github.io/somos10e7/`).
   Cambiar el path del directorio rompe el fetch.
3. `.txt` se sirve con `Content-Type: text/plain`; el JS hace
   `r => r.json()` igualmente porque el cuerpo es JSON válido.
4. La persistencia del locale es **solo cliente** (`localStorage`).
   No hay sesión, no hay cookie, no hay backend.

---

## 3. Componentes dentro de `index.html`

```mermaid
flowchart TB
    subgraph HEAD["&lt;head&gt;"]
        META["Meta SEO + Open Graph + Twitter Card"]
        JSONLD["JSON-LD Schema.org<br/>PodcastSeries"]
        FONTS["&lt;link&gt; Google Fonts"]
        CSS["&lt;style&gt;<br/>Variables, layout, animaciones<br/>(~1000 líneas embebidas)"]
        I18N["&lt;script&gt; i18n IIFE"]
    end

    subgraph BODY["&lt;body&gt;"]
        NAV["#navbar<br/>nav fijo + mobile toggle"]
        HERO["#hero<br/>título + CTAs + anillos orbitales"]
        ULT["#ultimo<br/>iframe del último episodio"]
        TEMP["#temporadas<br/>tabs por temporada +<br/>grid de episode-cards"]
        ENT["#entrevistas<br/>grid de entrevista-cards"]
        MIC["#micros<br/>(placeholder, vacío)"]
        EQ["#equipo<br/>4 cards del equipo"]
        RED["#redes<br/>8 plataformas"]
        PB["#paginas-blancas<br/>CTA a Google Forms"]
        FOOT["footer<br/>secciones + contacto"]
    end

    subgraph SCRIPTS["&lt;script&gt; al final del body"]
        NAVJS["navToggle handler"]
        SEAS["showSeason(id, btn)"]
        IO["IntersectionObserver<br/>fade-in + scroll-spy"]
    end

    I18N -. "lee/escribe" .-> LS2[("localStorage<br/>key='locale'")]
    I18N -. "fetch" .-> LOC2["{locale}.txt"]
    TEMP --> SEAS
    NAV --> NAVJS
    BODY --> IO
    CSS -. "anima" .-> IO

    classDef head fill:#1A3A6B,stroke:#0D1B2A,color:#FAF5E9
    classDef body fill:#FAF5E9,stroke:#0D1B2A,color:#0D1B2A
    classDef js fill:#F4B400,stroke:#0D1B2A,color:#0D1B2A
    class HEAD head
    class BODY body
    class SCRIPTS js
```

**Observaciones:**

- `#micros` está declarado en el nav y en el footer pero la sección
  está vacía (placeholder) en el HTML actual.
- No hay bundler ni módulo ES: todo el JS es `<script>` clásico en orden
  de ejecución (i18n en `<head>`, handlers al final del `<body>`).
- El CSS está **embebido en `<style>`**, no en `assets/`. Para
  temas/variables hay que editar el bloque `:root` dentro de `index.html`.

---

## 4. Pipeline offline: regenerar `videosData.json`

```mermaid
flowchart LR
    DEV["👨‍💻 Desarrollador<br/>(Node 18+)"]:::dev
    SCRIPT["node youtube_videos.mjs"]:::tool
    YTAPI["YouTube Data API v3"]:::ext
    JSON["js/videosData.json<br/>(output, no se deploya)"]:::tool

    DEV -- "npm install node-fetch<br/>(primera vez)" --> SCRIPT
    DEV -- "node youtube_videos.mjs" --> SCRIPT
    SCRIPT -- "channels.list<br/>playlists.list<br/>playlistItems.list (paginado)" --> YTAPI
    YTAPI -- "JSON" --> SCRIPT
    SCRIPT -- "cruza videos ↔ playlists<br/>preserva claves extra" --> JSON

    JSON -. "no se referencia en index.html<br/>(workflow manual independiente)" .-> X[("❌ No consumido")]

    classDef dev fill:#fff3d6,stroke:#F4B400,color:#0D1B2A
    classDef tool fill:#e8f0ff,stroke:#1A3A6B,color:#0D1B2A
    classDef ext fill:#ffe6e6,stroke:#CF2F35,color:#0D1B2A
```

**Por qué este pipeline existe pero no se usa:**

El script podría listar todos los videos del canal `@somos10e7`, pero
los episodios visibles en la landing se **editan a mano** dentro de
`index.html` (orden, títulos traducidos, portadas personalizadas). El
JSON queda en disco solo como referencia editorial.

---

## Resumen de límites del sistema

| Frontera            | Adentro                              | Afuera                                |
| ------------------- | ------------------------------------ | ------------------------------------- |
| **Build**           | Nada (HTML/CSS/JS estático)          | Jekyll (solo en el resto del repo)    |
| **Runtime**         | Navegador del visitante              | GitHub Pages (solo hosting)            |
| **Estado**          | `localStorage.locale`                | Cookies, sesión, base de datos        |
| **Datos dinámicos** | YouTube embeds, Google Forms         | Backend propio (no existe)            |
| **Configuración**   | `opencode.jsonc` (solo OpenCode)     | Variables de entorno, secretos        |
| **Secretos**        | `API_KEY` de YT, `CONTEXT7_API_KEY`  | ⚠️ Commiteados en el repo             |
