let recherche = document.getElementById("recherche");
let valideBtn = document.getElementById("valider");
async function getPost() {
    try {
        const response = await fetch("../teammates.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur :", error);
    }
}

function valider(tab) {
    valideBtn.addEventListener("click", function () {
        let name = recherche.value;
        for (let i = 0; i < tab.length; i++) {
            if (tab[i].name == name) {
                console.log("voici le mate")
            } 
        }
    })
}
getPost().then((tab)=>valider(tab));
