window.onload = function () {
    // Obtener usuario logueado
    let user = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!user) {
      alert("No has iniciado sesión. Redirigiendo al login...");
      window.location.href = "../vistas/login.html";
      return;
    }
  
    // Mostrar datos del usuario
    document.getElementById("entrenador-nombre").value = user.nombre;
    document.getElementById("entrenador-apellido").value = user.apellido;
    document.getElementById("entrenador-telefono").value = user.telefono;
    document.getElementById("entrenador-email").value = user.email;
  
    // Lista predefinida de pokemones con imagen
    const pokedex = [
      { nombre: "Pikachu", tipo: "Eléctrico", ataque: 55, defensa: 40, evolucion: "Raichu", imagen: "https://i.pinimg.com/originals/18/22/44/182244f32a5fa2b64594d1ddd79af872.gif" },
      { nombre: "Charmander", tipo: "Fuego", ataque: 52, defensa: 43, evolucion: "Charmeleon", imagen: "https://i.pinimg.com/originals/48/1e/af/481eafa3a380198012f80595c0dafeec.gif" },
      { nombre: "Squirtle", tipo: "Agua", ataque: 48, defensa: 65, evolucion: "Wartortle", imagen: "https://66.media.tumblr.com/tumblr_ma4ft6OXxw1rfjowdo1_500.gif" },
      { nombre: "Bulbasaur", tipo: "Planta/Veneno", ataque: 49, defensa: 49, evolucion: "Ivysaur", imagen: "https://i.pinimg.com/originals/bf/95/c5/bf95c53a70819967d79c6ce2ff6883bc.gif" },
      { nombre: "Eevee", tipo: "Normal", ataque: 55, defensa: 50, evolucion: "Vaporeon / Jolteon / Flareon", imagen: "https://i.pinimg.com/originals/e8/2b/e6/e82be6cee446f9b3f8a0b70b2649f679.gif" },
      { nombre: "Gengar", tipo: "Fantasma/Veneno", ataque: 70, defensa: 50, evolucion: "Gastly / Haunter / Gengar", imagen: "https://i.pinimg.com/originals/66/36/d3/6636d37ba22a391c6353b1436a81f656.gif" }
    ];
  
    // Llenar el select con pokemones
    const select = document.getElementById("pokemon-nombre");
    select.innerHTML = '<option value="">-- Escoge un Pokemón --</option>';
    pokedex.forEach(p => {
      const option = document.createElement("option");
      option.value = p.nombre;
      option.textContent = p.nombre;
      select.appendChild(option);
    });
  
    // Autocompletar datos al seleccionar un Pokémon
    select.addEventListener("change", function () {
      const seleccionado = pokedex.find(p => p.nombre === this.value);
      if (seleccionado) {
        document.getElementById("pokemon-tipo").value = seleccionado.tipo;
        document.getElementById("pokemon-ataque").value = seleccionado.ataque;
        document.getElementById("pokemon-defensa").value = seleccionado.defensa;
        select.setAttribute("data-evolucion", seleccionado.evolucion);
        select.setAttribute("data-imagen", seleccionado.imagen);
      } else {
        document.getElementById("pokemon-tipo").value = "";
        document.getElementById("pokemon-ataque").value = "";
        document.getElementById("pokemon-defensa").value = "";
        select.removeAttribute("data-evolucion");
        select.removeAttribute("data-imagen");
      }
    });
  
    // Guardar Pokémon seleccionado
    document.getElementById("guardar-pokemon-btn").addEventListener("click", function () {
      const nombre = select.value;
      const tipo = document.getElementById("pokemon-tipo").value;
      const ataque = parseInt(document.getElementById("pokemon-ataque").value);
      const defensa = parseInt(document.getElementById("pokemon-defensa").value);
      const evolucion = select.getAttribute("data-evolucion") || "Desconocida";
      const imagen = select.getAttribute("data-imagen") || "";
  
      if (!nombre || !tipo || isNaN(ataque) || isNaN(defensa)) {
        alert("Por favor, completa los datos del Pokemón.");
        return;
      }
  
      const nuevoPokemon = { nombre, tipo, ataque, defensa, evolucion, imagen };
      let pokemons = JSON.parse(localStorage.getItem("pokemons")) || [];
      pokemons.push(nuevoPokemon);
      localStorage.setItem("pokemons", JSON.stringify(pokemons));
  
      alert(`${nombre} ha sido guardado correctamente.`);
    });
  
    // Ver solo el Pokémon seleccionado
    document.getElementById("ver-pokimons-btn").addEventListener("click", function () {
      const seleccionado = select.value;
      const pokemons = JSON.parse(localStorage.getItem("pokemons")) || [];
  
      let contenedor = document.getElementById("pokemon-cards-container");
      if (!contenedor) {
        contenedor = document.createElement("div");
        contenedor.id = "pokemon-cards-container";
        contenedor.className = "cards-container";
        document.querySelector(".container").appendChild(contenedor);
      }
      contenedor.innerHTML = "";
  
      if (!seleccionado) {
        alert("Selecciona un Pokemón primero.");
        return;
      }
  
      const pokemon = pokemons.find(p => p.nombre === seleccionado);
      if (!pokemon) {
        alert("Este Pokemón aún no ha sido guardado.");
        return;
      }
  
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${pokemon.nombre}</h3>
        <img src="${pokemon.imagen}" alt="${pokemon.nombre}" class="pokemon-img" />
        <div class="type">${pokemon.tipo}</div>
        <div class="stats">⚔️ Ataque: ${pokemon.ataque}</div>
        <div class="stats">🛡️ Defensa: ${pokemon.defensa}</div>
        <div class="stats">🔁 Evolución: ${pokemon.evolucion}</div>
      `;
      contenedor.appendChild(card);
    });
  
    // Ver todos los Pokémons guardados
    document.getElementById("ver-todos-btn").addEventListener("click", function () {
      const pokemons = JSON.parse(localStorage.getItem("pokemons")) || [];
  
      let contenedor = document.getElementById("pokemon-cards-container");
      if (!contenedor) {
        contenedor = document.createElement("div");
        contenedor.id = "pokemon-cards-container";
        contenedor.className = "cards-container";
        document.querySelector(".container").appendChild(contenedor);
      }
      contenedor.innerHTML = "";
  
      if (pokemons.length === 0) {
        alert("No tienes ningún Pokemón guardado aún.");
        return;
      }
  
      pokemons.forEach((p) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h3>${p.nombre}</h3>
          <img src="${p.imagen}" alt="${p.nombre}" class="pokemon-img" />
          <div class="type">${p.tipo}</div>
          <div class="stats">⚔️ Ataque: ${p.ataque}</div>
          <div class="stats">🛡️ Defensa: ${p.defensa}</div>
          <div class="stats">🔁 Evolución: ${p.evolucion}</div>
        `;
        contenedor.appendChild(card);
      });
    });
  
    // 🧹 Eliminar todos los Pokemones
    document.getElementById("eliminar-todos-btn").addEventListener("click", function () {
      const confirmar = confirm("¿Estás seguro de que quieres eliminar todos tus Pokemones?");
      if (confirmar) {
        localStorage.removeItem("pokemons");
        const contenedor = document.getElementById("pokemon-cards-container");
        if (contenedor) contenedor.innerHTML = "";
        alert("Todos los Pokemones han sido eliminados.");
      }
    });
  
    // 👉 Redirigir al selector de skin
    document.getElementById("skin").addEventListener("click", function () {
      window.location.href = "skin.html"; // Ajusta la ruta si es necesario
    });
  };
  