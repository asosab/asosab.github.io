---
layout: post
title:  "Automatizando el uso de D3.js en Jekyll"
date:   2017-07-30 17:34
categories: datos
comments: true
description: "Un ejemplo sensillo sobre cómo implementar una gráfica de barras de forma automática a partir de un archivo .tsv con la librería D3.js y Jekyll"
tags: [open data, charts, estadísticas, jekill, D3]
havecharts: true
published: true
image: D3-bars-jekyll.png
---

{% include showdata.html 
		tipo="barras" 
		chart="Ch1" 
		data="/data/UCV-computacion-total-por-ano-egresados.tsv"
		fuente="http://www.ucv.ve/"
%}

[Jekyll][jekyll] y [github][github] te permiten implementar sin mucho esfuerzo un sitio Web con archivos estáticos, pero eso no significa que no se pueda aprovechar la potencia de javascript para animar del lado del cliente los datos que les deseamos mostrar. Yo estoy buscando librerías .js que desplieguen de forma agradable y comprensible una serie de datos y mi primer experimento será con [D3.js][d3js], pero deseo además no tener que escribir todo el código que despliega una gráfica una y otra vez, así que crearé un par de archivos para que jekyll los invoque con los valores que correspondan cada vez que quiera mostrar un tipo gráfica determinada. Comenzaremos con la cĺásica y aburrida gráfica de barras, mostrada sobre estas líneas.

Como primer paso debes tener un archivo con datos para mostrar, puedes usar json como forma de notación o simplemente datos tabulados, que son fáciles de leer a ojo y uno de los formatos más ligeros para transmitirlos por Internet. Puedes usar el archivo de datos tabulados que uso en [este ejemplo][datos]

Ahora prepara tu sitio Web para poder usar la librería de [D3.js][d3js]. En el lugar donde cargas los elementos de la cabeza (por defecto /_includes/head.html) agrega unas líneas:
{% gist efaf7dc8d3e3b897821c1f722e56f738 %}

Agrego permanentemente jquery porque deseo usarla en otros sitios pero el código que les muestro la usará un par de veces, d3.tip es una extención de D3js que le agrega cajitas de texto sobre la barra que señales. Fíjense que uso un condicional con la variable 'page.havecharts', la idea es que sólo cargaré las librerías cuando las necesite, entonces bastará con agregar 'havecharts=true' en el encabezado de mi documento con gráficos para que se carguen las librerías.

Crearemos el archivo que se va a encargar de revisar el tipo de gráfica, ponerle un título y un par de links a las fuentes de datos. Yo le llamo showdata.html y lo guardo en _includes/
{% gist 6b8733ed5e9d6500b95317974520cf6d %}

Antes de ir al corazón del asunto les voy a mostrar cómo se vé el código incertado en una publicación, esta misma como ejemplo:
{% gist 9f94abd1ba7e83e366a1e78646a07321 %}
Recuerden que mi blog es código abierto, así que si quieren ver esta publicación por dentro son [bienvenidos][github] 

Vamos al meollo, para este primer estadio de pruebas tomé como punto de partida el código de [ejemplo de creación de una gráfica de barras con indicadores flotantes][graficaEjemplo] hecho con [D3.js][d3js], básicamente lo calqué, con algunas modificaciones menores, como tomar el tamaño de la pantalla como referencia del ancho de la gráfica, para que se vea bien en celulares. Mi código toma dinámicamente el nombre de los ejes X y Y del documento y los usa como leyenda vertical permanente y como título sobre la gráfica, para esto hay qe asegurarse que la primera columna tenga por nombre una referencia al valor de la segunda columna y el título de la segunda columna valga como título de la gráfica a mostrar.
{% gist 3ab7480f3df2d209866911d34ed1f137 %}

Un cambio importante es la orientación del texto del eje X. Para inclinarlo un poco  primero le di más espacio en la variable margin
```javascript
	var margin = {top: 40, right: 20, bottom: 50, left: 40}
```
y luego agegué por código unos cambios a los atributos de la etiqueta
```javascript
	.call(xAxis)
	.selectAll("text")  
	.style("text-anchor", "end")
	.attr("dx", "-.8em")
	.attr("dy", ".15em")
	.attr("transform", "rotate(-65)" );
```
Ya casi listos para ver resultados, el render necesita un poco de css, que agregué a mi archivo main.css
```css
.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.bar {fill: orange;}
.bar:hover {fill: orangered;}
.x.axis path {display: none;}

.d3-tip {
  line-height: 1;
  font-weight: bold;
  padding: 12px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  border-radius: 2px;
}

/* Creates a small triangle extender for the tooltip */
.d3-tip:after {
  box-sizing: border-box;
  display: inline;
  font-size: 10px;
  width: 100%;
  line-height: 1;
  color: rgba(0, 0, 0, 0.8);
  content: "\25BC";
  position: absolute;
  text-align: center;
}

/* Style northward tooltips differently */
.d3-tip.n:after {margin: -1px 0 0 0; top: 100%; left: 0;}
.chart-title { display: inline; padding-left: 40px;}
```


[github]: https://github.com/asosab
[jekyll]: http://jekyllrb.com/
[datos]: /data/UCV-computacion-total-por-ano-egresados.tsv
[d3js]: https://d3js.org/
[graficaEjemplo]: http://bl.ocks.org/Caged/6476579