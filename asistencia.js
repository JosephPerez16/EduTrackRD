const estados = [
  "ok","ok","fail","ok","permiso",
  "ok","ok","ok","late","ok",
  "ok","fail","ok","ok","ok",
  "ok","late","ok","ok","permiso",
  "ok","ok","ok","ok","ok"
];

const calendario = document.getElementById("calendario");

const year = 2026;
const month = 0; // Enero = 0

let ok = 0;
let fail = 0;
let late = 0;
let permiso = 0;

const firstDay = new Date(year, month, 1).getDay();
const totalDays = new Date(year, month + 1, 0).getDate();

let indexEstado = 0;

let start = firstDay === 0 ? 6 : firstDay - 1;

for (let i = 0; i < start; i++) {
  const empty = document.createElement("div");
  calendario.appendChild(empty);
}

for (let day = 1; day <= totalDays; day++) {

  const date = new Date(year, month, day);
  const weekDay = date.getDay();

  if (weekDay === 0 || weekDay === 6) continue;

  const d = document.createElement("div");
  d.classList.add("dia");
  d.textContent = day;

  const estado = estados[indexEstado];

  if (estado) {

    d.classList.add(estado);

    if (estado === "ok") ok++;
    if (estado === "fail") fail++;
    if (estado === "late") late++;
    if (estado === "permiso") permiso++;

    indexEstado++;

  }

  calendario.appendChild(d);

}

const total = ok + fail + late + permiso;
const porcentaje = total ? Math.round((ok / total) * 100) : 0;

document.getElementById("ok").innerText = ok;
document.getElementById("fail").innerText = fail;
document.getElementById("late").innerText = late;
document.getElementById("permiso").innerText = permiso;
document.getElementById("porcentaje").innerText = porcentaje + "%";

new Chart(document.getElementById("chart"), {

  type: "doughnut",

  data: {

    labels: ["Asistencias","Faltas","Tardanzas","Permisos"],

    datasets: [{
      data: [ok, fail, late, permiso],
      backgroundColor: [
        "#16a34a",
        "#dc2626",
        "#facc15",
        "#2563eb"
      ],
      borderWidth: 0
    }]

  },

  options: {

    responsive: true,
    cutout: "75%",

    plugins: {
      legend: {
        position: "bottom"
      }
    }

  }

});
