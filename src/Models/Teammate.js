//On crée une classe Teammate (pas du tout obigé, mais c'est pour montrer qu'on a bien assimilé les concepts de la POO)
export class Teammate{
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