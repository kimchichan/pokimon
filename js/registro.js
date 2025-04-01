function Registrar() {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("contrasena").value;
    let telefono = document.getElementById("telefono").value;
    let direccion = document.getElementById("direccion").value;

    let array = [
        nombre,
        apellido,
        email,
        password,
        telefono,
        direccion
    ]

    localStorage.setItem("user", JSON.stringify(array));
    alert("Usuario registrado correctamente")
    window.location.href = "../vistas/Entrenador.html"
}
