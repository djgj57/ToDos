window.addEventListener("load", function () {

    // reviso si ya estoy logueado para ir a las tareas

    let jwt = JSON.parse(sessionStorage.getItem('todosUsuario'))
    if (jwt != null) {
        window.location.href = 'lista-tareas.html'
    }

    // para ahorrar algo de.....
    let $ = item => document.querySelector(item);


    //captura formulario con envento submit
    $('#formLogin').addEventListener('submit', validarLogin);

    let email = false;
    let contrasena = false;

    function validarLogin(evento) {
        evento.preventDefault();

        // dejo mensaje de errores en blanco
        $('#errorEmail').innerText = '';
        $('#errorContrasena').innerText = '';
        $('#errorLogin').innerText = '';

        // valida ingreso de email
        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

        if ($('#email').value.length < 1) {
            $('#errorEmail').innerText = "El espacio de email no puede estar vacío";
        } else if (!emailRegex.test($('#email').value)) {
            $('#errorEmail').innerText = "Ingrese un formato de correo valido";
        } else { email = true }

        // valida ingreso de contrasena

        if ($('#contrasena').value < 1) {
            $('#errorContrasena').innerText = "Por favor escriba la contraseña";
        } else { contrasena = true }

        // Si todo esta correcto, solicita loguearse

        if (email && contrasena) {

            let datos = {
                email: $('#email').value,
                password: $('#contrasena').value
            }

            fetch('https://ctd-todo-api.herokuapp.com/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(datos)
            })
                .then(function (response) {
                    if (response.ok)
                    return response.json()
                    else
                    throw new Error(response.status)
                })
                .then(function (data) {
                        sessionStorage.setItem('todosUsuario', JSON.stringify(data.jwt))
                        location.reload()
                })
                .catch(function (error) {
                    $('#errorLogin').innerText = "No es posible ingresar, revise los datos suministrados."
                    console.log('Hubo un problema con la petición Fetch:' + error.message)
                });

            email = false
            contrasena = false
        }
    
        // Reviso si hay toquen, para ir a la ventana de tareas.

        // let jwt = JSON.parse(sessionStorage.getItem('todosUsuario'))

        // if (jwt != null) {
        //     this.submit()
        // }
    }

    // Me lleva a crear cuenta

    $('#newuser').addEventListener('click', () => window.location.href = '../index.html')

})