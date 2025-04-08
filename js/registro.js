function Registrar() {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("contrasena").value;
    let telefono = document.getElementById("telefono").value;

    if (nombre && apellido && username && email && password && telefono) {
        let nuevoUsuario = {
            nombre,
            apellido,
            username,
            email,
            password,
            telefono
        };

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Usuario registrado correctamente");
        window.location.href = "../vistas/login.html";
    } else {
        alert("Complete todos los campos");
    }
}

