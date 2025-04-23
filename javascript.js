// const tarea = {
//     id:"",
//     texto:"",
//     prioridad:"",
//     categoria:"",
//     estado:"pendiente"
// }
//Decidi que es mejor hacer una clase para este proyecto que un objeto ya que las clases nos permiten poseer un
//mayor control sonbre nuestro codigo y una mayor escalabilidad.

const form = document.getElementById("formulario-tarea");
form.addEventListener("submit", function(e) {
    e.preventDefault();
})

let inputTarea = document.getElementById("tarea-texto");
inputTarea.focus();

let contadorId = 0;
let tareasArray = [];
// const estados = ["pendiente","en proceso","finalizado"]

class Tarea{
    constructor(texto,prioridad,categoria){
        this.id = ++contadorId;
        this.texto = texto;
        this.prioridad = prioridad;
        this.categoria = categoria;
        this.estado = "pendiente";
    }

    cambiarEstado(){
        // const indexActual = estados.indexOf(this.estado);
        // const nuevoEstado = estados[(indexActual + 1) % this.estado.length];
        // this.estado = nuevoEstado;
        const estados = ["pendiente", "en proceso", "finalizado"];
        const index = estados.indexOf(this.estado);
        this.estado = estados[(index + 1) % estados.length];
    }
}

// function crearTarea(){
//     const 
// }


function cargarDatos(){
    const textoTarea = document.getElementById("tarea-texto").value;
    const prioridadTarea  = document.getElementById("tarea-prioridad").value;
    const categoriaTarea = document.getElementById("tarea-categoria").value;

    //in simple alert por si no se llnaron los campos correctamente
    if (!textoTarea || !prioridadTarea || !categoriaTarea){
        alert("Porfavor llene los campos correctamente");
        return;
    }

    let tareaNueva = new Tarea(textoTarea,prioridadTarea,categoriaTarea);

    tareasArray.push(tareaNueva);
    //console.log(tareasArray);
    mostrarTareas();
}

function mostrarTareas(filtroCategoria = null){
    const contenedor = document.getElementById("lista-tareas");
    contenedor.innerHTML = "";

    let tareasAMostrar = tareasArray;

    if (filtroCategoria)
    {
        tareasAMostrar = tareasArray.filter(t => t.categoria === filtroCategoria);
    }

    tareasAMostrar.sort((a,b) => parseInt(a.prioridad) - parseInt(b.prioridad));
    tareasAMostrar.forEach(tarea => {
        const li = document.createElement('li');
        li.textContent = `${tarea.texto} -Prioridad: ${tarea.prioridad} -Categoría: ${tarea.categoria}  `;

        switch(tarea.estado){
            case "pendiente":
                li.style.color = "rgb(236, 14, 14)";break;
            case "en proceso":
                li.style.color = "rgb(245, 245, 38)";break;
            case "finalizado":
                li.style.color = "rgb(0, 255, 0)";break;
        }

        li.addEventListener("click", () => {
            tarea.cambiarEstado();  
            //ese ejecuta la funcion ya que los colores no se actulizaran sino
            mostrarTareas();
        });

        const span = document.createElement('span');
        span.classList.add('glyphicon', 'glyphicon-trash');
        
        
        const botonEliminar = document.createElement('button');
        botonEliminar.classList.add('btn', 'btn-danger')
        botonEliminar.textContent = "";
        botonEliminar.addEventListener("click", (e) => {
            e.stopPropagation();//evitamos que al hacer click sobre eliminar tambien se cambie el estado
            // if(confirm("esta seguro de borrar esta tarea?")){
                li.classList.add('relative'); // para posicionar partículas bien
                crearParticulas(li);
                
                // Esperamos a que se vea la animación antes de eliminar
                setTimeout(() => {
                    eliminarTarea(tarea.id);
                    mostrarTareas(filtroCategoria);
                }, 400);
                //eliminarTarea(tarea.id);
            //} 
            //mostrarTareas(filtroCategoria)
        });

        botonEliminar.appendChild(span);

        
        li.appendChild(botonEliminar);
        li.classList.add("fade-in-left");

        contenedor.appendChild(li); 
    });
}

function mostrarTareasFiltradas(){
    let filitro = document.getElementById('datoFiltro').value;
    mostrarTareas(filitro);
}

function mostrarTodas()
{
    mostrarTareas();
}

function eliminarTarea(id){
    tareasArray = tareasArray.filter(tarea => tarea.id !== id);
    mostrarTareas();
}

// function cambiarEstadoPorId(id){
//     const tarea = tareasArray.find(t => t.id === id);
//     if(tarea)
//     {
//         tarea.cambiarEstado();
//     }
// }


function prueba(){
    let tarea1 = new Tarea("","ejemplotareasasas","Prioridad:1","Categoria : 3","");
    let tarea2 = new Tarea("","ejemplotareasasas","Prioridad:1","Categoria : 3","");
    let tarea3 = new Tarea("","ejemplotareasasas","Prioridad:1","Categoria : 3","");
    console.log(tarea1,tarea2,tarea3);
    tareasArray.push(tarea1,tarea2,tarea3);
    cambiarEstadoPorId(2);
    cambiarEstadoPorId(2);
    let nuevo = tareasArray;
    console.log(nuevo[1])
    elimnarTarea(1);
    console.log(tareasArray);
}



//codigo para la animacion de tareas

function crearParticulas(elemento) {
    const rect = elemento.getBoundingClientRect();
    const cantidad = 20;

    for (let i = 0; i < cantidad; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Posicionamos las partículas dentro del li
        particle.style.left = `${rect.width / 2}px`;
        particle.style.top = `${rect.height / 2}px`;

        // Usamos variables CSS para alejar las partículas
        const dx = (Math.random() - 0.5) * 100 + "px";
        const dy = (Math.random() - 0.5) * 100 + "px";
        particle.style.setProperty('--dx', dx);
        particle.style.setProperty('--dy', dy);

        elemento.appendChild(particle);

        // Eliminamos la partícula luego de la animación
        setTimeout(() => {
            particle.remove();
        }, 500);
    }
}