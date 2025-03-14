const search = () => {
    const pokemonName = document.getElementById("searchInput").value;
    searchPokemon(pokemonName);
};

const searchPokemon = async (pokemonName) => {
    const url = `https://api.pokemontcg.io/v2/cards?q=name:${pokemonName}`;

    try {
        const response = await fetch(url, {
            headers: { "X-Api-Key": "TA_CLE_API" } // Remplace par ta clé API si nécessaire
        });
        const data = await response.json();
        displayResults(data.data);
    } catch (error) {
        console.error("Erreur :", error);
    }
};

const displayResults = (cards) => {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Vide les résultats précédents

    if (cards.length === 0) {
        resultsDiv.innerHTML = "<p>Aucune carte trouvée.</p>";
        return;
    }

    cards.forEach(card => {
        const img = document.createElement("img");
        img.src = card.images.small; // Affiche l'image de la carte
        img.alt = card.name;
        resultsDiv.appendChild(img);
    });
};
