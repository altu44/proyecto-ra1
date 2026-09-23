/* =========================================================
   Matriculator · RA1 — Interactividad
   Secciones:
     0. Utilidades
     1. Tema, navegación, progreso, reveal
     2. Hero: escáner animado
     3. Paso 1: entradas → salida
     4. Paso 2: Google Trends, lenguajes, heatmap, matriz, descartes
     5. Paso 3: flujo, fases, pseudocódigo
     6. Paso 4: formatos
     7. Paso 5 y equipo
   ✏️ = contenido en borrador que el equipo debe revisar
   ========================================================= */

/* ---------- 0. Utilidades ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const css = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* sin almacenamiento */ } },
};
const escapeHTML = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

/* Lenguajes: color y metadatos compartidos por todo el script */
const LANGS = [
  { id: "python", name: "Python", logo: "Py", color: "--py" },
  { id: "js", name: "JavaScript / Node.js", short: "JS/Node", logo: "JS", color: "--js" },
  { id: "r", name: "R", logo: "R", color: "--r" },
  { id: "cpp", name: "C++", logo: "C++", color: "--cpp" },
  { id: "php", name: "PHP", logo: "PHP", color: "--php" },
  { id: "java", name: "Java", logo: "Jv", color: "--java" },
];
const langById = Object.fromEntries(LANGS.map((l) => [l.id, l]));

/* ---------- 1. Tema, navegación, progreso, reveal ---------- */
(function ui() {
  const root = document.documentElement;
  const btn = $("#themeToggle");
  const saved = store.get("theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  setTheme(saved || (prefersLight ? "light" : "dark"));
  btn.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));
  function setTheme(t) {
    root.dataset.theme = t;
    btn.textContent = t === "dark" ? "🌙" : "☀️";
    store.set("theme", t);
    document.dispatchEvent(new CustomEvent("themechange"));
  }

  // Menú móvil
  $("#burger").addEventListener("click", () => $("#navLinks").classList.toggle("is-open"));
  $$("#navLinks a").forEach((a) => a.addEventListener("click", () => $("#navLinks").classList.remove("is-open")));

  // Progreso de lectura + sombra del nav + botón arriba
  const onScroll = () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    $("#progress").style.width = pct + "%";
    $("#nav").classList.toggle("is-scrolled", h.scrollTop > 10);
    $("#toTop").classList.toggle("is-shown", h.scrollTop > 700);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  $("#toTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Aparición al hacer scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el) => io.observe(el));

  // Sección activa en el menú y en el mapa de pasos
  const secIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const id = e.target.id;
      $$("#navLinks a").forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + id));
      $$(".step-pill").forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main .section").forEach((s) => secIO.observe(s));
})();

/* ---------- 2. Hero: escáner animado ---------- */
(function hero() {
  // Matrículas ficticias (no corresponden a vehículos reales)
  const samples = [
    { plate: "0000 XXX", conf: 0.97 },
    { plate: "1234 BCD", conf: 0.93 },
    { plate: "5678 FGH", conf: 0.58 },
    { plate: "9012 JKL", conf: 0.91 },
  ];
  const UMBRAL = 0.8;
  const term = $("#terminal");
  const bbox = $("#bbox");
  const label = $("#bboxLabel");
  const plate = $("#heroPlate");
  const plateText = $("#plateText");
  const scanner = $(".scanner");
  let i = 0;
  const lines = [];

  const log = (html) => {
    lines.push(html);
    if (lines.length > 6) lines.shift();
    term.innerHTML = lines.join("\n");
  };

  function placeBox() {
    const s = scanner.getBoundingClientRect();
    const p = plate.getBoundingClientRect();
    Object.assign(bbox.style, {
      left: p.left - s.left - 6 + "px", top: p.top - s.top - 6 + "px",
      width: p.width + 12 + "px", height: p.height + 12 + "px",
    });
  }

  function cycle() {
    const s = samples[i % samples.length];
    plateText.textContent = s.plate;
    bbox.classList.remove("is-on", "is-low");
    log(`<span class="t-dim">[${new Date().toLocaleTimeString()}]</span> imagen_${String(i + 1).padStart(3, "0")}.jpg recibida`);
    setTimeout(() => { log("  ✓ validación OK · preprocesado 640×640"); }, 500);
    setTimeout(() => {
      placeBox();
      bbox.classList.add("is-on");
      const low = s.conf < UMBRAL;
      bbox.classList.toggle("is-low", low);
      label.textContent = `matrícula · ${s.conf.toFixed(2)}`;
      log(low
        ? `  <span class="t-warn">⚠ ${s.plate} (conf ${s.conf}) &lt; ${UMBRAL} → revisión humana</span>`
        : `  → ${s.plate} (conf ${s.conf}) registrada`);
    }, 1200);
    i++;
  }
  cycle();
  setInterval(cycle, 3500);
  window.addEventListener("resize", placeBox);
})();

/* ---------- 3. Paso 1: entradas → salida ---------- */
(function paso1() {
  // ✏️ Borrador: ampliad o corregid cada bloque
  const info = {
    entrada: { t: "📷 Entradas", d: "Imagen ficticia o de un banco de pruebas público (JPG/PNG) y la configuración de la cámara: resolución, ángulo, distancia, iluminación (día/noche) e identificador del punto de captura.", tags: ["imagen .jpg/.png", "config. cámara (JSON)", "sin personas identificables"] },
    datos: { t: "🗂️ Datos necesarios", d: "Conjunto de imágenes de prueba anotadas: caja (bounding box) de la matrícula y el texto correcto. Sirven para validar y, si hiciera falta, ajustar un modelo preentrenado. Datos abiertos o sintéticos, nunca imágenes reales de clientes.", tags: ["anotaciones (XML/JSON)", "dataset abierto", "datos sintéticos"] },
    proceso: { t: "⚙️ Procesamiento", d: "1) Validar el fichero (tipo, tamaño, que no esté corrupto). 2) Preparar la imagen (redimensionar, normalizar, mejorar contraste). 3) Modelo ya entrenado detecta la matrícula. 4) OCR lee los caracteres. 5) Se comprueba el formato y la confianza.", tags: ["OpenCV", "detector (YOLO)", "OCR", "umbral de confianza"] },
    salida: { t: "🧾 Salida", d: "Si la confianza supera el umbral: registro de prueba (matrícula, confianza, fecha/hora, cámara). Si no: aviso de validación humana con la región recortada. Nunca se toma una decisión automática sobre la persona.", tags: ["registro (JSON/CSV)", "aviso de revisión"] },
    humano: { t: "🧑‍⚖️ Decisión que sigue siendo humana", d: "Confirmar lecturas dudosas y cualquier acción con consecuencias (cobro, sanción, denegar acceso). La IA propone; la persona decide.", tags: ["human-in-the-loop", "RGPD", "AI Act"] },
  };
  const detail = $("#ipoDetail");
  const show = (k) => {
    const x = info[k];
    detail.innerHTML = `<h4>${x.t}</h4><p>${x.d}</p><div class="chips">${x.tags.map((t) => `<span class="chip">${t}</span>`).join("")}</div>`;
    detail.style.animation = "none"; void detail.offsetWidth; detail.style.animation = "";
    $$(".ipo__card").forEach((c) => c.classList.toggle("is-active", c.dataset.ipo === k));
  };
  $$(".ipo__card").forEach((c) => c.addEventListener("click", () => show(c.dataset.ipo)));
  show("entrada");
})();

