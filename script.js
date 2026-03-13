const panelTitle = document.getElementById("panelTitle");
const panelSubtitle = document.getElementById("panelSubtitle");
const authForm = document.getElementById("authForm");
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const submitBtn = document.getElementById("submitBtn");
const helperText = document.getElementById("helperText");
const statusMessage = document.getElementById("statusMessage");
const identificadorLabel = document.getElementById("identificadorLabel");
const identificador = document.getElementById("identificador");
const correo = document.getElementById("correo");
const nombre = document.getElementById("nombre");
const telefono = document.getElementById("telefono");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

let modoActual = "login";
let rolActual = "padre";

function activarModo(modo) {
  modoActual = modo;

  authForm.reset();

  if (modo === "register") {
    document.body.classList.add("register-mode");
    loginTab.classList.remove("active");
    registerTab.classList.add("active");
    submitBtn.textContent = "Crear cuenta";
    panelSubtitle.textContent = "Complete sus datos para registrarse en la plataforma.";
    helperText.innerHTML = '¿Ya tienes cuenta? <span onclick="activarModo(\'login\')">Inicia sesión aquí</span>';
  } else {
    document.body.classList.remove("register-mode");
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    submitBtn.textContent = "Ingresar";
    panelSubtitle.textContent = "Ingrese sus credenciales para acceder a la plataforma.";
    helperText.innerHTML = '¿No tienes cuenta? <span onclick="activarModo(\'register\')">Regístrate aquí</span>';
  }

  actualizarRol(rolActual);
  limpiarEstado();
}

function seleccionarRol(rol, boton) {
  document.querySelectorAll(".role-btn").forEach(btn => btn.classList.remove("active"));
  boton.classList.add("active");
  actualizarRol(rol);
}

function actualizarRol(rol) {
  rolActual = rol;

  if (rol === "padre") {
    panelTitle.textContent = modoActual === "register" ? "Registro Padres / Tutores" : "Acceso Padres / Tutores";
    identificadorLabel.textContent = "Cédula de identidad";
    identificador.placeholder = "Ingrese su cédula";
    correo.placeholder = "Ingrese su correo electrónico";
  } else if (rol === "docente") {
    panelTitle.textContent = modoActual === "register" ? "Registro Docentes" : "Acceso Docentes";
    identificadorLabel.textContent = "Correo institucional";
    identificador.placeholder = "Ingrese su correo institucional";
    correo.placeholder = "Ingrese su correo electrónico";
  } else {
    panelTitle.textContent = modoActual === "register" ? "Registro Administrativo" : "Acceso Administrativo";
    identificadorLabel.textContent = "Usuario administrativo";
    identificador.placeholder = "Ingrese su usuario administrativo";
    correo.placeholder = "Ingrese su correo electrónico";
  }

  document.querySelectorAll(".role-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.role === rolActual);
  });

  limpiarEstado();
}

function limpiarEstado() {
  statusMessage.textContent = "";
}

function mostrarMensaje(texto) {
  statusMessage.textContent = texto;
}

function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("edutrack_users")) || [];
}

function guardarUsuarios(usuarios) {
  localStorage.setItem("edutrack_users", JSON.stringify(usuarios));
}

function guardarSesion(usuario) {
  localStorage.setItem("edutrack_session", JSON.stringify(usuario));
}

function redireccionarPorRol(rol) {
  if (rol === "padre") {
    window.location.href = "mis-hijos.html";
    return;
  }

  if (rol === "docente") {
    window.location.href = "docente-panel.html";
    return;
  }

  window.location.href = "admin-panel.html";
}

authForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const valorNombre = nombre.value.trim();
  const valorTelefono = telefono.value.trim();
  const valorIdentificador = identificador.value.trim().toLowerCase();
  const valorCorreo = correo.value.trim().toLowerCase();
  const valorPassword = password.value.trim();
  const valorConfirmPassword = confirmPassword.value.trim();

  if (modoActual === "register") {

    if (!valorNombre || !valorTelefono || !valorIdentificador || !valorCorreo || !valorPassword || !valorConfirmPassword) {
      mostrarMensaje("Complete todos los campos requeridos.");
      return;
    }

    if (valorPassword !== valorConfirmPassword) {
      mostrarMensaje("Las contraseñas no coinciden.");
      return;
    }

    const usuarios = obtenerUsuarios();

    const existe = usuarios.some(usuario =>
      usuario.identificador.toLowerCase() === valorIdentificador ||
      usuario.correo.toLowerCase() === valorCorreo
    );

    if (existe) {
      mostrarMensaje("Ya existe una cuenta registrada con esos datos.");
      return;
    }

    const nuevoUsuario = {
      rol: rolActual,
      nombre: valorNombre,
      telefono: valorTelefono,
      identificador: valorIdentificador,
      correo: valorCorreo,
      password: valorPassword
    };

    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);

    authForm.reset();
    activarModo("login");
    actualizarRol(rolActual);

    identificador.value = valorIdentificador;

    mostrarMensaje("Registro completado correctamente. Ya puede iniciar sesión.");
    return;
  }

  if (!valorIdentificador || !valorPassword) {
    mostrarMensaje("Ingrese sus credenciales.");
    return;
  }

  if (rolActual === "padre" && valorIdentificador === "40224413530" && valorPassword === "Bri12") {
    guardarSesion({
      rol: "padre",
      nombre: "Usuario Demo",
      identificador: "40224413530"
    });

    redireccionarPorRol("padre");
    return;
  }

  const usuarios = obtenerUsuarios();

  const usuarioEncontrado = usuarios.find(usuario =>
    usuario.rol === rolActual &&
    usuario.identificador.toLowerCase() === valorIdentificador &&
    usuario.password === valorPassword
  );

  if (!usuarioEncontrado) {
    mostrarMensaje("Credenciales incorrectas o cuenta no registrada.");
    return;
  }

  guardarSesion(usuarioEncontrado);
  redireccionarPorRol(usuarioEncontrado.rol);
});

actualizarRol("padre");
activarModo("login");