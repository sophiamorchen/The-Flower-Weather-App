import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
class Flower {
    constructor() {
        // Étape 1 : Initialisation des propriétés de la classe / définir les variables
        // on défini la heuteur et la largeur du canvas
        this.canvas = document.querySelector(".js-canvas")
        this.canvasWidth = window.innerWidth
        this.canvasHeight = window.innerHeight
        this.animate = this.animate.bind(this)
        this.flowerSize = 50
        this.animation = {
            rotationX: 0,
            rotationY: 0
        }
        this.init()
    }
// fonction qui lance les fonctions d'instanciation de ma classe
// c'est la fonction qui va être lancée automatiquement
    init () {
        this.createScene()
        this.createCamera()
        this.createRender()

        this.createGroupOfObjects()
        this.createStem()
        this.createPistil()
        this.createPetals()
        
        this.createOrbitControls()
        this.createHelper()
        
        this.addGroupToScene()

        this.animate()

    }
    createScene() {
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color('skyblue')
    }
    createCamera() {
        const aspectRatio = this.canvasWidth / this.canvasHeight
        this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000)
        this.camera.position.z = 150
        this.camera.position.y = 100
        this.camera.position.x = 5
    }
    createOrbitControls() {
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );  
    }
    createHelper() {
        const axesHelper = new THREE.AxesHelper( 50 )
        this.scene.add( axesHelper )


    }
    createRender() {
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(this.canvasWidth, this.canvasHeight)
        this.canvas.appendChild(this.renderer.domElement)
    }
    // on ajoute le gorupejuste avant de mettre la fleur
    createGroupOfObjects() {
        this.flowerGroup = new THREE.Group()

    }
    createStem() {
        const geometry = new THREE.CylinderGeometry( 1, 1, this.flowerSize, 32 )
        const color = new THREE.Color('rgb(0, 255, 0)')
        const material = new THREE.MeshBasicMaterial( {color: color} )
        const cylinder = new THREE.Mesh( geometry, material )
        cylinder.position.y = this.flowerSize/2
        this.flowerGroup.add(cylinder)
    }
    createPistil() {
        const geometry = new THREE.SphereGeometry( 4, 32, 16 ); 
        const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } )
        const sphere = new THREE.Mesh( geometry, material )
        sphere.position.y = this.flowerSize
        this.flowerGroup.add( sphere )
    }
    createPetals() { 
        const color = new THREE.Color('rgb(255, 0, 0)')
        const geometry = new THREE.TorusGeometry( 8, 0.5, 16, 100 ); 
        const material = new THREE.MeshBasicMaterial( { color: color } ); 

        const positionX = [-5, 0, 5, 0]
        const positionZ = [0, -5, 0, 5]
        const rotationY = [-30, 0, 30, 0]
        const rotationX = [90, 120, 90, 60]
        for (let i = 0 ; i < 4 ; i++) {
            const torus = new THREE.Mesh( geometry, material ); 
            torus.position.y = this.flowerSize
            torus.position.x = positionX[i]
            torus.position.z = positionZ[i]
            /*
    🔁 Ce que font tes rotations :

    rotation.x : incline le tore vers l’avant ou l’arrière.

    rotation.y : fait tourner autour du centre (comme tourner une assiette sur elle-même).

    rotation.z : ferait pencher sur le côté (gauche/droite).
            */
            torus.rotation.x = THREE.MathUtils.degToRad(rotationX[i]) // feuille avant ou arriere
            torus.rotation.y = THREE.MathUtils.degToRad(rotationY[i]) // feuille gauche et droite.

            this.flowerGroup.add( torus );
        }

    }
    addGroupToScene() {
        this.scene.add(this.flowerGroup)
    }

    animate() {
        requestAnimationFrame(this.animate)
        // this.flowerGroup.rotation.y += 0.01
        this.controls.update()
        /* animation de la fleur : 
        - [] si pas de ville seldctionnée, la fleur tourne sur elle même
        - [] si une ville est sélectionnée, la fleur s'oriente en fonction des donénes API
        */
        if(window.app.city === "") {
        this.flowerGroup.rotation.y += 0.01
        } else {
            if (window.app.isNewCitySelected === true ) {
                this.animation.rotationX = 0
                this.animation.rotationY = 0
                window.app.isNewCitySelected = false
            } else {
                if(this.animation.rotationX < 17 && this.animation.rotationY < 17){
                    const speed = 0.01 * window.app.windSpeed
                    this.animation.rotationX += speed
                    this.animation.rotationY += speed
                }
            }
                this.flowerGroup.rotation.z = THREE.MathUtils.degToRad(this.animation.rotationX)
                this.flowerGroup.rotation.x = THREE.MathUtils.degToRad(this.animation.rotationY)
        }
        this.renderer.render(this.scene, this.camera)
    }

}

export {Flower}