const hijo = JSON.parse(localStorage.getItem("hijoSeleccionado"));

if (!hijo) {
  window.location.href = "mis-hijos.html";
}

document.getElementById("nombreHijo").textContent = hijo.nombre;
document.getElementById("detalleGrado").textContent = `${hijo.grado} - ${hijo.seccion}`;
document.getElementById("detalleCentro").textContent = hijo.centro;

const year = 2026;

const mesesLectivos = [
  { nombre: "Enero", mes: 0 },
  { nombre: "Febrero", mes: 1 },
  { nombre: "Marzo", mes: 2 },
  { nombre: "Abril", mes: 3 },
  { nombre: "Mayo", mes: 4 },
  { nombre: "Junio", mes: 5 }
];

const baseAsistencia = {
  "EST-001": {
    0: ["ok", "ok", "fail", "ok", "permiso", "ok", "ok", "ok", "late", "ok", "ok", "fail", "ok", "ok", "ok", "ok", "late", "ok", "ok", "permiso", "ok", "ok", "ok", "ok", "ok"],
    1: ["ok", "ok", "ok", "ok", "ok", "ok", "fail", "ok", "late", "ok", "ok", "ok", "ok", "permiso", "ok", "ok", "ok", "ok", "ok"],
    2: ["ok", "ok", "ok", "late", "ok", "ok", "fail", "ok", "ok", "permiso", "ok", "ok", "ok", "late", "ok", "ok", "ok", "fail", "ok", "ok", "permiso", "ok"]
  },
  "EST-002": {
    0: ["ok", "ok", "ok", "ok", "ok", "ok", "ok", "ok", "ok", "ok", "ok", "ok", "ok", "ok", "ok", "ok", "ok", "ok", "ok", "ok"],
    1: ["ok", "fail", "ok", "late", "ok", "ok", "ok", "ok", "ok", "ok", "ok", "ok", "ok", "ok", "ok"],
    2: ["ok", "ok", "late", "ok", "ok", "ok", "ok", "permiso", "ok", "ok", "ok", "ok", "fail", "ok", "ok", "ok", "late", "ok", "ok", "ok", "ok", "ok"]
  }
};

const selectorMes = document.getElementById("selectorMes");
const calendario = document.getElementById("calendario");
const porcentajeElem = document.getElementById("porcentaje");
const porcentajeTopElem = document.getElementById("porcentajeTop");
const diasLectivosElem = document.getElementById("diasLectivos");
const okElem = document.getElementById("ok");
const failElem = document.getElementById("fail");
const lateElem = document.getElementById("late");
const permisoElem = document.getElementById("permiso");
const mesActualTexto = document.getElementById("mesActualTexto");

let chartResumenInstance = null;
let chartTendenciaInstance = null;

function cargarMeses() {
  mesesLectivos.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.mes;
    option.textContent = `${item.nombre} ${year}`;
    selectorMes.appendChild(option);
  });

  selectorMes.value = "2";
}

function crearEspacioVacio() {
  const espacio = document.createElement("div");
  espacio.className = "empty-day";
  return espacio;
}

function obtenerEstadosMes(month) {
  return (baseAsistencia[hijo.id] || {})[month] || [];
}

function actualizarResumen(ok, fail, late, permiso) {
  const total = ok + fail + late + permiso;
  const porcentaje = total ? Math.round((ok / total) * 100) : 0;

  okElem.textContent = ok;
  failElem.textContent = fail;
  lateElem.textContent = late;
  permisoElem.textContent = permiso;
  porcentajeElem.textContent = `${porcentaje}%`;
  porcentajeTopElem.textContent = `${porcentaje}%`;
  diasLectivosElem.textContent = total;
}

function construirDatosSemanales(estados) {
  const semanas = [];
  const chunkSize = 5;

  for (let i = 0; i < estados.length; i += chunkSize) {
    const bloque = estados.slice(i, i + chunkSize);
    const asistencias = bloque.filter((item) => item === "ok").length;
    semanas.push(asistencias);
  }

  return semanas;
}

