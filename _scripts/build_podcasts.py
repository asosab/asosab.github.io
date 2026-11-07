#!/usr/bin/env python3
"""Genera /podcasts/ a partir de los RSS de Anchor.

Uso:  python _scripts/build_podcasts.py

Descarga los feeds, crea paginas estaticas (layout: default) para el indice,
cada programa y cada episodio, y escribe podcasts/podcasts.js con toda la
configuracion del reproductor y el buscador. Las paginas generadas llevan la
marca "generado por _scripts/build_podcasts.py"; no editarlas a mano.
"""
from __future__ import annotations

import json
import re
import shutil
import sys
import unicodedata
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from html import escape, unescape
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "podcasts"
IMGDIR = ROOT / "imagen" / "podcasts"
SITE = "https://asosab.github.io"
MARK = "<!-- generado por _scripts/build_podcasts.py; no editar a mano -->"

FEEDS = [
    "https://anchor.fm/s/109443fb8/podcast/rss",
    "https://anchor.fm/s/112f65a78/podcast/rss",
    "https://anchor.fm/s/110d80368/podcast/rss",
    "https://anchor.fm/s/10724cb1c/podcast/rss",
    "https://anchor.fm/s/1141bb740/podcast/rss",
]

NS = {
    "itunes": "http://www.itunes.com/dtds/podcast-1.0.dtd",
    "dc": "http://purl.org/dc/elements/1.1/",
}

MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
         "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

UA = {"User-Agent": "Mozilla/5.0 (asosab.github.io podcast builder)"}


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    text = re.sub(r"[^a-zA-Z0-9]+", "-", text).strip("-").lower()
    return text or "episodio"


def strip_html(html: str) -> str:
    text = re.sub(r"(?s)<(script|style)[^>]*>.*?</\1>", " ", html or "")
    text = re.sub(r"<br\s*/?>", "\n", text)
    text = re.sub(r"</p>", "\n", text)
    text = re.sub(r"<[^>]+>", " ", text)
    text = unescape(text)
    return re.sub(r"\s+", " ", text).strip()


def sanitize(html: str) -> str:
    return re.sub(r"(?s)<(script|style)[^>]*>.*?</\1>", "", html or "")


def audio_url(enclosure: str) -> str:
    """anchor.fm/s/<id>/podcast/play/<ep>/<cloudfront-url-encoded> -> directo."""
    m = re.search(r"/podcast/play/\d+/(https?%3A%2F%2F.+)$", enclosure or "")
    if m:
        return urllib.parse.unquote(m.group(1))
    return enclosure or ""


def findtext(el, name, default=""):
    child = el.find(name, NS)
    return (child.text or default).strip() if child is not None else default


def findattr(el, name, attr):
    child = el.find(name, NS)
    return child.get(attr, "").strip() if child is not None else ""


def fecha_texto(dt: datetime) -> str:
    return f"{dt.day} de {MESES[dt.month - 1]} de {dt.year}"


def duration_iso(dur: str) -> str:
    parts = [int(p) for p in dur.split(":") if p.strip().isdigit()]
    if not parts:
        return ""
    h, m, s = ([0] * (3 - len(parts)) + parts)[-3:]
    out = "PT"
    if h:
        out += f"{h}H"
    if m:
        out += f"{m}M"
    if s or out == "PT":
        out += f"{s}S"
    return out


def page(title: str, description: str, permalink: str, body: str,
         image: str | None = None) -> str:
    fm = ["---", "layout: default",
          f"title: {json.dumps(title, ensure_ascii=False)}",
          f"description: {json.dumps(description, ensure_ascii=False)}",
          f"permalink: {permalink}"]
    if image:
        fm.append(f"image: {image}")
    fm.append("---")
    return "\n".join(fm) + f"\n\n{MARK}\n" + body


