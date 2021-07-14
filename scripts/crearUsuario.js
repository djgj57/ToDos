window.addEventListener("load", function () {

    
    // reviso si ya estoy logueado para ir a las tareas
    let jwt = JSON.parse(sessionStorage.getItem('todosUsuario'))
    if (jwt != null) {
        window.location.href = 'lista-tareas.html'
    }

    // para ahorrar algo de.....
    let $ = item => document.querySelector(item);


    //captura formulario con envento submit
    $('#formNewUser').addEventListener('submit', validarForNewUser);

    let nombre = false;
    let apellido = false;
    let email = false;
    let contrasena = false;

    function validarForNewUser(evento) {
        evento.preventDefault();

        // valida ingreso de nombre
        if ($('#nombre').value.length < 1) {
            $('#errorNombre').innerText = "El espacio de nombre no puede estar vacío";
            $('#errorNombre').classList.toggle('hiddenNombre')
            setTimeout(() => {
                $('#errorNombre').classList.toggle('hiddenNombre')
            }, 2000)
        } else { nombre = true }

        // valida ingreso de apellido
        if ($('#apellido').value.length < 1) {
            $('#errorApellido').innerText = "El espacio de apellido no puede estar vacío";
            $('#errorApellido').classList.toggle('hiddenApellido')
            setTimeout(() => {
                $('#errorApellido').classList.toggle('hiddenApellido')
            }, 2000)
        } else { apellido = true }

        // valida ingreso de email
        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

        if ($('#email').value.length < 1) {
            $('#errorEmail').innerText = "El espacio de email no puede estar vacío";
            $('#errorEmail').classList.toggle('hiddenEmail')
            setTimeout(() => {
                $('#errorEmail').classList.toggle('hiddenEmail')
            }, 2000)
        } else if (!emailRegex.test($('#email').value)) {
            $('#errorEmail').innerText = "Ingrese un formato de correo valido";
            $('#errorEmail').classList.toggle('hiddenEmail')
            setTimeout(() => {
                $('#errorEmail').classList.toggle('hiddenEmail')
            }, 2000)
        } else { email = true }

        // valida ingreso de contrasena

        if ($('#contrasena').value < 1 || $('#contrasenaR').value < 1) {
            $('#errorContrasena').innerText = "Por favor escriba la contraseña en ambos espacios";
            $('#errorContrasena').classList.toggle('hiddenContrasena')
            setTimeout(() => {
                $('#errorContrasena').classList.toggle('hiddenContrasena')
            }, 2000)
        } else if ($('#contrasena').value != $('#contrasenaR').value) {
            $('#errorContrasena').innerText = "Las contraseñas no coinciden";
            $('#errorContrasena').classList.toggle('hiddenContrasena')
            setTimeout(() => {
                $('#errorContrasena').classList.toggle('hiddenContrasena')
            }, 2000)
        } else { contrasena = true }

        // Si todo esta correcto, solicita la creación del usuario        
        if (nombre && apellido && email && contrasena) {

            let datos = {
                firstName: $('#nombre').value,
                lastName: $('#apellido').value,
                email: $('#email').value,
                password: $('#contrasena').value
            }

            fetch('https://ctd-todo-api.herokuapp.com/v1/users', {
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
                    $('#errorCuenta').innerText = "No es posible crear la cuenta, intente más tarde o con otro correo."
                    $('#errorCuenta').classList.toggle('hiddenCuenta')
                    console.log('Hubo un problema con la petición Fetch:' + error.message)
                    setTimeout(() => {
                        $('#errorCuenta').classList.toggle('hiddenCuenta')
                        }, 4000)
                });

            nombre = false
            apellido = false
            email = false
            contrasena = false
        }

        // Reviso si hay toquen, para ir a la ventana de tareas.

        // let jwt = JSON.parse(sessionStorage.getItem('todosUsuario'))

        // if (jwt != null) {
        //     this.submit()
        // }

    }

    // Me lleva a hacer login

    $('#ingresar').addEventListener('click', () => window.location.href = 'login.html')


})