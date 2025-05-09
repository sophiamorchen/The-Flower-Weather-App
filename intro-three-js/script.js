import * as THREE from 'three'

// 1. créer une div pour y ajouter notre 3d
const canvas = document.querySelector('.js-canvas')
const canvasWidth = window.innerWidth
const canvasHeight = window.innerHeight


// 2. créer notre espace de scene
const scene = new THREE.Scene()
scene.background = new THREE.Color( 'skyblue' )


// 3. créer une camera, notre point de vue
// doit etre conforme à la taille de la fenetre depuis laquelle on a notre threejs
// si nous somme dans un carousel, la taille de la fenetre est la taille de la fenetre du carousel
// Ici, pour nous, sera sera tout notre écran ! = window.innerWidth + window.innerHeight
const aspectRatio = window.innerWidth / window.innerHeight 

// Camera
/*Constructor : PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
fov — Camera frustum vertical field of view.
aspect — Camera frustum aspect ratio.
near — Camera frustum near plane.
far — Camera frustum far plane. 
=> "fov" : field of view, angle de vue de la caméra
=> "aspect ratio" : rapport entre la largeur et la hauteur de l'image
=> "near" : distance minimale de la caméra à l'objet
=> le "far" peux ê réduit pour amelioration de perf. "on ne voit pas tous mes arbres..."

=> aspect ratio de la caméra doit correspondre à celui du canvas !! sinon :
- les objets peuvent sembler étirés ou écrasés,
- ou il peut y avoir un décalage de perspective non naturel.
*/
const camera = new THREE.PerspectiveCamera( 45, aspectRatio, 0.1, 1000 );
camera.position.z = 100; // position de la caméra sur l'axe z -- profondeur (cf: z-index)
camera.position.y = 0; // position de la caméra sur l'axe y -- verticale 
camera.position.x = 0; // position de la caméra sur l'axe x -- horizontale (


// 4. créer un renderer
// le renderer est la partie qui va s'occuper de l'affichage (du point de vue de notre camera)
// il va s'occuper de l'affichage de la scene
const renderer = new THREE.WebGLRenderer()
renderer.setSize( canvasWidth, canvasHeight )
canvas.appendChild( renderer.domElement )


// ajouter une forme
/*
Constructor
BoxGeometry
(
width : Float, 
height : Float, 
depth : Float, 

widthSegments : Integer, 
heightSegments : Integer, 
depthSegments : Integer
) 
*/
const geometry = new THREE.BoxGeometry( 10, 10, 10 ); 
const cubeColor = new THREE.Color( 'red' ); // couleur de la forme
// material : c'est la texture de la forme
// elle peut etre de plusieurs types : MeshBasicMaterial, MeshStandardMaterial, MeshPhongMaterial, MeshLambertMaterial
// on peut avoirt une opacité, une texture, une couleur, une ombre, une lumière
const material = new THREE.MeshBasicMaterial( {color: cubeColor} ); 
const cube = new THREE.Mesh( geometry, material ); 
//le cube est incliné dans l’espace dès le départ, même avant l’animation:
cube.rotation.x = Math.PI *0.25 // 45° 
cube.rotation.y = Math.PI *0.25 // 45°
scene.add( cube );



// 5. créer une boucle d'animation / de rendu
// la boucle d'animation est une fonction qui va s'executer en continu
// "met a jour" la scene
function animate() {
    requestAnimationFrame( animate )
    console.log(animate);

// 💫 Le faire tourner en boucle :
// À chaque image (frame), on ajoute 0.01 radians à la rotation du cube. 
    cube.rotation.x += 0.01 // 0.01 radians = 0.57° = rapidité du cube
    cube.rotation.y += 0.01 // 0.01 radians = 0.57°
// faire un rendu, c-a-d : de montrer le point de vue de la camera dans la scene
// il doit aparaître a la fin de la boucle d'animation camera, si j'annonce la couleur après cette ligne, ca ne fonctionnera pas.
    renderer.render( scene, camera )
}   
animate()
