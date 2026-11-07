/* Buscador de episodios. Lee window.PODCASTS (podcasts.js). */
(function () {
  "use strict";
  var data = window.PODCASTS;
  if (!data || !data.shows) return;

  function norm(s) {
    return (s || "").toLowerCase().normalize("NFD")
      .replace(/[̀-ͯ]/g, "");
  }

  var eps = [];
  data.shows.forEach(function (show) {
    show.episodes.forEach(function (ep) {
      eps.push({
        show: show.title,
        title: ep.title,
        url: ep.url,
        date: ep.dateText,
        text: ep.text,
        hay: norm(ep.title + " " + show.title + " " + ep.text)
      });
    });
  });

  function snippet(text, q) {
    var i = norm(text).indexOf(q);
    if (i < 0) return "";
    var from = Math.max(0, i - 60);
    var s = text.slice(from, i + q.length + 90);
    return (from > 0 ? "…" : "") + s + (i + q.length + 90 < text.length ? "…" : "");
  }

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  document.querySelectorAll(".pod-buscar").forEach(function (box) {
    var input = box.querySelector(".pod-search-input");
    var out = box.querySelector(".pod-search-results");
    var timer;

    input.addEventListener("input", function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        var q = norm(input.value.trim());
        if (q.length < 3) { out.hidden = true; out.innerHTML = ""; return; }
        var hits = eps.filter(function (e) { return e.hay.indexOf(q) >= 0; })
                      .slice(0, 12);
        if (!hits.length) {
          out.innerHTML = '<div class="pod-search-empty">Sin resultados para «' +
            esc(input.value.trim()) + '».</div>';
        } else {
          out.innerHTML = hits.map(function (e) {
            return '<a href="' + e.url + '">' +
              '<span class="r-title">' + esc(e.title) + "</span>" +
              '<span class="r-meta">' + esc(e.show) + " · " + esc(e.date) + "</span>" +
              '<span class="r-snip">' + esc(snippet(e.text, q)) + "</span>" +
              "</a>";
          }).join("");
        }
        out.hidden = false;
      }, 150);
    });
  });
})();
