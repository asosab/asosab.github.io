---
layout: post
title:  "PHP Web scraping"
date:   2017-06-17 17:34
categories: php
comments: true
description: "Ejemplo de Web scraping con PHP y base de datos de verbos, sus modos y tiempos"
tags: [PHP, open data, idioma, verbos]
image: PHP-scraping.png
---

Si quisiera saber todas las formas de conjugar un verbo podría ir a la web [spanishdict][spanishdict] y averiguarlo allí, pero si necesito obtener esa información programáticamente, o descargarme todas las conjugaciones de todos los verbos de forma automatizada debo empezar por crearme una función para hacer [Web scraping][Web scraping] 
{% if site.desarrollo %}{% else %}{% gist c9c49502042b4d9e3f88ad1153ca5e20 %}{% endif %}
La idea es que mediante pistas y un estudio previo de la web a "escrapear" podamos decirle a nuestra función cómo obtener esa información que desconocemos pero sabemos encontrar. Supongamos que obtenemos toda la página mediante file_get_contents, veamos dos ejemplos de cómo usar la función scrapDato()

{% if site.desarrollo %}{% else %}{% gist 667c1a7a3c4af907d9d83e357e11232e %}{% endif %}

Existen códigos fabulosos para hacer Web scraping, uno bastante serio es [Goutte][Goutte], para hacer mucho más que tomar datos de una Web.

Mientras tanto, si necesitan una base de datos de verbos y sus conjugaciones en español, o colaborar con el crecimiento de la misma entra en [esp_verbos][esp_verbos], lleva unos 4 mil verbos y contando

[esp_verbos]: https://github.com/asosab/esp_verbos
[spanishdict]: http://www.spanishdict.com/conjugate/esperar
[Web scraping]: https://es.wikipedia.org/wiki/Web_scraping
[Goutte]: https://github.com/FriendsOfPHP/Goutte