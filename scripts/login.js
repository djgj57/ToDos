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

        if ($('#contrasena').value < 1) {
            $('#errorContrasena').innerText = "Por favor escriba la contraseña";
            $('#errorContrasena').classList.toggle('hiddenContrasena')
            setTimeout(() => {
                $('#errorContrasena').classList.toggle('hiddenContrasena')
            }, 2000)
        } else { contrasena = true }

        // Si todo esta correcto, solicita loguearse

        // TODO: fetch para loguearse
    

        if (email && contrasena) {
            email = false
            contrasena = false
            this.submit();
        }
    }

    // Me lleva para hacer login

    $('#newuser').addEventListener('click', () => window.location.href = 'index.html')



    // formulario.addEventListener("submit", function(event) {
    //     event.preventDefault();

    //     let datos = {
    //         name: inputName.value,
    //         job: inputJob.value
    //     }

    //     fetch("https://reqres.in/api/users", {
    //         method: "POST",
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: JSON.stringify(datos)
    //     })
    //     .then(function(response) {
    //         return response.json()
    //     })
    //     .then(function(noTengoIdeaQueEs) {
    //         console.log(noTengoIdeaQueEs)
    //     })

    // })

})