/* ---------- 4. Paso 2 ---------- */

/* 4.1 · Google Trends --------------------------------------
   Lee los CSV exportados de Google Trends (formato multiTimeline.csv):
     Categoría: Todas las categorías
     (línea vacía)
     Mes,Python: (Todo el mundo),JavaScript: (Todo el mundo),...
     2004-01,12,34,...
   Si hay varios ficheros por fuente (Trends solo compara 5 términos),
   añadidlos al array: las columnas se combinan por nombre.            */
const TRENDS_FILES = {
  web: ["data/trends_web.csv"],
  youtube: ["data/trends_youtube.csv"],
};
const TRENDS_EXAMPLE = {
  web: ["data/ejemplo/trends_web_ejemplo.csv"],
  youtube: ["data/ejemplo/trends_youtube_ejemplo.csv"],
};

function detectLang(header) {
  const h = header.toLowerCase();
  if (h.includes("javascript") || h.includes("node")) return "js";
  if (h.includes("python")) return "python";
  if (h.includes("c++")) return "cpp";
  if (h.includes("php")) return "php";
  if (h.includes("java")) return "java";
  if (/^r\b|^r[\s:(]/i.test(header.trim())) return "r";
  return null;
}

function splitCSV(line) {
  const out = []; let cur = ""; let q = false;
  for (const ch of line) {
    if (ch === '"') q = !q;
    else if (ch === "," && !q) { out.push(cur); cur = ""; }
    else cur += ch;
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

function parseTrends(text) {
  const lines = text.replace(/\r/g, "").split("\n").filter((l) => l.trim() !== "");
  const hIdx = lines.findIndex((l, k) => l.includes(",") && /^\d{4}-\d{2}/.test(lines[k + 1] || ""));
  if (hIdx === -1) throw new Error("Formato CSV no reconocido");
  const headers = splitCSV(lines[hIdx]);
  const series = headers.slice(1).map((h) => ({ label: h.replace(/:\s*\(.*\)$/, "").trim(), lang: detectLang(h), data: [] }));
  const dates = [];
  for (const l of lines.slice(hIdx + 1)) {
    const cells = splitCSV(l);
    if (!/^\d{4}-\d{2}/.test(cells[0])) continue;
    dates.push(cells[0]);
    series.forEach((s, k) => {
      const v = cells[k + 1];
      s.data.push(v === "<1" ? 0.5 : Number(v) || 0);
    });
  }
  return { dates, series };
}

function mergeTrends(parts) {
  const base = parts[0];
  const seen = new Set(base.series.map((s) => s.label));
  parts.slice(1).forEach((p) => p.series.forEach((s) => { if (!seen.has(s.label)) { base.series.push(s); seen.add(s.label); } }));
  return base;
}

function yearly({ dates, series }) {
  const years = [...new Set(dates.map((d) => d.slice(0, 4)))];
  return {
    dates: years,
    series: series.map((s) => ({
      ...s,
      data: years.map((y) => {
        const vals = s.data.filter((_, k) => dates[k].startsWith(y));
        return +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
      }),
    })),
  };
}

(function trends() {
  const canvas = $("#trendsChart");
  if (!canvas || typeof Chart === "undefined") return;
  const banner = $("#trendsBanner");
  const cache = {};
  let source = "web";
  let chart;
  const hidden = new Set();

  async function loadList(list) {
    const texts = await Promise.all(list.map((u) => fetch(u).then((r) => { if (!r.ok) throw new Error(u); return r.text(); })));
    return mergeTrends(texts.map(parseTrends));
  }

  async function load(src) {
    if (cache[src]) return cache[src];
    try {
      cache[src] = { ...(await loadList(TRENDS_FILES[src])), example: false, file: TRENDS_FILES[src].join(", ") };
    } catch {
      try {
        cache[src] = { ...(await loadList(TRENDS_EXAMPLE[src])), example: true, file: TRENDS_EXAMPLE[src].join(", ") };
      } catch {
        cache[src] = null;
      }
    }
    return cache[src];
  }

  function colorFor(s, k) {
    return s.lang ? css(langById[s.lang].color) : ["#22d3a6", "#f472b6", "#94a3b8"][k % 3];
  }

  async function render() {
    const raw = await load(source);
    if (!raw) {
      banner.hidden = false;
      banner.innerHTML = "⚠️ No se ha podido leer el CSV. Si abres el archivo con doble clic (<code>file://</code>) el navegador bloquea la lectura: usa <b>Live Server</b> en VS Code o la web de Netlify, o pulsa <b>📂 Cargar CSV</b>.";
      return;
    }
    banner.hidden = !raw.example;
    if (raw.example) banner.innerHTML = "🧪 <b>Datos de EJEMPLO</b> (sintéticos, solo para probar la web). Exportad el CSV real de Google Trends a <code>" + TRENDS_FILES[source][0] + "</code> y este aviso desaparecerá.";
    $("#trendsFile").textContent = raw.file;

    const view = $("#smoothToggle").checked ? yearly(raw) : raw;
    const text = css("--muted");
    const grid = css("--grid");
    const datasets = view.series.map((s, k) => ({
      label: s.label, data: s.data, borderColor: colorFor(s, k), backgroundColor: colorFor(s, k) + "22",
      borderWidth: 2.5, pointRadius: 0, pointHoverRadius: 5, tension: 0.35, hidden: hidden.has(s.label),
    }));
    if (chart) chart.destroy();
    chart = new Chart(canvas, {
      type: "line",
      data: { labels: view.dates, datasets },
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        animation: { duration: 900, easing: "easeOutQuart" },
        plugins: {
          legend: { display: false },
          tooltip: { backgroundColor: "#0b1020ee", padding: 10, titleFont: { family: "JetBrains Mono" }, bodyFont: { family: "Inter" } },
        },
        scales: {
          x: { ticks: { color: text, maxTicksLimit: 12 }, grid: { color: grid } },
          y: { min: 0, max: 100, ticks: { color: text }, grid: { color: grid }, title: { display: true, text: "Interés relativo (0–100)", color: text } },
        },
      },
    });

    $("#trendsLegend").innerHTML = view.series.map((s, k) =>
      `<button data-l="${escapeHTML(s.label)}" class="${hidden.has(s.label) ? "is-off" : ""}" style="--c:${colorFor(s, k)}"><i></i>${escapeHTML(s.label)}</button>`).join("");
    $$("#trendsLegend button").forEach((b, k) => b.addEventListener("click", () => {
      const l = b.dataset.l;
      hidden.has(l) ? hidden.delete(l) : hidden.add(l);
      b.classList.toggle("is-off");
      chart.setDatasetVisibility(k, !hidden.has(l));
      chart.update();
    }));
  }

  $$("#trendsTabs .tab").forEach((t) => t.addEventListener("click", () => {
    $$("#trendsTabs .tab").forEach((x) => x.classList.toggle("is-active", x === t));
    source = t.dataset.source;
    render();
  }));
  $("#smoothToggle").addEventListener("change", render);
  $("#csvInput").addEventListener("change", async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    try {
      cache[source] = { ...parseTrends(await f.text()), example: false, file: f.name + " (cargado localmente)" };
      render();
    } catch (err) { alert("No se pudo leer el CSV: " + err.message); }
  });
  document.addEventListener("themechange", () => chart && render());

  // Render perezoso cuando el gráfico entra en pantalla
  new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { render(); o.disconnect(); } }).observe(canvas);
})();

