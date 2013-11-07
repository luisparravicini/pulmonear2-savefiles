README
======

Codigo en javascript para leer los save files de [pulmonear 2](http://www.duval.vg/foro/index.php?topic=1889.0).

Los tests están en test/SpecRunner.html

Desde index.html se puede cargar un save file y por consola se muestran los datos parseados.

TODO
----

  - chequeo de errores
  - grabar el archivo


Uso
---

```
  var saveFile = new SaveFile();

  // setters
  saveFile.setFuturo( true / false );
  saveFile.setNumero( offset, valor );
  saveFile.setSwitch( offset, valor );
  saveFile.setNombre( nombre );
  saveFile.setData( data ); // un Array

  // getters
  saveFile.getFuturo();
  saveFile.getNumero( offset );
  saveFile.getSwitch( offset );
  saveFile.getNombre();
  saveFile.getData();

```

Probado en Chrome, Firefox y Safari

