const hijo = JSON.parse(localStorage.getItem("hijoSeleccionado"));
if (!hijo) window.location.href = "mis-hijos.html";

document.getElementById("nombreHijo").textContent = hijo.nombre;
document.getElementById("detalleId").textContent = hijo.id;
document.getElementById("detalleGrado").textContent = `${hijo.grado} - ${hijo.seccion}`;
document.getElementById("detalleCentro").textContent = hijo.centro;
document.getElementById("detalleAno").textContent = hijo.anoEscolar;

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("hijoSeleccionado");
  window.location.href = "index.html";
});

const modalPermiso = document.getElementById("modalPermiso");
const openPermiso = document.getElementById("openPermiso");
const closePermiso = document.getElementById("closeModal");
const formPermiso = document.getElementById("permisoForm");

const cerrarModal = () => {
  modalPermiso.style.display = "none";
  document.body.style.overflow = "auto";
};

openPermiso.addEventListener("click", () => {
  modalPermiso.style.display = "flex";
  document.body.style.overflow = "hidden";
});

closePermiso.addEventListener("click", cerrarModal);

modalPermiso.addEventListener("click", (e) => {
  if (e.target === modalPermiso) cerrarModal();
});

formPermiso.addEventListener("submit", (e) => {
  e.preventDefault();
  cerrarModal();
  formPermiso.reset();
});