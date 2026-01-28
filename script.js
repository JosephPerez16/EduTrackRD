const modal = document.getElementById("loginModal");
const title = document.getElementById("loginTitle");
const usuario = document.getElementById("usuario");

function mostrarLogin(tipo) {
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";

  if (tipo === "padre") {
    title.innerText = "Acceso Padres / Tutores";
    usuario.placeholder = "Cédula de identidad";
  } 
  else if (tipo === "docente") {
    title.innerText = "Acceso Docentes";
    usuario.placeholder = "Correo electrónico";
  } 
  else {
    title.innerText = "Acceso Administrativo";
    usuario.placeholder = "Usuario administrativo";
  }
}

function cerrarLogin() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

function loginPadre(e) {
  e.preventDefault();

  const cedula = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;

  const demoCedula = "40224413530";
  const demoPassword = "Bri12";

  if (cedula === demoCedula && password === demoPassword) {
    window.location.href = "mis-hijos.html";
  } else {
    alert("Cédula o contraseña incorrecta");
  }
}
