/* =========================================================
   Matriculator · RA1 — Interactividad
   Secciones:
     0. Utilidades
     1. Tema, navegación, progreso, reveal
     2. Hero: escáner animado
     3. Paso 1: escenario, simulador y entradas → salida
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

/* ---------- Fuentes (Paso 2) ----------
   Cada fuente tiene un id que se usa para citarla con cite(["id"]).
   El número [n] es su posición en esta lista. Fecha de consulta común. */
const FECHA_CONSULTA = "23/09/2026";
const SRC_CATS = {
  tend: ["📈 Tendencias y uso", "--accent-2"], py: ["Python", "--py"], js: ["JavaScript / Node.js", "--js"],
  r: ["R", "--r"], cpp: ["C++", "--cpp"], php: ["PHP", "--php"], java: ["Java", "--java"],
};
const SOURCES = [
  // Tendencias y uso
  { id: "trends", cat: "tend", title: "Google Trends", org: "Google", url: "https://trends.google.es/trends/", used: "2.1" },
  { id: "trends-faq", cat: "tend", title: "Preguntas frecuentes sobre los datos de Google Trends", org: "Google · Ayuda de Tendencias de búsqueda", url: "https://support.google.com/trends/answer/4365533?hl=es", used: "2.1" },
  { id: "octoverse", cat: "tend", title: "Octoverse: AI leads Python to top language as the number of global developers surges", org: "GitHub Staff · GitHub Blog, 29/10/2024", url: "https://github.blog/news-insights/octoverse/octoverse-2024/", used: "2.1 · 2.3" },
  { id: "so2025", cat: "tend", title: "2025 Stack Overflow Developer Survey — Technology", org: "Stack Overflow", url: "https://survey.stackoverflow.co/2025/technology", used: "2.1 · 2.3" },
  { id: "tiobe", cat: "tend", title: "TIOBE Programming Community Index", org: "TIOBE Software", url: "https://www.tiobe.com/tiobe-index/", used: "2.1 · 2.3" },
  // Python
  { id: "py-tut", cat: "py", title: "El tutorial de Python", org: "Python Software Foundation", url: "https://docs.python.org/es/3/tutorial/index.html", used: "2.2 · 2.3" },
  { id: "pep8", cat: "py", title: "PEP 8 – Style Guide for Python Code", org: "G. van Rossum, B. Warsaw, A. Coghlan · python.org", url: "https://peps.python.org/pep-0008/", used: "2.3" },
  { id: "pep20", cat: "py", title: "PEP 20 – The Zen of Python", org: "Tim Peters · python.org", url: "https://peps.python.org/pep-0020/", used: "2.2 · 2.3" },
  { id: "fastapi", cat: "py", title: "FastAPI", org: "Sebastián Ramírez (tiangolo)", url: "https://fastapi.tiangolo.com/", used: "2.3 · 2.5" },
  { id: "statsmodels", cat: "py", title: "statsmodels documentation", org: "statsmodels (S. Seabold, J. Perktold)", url: "https://www.statsmodels.org/stable/index.html", used: "2.3" },
  { id: "opencv", cat: "py", title: "OpenCV modules — documentación 4.x", org: "OpenCV", url: "https://docs.opencv.org/4.x/", used: "2.2 · 2.3 · 2.5" },
  { id: "torchvision", cat: "py", title: "Models and pre-trained weights — TorchVision", org: "PyTorch Foundation", url: "https://docs.pytorch.org/vision/stable/models.html", used: "2.2 · 2.3 · 2.5" },
  { id: "ultralytics", cat: "py", title: "Ultralytics YOLO Docs", org: "Ultralytics", url: "https://docs.ultralytics.com/", used: "2.2 · 2.3 · 2.5" },
  { id: "easyocr", cat: "py", title: "EasyOCR (repositorio oficial)", org: "Jaided AI · GitHub", url: "https://github.com/JaidedAI/EasyOCR", used: "2.2 · 2.3 · 2.5" },
  { id: "hf-hub", cat: "py", title: "The Model Hub", org: "Hugging Face", url: "https://huggingface.co/docs/hub/models-the-hub", used: "2.2 · 2.3" },
  // JavaScript
  { id: "mdn-js", cat: "js", title: "JavaScript | MDN", org: "Mozilla", url: "https://developer.mozilla.org/es/docs/Web/JavaScript", used: "2.2 · 2.3 · 2.5" },
  { id: "node", cat: "js", title: "About Node.js", org: "OpenJS Foundation", url: "https://nodejs.org/en/about", used: "2.2 · 2.3 · 2.5" },
  { id: "express", cat: "js", title: "Express — framework web para Node.js", org: "OpenJS Foundation", url: "https://expressjs.com/", used: "2.2 · 2.3 · 2.5" },
  { id: "ts", cat: "js", title: "TypeScript: JavaScript With Syntax For Types", org: "Microsoft", url: "https://www.typescriptlang.org/", used: "2.3" },
  { id: "tfjs", cat: "js", title: "TensorFlow.js", org: "Google", url: "https://www.tensorflow.org/js", used: "2.2 · 2.3 · 2.5" },
  { id: "ort-web", cat: "js", title: "ONNX Runtime Web", org: "Microsoft · ONNX Runtime", url: "https://onnxruntime.ai/docs/tutorials/web/", used: "2.2 · 2.3 · 2.5" },
  { id: "tesseractjs", cat: "js", title: "Tesseract.js (repositorio oficial)", org: "naptha · GitHub", url: "https://github.com/naptha/tesseract.js", used: "2.3" },
  // R
  { id: "r-about", cat: "r", title: "What is R?", org: "The R Foundation", url: "https://www.r-project.org/about.html", used: "2.2 · 2.3 · 2.5" },
  { id: "shiny", cat: "r", title: "Shiny", org: "Posit", url: "https://shiny.posit.co/", used: "2.2 · 2.3" },
  { id: "plumber", cat: "r", title: "Plumber: an API generator for R", org: "Posit · B. Schloerke", url: "https://www.rplumber.io/", used: "2.3 · 2.5" },
  { id: "torch-r", cat: "r", title: "torch for R", org: "mlverse · Posit", url: "https://torch.mlverse.org/", used: "2.2 · 2.3" },
  // C++
  { id: "isocpp", cat: "cpp", title: "Getting Started with C++", org: "Standard C++ Foundation (isocpp.org)", url: "https://isocpp.org/get-started", used: "2.2 · 2.3" },
  { id: "libtorch", cat: "cpp", title: "PyTorch C++ API", org: "PyTorch Foundation", url: "https://docs.pytorch.org/cppdocs/", used: "2.2 · 2.3 · 2.5" },
  // PHP
  { id: "php-what", cat: "php", title: "What is PHP?", org: "The PHP Group · php.net", url: "https://www.php.net/manual/en/intro-whatis.php", used: "2.2 · 2.3" },
  { id: "php-gd", cat: "php", title: "GD — Image Processing and Generation", org: "The PHP Group · php.net", url: "https://www.php.net/manual/en/book.image.php", used: "2.3" },
  { id: "rubix", cat: "php", title: "Rubix ML (repositorio oficial)", org: "Rubix ML · GitHub", url: "https://github.com/RubixML/ML", used: "2.2 · 2.3 · 2.5" },
  // Java
  { id: "devjava", cat: "java", title: "Learn Java — Dev.java", org: "Oracle", url: "https://dev.java/learn/", used: "2.2 · 2.3" },
  { id: "spring", cat: "java", title: "Spring Boot", org: "Spring (Broadcom)", url: "https://spring.io/projects/spring-boot", used: "2.2 · 2.3" },
  { id: "djl", cat: "java", title: "Deep Java Library (DJL)", org: "DJL · Amazon Web Services", url: "https://docs.djl.ai/master/index.html", used: "2.2 · 2.3 · 2.5" },
];
const srcIndex = Object.fromEntries(SOURCES.map((s, i) => [s.id, i + 1]));
const srcById = Object.fromEntries(SOURCES.map((s) => [s.id, s]));

