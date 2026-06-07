// --- NAV MOBILE TOGGLE ---
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// --- SEASON TABS ---
function showSeason(id, btn) {
  document.querySelectorAll('.season-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.season-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
}

// --- SCROLL FADE-IN ---
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

// --- ACTIVE NAV LINK ON SCROLL ---
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const scrollSpy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + entry.target.id
          ? 'var(--amarillo)'
          : 'rgba(250,245,233,0.7)';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => scrollSpy.observe(s));

// --- ANILLOS ORBITALES ---
function renderizarAnillos(n) {
  const wrap = document.querySelector('.hero-logo-wrap');
  if (!wrap) return;

  wrap.querySelectorAll('.orbital-tilt, .usuarios-activos-label').forEach(el => el.remove());

  const total = Math.max(1, n);
  const baseW = 320;
  const baseH = 190;
  const step  = 44;
  const baseDuration = 18;
  const tilts = [0, 12, -8, 18, -15];

  for (let i = 0; i < total; i++) {
    const rx       = (baseW + i * step) / 2;
    const ry       = (baseH + i * (step * 0.55)) / 2;
    const w        = rx * 2;
    const h        = ry * 2;
    const duration = baseDuration + i * 7;
    const angle    = tilts[i % tilts.length];
    const dotSize  = Math.max(4, 8 - i);
    const keyName  = `orbitDot_${i}`;

    const tilt = document.createElement('div');
    tilt.className = 'orbital-tilt';
    tilt.style.cssText = `
      position: absolute;
      width: ${w}px;
      height: ${h}px;
      top: 50%;
      left: 50%;
      margin-top: -${ry}px;
      margin-left: -${rx}px;
      transform: rotate(${angle}deg);
      pointer-events: none;
    `;

    injectOrbitKeyframes(keyName, rx, ry);

    const dotWrap = document.createElement('div');
    dotWrap.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      animation: ${keyName} ${duration}s linear infinite;
      transform-origin: 0 0;
    `;

    const dot = document.createElement('div');
    dot.className = 'orbital-dot';
    dot.style.cssText = `
      position: absolute;
      width: ${dotSize}px;
      height: ${dotSize}px;
      border-radius: 50%;
      background: var(--amarillo);
      box-shadow: 0 0 ${6 + i * 2}px rgba(244,180,0,${0.9 - i * 0.1});
      transform: translate(-50%, -50%);
    `;

    dotWrap.appendChild(dot);
    tilt.appendChild(dotWrap);
    wrap.appendChild(tilt);
  }

  const label = document.createElement('div');
  label.className = 'usuarios-activos-label';
  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSc1d0TOZk0pNWtV65ZrGza3MuGPeOdBg5xEPiCC1RvJ5RDdEA/viewform';
  if (total === 1) {
    label.innerHTML = `No estás solo. <a href="${formUrl}" target="_blank" rel="noopener" class="orbital-label-link">Conecta con más venezolanos a tu alrededor</a>`;
  } else {
    label.innerHTML = `${total} personas como tú están aquí en este momento. Conócelas, o <a href="${formUrl}" target="_blank" rel="noopener" class="orbital-label-link">hazte conocer</a>`;
  }
  wrap.appendChild(label);
}

function injectOrbitKeyframes(name, rx, ry) {
  if (document.getElementById('orbital-kf-' + name)) return;
  const style = document.createElement('style');
  style.id = 'orbital-kf-' + name;
  let steps = '';
  const N = 72;
  for (let k = 0; k <= N; k++) {
    const theta = (k / N) * 2 * Math.PI;
    const x = rx * Math.cos(theta);
    const y = ry * Math.sin(theta);
    const pct = ((k / N) * 100).toFixed(2);
    steps += `${pct}% { transform: translate(${x.toFixed(2)}px, ${y.toFixed(2)}px); } `;
  }
  style.textContent = `@keyframes ${name} { ${steps} }`;
  document.head.appendChild(style);
}

// --- ENTREVISTAS DINÁMICAS ---
const FORMULARIO_HISTORIA = 'https://docs.google.com/forms/d/e/1FAIpQLSc1d0TOZk0pNWtV65ZrGza3MuGPeOdBg5xEPiCC1RvJ5RDdEA/viewform?usp=pp_url&entry.1972386230=%2B591&entry.1368310175=Si&entry.1504919473=%C2%A1Si!';

function crearCard(entry) {
  const pipeIdx = entry.descripcion.indexOf(' | ');
  const origen = pipeIdx !== -1 ? entry.descripcion.substring(0, pipeIdx) : '';
  const desc = pipeIdx !== -1 ? entry.descripcion.substring(pipeIdx + 3) : entry.descripcion;

  return `
    <div class="entrevista-card fade-up">
      <a href="${entry.url}" target="_blank" rel="noopener">
        <div class="entrevista-video">
          <img src="https://img.youtube.com/vi/${entry.videoId}/mqdefault.jpg" alt="${entry.titulo}" loading="lazy" />
          <div class="entrevista-video-overlay">
            <div class="play-icon"><svg width="18" height="18" viewBox="0 0 18 18"><polygon points="5,3 15,9 5,15" fill="white"/></svg></div>
          </div>
        </div>
        <div class="entrevista-body">
          <div class="entrevista-nombre">${entry.titulo}</div>
          <div class="entrevista-origen">${origen}</div>
          <p class="entrevista-desc">${desc}</p>
          <p class="entrevista-historia">¿Te gustaría contarnos tu historia? Contáctanos <a href="${FORMULARIO_HISTORIA}" target="_blank" rel="noopener" class="entrevista-historia-link">aquí</a></p>
          <div class="entrevista-links">
            <a href="${entry.url}" target="_blank" rel="noopener" class="btn btn-rojo" style="font-size:0.72rem; padding:9px 18px;">▶ Ver entrevista</a>
          </div>
        </div>
      </a>
    </div>`;
}

async function renderizarEntrevistas() {
  try {
    const res = await fetch('js/videosData.json');
    const data = await res.json();
    const grid = document.getElementById('entrevistasGrid');
    if (!grid) return;

    const filtradas = [
      ...data.videos.filter(v => v.playlists && v.playlists.some(p => p.titulo === '20 preguntas')),
      ...data.colaboraciones.filter(c => c.playlists && c.playlists.some(p => p.titulo === '20 preguntas'))
    ];

    filtradas.sort((a, b) => new Date(b.publicado) - new Date(a.publicado));

    grid.innerHTML = filtradas.map(crearCard).join('');

    grid.querySelectorAll('.fade-up').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('visible');
      } else {
        observer.observe(el);
      }
    });
  } catch (e) {
    console.error('[entrevistas] Error al cargar', e);
  }
}

renderizarEntrevistas();
