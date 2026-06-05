---
layout: post
title: "La historia de tu vida, contada con IA"
date: 2026-06-04 03:00
categories: IA
comments: true
description: "Cómo usar inteligencia artificial para construir un archivo vivo de tu historia profesional, generar currículums inteligentes y hacer que los robots de reclutamiento también te lean bien."
tags: [inteligencia artificial, curriculum, json, notebooklm, adobe podcast, jekyll, ats, datos abiertos]
havecharts: false
published: true
image: mente_historia_ia.jpg
---

¿Cuántas cosas has hecho en tu vida profesional que ya no recuerdas?
¿En qué año fue ese proyecto? ¿Cuánto duró ese trabajo? ¿Qué aprendiste exactamente en aquella empresa?

<img src="/imagen/mente_historia_ia.jpg" alt="La IA como herramienta de procesos mentales" width="605">

A mí me pasa. Me olvido por completo de informes que entregué, de proyectos que lideré, o de analizar qué habilidades desarrollé ahí. Desde hace unos días comencé a construir algo que podría llamarse *el archivo vivo de mi vida profesional*, y la inteligencia artificial es la herramienta principal para hacerlo. Este artículo cuenta cómo lo hago, paso a paso, con todas las herramientas involucradas.

---

## ¿Por qué un currículum para uno mismo?

Un currículum tiene fama de ser ese documento que mandas cuando buscas trabajo y que luego olvidas en un cajón. Aquí propongo pensarlo diferente: un currículum completo es un archivo personal. Es para que tú sepas de dónde vienes, por dónde pasaste y qué acumulaste en el camino.

Con IA, ese archivo puede ser tan detallado que incluya no solo tus trabajos, sino también tus proyectos personales, tus estudios, tus intereses, los deportes que practicas, organizaciones en las que participaste. Todo lo que forma quién eres.

Pero hay algo que no esperaba cuando empecé: la IA abre la puerta a un autoconocimiento del que no era consciente. Al conectar todos los pasos de tu historia, le da relevancia a cosas que hoy quizás ves pequeñas pero que forman parte de cómo te has construido como persona y como profesional. Yo hoy puedo ver con claridad cuánto aprendí de proyectos que en su momento me dejaron enojado, frustrado o con la sensación de haber perdido el tiempo. La IA no juzga, no descarta y no olvida. Conecta los puntos y te muestra un camino que tú mismo recorriste sin darte cuenta de su coherencia.

---

## El JSON: el corazón del sistema

### ¿Por qué JSON?

JSON es un formato de datos estructurado, legible tanto para humanos como para máquinas. Parece técnico, pero la idea es sencilla: es como un formulario muy completo donde cada campo tiene su nombre y su valor. Una IA puede leerlo, entenderlo y usarlo para generar cualquier documento que necesites.

Lo elijo sobre un Word o un PDF porque es modular: puedo agregar, modificar o expandir una sección sin tocar el resto.

### ¿Cómo luce por dentro?

```json
{
  "persona": {
    "nombre": "Alejandro Sosa Bello",
    "linkedin": "https://linkedin.com/in/alejandrososa",
    "resumen": "Especialista en tecnología, datos y gestión pública..."
  },
  "experiencia": [
    {
      "empresa": "Statetty",
      "url": "https://statetty.com",
      "cargo": "Co-fundador",
      "desde": "2022",
      "hasta": "presente",
      "logros": [
        "Desarrollo del producto mínimo viable",
        "Gestión de negociación con aceleradoras"
      ]
    },
    {
      "empresa": "Alcaldía de Santa Cruz de la Sierra",
      "cargo": "Responsable de Línea Abierta Vecinal",
      "desde": "2021",
      "hasta": "2023",
      "logros": [
        "Creación del sistema de atención ciudadana digital",
        "Coordinación con múltiples áreas municipales"
      ]
    }
  ],
  "formacion": [],
  "habilidades": [],
  "otros": {}
}
```

### ¿Cómo se alimenta?

Cada vez que aparece una fuente nueva de información —un currículum viejo, un informe entregado en una empresa, un PDF guardado en Drive desde hace años— se lo pasas a la IA y le dices: *"Dado este archivo JSON que ya existe, agrega esta nueva información donde corresponda."*

El archivo crece con el tiempo. Nunca va a estar completamente terminado, y eso está bien.

### El problema de los tokens y cómo resolverlo

