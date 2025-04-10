function seleccionarGenero(genero) {
    localStorage.setItem("generoSeleccionado", genero);
    window.location.href = "Historia.html";
  }
  
  function mostrarInfo(genero) {
    if (genero === "hombre") {
      alert("Rojo es un entrenador que ha ganado todo en el Mundo Pokimon y quiere ir por más");
    } else if (genero === "mujer") {
      alert("Ella tiene experiencia que precede sus logros como entrenadora en el Mundo Pokimon");
    }
  }