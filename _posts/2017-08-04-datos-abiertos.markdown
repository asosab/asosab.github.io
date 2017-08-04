---
layout: post
title:  "Datos abiertos venezolanos"
date:   2017-08-04 
categories: datos
comments: true
description: "Proyecto de accesibilidad a datos abiertos venezolanos, descárgalos aquí y/o pide el formato que más te interese"
tags: [open data, gobierno, ANC]
havecharts: false
published: true
image: open-data-gov.jpg
---

<img class="ri" alt="Diagrama Venn de datos abiertos gubernamentales, por justgrimes" src="{{ page.image | prepend: site.imageFolder | prepend: site.url }}"> 
La ley de infogobierno venezolana dice entre otras cosas que todo lo que produzca y publique la administración pública es automáticamente de dominio público. Esto significa que toda información que un organismo público coloque en una página web es información que puede copiarse, reproducirse, comentarse y usarse para los fines que se requiera siempre que se de crédito al creador de dichos datos y se mencione la fuente para que quien lo desee pueda tomar los datos directamente de ella. Pero la información que publica el gobierno no siempre es fácil de leer o analizar, a veces publican datos incertados en documentos pdf o en tablas dinámicas web, que si bien permiten moverse por grandes masas de datos no son lo suficientemente flexibles como para cruzar todos esos datos o explorarlos desde otras perspectivas.Otra cosa que los datos presentados piden a gritos es un poco de limpieza, agregar acentos, homologar datos duplicados, etc.

Inicié un pequeño proyecto de datos abiertos con la intención de ayudar a las instituciones públicas a compartir sus datos publicados en formatos que puedan ser mejor estudiados o simplemente descargados cuando las páginas oficiales se encuentran caídas o no provean medios cómodos para tomar dicha información, en la siguiente tabla iré agregando los datos que vaya procesando.

Datos | Formatos a descargar | Fuente 
------------ | ------------- | -------------
Candidatos a la Asamblea Nacional Constituyente, Venezuela 2017 | [.back postgresql][ancBack], [.sql postgresql][ancsql], [.json][ancJson], [.scv][ancSCV] [original][oriJson] | [CNE][ancFuente]


¿Cómo obtengo los datos?
------------
- [Web Scraping][w_webscraping] es una técnica que permite recabar datos de páginas web
- Existe software que permite recabar datos desde archivos pdf
- Los [datos de candidatos a la constituyente del 2017][asbod] se descargan directamente como un documento json desde el [sitio web publicado][ANC17] por el [Consejo Nacional Electoral][CNE]. La página muestra una tabla dinámica que se carga con los datos pero no permite cómodamente el descargarse el archivo json generado, es necesario leerlo desde la caché del browser o tomarlo con ayuda de plugins como [firebug][firebug]. A los datos le agregué una columna llamada 'adjudicados' que se muestra como 't' (de true) para los participantes que el CNE a afirmado como adjudicados a puestos en la ANC en ruedas de prensa o [boletines][boletin2]


LICENCIA
------------
Comparto el trabajo de recopilación bajo una licencia [CC by-sa 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Los propios datos son públicos, pertenecen a sus creadores y pueden encontrarse en sus sitios de publicación, mencionados donde corresponda.


¿Quieres ayudar agregando o limpiando datos? 
------------
1. Has un [fork][asbod].
2. Crea una rama propia (`git checkout -b mi_rama`)
3. Has un Commit con tus cambios (`git commit -am "Descripción de los cambios"`)
4. Sube los cambios a tu rama (`git push origin mi_rama`)
5. Crea un [Pull Request][1]
6. ¿Hay algún formato en que desees obtener los datos? ¡Déjame un comentario más abajo!

Crédito de la imagen: [Open Government Data Venn Diagram by justgrimes][notbrucelee] / [CC BY-SA][bysa2]

[imagen]: {{ page.image | prepend: site.imageFolder | prepend: site.url }}
[1]: http://github.com/asosab/open_data/pulls
[ancJson]: https://github.com/asosab/open_data/raw/master/anc17/anc.json
[ancSCV]: https://github.com/asosab/open_data/raw/master/anc17/anc.scv
[ancsql]: https://github.com/asosab/open_data/raw/master/anc17/anc.sql
[ancBack]: https://github.com/asosab/open_data/raw/master/anc17/anc.backup
[oriJson]: https://github.com/asosab/open_data/raw/master/anc17/original.json
[ancFuente]: http://constituyente2017.cne.gob.ve/resultados_2017Final/
[firebug]: https://getfirebug.com/
[asbod]: https://github.com/asosab/open_data
[CNE]: http://www.cne.gob.ve/web/index.php
[ANC17]: http://constituyente2017.cne.gob.ve/assets/
[w_webscraping]: https://es.wikipedia.org/wiki/Web_scraping
[bysa2]: https://creativecommons.org/licenses/by-sa/2.0/
[notbrucelee]: https://www.flickr.com/photos/notbrucelee/5241176871/
[W_open_data]: https://es.wikipedia.org/wiki/Datos_abiertos
[boletin2]: http://www.cne.gob.ve/web/sala_prensa/noticia_detallada.php?id=3553
