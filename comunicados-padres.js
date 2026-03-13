const comunicadosPorCentro = {
  "Politécnico Luis Medrano Gonzales": [
    {
      titulo: "Reunión de padres y tutores del primer cuatrimestre",
      fecha: "15 de octubre de 2025",
      tipo: "Importante",
      area: "Académica",
      icono: "fas fa-users",
      descripcion: "Se informa a los padres y tutores que el próximo 15 de octubre se estará realizando la reunión general para tratar el rendimiento académico, asistencia y seguimiento institucional correspondiente al primer cuatrimestre. La asistencia puntual es de gran importancia."
    },
    {
      titulo: "Entrega oficial de boletines de calificaciones",
      fecha: "28 de octubre de 2025",
      tipo: "Informativo",
      area: "Académica",
      icono: "fas fa-file-lines",
      descripcion: "La entrega de boletines se realizará en horario matutino en la coordinación académica. Se exhorta a cada padre, madre o tutor a presentarse con tiempo para retirar el documento y recibir orientaciones generales del proceso escolar."
    },
    {
      titulo: "Uso correcto del uniforme escolar",
      fecha: "04 de noviembre de 2025",
      tipo: "Recordatorio",
      area: "Convivencia",
      icono: "fas fa-shirt",
      descripcion: "Recordamos a toda la comunidad educativa la importancia del uso adecuado y completo del uniforme escolar durante la jornada académica. Esta disposición forma parte de las normas institucionales vigentes."
    },
    {
      titulo: "Jornada de feria tecnológica del centro",
      fecha: "19 de noviembre de 2025",
      tipo: "Actividad",
      area: "Institucional",
      icono: "fas fa-laptop-code",
      descripcion: "El centro educativo celebrará una feria tecnológica con exposición de proyectos estudiantiles, demostraciones prácticas y participación de distintas áreas formativas. Invitamos a las familias a apoyar esta actividad institucional."
    },
    {
      titulo: "Actualización de expediente estudiantil",
      fecha: "02 de diciembre de 2025",
      tipo: "Administrativo",
      area: "Administración",
      icono: "fas fa-folder-open",
      descripcion: "Se solicita a los padres y tutores verificar y completar cualquier documento pendiente del expediente estudiantil, con el fin de mantener actualizados los registros administrativos del centro educativo."
    },
    {
      titulo: "Suspensión de docencia por actividad institucional",
      fecha: "12 de enero de 2026",
      tipo: "Importante",
      area: "Institucional",
      icono: "fas fa-calendar-xmark",
      descripcion: "Se comunica que las labores docentes quedarán suspendidas durante la fecha indicada debido a una actividad institucional programada por la dirección del centro. Las actividades académicas se retomarán en el horario habitual al día siguiente."
    }
  ],
  "Liceo Pastor Roberto Mendez": [
    {
      titulo: "Encuentro formativo con padres y tutores",
      fecha: "10 de octubre de 2025",
      tipo: "Importante",
      area: "Académica",
      icono: "fas fa-people-group",
      descripcion: "La dirección del centro invita a los padres y tutores a un encuentro formativo para tratar temas de acompañamiento escolar, disciplina positiva, seguimiento del aprendizaje y participación familiar en el proceso educativo."
    },
    {
      titulo: "Cronograma de actividades patrias y culturales",
      fecha: "25 de octubre de 2025",
      tipo: "Informativo",
      area: "Cultural",
      icono: "fas fa-flag",
      descripcion: "Se comparte el cronograma correspondiente a las actividades patrias y culturales del centro. Agradecemos a las familias apoyar la asistencia, la puntualidad y la participación de los estudiantes en las jornadas programadas."
    },
    {
      titulo: "Recordatorio de asistencia y puntualidad",
      fecha: "06 de noviembre de 2025",
      tipo: "Recordatorio",
      area: "Convivencia",
      icono: "fas fa-clock",
      descripcion: "Se recuerda a toda la comunidad educativa la importancia de la asistencia diaria y la puntualidad. Estos aspectos son fundamentales para el buen desarrollo del proceso de enseñanza y aprendizaje."
    },
    {
      titulo: "Actividad de lectura y convivencia escolar",
      fecha: "18 de noviembre de 2025",
      tipo: "Actividad",
      area: "Formativa",
      icono: "fas fa-book-open",
      descripcion: "Se realizará una jornada especial de lectura, integración y convivencia escolar para fortalecer hábitos lectores, valores y participación activa de los estudiantes dentro del ambiente educativo."
    },
    {
      titulo: "Proceso de actualización de datos del estudiante",
      fecha: "03 de diciembre de 2025",
      tipo: "Administrativo",
      area: "Administración",
      icono: "fas fa-address-card",
      descripcion: "Solicitamos verificar los datos personales, teléfonos de contacto y referencias familiares del estudiante para fines de actualización del sistema y mejora de la comunicación entre el centro y las familias."
    },
    {
      titulo: "Entrega de informes del segundo cuatrimestre",
      fecha: "20 de febrero de 2026",
      tipo: "Importante",
      area: "Académica",
      icono: "fas fa-file-signature",
      descripcion: "Se informa que en la fecha indicada serán entregados los informes de rendimiento correspondientes al segundo cuatrimestre. La presencia del padre, madre o tutor es importante para dar continuidad al acompañamiento académico."
    }
  ]
};

