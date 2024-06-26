---
layout: post
title:  "Identificando a tus clientes con inteligencia artificial"
date:   2024-04-28 16:43
categories: IA
comments: true
description: "Prompts para la construcción de un buyer persona y su respectivo mapa de empatía"
tags: [prompt, ChatGPT, negocios, marketing, IA, mapa de empatía]
havecharts: false
published: true
image: ia-machine-learning-1024x537.jpg
---


## Creación de un Buyer persona y mapa de empatía
Participando en la [Incubadora Con Valores][incubadoraconvalores] una de las tareas de creación de tu emprendimiento es la parametrización de tu cliente ideal, por lo que en cierto punto me han pedido definir un mapa de empatía de este perfil. Mi emprendimiento está orientado al mercado inmobiliario por lo que recurrí a mi agente inmobiliario estrella [Siria Useche][siria.remax] para entrevistarla. cuando terminé de levantar un mapa de empatía decidí crear un formulario con los seis puntos del mapa de empatía para entrevistar a otros agentes inmobiliarios y ya me veía (o me veo, aún) de oficina en oficina conversando con un montón de gente, registrando cosas como cuáles son sus frustaciones, problemas, obstáculos o cuáles son sus deseos y necesidades. Ese puede ser un proceso largo y cíclico pero esta tarea la quiero entregar hoy, por lo que recurriré a Chat GPT para que me termine de redondear la información que me dió Siria.

## Prompts y ChatGPT
La forma en que uno se comunica y hace preguntas a una IA como chatGPT se le llama Prompt, encontré un ejemplo de prompt para crear un buyer persona en la página de [Sebastian Pendino][sebastianpendino] y le hice un par de modificaciones, como definir las variables fuera de la instrucción y un tercer prompt específico sobre el mapa de empatía

1) Describe tu negocio, tu propuesta de valor y ubicación de tu mercado, luego observa las empresas que ofertan de forma similar, posible competencia:
{% gist 1c99718438796c2a8717d36b36a38687 %}

2) Crea posibles buyer-persona y perfila tu público objetivo:
{% gist fd1c51b7162b77235150d85af20cddda %}

3) Realiza un mapa de empatía:
{% gist e179ba4cc968b2bbec1060a8ba8dd1fd %}

4) Conclusiones y mejoras a la oferta de valor
{% gist f8f6085534c17aba9026ba27f1e72904 %}


Pueden experimentar estos prompts por ustedes mismos en IA's como [chatGPT][chatgpt], [Gemini][gemini] o [you.com][youcom] en caso de que estés en Venezuela. También puedes ver el proceso y resultado que obtuve en [este link][promptresultado]


[siria.remax]: https://www.instagram.com/siria.remax/
[sebastianpendino]: https://sebastianpendino.com/buyer-persona-con-inteligencia-artificial/
[incubadoraconvalores]: https://incubadoraconvalores.org
[promptresultado]: https://chat.openai.com/share/20aadea6-66e1-43ff-ae19-948ba8ed8020
[chatgpt]: https://chat.openai.com/
[gemini]: https://gemini.google.com/app
[youcom]: https://you.com