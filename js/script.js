// Caroussel de la page d'accueil

// Récupérer tous les éléments de carte
const cards = document.querySelectorAll(".card");

// Parcourir chaque carte
cards.forEach((card, index) => {
  // Utiliser l'index + 1 pour obtenir les informations du Pokémon correspondant
  fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`)
    .then((response) => response.json())
    .then((data) => {
      // Remplacer le contenu de h1 par le nom du Pokémon
      const h1 = card.querySelector("h1");
      h1.textContent = data.name;

      // Remplacer le contenu de h3 par le type du Pokémon
      const h3 = card.querySelector("h3");
      h3.textContent = data.types
        .map((typeInfo) => typeInfo.type.name)
        .join(", ");

      // Remplacer l'image par l'art officiel du Pokémon s'il est disponible, sinon utiliser l'image par défaut
      const img = card.querySelector("img");
      if (data.sprites.other && data.sprites.other["official-artwork"]) {
        img.src = data.sprites.other["official-artwork"].front_default;
      } else {
        img.src = data.sprites.front_default;
      }
    });
});

const buttonsWrapper = document.querySelector(".map");
const slides = document.querySelector(".inner");

buttonsWrapper.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    Array.from(buttonsWrapper.children).forEach((item) =>
      item.classList.remove("active")
    );
    if (e.target.classList.contains("first")) {
      slides.style.transform = "translateX(-0%)";
      e.target.classList.add("active");
    } else if (e.target.classList.contains("second")) {
      slides.style.transform = "translateX(-33.33333333333333%)";
      e.target.classList.add("active");
    } else if (e.target.classList.contains("third")) {
      slides.style.transform = "translatex(-66.6666666667%)";
      e.target.classList.add("active");
    }
  }
});

// Recherche pokemon a l'aide du form
document.querySelector("#searchButton").addEventListener("click", () => {
  const userInput = document.querySelector("#searchInput").value.toLowerCase();
  window.location.href = `search-results.html?pokemon=${userInput}`;
});