/* Devuelve el HTML de una cita: [1, 4] con enlaces a la sección de fuentes */
function cite(ids) {
  const list = (Array.isArray(ids) ? ids : String(ids).split(",")).map((x) => x.trim()).filter((x) => srcById[x]);
  if (!list.length) return "";
  return `<sup class="cite">[${list.map((id) =>
    `<a href="#src-${id}" data-src="${id}" title="${escapeHTML(srcById[id].title)} — ${escapeHTML(srcById[id].org)}">${srcIndex[id]}</a>`).join(", ")}]</sup>`;
}
/* Lista de enlaces externos (para la ventana del heatmap) */
function srcLinks(ids) {
  return ids.filter((id) => srcById[id]).map((id) =>
    `<a href="${srcById[id].url}" target="_blank" rel="noopener">[${srcIndex[id]}] ${escapeHTML(srcById[id].title)} ↗</a>`).join("");
}

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

/* ---------- 3. Paso 1: escenario, simulador y entradas → salida ---------- */

// ✏️ Reglas de negocio de ejemplo: decidid vuestros valores
const REGLAS = {
  UMBRAL: 0.80,            // confianza mínima de la lectura
  MIN_GRATIS_CLIENTE: 90,  // minutos gratis si el cajero validó la matrícula
  TARIFA_HORA: 2.40,       // €/hora para público (se cobra por minuto)
  TOPE_DIARIO: 18,         // € máximo por día
};

