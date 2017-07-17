---
layout: post
title:  "PHP Web scraping"
date:   2017-06-17 17:34
categories: php web-scraping
comments: true
---

Si quisiera saber todas las formas de conjugar un verbo podría ir a la web [spanishdict][spanishdict] y averiguarlo allí, pero si necesito obtener esa información programáticamente, o descargarme todas las conjugaciones de todos los verbos de forma automatizada debo empezar por crearme una función para hacer [Web scraping][Web scraping] 

{% gist c9c49502042b4d9e3f88ad1153ca5e20 %}

La idea es que mediante pistas y un estudio previo de la web a "escrapear" podamos decirle a nuestra función cómo obtener esa información que desconocemos pero sabemos encontrar. Supongamos que obtenemos toda la página mediante file_get_contents, veamos dos ejemplos de cómo usar la función scrapDato()

{% highlight php %}
$verbo = "atravezar";
$data =[]; //aquí iré guardando los datos
$cuerpo = file_get_contents("http://www.spanishdict.com/conjugate/{$verbo}"); // un gran string que contiene el cuerpo de la web
$data['data']['verbo'] = scrapDato($cuerpo, "source-text","h1"); // obtengo el verbo, para confirmar

$personas = ['yo','tú','él/ella/Ud.','nosotros','vosotros','ellos/ellas/Uds.'];
$tiempos = ['presente','preterito','imperfecto', 'condicional','futuro'];
$pos = 1;

//En este primer bucle nos paseamos por los tiempos verbales del indicativo y en cada uno hacemos un recorrido por las personas, asi obtenemos la grilla del indicativo:
foreach ($tiempos as $tiempo) {
	foreach ($personas as $persona) {
		$data['data']['indicativo'][$tiempo][$persona] = scrapDato($cuerpo, ">$persona<","td",$pos);
	}
	$pos++;
}

//ahora nos vamos a aprovechar ya no de as etiquetas de cada tiempo verbal, sino de que conocemos la posición de cada expresión, así obtendremos la grilla del subjuntivo
$tiempos = ['presente','imperfecto', 'imperfecto2','futuro'];
$base = 42;
$pos = $base;
foreach ($personas as $persona){
	foreach ($tiempos as $tiempo) {
		$data['data']['subjuntivo'][$tiempo][$persona] = scrapDato($cuerpo, ">yo<","td",$pos);
		$pos++;
	}
	$pos++;
}

var_dump($data);
{% endhighlight %}

Existen códigos fabulosos para hacer Web scraping, uno bastante serio es [Goutte][Goutte], para hacer mucho más que tomar datos de una Web.

Mientras tanto, si necesitan una base de datos de verbos y sus conjugaciones en español, o colaborar con el crecimiento de la misma entra en [esp_verbos][esp_verbos], lleva unos 4 mil verbos y contando

[esp_verbos]: https://github.com/asosab/esp_verbos
[spanishdict]: http://www.spanishdict.com/conjugate/esperar
[Web scraping]:    https://es.wikipedia.org/wiki/Web_scraping
[Goutte]: https://github.com/FriendsOfPHP/Goutte