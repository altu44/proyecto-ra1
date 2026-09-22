# 🚗 Matriculator — Propuesta técnica de una aplicación de IA

> **Trabajo grupal RA1 · Programación de Inteligencia Artificial**
> Curso de Especialización en Inteligencia Artificial y Big Data
>
> *RA1. Caracteriza lenguajes de programación valorando su idoneidad en el desarrollo de Inteligencia Artificial.*

| | |
|---|---|
| **Integrantes** | Julen Altuna · _Nombre del compañero/a_ |
| **Aplicación elegida** | Opción B — **Matriculator** (detección de matrículas en imágenes de prueba) |
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
│   ├── trends_youtube.csv   # Exportación Google Trends — Búsqueda en YouTube
│   └── ejemplo/             # CSV de EJEMPLO (solo para probar la web, borrar al final)
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
| `companero` | _Compañero/a_ | Paso 2 (características + comparativa), Paso 4, partes compartidas asignadas |

Cada integrante trabaja en su rama y abre un **Pull Request** hacia `main`; el otro lo revisa antes de hacer merge. Así queda evidencia de quién ha hecho qué (commits) y de la revisión cruzada.

---

## 👥 1. Organización del grupo y temporalización

> Rúbrica · Criterio 1 (1,5 pt): tareas vinculadas a entregables, responsables, distribución equilibrada, tiempo previsto/real/revisado y **reflexión**.

**Reparto general:** los Pasos 1, 2 y 5 se hacen entre los dos (dividiendo subtareas para que sea equilibrado); el **Paso 3** lo hace **Julen** y el **Paso 4** lo hace **_compañero/a_**. Disponemos de **5 h de clase**; el resto se completa en casa.

| # | Tarea | Entregable vinculado | Responsable | Rama | Tiempo previsto | Tiempo invertido | Desviación | Dónde (clase/casa) | Estado |
|---|---|---|---|---|---|---|---|---|---|
| T1 | Crear repo, ramas, estructura y Netlify | Repo + URL Netlify | Julen | `main` | 0,5 h | | | Clase | ⬜ |
| T2 | Definir la aplicación (problema, entradas, datos, proceso, salida, riesgos, decisión humana) | Paso 1 (web) | Ambos | ambas | 0,5 h c/u | | | Clase | ⬜ |
| T3 | Google Trends (web + YouTube), exportar CSV e interpretar | `data/*.csv` + gráfico web | Julen | `julen` | 1 h | | | Clase | ⬜ |
| T4 | Características de los 6 lenguajes y comparativa por criterios | Paso 2 (tabla comparativa) | _Compañero/a_ | `companero` | 1,5 h | | | Clase + casa | ⬜ |
| T5 | Matriz de decisión, decisiones finales y descarte razonado | Paso 2 (matriz) | Ambos | ambas | 1 h c/u | | | Clase | ⬜ |
| T6 | Flujo general (6–10 etapas) y diagramas antes/después del modelo | Paso 3 (diagramas) | Julen | `julen` | 1,5 h | | | Casa | ⬜ |
| T7 | Pseudocódigo comentado (20–50 líneas) | `pseudocodigo.ipynb` | Julen | `julen` | 1,5 h | | | Casa | ⬜ |
| T8 | HTML, XML, JSON, Markdown y CSV: qué son y dónde intervienen | Paso 4 (web) | _Compañero/a_ | `companero` | 1,5 h | | | Casa | ⬜ |
| T9 | Notebook de demo (librerías Python/R, HTML y JSON inventados) | `demo_lenguajes.ipynb` | _Compañero/a_ | `companero` | 1,5 h | | | Casa | ⬜ |
| T10 | Preguntas adicionales (IA débil/fuerte · preentrenado/desde cero) | Paso 5 (README + web) | Ambos (una pregunta cada uno + revisión cruzada) | ambas | 0,5 h c/u | | | Clase | ⬜ |
| T11 | Fuentes, evidencias de IA y reflexiones | README | Ambos | ambas | 1 h c/u | | | Casa | ⬜ |
| T12 | Integrar en `index.html`, merge a `main` y despliegue | Web Netlify | Ambos | `main` | 1 h c/u | | | Clase | ⬜ |
| T13 | Revisión final con la rúbrica | Todo | Ambos | `main` | 0,5 h c/u | | | Clase | ⬜ |
| | **TOTAL** | | | | **Julen ≈ 9 h · _Compa_ ≈ 9 h** | | | | |

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

**Opción elegida: B — Matriculator.** Una empresa de aparcamientos quiere estudiar una aplicación que detecte matrículas en imágenes de prueba.

