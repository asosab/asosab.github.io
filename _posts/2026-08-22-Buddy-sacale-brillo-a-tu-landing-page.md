---
layout: post
title:  "Buddy: Sácale brillo a tu landing page"
date:   2026-08-22 00:00
categories: ingenieria
comments: true
description: "Cómo un minijuego de arquería pensado gancho al call to action de un sitio web terminó convertido en Buddy: un motor modular que le suma a cualquier sitio estático login sin contraseña compartido entre sitios, mensajería contextual con datos reales y medición de conversión, todo instalable con una sola línea de script."
image: /imagen/post/buddy_arbat.png
tags: [arquitectura de software, javascript, autenticación sin contraseña, engagement, sitios estáticos, producto]
published: true
---

# De un minijuego para enganchar visitas a motor con superpoderes para sitios estáticos

*Cómo un arquero de dibujos animados terminó resolviendo autenticación, engagement y analítica para cualquier página HTML*

---

Todo empezó (como siempre) con una idea. [arbat](https://arbatarchery.com) es una escuela de tiro con arco en Santa Cruz de la Sierra donde practico ese fantástico deporte desde el año pasado, y su sitio es una landing estática que creé con Jekyll, sin backend propio ni dependencias, rápida de cargar y fácil de mantener. Aunque puedes monitorizar el uso del sitio con Google siempre hace falta tener control sobre cuántas personas usan el link de WhatsApp para reservar clases, fidelizar a través de cuentas de usuario con más privilegios que viajeros anónimos y finalmente poder darle un servicio especial a los clientes de la página, en este caso los estudiantes y los propios entrenadores.

La chispa inicial fue la creación de un personaje al estilo animé de estudios Gibli —Raulito, el instructor— parado en la esquina de la pantalla, y dejar que el visitante pudiera hacer clic sobre él, arrastrar el puntero y soltarlo para disparar una flecha contra el logo de la escuela, que hacía las veces de diana. Con el objetivo de hacer algo diferente, entretener a los visitantes y hacerles pasar el tiempo suficiente en cualquier página como para que leyera muchas veces el botón para agendar una clase, sembrando la idea en quien nunca lo ha intentado ¿... Y si vivo la experiencia? Nada de frameworks, nada de build step: un script, un personaje, un juego de patio de recreo metido en una landing page y ¡Mi primer juego javascript publicado!

Ese experimento hoy vive dentro de [arbat](https://arbatarchery.com) y lo interesante no es el juego en sí —aunque el juego ya está ahí, funcionando— sino la decisión de arquitectura que tomé para construirlo, y que terminó convirtiendo una herramienta del call to action en una pieza de infraestructura reutilizable.

## El juego que no se quedó quieto

![Raulito, el instructor de arbat, en su pose serena](/imagen/post/sereno.png)

La mecánica es simple de describir: el visitante hace clic sobre Raulito y, sin soltar, desliza el puntero para tensar el arco; al soltar, la flecha sale disparada hacia la diana. Cada acierto se puntúa contra un sistema de anillos concéntricos (10 puntos en el centro, bajando hasta 0 más allá del borde), con sonido de tensado, disparo e impacto, y un top 10 de puntajes que se guarda contra un backend propio.

Lo que hace que esto valga la pena contarlo no es el juego. Es que, en vez de escribirlo como un script cerrado y autosuficiente —que es lo que cualquiera haría para una landing con un minijuego— lo construí con una separación de responsabilidades que dejó la puerta abierta a todo lo que vino después.

## La decisión que lo cambió todo: separar el "quién" del "qué hace"

`buddy.js` es, en el fondo, un cargador. No sabe dibujar un arco ni mandar un magic link por correo: sabe leer una configuración, decidir qué personaje activar y qué módulos cargar, y resolver assets con un orden de precedencia claro. El propio script se autolocaliza a partir de su propia URL —así puede instalarse en cualquier subcarpeta o dominio sin tocar una línea de código— y arranca con una promesa de "listo" (`window.Buddy.readyPromise`) que cualquier otro script de la página puede esperar.

La pieza clave es el concepto de **personaje**. Raulito no es una imagen con un `alt`: es un objeto de datos.

```js
window.BuddyChars.raulito = {
  perfil: { id: 'raulito', nombre: 'Raulito', idioma: 'es', estilo: 'zen' },
  expresiones: {
    sereno:    { archivo: 'sereno.png',    anclas: { cabeza_superior, ojo_izquierdo, ojo_derecho, cintura, pie_izquierdo, pie_derecho } },
    sonriendo: { archivo: 'sonriendo.png', anclas: { /* mismas anclas, otra pose */ } },
    guinio:    { archivo: 'guinio.png',    anclas: { /* ídem */ } }
  },
  diccionarioExpresiones: {
    neutral: 'sereno', positivo: 'sonriendo', complice: 'guinio', negativo: 'sereno'
  },
  overridesPorModulo: { archery: { images: { apuntar: {...}, liberar_flecha: {...}, diana: {...} } } }
};
```

![Raulito apuntando, con overrides de pose propios del módulo archery](/imagen/post/apuntar.png)

Cada expresión trae un mapa de **anclas**: coordenadas exactas de dónde están la cabeza, los ojos, la cintura y los pies en ese PNG específico. Eso significa que cualquier módulo —el juego de arquería, un asesor inmobiliario o un futuro asistente de otro rubro— puede posicionar elementos sobre el personaje (un sombrero, una flecha, un puntero) sin saber nada de diseño gráfico ni de la pose exacta del dibujo. El módulo pide "dónde está la cintura" y el personaje responde, sin importar si está de frente, sonriendo o de espaldas apuntando con un arco.

Encima de eso vive un sistema de resolución de assets con precedencia clara: **personaje → módulo → nada** (con un fallback obligatorio garantizado, la expresión `sereno`, para que nunca haya una imagen rota). Un personaje puede pisar el asset por defecto de un módulo, o dejar que el módulo use el suyo. Es, básicamente, un sistema de *theming* para personajes ilustrados.

Esa capa de indirección —personaje como datos, módulos como comportamiento, config como interruptor— es la base de la programación y es lo que permite que Buddy pueda crecer mágicamente en cualquier dirección.

## El mismo motor, un personaje distinto

Con esa arquitectura, cambiar de negocio no significa reescribir el sistema: significa escribir un nuevo archivo de personaje (con sus propias poses y anclas) y un nuevo set de módulos con su propio copy. El motor que hoy hace que Raulito lance flechas y de consejos sobre arco y flecha, estructuralmente, el mismo motor que podría poner a un agente inmobiliario a mostrarte opciones de compra para tu casa ideal, o a un asesor guiando un checkout. Cambia el disfraz y el guion; no cambia el sistema nervioso.

Y ahí es donde el proyecto pasa de ser un juego de retención y redirección a la acción deseada a convertirse en **Buddy**: un paquete con superpoderes que se le puede inyectar a cualquier página HTML estática con una sola línea.

```html
<script src="buddy.js?v=20" defer></script>
```

Eso es literalmente todo lo que hace falta. Sin build step, sin npm install, sin tocar el resto del sitio. `buddy.js` se encarga de cargar su propia configuración, elegir el personaje, activar los módulos habilitados y quedar escuchando eventos del DOM. Cualquier sitio estático —un Jekyll, un Hugo, un HTML a mano— gana un personaje interactivo con una sola etiqueta `<script>`.

## El superpoder que no se ve: identidad sin contraseña, compartida entre sitios

Acá está la parte que más me interesa contar, porque es la que convierte a Buddy de "un widget simpático" en infraestructura de verdad: el módulo `auth`.

Buddy no pide contraseñas pero te ayuda a identificar a tus usuarios. El flujo es el clásico *magic link*: el visitante escribe su correo, recibe un enlace, hace clic y el servidor responde con un par de tokens JWT —un `accessToken` de vida corta y un `refreshToken` de vida larga, con rotación y detección de reuso si un token robado se reutiliza—. Sin cookies, sin `SameSite`, todo vía cabecera `Authorization: Bearer`.

Lo importante no es el patrón de auth en sí —magic link con JWT es un camino conocido— sino *dónde* vive el servicio: un backend centralizado (`api.statetty.com`) que cada sitio consume identificándose con su propio `appID`. arbat, hoy, se identifica como `arbat`. Cualquier otro sitio que instale Buddy se identifica con el suyo. Eso significa que el sistema de login no está atado a un dominio: es una capa de identidad que varios sitios distintos pueden compartir, cada uno con su propia app, todos reconociendo al mismo usuario si decide autenticarse en más de uno. Es la diferencia entre "cada sitio tiene su login" y "existe una red de sitios que hablan el mismo idioma de identidad".

## Un personaje que sabe cuándo hablar (y de qué)

El módulo `says` es el que le da vida al personaje entre disparo y disparo. Es un motor de mensajes con varias fuentes, cada una con su propia política de repetición y frecuencia —cuántas veces por día puede aparecer un mensaje, cada cuántos minutos como mínimo—. Hay mensajes de bienvenida, consejos de técnica, curiosidades sobre arquería... y una fuente que es transversalmente la más valiosa de todas: `agenda.js`.

En lugar de inventar una urgencia falsa ("¡quedan pocos cupos!" tipeado a mano y nunca actualizado), este módulo consulta en vivo la agenda pública de Google Calendar de la escuela y genera mensajes reales a partir de la disponibilidad real:

> *"Aún quedan espacios disponibles para el entrenamiento de esta tarde, recuerda reservar con tiempo"*

Si no hay API key configurada, o si el calendario no responde, el módulo simplemente no genera ese mensaje —no rompe la página y, sobre todo, no miente sobre disponibilidad que no puede confirmar—. Es urgencia con datos detrás, no un contador de cuenta regresiva de attrezzo. Y todo el sistema respeta además un estado de "ocupado" del visitante: si la pestaña perdió el foco o no está visible, Buddy no interrumpe.

## Medir el resultado, no solo generar el estímulo

Ningún sistema de engagement vale mucho si no se puede medir. Buddy trae dos piezas para eso: un módulo de `telemetry` que centraliza todas las llamadas a la API (para que ningún módulo tenga que hacer `fetch()` por su cuenta hacia su propio endpoint), y un `wa_listener` que escucha, en todo el documento, cualquier clic sobre un enlace `wa.me` —el call to action favorito de casi cualquier negocio local en Bolivia— y lo reporta como evento. El resultado: cada sitio que instala Buddy sabe, sin instrumentación adicional, cuántas personas llegaron hasta el punto de escribir por WhatsApp.

## Lo que queda: un juego que se volvió plataforma

Nada de esto se planeó como una plataforma desde el día uno. Empezó como intención de enganchar público, hacer algo diferente y canalizar a la acción deseada. Pero la decisión temprana de separar **quién es el personaje** (datos, anclas, expresiones), **qué sabe hacer** (módulos independientes y configurables) y **cómo se activa cada cosa** (config por módulo, sin tocar código) es la que permite que cada día agregue capas que no tienen nada que ver con arquería: identidad compartida entre sitios, mensajería contextual basada en datos reales, y medición de conversión.

Instalar Buddy en un sitio estático nuevo es una línea de `<script>`. Lo que ese personaje termine haciendo —enseñar a tensar un arco, avisar que quedan cupos, o algún día vender una casa— es, literalmente, cuestión de configuración.

Visita a Raulito en el sitio web de la [escuela arbat de arco y flecha](https://arbatarchery.com), de paso intenta entrar al ranking del mejor arquero digital
