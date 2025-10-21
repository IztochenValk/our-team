
const recherche = document.getElementById("recherche");
let teammates = []

//On crée une classe Teammate (pas du tout obigé, mais c'est pour montrer qu'on a bien assimilé les concepts de la POO)
class Teammate{
    constructor(name, exp, role, image, technos){

        //On assigne à chaque membres chacune des propriétés indiquées lors de la création de lobjet.
        //Exemple : si on fait
        //let thomas = new Teammate('thomas', 'dev fullstack', 'https://thomas.jpeg', '["js","JAVA","PHP"]')
        // Tout ce qu'on a mis dans les parenthèses est récupéré et traité par le constructeur
        //Le mot clé "this" représente l'objet, donc thomas, mais uniquement à l'intérieur de la classe !
        // à l'intérieur de la classe, si on veut accéder au rôle de thomas, on fait this.role
        // à l'extérieur de la classe, on fait thomas.role

        this.name = name;
        this.exp = exp
        this.role = role;
        this.image = image;
        this.technos = technos;
    }
}
// Fonction pour créer les teammates
async function getTeammates() {
    try {
        // on fetch le ficher dans le dossier our-team
        const response = await fetch("../teammates.json");
        // on le tranforme en en array
        const data = await response.json();
        // Pour chaque element de l'array on créer un objet de classe Teammate
        data.forEach((teammate)=>{
            teammates.push(new Teammate(teammate.name, teammate.exp, teammate.poste, teammate.img, teammate.technos))
        })
    } catch (error) {
        console.error("Erreur :", error);
    }
}
// Fonction pour afficher les teammates
function showTeammates(array){
    const list = document.getElementById("list")
    // On vide la liste
    list.innerHTML = ""
    // pour chaque element de l'array en paramètre on appelle la fonction createCard
    array.forEach((teammate)=>{
        list.innerHTML += createCard(teammate)
    })
}

// cette fonction structure la carte du membre sous la forme de template string
// ATTENTION! Elle ne l'insère pas encore dans le DOM. Elle se contente de créer et de retourner le snippet HTML de la card
function createCard(teammate) {
    let anneesXp = teammate.exp > 1 ? 'années' : 'an'
    let templateTechnos = []

    teammate.technos.forEach((tech)=> {
        templateTechnos.push(`<div class="badge badge-outline badge-primary">${tech}</div>`)
    })
    templateTechnos = templateTechnos.join(" ")

    return `
            <div class="card card-side bg-base-100 shadow-lg">
                <figure>
                    <img src="${teammate.image}" alt="Image perso de ${teammate.name}" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${teammate.name}</h2>
                    <p class="italic">${teammate.role}</p>
                    <p class="">${teammate.exp} ${anneesXp} d'expérience</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${templateTechnos}
                    </div>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary w-full">Voir le profil</button>
                    </div>
                </div>
            </div>
        `;
}
// Fonction de recherche à chaque changement de valeur dans la barre de recherche
recherche.addEventListener("input", (e) => {
    // on passe la valeur de la barre de recherche en minuscule
    const searchInput = e.target.value.toLowerCase();
    // on filtre les teammates en fonction de la valeur de la barre de recherche
    const searched = teammates.filter((teammate) => teammate.name.toLowerCase().includes(searchInput));
    // on (re)appelle la fonction showTeammates avec l'array filtrée
    showTeammates(searched)
})
// On lance la fonction getTeammates en asynchrone
await getTeammates()
// On affiche les teammates
showTeammates(teammates)
