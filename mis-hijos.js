const hijos = [
  {
    nombre: "Alison Pérez Céspedes",
    grado: "5to de Secundaria",
    centro: "Politécnico Luis Medrano Gonzales"
  },
  {
    nombre: "Amelia Pérez Céspedes",
    grado: "2do de Primaria",
    centro: "Liceo Pastor Roberto Mendez"
  }
];

const contenedor = document.getElementById("listaHijos");

hijos.forEach(hijo => {
  const card = document.createElement("div");
  card.className = "hijo-card";

  card.innerHTML = `
    <h3>${hijo.nombre}</h3>
    <p><b>Grado:</b> ${hijo.grado}</p>
    <p><b>Centro:</b> ${hijo.centro}</p>
    <button>Ver detalles</button>
  `;

  card.querySelector("button").addEventListener("click", () => {
    localStorage.setItem("hijoSeleccionado", JSON.stringify(hijo));
    window.location.href = "dashboard-padres.html";
  });

  contenedor.appendChild(card);
});
