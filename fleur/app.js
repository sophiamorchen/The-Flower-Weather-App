import {Search} from "./modules/Search.js"
import {Flower} from "./modules/Flower.js"


// on crée un objet "app" dans la variable window qui va permettre 
// d'enregistrer les info nénéssaires à l'animation de la fleur

window.app = {
    isNewCitySelected: false,
    city: "",
    windDirection: "",
    windSpeed: ""
}


// Entree de mon programme
new Search()
new Flower()





/*
c'est ici qu'on va importer des modules 
C'est ce fichier unique qui est importé dans mon html.
Ainsi, il sera plus simple de débugger.

*/