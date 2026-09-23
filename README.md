# 🚗 Matriculator — Propuesta técnica de una aplicación de IA

> **Trabajo grupal RA1 · Programación de Inteligencia Artificial**
> Curso de Especialización en Inteligencia Artificial y Big Data
>
> *RA1. Caracteriza lenguajes de programación valorando su idoneidad en el desarrollo de Inteligencia Artificial.*

| | |
|---|---|
| **Integrantes** | Julen Altuna · Ander Ameztoy |
| **Aplicación elegida** | Opción B — **Matriculator**: lectura de matrículas en un parking de empresa con zona pública y zona de supermercado |
| **Web publicada (Netlify)** | 🔗 _https://TU-SITIO.netlify.app_ |
| **Repositorio** | 🔗 https://github.com/altu44/proyecto-ra1 |
| **Fecha de entrega** | _dd/mm/aaaa_ |

> ⚠️ **No se implementa ni se entrena ningún modelo.** Es una propuesta técnica fundamentada. Todos los datos usados son ficticios, anónimos o abiertos. No se suben claves ni datos personales.

---

## 📑 Índice

1. [Estructura del repositorio](#-estructura-del-repositorio)
2. [Organización del grupo y temporalización](#-1-organización-del-grupo-y-temporalización)
3. [Desarrollo del trabajo](#-2-desarrollo-del-trabajo)
   - [Paso 1 · Aplicación hipotética](#paso-1--define-una-aplicación-hipotética)
   - [Paso 2 · Comparativa de lenguajes y decisión](#paso-2--compara-lenguajes-y-toma-una-decisión)
   - [Paso 3 · Partes del programa](#paso-3--explica-las-partes-del-programa)
   - [Paso 4 · Marcado y formatos de datos](#paso-4--selecciona-marcado-y-formatos-de-datos)
   - [Paso 5 · Preguntas adicionales](#paso-5--preguntas-adicionales)
4. [Fuentes consultadas](#-3-fuentes-consultadas)
5. [Evidencias del uso de IA generativa](#-4-evidencias-del-uso-de-ia-generativa)
6. [Enlaces verificables](#-5-enlaces-verificables)

---

## 📁 Estructura del repositorio

```
proyecto-ra1/
├── index.html               # Web: desarrollo técnico del trabajo (publicada en Netlify)
├── styles.css               # Estilos de la web
├── script.js                # Interactividad: gráfico de Trends, matriz, diagramas…
├── README.md                # Organización, temporalización, fuentes, IA y preguntas
├── data/
│   ├── trends_web.csv       # Exportación Google Trends — Búsqueda web
│   └── trends_youtube.csv   # Exportación Google Trends — Búsqueda en YouTube
├── assets/                  # Imágenes, diagramas y capturas propias
│   └── ia/                  # Capturas de las conversaciones con IA (evidencias)
├── pseudocodigo.ipynb       # Paso 3 · Pseudocódigo comentado (20–50 líneas)
└── demo_lenguajes.ipynb     # Paso 4 · Demo de lectura de HTML, CSV y JSON
```

### 🌿 Flujo de trabajo con ramas (Git)

| Rama | Responsable | Contenido |
|---|---|---|
| `main` | Ambos (solo merges revisados) | Versión estable que se despliega en Netlify |
| `julen` | Julen | Paso 2 (Trends + gráfico), Paso 3, partes compartidas asignadas |
| `ander` | Ander | Paso 2 (características + comparativa), Paso 4, partes compartidas asignadas |

Cada integrante trabaja en su rama y abre un **Pull Request** hacia `main`; el otro lo revisa antes de hacer merge. Así queda evidencia de quién ha hecho qué (commits) y de la revisión cruzada.

---

## 👥 1. Organización del grupo y temporalización

> Rúbrica · Criterio 1 (1,5 pt): tareas vinculadas a entregables, responsables, distribución equilibrada, tiempo previsto/real/revisado y **reflexión**.

**Reparto general:** los Pasos 1, 2 y 5 se hacen entre los dos (dividiendo subtareas para que sea equilibrado); el **Paso 3** lo hace **Julen** y el **Paso 4** lo hace **Ander**. Disponemos de **5 h de clase**; el resto se completa en casa.

| # | Tarea | Entregable vinculado | Responsable | Rama | Tiempo previsto | Tiempo invertido | Desviación | Dónde (clase/casa) | Estado |
|---|---|---|---|---|---|---|---|---|---|
| T1 | Crear repo, ramas, estructura y Netlify | Repo + URL Netlify | Julen | `main` | 0,5 h | | | Clase | ⬜ |
| T2 | Definir la aplicación (problema, entradas, datos, proceso, salida, riesgos, decisión humana) | Paso 1 (web) | Ambos | ambas | 0,5 h c/u | | | Clase | ⬜ |
| T3 | Google Trends (web + YouTube), exportar CSV e interpretar | `data/*.csv` + gráfico web | Julen | `julen` | 1 h | | | Clase | ⬜ |
| T4 | Características de los 6 lenguajes y comparativa por criterios | Paso 2 (tabla comparativa) | Ander | `ander` | 1,5 h | | | Clase + casa | ⬜ |
| T5 | Matriz de decisión, decisiones finales y descarte razonado | Paso 2 (matriz) | Ambos | ambas | 1 h c/u | | | Clase | ⬜ |
| T6 | Flujo general (6–10 etapas) y diagramas antes/después del modelo | Paso 3 (diagramas) | Julen | `julen` | 1,5 h | | | Casa | ⬜ |
| T7 | Pseudocódigo comentado (20–50 líneas) | `pseudocodigo.ipynb` | Julen | `julen` | 1,5 h | | | Casa | ⬜ |
| T8 | HTML, XML, JSON, Markdown y CSV: qué son y dónde intervienen | Paso 4 (web) | Ander | `ander` | 1,5 h | | | Casa | ⬜ |
| T9 | Notebook de demo (librerías Python/R, HTML y JSON inventados) | `demo_lenguajes.ipynb` | Ander | `ander` | 1,5 h | | | Casa | ⬜ |
| T10 | Preguntas adicionales (IA débil/fuerte · preentrenado/desde cero) | Paso 5 (README + web) | Ambos (una pregunta cada uno + revisión cruzada) | ambas | 0,5 h c/u | | | Clase | ⬜ |
| T11 | Fuentes, evidencias de IA y reflexiones | README | Ambos | ambas | 1 h c/u | | | Casa | ⬜ |
| T12 | Integrar en `index.html`, merge a `main` y despliegue | Web Netlify | Ambos | `main` | 1 h c/u | | | Clase | ⬜ |
| T13 | Revisión final con la rúbrica | Todo | Ambos | `main` | 0,5 h c/u | | | Clase | ⬜ |
| | **TOTAL** | | | | **Julen ≈ 9 h · Ander ≈ 9 h** | | | | |

> 💡 **Cómo rellenar:** apuntad las horas reales al terminar cada sesión. *Desviación* = invertido − previsto. Estado: ⬜ pendiente · 🟨 en curso · ✅ hecho.

### 🔄 Revisión de la planificación

| Fecha | Qué cambió respecto al plan | Motivo | Ajuste realizado |
|---|---|---|---|
| _dd/mm_ | _p. ej. Google Trends llevó más tiempo por la ambigüedad de «R» y «Java»_ | | _Se reasignó 0,5 h de T12_ |
| | | | |

### 💭 Reflexión del equipo sobre la organización y la temporalización

> *(0,5 pt — la parte que más puntúa del criterio 1. Escribidla entre los dos al final.)*

- ¿El reparto fue equilibrado? ¿Por qué sí/no?
- ¿Qué tareas se desviaron más del tiempo previsto y por qué?
- ¿Cómo funcionó el trabajo con ramas y Pull Requests? ¿Hubo conflictos de merge?
- ¿Qué haríais diferente en el siguiente trabajo?

_Texto de la reflexión…_

---

## 🧠 2. Desarrollo del trabajo

> El desarrollo técnico completo (con gráficos, diagramas y matriz interactiva) está en la **web**: 🔗 _https://TU-SITIO.netlify.app_. Aquí se resume cada paso.

### Paso 1 · Define una aplicación hipotética

**Opción elegida: B — Matriculator**, adaptada a nuestro caso: el parking de una **empresa con muchos empleados** que también tiene una **zona pública de pago por tiempo** y una **zona para clientes de un supermercado**.

#### El problema

Un único parking con tres tipos de usuario. Hoy se controla con tarjetas y tiques de papel que se pierden, generan colas en la barrera y obligan a tener personal en la salida. Queremos que una cámara en la entrada y otra en la salida lean la matrícula y que el sistema sepa si el coche es de un **empleado**, de un **cliente del supermercado** o de **público**.

**Qué NO pretende:** identificar personas, vigilar a los empleados (horarios, fichajes) ni sancionar automáticamente. Es un estudio con imágenes de prueba y datos ficticios.

#### Entradas

- **Cámara de entrada:** imagen del coche al entrar (en el estudio: ficticia o de banco de pruebas) + configuración de la cámara (id, resolución, ángulo, iluminación).
- **Cámara de salida:** imagen del coche al salir.
- **TPV del supermercado:** matrícula que teclea el cajero al cobrar + **id del ticket** de esa compra (lo añade el TPV automáticamente).
- **Recursos Humanos:** alta y baja de matrículas de empleados.

#### Datos

- **Para la IA:** imágenes de prueba anotadas (caja de la matrícula + texto correcto), sin personas identificables.
- **Empleados:** matrícula + id interno del empleado (máx. 2 vehículos por persona).
- **Validaciones de clientes:** matrícula + **id del ticket** + fecha y hora + caja. El detalle de la compra se queda en el sistema del supermercado y se consulta con el id del ticket.
- **Movimientos:** entradas y salidas (matrícula, hora, cámara, confianza de la lectura).
- **Tarifas:** minutos gratuitos, precio por hora y tope diario.

Todos los datos del trabajo son ficticios.

#### Procesamiento

1. **Imagen:** validar el fichero y prepararlo (redimensionar, normalizar, contraste).
2. **Lectura (IA):** el modelo detecta la matrícula, el OCR la lee y se comprueban formato y confianza.
3. **Clasificación:** ¿está en el registro de empleados? → empleado · si no, ¿tiene hoy un ticket asociado? → cliente · si no → público.
4. **Cálculo:** en la salida, tiempo de estancia e importe según el perfil.

#### Salida

- 👔 **Empleado:** barrera abierta, sin pagar.
- 🛒 **Cliente validado:** gratis si no supera el tiempo gratuito; si lo supera, paga solo el exceso. Se guarda el id del ticket junto al movimiento.
- 🅿️ **Público:** paga según el tiempo, con tope diario.
- ⚠️ **Lectura dudosa:** confianza baja o matrícula sin entrada registrada → aviso al personal por el interfono.
- 📝 **Registro:** de cada movimiento se guarda matrícula, perfil, horas, importe e id del ticket (si lo hay).

#### Reglas del sistema (valores de ejemplo)

| Perfil | Cómo se reconoce | Qué pasa en la salida |
|---|---|---|
| 👔 Empleado | La matrícula está en el registro de empleados | Gratis, barrera abierta |
| 🛒 Cliente del supermercado | El cajero apuntó la matrícula hoy y quedó asociada a un **id de ticket** | Gratis los primeros **90 min**; después paga el exceso |
| 🅿️ Público | Ninguna de las anteriores | Paga **2,40 €/h** (por minuto), tope **18 €/día** |
| ⚠️ Lectura dudosa | Confianza < **0,80** | Revisión humana por interfono |

> ✏️ Los minutos gratuitos, la tarifa y el tope son valores de ejemplo: están en `script.js` → `REGLAS` y en la web hay un **simulador** para probarlos.

#### Parte de IA y parte de aplicación

- 🤖 **Parte de IA:** solo **detectar y leer la matrícula** en la imagen (visión por computador + OCR). Es la única parte que necesita un modelo.
- 🖥️ **Parte de aplicación:** **clasificar** (empleado / cliente / público), **asociar el ticket** y **calcular el importe** son reglas y consultas a una base de datos. No hace falta IA.

#### Riesgos y límites

- **Privacidad (RGPD):** la matrícula es un dato personal. El registro de empleados solo guarda matrícula + id interno; se informa a la plantilla y no se usa para controlar horarios.
- **Vínculo matrícula ↔ ticket:** al asociar la matrícula al id del ticket se puede saber qué ha comprado el cliente. Es un dato más sensible: hay que avisar al cliente (cartel y ticket), guardar solo el id del ticket (el detalle sigue en el sistema del supermercado), limitar quién puede consultarlo y borrarlo pasado un plazo.
- **Retención mínima:** se guarda el resultado, no la imagen.
- **Errores de lectura:** 0/O, 8/B, suciedad, noche, ángulo → umbral de confianza y revisión.
- **Errores humanos:** el cajero puede teclear mal la matrícula → el TPV sugiere las matrículas que han entrado hoy.
- **Casos especiales:** coches de empresa compartidos, cambios de coche, matrículas extranjeras, remolques.

#### Decisiones que siguen siendo humanas

- **Cajero:** decide validar al cliente y apunta la matrícula con su ticket.
- **Personal del parking:** lecturas dudosas y reclamaciones (busca el ticket y corrige la validación).
- **Recursos Humanos:** alta y baja de matrículas de empleados.
- **La IA** solo lee la matrícula: no decide cobros ni sanciones.

### Paso 2 · Compara lenguajes y toma una decisión

Lenguajes comparados: **Python, JavaScript/Node.js, R, C++, PHP y Java**.

#### 2.1 Google Trends

| Dato | Valor |
|---|---|
| Lenguajes | Python, JavaScript, Java, PHP, C++ y R (como tema «Lenguaje de programación») |
| Ámbito | Todo el mundo |
| Periodo | Búsqueda web: 2004 – sep. 2026 · YouTube: 2008 – sep. 2026 (primer año con datos) |
| Fecha de descarga | 23/09/2026 |
| Archivos | [`data/trends_web.csv`](data/trends_web.csv) · [`data/trends_youtube.csv`](data/trends_youtube.csv) |

- El gráfico de la web se genera **leyendo esos CSV** (no es una captura). Se puede ver por meses o por media anual.
- **Avisos sobre los datos:** en YouTube faltan los meses de enero a julio de 2017 (vienen a 0 en la exportación de Google Trends; la web los trata como hueco). Septiembre de 2026 es un mes incompleto.

**Interpretación** (medias anuales calculadas con los CSV):

| | Búsqueda web | YouTube |
|---|---|---|
| **Python** | Plano (~5–6) hasta 2013; sube desde 2014 y es el **primero desde 2019**. Máximo en 2022 (26,5) y 2026 (25) | Crece desde 2018, lidera de 2020 a 2023 (máximo 70 en 2023) |
| **Java** | Dominaba en 2004 (93) y cae hasta ~12 | Pico en 2016 (90); vuelve a ser el primero en 2024–2026 (~70–75) |
| **JavaScript** | Muy estable: 10–17 desde 2010 | Sube hasta 2023 (48) y baja a 24 en 2026 |
| **PHP / C++** | Caída sostenida (PHP 38 → 5; C++ 27 → 5) | Bajos; PHP cae a 5 |
| **R** | Siempre por debajo de 6 | Algo más de peso (15–22 desde 2016) |

**Conclusiones para Matriculator:**

1. **Python** es el lenguaje con más impulso en las dos fuentes y su subida coincide con el auge de la IA y la ciencia de datos (coherente con GitHub Octoverse 2024 y Stack Overflow 2025) → refuerza elegirlo para la parte de IA.
2. **JavaScript** mantiene un interés estable: tecnología madura y con mucho material → adecuada para la parte web.
3. **Java** conserva mucho interés, sobre todo en vídeos de aprendizaje, pero no ligado a la IA → alternativa para backend, no para el modelo.
4. **PHP, C++ y R** tienen poco interés relativo o en descenso → apoya descartarlos para la IA.

> ⚠️ Límites: Trends mide interés de búsqueda relativo, no uso real. En YouTube faltan enero–julio de 2017 y tras el hueco los valores bajan de golpe (posible cambio de escala), así que se comparan tendencias, no cifras exactas.

#### 2.2 Características y comparativa

| Criterio | Python | JS / Node.js | R | C++ | PHP | Java |
|---|---|---|---|---|---|---|
| Facilidad de aprendizaje | | | | | | |
| Legibilidad | | | | | | |
| Mantenimiento | | | | | | |
| Integración web, APIs, BBDD | | | | | | |
| Trabajo con datos (imágenes) | | | | | | |
| Análisis estadístico | | | | | | |
| Bibliotecas y modelos de IA | | | | | | |
| Reutilizar modelos preentrenados | | | | | | |
| Rendimiento, despliegue, docs, comunidad | | | | | | |
| Interfaz web | | | | | | |

#### 2.3 Matriz de decisión

Pesos (suman 100 %) × puntuación (1–5). Ver la matriz interactiva en la web.

| Criterio | Peso | Python | JS/Node | R | C++ | PHP | Java |
|---|---|---|---|---|---|---|---|
| … | … | | | | | | |
| **Total ponderado** | 100 % | | | | | | |

#### 2.4 Decisiones

- 🖥️ **Lenguaje principal para la aplicación:** _…_ — porque _…_
- 🤖 **Lenguaje principal para la IA:** _…_ — porque _…_
- ❓ **Si son distintos, ¿por qué?** _…_
- ❌ **Descarte razonado para la parte de IA:** R (_…_), C++ (_…_), PHP (_…_), Java (_…_), JavaScript (_…_).

### Paso 3 · Explica las partes del programa

> Responsable: **Julen**

#### 3.1 Flujo general (10 etapas)

Recorrido de un coche desde que llega a la barrera de entrada hasta que sale. 🤖 = parte de IA · 🖥️ = aplicación (reglas y BBDD) · 🧑‍⚖️ = interviene una persona.

| # | Etapa | Tipo | Qué ocurre |
|---|---|---|---|
| 1 | Llegada a la entrada | 🖥️ | Un sensor detecta el coche y la cámara de entrada toma una imagen |
| 2 | Validar y preparar | 🖥️ | Se comprueba la imagen (formato, tamaño) y se redimensiona / normaliza |
| 3 | Leer la matrícula | 🤖 | El detector localiza la matrícula y el OCR la lee; se comprueban formato y confianza |
| 4 | ¿Lectura fiable? | 🧑‍⚖️ | Si la confianza es < 0,80, el personal la comprueba por interfono y la corrige |
| 5 | Registrar la entrada | 🖥️ | Se guarda matrícula + hora (no la imagen) y se abre la barrera |
| 6 | Validación en caja *(opcional)* | 🧑‍⚖️ | Si compra en el supermercado, el cajero apunta la matrícula y se asocia al **id del ticket** |
| 7 | Llegada a la salida | 🤖 | La cámara de salida repite la lectura (etapas 2–4) |
| 8 | Clasificar el coche | 🖥️ | ¿Empleado? → ¿ticket hoy? → si no, público |
| 9 | Calcular el importe | 🖥️ | Empleado 0 € · cliente gratis 90 min y después el exceso · público 2,40 €/h (tope 18 €) |
| 10 | Resultado y salida | 🖥️ | Pago si corresponde, barrera y registro mínimo; reclamaciones al personal |

#### 3.2 Diagrama de decisión en la salida

```
Coche en la salida → 🤖 Leer matrícula → ¿Confianza ≥ 0,80?
    ├─ No → 🧑‍⚖️ Revisión humana → (matrícula confirmada) ─┐
    └─ Sí ──────────────────────────────────────────────┴→ ¿Está en empleados?
                                                              ├─ Sí → 👔 Empleado · 0 €
                                                              └─ No → ¿Tiene ticket hoy?
                                                                        ├─ No → 🅿️ Público · 2,40 €/h (tope 18 €)
                                                                        └─ Sí → ¿Estancia ≤ 90 min?
                                                                                  ├─ Sí → 🛒 Cliente · gratis
                                                                                  └─ No → 🛒 Cliente · paga el exceso
```

La IA solo interviene al leer la matrícula; el resto son **reglas** que consultan la base de datos. En todos los casos se guarda un registro mínimo, nunca la imagen.

#### 3.3 Etapas y componentes del programa

- **Antes de integrar el modelo:** recoger imágenes de prueba (día, noche, lluvia, ángulo) → anotar (caja + texto) → preparar y dividir los datos → elegir detector y OCR preentrenados → ajustar con matrículas españolas y elegir el umbral (0,80) → exportar el modelo y crear las BBDD de prueba (empleados, tickets, movimientos, tarifas).
- **Después de integrar el modelo:** cargar el modelo → recibir la imagen de la cámara → leer la matrícula → decidir según el umbral → aplicar las reglas (registrar / clasificar / calcular) → registrar y revisar las correcciones humanas para mejorar el modelo.

#### 3.4 Pseudocódigo

[`pseudocodigo.ipynb`](pseudocodigo.ipynb) — 49 líneas en Python que describen **la salida del parking**: `leer_matricula()` (IA), `clasificar()` y `calcular_importe()` (reglas), umbral de confianza con revisión humana, `try/except` y registro en CSV sin la imagen. Se puede ejecutar gracias a un detector, un OCR y unas BBDD **simulados** con cuatro coches ficticios (empleado, cliente con ticket, lectura dudosa corregida por una persona e imagen no válida).

### Paso 4 · Selecciona marcado y formatos de datos

> Responsable: **Ander**

| Formato | Tipo | Qué es / para qué sirve | Dónde interviene en Matriculator |
|---|---|---|---|
| **HTML** | Lenguaje de marcado | | |
| **XML** | Lenguaje de marcado | | |
| **JSON** | Intercambio de datos | | |
| **Markdown** | Marcado ligero | | |
| **CSV** | Datos tabulares | | |

Notebook: [`demo_lenguajes.ipynb`](demo_lenguajes.ipynb) — librerías de Python para HTML/CSV/JSON, tabla de equivalentes en R, HTML inventado de la interfaz y JSON inventado de datos de entrada sintéticos.

### Paso 5 · Preguntas adicionales

#### ¿La solución es IA débil o se aproxima a IA fuerte? Justifica.

_Respuesta…_

#### ¿Usarías un modelo preentrenado o entrenarías desde cero? Razona la respuesta.

_Respuesta…_

#### Límites de la solución

_Respuesta…_

---

## 📚 3. Fuentes consultadas

> Rúbrica · Criterio 3 (1,5 pt): priorizar **documentación oficial, organismos públicos o fuentes con autoría y fecha**. Cada referencia con **título, entidad, URL y fecha de consulta**.

| # | Título | Entidad / autor | URL | Fecha de consulta | Usada en |
|---|---|---|---|---|---|
| 1 | Google Trends | Google | https://trends.google.es/trends/ | 23/09/2026 | Paso 2.1 |
| 2 | Preguntas frecuentes sobre los datos de Google Trends | Google · Ayuda de Tendencias de búsqueda | https://support.google.com/trends/answer/4365533?hl=es | 23/09/2026 | Paso 2.1 |
| 3 | Octoverse: AI leads Python to top language as the number of global developers surges | GitHub Staff · GitHub Blog, 29/10/2024 | https://github.blog/news-insights/octoverse/octoverse-2024/ | 23/09/2026 | Paso 2.1 · 2.3 |
| 4 | 2025 Stack Overflow Developer Survey — Technology | Stack Overflow | https://survey.stackoverflow.co/2025/technology | 23/09/2026 | Paso 2.1 · 2.3 |
| 5 | TIOBE Programming Community Index | TIOBE Software | https://www.tiobe.com/tiobe-index/ | 23/09/2026 | Paso 2.1 · 2.3 |
| 6 | El tutorial de Python | Python Software Foundation | https://docs.python.org/es/3/tutorial/index.html | 23/09/2026 | Paso 2.2 · 2.3 |
| 7 | PEP 8 – Style Guide for Python Code | G. van Rossum, B. Warsaw, A. Coghlan · python.org | https://peps.python.org/pep-0008/ | 23/09/2026 | Paso 2.3 |
| 8 | PEP 20 – The Zen of Python | Tim Peters · python.org | https://peps.python.org/pep-0020/ | 23/09/2026 | Paso 2.2 · 2.3 |
| 9 | FastAPI | Sebastián Ramírez (tiangolo) | https://fastapi.tiangolo.com/ | 23/09/2026 | Paso 2.3 · 2.5 |
| 10 | statsmodels documentation | statsmodels (S. Seabold, J. Perktold) | https://www.statsmodels.org/stable/index.html | 23/09/2026 | Paso 2.3 |
| 11 | OpenCV modules — documentación 4.x | OpenCV | https://docs.opencv.org/4.x/ | 23/09/2026 | Paso 2.2 · 2.3 · 2.5 |
| 12 | Models and pre-trained weights — TorchVision | PyTorch Foundation | https://docs.pytorch.org/vision/stable/models.html | 23/09/2026 | Paso 2.2 · 2.3 · 2.5 |
| 13 | Ultralytics YOLO Docs | Ultralytics | https://docs.ultralytics.com/ | 23/09/2026 | Paso 2.2 · 2.3 · 2.5 |
| 14 | EasyOCR (repositorio oficial) | Jaided AI · GitHub | https://github.com/JaidedAI/EasyOCR | 23/09/2026 | Paso 2.2 · 2.3 · 2.5 |
| 15 | The Model Hub | Hugging Face | https://huggingface.co/docs/hub/models-the-hub | 23/09/2026 | Paso 2.2 · 2.3 |
| 16 | JavaScript \| MDN | Mozilla | https://developer.mozilla.org/es/docs/Web/JavaScript | 23/09/2026 | Paso 2.2 · 2.3 · 2.5 |
| 17 | About Node.js | OpenJS Foundation | https://nodejs.org/en/about | 23/09/2026 | Paso 2.2 · 2.3 · 2.5 |
| 18 | Express — framework web para Node.js | OpenJS Foundation | https://expressjs.com/ | 23/09/2026 | Paso 2.2 · 2.3 · 2.5 |
| 19 | TypeScript: JavaScript With Syntax For Types | Microsoft | https://www.typescriptlang.org/ | 23/09/2026 | Paso 2.3 |
| 20 | TensorFlow.js | Google | https://www.tensorflow.org/js | 23/09/2026 | Paso 2.2 · 2.3 · 2.5 |
| 21 | ONNX Runtime Web | Microsoft · ONNX Runtime | https://onnxruntime.ai/docs/tutorials/web/ | 23/09/2026 | Paso 2.2 · 2.3 · 2.5 |
| 22 | Tesseract.js (repositorio oficial) | naptha · GitHub | https://github.com/naptha/tesseract.js | 23/09/2026 | Paso 2.3 |
| 23 | What is R? | The R Foundation | https://www.r-project.org/about.html | 23/09/2026 | Paso 2.2 · 2.3 · 2.5 |
| 24 | Shiny | Posit | https://shiny.posit.co/ | 23/09/2026 | Paso 2.2 · 2.3 |
| 25 | Plumber: an API generator for R | Posit · B. Schloerke | https://www.rplumber.io/ | 23/09/2026 | Paso 2.3 · 2.5 |
| 26 | torch for R | mlverse · Posit | https://torch.mlverse.org/ | 23/09/2026 | Paso 2.2 · 2.3 |
| 27 | Getting Started with C++ | Standard C++ Foundation (isocpp.org) | https://isocpp.org/get-started | 23/09/2026 | Paso 2.2 · 2.3 |
| 28 | PyTorch C++ API | PyTorch Foundation | https://docs.pytorch.org/cppdocs/ | 23/09/2026 | Paso 2.2 · 2.3 · 2.5 |
| 29 | What is PHP? | The PHP Group · php.net | https://www.php.net/manual/en/intro-whatis.php | 23/09/2026 | Paso 2.2 · 2.3 |
| 30 | GD — Image Processing and Generation | The PHP Group · php.net | https://www.php.net/manual/en/book.image.php | 23/09/2026 | Paso 2.3 |
| 31 | Rubix ML (repositorio oficial) | Rubix ML · GitHub | https://github.com/RubixML/ML | 23/09/2026 | Paso 2.2 · 2.3 · 2.5 |
| 32 | Learn Java — Dev.java | Oracle | https://dev.java/learn/ | 23/09/2026 | Paso 2.2 · 2.3 |
| 33 | Spring Boot | Spring (Broadcom) | https://spring.io/projects/spring-boot | 23/09/2026 | Paso 2.2 · 2.3 |
| 34 | Deep Java Library (DJL) | DJL · Amazon Web Services | https://docs.djl.ai/master/index.html | 23/09/2026 | Paso 2.2 · 2.3 · 2.5 |

> En la web, cada dato del Paso 2 lleva un número **[n]** que enlaza a su fuente en la sección **📚 Fuentes**. Las fuentes de los Pasos 1, 3, 4 y 5 (AEPD, Reglamento europeo de IA, W3C, IETF…) se añadirán al trabajarlos.

---

## 🤖 4. Evidencias del uso de IA generativa

> Rúbrica · Criterio 4 (2,5 pt). **No bastan capturas sueltas.** Se incluyen los prompts relevantes de cada etapa y de **ambos** miembros, las repreguntas/correcciones, la justificación de las herramientas y una reflexión conjunta.

### 4.1 Herramientas utilizadas y justificación

| Herramienta | Quién la usó | Para qué | Por qué esta herramienta |
|---|---|---|---|
| Claude (Anthropic) | Julen | Estructura del repo, README, plantilla web | _…_ |
| _ChatGPT / Copilot / Gemini…_ | Ander | _…_ | _…_ |

### 4.2 Prompts por etapa

| Paso | Miembro | Prompt (literal) | Qué aportó | Evidencia |
|---|---|---|---|---|
| Organización | Julen | _«En el curso de IA y Big Data… queremos que hagas el README.md con la estructura de pasos…»_ | Estructura del repo, README y web base | `assets/ia/…png` |
| Paso 1 | Julen | _«Nosotros habíamos pensado en un parking de una empresa con muchos empleados… que tenga una parte que sea pública (pago por tiempo) y también una zona para un supermercado… que el cajero tenga un apartado de apuntar la matrícula del cliente… ¿Esto sería posible?»_ | Confirmó la viabilidad, separó parte de IA / parte de aplicación, propuso reglas y un simulador | `assets/ia/…png` |
| Paso 1 | Julen | _«…quiero también que el sistema guarde el id del ticket y lo asocie a la matrícula del coche del cliente, para que se vincule con lo que ha comprado el cliente.»_ | Añadió el id del ticket a entradas, datos, salida y simulador, y los riesgos de privacidad asociados | `assets/ia/…png` |
| Paso 2 | | | | |
| Paso 3 | Julen | | | |
| Paso 4 | Ander | | | |
| Paso 5 | | | | |

### 4.3 Repreguntas, cambios y correcciones

| # | Respuesta inicial de la IA | Qué detectamos | Repregunta / corrección | Resultado final |
|---|---|---|---|---|
| 1 | La IA propuso guardar solo «validada sí/no» y no vincular la matrícula con la compra (mínimos datos) | Queríamos poder saber qué ha comprado cada cliente | Pedimos guardar el **id del ticket** asociado a la matrícula | **Decisión humana contra la propuesta de la IA:** se guarda el id del ticket; a cambio se añaden medidas de privacidad (aviso al cliente, acceso limitado, borrado) |
| 2 | Información de «Entradas / Datos / Salida» en párrafos largos | Difícil de leer | Pedimos separar por líneas cada perfil (empleado, cliente, público…) | Cada bloque dividido en filas con listas |

### 4.4 Reflexión conjunta sobre el uso de la IA

> *(1 pt — la parte que más puntúa del criterio 4.)*

- **En qué nos ha ayudado:** _…_
- **En qué no nos ha ayudado / errores que cometió:** _…_
- **Errores que evitamos gracias a revisarla:** _…_
- **Decisiones humanas que tomamos contradiciendo a la IA:** _…_
- **Conclusión:** _…_

---

## 🔗 5. Enlaces verificables

- 🌐 Web publicada: _https://TU-SITIO.netlify.app_
- 💾 Repositorio: https://github.com/altu44/proyecto-ra1
- 📓 [`pseudocodigo.ipynb`](pseudocodigo.ipynb)
- 📓 [`demo_lenguajes.ipynb`](demo_lenguajes.ipynb)
- 📊 [`data/trends_web.csv`](data/trends_web.csv) · [`data/trends_youtube.csv`](data/trends_youtube.csv)
