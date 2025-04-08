window.onload = function () {
    // Obtener usuario logueado
    let user = JSON.parse(localStorage.getItem("usuarioActivo"));
    
    if (!user) {
        alert("No has iniciado sesión. Redirigiendo al login...");
        window.location.href = "../vistas/login.html";
        return;
    }

    // Mostrar los datos del usuario en el formulario
    document.getElementById("entrenador-nombre").value = user.nombre;
    document.getElementById("entrenador-apellido").value = user.apellido;
    document.getElementById("entrenador-telefono").value = user.telefono;
    document.getElementById("entrenador-email").value = user.email;

    // Funcionalidad para ver pokimons
    document.getElementById("ver-pokimons-btn").addEventListener("click", function () {
        let pokemons = JSON.parse(localStorage.getItem("pokemons")) || [];
        if (pokemons.length === 0) {
            alert("Aún no tienes pokimons registrados.");
        } else {
            let mensaje = "Tus Pokimons:\n\n";
            pokemons.forEach((p, i) => {
                mensaje += `${i + 1}. ${p.nombre} | Tipo: ${p.tipo} | Atq: ${p.ataque} | Def: ${p.defensa}\n`;
            });
            alert(mensaje);
        }
    });
}