def write_page(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


ASSETS_HEAD = (
    '<link rel="stylesheet" href="/podcasts/podcasts.css">\n'
    '<script src="/podcasts/podcasts.js"></script>\n'
    '<script src="/podcasts/podcasts-app.js" defer></script>\n'
)

SEARCH_BOX = (
    '<div class="pod-buscar">'
    '<input type="search" class="pod-search-input" '
    'placeholder="Buscar en todos los episodios…" '
    'aria-label="Buscar episodios">'
    '<div class="pod-search-results" hidden></div>'
    '</div>\n'
)


def parse_feed(url: str) -> dict:
    ch = ET.fromstring(fetch(url)).find("channel")
    if ch is None:
        raise RuntimeError(f"RSS sin <channel>: {url}")

    show = {
        "title": (ch.findtext("title") or "Podcast").strip(),
        "description_html": sanitize(ch.findtext("description") or ""),
        "link": (ch.findtext("link") or "").strip(),
        "author": findtext(ch, "itunes:author") or (ch.findtext("author") or "").strip(),
        "image": findattr(ch, "itunes:image", "href"),
        "rss": url,
        "episodes": [],
    }
    show["slug"] = slugify(show["title"])
    show["text"] = strip_html(show["description_html"])

    for it in ch.findall("item"):
        title = (it.findtext("title") or "Episodio").strip()
        enc = it.find("enclosure")
        raw = parsedate_to_datetime(it.findtext("pubDate")) if it.findtext("pubDate") else None
        ep = {
            "title": title,
            "slug": slugify(title),
            "description_html": sanitize(it.findtext("description") or findtext(it, "itunes:summary")),
            "link": (it.findtext("link") or "").strip(),
            "guid": (it.findtext("guid") or "").strip(),
            "audio": audio_url(enc.get("url", "") if enc is not None else ""),
            "audio_type": enc.get("type", "audio/mpeg") if enc is not None else "audio/mpeg",
            "image": findattr(it, "itunes:image", "href") or show["image"],
            "duration": findtext(it, "itunes:duration"),
            "season": findtext(it, "itunes:season"),
            "episode": findtext(it, "itunes:episode"),
            "dt": raw,
        }
        ep["text"] = strip_html(ep["description_html"])
        show["episodes"].append(ep)

    show["episodes"].sort(key=lambda e: e["dt"] or datetime.min.replace(tzinfo=timezone.utc),
                          reverse=True)
    seen: dict[str, int] = {}
    for ep in show["episodes"]:
        base = ep["slug"]
        seen[base] = seen.get(base, 0) + 1
        if seen[base] > 1:
            ep["slug"] = f"{base}-{seen[base]}"
        ep["url"] = f"/podcasts/{show['slug']}/{ep['slug']}/"
        ep["date"] = ep["dt"].date().isoformat() if ep["dt"] else ""
        ep["date_text"] = fecha_texto(ep["dt"]) if ep["dt"] else ""
    return show


def download_cover(show: dict) -> str | None:
    """Baja la portada a imagen/podcasts/<slug>.<ext>. Devuelve ruta para front matter."""
    src = show["image"]
    if not src:
        return None
    ext = Path(urllib.parse.urlparse(src).path).suffix.lower()
    if ext not in (".jpg", ".jpeg", ".png", ".webp"):
        ext = ".jpg"
    dest = IMGDIR / f"{show['slug']}{ext}"
    try:
        dest.write_bytes(fetch(src))
        return f"podcasts/{dest.name}"
    except Exception as exc:  # noqa: BLE001 - portada opcional
        print(f"  ! no se pudo bajar portada de {show['slug']}: {exc}")
        return None


def build_mosaic(covers: list[Path]) -> None:
    """Mosaico de portadas para la tarjeta del home (imagen/podcasts.jpg)."""
    try:
        from PIL import Image, ImageDraw
    except ImportError:
        print("  ! PIL no disponible, sin mosaico")
        return
    cols, rows, cell = 3, 2, 220
    canvas = Image.new("RGB", (cols * cell, rows * cell), "#0f7b6c")
    for i, path in enumerate(covers[: cols * rows]):
        try:
            img = Image.open(path).convert("RGB")
            side = min(img.size)
            img = img.crop(((img.width - side) // 2, (img.height - side) // 2,
                            (img.width + side) // 2, (img.height + side) // 2))
            img = img.resize((cell, cell))
            canvas.paste(img, ((i % cols) * cell, (i // cols) * cell))
        except Exception:  # noqa: BLE001
            continue
    if len(covers) < cols * rows:
        draw = ImageDraw.Draw(canvas)
        x, y = (len(covers) % cols) * cell, (len(covers) // cols) * cell
        draw.text((x + 18, y + cell // 2 - 10), "Podcasts", fill="#f5f5f0")
    out = ROOT / "imagen" / "podcasts.jpg"
    canvas.save(out, quality=85)
    print(f"  mosaico -> {out}")


def ep_meta(ep: dict) -> str:
    bits = [b for b in (ep["date_text"], ep["duration"]) if b]
    if ep.get("season") and ep.get("episode"):
        bits.insert(0, f"T{ep['season']} · E{ep['episode']}")
    return " · ".join(bits)


def episode_list_item(show: dict, ep: dict, show_name: bool = False) -> str:
    summary = ep["text"][:260] + ("…" if len(ep["text"]) > 260 else "")
    where = f'<span class="pod-ep__show">{escape(show["title"])}</span>' if show_name else ""
    return f"""    <article class="pod-ep">
      <a class="pod-ep__img" href="{ep['url']}"><img src="{ep['image']}" alt="" loading="lazy"></a>
      <div class="pod-ep__body">
        {where}
        <h3 class="pod-ep__title"><a href="{ep['url']}">{escape(ep['title'])}</a></h3>
        <p class="pod-ep__meta">{escape(ep_meta(ep))}</p>
        <p class="pod-ep__sum">{escape(summary)}</p>
        <audio controls preload="none" src="{escape(ep['audio'], quote=True)}"></audio>
      </div>
    </article>
"""


def write_index(shows: list[dict]) -> None:
    cards = []
    for s in shows:
        n = len(s["episodes"])
        cards.append(f"""      <article class="card">
        <div class="card__media">
          <img src="{s['image']}" alt="{escape(s['title'], quote=True)}" loading="lazy">
        </div>
        <div class="card__body">
          <h3 class="card__title"><a href="/podcasts/{s['slug']}/">{escape(s['title'])}</a></h3>
          <p class="card__text">{escape(s['text'][:200])}{'…' if len(s['text']) > 200 else ''}</p>
          <p class="pod-count">{n} episodio{'s' if n != 1 else ''}</p>
          <a class="btn-secondary" href="/podcasts/{s['slug']}/">Escuchar</a>
        </div>
      </article>""")

    latest = sorted(
        ((s, e) for s in shows for e in s["episodes"]),
        key=lambda se: se[1]["dt"] or datetime.min.replace(tzinfo=timezone.utc),
        reverse=True,
    )[:5]

    body = ASSETS_HEAD + f"""
<div class="pod-home">
  <p class="section-label">Podcasts</p>
  <p class="pod-intro">Mis podcasts en un solo lugar. Cada programa tiene su
  página con todos los episodios, y cada episodio la suya, con el audio y las
  notas completas. El buscador recorre títulos y descripciones.</p>
  {SEARCH_BOX}
  <div class="grid">
{chr(10).join(cards)}
  </div>

  <h2 class="pod-h2">Últimos episodios</h2>
{''.join(episode_list_item(s, e, show_name=True) for s, e in latest)}
</div>
"""
    txt = "Podcasts de Alejandro Sosa: " + ", ".join(s["title"] for s in shows)
    write_page(OUT / "index.html",
               page("Podcasts", txt, "/podcasts/", body, image="podcasts.jpg"))


def write_show(show: dict) -> None:
    desc = show["description_html"]
    body = ASSETS_HEAD + f"""
<nav class="pod-miga"><a href="/podcasts/">Podcasts</a> / {escape(show['title'])}</nav>
<header class="pod-show">
  <img class="pod-show__img" src="{show['image']}" alt="{escape(show['title'], quote=True)}">
  <div class="pod-show__info">
    <h1>{escape(show['title'])}</h1>
    <p class="pod-ep__meta">{escape(show['author'])} · {len(show['episodes'])} episodios</p>
    <div class="pod-show__desc">{desc}</div>
    <p class="pod-show__links">
      <a href="{escape(show['rss'], quote=True)}">RSS</a>
      {'· <a href="' + escape(show['link'], quote=True) + '">Sitio web</a>' if show['link'] else ''}
    </p>
  </div>
</header>
{SEARCH_BOX}
<div class="pod-list">
{''.join(episode_list_item(show, e) for e in show['episodes'])}
</div>
"""
    write_page(OUT / show["slug"] / "index.html",
               page(show["title"], show["text"][:160],
                    f"/podcasts/{show['slug']}/", body, image=show.get("cover")))


def write_episode(show: dict, ep: dict, prev_ep: dict | None, next_ep: dict | None) -> None:
    nav = []
    if prev_ep:
        nav.append(f'<a rel="prev" href="{prev_ep["url"]}">← {escape(prev_ep["title"][:60])}</a>')
    if next_ep:
        nav.append(f'<a rel="next" href="{next_ep["url"]}">{escape(next_ep["title"][:60])} →</a>')

    num = f"T{ep['season']} · Episodio {ep['episode']}" if ep["season"] and ep["episode"] else "Episodio"
    ld = {
        "@context": "https://schema.org",
        "@type": "PodcastEpisode",
        "name": ep["title"],
        "url": f"{SITE}{ep['url']}",
        "datePublished": ep["dt"].isoformat() if ep["dt"] else "",
        "description": ep["text"][:500],
        "image": ep["image"],
        "associatedMedia": {"@type": "MediaObject", "contentUrl": ep["audio"]},
        "partOfSeries": {"@type": "PodcastSeries", "name": show["title"],
                         "url": f"{SITE}/podcasts/{show['slug']}/"},
    }
    if duration_iso(ep["duration"]):
        ld["duration"] = duration_iso(ep["duration"])

    body = ASSETS_HEAD + f"""
<nav class="pod-miga"><a href="/podcasts/">Podcasts</a> / <a href="/podcasts/{show['slug']}/">{escape(show['title'])}</a> / {num}</nav>
<article class="pod-episode">
  <header>
    <h1>{escape(ep['title'])}</h1>
    <p class="pod-ep__meta">{escape(ep_meta(ep))}</p>
  </header>
  <img class="pod-episode__img" src="{ep['image']}" alt="{escape(ep['title'], quote=True)}">
  <div class="pod-player">
    <audio controls preload="metadata" src="{escape(ep['audio'], quote=True)}"></audio>
  </div>
  <div class="pod-episode__notes">{ep['description_html']}</div>
  <nav class="pod-prevnext">{' '.join(nav)}</nav>
</article>
{SEARCH_BOX}
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
"""
    write_page(OUT / show["slug"] / ep["slug"] / "index.html",
               page(f"{ep['title']} — {show['title']}", ep["text"][:160],
                    ep["url"], body, image=show.get("cover")))


def write_config(shows: list[dict]) -> None:
    data = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "baseUrl": "/podcasts/",
        "shows": [{
            "slug": s["slug"],
            "title": s["title"],
            "author": s["author"],
            "description": s["text"],
            "image": s["image"],
            "cover": f"/imagen/{s['cover']}" if s.get("cover") else s["image"],
            "url": f"/podcasts/{s['slug']}/",
            "rss": s["rss"],
            "link": s["link"],
            "episodes": [{
                "slug": e["slug"],
                "title": e["title"],
                "url": e["url"],
                "audio": e["audio"],
                "image": e["image"],
                "date": e["date"],
                "dateText": e["date_text"],
                "duration": e["duration"],
                "season": e["season"],
                "episode": e["episode"],
                "spotify": e["link"],
                "text": e["text"],
            } for e in s["episodes"]],
        } for s in shows],
    }
    (OUT / "podcasts.js").write_text(
        "// generado por _scripts/build_podcasts.py; no editar a mano\n"
        "window.PODCASTS = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n",
        encoding="utf-8")


def main() -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    OUT.mkdir(exist_ok=True)
    IMGDIR.mkdir(parents=True, exist_ok=True)

    for d in OUT.iterdir():
        if d.is_dir():
            shutil.rmtree(d)

    shows = []
    for url in FEEDS:
        print(f"RSS {url}")
        show = parse_feed(url)
        show["cover"] = download_cover(show)
        shows.append(show)
        print(f"  {show['title']}: {len(show['episodes'])} episodios")

    write_index(shows)
    write_config(shows)
    for s in shows:
        write_show(s)
        eps = s["episodes"]
        for i, e in enumerate(eps):
            write_episode(s, e,
                          prev_ep=eps[i + 1] if i + 1 < len(eps) else None,
                          next_ep=eps[i - 1] if i > 0 else None)

    covers = [IMGDIR / Path(s["cover"]).name for s in shows if s.get("cover")]
    build_mosaic(covers)
    print(f"Listo: {len(shows)} programas, "
          f"{sum(len(s['episodes']) for s in shows)} episodios")


if __name__ == "__main__":
    main()