| Elemento | Descripción |
|---|---|
| **Problema** | _¿Qué necesidad resuelve? ¿Para quién?_ |
| **Entradas** | Imagen ficticia o de banco de pruebas + configuración de cámara (_resolución, ángulo, iluminación…_) |
| **Datos** | Imágenes de prueba con anotaciones (cajas de la matrícula + texto), sin personas identificables |
| **Procesamiento** | Validación del fichero → preparación de la imagen → modelo ya entrenado (detección + lectura OCR) |
| **Salida** | Registro de prueba (matrícula, confianza, hora) o **aviso de validación humana** |
| **Riesgos / límites** | Privacidad, retención mínima de datos, errores de lectura |
| **Decisión que sigue siendo humana** | _p. ej. cualquier sanción/cobro o lecturas con baja confianza_ |

### Paso 2 · Compara lenguajes y toma una decisión

Lenguajes comparados: **Python, JavaScript/Node.js, R, C++, PHP y Java**.

#### 2.1 Google Trends

- Ámbito: **todo el mundo**, **desde 2004** (inicio de datos), búsqueda **web** y búsqueda en **YouTube**.
- CSV exportados en [`data/`](data/). El gráfico de la web se genera leyendo esos CSV (no es una captura).
- **Interpretación y conclusiones:** _…_

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

- **Flujo general (6–10 etapas)**, desde que la persona se pone delante de la aplicación hasta el resultado, indicando dónde interviene la **revisión humana**. → ver diagrama en la web.
- **Antes de integrar el modelo:** recogida y anotación de datos, preparación, elección de modelo preentrenado, ajuste/validación, exportación.
- **Después de integrar el modelo:** carga del modelo, inferencia, umbral de confianza, registro, revisión humana, monitorización.
- **Pseudocódigo** (20–50 líneas, en Python): [`pseudocodigo.ipynb`](pseudocodigo.ipynb) — con entrada, funciones principales, condición/control de errores y salida.

### Paso 4 · Selecciona marcado y formatos de datos

> Responsable: **_Compañero/a_**

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
| 1 | Google Trends | Google | https://trends.google.com | _dd/mm/aaaa_ | Paso 2 |
| 2 | Python documentation | Python Software Foundation | https://docs.python.org/3/ | | Paso 2, 4 |
| 3 | OpenCV documentation | OpenCV.org | https://docs.opencv.org/ | | Paso 2, 3 |
| 4 | PyTorch documentation | PyTorch Foundation | https://pytorch.org/docs/ | | Paso 2, 5 |
| 5 | Ultralytics YOLO Docs | Ultralytics | https://docs.ultralytics.com/ | | Paso 3, 5 |
| 6 | MDN Web Docs — HTML / JSON | Mozilla | https://developer.mozilla.org/ | | Paso 4 |
| 7 | Extensible Markup Language (XML) 1.0 | W3C | https://www.w3.org/TR/xml/ | | Paso 4 |
| 8 | RFC 4180 — Common Format for CSV Files | IETF | https://www.rfc-editor.org/rfc/rfc4180 | | Paso 4 |
| 9 | RFC 8259 — The JSON Data Interchange Format | IETF | https://www.rfc-editor.org/rfc/rfc8259 | | Paso 4 |
| 10 | CommonMark Spec | CommonMark | https://spec.commonmark.org/ | | Paso 4 |
| 11 | pandas documentation | pandas | https://pandas.pydata.org/docs/ | | Paso 4 |
| 12 | Agencia Española de Protección de Datos | AEPD | https://www.aepd.es/ | | Paso 1, 5 |
| 13 | Reglamento (UE) 2024/1689 de Inteligencia Artificial | EUR-Lex | https://eur-lex.europa.eu/eli/reg/2024/1689/oj | | Paso 1, 5 |
| … | | | | | |

---

## 🤖 4. Evidencias del uso de IA generativa

> Rúbrica · Criterio 4 (2,5 pt). **No bastan capturas sueltas.** Se incluyen los prompts relevantes de cada etapa y de **ambos** miembros, las repreguntas/correcciones, la justificación de las herramientas y una reflexión conjunta.

### 4.1 Herramientas utilizadas y justificación

| Herramienta | Quién la usó | Para qué | Por qué esta herramienta |
|---|---|---|---|
| Claude (Anthropic) | Julen | Estructura del repo, README, plantilla web | _…_ |
| _ChatGPT / Copilot / Gemini…_ | _Compa_ | _…_ | _…_ |

### 4.2 Prompts por etapa

| Paso | Miembro | Prompt (literal) | Qué aportó | Evidencia |
|---|---|---|---|---|
| Organización | Julen | _«En el curso de IA y Big Data… queremos que hagas el README.md con la estructura de pasos…»_ | Estructura del repo, README y web base | `assets/ia/…png` |
| Paso 1 | | | | |
| Paso 2 | | | | |
| Paso 3 | Julen | | | |
| Paso 4 | _Compa_ | | | |
| Paso 5 | | | | |

### 4.3 Repreguntas, cambios y correcciones

| # | Respuesta inicial de la IA | Qué detectamos | Repregunta / corrección | Resultado final |
|---|---|---|---|---|
| 1 | | _p. ej. dato sin fuente / puntuación que no nos convence_ | | |
| 2 | | | | |

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