(function paso1() {
  const eur = (n) => n.toLocaleString("es-ES", { style: "currency", currency: "EUR" });
  $$(".js-free").forEach((e) => (e.textContent = REGLAS.MIN_GRATIS_CLIENTE));
  $$(".js-rate").forEach((e) => (e.textContent = REGLAS.TARIFA_HORA.toFixed(2).replace(".", ",")));

  // ✏️ Borrador: ampliad o corregid cada bloque.
  // Cada bloque se divide en filas: [título de la fila, [líneas]]
  const info = {
    entrada: { t: "📷 Entradas", rows: [
      ["Cámara de entrada", ["Imagen del coche al entrar (en el estudio: imágenes ficticias o de un banco de pruebas).", "Configuración de la cámara: id, resolución, ángulo e iluminación."]],
      ["Cámara de salida", ["Imagen del coche al salir, con la misma configuración."]],
      ["TPV del supermercado", ["Matrícula que teclea el cajero al cobrar.", "Id del ticket de esa compra, que el TPV añade automáticamente."]],
      ["Recursos Humanos", ["Alta y baja de las matrículas de los empleados."]],
    ], tags: ["imagen .jpg/.png", "config. cámara (JSON)", "matrícula + id ticket", "registro de empleados"] },
    datos: { t: "🗂️ Datos necesarios", rows: [
      ["Para la IA", ["Imágenes de prueba anotadas: caja de la matrícula + texto correcto.", "Sin personas identificables; datos abiertos o sintéticos."]],
      ["Empleados", ["Matrícula + id interno del empleado (máx. 2 vehículos por persona)."]],
      ["Validaciones de clientes", ["Matrícula + id del ticket + fecha y hora + caja.", "El detalle de la compra se queda en el sistema del supermercado y se consulta con el id del ticket."]],
      ["Movimientos", ["Registro de entradas y salidas: matrícula, hora, cámara y confianza de la lectura."]],
      ["Tarifas", ["Minutos gratuitos para clientes, precio por hora y tope diario."]],
    ], tags: ["anotaciones (XML/JSON)", "BBDD empleados", "validaciones + tickets", "tarifas"] },
    proceso: { t: "⚙️ Procesamiento", rows: [
      ["1 · Imagen", ["Validar el fichero (tipo, tamaño, que no esté dañado).", "Preparar la imagen: redimensionar, normalizar y mejorar el contraste."]],
      ["2 · Lectura (IA)", ["El modelo detecta dónde está la matrícula.", "El OCR lee los caracteres.", "Se comprueba el formato y la confianza de la lectura."]],
      ["3 · Clasificación", ["¿Está en el registro de empleados? → empleado.", "Si no, ¿tiene hoy un ticket asociado? → cliente.", "Si no → público."]],
      ["4 · Cálculo", ["En la salida se calcula el tiempo de estancia y el importe según el perfil."]],
    ], tags: ["OpenCV", "detector (YOLO)", "OCR", "reglas de negocio", "cálculo de tarifa"] },
    salida: { t: "🧾 Salida", rows: [
      ["👔 Empleado", ["Barrera abierta, sin pagar."]],
      ["🛒 Cliente validado", ["Gratis si no supera el tiempo gratuito.", "Si lo supera, paga solo el exceso.", "Se guarda el id del ticket junto al movimiento."]],
      ["🅿️ Público", ["Paga según el tiempo, en el cajero automático o en la barrera, con tope diario."]],
      ["⚠️ Lectura dudosa", ["Confianza baja o matrícula sin entrada registrada → aviso al personal por el interfono."]],
      ["📝 Registro", ["De cada movimiento se guarda: matrícula, perfil, horas, importe e id del ticket (si lo hay)."]],
    ], tags: ["barrera", "importe", "aviso al personal", "registro JSON/CSV"] },
    humano: { t: "🧑‍⚖️ Decisión que sigue siendo humana", rows: [
      ["Cajero", ["Decide validar al cliente y apunta la matrícula con su ticket."]],
      ["Personal del parking", ["Resuelve lecturas dudosas y reclamaciones (busca el ticket y corrige la validación)."]],
      ["Recursos Humanos", ["Da de alta y de baja las matrículas de los empleados."]],
      ["La IA", ["Solo lee la matrícula: no decide cobros ni sanciones."]],
    ], tags: ["human-in-the-loop", "RGPD", "AI Act"] },
  };
  const detail = $("#ipoDetail");
  const show = (k) => {
    const x = info[k];
    detail.innerHTML = `<h4>${x.t}</h4><dl class="ipo__rows">${x.rows.map(([h, items]) =>
      `<div class="ipo__row"><dt>${h}</dt><dd><ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul></dd></div>`).join("")}</dl>
      <div class="chips">${x.tags.map((t) => `<span class="chip">${t}</span>`).join("")}</div>`;
    detail.style.animation = "none"; void detail.offsetWidth; detail.style.animation = "";
    $$(".ipo__card").forEach((c) => c.classList.toggle("is-active", c.dataset.ipo === k));
  };
  $$(".ipo__card").forEach((c) => c.addEventListener("click", () => show(c.dataset.ipo)));
  show("entrada");

  // ---- Simulador ----
  const PLACAS = { empleado: "1234 BCD", cliente: "5678 FGH", publico: "9012 JKL" }; // ficticias
  const TICKET = "T-2026-004817"; // id de ticket ficticio
  let perfil = "empleado";
  const tiempo = $("#simTiempo"), conf = $("#simConf"), caja = $("#simCaja");

  function tarifa(min) { return Math.min(REGLAS.TOPE_DIARIO, (min / 60) * REGLAS.TARIFA_HORA); }
  const fmtMin = (m) => (m < 60 ? `${m} min` : `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, "0")} min`);

  function simular() {
    const min = +tiempo.value, c = +conf.value, validada = caja.checked;
    const placa = PLACAS[perfil];
    $("#simTiempoOut").textContent = fmtMin(min);
    $("#simConfOut").textContent = c.toFixed(2);
    $("#simCajaField").classList.toggle("is-off", perfil !== "cliente");
    $("#simCajaTxt").textContent = validada ? "Sí, validada en caja" : "No (se le olvidó o no compró)";

    const steps = [];
    let verdict;
    steps.push(["📷", `Entrada: la cámara lee <code>${placa}</code> y se guarda la hora de entrada.`]);
    if (perfil === "cliente") {
      steps.push(["🛒", validada ? `El cajero apunta <code>${placa}</code> en el TPV y se asocia al ticket <code>${TICKET}</code>.` : "El cajero <b>no</b> apunta la matrícula: no hay ticket asociado."]);
    }
    steps.push(["📷", `Salida tras ${fmtMin(min)}: lectura con confianza <b>${c.toFixed(2)}</b>.`]);

    if (c < REGLAS.UMBRAL) {
      steps.push(["⚠️", `Confianza &lt; ${REGLAS.UMBRAL.toFixed(2)}: no se puede asegurar qué matrícula es.`]);
      verdict = { cls: "warn", icon: "🧑‍⚖️", t: "Revisión humana", d: "La barrera no se abre sola: el personal comprueba la matrícula por el interfono o la cámara." };
    } else if (perfil === "empleado") {
      steps.push(["🔎", "Consulta: la matrícula <b>está</b> en el registro de empleados."]);
      verdict = { cls: "ok", icon: "👔", t: "Empleado · barrera abierta", d: "No paga. Se guarda solo la hora de salida." };
    } else {
      steps.push(["🔎", "Consulta: la matrícula <b>no</b> está en el registro de empleados."]);
      if (perfil === "cliente" && validada) {
        steps.push(["🛒", `Consulta: la matrícula tiene hoy el ticket <code>${TICKET}</code> asociado.`]);
        const exceso = Math.max(0, min - REGLAS.MIN_GRATIS_CLIENTE);
        verdict = exceso === 0
          ? { cls: "ok", icon: "🛒", t: "Cliente · gratis", d: `Ha estado ${fmtMin(min)}, dentro de los ${REGLAS.MIN_GRATIS_CLIENTE} min gratuitos. Se registra la salida con el ticket ${TICKET}.` }
          : { cls: "pay", icon: "🛒", t: `Cliente · paga ${eur(tarifa(exceso))}`, d: `Supera el tiempo gratuito en ${fmtMin(exceso)}; se cobra solo el exceso. Se registra con el ticket ${TICKET}.` };
      } else {
        if (perfil === "cliente") steps.push(["🛒", "Consulta: la matrícula <b>no</b> tiene ningún ticket hoy → se trata como público."]);
        verdict = { cls: "pay", icon: "🅿️", t: `Público · paga ${eur(tarifa(min))}`, d: `${fmtMin(min)} × ${eur(REGLAS.TARIFA_HORA)}/h${tarifa(min) === REGLAS.TOPE_DIARIO ? " (tope diario)" : ""}.` +
          (perfil === "cliente" ? " Si compró y no le validaron, puede reclamar al personal enseñando el ticket." : "") };
      }
    }
    $("#simTrace").innerHTML = steps.map(([i, t], k) => `<li style="--i:${k}"><span>${i}</span><p>${t}</p></li>`).join("");
    $("#simVerdict").className = "verdict verdict--" + verdict.cls;
    $("#simVerdict").innerHTML = `<span class="verdict__icon">${verdict.icon}</span><div><b>${verdict.t}</b><p>${verdict.d}</p></div>`;
  }

  $$("#simPerfil button").forEach((b) => b.addEventListener("click", () => {
    perfil = b.dataset.p;
    $$("#simPerfil button").forEach((x) => x.classList.toggle("is-active", x === b));
    simular();
  }));
  [tiempo, conf, caja].forEach((el) => el.addEventListener("input", simular));
  simular();
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
  // Admite el formato clásico (Mes,Python: (Todo el mundo),...) y el nuevo con comillas ("Time","Python",...)
  const lines = text.replace(/\r/g, "").replace(/^\uFEFF/, "").split("\n").filter((l) => l.trim() !== "");
  const isDate = (l) => /^\d{4}-\d{2}/.test(splitCSV(l || "")[0] || "");
  const hIdx = lines.findIndex((l, k) => l.includes(",") && !isDate(l) && isDate(lines[k + 1]));
  if (hIdx === -1) throw new Error("Formato CSV no reconocido");
  const headers = splitCSV(lines[hIdx]);
  const series = headers.slice(1).map((h) => ({ label: h.replace(/:\s*\(.*\)$/, "").trim(), lang: detectLang(h), data: [] }));
  const dates = [];
  for (const l of lines.slice(hIdx + 1)) {
    const cells = splitCSV(l);
    if (!/^\d{4}-\d{2}/.test(cells[0])) continue;
    dates.push(cells[0].slice(0, 7)); // 2008-01-01 → 2008-01
    const vals = cells.slice(1).map((v) => (v === "<1" ? 0.5 : Number(v) || 0));
    // Mes con todo a 0 = hueco de datos de Google (p. ej. YouTube ene-jul 2017) → sin dato
    const gap = vals.every((v) => v === 0);
    series.forEach((s, k) => s.data.push(gap ? null : vals[k]));
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
        const vals = s.data.filter((v, k) => dates[k].startsWith(y) && v !== null);
        return vals.length ? +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : null;
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
      borderWidth: 2.5, pointRadius: 0, pointHoverRadius: 5, tension: 0.35, spanGaps: false, hidden: hidden.has(s.label),
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
  // Fuentes de cada tarjeta
  const SRC = {
    python: ["py-tut", "pep20", "opencv", "torchvision", "ultralytics", "easyocr", "hf-hub"],
    js: ["mdn-js", "node", "express", "tfjs", "ort-web"],
    r: ["r-about", "shiny", "torch-r"],
    cpp: ["isocpp", "libtorch", "opencv"],
    php: ["php-what", "rubix"],
    java: ["devjava", "spring", "djl"],
  };
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
          <p class="lang__src">📚 Fuentes ${cite(SRC[l.id])}</p>
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

/* Fuentes de cada casilla (mismo orden que CRITERIA). [] = valoración del equipo sin fuente directa */
const JUSTIF_SRC = {
  //       aprender     legible            manten    integ                 datos       estad            libs                                     pre                                  rend                      ui
  python: [["py-tut"], ["pep8", "pep20"], ["pep8"], ["fastapi"],           ["opencv"], ["statsmodels"], ["torchvision", "ultralytics", "easyocr"], ["hf-hub", "torchvision", "ultralytics"], ["octoverse", "so2025"], []],
  js:     [["mdn-js"], ["mdn-js"],        ["ts"],   ["node", "express"],   [],         [],              ["tfjs", "ort-web", "tesseractjs"],        ["tfjs", "ort-web"],                  ["node", "so2025"],       ["mdn-js"]],
  r:      [["r-about"], [],               [],       ["plumber", "shiny"],  ["r-about"], ["r-about"],    ["torch-r"],                               ["torch-r"],                          [],                       ["shiny"]],
  cpp:    [["isocpp"], ["isocpp"],        [],       [],                    ["opencv"], [],              ["libtorch", "opencv"],                    ["libtorch"],                         ["isocpp", "tiobe"],      []],
  php:    [["php-what"], [],              [],       ["php-what"],          ["php-gd"], [],              ["rubix"],                                 ["rubix"],                            [],                       ["php-what"]],
  java:   [["devjava"], ["devjava"],      ["devjava"], ["spring"],         [],         [],              ["djl"],                                   ["djl"],                              ["tiobe"],                []],
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
      <div class="modal__src" id="modalSrc"></div>
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
    const ids = (JUSTIF_SRC[l.id] || [])[cur.k] || [];
    $("#modalSrc").innerHTML = ids.length
      ? `<span>📚 Fuentes</span>${srcLinks(ids)}`
      : `<span>📚 Fuentes</span><em>Valoración del equipo, sin fuente directa. ✏️ Añadid una si la encontráis.</em>`;
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
    ["js", "Hay IA en el navegador (TensorFlow.js, ONNX), pero con muchos menos modelos de visión y OCR listos. Se queda para la app.", ["tfjs", "ort-web"]],
    ["r", "Muy bueno en estadística, pero pobre en visión por computador y en servir modelos por API.", ["r-about", "torch-r", "plumber"]],
    ["cpp", "Rendimiento máximo, pero desarrollar y mantener es mucho más costoso. Útil solo si se llevara a hardware embebido.", ["libtorch"]],
    ["php", "Prácticamente sin ecosistema de IA ni de visión.", ["rubix"]],
    ["java", "Viable (DJL), pero con menos modelos, tutoriales y comunidad de IA que Python.", ["djl"]],
  ];
  $("#discard").innerHTML = items.map(([id, t, src]) =>
    `<div class="discard__item" style="--c: var(${langById[id].color})"><b>❌ ${langById[id].name}</b>${t} ${cite(src)}</div>`).join("");
})();

/* ---------- 5. Paso 3 ---------- */
(function flow() {
  // ✏️ Paso 3 (Julen): flujo de 10 etapas, desde que el coche llega a la barrera hasta que sale.
  // kind: "ia" = parte de IA · "app" = reglas y base de datos · "humano" = decide una persona
  const KIND = { ia: ["🤖 IA", "--py"], app: ["🖥️ Aplicación", "--js"], humano: ["🧑‍⚖️ Humano", "--warn"] };
  const stages = [
    { ico: "🚗", t: "Llegada a la entrada", kind: "app", d: "Un coche se detiene ante la barrera de entrada. Un sensor detecta el vehículo y la cámara de entrada toma una imagen (en el estudio: imágenes de prueba).", tags: ["sensor", "cámara de entrada"] },
    { ico: "🖼️", t: "Validar y preparar", kind: "app", d: "Se comprueba que la imagen es válida (formato, tamaño, no dañada) y se prepara: redimensionar, normalizar y mejorar el contraste para que el modelo reciba lo que espera.", tags: ["OpenCV", "control de errores"] },
    { ico: "🎯", t: "Leer la matrícula", kind: "ia", d: "El detector localiza la matrícula en la imagen y el OCR lee los caracteres. Se comprueba el formato (4 números + 3 letras) y la confianza de la lectura.", tags: ["YOLO", "OCR", "modelo preentrenado"] },
    { ico: "⚠️", t: "¿Lectura fiable?", kind: "humano", human: true, d: "Si la confianza es menor que 0,80 o el formato no encaja, la barrera no decide sola: el personal del parking comprueba la matrícula por interfono o cámara y la corrige.", tags: ["umbral 0,80", "interfono"] },
    { ico: "📝", t: "Registrar la entrada", kind: "app", d: "Se guarda la matrícula y la hora de entrada (no la imagen) y se abre la barrera. Todos los coches entran igual; el perfil se decide al salir.", tags: ["BBDD movimientos", "retención mínima"] },
    { ico: "🛒", t: "Validación en caja", kind: "humano", human: true, optional: true, d: "Solo si el conductor compra en el supermercado: al cobrar, el cajero apunta la matrícula en el TPV y el sistema la asocia al id del ticket de esa compra.", tags: ["TPV", "matrícula + id ticket", "opcional"] },
    { ico: "🚙", t: "Llegada a la salida", kind: "ia", d: "La cámara de salida toma una imagen y se repite la lectura (etapas 2–4): detección, OCR y comprobación de confianza, con revisión humana si hace falta.", tags: ["cámara de salida", "mismo modelo"] },
    { ico: "🔎", t: "Clasificar el coche", kind: "app", d: "Se consulta la base de datos: ¿la matrícula está en el registro de empleados? → empleado. Si no, ¿tiene hoy un ticket asociado? → cliente. Si no → público.", tags: ["BBDD empleados", "BBDD tickets"] },
    { ico: "💶", t: "Calcular el importe", kind: "app", d: "Con la hora de entrada y la de salida se calcula la estancia. Empleado: 0 €. Cliente: gratis los primeros 90 min y después solo el exceso. Público: 2,40 €/h con tope de 18 €/día.", tags: ["reglas de tarifa"] },
    { ico: "🧾", t: "Resultado y salida", kind: "app", d: "Si hay importe, el conductor paga en la barrera o en el cajero; después se abre la barrera. Se guarda un registro mínimo: matrícula, perfil, horas, importe e id del ticket. Las reclamaciones las resuelve el personal.", tags: ["barrera", "pago", "registro JSON/CSV"] },
  ];
  const ol = $("#flow");
  ol.innerHTML = stages.map((s, k) => `<li data-k="${k}" class="${s.human ? "is-human" : ""}${s.optional ? " is-optional" : ""}" style="--kc: var(${KIND[s.kind][1]})">
    <span class="f-ico">${s.ico}</span>${s.t}<span class="f-kind">${KIND[s.kind][0]}</span></li>`).join("");
  let cur = 0; let timer = null;

  function go(k) {
    cur = (k + stages.length) % stages.length;
    $$("#flow li").forEach((li, j) => {
      li.classList.toggle("is-done", j < cur);
      li.classList.toggle("is-current", j === cur);
    });
    const s = stages[cur];
    $("#flowDetail").innerHTML = `<div class="big">${s.ico}</div><div><h4>${cur + 1}. ${s.t} <span class="f-kind f-kind--big" style="--kc: var(${KIND[s.kind][1]})">${KIND[s.kind][0]}</span></h4><p>${s.d}</p>
      ${s.human ? '<p class="human-note">⚠️ Aquí interviene una persona.</p>' : ""}
      <div class="tagline">${s.tags.map((t) => `<span>${t}</span>`).join("")}</div></div>`;
    $("#flowCounter").textContent = `Etapa ${cur + 1} / ${stages.length}`;
  }
  const stop = () => { clearInterval(timer); timer = null; $("#flowPlay").textContent = "▶ Reproducir flujo"; };
  $("#flowPlay").addEventListener("click", () => {
    if (timer) return stop();
    $("#flowPlay").textContent = "⏸ Pausar";
    if (cur === stages.length - 1) go(0);
    timer = setInterval(() => { if (cur === stages.length - 1) return stop(); go(cur + 1); }, 2200);
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
      ["Recoger imágenes de prueba", "Dataset abierto de matrículas o imágenes sintéticas de entrada y salida: de día, de noche, con lluvia y en ángulo. Sin personas identificables.", "datasets abiertos"],
      ["Anotar", "Marcar la caja de cada matrícula y su texto correcto para poder medir si el modelo acierta.", "XML (Pascal VOC) / JSON"],
      ["Preparar los datos", "Limpiar, redimensionar y dividir en entrenamiento / validación / test.", "pandas · OpenCV"],
      ["Elegir modelos preentrenados", "Un detector de objetos y un OCR ya entrenados, en lugar de crearlos desde cero.", "YOLO · EasyOCR"],
      ["Ajustar y evaluar", "Ajuste fino con matrículas españolas; medir el % de matrículas bien leídas y elegir el umbral de confianza (0,80).", "PyTorch · métricas"],
      ["Preparar la aplicación", "Exportar el modelo y crear las bases de datos de prueba: empleados, tickets, movimientos y tarifas.", ".pt / ONNX · BBDD"],
    ],
    despues: [
      ["Cargar el modelo", "El servicio de IA carga el detector y el OCR una sola vez al arrancar.", "Python · FastAPI"],
      ["Recibir la imagen", "Cuando una cámara detecta un coche, la aplicación envía la imagen al servicio de IA.", "HTTP · JSON"],
      ["Leer la matrícula", "Preparar → detectar → OCR → comprobar formato y confianza. Devuelve matrícula + confianza.", "OpenCV · YOLO · OCR"],
      ["Decidir según el umbral", "Confianza ≥ 0,80 → sigue sola. Menor → aviso al personal para revisión humana.", "if / else"],
      ["Aplicar las reglas", "Entrada: registrar. Salida: clasificar (empleado / cliente / público) y calcular el importe.", "Node.js · BBDD"],
      ["Registrar y mejorar", "Guardar un registro mínimo y revisar las correcciones humanas para mejorar el modelo más adelante.", "JSON · CSV · logs"],
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
  ["", "# Matriculator · pseudocódigo de la SALIDA del parking (NO es código ejecutable)"],
  ["", "UMBRAL_CONFIANZA = 0.80"],
  ["", "MIN_GRATIS_CLIENTE = 90      # minutos"],
  ["", "TARIFA_HORA = 2.40           # €/hora"],
  ["", "TOPE_DIARIO = 18.00          # €"],
  ["", ""],
  ["fn", "función leer_matricula(imagen, detector, ocr):          # parte de IA"],
  ["if", "    si no es_imagen_valida(imagen): lanzar Error('Imagen no válida')"],
  ["fn", "    cajas = detector.detectar(preparar(imagen))"],
  ["if", "    si cajas está vacío: devolver None, 0.0"],
  ["fn", "    mejor = caja con mayor confianza de cajas"],
  ["fn", "    texto = limpiar(ocr.leer(recortar(imagen, mejor)))"],
  ["fn", "    devolver texto, mejor.confianza"],
  ["", ""],
  ["fn", "función clasificar(matricula, dia):                      # reglas"],
  ["if", "    si matricula en bd.empleados: devolver 'EMPLEADO', None"],
  ["fn", "    ticket = bd.tickets.buscar(matricula, dia)"],
  ["if", "    si ticket: devolver 'CLIENTE', ticket.id"],
  ["fn", "    devolver 'PUBLICO', None"],
  ["", ""],
  ["fn", "función calcular_importe(perfil, minutos):"],
  ["if", "    si perfil == 'EMPLEADO': devolver 0"],
  ["if", "    si perfil == 'CLIENTE': minutos = max(0, minutos - MIN_GRATIS_CLIENTE)"],
  ["fn", "    devolver min(TOPE_DIARIO, minutos / 60 * TARIFA_HORA)"],
  ["", ""],
  ["", "# ---- Programa principal: un coche llega a la salida ----"],
  ["in", "evento = recibir_evento('camara_salida')      # imagen + cámara + hora"],
  ["if", "intentar:"],
  ["fn", "    matricula, conf = leer_matricula(evento.imagen, detector, ocr)"],
  ["if", "    si matricula es None o conf < UMBRAL_CONFIANZA:"],
  ["out", "        avisar_personal(evento)                 # revisión humana"],
  ["in", "        matricula = esperar_confirmacion_humana()"],
  ["fn", "    entrada = bd.movimientos.ultima_entrada(matricula)"],
  ["if", "    si entrada es None: lanzar Error('Sin entrada registrada')"],
  ["fn", "    perfil, id_ticket = clasificar(matricula, hoy())"],
  ["fn", "    minutos = minutos_entre(entrada.hora, evento.hora)"],
  ["fn", "    importe = calcular_importe(perfil, minutos)"],
  ["if", "    si importe > 0: esperar_pago(importe)"],
  ["out", "    abrir_barrera()"],
  ["out", "    resultado = {matricula, perfil, id_ticket, minutos, importe, estado: 'OK'}"],
  ["if", "capturar Error como e:"],
  ["out", "    avisar_personal(evento, e.mensaje)"],
  ["out", "    resultado = {estado: 'ERROR', mensaje: e.mensaje}"],
  ["out", "guardar_registro('movimientos.csv', resultado)   # sin guardar la imagen"],
];

(function pseudo() {
  const KW = /\b(función|devolver|si no|si|intentar|capturar|lanzar|como|no|está vacío|o|es|None|en)\b/g;
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

/* ---------- Fuentes: citas estáticas, sección y navegación ---------- */
(function fuentes() {
  // Citas escritas en el HTML: <sup class="cite" data-src="id1,id2"></sup>
  $$("sup.cite[data-src]").forEach((s) => { s.outerHTML = cite(s.dataset.src); });

  // Tarjetas de la sección de fuentes
  const grid = $("#srcGrid");
  if (!grid) return;
  grid.innerHTML = SOURCES.map((s, i) => {
    const [cat, color] = SRC_CATS[s.cat];
    let domain = "";
    try { domain = new URL(s.url).hostname.replace(/^www\./, ""); } catch { /* url no válida */ }
    return `<article class="src reveal is-visible" id="src-${s.id}" data-cat="${s.cat}" style="--c: var(${color})">
      <span class="src__n">${i + 1}</span>
      <div class="src__body">
        <span class="src__cat">${cat}</span>
        <h4><a href="${s.url}" target="_blank" rel="noopener">${escapeHTML(s.title)} <span aria-hidden="true">↗</span></a></h4>
        <p class="src__org">${escapeHTML(s.org)}</p>
        <div class="src__meta"><span>🔗 ${domain}</span><span>📍 Citada en ${s.used}</span></div>
      </div>
    </article>`;
  }).join("");

  // Filtros por categoría
  const counts = SOURCES.reduce((a, s) => ((a[s.cat] = (a[s.cat] || 0) + 1), a), {});
  $("#srcFilter").innerHTML = `<button class="is-active" data-cat="all">Todas <b>${SOURCES.length}</b></button>` +
    Object.entries(SRC_CATS).map(([k, [n, c]]) => `<button data-cat="${k}" style="--c: var(${c})"><i></i>${n} <b>${counts[k] || 0}</b></button>`).join("");
  // Solo se muestran las primeras VISIBLES fuentes; el botón «Ver más» despliega el resto
  const VISIBLES = 3;
  const more = $("#srcMore");
  let current = "all", expanded = false;
  const render = () => {
    const match = $$("#srcGrid .src").filter((c) => current === "all" || c.dataset.cat === current);
    $$("#srcGrid .src").forEach((c) => (c.hidden = true));
    match.forEach((c, i) => {
      c.hidden = !expanded && i >= VISIBLES;
      if (!c.hidden && i >= VISIBLES) { c.classList.remove("is-in"); void c.offsetWidth; c.classList.add("is-in"); }
    });
    const rest = match.length - VISIBLES;
    more.hidden = rest <= 0;
    more.innerHTML = expanded ? "Ver menos <span>▴</span>" : `Ver más… <b>+${rest}</b> <span>▾</span>`;
    more.setAttribute("aria-expanded", expanded);
  };
  const filter = (cat, open = expanded) => {
    current = cat; expanded = open;
    $$("#srcFilter button").forEach((b) => b.classList.toggle("is-active", b.dataset.cat === cat));
    render();
  };
  $$("#srcFilter button").forEach((b) => b.addEventListener("click", () => filter(b.dataset.cat, false)));
  more.addEventListener("click", () => {
    expanded = !expanded;
    render();
    if (!expanded) $("#fuentes").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  render();

  // Clic en una cita [n] → baja a la fuente y la resalta
  document.addEventListener("click", (e) => {
    const a = e.target.closest(".cite a[data-src]");
    if (!a) return;
    e.preventDefault();
    e.stopPropagation();
    const card = document.getElementById("src-" + a.dataset.src);
    if (!card) return;
    if (card.hidden) filter("all", true);
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.classList.remove("is-flash"); void card.offsetWidth; card.classList.add("is-flash");
  }, true);
})();
