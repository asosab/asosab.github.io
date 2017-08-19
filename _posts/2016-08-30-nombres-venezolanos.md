---
layout: post
title:  "100 años de nombres en Venezuela"
date:   2017-08-19 08:43
categories: datos
comments: true
description: "Gráfica dinámica con mas de tres mil nombres y su frecuencia de uso en Venezuela. Mira que tan común fue tu nombre entre los años 1896 y 1996"
tags: [open data, charts, estadísticas, nombres, Venezuela]
havecharts: true
published: true
image: petronila-mayerling.png
---

{% include graf_nombres.html %}

<h4>La gráfica</h4>
Muestra la cantidad de personas ceduladas con un nombre determinado y por año de nacimiento, desde 1896 hasta 1996. La escala cambia según los nombres que esté entregando, basándose en el que tenga mayor número de incidencias. Me parece interesante comprobar hasta qué punto los nombres, lejos de ser inspiraciones divinas que las madres materializan, se comportan como modas que vienen y van, hablándonos en su recorrido de los intereses y fervores de cáda época. <b>Jean Carlo Simancas</b> era el gran galán de la televisión venezolana de los setenta y ochena, lo que explicaría por qué de los 46 mil venezolanos llamados <b>Jean</b>, sólo entre los años 75 y 95 una buena tropa de madres noveleras le pusieron ese nombre a unos 42 mil muchachitos. Se puede ver cómo suavemente van desapareciendo los nombres de nuestros abuelos y surgen como espuma de perros rabiosos otros nuevos que rápidamente se ponen en voga. Ver mi propio nombre me da una idea del tiempo que tiene que pasar para que a la gente le parezca curioso que alguien se haya llamado jamás <b>Alejandro</b>, como puede pasar hoy con el nombre <b>Visitación</b>, extinto desde finales de los ochenta.

<h4>Sobre los datos
<a href="/data/nombres-venezuela-anual.json" title="Descarga los datos de la gráfica"><i class="fa fa-table" aria-hidden="true"></i></a>&nbsp;
<a href="https://www.dateas.com" title="Funente de los datos"><i class="fa fa-file-text-o" aria-hidden="true"></i></a></h4>
La presente muestra contiene los primeros 3160 nombres más frecuentes en cédulas venezolanas desde 1896 hasta 1996. Puedes <a href="/data/nombres-venezuela-anual.json">descargar los datos en formato json</a> o ir directo a la fuente (<a href="https://www.dateas.com/">https://www.dateas.com/</a>) de donde tomé la materia prima vía
<a href="{% post_url 2017-06-16-PHP-scraping %}">Web scraping</a>. No son todos los nombres venezolanos, los que se repiten menos de 500 veces quedan excluidos por falta de tiempo de procesador (suman más de 160 mil nombres distintos los que se repiten al menos una vez, a dos minutos el nombre lo dejo para otro año), mi amiga Lenka no se va a encontrar aquí ya que sólo han existido cinco personas con su nombre en la historia de la cedulación venezolana, menos aún su hermana y querida amiga Lianka, cuyo nombre es único en nuestro pais. La verdad es que no puedo saber si esto que escribo es cierto, la fuente de los datos no solo no es oficial sino que está incompleta, motivo por el cual la grafica muere en 1996. Sería genial si el INE y SAIME se pusieran de acuerdo para publicar datos estadísticos oficiales basados en nombres y fechas de nacimiento, yo quisiera contarles sobre la incidencia de las cesareas analizada desde el estudio de los días en que nacen los venezolanos (principalmente martes, miércoles y jueves, supongo que por comodidad del equipo de cirugía que programa la intervención quirúrgica), pero la falta de material oficial en qué basarme me deja hablando mejor de otra cosa. Para ver datos abiertos venezolanos de fuentes oficiales les invito a que se den una vuelta por mi <a href="{% post_url 2017-08-04-datos-abiertos %}">proyecto de open data</a>, que espero ver crecer tan rápido como las nuevas modas en cuestiones de nombres raros.
<br/>
<h4>Base de datos</h4>
Los datos crudos los almacené en una base de datos postgreSQL, creé una lista de nombres ordenada de mayor a menor por el número de veces que se repiten (más de 800.000 nombres), y sobre cada elemento de esta lista ejecuto el siguiente query:

<pre>
  SELECT extract(year from fechanac) ano, count(1) total from dateas where 
  unaccent(nombre1) % unaccent('$nombre') AND similarity(unaccent(nombre1), unaccent('$nombre')) > 0.7
  and extract(year from fechanac) is not null 
  and extract(year from fechanac) >1895
  and extract(year from fechanac) <1997
  group by ano
  order by ano asc
</pre>

que básicamente compara el nombre sin acento con cada uno de los que están en la base de datos y luego al grupo obtenido lo filtra por nivel de similaridad, donde el 0.7 basta para identificar como iguales los que se diferencien solo por espacios, caracteres extraños y otros pequeños detalles fonéticos ('maria' es distinto de 'mario' pero 'ana' se parece a 'anna'). 
Por ejemplo, en el caso de 'María', el sistema contabiliza todas las personas registradas como "Maria", "MARIA   V", "María", "|MARIA", "MARIA D", "D' MARÍA", "MARIA|", "MARIÁ", "MARIA  A", "Marìa", "MARIA T", "MARIA L", "MARIA  Y", "MARIA         I", "MARIA         D", "MARIA J", "MARY MARIA", "MARIA  J", "MARIA         G", "MARIA V", "S MARIA", "MARU MARIA", "MARIA   A", "MARIA  S", "MARIA  I", "MARIA", "MARIA R", "MARIA         E", "MARIA S", "MARÍA", "A MARIA", "MARIA         N", "MARIA C", "MARIA I", "MARÌA", "MARIA N.", "MARIA G", "MARIA         L", "MARIA   E", "MARIA E", "MARIA A", "MARIAMARIA", "MARIA Y", "MARIA M", "MARIA N" y "MARIA F". Hay un margen de error pequeño, fíjense que se me pasó una 'Maru'. Así de sucios están los datos. Finalmente obtengo el numero de registros anuales de cada grupo de nombres similares.