/* 4.2 · Tarjetas de lenguajes (✏️ borrador a revisar con fuentes) */
const LANG_INFO = {
  python: { roles: ["ia", "app"], tagline: "El estándar de facto en IA y ciencia de datos.",
    pros: ["Sintaxis clara y fácil de aprender", "OpenCV, PyTorch, TensorFlow, Ultralytics, EasyOCR", "Hubs de modelos preentrenados", "Notebooks para documentar"],
    cons: ["Más lento que C++ en bucles puros", "No se ejecuta en el navegador"] },
  js: { roles: ["app"], tagline: "El lenguaje de la web, en cliente y servidor.",
    pros: ["Único lenguaje nativo del navegador", "Node.js + Express para APIs", "JSON nativo", "Despliegue sencillo"],
    cons: ["Ecosistema de IA más limitado (TensorFlow.js, ONNX Runtime Web)", "Menos herramientas de visión"] },
  r: { roles: ["no"], tagline: "Pensado para estadística y análisis de datos.",
    pros: ["Excelente en estadística y gráficos", "Muy usado en academia"], cons: ["Pobre en visión por computador y deep learning", "Poco habitual para servicios web"] },
  cpp: { roles: ["no"], tagline: "Máximo rendimiento, mayor complejidad.",
    pros: ["Muy rápido; núcleo de OpenCV y PyTorch", "Ideal para dispositivos embebidos"], cons: ["Curva de aprendizaje alta", "Desarrollo y mantenimiento más lentos"] },
  php: { roles: ["no"], tagline: "Clásico del backend web.",
    pros: ["Fácil de desplegar en hosting", "Buena integración con BBDD"], cons: ["Casi sin librerías de IA/visión", "No pensado para cómputo intensivo"] },
  java: { roles: ["app"], tagline: "Robusto y empresarial.",
    pros: ["Tipado fuerte, muy mantenible", "Gran uso en empresa", "DJL / DL4J para IA"], cons: ["Más verboso", "Menos modelos y ejemplos de IA que Python"] },
};

(function langCards() {
  const roleLabel = { app: ["role--app", "App"], ia: ["role--ia", "IA"], no: ["role--no", "Descartado"] };
  $("#langGrid").innerHTML = LANGS.map((l) => {
    const i = LANG_INFO[l.id];
    return `<div class="lang" style="--c: var(${l.color})" tabindex="0" role="button" aria-label="${l.name}">
      <div class="lang__inner">
        <div class="lang__face lang__front">
          <div class="lang__logo">${l.logo}</div>
          <div><div class="lang__name">${l.name}</div><p>${i.tagline}</p></div>
          <div class="lang__role">${i.roles.map((r) => `<span class="role ${roleLabel[r][0]}">${roleLabel[r][1]}</span>`).join("")}</div>
        </div>
        <div class="lang__face lang__back">
          <h4>✅ A favor</h4><ul>${i.pros.map((p) => `<li>${p}</li>`).join("")}</ul>
          <h4>❌ En contra</h4><ul>${i.cons.map((p) => `<li>${p}</li>`).join("")}</ul>
        </div>
      </div></div>`;
  }).join("");
  $$(".lang").forEach((c) => {
    const flip = () => c.classList.toggle("is-flipped");
    c.addEventListener("click", flip);
    c.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } });
  });
})();

/* 4.3 · Criterios y puntuaciones (1–5) — ✏️ BORRADOR: justificad cada nota */
const CRITERIA = [
  { id: "aprender", name: "Facilidad de aprendizaje" },
  { id: "legible", name: "Legibilidad" },
  { id: "manten", name: "Mantenimiento" },
  { id: "integ", name: "Integración web, APIs, BBDD" },
  { id: "datos", name: "Trabajo con datos (imágenes)" },
  { id: "estad", name: "Análisis estadístico" },
  { id: "libs", name: "Bibliotecas y modelos de IA" },
  { id: "pre", name: "Reutilizar modelos preentrenados" },
  { id: "rend", name: "Rendimiento, despliegue, comunidad" },
  { id: "ui", name: "Interfaz web" },
];
//                  aprender legible manten integ datos estad libs pre rend ui
const SCORES = {
  python: [5, 5, 4, 4, 5, 4, 5, 5, 4, 2],
  js:     [4, 3, 3, 5, 3, 2, 3, 3, 4, 5],
  r:      [3, 3, 3, 2, 3, 5, 2, 2, 3, 2],
  cpp:    [2, 2, 2, 2, 4, 2, 4, 4, 5, 1],
  php:    [4, 3, 3, 5, 2, 1, 1, 1, 3, 4],
  java:   [3, 3, 4, 4, 3, 2, 3, 3, 4, 2],
};
const PRESETS = {
  //     aprender legible manten integ datos estad libs pre rend ui
  ia:    [5, 5, 5, 5, 20, 5, 25, 20, 10, 0],
  app:   [10, 10, 15, 25, 5, 0, 0, 0, 15, 20],
  equal: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
};