Las IAs tienen un límite de cuánto texto pueden procesar en una sola conversación. Cuando el JSON se vuelve muy grande, la solución es trabajar de forma **modular**: en lugar de cargar todo el archivo, abres solo el objeto que quieres trabajar en ese momento. Por ejemplo, te concentras solo en la sección de una empresa, la completas, la guardas, y pasas a la siguiente.

Si aun así se te agotan los tokens, puedes abrir otra cuenta de Google y empezar una sesión nueva. No es trampa, es gestión de recursos.

---

## ¿Qué puedes hacer con el JSON?

### Currículums orientados, no genéricos

Un currículum genérico es el que funciona para nadie en particular. El que funciona es el que habla exactamente el idioma de quien lo va a leer.

Con el JSON completo, le pides a la IA: *"Genera un currículum orientado a empresas de tecnología cívica"* o *"Genera un resumen para presentarme ante una aceleradora de startups"*. El resultado es un documento que selecciona y jerarquiza tu información según ese objetivo.

Puedes ver dos ejemplos concretos de currículums generados de esta manera:

- [CV general técnico][cv_general]
- [CV orientado a aceleradoras][cv_aceleradora]

### Ofertas de servicio

El mismo archivo sirve para crear propuestas comerciales. Le describes el proyecto, le adjuntas el JSON y le pides un informe ejecutivo. En mi caso, generé tanto un documento PDF profesional como una landing page completa para presentar la Línea Abierta Vecinal como servicio replicable.

### Bio para podcasts, landing pages o perfiles

En lugar de escribir sobre ti mismo desde cero, le pides al proyecto que ya tiene tu JSON que te genere un párrafo de presentación orientado al contexto específico. Para un podcast, para un perfil de inversor, para una página de equipo.

### Un bot en WhatsApp que sabe todo de ti

Puedes conectar el JSON como contexto de un bot conversacional vinculado a tu número de WhatsApp. Alguien que quiera contratarte puede preguntarle al bot y recibir respuestas basadas en tu historia real. Incluso tú mismo puedes preguntarle: *"¿En qué año trabajé en tal empresa?"* o *"¿Qué habilidades desarrollé en tal proyecto?"*

---

## Que los robots también te lean bien: currículums aptos para ATS

Muchas empresas grandes usan sistemas automatizados llamados **ATS** (Applicant Tracking Systems) para leer currículums antes de que lo haga cualquier persona. Estos sistemas extraen datos del PDF y los cargan en una base de datos. Si tu CV no está preparado para esto, puede que llegue invisible aunque sea excelente.

Estas son las reglas para un currículum que los bots leen perfectamente:

**Texto seleccionable, siempre.** El PDF debe generarse desde texto, nunca desde una imagen escaneada. Si escaneas tu CV y lo guardas como PDF, un ATS no puede leer nada.

**Sin columnas ni tablas complejas.** Los ATS leen de izquierda a derecha y de arriba a abajo, en una sola columna. Los diseños en dos columnas mezclan información de forma impredecible para la máquina.

**Fuentes estándar.** Arial, Calibri, Times New Roman, Georgia. Las fuentes decorativas o personalizadas pueden no renderizarse correctamente en todos los sistemas.

**Títulos de sección predecibles.** Los ATS buscan palabras clave como "Experiencia", "Educación", "Habilidades". Títulos creativos como "Mi camino" o "Lo que sé hacer" pueden confundirlos.

**Palabras clave del sector.** Los ATS filtran por términos específicos del área. Si la oferta de trabajo menciona "gestión de proyectos ágiles", tu CV debería usar esa misma terminología, con naturalidad.

**Fechas en formato claro.** Mes y año, de forma consistente. "Enero 2021 – Marzo 2023" es mejor que "principios de 2021".

**Sin encabezados ni pies de página con información clave.** Algunos ATS no leen el contenido de los encabezados. Tu nombre y contacto deben estar también en el cuerpo del documento.

**Sin logos ni imágenes decorativas.** Ocupan espacio y los bots los ignoran.

La buena noticia: si generas el CV a partir del JSON con una IA y le pides explícitamente que lo haga compatible con ATS, va a respetar todas estas reglas por defecto.

---

## NotebookLM: tu CV convertido en podcast

