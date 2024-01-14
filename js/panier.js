let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function fetchPokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
  const data = await response.json();
  displayPokemon(data.results);
}

function displayPokemon(pokemonList) {
  const container = document.getElementById("pokemonList");

  pokemonList.forEach((pokemon) => {
    const card = document.createElement("div");
    card.className = "pokemon-card";

    const name = document.createElement("h2");
    name.textContent = pokemon.name;
    card.appendChild(name);

    const button = document.createElement("button");
    button.textContent = "Ajouter au panier";
    button.className = "add-to-cart";
    button.addEventListener("click", () => addToCart(pokemon));
    card.appendChild(button);

    container.appendChild(card);
  });

  updateCart();
}

function addToCart(pokemon) {
  cart.push(pokemon);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  const cartListElement = document.getElementById("cartList");
  cartListElement.innerHTML = "";
  cart.forEach((pokemon, index) => {
    cartListElement.innerHTML += `<li>${pokemon.name} <button onclick="removeFromCart(${index})">Supprimer</button></li>`;
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

fetchPokemon();
