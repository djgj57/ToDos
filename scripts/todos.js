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
    const urlGettodos = 'https://ctd-todo-api.herokuapp.com/v1/tasks';

    const settingTraerTareas = {
        method: 'GET',
        headers: {
            "Authorization": JSON.parse(sessionStorage.getItem('todosUsuario'))
        }
    };

    function traerTareas() {
        fetch(urlGettodos, settingTraerTareas)
            .then((response) => response.json())
            .then((json) => dibujarTodos(json))
            .catch((e) => console.log(e))
    }
    traerTareas()

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
    function dibujarTodos(arreglo) {
        // Se filtran completas e incompletas
        let arrayTareasPendientes = arreglo.filter(x => x.completed == false)
        let arrayTareasterminadas = arreglo.filter(x => x.completed == true)
        renderizarTodos(arrayTareasPendientes)
        renderizarTodosFinalizados(arrayTareasterminadas)
        retornarTareas(document.querySelectorAll('.tarea'))
    }


    const tareasPendientes = document.querySelector('.tareas-pendientes');

    function renderizarTodos(arregloFiltrado) {
        tareasPendientes.innerHTML = ""
        arregloFiltrado.forEach(toDo => {
            tareasPendientes.innerHTML += nuevoToDo(toDo)
            document.querySelectorAll('.tareas-pendientes .nombre')[document.querySelectorAll('.tareas-pendientes .nombre').length - 1].innerText = toDo.description;
        });
    }

    const tareasFinalizadas = document.querySelector('.tareas-terminadas');

    function renderizarTodosFinalizados(arregloFiltrado) {
        tareasFinalizadas.innerHTML = ""
        arregloFiltrado.forEach(toDo => {
            tareasFinalizadas.innerHTML += nuevoToDo(toDo)
            document.querySelectorAll('.tareas-terminadas .nombre')[document.querySelectorAll('.tareas-terminadas .nombre').length - 1].innerText = toDo.description;
        });
    }

    //crear nuevo toDo

    function crearToDo(descripcion, estado) {
        return {
            description: descripcion,
            completed: estado
        }
    }

    //Crea la tarea si esta no esta en blanco
    document.querySelector('button').addEventListener("click", function (event) {
        let tarea = document.getElementById("iTarea").value;
        if (tarea.length > 0) {
            tareaAux = crearToDo(tarea, false);
            //Se debe crear la tarea en la API https://ctd-todo-api.herokuapp.com/

            const urlCrearTarea = 'https://ctd-todo-api.herokuapp.com/v1/tasks';

            const settingCrearTarea = {
                method: 'POST',
                headers: {
                    "Content-type": 'application/json',
                    "Authorization": JSON.parse(sessionStorage.getItem('todosUsuario'))
                },
                body: JSON.stringify(tareaAux)
            };

            fetch(urlCrearTarea, settingCrearTarea)
                .then((response) => response.json())
                .then((json) => traerTareas())
                .catch((e) => console.log(e))

        }
        document.getElementById("iTarea").value = "";
        event.preventDefault();
    })

    //Actualizar tarea de pendiente a terminada

    function retornarTareas(tareas) {
        console.log(tareas);
        for (let i = 0; i < tareas.length; i++) {
            tareas[i].addEventListener('click', function () {
                let id = this.id;
                let message = this.childNodes[3].childNodes[1].textContent;
                actualizar(message, id, true)
            })
        }
    }

    function actualizar(mensaje, id, estado) {

        tareaAuxActualizar = crearToDo(mensaje, estado);

        const urlActualizarTarea = `https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`;

        const settingActualizarTarea = {
            method: 'PUT',
            headers: {
                "Content-type": 'application/json',
                "Authorization": JSON.parse(sessionStorage.getItem('todosUsuario'))
            },
            body: JSON.stringify(tareaAuxActualizar)
        };

        fetch(urlActualizarTarea, settingActualizarTarea)
            .then((response) => response.json())
            .then((json) => traerTareas())
            .catch((e) => console.log(e))
    }

    //Eliminar tarea
    function eliminar(id) {

        const urlEliminarTarea = `https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`;

        const settingEliminarTarea = {
            method: 'DELETE',
            headers: {
                "Content-type": 'application/json',
                "Authorization": JSON.parse(sessionStorage.getItem('todosUsuario'))
            }
        };

        fetch(urlEliminarTarea, settingEliminarTarea)
            .then((response) => response.json())
            .then((json) => traerTareas())
            .catch((e) => console.log(e))
    }

})