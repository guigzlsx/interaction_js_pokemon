// - - - -   I - Afficher les données dans la console  - - - -

// - - - Challenge 1-1: Afficher les noms de 10 Pokémons
fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
    .then((response) => response.json())
    .then((data) => {
        console.log("- - - Challenge 1-1 - - -");
        data.results.forEach((pokemon) => console.log(pokemon.name));
    });

// - - - Challenge 1-2: Trouver un Pokémon par son nom et afficher ses types
fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
    .then((response) => response.json())
    .then((data) => {
        console.log("- - - Challenge 1-2 - - -");
        console.log("data.types", data.types);
        console.log(`Types of Pikachu: ${data.types.map((type) => type.type.name).join(", ")}`);
    });

// - - - Challenge 1-3: Afficher les noms des Pokémons de type 'fire'
fetch("https://pokeapi.co/api/v2/type/fire")
    .then((response) => response.json())
    .then((data) => {
        console.log("- - - Challenge 1-3 - - -");
        console.log(`Fire-type Pokemons: ${data.pokemon.map((p) => p.pokemon.name).join(", ")}`);
    });

// - - - Challenge 1-4: Afficher les statistiques de base d'un Pokémon spécifique
fetch("https://pokeapi.co/api/v2/pokemon/charmander")
    .then((response) => response.json())
    .then((data) => {
        console.log("- - - Challenge 1-4 - - -");
        console.log("Base Stats of Charmander:");
        console.log("data.stats", data.stats);
        data.stats.forEach((stat) => console.log(`${stat.stat.name}: ${stat.base_stat}`));
    });

// - - - Challenge 1-5: Lister les évolutions d'un Pokémon spécifique
fetch("https://pokeapi.co/api/v2/pokemon-species/133/") // Eevee
    .then((response) => response.json())
    .then((species) => fetch(species.evolution_chain.url))
    .then((response) => response.json())
    .then((evolutionChain) => {
        let evoData = evolutionChain.chain;
        let evolutions = [];
        do {
            evolutions.push(evoData.species.name);
            evoData = evoData["evolves_to"][0];
        } while (!!evoData && evoData.hasOwnProperty("evolves_to"));
        console.log("- - - Challenge 1-5 - - -");
        console.log(`Eevee's Evolutions: ${evolutions.join(" -> ")}`);
    });

// - - - -  II - Afficher les données dans le DOM - - - -

// - - - Challenge 2-1: Afficher les noms de 20 Pokémons dans le document HTML
fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
    .then((response) => response.json())
    .then((data) => {
        const list = document.createElement("ul");
        data.results.forEach((pokemon) => {
            const listItem = document.createElement("li");
            listItem.textContent = pokemon.name;
            list.appendChild(listItem);
        });
        document.querySelector("#challenge-2-1").appendChild(list);
    });

// - - - Challenge 2-2: Afficher les détails (nom, image) d'un Pokémon spécifique
fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
    .then((response) => response.json())
    .then((data) => {
        const detailsDiv = document.createElement("div");
        detailsDiv.innerHTML = `
      <h3>${data.name}</h3>
      <img src="${data.sprites.front_default}" alt="${data.name}">
    `;
        document.querySelector("#challenge-2-2").appendChild(detailsDiv);
    });

// - - - Challenge 2-3:
// Créer une liste déroulante (utiliser <select> et <option>) de 10 Pokémons obtenu au hasard avec l'api.
// Puis charger et afficher l'image du Pokémon sélectionné
fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
    .then((response) => response.json())
    .then((data) => {
        console.log("- - - Challenge 2-3 - - -");

        console.log("data.results", data.results);
        const select = document.createElement("select");
        data.results.forEach((pokemon) => {
            const option = document.createElement("option");
            option.value = pokemon.url;
            option.textContent = pokemon.name;
            select.appendChild(option);
        });

        select.addEventListener("change", () => {
            const selectedValue = select.value;
            console.log("selectedValue", selectedValue);
            fetch(selectedValue)
                .then((response) => response.json())
                .then((data) => {
                    const detailsDiv = document.createElement("div");
                    detailsDiv.innerHTML = `
                        <h3>${data.name}</h3>
                        <img src="${data.sprites.front_default}" alt="${data.name}">
                    `;
                    document.querySelector("#challenge-2-3").appendChild(detailsDiv);
                });
        });
        document.querySelector("#challenge-2-3").appendChild(select);
    });

// - - - - - - - III - Utilisation avancée et gestion des erreurs - - - - - - -

// - - - Challenge 3-1 : Recherche de Pokémon

