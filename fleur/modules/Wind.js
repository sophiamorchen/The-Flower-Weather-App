class Wind {
//     constructor(latitude, longitude) { // cool

//         // Étape 1  : Initialisation des propriétés de la classe
//         this.lat = latitude // latitude de la ville
//         this.lng = longitude // longitude de la ville
//         this.init()
//         }
//     init () {
//         console.log(this.lat, this.lng)
//     }
    
// }

/* Récuperer les données de vents en temps réel
- [] Récupérer les direction du vent
- [] Récupérer la vitesse du vent
- [] BONUS Actualise mes donées toutes les 15 minutes

https://api.open-meteo.com/v1/forecast?latitude=45.7485&longitude=4.8467&current=wind_speed_10m,wind_direction_10m&timezone=auto
*/
    constructor(props) { 
        // aussi possible : constructor ({latitude, longitude, name= bastien}) puis plus besoin de déstructurer (étape : const = ..)
        // Étape 1  : Initialisation des propriétés de la classe
        const {lat, lng} = props // destructuration de l'objet props
        this.lat = lat // latitude de la ville
        this.lng = lng // longitude de la ville
        this.init()
        }
    init() {
        this.buildUrl()
        this.getWindData()
        console.log(this.lat, this.lng)
    } 
    buildUrl() {
        // Méthode pour construire l'URL de l'API avec les coordonnées de la ville
        const base = 'https://api.open-meteo.com/v1/forecast'
        const requiredLatitudeParam = 'latitude=' + this.lat
        const requiredLongitudeParam = 'longitude=' + this.lng
        const params = ['wind_speed_10m,', 'wind_direction_10m'] 
        const concatParams = params.join(',')
        
        this.url = `${base}?${requiredLatitudeParam}&${requiredLongitudeParam}&current=${concatParams}`
        console.log(this.url)

    }
    getWindData(){
        fetch(this.url)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
        })
    }
}

export {Wind}
// export {Wind} // pour l'exporter dans le module app.js 