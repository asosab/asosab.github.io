# MEJORAS — Somos 10⁷

## FRONTEND

Recomendaciones de diseño para la landing page. Pendientes de implementar.

### Hero — más dramatismo y profundidad

- Gradiente animado en `hero-bg` con `background-position` en movimiento lento.
- Partículas/estrellas tenues con canvas o pseudo-elementos CSS (el concepto "10⁷" evoca inmensidad, el cielo nocturno lo refuerza).
- Hero-title en `Playfair Display 900` con `letter-spacing: -0.02em` y text-shadow sutil con el color rojo.

### Season tabs — pobres vs el resto

- Tabs tipo línea/subrayado (como una revista) con pseudo-elemento que se desplace via `translateX`.
- O tarjetas apilables que se expandan al seleccionarse con cambio de escala y sombra.

### Episode cards — falta diferenciación visual

- Alternar layout: cards pares thumbnail a la izquierda, impares a la derecha en desktop.
- Número de episodio como elemento decorativo grande semi-transparente al fondo de la card (estilo editorial).
- Potenciar hover con box-shadow más dramático y glow amarillo en el borde.

### Entrevistas — romper la grilla simétrica

- Feature card: primera entrevista con ancho doble o layout distinto (foto más grande, texto superpuesto).
- Origen como timeline visual con flecha estilizada entre ciudades (ej: "Caracas → Santa Cruz, 2018").

### Equipo — fotos con más presencia

- Círculos o formas irregulares con `clip-path` en vez de rectángulos 4/3.
- Overlay con nombre + rol en hover (blur background), eliminando texto separado abajo.
- Lightbox al hacer clic en la foto si hay imágenes de calidad.

### Micro-interacciones que faltan

- Nav con auto-hide: ocultar al hacer scroll down, mostrar al hacer scroll up.
- Reemplazar emojis en `.podcast-link` por iconos SVG (consistencia visual).
- Scrollbar thumb con gradiente sutil entre amarillo y rojo.

### Páginas Blancas — formulario más integrado

- Mock visual del formulario (vista previa decorativa, íconos ilustrativos).
- Carrusel simple de citas/testimonios de personas registradas.

### Paleta de color — más contraste

- Usar el verde (`#2E7D52`) activamente (badges "nuevo", CTAs secundarios).
- Gradiente de acento en separaciones entre secciones (actualmente solo `rgba(255,255,255,0.025)`).

### Prioridad sugerida

1. Hero con profundidad
2. Season tabs mejorados
3. Feature card en entrevistas
4. Nav con auto-hide
5. Emojis → SVG en podcast links
