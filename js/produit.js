let offset = 0;
const limit = 20;

function loadPokemon() {
  fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((pokemon) => {
        fetch(pokemon.url)
          .then((response) => response.json())
          .then((pokemonData) => {
            document.querySelector("#pokemonGallery").innerHTML += `
              <div class="pokemon-card">
                <img src="${pokemonData.sprites.other["official-artwork"].front_default}" alt="${pokemonData.name}">
                <h2>${pokemonData.name}</h2>
              </div>
            `;
          });
      });
      offset += limit;
    });
}

document
  .querySelector("#showMoreButton")
  .addEventListener("click", loadPokemon);

// Load initial set of Pokemon
loadPokemon();

const backToTopButton = document.querySelector("#backToTopButton");

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});