function renderChartResumen(ok, fail, late, permiso) {
  if (chartResumenInstance) {
    chartResumenInstance.destroy();
  }

  chartResumenInstance = new Chart(document.getElementById("chartResumen"), {
    type: "doughnut",
    data: {
      labels: ["Asistencias", "Faltas", "Tardanzas", "Permisos"],
      datasets: [
        {
          data: [ok, fail, late, permiso],
          backgroundColor: ["#16a34a", "#dc2626", "#facc15", "#2563eb"],
          borderWidth: 0,
          hoverOffset: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: "76%",
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: "#0f274a",
          titleColor: "#ffffff",
          bodyColor: "#dce9ff",
          borderColor: "rgba(255,255,255,0.12)",
          borderWidth: 1,
          padding: 12
        }
      }
    }
  });
}

function renderChartTendencia(estados) {
  const semanas = construirDatosSemanales(estados);
  const labels = semanas.map((_, index) => `Semana ${index + 1}`);

  if (chartTendenciaInstance) {
    chartTendenciaInstance.destroy();
  }

  chartTendenciaInstance = new Chart(document.getElementById("chartTendencia"), {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Asistencias por semana",
          data: semanas,
          backgroundColor: "rgba(255,255,255,0.85)",
          borderRadius: 12,
          borderSkipped: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: "#0f274a",
          titleColor: "#ffffff",
          bodyColor: "#dce9ff",
          borderColor: "rgba(255,255,255,0.12)",
          borderWidth: 1,
          padding: 12
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#dce9ff",
            font: {
              family: "Poppins"
            }
          },
          grid: {
            display: false
          },
          border: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            color: "#dce9ff",
            font: {
              family: "Poppins"
            }
          },
          grid: {
            color: "rgba(255,255,255,0.08)"
          },
          border: {
            display: false
          }
        }
      }
    }
  });
}

function generarCalendario(month) {
  calendario.innerHTML = "";

  const estados = obtenerEstadosMes(month);
  const primerDia = new Date(year, month, 1).getDay();
  const totalDiasMes = new Date(year, month + 1, 0).getDate();
  const inicio = primerDia === 0 ? 6 : primerDia - 1;

  const nombreMes = mesesLectivos.find((item) => item.mes === month)?.nombre || "Mes";
  mesActualTexto.textContent = `Visualización de ${nombreMes} ${year}`;

  let ok = 0;
  let fail = 0;
  let late = 0;
  let permiso = 0;
  let indexEstado = 0;

  for (let i = 0; i < inicio; i++) {
    calendario.appendChild(crearEspacioVacio());
  }

  for (let day = 1; day <= totalDiasMes; day++) {
    const fecha = new Date(year, month, day);
    const diaSemana = fecha.getDay();

    if (diaSemana === 0 || diaSemana === 6) {
      continue;
    }

    const dia = document.createElement("div");
    dia.classList.add("dia");
    dia.textContent = day;

    const estado = estados[indexEstado];

    if (estado) {
      dia.classList.add(estado);

      if (estado === "ok") ok++;
      if (estado === "fail") fail++;
      if (estado === "late") late++;
      if (estado === "permiso") permiso++;

      indexEstado++;
    } else {
      dia.style.background = "rgba(255,255,255,0.08)";
      dia.style.border = "1px solid rgba(255,255,255,0.1)";
      dia.style.color = "#dce9ff";
    }

    calendario.appendChild(dia);
  }

  actualizarResumen(ok, fail, late, permiso);
  renderChartResumen(ok, fail, late, permiso);
  renderChartTendencia(estados);
}

selectorMes.addEventListener("change", () => {
  generarCalendario(parseInt(selectorMes.value, 10));
});

cargarMeses();
generarCalendario(2);