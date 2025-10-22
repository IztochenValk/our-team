import { getTeammates, showTeammates } from "../Utils/teammates.utils.js";

const recherche = document.getElementById("recherche");
let teammates = []

// Evenement de recherche à chaque changement de valeur dans la barre de recherche
recherche.addEventListener("input", (e) => {
    // on passe la valeur de la barre de recherche en minuscule
    const searchInput = e.target.value.toLowerCase();
    // on filtre les teammates en fonction de la valeur de la barre de recherche
    const searched = teammates.filter((teammate) => teammate.name.toLowerCase().includes(searchInput));
    // on (re)appelle la fonction showTeammates avec l'array filtrée
    showTeammates(searched)
})
// On lance la fonction getTeammates en asynchrone
await getTeammates(teammates)
// On affiche les teammates
showTeammates(teammates)
