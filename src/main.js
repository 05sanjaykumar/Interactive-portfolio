import * as THREE from 'three';
import { gsap } from 'gsap';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.set(0,1,5)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild(renderer.domElement)

const geomertry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshStandardMaterial({color: 0x00ffcc})
const cube = new THREE.Mesh(geomertry,material)
scene.add(cube)


const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.8,32,32), new THREE.MeshStandardMaterial({color:0xff5733}))
scene.add(sphere)

function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
}
animate();