function cargarEstudiante() {
  const data = localStorage.getItem("hijoSeleccionado");

  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

function getBadgeClass(tipo) {
  if (tipo === "Importante") return "badge-important";
  if (tipo === "Informativo") return "badge-info";
  if (tipo === "Recordatorio") return "badge-reminder";
  if (tipo === "Actividad") return "badge-activity";
  return "badge-admin";
}

function obtenerComunicados(centro) {
  return comunicadosPorCentro[centro] || [];
}

function filtrarComunicados(lista, filtro) {
  if (filtro === "Todos") return lista;
  return lista.filter(item => item.tipo === filtro);
}

function renderResumen(lista) {
  const totalAnnouncements = document.getElementById("totalAnnouncements");
  const importantAnnouncements = document.getElementById("importantAnnouncements");
  const latestAnnouncement = document.getElementById("latestAnnouncement");

  totalAnnouncements.textContent = lista.length;
  importantAnnouncements.textContent = lista.filter(item => item.tipo === "Importante").length;
  latestAnnouncement.textContent = lista.length > 0 ? lista[0].fecha : "-";
}

function renderSchoolName(centro) {
  const schoolName = document.getElementById("schoolName");
  schoolName.textContent = centro || "Centro educativo";
}

function renderComunicados(centro) {
  const announcementsList = document.getElementById("announcementsList");
  const filterValue = document.getElementById("announcementFilter").value;

  const comunicadosCentro = obtenerComunicados(centro);
  const comunicadosFiltrados = filtrarComunicados(comunicadosCentro, filterValue);

  renderResumen(comunicadosFiltrados);

  if (comunicadosFiltrados.length === 0) {
    announcementsList.innerHTML = `
      <div class="empty-state">
        No hay comunicados disponibles para el filtro seleccionado.
      </div>
    `;
    return;
  }

  announcementsList.innerHTML = comunicadosFiltrados.map(item => `
    <article class="announcement-card">
      <div class="announcement-top">
        <div class="announcement-title-box">
          <div class="announcement-icon">
            <i class="${item.icono}"></i>
          </div>
          <div>
            <h3>${item.titulo}</h3>
            <div class="announcement-meta">
              <span><i class="fas fa-calendar"></i> ${item.fecha}</span>
              <span><i class="fas fa-layer-group"></i> ${item.area}</span>
            </div>
          </div>
        </div>
        <span class="announcement-badge ${getBadgeClass(item.tipo)}">${item.tipo}</span>
      </div>
      <div class="announcement-body">
        <p>${item.descripcion}</p>
      </div>
    </article>
  `).join("");
}

function initPage() {
  const estudiante = cargarEstudiante();
  const announcementFilter = document.getElementById("announcementFilter");

  if (!estudiante) {
    window.location.href = "mis-hijos.html";
    return;
  }

  renderSchoolName(estudiante.centro);
  renderComunicados(estudiante.centro);

  announcementFilter.addEventListener("change", () => {
    renderComunicados(estudiante.centro);
  });
}

initPage();