// Créez un champ de saisie pour que l'utilisateur puisse taper le nom d'un Pokémon.
// Ajoutez un bouton de recherche pour déclencher la recherche.
// Utilisez la PokeAPI pour chercher les informations sur le Pokémon spécifié.
// Si le Pokémon est trouvé, affichez ses détails. Sinon, affichez un message d'erreur indiquant que le Pokémon n'a pas été trouvé.
// Implémentation :

// Utilisez JavaScript pour écouter l'événement de clic sur le bouton de recherche.
// Faites une requête fetch à PokeAPI avec le nom du Pokémon saisi.
// Gérez la réponse : si le Pokémon est trouvé, affichez ses informations ; si le Pokémon n'est pas trouvé (par exemple, si le statut de la réponse est 404), affichez un message d'erreur.

document.querySelector("#searchButton").addEventListener("click", () => {
    const userInput = document.querySelector("#searchInput").value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${userInput}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Aucun Pokémon nommé "${userInput}" trouvé.`);
            }
            return response.json();
        })
        .then((data) => {
            document.querySelector(
                "#searchList"
            ).innerHTML = `<h3>${data.name}</h3><img src="${data.sprites.front_default}" alt="${data.name}" />`;
        })
        .catch((error) => {
            document.querySelector("#searchList").innerHTML = `<p>Erreur : ${error.message}</p>`;
        });
});

// - - - - - - - IV - Utiliser le Local Storage - - - - - - -

// - - - Challenge 4-1 : Compteur de Visites sur la Page des Pokémon

// - Objectif : Créer un compteur de visites sur une page thématique Pokémon, qui s'incrémente à chaque chargement de la page.
// - Instructions :
// À chaque chargement de la page, augmenter un compteur stocké dans le LocalStorage.
// Afficher le nombre de visites (compteur) sur la page.

window.addEventListener("load", () => {
    let visits = Number(localStorage.getItem("visitCount")) || 0;
    visits++;
    localStorage.setItem("visitCount", visits);
    document.querySelector("#visitCount").textContent = `Nombre de visites : ${visits}`;
});

// - - - Challenge 4-2 : Stocker et Afficher le Nom de votre Pokémon Préféré

// - Objectif : Demander à l'utilisateur d'entrer le nom de son Pokémon préféré, le stocker dans le LocalStorage, puis l'afficher sur la page.
// - Instructions :
// Créer un champ de texte et un bouton pour soumettre le nom du Pokémon préféré.
// Lorsque l'utilisateur clique sur le bouton, stocker le nom entré dans le LocalStorage.
// Afficher le nom du Pokémon préféré stocké sur la page.

document.querySelector("#saveFavoritePokemon").addEventListener("click", () => {
    const favoritePokemon = document.querySelector("#favoritePokemonInput").value;
    localStorage.setItem("favoritePokemon", favoritePokemon);
    updateDisplayedFavorite();
});

const updateDisplayedFavorite = () => {
    const favoritePokemon = localStorage.getItem("favoritePokemon");
    if (favoritePokemon) {
        document.querySelector(
            "#displayFavoritePokemon"
        ).textContent = `Votre Pokémon préféré est : ${favoritePokemon}`;
    }
};

updateDisplayedFavorite();

// - - - Challenge 4-3 : Gestion d'une Liste de Pokémon à Capturer

// - Objectif : Permettre à l'utilisateur de gérer une liste de Pokémon à capturer, en ajoutant ou supprimant des noms de Pokémon.
// - Instructions :
// Fournir un champ de texte et un bouton pour ajouter un nom de Pokémon à une liste.
// Permettre également de supprimer un Pokémon de la liste.
// Stocker et mettre à jour cette liste dans le LocalStorage et l'afficher sur la page.

document.querySelector("#addPokemonToCatch").addEventListener("click", () => {
    const pokemon = document.querySelector("#pokemonToCatchInput").value;
    const pokemonList = JSON.parse(localStorage.getItem("pokemonToCatchList")) || [];
    pokemonList.push(pokemon);
    localStorage.setItem("pokemonToCatchList", JSON.stringify(pokemonList));
    updateList();
});

const updateList = () => {
    const pokemonList = JSON.parse(localStorage.getItem("pokemonToCatchList")) || [];
    const listElement = document.querySelector("#pokemonToCatchList");
    listElement.innerHTML = "";
    pokemonList.forEach((pokemon, index) => {
        listElement.innerHTML += `<li>${pokemon} <button onclick="removePokemon(${index})">Supprimer</button></li>`;
    });
};

const removePokemon = (index) => {
    const pokemonList = JSON.parse(localStorage.getItem("pokemonToCatchList")) || [];
    pokemonList.splice(index, 1);
    localStorage.setItem("pokemonToCatchList", JSON.stringify(pokemonList));
    updateList();
};

// Initialiser la liste au chargement de la page
updateList();
