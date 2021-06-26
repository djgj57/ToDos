window.addEventListener('load', () => {

    //Todos los toDo

    let listadoTodos = [
        {
            description: "Mi hermosa tarea1",
            createdAt: "19/04/01",
            toDo: false
        },
        {
            description: "Mi hermosa tarea2",
            createdAt: "19/04/02",
            toDo: false
        },
        {
            description: "Mi hermosa tarea3",
            createdAt: "19/04/03",
            toDo: false
        }
    ];


    //template de un toDo en una funcion
    let nuevoToDo = toDo =>
        `<li class="tarea">
            <div class="not-done"></div>
            <div class="descripcion">
               <p class="nombre"></p>
                <p class="timestamp">Creada: ${toDo.createdAt}</p>
            </div>
         </li>`

    // Para renderiza todas las todos del array que estan pendientes al inicio del programa

    const tareasPendientes = document.querySelector('.tareas-pendientes');

    function renderizarTodos() {
        listadoTodos.forEach(toDo => {
            tareasPendientes.innerHTML += nuevoToDo(toDo)
            document.querySelectorAll('.tareas-pendientes .nombre')[document.querySelectorAll('.tareas-pendientes .nombre').length-1].innerText = toDo.description;
        });
    }

    renderizarTodos();

    //crear nuevo toDo

    function crearToDo(descripcion, fecha) {
        return {
            description: descripcion,
            createdAt: fecha,
            toDo: false
        }
    }

    //    Para obtener fecha

    function fechaDeHoy() {
        let date = new Date()

        let day = date.getDate().toString()
        let month = date.getMonth() + 1
        let year = date.getFullYear().toString().slice(-2)
        
        if(month < 10 && day < 10){
          return `0${day}/0${month}/${year}`
        } else if (month < 10) {
            return `${day}/0${month}/${year}`
        } else if (day < 10) {
            return `0${day}/${month}/${year}`
        } else {
          return `${day}/${month}/${year}`
        }
    }
   
    //Crea la tarea si esta no esta en blanco
    document.querySelector('button').addEventListener("click", function (event) {
        let tarea = document.getElementById("iTarea").value;
        if (tarea.length > 0) {
            tareaAux = crearToDo(tarea, fechaDeHoy());
            //Se agrega para tener todos los toDo.
            listadoTodos.push(tarea);
            tareasPendientes.innerHTML += nuevoToDo(tareaAux);
            document.querySelectorAll('.tareas-pendientes .nombre')[document.querySelectorAll('.tareas-pendientes .nombre').length-1].innerText = tarea
        }
        document.getElementById("iTarea").value = "";
        event.preventDefault();
    })

})