---
layout: post
title:  "pruebas"
date:   2017-05-17 17:34
categories: test
---

Si quisiera saber todas las formas de conjugar un verbo podría ir a la web [spanishdict][spanishdict] y averiguarlo allí, pero si necesito obtener esa información programáticamente, o descargarme todas las conjugaciones de todos los verbos de forma automatizada debo empezar por crearme una función para hacer [Web scraping][Web scraping] 

{% highlight php %}

  function scrapDato($frase, $pista, $elem="td", $cuenta=1, $cierre = null){ 
    $pos = strpos($frase, $pista);
    if($pos == false) return false;
    $vi = $pos;
    if($cierre == null){
      $abre = "<$elem";
      $cierra = "</$elem>";
    }else{
      $abre = $elem;
      $cierra = $cierre;
    }

    for ($x = 1; $x <= $cuenta; $x++) {
      $npos = strpos($frase, $abre, $vi+1);
      if($npos == false) $x=$cuenta; else $vi = $npos;
    } 

    if($cierre == null) $vi = strpos($frase, ">", $vi) + 1; else $vi = $vi +1;
    $vf = strpos($frase, $cierra,$vi);
    $v = trim(substr($frase, $vi, $vf - $vi ));
    $strip = strip_tags($v);
    return $strip;
  }
{% endhighlight %}

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

$$a^2 + b^2 = c^2$$

[spanishdict]: http://www.spanishdict.com/conjugate/esperar
[Web scraping]:    https://es.wikipedia.org/wiki/Web_scraping
[Goutte]: https://github.com/FriendsOfPHP/Goutte