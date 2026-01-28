const hijo = JSON.parse(localStorage.getItem("hijoSeleccionado"));

const nombre = document.getElementById("nombreHijo");
const info = document.getElementById("infoHijo");

if (hijo) {
  nombre.innerText = hijo.nombre;
  info.innerText = `${hijo.grado} • ${hijo.centro}`;
} else {
  nombre.innerText = "Estudiante no seleccionado";
  info.innerText = "";
}


document.getElementById("logout").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "index.html";
});


const modalPermiso = document.getElementById("modalPermiso");
const openPermiso = document.getElementById("openPermiso");
const closePermiso = document.getElementById("closeModal");
const formPermiso = document.getElementById("permisoForm");


if (openPermiso) {
  openPermiso.addEventListener("click", () => {
    modalPermiso.style.display = "flex";
    document.body.style.overflow = "hidden";
  });
}


if (closePermiso) {
  closePermiso.addEventListener("click", () => {
    cerrarPermiso();
  });
}


function cerrarPermiso() {
  modalPermiso.style.display = "none";
  document.body.style.overflow = "auto";
}


modalPermiso.addEventListener("click", e => {
  if (e.target === modalPermiso) {
    cerrarPermiso();
  }
});


formPermiso.addEventListener("submit", e => {
  e.preventDefault();

  alert("Permiso enviado correctamente");

  cerrarPermiso();
  formPermiso.reset();
});
