window.addEventListener('load', () => {

    // para ahorrar algo de.....
    let $ = item => document.querySelector(item);

    // Revisar si puede estar acá o en login

    let jwt = JSON.parse(sessionStorage.getItem('todosUsuario'))
    if (jwt == null) {
        window.location.href = 'login.html'
    }

    //cerrar sesion
    $('#logout').addEventListener('click', function () {
        sessionStorage.removeItem('todosUsuario')
        location.reload()
    })

    //Todos los toDo - Se piden todas las tareas a la API https://ctd-todo-api.herokuapp.com/
    const urlGettodos  = 'https://ctd-todo-api.herokuapp.com/v1/tasks';

    const setting = {
        method: 'GET',
        headers: {
            "Authorization": JSON.parse(sessionStorage.getItem('todosUsuario'))
        }
    };
    
    fetch(urlGettodos, setting)
    .then((response) => response.json())
    .then((json) =>   dibujarTodo(json))
    .catch((e) => console.log(e))

    //template de un toDo en una funcion
    let nuevoToDo = toDo =>
        `<li class="tarea" id="${toDo.id}">
            <div class="not-done"></div>
            <div class="descripcion">
               <p class="nombre"></p>
                <p class="timestamp">Creada: ${toDo.createdAt}</p>
            </div>
         </li>`

    // Renderizar totas las tareas obtenidas
    function dibujarTodo(arreglo){
    // Se filtran completas e incompletas
    let arrayTareasPendientes = arreglo.filter(x => x.completed == false)
    let arrayTareasterminadas = arreglo.filter(x => x.completed == true)
    renderizarTodos(arrayTareasPendientes)
    renderizarTodosFinalizados(arrayTareasterminadas)
    }

    const tareasPendientes = document.querySelector('.tareas-pendientes');

    function renderizarTodos(arregloFiltrado) {
        arregloFiltrado.forEach(toDo => {
            tareasPendientes.innerHTML += nuevoToDo(toDo)
            document.querySelectorAll('.tareas-pendientes .nombre')[document.querySelectorAll('.tareas-pendientes .nombre').length - 1].innerText = toDo.description;
        });
    }

    const tareasFinalizadas = document.querySelector('.tareas-terminadas');

    function renderizarTodosFinalizados(arregloFiltrado) {
        arregloFiltrado.forEach(toDo => {
            tareasFinalizadas.innerHTML += nuevoToDo(toDo)
            document.querySelectorAll('.tareas-terminadas .nombre')[document.querySelectorAll('.tareas-terminadas .nombre').length - 1].innerText = toDo.description;
        });
    }

  

    //crear nuevo toDo

    function crearToDo(descripcion) {
        return {
            description: descripcion,
            completed: false
        }
    }

    //    Para obtener fecha

    // function fechaDeHoy() {
    //     let date = new Date()

    //     let day = date.getDate().toString()
    //     let month = date.getMonth() + 1
    //     let year = date.getFullYear().toString().slice(-2)

    //     if (month < 10 && day < 10) {
    //         return `0${day}/0${month}/${year}`
    //     } else if (month < 10) {
    //         return `${day}/0${month}/${year}`
    //     } else if (day < 10) {
    //         return `0${day}/${month}/${year}`
    //     } else {
    //         return `${day}/${month}/${year}`
    //     }
    // }

    //Crea la tarea si esta no esta en blanco
    document.querySelector('button').addEventListener("click", function (event) {
        let tarea = document.getElementById("iTarea").value;
        if (tarea.length > 0) {
            tareaAux = crearToDo(tarea);
            //Se debe crear la tarea en la API https://ctd-todo-api.herokuapp.com/
            listadoTodos.push(tarea);

            // tareasPendientes.innerHTML += nuevoToDo(tareaAux);
            // document.querySelectorAll('.tareas-pendientes .nombre')[document.querySelectorAll('.tareas-pendientes .nombre').length - 1].innerText = tarea
        }
        document.getElementById("iTarea").value = "";
        event.preventDefault();
    })

    //Actualizar tarea de pendiente a terminada

    //Eliminar tarea

})