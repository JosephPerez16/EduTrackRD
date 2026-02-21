const hijos = [
  {
    id: "EST-001",
    nombre: "Alison Pérez Céspedes",
    grado: "5to de Secundaria",
    seccion: "A",
    centro: "Politécnico Luis Medrano Gonzales",
    anoEscolar: "2025-2026"
  },
  {
    id: "EST-002",
    nombre: "Amelia Pérez Céspedes",
    grado: "2do de Primaria",
    seccion: "B",
    centro: "Liceo Pastor Roberto Mendez",
    anoEscolar: "2025-2026"
  }
];

const contenedor = document.getElementById("listaHijos");

hijos.forEach(hijo => {
  const card = document.createElement("div");
  card.className = "hijo-card";

  card.innerHTML = `
    <h3>${hijo.nombre}</h3>
    <p><strong>ID:</strong> ${hijo.id}</p>
    <p><strong>Grado:</strong> ${hijo.grado} - ${hijo.seccion}</p>
    <p><strong>Centro:</strong> ${hijo.centro}</p>
    <p><strong>Año Escolar:</strong> ${hijo.anoEscolar}</p>
    <button>Ver detalles</button>
  `;

  card.querySelector("button").addEventListener("click", () => {

    const hijoSeleccionado = {
      id: hijo.id,
      nombre: hijo.nombre,
      grado: hijo.grado,
      seccion: hijo.seccion,
      centro: hijo.centro,
      anoEscolar: hijo.anoEscolar
    };

    localStorage.setItem("hijoSeleccionado", JSON.stringify(hijoSeleccionado));

    window.location.href = "dashboard-padres.html";
  });

  contenedor.appendChild(card);
});