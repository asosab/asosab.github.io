/**
 * youtube_videos.js
 * Obtiene todos los videos y playlists de un canal de YouTube usando la Data API v3
 * y guarda/actualiza videosData.json en la misma carpeta del script.
 *
 * USO:
 *   1. npm install node-fetch   (solo la primera vez)
 *   2. Configura API_KEY y CHANNEL_HANDLE abajo
 *   3. node youtube_videos.js
 *
 * OBTENER API KEY:
 *   https://console.cloud.google.com → Crear proyecto → APIs & Services
 *   → Habilitar "YouTube Data API v3" → Credenciales → Crear API Key
 */

import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ─── CONFIGURACIÓN ────────────────────────────────────────────────────────────
const API_KEY        = "AIzaSyCtqcltkPjeg7excELXTPbrwK2fnSXl25I";
const CHANNEL_HANDLE = "@somos10e7";
// ──────────────────────────────────────────────────────────────────────────────

const BASE        = "https://www.googleapis.com/youtube/v3";
const __dirname   = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, "videosData.json");

// ─── HELPERS ──────────────────────────────────────────────────────────────────

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`YouTube API error: ${err.error?.message || res.statusText}`);
  }
  return res.json();
}

/** Pagina una playlist completa y devuelve todos los items */
async function paginatePlaylist(playlistId) {
  const items = [];
  let pageToken = "";
  do {
    const url = `${BASE}/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=50&pageToken=${pageToken}&key=${API_KEY}`;
    const data = await fetchJSON(url);
    items.push(...data.items);
    pageToken = data.nextPageToken || "";
  } while (pageToken);
  return items;
}

// ─── PASO 1: Resolver handle → channelId ─────────────────────────────────────

async function getChannelInfo(handle) {
  const url = `${BASE}/channels?part=id,snippet,contentDetails&forHandle=${encodeURIComponent(handle)}&key=${API_KEY}`;
  const data = await fetchJSON(url);
  if (!data.items?.length) throw new Error(`Canal no encontrado: "${handle}"`);
  const ch = data.items[0];
  console.log(`✅ Canal: ${ch.snippet.title} (${ch.id})`);
  return {
    channelId:         ch.id,
    titulo:            ch.snippet.title,
    uploadsPlaylistId: ch.contentDetails.relatedPlaylists.uploads,
  };
}

// ─── PASO 2: Obtener todas las playlists públicas del canal ───────────────────

async function getPlaylists(channelId) {
  const playlists = [];
  let pageToken = "";
  do {
    const url = `${BASE}/playlists?part=id,snippet&channelId=${channelId}&maxResults=50&pageToken=${pageToken}&key=${API_KEY}`;
    const data = await fetchJSON(url);
    for (const pl of data.items) {
      playlists.push({
        playlistId: pl.id,
        titulo:     pl.snippet.title,
        descripcion: pl.snippet.description || "",
        publicado:  pl.snippet.publishedAt?.slice(0, 10) ?? "N/A",
        url:        `https://www.youtube.com/playlist?list=${pl.id}`,
        videoIds:   [], // se llenará después
      });
    }
    pageToken = data.nextPageToken || "";
  } while (pageToken);
  console.log(`📂 Playlists públicas encontradas: ${playlists.length}`);
  return playlists;
}

// ─── PASO 3: Obtener videoIds por playlist ────────────────────────────────────

async function enrichPlaylistsWithVideos(playlists) {
  for (const pl of playlists) {
    process.stdout.write(`  ⏳ Leyendo playlist "${pl.titulo}"...`);
    const items = await paginatePlaylist(pl.playlistId);
    pl.videoIds = items
      .map(i => i.snippet?.resourceId?.videoId)
      .filter(Boolean);
    console.log(` ${pl.videoIds.length} videos`);
  }
  return playlists;
}

// ─── PASO 4: Obtener todos los videos del canal (uploads) ────────────────────

