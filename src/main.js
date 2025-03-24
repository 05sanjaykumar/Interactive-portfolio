import * as THREE from 'three';
import { gsap } from 'gsap';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Objects (Portfolio Sections)
const sections = {
    projects: new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0x00ffcc })),
    about: new THREE.Mesh(new THREE.SphereGeometry(0.8, 32, 32), new THREE.MeshStandardMaterial({ color: 0xff5733 })),
    contact: new THREE.Mesh(new THREE.TorusKnotGeometry(0.5, 0.2, 100, 16), new THREE.MeshStandardMaterial({ color: 0xffc300 }))
};

// Positioning objects
sections.projects.position.set(-2, 1, 0);
sections.about.position.set(2, 1, 0);
sections.contact.position.set(0, 1, -2);

// Add userData to identify sections
sections.projects.userData = { section: "Projects" };
sections.about.userData = { section: "About" };
sections.contact.userData = { section: "Contact" };

// Adding objects to the scene
Object.values(sections).forEach(obj => scene.add(obj));

// Raycasting for Click Interactions
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", (event) => {
    // Normalize mouse position
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(Object.values(sections));

    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        const sectionName = clickedObject.userData.section;
        
        console.log("Navigating to:", sectionName);

        // Animate camera to clicked object
        gsap.to(camera.position, {
            x: clickedObject.position.x,
            y: clickedObject.position.y + 1,
            z: clickedObject.position.z + 3,
            duration: 1.5,
            ease: "power2.inOut"
        });
    }
});

window.addEventListener('contextmenu',(event)=>{
    event.preventDefault();
    resetCameraPosition();
})


window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        resetCameraPosition();
    }
});


function resetCameraPosition() {
    gsap.to(camera.position, {
        x: 0,
        y: 2,
        z: 5,
        duration: 1.5,
        ease: "power2.inOut"
    });
    console.log("Camera reset to original position.");
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
