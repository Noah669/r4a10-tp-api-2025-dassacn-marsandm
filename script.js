const getFrenchPokemonName = async (englishName) => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${englishName.toLowerCase()}/`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const frenchName = data.names.find(name => name.language.name === "fr")?.name;
        return frenchName || englishName; // Si pas trouvé, retourne le nom anglais
    } catch (error) {
        console.error("Erreur récupération nom FR :", error);
        return englishName;
    }
};

const searchPokemon = async (pokemonName) => {
    const frenchName = await getFrenchPokemonName(pokemonName);
    const url = `https://api.pokemontcg.io/v2/cards?q=name:${frenchName}`;

    try {
        const response = await fetch(url, {
            headers: { "X-Api-Key": "TA_CLE_API" } // Remplace par ta clé API si nécessaire
        });
        const data = await response.json();
        displayResults(data.data, frenchName);
    } catch (error) {
        console.error("Erreur :", error);
    }
};

const displayResults = (cards, pokemonName) => {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `<h2>Résultats pour : ${pokemonName}</h2>`;

    if (cards.length === 0) {
        resultsDiv.innerHTML += "<p>Aucune carte trouvée.</p>";
        return;
    }

    cards.forEach(card => {
        const img = document.createElement("img");
        img.src = card.images.small;
        img.alt = card.name;
        resultsDiv.appendChild(img);
    });
};