async function getAllVideos(uploadsPlaylistId) {
  console.log("\n🎬 Obteniendo todos los videos del canal...");
  const items = await paginatePlaylist(uploadsPlaylistId);
  const videos = items.map(item => {
    const s = item.snippet;
    const videoId = s.resourceId?.videoId;
    return {
      videoId,
      titulo:      s.title,
      publicado:   s.publishedAt?.slice(0, 10) ?? "N/A",
      url:         `https://www.youtube.com/watch?v=${videoId}`,
      descripcion: s.description?.slice(0, 200).replace(/\n/g, " ") ?? "",
      playlists:   [], // se llenará después
    };
  });
  console.log(`✅ Total de videos: ${videos.length}`);
  return videos;
}

// ─── PASO 5: Cruzar videos ↔ playlists ───────────────────────────────────────

function crossReference(videos, playlists) {
  const videoMap = new Map(videos.map(v => [v.videoId, v]));

  for (const pl of playlists) {
    for (const vid of pl.videoIds) {
      if (videoMap.has(vid)) {
        videoMap.get(vid).playlists.push({
          playlistId: pl.playlistId,
          titulo:     pl.titulo,
          url:        pl.url,
        });
      }
    }
  }

  return videos;
}

// ─── PASO 6: Guardar / actualizar videosData.json ────────────────────────────

function saveData(channelInfo, videos, playlists) {
  // Si ya existe, preservar datos extra que el usuario haya añadido manualmente
  let existing = {};
  if (fs.existsSync(OUTPUT_PATH)) {
    try {
      existing = JSON.parse(fs.readFileSync(OUTPUT_PATH, "utf-8"));
      console.log("\n♻️  videosData.json existente encontrado — actualizando...");
    } catch {
      console.log("\n⚠️  videosData.json existente no pudo leerse — sobreescribiendo.");
    }
  }

  const data = {
    meta: {
      canal:         channelInfo.titulo,
      channelId:     channelInfo.channelId,
      handle:        CHANNEL_HANDLE,
      actualizadoEn: new Date().toISOString(),
      totalVideos:   videos.length,
      totalPlaylists: playlists.length,
    },
    playlists: playlists.map(({ videoIds, ...rest }) => rest), // sin el array de IDs raw
    videos,
    // preservar cualquier clave extra que el usuario haya puesto
    ...Object.fromEntries(
      Object.entries(existing).filter(([k]) => !["meta", "playlists", "videos"].includes(k))
    ),
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2), "utf-8");
  console.log(`\n💾 videosData.json guardado en: ${OUTPUT_PATH}`);
  return data;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n🎬 YouTube Channel Fetcher — SOMOS 10⁷\n" + "─".repeat(50));

  if (API_KEY === "PEGA_TU_API_KEY_AQUI") {
    console.error("❌ Configura tu API_KEY en el archivo antes de ejecutar.");
    process.exit(1);
  }

  try {
    // 1. Info del canal
    const channelInfo = await getChannelInfo(CHANNEL_HANDLE);

    // 2. Playlists públicas
    console.log("\n📋 Obteniendo playlists...");
    const playlists = await getPlaylists(channelInfo.channelId);

    // 3. Videos de cada playlist
    console.log("\n🔗 Leyendo contenido de cada playlist...");
    await enrichPlaylistsWithVideos(playlists);

    // 4. Todos los videos
    const videos = await getAllVideos(channelInfo.uploadsPlaylistId);

    // 5. Cruzar referencias
    crossReference(videos, playlists);

    // 6. Guardar
    const data = saveData(channelInfo, videos, playlists);

    // Resumen en consola
    console.log("\n" + "─".repeat(50));
    console.log(`📊 Resumen:`);
    console.log(`   Videos totales : ${data.meta.totalVideos}`);
    console.log(`   Playlists      : ${data.meta.totalPlaylists}`);
    const sinPlaylist = videos.filter(v => v.playlists.length === 0).length;
    console.log(`   Sin playlist   : ${sinPlaylist}`);
    console.log("─".repeat(50) + "\n");

  } catch (err) {
    console.error("\n❌ Error:", err.message);
    process.exit(1);
  }
}

main();
