function loguear() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("clave").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let usuarioEncontrado = usuarios.find(user => user.username === username && user.password === password);

    if (usuarioEncontrado) {
        alert("Usuario válido");
        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
        window.location.href = "../vistas/Entrenador.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}






