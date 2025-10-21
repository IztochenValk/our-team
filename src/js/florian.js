export default async function florian(){


    //On crée une classe Teammate (pas du tout obigé, mais c'est pour montrer qu'on a bien assimilé les concepts de la POO)
    class Teammate{

        constructor(name, role, image, technos){

            //On assigne à chaque membres chacune des propriétés indiquées lors de la création de lobjet.
            //Exemple : si on fait 
            //let thomas = new Teammate('thomas', 'dev fullstack', 'https://thomas.jpeg', '["js","JAVA","PHP"]')
            // Tout ce qu'on a mis dans les parenthèses est récupéré et traité par le constructeur
            //Le mot clé "this" représente l'objet, donc thomas, mais uniquement à l'intérieur de la classe !
            // à l'intérieur de la classe, si on veut accéder au rôle de thomas, on fait this.role
            // à l'extérieur de la classe, on fait thomas.role

            this.name = name;
            this.role = role;
            this.image = image;
            this.technos = technos;

            //On insère le membre de l'équipe dans l'array static "allTeammates" dés sa création.
            //On n'était pas obligé de stocker la liste des membres de l'équipe directement dans la classe. 
            //C'est utile dans un contexte pédagogique pour montrer qu'on a compris à quoi servent les méthodes statiques.
            
            Teammate.allTeammates.push(this) 
        }
        static allTeammates = []
        static allTeammatesCards = []
    }

    //La fonction "fetchTeammates" ci-dessous va chercher les données des membres dans le JSON prévu à cet effet.
    //C'est le point de départ de la procédure

    async function fetchTeammates() {
        const res = await fetch('/src/teammates.json');
        return await res.json();
    }

    // La fonction "createTeammates" fait trois choses:
    //---1)-Crée un nouvel objet de classe Teammate basé sur les données JSON. 
    //---2)-Crée la template string basée sur les données JSON grâce à la fonction createCard + la sauvegarde dans un array
    // L'array allTeammatesCards accueille toutes les cartes qu'on va afficher par la suite.
    // Cet array est une propriété statique de la classe Teammate. Une propriété statique est récupérée selon la syntaxe suivante : NomDeLaClasse.NomDeLaPropriété

    function createTeammates(teammates){
        teammates.forEach((teammate)=>{
            new Teammate(teammate.name, teammate.role, teammate.image, teammate.technos) //Crée un nouvel objet de classe Teammate basé sur les données JSON
            pushCard(createCard(teammate)) // Crée la template string basée sur les données JSON + la sauvegarde dans un array
        })
    }


     // cette fonction structure la carte du membre sous la forme de template string
     // ATTENTION! Elle ne l'insère pas encore dans le DOM. Elle se contente de créer et de retourner le snippet HTML de la card
    function createCard(teammate) {
        let anneesXp = teammate.exp > 1? 'années' : 'an'
        let templateTechnos = []
        teammate.technos.forEach((tech)=>[
            templateTechnos.push(`<div class="badge badge-outline badge-primary">${tech}</div>`)
        ])
        templateTechnos = templateTechnos.join(" ")

        return `
            <div class="card card-side bg-base-100 shadow-lg">
                <figure>
                    <img src="${teammate.img}" alt="Image perso de ${teammate.name}" />
                </figure>
                <div class="card-body">
                    <h2 id="name" class="card-title">${teammate.name}</h2>
                    <p id="poste" class="italic">${teammate.poste}</p>
                    <p class=""><span id="exp">${teammate.exp}</span> ${anneesXp} d'expérience</p>
                    <div id="technos" class="flex flex-wrap gap-2 mb-4">
                        ${templateTechnos}
                    </div>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary w-full">Voir le profil</button>
                    </div>
                </div>
            </div>
        `;
    }
    //Cette fonction prend une card (retournée par la fonction createCard) et l'insère dans l'array allTeammatesCards
    function pushCard(cardString){
        Teammate.allTeammatesCards.push(cardString)
    }


    // Une fois que toutes les templateStrings de toutes les cartes ont été récupérées, il ne reste plus qu'à le sinsérer dans le document
    // cette fonciton ne sert qu'à ça.
    function insertAllCardsIntoDOM(allTeammatesCards){
        allTeammatesCards.forEach((card)=>{
            document.querySelector('[class*="grid"]').innerHTML += (card)
        })

    }


    // Ici, on se contente de déclencher la procédure définie plus haut.
    //Toutes la logique métier qu'on a définie dans les fonctions est mise en application.

    new Promise((resolve, reject)=>{
        resolve(fetchTeammates())
    })
    .then((allTeammates)=>{
        createTeammates(allTeammates)
    })
    .then(()=>{
        insertAllCardsIntoDOM(Teammate.allTeammatesCards)
    })

}
    