/* Justificación de cada puntuación (mismo orden que CRITERIA).
   ✏️ BORRADOR: revisad cada texto, ajustadlo a vuestra nota y apoyadlo en fuentes. */
const JUSTIF = {
  python: [
    "Sintaxis muy sencilla y cercana al pseudocódigo, sin compilar y con tipado dinámico. Es el lenguaje de iniciación en muchas universidades y el que usan casi todos los cursos de IA.",
    "La indentación obligatoria obliga a estructurar el código, y la guía de estilo PEP 8 y el «Zen de Python» priorizan la legibilidad («Readability counts»).",
    "El código es corto y claro, y las dependencias se gestionan fácilmente con pip/venv. Pierde un punto porque el tipado dinámico puede esconder errores en proyectos grandes (se mitiga con type hints).",
    "FastAPI, Flask o Django permiten crear APIs REST en pocas líneas y SQLAlchemy conecta con cualquier base de datos. No llega al 5 porque no se ejecuta en el navegador: la parte web necesita JavaScript.",
    "OpenCV, Pillow y NumPy para imágenes, y pandas para tablas: cubre exactamente lo que necesita Matriculator (leer, recortar, redimensionar y normalizar imágenes).",
    "pandas, SciPy, statsmodels y scikit-learn cubren casi todo el análisis estadístico. R sigue siendo algo más completo en estadística pura, por eso un 4.",
    "Es el ecosistema principal de deep learning: PyTorch, TensorFlow, Ultralytics YOLO (detección) y EasyOCR/PaddleOCR (lectura de texto).",
    "Hugging Face Hub, torchvision y Ultralytics permiten descargar un modelo ya entrenado y usarlo o ajustarlo con pocas líneas de código.",
    "Documentación y comunidad enormes y despliegue sencillo con Docker. El intérprete es más lento que C++, aunque las librerías pesadas (NumPy, PyTorch) están escritas en C/C++ por debajo.",
    "No se ejecuta en el navegador. Streamlit o Gradio sirven para demos rápidas, pero una interfaz web real para el parking necesita HTML, CSS y JavaScript.",
  ],
  js: [
    "Basta con un navegador para empezar y los resultados se ven al instante. Algunas rarezas (conversión automática de tipos, asincronía) complican el aprendizaje.",
    "Se puede escribir código legible, pero hay muchas formas de hacer lo mismo y el código asíncrono (callbacks, promesas) cuesta de seguir. TypeScript lo mejora.",
    "El ecosistema npm cambia muy rápido y los proyectos acumulan muchas dependencias que hay que actualizar. TypeScript ayuda, pero añade complejidad.",
    "Es el lenguaje nativo de la web: fetch, JSON nativo, Express para APIs y drivers para todas las bases de datos. Es la pieza ideal para unir interfaz, servidor y servicio de IA.",
    "Puede manipular imágenes con canvas o librerías como sharp, pero el procesamiento de imagen avanzado es muy limitado comparado con OpenCV en Python.",
    "Hay pocas librerías estadísticas maduras (p. ej. simple-statistics). El análisis estadístico no es su terreno.",
    "Existen TensorFlow.js, ONNX Runtime Web, transformers.js y Tesseract.js, pero con muchos menos modelos de visión y OCR, y menos ejemplos que en Python.",
    "Puede cargar modelos convertidos a ONNX o TF.js, pero normalmente hay que convertirlos antes y no todos los modelos están disponibles.",
    "El motor V8 es rápido y Node.js escala muy bien en peticiones web. Tiene una comunidad enorme, pero no está pensado para cómputo intensivo de IA.",
    "Es el único lenguaje que los navegadores ejecutan de forma nativa. Junto con HTML y CSS construye toda la interfaz de Matriculator.",
  ],
  r: [
    "Con RStudio es fácil empezar con análisis de datos, pero su sintaxis es poco convencional para quien viene de otros lenguajes.",
    "Los scripts con tidyverse son legibles, pero conviven varios sistemas de objetos (S3, S4, R6) y estilos muy distintos.",
    "Los paquetes de CRAN están bien documentados, pero R está pensado para análisis, no para mantener aplicaciones grandes.",
    "Plumber permite crear APIs y Shiny aplicaciones web, pero es poco habitual en servicios web de producción.",
    "Excelente con tablas (data.frame, dplyr). Para imágenes existen magick e imager, pero con muchas menos posibilidades que Python.",
    "Fue diseñado para la estadística: modelos, contrastes de hipótesis y gráficos (ggplot2). Es la referencia en el ámbito académico.",
    "Existen torch para R y keras, pero con pocos modelos de visión y una comunidad de deep learning muy reducida.",
    "Hay poco acceso directo a modelos preentrenados de visión; a menudo se acaba llamando a Python por debajo (paquete reticulate).",
    "Buena comunidad académica y documentación en CRAN, pero es lento y rara vez se despliega en producción.",
    "Shiny permite crear interfaces web, útiles para paneles internos, pero no para una aplicación pensada para clientes.",
  ],
  cpp: [
    "Curva de aprendizaje alta: punteros, gestión manual de memoria, compilación y plantillas.",
    "Sintaxis extensa y compleja; el código es difícil de leer para alguien que empieza.",
    "La gestión de memoria y la compilación en varias plataformas encarecen el mantenimiento, y los errores son difíciles de depurar.",
    "Se pueden crear APIs (Crow, Drogon) y conectar con bases de datos, pero cuesta mucho más que en JavaScript o Python.",
    "OpenCV está escrito en C++, así que el procesamiento de imagen es muy eficiente. Menos cómodo para trabajar con tablas.",
    "Hay librerías (Boost, Eigen), pero no está pensado para el análisis estadístico interactivo.",
    "El núcleo de PyTorch (LibTorch), TensorRT y el módulo DNN de OpenCV están en C++: muy potente, pero menos cómodo que usarlos desde Python.",
    "Ejecuta modelos exportados (ONNX Runtime, LibTorch, TensorRT) a máxima velocidad, aunque entrenarlos o ajustarlos se hace normalmente en Python.",
    "Máximo rendimiento y bajo consumo, ideal si el modelo se ejecutara dentro de la cámara o en un dispositivo embebido. Comunidad y documentación enormes.",
    "No se usa para interfaces web, salvo casos muy concretos compilando a WebAssembly.",
  ],
  php: [
    "Es fácil empezar con cualquier hosting y hay mucho material para principiantes.",
    "PHP 8 moderno es legible, pero circula mucho código antiguo con malas prácticas.",
    "Frameworks como Laravel ordenan el proyecto y lo hacen mantenible, sin destacar.",
    "Nació para la web: formularios, sesiones y MySQL/PostgreSQL. Funciona en casi cualquier servidor.",
    "Las extensiones GD o Imagick permiten redimensionar imágenes, pero no hacer visión por computador real.",
    "Prácticamente no tiene librerías estadísticas.",
    "Apenas hay ecosistema de IA (PHP-ML y Rubix ML son básicos) y nada moderno para detección de objetos u OCR.",
    "No hay forma práctica de ejecutar modelos preentrenados de visión sin llamar a otro servicio escrito en otro lenguaje.",
    "Rendimiento correcto para web, despliegue muy sencillo y gran comunidad web, pero no apto para cómputo intensivo.",
    "Genera HTML en el servidor con facilidad; la interactividad en el navegador sigue necesitando JavaScript.",
  ],
  java: [
    "Tipado estático y programación orientada a objetos desde el primer programa: hay más conceptos que aprender que en Python.",
    "Claro y estructurado, pero extenso: requiere mucho código repetitivo.",
    "Tipado fuerte, herramientas como Maven/Gradle e IDEs que refactorizan de forma segura: muy mantenible en proyectos grandes.",
    "Spring Boot para APIs y JDBC/JPA para bases de datos: es el estándar en entornos empresariales.",
    "ImageIO y los bindings de OpenCV funcionan, pero son menos cómodos y tienen menos ejemplos que en Python.",
    "Apache Commons Math o Smile existen, pero se usa poco para estadística.",
    "Deep Java Library (DJL), DL4J y Tribuo: un ecosistema de IA real, pero mucho menor que el de Python.",
    "DJL puede cargar modelos de PyTorch y ONNX y tiene un catálogo de modelos, con menos variedad y documentación.",
    "La JVM es rápida y estable, con despliegue robusto y gran comunidad, aunque consume más memoria.",
    "Existen JSP, Thymeleaf o Vaadin, pero la interfaz web moderna se sigue haciendo con JavaScript.",
  ],
};

