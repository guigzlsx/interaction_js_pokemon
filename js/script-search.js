window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const pokemon = params.get("pokemon");

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Aucun Pokémon nommé "${pokemon}" trouvé.`);
      }
      return response.json();
    })
    .then((data) => {
      const pokemonType = data.types
        .map((typeInfo) => typeInfo.type.name)
        .join(", ");
      document.querySelector("#searchList").innerHTML = `
                <div class="pokemon-card">
                    <h1>${data.name}</h1>
                    <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}" />
                    <h3>Type: ${pokemonType}</h3>
                </div>
            `;
    })
    .catch((error) => {
      document.querySelector(
        "#searchList"
      ).innerHTML = `<p>Erreur : ${error.message}</p>`;
    });
};
