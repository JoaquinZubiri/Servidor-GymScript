// GET DE PELICULAS
fetch("http://localhost:1234/movies")
  .then((res) => res.json())
  .then((movies) => {
    const html = movies
      .map((movie) => {
        return `
      <article data-id ="${movie.id}">
        <h1>${movie.title}</h1>
        <img src="${movie.poster}"></img>
        <p>${movie.year}</p>
        <p>${movie.director}</p>
        <p>${movie.duration}</p>
        <button>Eliminar</button>
      </article>
      `;
      })
      .join("");

    document.querySelector("main").innerHTML = html;

    //DELETE DE PELICULAS
    document.addEventListener("click", (e) => {
      if (e.target.matches("button")) {
        const article = e.target.closest("article");
        const id = article.dataset.id;
        fetch(`http://localhost:1234/movies/${id}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.ok) {
            article.remove();
          }
        });
      }
    });
  });