[NotebookLM](https://notebooklm.google.com) es una IA de Google orientada al estudio de documentos. Lo que la hace especial es que responde basándose exclusivamente en los archivos que tú le subes, sin mezclar información externa. Puedes subirle PDFs, audios, videos, documentos de texto.

Uno de sus usos más llamativos es generar un **audio en formato podcast**, donde dos comentaristas ficticios analizan el documento que les subiste. El resultado, cuando el documento es tu propio JSON con toda tu trayectoria, es algo genuinamente emocionante: escuchas a dos personas hablar de la coherencia de tu carrera, de las conexiones entre proyectos que quizás tú mismo no habías notado.

Puedes escuchar el podcast generado a partir de mi propio archivo de datos aquí:

🎧 [Escuchar: Una mirada con IA a la trayectoria de Alejandro Sosa Briceño][audio_cv]

Si alguna vez sientes que no has hecho nada importante, escúchate así. Funciona.

---

## Buenas prácticas para trabajar con IA

Algunas cosas que aprendí a base de repetición:

**Pídele preguntas antes de que actúe.** Antes de pedirle a la IA que genere algo, pídele que analice la información, que haga preguntas, que proponga mejoras. Eso garantiza que los dos están en la misma página.

**Pídele que te explique la tarea antes de ejecutarla.** Es una forma de verificar que te explicaste bien. Si la IA describe mal la tarea, el problema está en el prompt, no en la IA.

**Trabaja en módulos.** Cualquier proyecto puede descomponerse en partes más pequeñas. Desarrolla cada parte por separado y asegúrate de que quede bien antes de pasar a la siguiente.

**Guarda resúmenes, borra conversaciones.** Antes de cerrar un chat, pídele a la IA que genere un resumen de lo trabajado, las decisiones tomadas y los próximos pasos. Guarda ese resumen. Borra la conversación. Los chats largos hacen que la IA pierda el hilo; los resúmenes te permiten retomar sin perder nada.

**Documentos vivos para IA de escritorio.** Si usas una IA que puede modificar archivos en tu computador, mantén documentos actualizados que ella pueda leer al empezar cada sesión: qué estás buscando, qué se ha hecho, qué falta, qué errores aparecieron y cómo se resolvieron. Eso reduce drásticamente las alucinaciones y los desvíos.

---

## Tu turno

Todo lo descrito aquí es accesible. No requiere conocimientos de programación. Requiere curiosidad, paciencia y un celular con micrófono.

El primer paso es el más sencillo: graba un audio de diez minutos contando tu historia profesional. Desde el primer trabajo hasta hoy. Sin estructura, sin guion. Solo cuéntalo como si le hablaras a un amigo.

De ahí en adelante, la IA te ayuda a organizarlo.

Si quieres ver el resultado de este proceso aplicado a una trayectoria real, acá puedes explorar:

- [LinkedIn de Alejandro Sosa Briceño][linkedin]
- [Currículum general][cv_general]
- [Currículum orientado a aceleradoras][cv_aceleradora]
- [Archivo de datos JSON][json_cv]
- [🎧 Podcast generado por IA sobre mi trayectoria][audio_cv]

---

*¿Tienes preguntas sobre algún paso del proceso? ¿Ya probaste algo parecido? Deja un comentario más abajo.*

---

## Tip al margen: cómo se escribió este artículo

Este artículo no se escribió sentado frente a un teclado. Es el resultado de un flujo de trabajo que usa exactamente las mismas herramientas que describe.

<img class="ri" alt="Diagrama del flujo de trabajo: del audio al post con IA" src="{{ '/imagen/del_audio_al_md.jpg' | prepend: site.url }}" width="605">

El recorrido fue este: grabé un audio con el celular mientras caminaba por la ciudad, con ruido de tráfico y conversaciones de fondo incluidas. Lo limpié con [Adobe Podcast](https://podcast.adobe.com), que usa IA para separar la voz del ruido ambiente y reconstruir el canal de audio principal. El resultado lo subí a [NotebookLM](https://notebooklm.google.com), que es la única IA gratuita que acepta audios de cualquier duración y genera una transcripción completa. Con esa transcripción como base, le pedí a Claude que organizara el contenido en una entrada para este blog, respetando la estructura y el estilo del sitio.

El audio original, el texto sucio, la transcripción y el prompt viajaron por cinco herramientas distintas antes de convertirse en lo que leíste. Todo sin escribir una sola palabra desde cero y en escasos 30 minutos

[linkedin]: https://linkedin.com/in/alejandrososa
[cv_general]: assets/docs/CV_ASB.pdf
[cv_aceleradora]: assets//docs/CV_asb_aceleradora.pdf
[json_cv]: assets/docs/asb.json
[audio_cv]: assets/audio/asb_una_mirada_con_ia.mp3
