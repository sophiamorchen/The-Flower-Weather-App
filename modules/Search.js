/* Ma barre de recherche va : 
- [x] : récupérer la ville renseignée par le visiteur
- [ ] : va aller toruver la lat et la long correspondante 
- [ ] : à partir du nom de la ville 
- [ ] : si la ville n'est pas renseignée dans la BDD (json)
- [ ] : va indiquer l'erreur à l'utilisateur 

- Bonus : 
- [ ] : autocompletion dans les noms de ville
- [ ] : enregistrer les dernières recherches

le THIS représente la class
dans ma classe j'ai un objet , 
et donc ça c'est mon this
c'est une représentation de ma classe
c'est le scope, la portée locale (à l'intérieur de ma classe ) de ma classe
*/



class Search {

    constructor() {
        // Étape 1 : Initialisation des propriétés de la classe

        // On cible l’élément input du DOM pour récupérer la saisie de l’utilisateur
        this.input = document.querySelector(".js-search-input")

        // On cible le formulaire de recherche pour y attacher des événements
        this.form = document.querySelector(".js-search-form")

        // On crée un tableau vide qui contiendra les données de toutes les villes du JSON
        this.cities = []

        // Étape 2 : On lance les actions initiales via init()
        this.init()
    }

    init () {
        // Cette méthode est appelée automatiquement à l’instanciation

        // On ajoute un écouteur sur le formulaire pour réagir à la soumission utilisateur
        this.watchUserInput()

        // On charge les données des villes depuis un fichier JSON externe
        this.getCities()
    }

    watchUserInput() {
        // On écoute la soumission du formulaire (événement "submit")
        this.form.addEventListener('submit', (e) => {
            // On empêche le rechargement de la page
            e.preventDefault()

            // On lance le traitement de la ville tapée par l'utilisateur
            this.getLatLong()
        })
    }

    getLatLong() {
        // Méthode déclenchée lors de la soumission du formulaire

        // On récupère le nom de la ville tapée par l’utilisateur
        const name = this.input.value

        // On cherche dans le tableau des villes celle qui correspond à ce nom
        const cityData = this.getCityData(name)
        // À ce stade, cityData contient les infos sur la ville (ou un objet vide si non trouvée)
        // 1. récupérer l'objet correspondant à la ville tapée
        if (cityData){
            const lat = cityData.lat
            const lng = cityData.lng
            console.log(lat, lng)

        } else {
            alert("Cette ville n'existe pas")
        }
        // 2. si oui: je prend lat long
        // 3. si non: je renvoie une erreur (alert)
        // Pour vérifier, on affiche le nombre de villes chargées et la ville trouvée
        console.log(this.cities.length) // : Pour s'assurer que le JSON est bien chargé
    }

    getCities () {
        // Cette méthode va chercher les données des villes via une requête fetch()

        fetch('../data/france-cities.json') // Chemin vers le fichier JSON contenant les villes
            .then(response => response.json()) // On convertit la réponse brute en objet JavaScript
            .then(data => {
                // Une fois les données prêtes, on les stocke dans notre propriété cities
                this.cities = data
            })
    }
//----------------------------------------
        // Façon avant
        // cityName est le nom de la ville saisi par l’utilisateur dans le champ de recherche
        // name est transmis comme argument à getCityData, et il devient cityName dans cette méthode :
    // getCityDataWithFor (cityName) {
    //     // Méthode pour trouver une ville précise dans le tableau this.cities
    //     let cityNameLower = cityName.toLowerCase()
    //     let cityData = {}  // On initialise un objet vide qui contiendra la ville trouvée

    //     // On parcourt toutes les villes chargées
    //     for (let i = 0 ; i < this.cities.length ; i++) {
    //         // Si le nom de la ville correspond exactement à la saisie
    //         let citynameInDataLower = this.cities[i].city.toLowerCase()
    //         if (citynameInDataLower === cityNameLower){
    //             // On stocke les infos de cette ville dans cityData
    //             cityData = this.cities[i]
    //             break
    //         }
    //         console.log("dans ma boucle") 
    //         /* 36 000 villes dans this.cities. => je cherche "Lyon" (2e position), 
    //         et pas de break => la boucle continue de comparer "lyon" avec 35 998 villes */
    //     }
    //     // On affiche les données de la ville pour vérification (debug)
    //     console.log(cityData)
    //     // On retourne les données de la ville (ou un objet vide si non trouvée)
    //     return cityData
    // }
//--------------------------------------------
    //Façon "moderne" / es6 / FIND() = plus condensé ! best <3
    getCityData(cityName) {
        const cityNameLower = cityName.toLowerCase()
        // cityObject sort d'ou? c'est comme une "key" qu'on crée juste pour cette partie !! SUPER
        const cityData = this.cities.find(cityObject => cityObject.city.toLowerCase() === cityNameLower)
        console.log(cityData)
        return(cityData)
    }
    //-----------------------------
    // façon avec conditions , on peut la rendre plus complexe : ...
    // getCityData(userCityName) {
    //     const userCityNameLower = userCityName.toLowerCase()
    //     const data = this.cities.find(
    //         (cityObject) => {
    //             const cityObjectNameLower = cityObject.city.toLowerCase()
    //             return cityObjectNameLower === userCityNameLower

    //         } 
    //     )
    //     console.log(data)
    //     return(data)
    // }
    //----------------------------------------------
}

export { Search }
