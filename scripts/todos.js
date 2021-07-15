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
    .then((json) =>   console.log(json))
    .catch((e) => console.log(e))

    let jsonData = `[
        {
        "id":80,
        "description":"Aprender Java 80",
        "completed":false,
        "userId":150,
        "createdAt":"2021-07-14T13:58:57.296Z"
    },
    {
        "id":84,
        "description":"Aprender Java 84",
        "completed":true,
        "userId":150,
        "createdAt":"2021-07-14T13:58:57.296Z"
    },
    {
        "id":81,
        "description":"Aprender Java 81",
        "completed":false,
        "userId":150,
        "createdAt":"2021-07-14T13:58:57.296Z"
    },
    {
        "id":82,
        "description":"Aprender Java 82",
        "completed":false,
        "userId":150,
        "createdAt":"2021-07-14T13:58:57.296Z"
    },
    {
        "id":83,
        "description":"Aprender Javascript 83",
        "completed":true,
        "userId":150,
        "createdAt":"2021-07-13T18:23:54.860Z"}
    ]`;

    // let listadoTodos = JSON.parse(jsonData)




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
    let arrayTareasPendientes = listadoTodos.filter(x => x.completed == false)
    let arrayTareasterminadas = listadoTodos.filter(x => x.completed == true)
    }

    const tareasPendientes = document.querySelector('.tareas-pendientes');

    function renderizarTodos() {
        arrayTareasPendientes.forEach(toDo => {
            tareasPendientes.innerHTML += nuevoToDo(toDo)
            document.querySelectorAll('.tareas-pendientes .nombre')[document.querySelectorAll('.tareas-pendientes .nombre').length - 1].innerText = toDo.description;
        });
    }

    renderizarTodos();

    const tareasFinalizadas = document.querySelector('.tareas-terminadas');

    function renderizarTodosFinalizados() {
        arrayTareasterminadas.forEach(toDo => {
            tareasFinalizadas.innerHTML += nuevoToDo(toDo)
            document.querySelectorAll('.tareas-terminadas .nombre')[document.querySelectorAll('.tareas-terminadas .nombre').length - 1].innerText = toDo.description;
        });
    }

    renderizarTodosFinalizados();

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