# Matriculator

Trabajo grupal del RA1 de Programación de Inteligencia Artificial (Curso de Especialización en IA y Big Data).

**Integrantes:** Julen Altuna y Ander Ameztoy
**Web:** https://matriculator.netlify.app
**Repositorio:** https://github.com/altu44/proyecto-ra1
**Fecha de entrega:** 05/10/2026

De las dos opciones del enunciado elegimos la B, Matriculator, pero la hemos llevado a un caso más concreto: el parking de una empresa con muchos empleados que también usan clientes de un supermercado y gente de fuera que paga por horas. No hemos programado ni entrenado ningún modelo; lo que hay aquí es la propuesta de cómo lo haríamos y por qué. Todos los datos que aparecen son inventados o abiertos.

En este README contamos cómo nos hemos organizado, las fuentes que hemos usado, cómo hemos usado la IA y las respuestas a las preguntas del paso 5. El desarrollo completo, con los gráficos y las partes interactivas, está en la web.

## Índice

1. [Qué hay en el repositorio](#qué-hay-en-el-repositorio)
2. [Organización y tiempos](#organización-y-tiempos)
3. [Resumen del trabajo](#resumen-del-trabajo)
4. [Preguntas del paso 5](#preguntas-del-paso-5)
5. [Fuentes](#fuentes)
6. [Uso de la IA](#uso-de-la-ia)
7. [Enlaces](#enlaces)

---

## Qué hay en el repositorio

```
proyecto-ra1/
├── index.html             la web con todo el desarrollo (está en Netlify)
├── styles.css             estilos de la web
├── script.js              gráfico de Trends, matriz, simulador, diagramas...
├── README.md              este archivo
├── data/
│   ├── trends_web.csv     Google Trends, búsqueda web
│   └── trends_youtube.csv Google Trends, búsqueda en YouTube
├── assets/ia/             capturas de las conversaciones con IA
├── pseudocodigo.ipynb     paso 3, componente de IA en Python
└── demo_lenguajes.ipynb   paso 4, lectura de HTML, CSV, JSON y XML
```

Cada uno ha trabajado en su rama (`julen` y `ander`) y luego lo hemos juntado en `main`, que es la rama que publica Netlify.

---

## Organización y tiempos

Los pasos 1, 2 y 5 los hemos hecho entre los dos, repartiéndonos las partes. El paso 3 lo ha llevado Julen y el paso 4 Ander. Teníamos 5 horas de clase y el resto lo hemos hecho en casa.

| # | Tarea | Qué se entrega | Quién | Previsto | Real | Diferencia | Estado |
|---|---|---|---|---|---|---|---|
| T1 | Crear el repo, las ramas y publicar en Netlify | Repo y web | Julen | 0,5 h | | | Hecho |
| T2 | Definir la aplicación (problema, entradas, datos, salida, riesgos) | Paso 1 | Los dos | 0,5 h cada uno | | | Hecho |
| T3 | Google Trends: descargar los CSV, gráfico e interpretación | Paso 2.1 | Julen | 1 h | | | Hecho |
| T4 | Características de los lenguajes y comparativa | Paso 2.2 | Ander | 1,5 h | | | Hecho |
| T5 | Matriz de decisión y decisiones finales | Paso 2.3 y 2.4 | Los dos | 1 h cada uno | | | Hecho |
| T6 | Flujo general y diagramas | Paso 3 | Julen | 1,5 h | | | Hecho |
| T7 | Pseudocódigo | Paso 3 y `pseudocodigo.ipynb` | Julen / Ander | 1,5 h | | | Hecho |
| T8 | HTML, XML, JSON, Markdown y CSV | Paso 4 | Ander | 1,5 h | | | Hecho |
| T9 | Notebook de formatos | `demo_lenguajes.ipynb` | Ander | 1,5 h | | | Hecho |
| T10 | Preguntas del paso 5 | README y web | Los dos | 0,5 h cada uno | | | Hecho |
| T11 | Fuentes y uso de la IA | README | Los dos | 1 h cada uno | | | Hecho |
| T12 | Juntar las ramas y publicar | `main` y Netlify | Los dos | 1 h cada uno | | | Hecho |
| T13 | Repaso final con la rúbrica | Todo | Los dos | 0,5 h cada uno | | | En curso |
| | **Total previsto** | | | **unas 9 h cada uno** | | | |

### Cambios sobre lo que habíamos planeado

| Fecha | Qué pasó | Por qué | Qué hicimos |
|---|---|---|---|
| 23/09 | Cambiamos el caso del paso 1 por uno propio (parking de empresa + supermercado + público) | El ejemplo del enunciado se nos quedaba corto | Rehicimos el paso 1 y después el 3 para que encajaran |
| 23/09 | Decidimos guardar el id del ticket junto a la matrícula del cliente | Queríamos poder relacionar la estancia con la compra | Lo añadimos a los datos, al simulador y a los riesgos de privacidad |
| 23/09 | Los primeros CSV de Trends eran de España y no del mundo | Se nos pasó cambiar el filtro de país | Los volvimos a descargar y rehicimos la interpretación |
| 05/10 | Al juntar las ramas, los dos habíamos cambiado `pseudocodigo.ipynb` | Trabajamos el mismo archivo a la vez sin avisarnos | Nos quedamos con la versión de Ander y adaptamos el texto de la web |

### Reflexión

El reparto ha salido bastante equilibrado. Cada uno tenía su paso propio (el 3 y el 4) y los demás los hemos ido haciendo juntos, sobre todo en clase. Lo que más tiempo nos ha llevado no estaba en el plan: cambiar el caso del paso 1 a mitad de trabajo nos obligó a rehacer partes que ya estaban hechas, aunque creemos que mereció la pena porque ahora la aplicación tiene más sentido.

Con Git hemos aprendido bastante. Trabajar en ramas separadas funcionó bien mientras cada uno tocaba sus archivos, pero el único conflicto que tuvimos fue justo en un archivo que habíamos tocado los dos sin decirnos nada. La próxima vez lo hablaríamos antes y haríamos merges más a menudo en vez de esperar al final.

También nos ha pasado lo de los CSV de España, que es un despiste tonto pero que nos hizo repetir la interpretación. Para otra vez revisaríamos los filtros antes de descargar nada.

---

## Resumen del trabajo

La versión completa de cada paso está en la web. Aquí va lo principal.

### Paso 1. La aplicación

Una empresa tiene un parking que comparten tres tipos de usuarios:

- **Empleados:** su matrícula está dada de alta y entran y salen sin pagar.
- **Clientes del supermercado:** al pagar la compra, el cajero apunta la matrícula en el TPV y se queda asociada al id del ticket. Tienen 90 minutos gratis y después pagan solo el tiempo que se pasen.
- **Público:** cualquier otro coche paga por tiempo (2,40 €/h, con un máximo de 18 € al día).

Ahora mismo esto se controla con tarjetas y tiques de papel, que se pierden y generan colas. Con una cámara en la entrada y otra en la salida, el sistema lee la matrícula y sabe qué tipo de coche es.

| | |
|---|---|
| Entradas | Imágenes de las cámaras de entrada y salida, la matrícula y el id del ticket que mete el cajero, y el alta de empleados que hace Recursos Humanos |
| Datos | Para la IA, imágenes de matrículas anotadas. Para la aplicación: empleados, tickets del día, entradas y salidas, y tarifas. Todo inventado |
| Procesamiento | Validar y preparar la imagen, detectar y leer la matrícula (IA), clasificar el coche y calcular cuánto paga |
| Salida | Barrera abierta, importe a pagar o aviso al personal si la lectura no es fiable. Se guarda un registro sin la imagen |
| Riesgos | La matrícula es un dato personal y al unirla con el ticket se puede saber qué ha comprado cada cliente. Por eso hay que avisar al cliente, guardar solo el id del ticket, limitar quién lo ve y borrarlo pasado un tiempo. También hay errores de lectura (0/O, 8/B, noche, suciedad) y errores del cajero al teclear |
| Lo que decide una persona | Las lecturas dudosas, las reclamaciones, la validación en caja y el alta de empleados. La IA solo lee la matrícula, no cobra ni sanciona a nadie |

Algo que tuvimos claro desde el principio es que la IA solo hace una cosa: leer la matrícula. Saber si el coche es de un empleado o de un cliente y calcular el precio son reglas normales que consultan una base de datos.

### Paso 2. Lenguajes

Comparamos Python, JavaScript/Node.js, R, C++, PHP y Java.

**Google Trends.** Descargamos el interés de los seis lenguajes en todo el mundo, desde 2004 en búsqueda web y desde 2008 en YouTube (datos descargados el 23/09/2026, en `data/`). El gráfico de la web se hace leyendo esos CSV.

- En búsqueda web, Java dominaba al principio (93 de media en 2004) y ha ido cayendo hasta unos 12. Python estuvo plano hasta 2013 y desde ahí no ha parado de subir; es el primero desde 2019. JavaScript se mantiene estable y PHP, C++ y R van a menos.
- En YouTube, Python fue el primero de 2020 a 2023, pero en 2024–2026 Java ha vuelto a pasarle. Creemos que tiene que ver con vídeos para aprender Java, no con la IA.
- Hay que tener en cuenta que Trends mide interés de búsqueda y no cuánta gente usa cada lenguaje. Además, en YouTube faltan los datos de enero a julio de 2017.

Lo que sacamos de aquí es que Python es el que más ha crecido y que coincide con el auge de la IA, algo que también dicen el informe Octoverse de GitHub y la encuesta de Stack Overflow.

**Comparativa.** Puntuamos cada lenguaje del 1 al 5 pensando en nuestro caso. En la web, al pulsar cada casilla sale por qué tiene esa nota y de qué fuente lo hemos sacado.

| Criterio | Python | JS/Node | R | C++ | PHP | Java |
|---|---|---|---|---|---|---|
| Facilidad de aprendizaje | 5 | 4 | 3 | 2 | 4 | 3 |
| Legibilidad | 5 | 3 | 3 | 2 | 3 | 3 |
| Mantenimiento | 4 | 3 | 3 | 2 | 3 | 4 |
| Integración web, APIs y BBDD | 4 | 5 | 2 | 2 | 5 | 4 |
| Trabajo con imágenes | 5 | 3 | 3 | 4 | 2 | 3 |
| Análisis estadístico | 4 | 2 | 5 | 2 | 1 | 2 |
| Librerías y modelos de IA | 5 | 3 | 2 | 4 | 1 | 3 |
| Reutilizar modelos preentrenados | 5 | 3 | 2 | 4 | 1 | 3 |
| Rendimiento, despliegue y comunidad | 4 | 4 | 3 | 5 | 3 | 4 |
| Interfaz web | 2 | 5 | 2 | 1 | 4 | 2 |

**Matriz de decisión.** Usamos dos repartos de pesos distintos, uno pensando en la parte de IA y otro en la aplicación, porque no buscamos lo mismo en cada una.

| Criterio | Peso IA | Peso aplicación |
|---|---|---|
| Facilidad de aprendizaje | 5 % | 10 % |
| Legibilidad | 5 % | 10 % |
| Mantenimiento | 5 % | 15 % |
| Integración web, APIs y BBDD | 5 % | 25 % |
| Trabajo con imágenes | 20 % | 5 % |
| Análisis estadístico | 5 % | 0 % |
| Librerías y modelos de IA | 25 % | 0 % |
| Reutilizar modelos preentrenados | 20 % | 0 % |
| Rendimiento, despliegue y comunidad | 10 % | 15 % |
| Interfaz web | 0 % | 20 % |

| Resultado | Python | JS/Node | R | C++ | PHP | Java |
|---|---|---|---|---|---|---|
| Parte de IA | **4,75** | 3,20 | 2,60 | 3,60 | 1,95 | 3,15 |
| Aplicación | 3,85 | **4,15** | 2,55 | 2,35 | 3,75 | 3,35 |

**Decisiones.**

- Para la aplicación, **JavaScript con Node.js**: es el único lenguaje que funciona directamente en el navegador, con Node se usa también en el servidor, y trabaja con JSON de forma natural.
- Para la IA, **Python**: tiene OpenCV, PyTorch, YOLO y EasyOCR, y muchísimos modelos ya entrenados que se pueden reutilizar.
- Son dos lenguajes distintos porque cada parte necesita cosas distintas. Se comunicarían mediante una API: la aplicación manda la imagen al servicio de Python y este le devuelve un JSON con la matrícula y la confianza. Hacerlo todo en Python con FastAPI también sería posible, pero la parte web sería más pobre.
- Para la IA descartamos JavaScript (hay librerías como TensorFlow.js, pero muchos menos modelos de visión), R (muy bueno para estadística, flojo en visión), C++ (rapidísimo, pero mucho más difícil de desarrollar y mantener), PHP (casi no tiene nada de IA) y Java (se puede con DJL, pero con menos modelos y menos ayuda que en Python).

### Paso 3. Partes del programa

**Flujo general.** Lo hemos dividido en 10 etapas, desde que el coche llega a la barrera hasta que sale. En la web se puede reproducir paso a paso.

| # | Etapa | Quién lo hace |
|---|---|---|
| 1 | El coche llega a la entrada y la cámara saca una foto | Aplicación |
| 2 | Se valida y prepara la imagen | Aplicación |
| 3 | Se detecta y se lee la matrícula | IA |
| 4 | Si la lectura no es fiable (confianza menor de 0,80), la revisa una persona | Persona |
| 5 | Se guarda la hora de entrada y se abre la barrera | Aplicación |
| 6 | Si compra en el súper, el cajero apunta la matrícula y se asocia al ticket (opcional) | Persona |
| 7 | En la salida se vuelve a leer la matrícula | IA |
| 8 | Se mira si es empleado, cliente con ticket o público | Aplicación |
| 9 | Se calcula el importe | Aplicación |
| 10 | Se paga si toca, se abre la barrera y se guarda el registro | Aplicación |

**Diagrama de decisión en la salida.** En la web está dibujado como diagrama de flujo. En texto sería así:

```
Coche en la salida → leer matrícula (IA) → ¿confianza ≥ 0,80?
   no → revisa una persona y confirma la matrícula
   sí → ¿es empleado?
          sí → sale gratis
          no → ¿tiene ticket de hoy?
                 no → público, paga 2,40 €/h (máx. 18 €)
                 sí → ¿ha estado 90 min o menos?
                        sí → gratis
                        no → paga solo lo que se pasa
```

**Antes y después de tener el modelo.** Antes habría que juntar imágenes de prueba (de día, de noche, con lluvia), anotarlas, elegir un detector y un OCR ya entrenados, ajustarlos con matrículas españolas, decidir el umbral de confianza y preparar las bases de datos. Después, el servicio de IA carga el modelo, recibe las imágenes de las cámaras, lee la matrícula y la aplicación aplica las reglas. Las correcciones que hace el personal servirían para mejorar el modelo más adelante.

**Pseudocódigo.** El de la web lo hemos escrito basándonos en PSeInt, el programa que se usa para aprender pseudocódigo en español. Por eso usamos palabras como `función`, `si`, `devolver` o `intentar`, aunque la estructura la hemos acercado a Python porque es el lenguaje que hemos elegido para la IA. Ese pseudocódigo describe lo que pasa en la salida: leer la matrícula, clasificar el coche y calcular el importe.

En `pseudocodigo.ipynb` está la parte de IA en Python (unas 48 líneas): lee la entrada, valida la imagen, la prepara, detecta y lee la matrícula, comprueba la confianza y el formato español (4 cifras y 3 consonantes) y guarda un registro sin la imagen. El detector y el OCR están simulados para poder ejecutarlo con datos inventados.

### Paso 4. Formatos

| Formato | Qué es | Dónde lo usaríamos |
|---|---|---|
| HTML | Lenguaje de marcado con etiquetas ya definidas para estructurar páginas web | La interfaz: subir la imagen, elegir la cámara, ver el resultado |
| XML | Lenguaje de marcado en el que las etiquetas las inventa uno mismo, con estructura de árbol estricta | Configuración de las cámaras o intercambio con otros sistemas del parking |
| JSON | Formato ligero de clave y valor para intercambiar datos | La comunicación entre la web, el servidor Node.js y el servicio de IA |
| Markdown | Marcado sencillo para dar formato a texto | Este README y las explicaciones de los notebooks |
| CSV | Datos en tabla separados por comas | Los datos de Trends y el registro de entradas y salidas |

La diferencia principal entre HTML y XML es que HTML sirve para mostrar contenido con etiquetas fijas y XML sirve para describir datos con etiquetas propias.

En `demo_lenguajes.ipynb` están las librerías de Python para leer cada formato (`html.parser`, BeautifulSoup, `lxml`, `csv`, `pandas`, `json`), una tabla con sus equivalentes en R (`rvest`, `readr`, `jsonlite`, `xml2`), un HTML inventado de la interfaz que leemos con BeautifulSoup, un JSON inventado con imágenes de prueba que pasamos a tabla, y ejemplos cortos de XML y CSV.

---

## Preguntas del paso 5

**¿La solución es IA débil o se acerca a IA fuerte?**

Es IA débil. El sistema hace una sola cosa, que es encontrar una matrícula en una foto y leerla, y no sabe hacer nada fuera de eso. Tampoco entiende lo que ve: reconoce patrones porque ha aprendido de muchas imágenes, pero no sabe qué es un coche ni para qué sirve un parking. Las decisiones importantes (si alguien paga, si hay un error) las toman reglas que hemos escrito nosotros o una persona. Una IA fuerte tendría que poder razonar y adaptarse a cualquier tarea como una persona, y esto queda muy lejos de eso.

**¿Usaríais un modelo preentrenado o lo entrenaríais desde cero?**

Preentrenado. Ya existen detectores y OCR entrenados con millones de imágenes, como YOLO o EasyOCR, y lo lógico es partir de uno de ellos y ajustarlo con fotos de matrículas españolas. Entrenar desde cero pediría miles de imágenes anotadas a mano, mucho tiempo de GPU y, aun así, lo más probable es que el resultado fuera peor. Solo tendría sentido si ningún modelo existente funcionara con nuestro tipo de imágenes.

**Límites**

El sistema puede fallar de noche, con lluvia, con matrículas sucias, dobladas o extranjeras, y puede confundir caracteres parecidos. Tampoco sabe nada de lo que pasa dentro del parking: si un cliente compra pero no le validan el ticket, el sistema lo trata como público. Por eso siempre tiene que haber una persona que pueda revisar y corregir.

---

## Fuentes

Hemos intentado usar sobre todo documentación oficial y fuentes con autor y fecha. En la web, cada dato del paso 2 tiene un número que lleva a su fuente.

| # | Título | Autor o entidad | URL | Consultado | Usado en |
|---|---|---|---|---|---|
| 1 | Google Trends | Google | https://trends.google.es/trends/ | 23/09/2026 | Paso 2.1 |
| 2 | Preguntas frecuentes sobre los datos de Google Trends | Google | https://support.google.com/trends/answer/4365533?hl=es | 23/09/2026 | Paso 2.1 |
| 3 | Octoverse: AI leads Python to top language as the number of global developers surges | GitHub Staff, GitHub Blog (29/10/2024) | https://github.blog/news-insights/octoverse/octoverse-2024/ | 23/09/2026 | Paso 2 |
| 4 | 2025 Stack Overflow Developer Survey, Technology | Stack Overflow | https://survey.stackoverflow.co/2025/technology | 23/09/2026 | Paso 2 |
| 5 | TIOBE Programming Community Index | TIOBE Software | https://www.tiobe.com/tiobe-index/ | 23/09/2026 | Paso 2 |
| 6 | El tutorial de Python | Python Software Foundation | https://docs.python.org/es/3/tutorial/index.html | 23/09/2026 | Paso 2 |
| 7 | PEP 8, Style Guide for Python Code | G. van Rossum, B. Warsaw, A. Coghlan | https://peps.python.org/pep-0008/ | 23/09/2026 | Paso 2.3 |
| 8 | PEP 20, The Zen of Python | Tim Peters | https://peps.python.org/pep-0020/ | 23/09/2026 | Paso 2 |
| 9 | FastAPI | Sebastián Ramírez | https://fastapi.tiangolo.com/ | 23/09/2026 | Paso 2 |
| 10 | statsmodels documentation | S. Seabold, J. Perktold | https://www.statsmodels.org/stable/index.html | 23/09/2026 | Paso 2.3 |
| 11 | OpenCV modules, documentación 4.x | OpenCV | https://docs.opencv.org/4.x/ | 23/09/2026 | Paso 2 |
| 12 | Models and pre-trained weights, TorchVision | PyTorch Foundation | https://docs.pytorch.org/vision/stable/models.html | 23/09/2026 | Pasos 2 y 5 |
| 13 | Ultralytics YOLO Docs | Ultralytics | https://docs.ultralytics.com/ | 23/09/2026 | Pasos 2 y 5 |
| 14 | EasyOCR | Jaided AI (GitHub) | https://github.com/JaidedAI/EasyOCR | 23/09/2026 | Pasos 2 y 5 |
| 15 | The Model Hub | Hugging Face | https://huggingface.co/docs/hub/models-the-hub | 23/09/2026 | Paso 2 |
| 16 | JavaScript \| MDN | Mozilla | https://developer.mozilla.org/es/docs/Web/JavaScript | 23/09/2026 | Paso 2 |
| 17 | About Node.js | OpenJS Foundation | https://nodejs.org/en/about | 23/09/2026 | Paso 2 |
| 18 | Express | OpenJS Foundation | https://expressjs.com/ | 23/09/2026 | Paso 2 |
| 19 | TypeScript | Microsoft | https://www.typescriptlang.org/ | 23/09/2026 | Paso 2.3 |
| 20 | TensorFlow.js | Google | https://www.tensorflow.org/js | 23/09/2026 | Paso 2 |
| 21 | ONNX Runtime Web | Microsoft | https://onnxruntime.ai/docs/tutorials/web/ | 23/09/2026 | Paso 2 |
| 22 | Tesseract.js | naptha (GitHub) | https://github.com/naptha/tesseract.js | 23/09/2026 | Paso 2.3 |
| 23 | What is R? | The R Foundation | https://www.r-project.org/about.html | 23/09/2026 | Paso 2 |
| 24 | Shiny | Posit | https://shiny.posit.co/ | 23/09/2026 | Paso 2 |
| 25 | Plumber: an API generator for R | Posit, B. Schloerke | https://www.rplumber.io/ | 23/09/2026 | Paso 2 |
| 26 | torch for R | mlverse, Posit | https://torch.mlverse.org/ | 23/09/2026 | Paso 2 |
| 27 | Getting Started with C++ | Standard C++ Foundation | https://isocpp.org/get-started | 23/09/2026 | Paso 2 |
| 28 | PyTorch C++ API | PyTorch Foundation | https://docs.pytorch.org/cppdocs/ | 23/09/2026 | Paso 2 |
| 29 | What is PHP? | The PHP Group | https://www.php.net/manual/en/intro-whatis.php | 23/09/2026 | Paso 2 |
| 30 | GD, Image Processing and Generation | The PHP Group | https://www.php.net/manual/en/book.image.php | 23/09/2026 | Paso 2.3 |
| 31 | Rubix ML | Rubix ML (GitHub) | https://github.com/RubixML/ML | 23/09/2026 | Paso 2 |
| 32 | Learn Java, Dev.java | Oracle | https://dev.java/learn/ | 23/09/2026 | Paso 2 |
| 33 | Spring Boot | Spring (Broadcom) | https://spring.io/projects/spring-boot | 23/09/2026 | Paso 2 |
| 34 | Deep Java Library (DJL) | Amazon Web Services | https://docs.djl.ai/master/index.html | 23/09/2026 | Paso 2 |
| 35 | Protección de datos: Guía sobre el uso de videocámaras para seguridad y otras finalidades | Agencia Española de Protección de Datos (2025) | https://www.aepd.es/guias/guia-videovigilancia.pdf | 05/10/2026 | Paso 1 |
| 36 | Reglamento (UE) 2024/1689 de Inteligencia Artificial | Parlamento Europeo y Consejo, EUR-Lex (13/06/2024) | https://eur-lex.europa.eu/eli/reg/2024/1689/oj | 05/10/2026 | Paso 1 |
| 37 | PSeInt | Pablo Novara (SourceForge) | https://pseint.sourceforge.net/ | 05/10/2026 | Paso 3.4 |

---

## Uso de la IA

### Herramientas

| Herramienta | Quién | Para qué |
|---|---|---|
| Claude (Anthropic), en la app de escritorio | Julen | Montar la estructura del repo y de la web, hacer el código de la web (HTML, CSS y JS), buscar y comprobar fuentes, juntar las ramas y redactar partes del README |
| ChatGPT (OpenAI) y Gemini (Google) | Ander | Hacer los notebooks (`pseudocodigo.ipynb` y `demo_lenguajes.ipynb`) y trabajar sobre el repositorio |

Elegimos Claude porque podía trabajar directamente con los archivos de la carpeta del proyecto y probar la web en un navegador antes de entregárnosla, así que no teníamos que estar copiando y pegando código.

### Prompts más importantes

| Paso | Quién | Prompt (copiado tal cual o recortado) |
|---|---|---|
| Inicio | Julen y Ander | «En el curso de IA y Big Data, en la asignatura de programación de IA, tenemos que hacer este trabajo por parejas. Fíjate bien en la estructura que tiene que tener el trabajo, sus objetivos y los entregables. […] Queremos que hagas el README.md con la estructura de pasos tal y como son, mientras que el index.html queremos que sea más dinámica y visual» |
| Paso 1 | Julen y Ander | «Nosotros habíamos pensado en un parking de una empresa con muchos empleados. No solo que sea un parking de muchos empleados, sino que además tenga una parte que sea pública […] y también que tenga una zona para un supermercado. […] Desde tu punto de vista, ¿esto sería posible?» |
| Paso 1 | Julen y Ander | «Quiero también que el sistema guarde el id del ticket y lo asocie a la matrícula del coche del cliente, para que se vincule con lo que ha comprado el cliente» |
| Paso 2 | Julen y Ander | «Solo quiero que la página tenga un apartado de "fuentes" que tenga el link de la fuente (que sean fiables por favor). […] Haz hipervínculos de lo que explicas en cada momento del punto 2» |
| Paso 2 | Julen y Ander | «Antes me he confundido y te he pasado los datos de España. Te paso los archivos correctos. Por otro lado, me gustaría que añadieras una interpretación del gráfico» |
| Paso 3 | Julen y Ander | «En base a lo que hemos hecho hasta ahora, edita el punto 3. Me gustaría ver cómo haces el flujo general, aplicado a lo que te he comentado» |
| Paso 3 | Julen y Ander | «Queremos también que añadas de fuente la página de PSInt y que en el punto 3.4 digas que nos hemos basado en eso» |

### Cosas que corregimos o pedimos otra vez

| Qué propuso la IA o qué salió mal | Qué hicimos nosotros |
|---|---|
| La IA propuso guardar solo si el cliente había sido validado o no, sin relacionar la matrícula con la compra, para guardar los mínimos datos posibles | No le hicimos caso: decidimos guardar el id del ticket porque nos interesaba relacionar la estancia con la compra. A cambio pedimos que se añadieran las medidas de privacidad (avisar al cliente, limitar el acceso y borrar los datos pasado un tiempo) |
| La primera versión del paso 1 seguía el ejemplo del enunciado, con un operador subiendo imágenes | Le explicamos nuestro caso del parking y le pedimos que lo rehiciera entero |
| Los apartados de entradas, datos y salida eran párrafos muy largos | Pedimos separarlos por líneas, cada perfil en la suya |
| En el apartado de viabilidad metía demasiado texto | Le pedimos que dejara solo la diferencia entre la parte de IA y la parte de aplicación |
| La sección de fuentes ocupaba demasiado | Pedimos mostrar solo tres y un botón de «Ver más», y quitar la fecha de cada tarjeta |
| Le pasamos por error los CSV de España | Lo vimos nosotros, descargamos los mundiales y le pedimos que rehiciera la interpretación |
| La tabla de la comparativa costaba leerla | Pedimos colores, de rojo para las notas bajas a verde para las altas |
| Al juntar las ramas hubo conflicto en el pseudocódigo | La IA nos preguntó cuál dejar y elegimos la versión de Ander |

### Reflexión sobre el uso de la IA

La IA nos ha ayudado sobre todo con la parte técnica de la web. Hacer a mano un gráfico que lee los CSV, una matriz con pesos que se recalcula o un diagrama de flujo nos habría llevado mucho más tiempo del que teníamos. También nos ha venido bien para encontrar documentación oficial de cada lenguaje y para comprobar que los enlaces funcionaban.

Lo que no ha hecho por nosotros es decidir. El caso del parking con empleados, supermercado y público lo pensamos nosotros, igual que lo de guardar el ticket, que fue justo lo contrario de lo que nos proponía. Las puntuaciones de la comparativa y los pesos de la matriz los hemos revisado y tenemos que saber defenderlos, porque al final la nota tiene que tener sentido para nuestro caso y no solo sonar bien.

También hemos visto que hay que revisarlo todo. Muchas veces el resultado era correcto pero no era lo que queríamos (demasiado texto, demasiado largo, cosas que no pegaban con nuestro caso), y hemos tenido que pedir cambios varias veces. Y hay cosas que no puede hacer, como subir los cambios a GitHub con nuestra cuenta, que hemos tenido que hacer nosotros.

En resumen, nos ha servido para ir más rápido y aprender cómo se hacen cosas que no sabíamos, pero las ideas y las decisiones del trabajo son nuestras.

---

## Enlaces

- Web: https://matriculator.netlify.app
- Repositorio: https://github.com/altu44/proyecto-ra1
- [`pseudocodigo.ipynb`](pseudocodigo.ipynb)
- [`demo_lenguajes.ipynb`](demo_lenguajes.ipynb)
- [`data/trends_web.csv`](data/trends_web.csv) y [`data/trends_youtube.csv`](data/trends_youtube.csv)
