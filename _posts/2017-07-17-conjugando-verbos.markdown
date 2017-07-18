---
layout: post
title:  "Conjugando verbos"
date:   2017-07-17 17:34
categories: php PostgreSQL
comments: true
---

Jugando con bots conversacionales, necesito hacer análisis sintáctico de las frases que le dicen a mi bot de prueba para que éste pueda analizar la oración y ser capáz de responder a su interlocutor de la mejor manera. voy a mostrarles aquí cómo identifico si  una palabra es un verbo y cómo puedo obtener una conjugación determinada de dicho verbo.

Primero hay que tener una buena cantidad de verbos almacenada y la posibilidad de seguir agregando nuevos verbos. Esta labor sería mucho mas limpia y directa con mongoBD desde node.js pero por ahora las herramientas que tengo son postgreSQL y PHP, así que les muestro la tabla donde guardo los verbos

{% highlight sql %}
-- Creación de la taba en postgresql
CREATE TABLE esp_verbos
(
  verbo character varying NOT NULL,
  conjugaciones jsonb,
  fecha_modificacion timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT esp_verbos_verbo_pkey PRIMARY KEY (verbo)
)
WITH (
  OIDS=FALSE
);
{% endhighlight %}

El contenido del json se ve así una vez cargado:
{% gist 82e9dc4670f04ebfa076cf40a72c2f2e %}

Ahora cuando se desee verificar si una palabra es un verbo se puede ejecutar el siguiente query:
{% highlight sql %}
	$buscar = trim(remove_accents(strtolower($getLocalVerbo)));
	$buscar = str_replace(" ", "%", $buscar);
	$sql = "SELECT conjugaciones FROM $tbl WHERE verbo = '$getLocalVerbo' OR 
		lower(sp_ascii(concat(
		conjugaciones->>'indicativo',
		conjugaciones->>'perfecto',
		conjugaciones->>'subjuntivo',
		conjugaciones->>'imperativo',
		conjugaciones->>'progresivo',
		conjugaciones->>'perfecto_subjuntivo'
		))) like '$buscar' limit 1";
	$resultado = DbLink::resultados($sql,self::getBD());
	if(!empty($resultado)) $data['data'] = json_decode($resultado[0]['conjugaciones'], true);
{% endhighlight %}
Yo lo uso dentro de una función llamada self::getVerbo($verbo), que primero busca el verbo dentro de la bd pero si no lo encuentra lo busca y descarga de Internet, proceso que explico en [otra publicación][phpwebscraping]
DbLink::resultados($sql,self::getBD()) retorna un arreglo con el resultado del query en $sql. Así la respuesta será un json que convierto a arreglo para usarlo después.

La función de postgresql sp_ascii la uso básicamente para hacer búsquedas con o sin acento
{% highlight sql %}
	CREATE OR REPLACE FUNCTION sp_ascii(character varying)
	  RETURNS text AS
	$BODY$
	SELECT TRANSLATE
	($1,
	'áàâãäéèêëíìïóòôõöúùûüÁÀÂÃÄÉÈÊËÍÌÏÓÒÔÕÖÚÙÛÜçÇñÑ',
	'aaaaaeeeeiiiooooouuuuAAAAAEEEEIIIOOOOOUUUUcCnN');
	$BODY$
	  LANGUAGE sql VOLATILE
	  COST 100;
	ALTER FUNCTION sp_ascii(character varying)
	  OWNER TO postgres;
{% endhighlight %}

Luego, dado un verbo que deseo conjugar uso lo siguiente dentro de una función que recibe el verbo como parámetro:

{% highlight PHP %}
		$conjugar = "indicativo-imperfecto-yo";
		$verbo = "amarillear";
  	$conjugaciones = self::getVerbo($verbo);  // getVerbo retorna un arreglo con el arbol de conjugaciones
  	if(!empty($conjugaciones)){
  		$data['params'] = $conjugaciones;
  		$data['data'] = $conjugaciones['verbo'];
	  	if(!empty($conjugar)){
	  		$data['params']['conjugar'] = $conjugar;
	  		$forma = explode("-", $conjugar);
		  	if(!empty($forma[2]) && !empty($conjugaciones[$forma[0]][$forma[1]][$forma[2]])){
		  		$data['data'] = $conjugaciones[$forma[0]][$forma[1]][$forma[2]];
		  	}elseif(!empty($forma[1]) && !empty($conjugaciones[$forma[0]][$forma[1]])){
		  		$data['data'] = $conjugaciones[$forma[0]][$forma[1]][0];
		  	}elseif(!empty($forma[0]) && !empty($conjugaciones[$forma[0]])) {
		  		$data['data'] = $conjugaciones[$forma[0]][0][0];
		  	}
	  	}
  	}

{% endhighlight %}

Links:
- [Web scraping con PHP][phpwebscraping]
- [ejemplo de estructura de verbos y sus conjugaciones en formato json][json conjugaciones]
- [Base de datos de verbos y sus conjugaciones][esp_verbos]
- [Multilingual Central Repository spa][mcrs]
- [SpanishJS][SpanishJS] Esta es una clase en nodejs para realizar analisis sintactico de textos, tiene una lista con mas de 15 mil verbos

[phpwebscraping]: {% post_url 2010-07-21-name-of-post %}
[json conjugaciones]: https://gist.github.com/asosab/82e9dc4670f04ebfa076cf40a72c2f2e
[Justine]: https://web.telegram.org/#/im?p=@just_in_bot
[wikimicroservices]: https://es.wikipedia.org/wiki/Arquitectura_de_microservicios
[Web scraping]: https://es.wikipedia.org/wiki/Web_scraping
[esp_verbos]: https://github.com/asosab/esp_verbos
[mcrs]: http://adimen.si.ehu.es/web/MCR/
[SpanishJS]: https://github.com/damiancipolat/SpanishJS