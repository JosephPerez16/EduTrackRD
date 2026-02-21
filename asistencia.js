const hijo = JSON.parse(localStorage.getItem("hijoSeleccionado"));
if(!hijo) window.location.href="mis-hijos.html";

const year = 2026;
const mesesLectivos=[
  {nombre:"Enero", mes:0},
  {nombre:"Febrero", mes:1},
  {nombre:"Marzo", mes:2},
  {nombre:"Abril", mes:3},
  {nombre:"Mayo", mes:4},
  {nombre:"Junio", mes:5}
];

const baseAsistencia={
  "EST-001":{
    0:["ok","ok","fail","ok","permiso","ok","ok","ok","late","ok","ok","fail","ok","ok","ok","ok","late","ok","ok","permiso","ok","ok","ok","ok","ok"],
    1:["ok","ok","ok","ok","ok","ok","fail","ok","late","ok","ok","ok","ok","permiso","ok","ok","ok","ok","ok"]
  },
  "EST-002":{
    0:["ok","ok","ok","ok","ok","ok","ok","ok","ok","ok","ok","ok","ok","ok","ok","ok","ok","ok","ok","ok"],
    1:["ok","fail","ok","late","ok","ok","ok","ok","ok","ok","ok","ok","ok","ok","ok"]
  }
};

const selectorMes=document.getElementById("selectorMes");
const calendario=document.getElementById("calendario");
const porcentajeElem=document.getElementById("porcentaje");
let chartInstance=null;

mesesLectivos.forEach(m=>{
  const option=document.createElement("option");
  option.value=m.mes;
  option.textContent=`${m.nombre} ${year}`;
  selectorMes.appendChild(option);
});

selectorMes.addEventListener("change",()=>generarCalendario(parseInt(selectorMes.value)));

function generarCalendario(month){
  calendario.innerHTML="";
  let ok=0,fail=0,late=0,permiso=0;
  const estados=(baseAsistencia[hijo.id]||{})[month]||[];
  const firstDay=new Date(year,month,1).getDay();
  const totalDays=new Date(year,month+1,0).getDate();
  let indexEstado=0,start=firstDay===0?6:firstDay-1;

  for(let i=0;i<start;i++) calendario.appendChild(document.createElement("div"));

  for(let day=1;day<=totalDays;day++){
    const date=new Date(year,month,day);
    if(date.getDay()===0||date.getDay()===6) continue;
    const d=document.createElement("div");
    d.classList.add("dia");
    d.textContent=day;
    const estado=estados[indexEstado];
    if(estado){
      d.classList.add(estado);
      if(estado==="ok") ok++;
      if(estado==="fail") fail++;
      if(estado==="late") late++;
      if(estado==="permiso") permiso++;
      indexEstado++;
    }
    calendario.appendChild(d);
  }

  const total=ok+fail+late+permiso;
  const porcentaje=total?Math.round((ok/total)*100):0;
  document.getElementById("ok").innerText=ok;
  document.getElementById("fail").innerText=fail;
  document.getElementById("late").innerText=late;
  document.getElementById("permiso").innerText=permiso;
  porcentajeElem.innerText=porcentaje+"%";

  if(chartInstance) chartInstance.destroy();

  chartInstance=new Chart(document.getElementById("chart"),{
    type:"doughnut",
    data:{
      labels:["Asistencias","Faltas","Tardanzas","Permisos"],
      datasets:[{data:[ok,fail,late,permiso],backgroundColor:["#16a34a","#dc2626","#facc15","#2563eb"],borderWidth:0}]
    },
    options:{
      responsive:true,
      maintainAspectRatio:true,
      cutout:"75%",
      plugins:{legend:{position:"bottom"}}
    }
  });
}

generarCalendario(mesesLectivos[0].mes);