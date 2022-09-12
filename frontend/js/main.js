sessionStorage.setItem('urlBase', "http://localhost:3031")

window.onload = async () => {
  console.log('success')
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);


  // Aqui debemos agregar nuestro fetch

  try {
    let response = await fetch(sessionStorage.getItem('urlBase') + "/api/movies")
    let peliculas = await response.json();
    console.log(peliculas);

    let data = peliculas.data;

    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);

      const buttonEdit = document.createElement('a');
      buttonEdit.setAttribute('href', 'formulario.html?id=' + movie.id);
      buttonEdit.textContent = 'Editar'
      buttonEdit.setAttribute('class', 'botonAgregar');
      card.appendChild(buttonEdit);

      const buttonDelete = document.createElement('button');
      buttonDelete.textContent = 'Borrar'
      buttonDelete.setAttribute('class', 'botonBorrar');
      buttonDelete.setAttribute('id', movie.id);
      card.appendChild(buttonDelete);
    });

  } catch (error) {
    console.error
  }

  container.addEventListener('click', (e) => {
    console.log(e.target)
  })

};