(function heatmap() {
  const head = `<thead><tr><th>Criterio</th>${LANGS.map((l) => `<th style="color:var(${l.color})">${l.short || l.name}</th>`).join("")}</tr></thead>`;
  const body = CRITERIA.map((c, k) => `<tr><th>${c.name}</th>${LANGS.map((l) => {
    const v = SCORES[l.id][k];
    return `<td style="--v:${v}" data-l="${l.id}" data-k="${k}" tabindex="0" role="button" aria-label="${l.name}, ${c.name}: ${v} de 5. Ver justificación">${v}</td>`;
  }).join("")}</tr>`).join("");
  $("#heatTable").innerHTML = head + "<tbody>" + body + "</tbody>";

  // ---- Ventana (modal) con la justificación ----
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="modal__backdrop" data-close></div>
    <div class="modal__card" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <button class="modal__x" data-close aria-label="Cerrar">✕</button>
      <div class="modal__head">
        <span class="modal__logo" id="modalLogo"></span>
        <div><p class="modal__crit" id="modalCrit"></p><h3 id="modalTitle"></h3></div>
      </div>
      <div class="modal__score"><b id="modalScore"></b><span>/ 5</span><div class="modal__dots" id="modalDots"></div></div>
      <p class="modal__text" id="modalText"></p>
      <p class="modal__note">✏️ Borrador: revisad la justificación y apoyadla en una fuente.</p>
      <div class="modal__nav">
        <button class="btn btn--small btn--ghost" data-move="-1,0">↑ Criterio anterior</button>
        <button class="btn btn--small btn--ghost" data-move="1,0">↓ Criterio siguiente</button>
        <button class="btn btn--small btn--ghost" data-move="0,-1">← Lenguaje</button>
        <button class="btn btn--small btn--ghost" data-move="0,1">Lenguaje →</button>
      </div>
    </div>`;
  document.body.appendChild(modal);

  let cur = { li: 0, k: 0 };
  let lastFocus = null;

  function show(li, k) {
    cur = { li: (li + LANGS.length) % LANGS.length, k: (k + CRITERIA.length) % CRITERIA.length };
    const l = LANGS[cur.li];
    const v = SCORES[l.id][cur.k];
    const card = $(".modal__card", modal);
    card.style.setProperty("--c", `var(${l.color})`);
    $("#modalLogo").textContent = l.logo;
    $("#modalCrit").textContent = CRITERIA[cur.k].name;
    $("#modalTitle").textContent = l.name;
    $("#modalScore").textContent = v;
    $("#modalDots").innerHTML = [1, 2, 3, 4, 5].map((i) => `<i class="${i <= v ? "on" : ""}"></i>`).join("");
    $("#modalText").textContent = (JUSTIF[l.id] || [])[cur.k] || "✏️ Pendiente de justificar.";
    $$("#heatTable td").forEach((td) => td.classList.toggle("is-selected", td.dataset.l === l.id && +td.dataset.k === cur.k));
    card.style.animation = "none"; void card.offsetWidth; card.style.animation = "";
  }
  function open(li, k) {
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("no-scroll");
    show(li, k);
    $(".modal__x", modal).focus();
  }
  function close() {
    modal.hidden = true;
    document.body.classList.remove("no-scroll");
    $$("#heatTable td").forEach((td) => td.classList.remove("is-selected"));
    if (lastFocus) lastFocus.focus();
  }

  $$("#heatTable td").forEach((td) => {
    const go = () => open(LANGS.findIndex((l) => l.id === td.dataset.l), +td.dataset.k);
    td.addEventListener("click", go);
    td.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  });
  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) return close();
    const mv = e.target.closest("[data-move]");
    if (mv) { const [dk, dl] = mv.dataset.move.split(",").map(Number); show(cur.li + dl, cur.k + dk); }
  });
  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    const moves = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
    if (e.key === "Escape") close();
    else if (moves[e.key]) { e.preventDefault(); show(cur.li + moves[e.key][1], cur.k + moves[e.key][0]); }
  });
})();

(function matrix() {
  const weights = [...PRESETS.ia];
  const box = $("#weights");
  box.innerHTML = CRITERIA.map((c, k) => `
    <div class="w-row"><label for="w${k}">${c.name}</label>
    <input type="range" id="w${k}" min="0" max="40" step="5" value="${weights[k]}">
    <output id="o${k}">${weights[k]}%</output></div>`).join("");

  function update() {
    const total = weights.reduce((a, b) => a + b, 0);
    const wt = $("#weightTotal");
    wt.textContent = `Σ pesos = ${total} %` + (total !== 100 ? "  (se normaliza a 100 %)" : "");
    wt.classList.toggle("is-bad", total !== 100);
    const res = LANGS.map((l) => ({
      l, score: total ? SCORES[l.id].reduce((a, s, k) => a + s * weights[k], 0) / total : 0,
    })).sort((a, b) => b.score - a.score);
    $("#ranking").innerHTML = res.map((r, k) => `
      <div class="rank"><span class="rank__pos">${k + 1}</span><span>${r.l.short || r.l.name}</span>
      <div class="rank__bar"><div style="--w:${(r.score / 5) * 100}%; --c: var(${r.l.color})"></div></div>
      <span class="rank__score">${r.score.toFixed(2)}</span></div>`).join("");
  }
  CRITERIA.forEach((_, k) => $("#w" + k).addEventListener("input", (e) => {
    weights[k] = +e.target.value; $("#o" + k).textContent = weights[k] + "%";
    $$(".preset").forEach((p) => p.classList.remove("is-active"));
    update();
  }));
  $$(".preset").forEach((p) => p.addEventListener("click", () => {
    PRESETS[p.dataset.preset].forEach((v, k) => { weights[k] = v; $("#w" + k).value = v; $("#o" + k).textContent = v + "%"; });
    $$(".preset").forEach((x) => x.classList.toggle("is-active", x === p));
    update();
  }));
  update();
})();

(function discard() {
  // ✏️ Borrador: motivos de descarte para la PARTE DE IA
  const items = [
    ["js", "Hay IA en el navegador (TensorFlow.js, ONNX), pero con muchos menos modelos de visión y OCR listos. Se queda para la app."],
    ["r", "Muy bueno en estadística, pero pobre en visión por computador y en servir modelos por API."],
    ["cpp", "Rendimiento máximo, pero desarrollar y mantener es mucho más costoso. Útil solo si se llevara a hardware embebido."],
    ["php", "Prácticamente sin ecosistema de IA ni de visión."],
    ["java", "Viable (DJL), pero con menos modelos, tutoriales y comunidad de IA que Python."],
  ];
  $("#discard").innerHTML = items.map(([id, t]) =>
    `<div class="discard__item" style="--c: var(${langById[id].color})"><b>❌ ${langById[id].name}</b>${t}</div>`).join("");
})();

/* ---------- 5. Paso 3 ---------- */
(function flow() {
  // ✏️ Paso 3 (Julen): flujo de 8 etapas, desde que la persona llega hasta el resultado
  const stages = [
    { ico: "🧑‍💻", t: "Acceso", d: "El operador del parking abre la aplicación web por primera vez y ve el panel para subir una imagen de prueba.", tags: ["HTML/CSS/JS"] },
    { ico: "📤", t: "Subida", d: "Selecciona una imagen ficticia y la cámara/configuración. El navegador la envía al servidor.", tags: ["formulario", "JSON"] },
    { ico: "🛡️", t: "Validación", d: "Se comprueba tipo de fichero, tamaño y que la imagen no esté dañada. Si falla → mensaje de error y fin.", tags: ["control de errores"] },
    { ico: "🖼️", t: "Preparación", d: "Redimensionar, normalizar y mejorar contraste para que el modelo reciba lo que espera.", tags: ["OpenCV"] },
    { ico: "🎯", t: "Detección", d: "El modelo ya entrenado localiza la matrícula en la imagen (bounding box + confianza).", tags: ["YOLO", "modelo preentrenado"] },
    { ico: "🔤", t: "Lectura OCR", d: "Se recorta la región y un OCR lee los caracteres; se comprueba que siga el formato de matrícula.", tags: ["OCR", "regex"] },
    { ico: "🧑‍⚖️", t: "Revisión humana", d: "Si la confianza está por debajo del umbral o el formato no encaja, una persona valida o corrige la lectura.", tags: ["human-in-the-loop"], human: true },
    { ico: "🧾", t: "Resultado", d: "Se muestra la matrícula, la confianza y se guarda un registro de prueba (sin la imagen original).", tags: ["JSON/CSV", "retención mínima"] },
  ];
  const ol = $("#flow");
  ol.innerHTML = stages.map((s, k) => `<li data-k="${k}" class="${s.human ? "is-human" : ""}"><span class="f-ico">${s.ico}</span>${s.t}</li>`).join("");
  let cur = 0; let timer = null;

  function go(k) {
    cur = (k + stages.length) % stages.length;
    $$("#flow li").forEach((li, j) => {
      li.classList.toggle("is-done", j < cur);
      li.classList.toggle("is-current", j === cur);
    });
    const s = stages[cur];
    $("#flowDetail").innerHTML = `<div class="big">${s.ico}</div><div><h4>${cur + 1}. ${s.t}</h4><p>${s.d}</p>
      ${s.human ? '<p class="human-note">⚠️ Aquí interviene la revisión humana.</p>' : ""}
      <div class="tagline">${s.tags.map((t) => `<span>${t}</span>`).join("")}</div></div>`;
    $("#flowCounter").textContent = `Etapa ${cur + 1} / ${stages.length}`;
  }
  const stop = () => { clearInterval(timer); timer = null; $("#flowPlay").textContent = "▶ Reproducir flujo"; };
  $("#flowPlay").addEventListener("click", () => {
    if (timer) return stop();
    $("#flowPlay").textContent = "⏸ Pausar";
    if (cur === stages.length - 1) go(0);
    timer = setInterval(() => { if (cur === stages.length - 1) return stop(); go(cur + 1); }, 1800);
  });
  $("#flowPrev").addEventListener("click", () => { stop(); go(cur - 1); });
  $("#flowNext").addEventListener("click", () => { stop(); go(cur + 1); });
  $$("#flow li").forEach((li) => li.addEventListener("click", () => { stop(); go(+li.dataset.k); }));
  go(0);
})();

(function phases() {
  // ✏️ Paso 3 (Julen): componentes antes / después de integrar el modelo
  const data = {
    antes: [
      ["Recogida de datos", "Buscar un dataset abierto de matrículas o generar imágenes sintéticas. Sin personas identificables.", "datasets abiertos"],
      ["Anotación", "Marcar la caja de cada matrícula y su texto correcto.", "XML (Pascal VOC) / JSON"],
      ["Preparación", "Limpiar, redimensionar y dividir en entrenamiento / validación / test.", "pandas · OpenCV"],
      ["Elegir modelo", "Seleccionar un detector y un OCR preentrenados en lugar de crear uno desde cero.", "YOLO · EasyOCR"],
      ["Ajuste y evaluación", "Ajuste fino con nuestras imágenes y medir precisión, errores y confianza.", "PyTorch · métricas"],
      ["Exportar", "Guardar el modelo en un formato que la aplicación pueda cargar.", ".pt · ONNX"],
    ],
    despues: [
      ["Cargar modelo", "El servicio de IA carga el modelo una vez al arrancar.", "Python · FastAPI"],
      ["Recibir petición", "La app (Node.js) envía la imagen y la configuración al servicio de IA.", "HTTP · JSON"],
      ["Inferencia", "Preprocesado → detección → OCR → comprobación de formato.", "OpenCV · YOLO · OCR"],
      ["Decidir según umbral", "Confianza alta → registro. Baja → aviso de revisión humana.", "if / else"],
      ["Responder y registrar", "Devolver JSON con el resultado y guardar un registro mínimo.", "JSON · CSV"],
      ["Monitorizar", "Revisar errores y correcciones humanas para mejorar el modelo en el futuro.", "logs"],
    ],
  };
  const render = (k) => {
    $("#phase").innerHTML = data[k].map(([t, d, tool], i) =>
      `<div class="phase__step" style="--i:${i}"><span class="n">${String(i + 1).padStart(2, "0")}</span><h4>${t}</h4><p>${d}</p><span class="tool">${tool}</span></div>`).join("");
  };
  $$("#phaseTabs .tab").forEach((t) => t.addEventListener("click", () => {
    $$("#phaseTabs .tab").forEach((x) => x.classList.toggle("is-active", x === t));
    render(t.dataset.phase);
  }));
  render("antes");
})();

/* Pseudocódigo: cada línea con su tipo (in/fn/if/out) para colorear la leyenda.
   ✏️ Julen: debe coincidir con pseudocodigo.ipynb */
const PSEUDO = [
  ["", "# Matriculator · pseudocódigo (NO es código ejecutable)"],
  ["", "UMBRAL_CONFIANZA = 0.80"],
  ["", "FORMATOS = ['.jpg', '.png']"],
  ["", ""],
  ["fn", "función validar_imagen(ruta):"],
  ["if", "    si extensión(ruta) no está en FORMATOS: lanzar Error('Formato no válido')"],
  ["if", "    si tamaño(ruta) > 5 MB: lanzar Error('Imagen demasiado grande')"],
  ["fn", "    devolver leer_imagen(ruta)"],
  ["", ""],
  ["fn", "función preparar(imagen):"],
  ["fn", "    imagen = redimensionar(imagen, 640, 640)"],
  ["fn", "    devolver normalizar(imagen)"],
  ["", ""],
  ["fn", "función leer_matricula(imagen, detector, ocr):"],
  ["fn", "    cajas = detector.detectar(imagen)"],
  ["if", "    si cajas está vacío: devolver None, 0.0"],
  ["fn", "    mejor = caja con mayor confianza de cajas"],
  ["fn", "    texto = ocr.leer(recortar(imagen, mejor))"],
  ["fn", "    devolver limpiar(texto), mejor.confianza"],
  ["", ""],
  ["", "# ---- Programa principal ----"],
  ["fn", "detector = cargar_modelo('modelos/detector.pt')"],
  ["fn", "ocr = cargar_ocr(idioma='es')"],
  ["in", "entrada = leer_json('data/entrada_prueba.json')   # ruta imagen + cámara"],
  ["", ""],
  ["if", "intentar:"],
  ["fn", "    imagen = preparar(validar_imagen(entrada.ruta_imagen))"],
  ["fn", "    matricula, conf = leer_matricula(imagen, detector, ocr)"],
  ["if", "    si matricula es None o conf < UMBRAL_CONFIANZA o no cumple formato:"],
  ["out", "        resultado = {estado: 'REVISION_HUMANA', confianza: conf}"],
  ["if", "    si no:"],
  ["out", "        resultado = {estado: 'OK', matricula: matricula, confianza: conf}"],
  ["if", "capturar Error como e:"],
  ["out", "    resultado = {estado: 'ERROR', mensaje: e.mensaje}"],
  ["", ""],
  ["out", "resultado.fecha = ahora(); resultado.camara = entrada.camara_id"],
  ["out", "guardar_registro('registros.csv', resultado)   # sin guardar la imagen"],
  ["out", "mostrar(resultado)"],
];

(function pseudo() {
  const KW = /\b(función|devolver|si no|si|intentar|capturar|lanzar|como|no está en|está vacío|o|es|None|en)\b/g;
  const hl = (line) => {
    let h = escapeHTML(line);
    const ci = h.indexOf("#");
    let comment = "";
    if (ci !== -1) { comment = `<span class="tok-c">${h.slice(ci)}</span>`; h = h.slice(0, ci); }
    h = h.replace(/'[^']*'/g, (m) => `<span class="tok-s">${m}</span>`)
      .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="tok-n">$1</span>')
      .replace(/(\w+)(?=\()/g, '<span class="tok-f">$1</span>')
      .replace(KW, '<span class="tok-k">$1</span>');
    return h + comment;
  };
  $("#pseudo").innerHTML = PSEUDO.map(([t, l]) => `<span class="ln${t ? " ln--" + t : ""}">${hl(l) || " "}</span>`).join("");
  $("#copyCode").addEventListener("click", async (e) => {
    try { await navigator.clipboard.writeText(PSEUDO.map((x) => x[1]).join("\n")); e.target.textContent = "¡Copiado!"; }
    catch { e.target.textContent = "No disponible"; }
    setTimeout(() => (e.target.textContent = "Copiar"), 1500);
  });
})();

/* ---------- 6. Paso 4: formatos ---------- */
(function formats() {
  // ✏️ Paso 4 (Ander): revisad y ampliad con fuentes (W3C, IETF, MDN, CommonMark)
  const F = {
    html: { name: "HTML", type: "Lenguaje de marcado",
      what: "HyperText Markup Language. Estructura el contenido de una página web mediante etiquetas.",
      feat: "Etiquetas predefinidas (<form>, <img>, <table>…), interpretado por el navegador, se combina con CSS y JavaScript.",
      where: "Interfaz de usuario: formulario de subida de imágenes y panel de resultados.",
      code: `<form id="subida" action="/api/leer" method="post">
  <label for="img">Imagen de prueba</label>
  <input type="file" id="img" accept=".jpg,.png">
  <select id="camara">
    <option value="CAM-01">Entrada norte</option>
  </select>
  <button type="submit">Analizar</button>
</form>
<section id="resultado"></section>` },
    xml: { name: "XML", type: "Lenguaje de marcado",
      what: "eXtensible Markup Language. Marcado para describir y almacenar datos con etiquetas definidas por el usuario.",
      feat: "Etiquetas propias, estructura en árbol estricta, validable con esquemas (XSD/DTD), muy verboso.",
      where: "Anotaciones del dataset (formato Pascal VOC) o configuración de cámaras en sistemas antiguos.",
      code: `<annotation>
  <filename>prueba_001.jpg</filename>
  <object>
    <name>matricula</name>
    <text>0000XXX</text>
    <bndbox>
      <xmin>212</xmin><ymin>318</ymin>
      <xmax>398</xmax><ymax>362</ymax>
    </bndbox>
  </object>
</annotation>` },
    json: { name: "JSON", type: "Formato de intercambio de datos",
      what: "JavaScript Object Notation. Formato de texto ligero para intercambiar datos estructurados (objetos y listas).",
      feat: "Pares clave-valor, ligero, legible, nativo en JavaScript y fácil de leer en Python (módulo json).",
      where: "Comunicación entre la web, el servidor Node.js y el servicio de IA en Python (peticiones y respuestas de la API).",
      code: `{
  "estado": "OK",
  "matricula": "0000XXX",
  "confianza": 0.93,
  "camara_id": "CAM-01",
  "fecha": "2026-10-01T09:15:00",
  "revision_humana": false
}` },
    md: { name: "Markdown", type: "Lenguaje de marcado ligero",
      what: "Sintaxis sencilla para dar formato a texto plano que luego se convierte en HTML.",
      feat: "Muy legible sin procesar: # títulos, **negrita**, listas, tablas, bloques de código.",
      where: "README.md del repositorio, celdas de texto de los notebooks y documentación del proyecto.",
      code: `# Matriculator

## Resultado de la prueba
| Matrícula | Confianza | Estado |
|-----------|-----------|--------|
| 0000XXX   | 0.93      | ✅ OK  |

> Las lecturas < 0.80 requieren **revisión humana**.` },
    csv: { name: "CSV", type: "Formato de datos tabulares",
      what: "Comma-Separated Values. Texto plano donde cada línea es una fila y las columnas se separan por comas.",
      feat: "Muy simple y ligero, abre en Excel, pandas lo lee directamente; sin tipos ni estructura anidada.",
      where: "Registro de pruebas, métricas de evaluación del modelo y exportación de Google Trends (data/).",
      code: `fecha,camara_id,matricula,confianza,estado
2026-10-01T09:15,CAM-01,0000XXX,0.93,OK
2026-10-01T09:16,CAM-01,,0.41,REVISION_HUMANA
2026-10-01T09:18,CAM-02,1234BCD,0.88,OK` },
  };
  const tabs = $("#fmtTabs");
  tabs.innerHTML = Object.entries(F).map(([k, f], i) => `<button class="tab${i ? "" : " is-active"}" data-f="${k}">${f.name}</button>`).join("");

  function show(k) {
    const f = F[k];
    $$("#fmtTabs .tab").forEach((t) => t.classList.toggle("is-active", t.dataset.f === k));
    $("#fmt").innerHTML = `
      <div class="fmt__info"><span class="fmt__type">${f.type}</span><h3>${f.name}</h3>
        <dl><dt>¿Qué es?</dt><dd>${escapeHTML(f.what)}</dd>
        <dt>Características</dt><dd>${escapeHTML(f.feat)}</dd>
        <dt>¿Dónde interviene en Matriculator?</dt><dd>${escapeHTML(f.where)}</dd></dl></div>
      <pre class="fmt__code">${escapeHTML(f.code)}</pre>`;
    $("#fmt").style.animation = "none"; void $("#fmt").offsetWidth; $("#fmt").style.animation = "";
    const lit = { html: ["html"], json: ["json"], xml: ["xml"], csv: ["csv"], md: [] }[k];
    $$("#arch [data-f]").forEach((n) => n.classList.toggle("is-lit", lit.includes(n.dataset.f)));
  }
  $$("#fmtTabs .tab").forEach((t) => t.addEventListener("click", () => show(t.dataset.f)));
  $$("#arch [data-f]").forEach((n) => n.addEventListener("click", () => show(n.dataset.f)));
  show("html");
})();

/* ---------- 7. Paso 5 y equipo ---------- */
(function paso5() {
  // Posición del indicador IA débil ↔ fuerte (✏️ ajustad según vuestra respuesta)
  const POS = 12; // %
  const dot = $("#gaugeDot");
  new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { dot.style.left = POS + "%"; o.disconnect(); } }).observe(dot);
})();

(function timeline() {
  // Horas previstas por tarea (coherente con la tabla del README)
  const who = { J: ["Julen", "--py"], C: ["Ander", "--java"], A: ["Ambos", "--accent"] };
  const tasks = [
    ["T1 · Repo, ramas y Netlify", "J", 0, 0.5],
    ["T2 · Paso 1 · Definir app", "A", 0.5, 0.5],
    ["T3 · Paso 2 · Google Trends", "J", 1, 1],
    ["T4 · Paso 2 · Comparativa", "C", 1, 1.5],
    ["T5 · Paso 2 · Matriz y decisión", "A", 2.5, 1],
    ["T6-7 · Paso 3 · Diagramas y pseudocódigo", "J", 3.5, 3],
    ["T8-9 · Paso 4 · Formatos y notebook", "C", 3.5, 3],
    ["T10 · Paso 5 · Preguntas", "A", 6.5, 0.5],
    ["T11 · Fuentes y evidencias IA", "A", 7, 1],
    ["T12-13 · Integración y revisión", "A", 8, 1.5],
  ];
  const max = 9.5;
  $("#timeline").innerHTML = tasks.map(([t, w, s, d]) => `
    <div class="tl-row"><span>${t}</span><div class="tl-track">
      <div class="tl-seg" style="left:${(s / max) * 100}%; width:${(d / max) * 100}%; --c: var(${who[w][1]})">${d}h</div>
    </div></div>`).join("") +
    `<div class="tl-legend">${Object.values(who).map(([n, c]) => `<span><i style="--c: var(${c})"></i>${n}</span>`).join("")}<span>· eje en horas acumuladas (≈ 9 h por persona)</span></div>`;
})();
