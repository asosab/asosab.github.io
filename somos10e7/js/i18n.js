(function () {
  // ── Configuración ──────────────────────────────────────────
  const DEFAULT_LOCALE = 'es_VE';
  const AVAILABLE_LOCALES = ['es_VE', 'es_BO'];

  // ── Helpers ────────────────────────────────────────────────
  function getLocale() {
    const stored = localStorage.getItem('locale');
    return (stored && AVAILABLE_LOCALES.includes(stored)) ? stored : DEFAULT_LOCALE;
  }

  function applyDict(dict) {
    // Texto interior (innerHTML para permitir tags como <em>, <span>)
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });

    // Atributos: data-i18n-attr="attr1:key1 attr2:key2"
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const pairs = el.getAttribute('data-i18n-attr').split(' ');
      pairs.forEach(pair => {
        const [attr, key] = pair.split(':');
        if (dict[key] !== undefined) el.setAttribute(attr, dict[key]);
      });
    });

    // Actualizar <html lang>
    const locale = dict['_meta'] && dict['_meta']['locale']
      ? dict['_meta']['locale'].replace('_', '-').toLowerCase()
      : 'es';
    document.documentElement.lang = locale;
  }

  // ── Carga no bloqueante ────────────────────────────────────
  function loadLocale(locale) {
    const base = 'https://asosab.github.io/somos10e7/';
    const url = base + locale + '.txt';
    const doApply = (dict) => {
      window._i18nDict = dict;
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => applyDict(dict));
      } else {
        applyDict(dict);
      }
    };

    fetch(url)
      .then(r => r.ok ? r.json() : Promise.reject('HTTP ' + r.status))
      .then(doApply)
      .catch(err => console.warn('[i18n] No se pudo cargar', url, err));
  }

  // ── API pública ────────────────────────────────────────────
  window.i18n = {
    /** Cambia el idioma en tiempo real y lo persiste */
    setLocale: function (locale) {
      if (!AVAILABLE_LOCALES.includes(locale)) return;
      localStorage.setItem('locale', locale);
      loadLocale(locale);
    },
    getLocale,
    availableLocales: AVAILABLE_LOCALES
  };

  // ── Arranque ───────────────────────────────────────────────
  loadLocale(getLocale());
})();
