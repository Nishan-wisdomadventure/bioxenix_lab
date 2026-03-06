import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.127.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/loaders/OBJLoader.js';

console.log("Three.js version:", THREE.REVISION);

// Scene
const scene = new THREE.Scene();
console.log("Scene created");

// Camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(8.373, -4.233, 9.472)
camera.rotation.set(0.083, 1.162, -0.076)
console.log("Camera positioned");

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha:true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('.hero-content').appendChild(renderer.domElement);
console.log("Renderer initialized");

// Orbit Controls
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.update();
// controls.target.set(-1.744, -2.599, 0.069)
// controls.addEventListener('change', () => {

//   console.log(
//     `camera.position.set(${camera.position.x.toFixed(3)}, ${camera.position.y.toFixed(3)}, ${camera.position.z.toFixed(3)})`
//   );

//   console.log(
//     `camera.rotation.set(${camera.rotation.x.toFixed(3)}, ${camera.rotation.y.toFixed(3)}, ${camera.rotation.z.toFixed(3)})`
//   );

//   console.log(
//     `controls.target.set(${controls.target.x.toFixed(3)}, ${controls.target.y.toFixed(3)}, ${controls.target.z.toFixed(3)})`
//   );

//   console.log("-----------");

// });
// Lighting
const ambient = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambient);

const directional = new THREE.DirectionalLight(0xffffff, 0.8);
directional.position.set(5, 10, 5);
scene.add(directional);

console.log("Lights added");
// Point light that follows the mouse
const pointLight = new THREE.PointLight(0xffffff, 1.5, 0);
pointLight.position.set(0, 0, 10);
scene.add(pointLight);

// Optional: a small sphere to visualize the point light

// Track mouse position
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
window.addEventListener("mousemove", (event) => {
  // Convert mouse to normalized device coordinates (-1 to +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  // Set a fixed distance from camera
  const vector = new THREE.Vector3(mouse.x, mouse.y, 1);
  vector.unproject(camera); // Converts NDC to world coordinates

  // Direction from camera
  const dir = vector.sub(camera.position).normalize();
  const distance = 10; // Distance from camera
  const pos = camera.position.clone().add(dir.multiplyScalar(distance));

  pointLight.position.copy(pos);
});

// OBJ Loader
const loader = new OBJLoader();
let object_3d
loader.load(
  'model/model.obj',   // <-- change to your OBJ path

  function (object) {
    console.log("OBJ loaded:", object);
    object_3d = object
    object.traverse(function (child) {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 0x69a2ff,
          metalness: 1
        });
      }
    });
    object.position.set(0,0,0)
    object.rotation.set(-Math.PI/4,0,0)
    scene.add(object);
    console.log("OBJ added to scene");
  },

  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + "% loaded");
  },

  function (error) {
    console.error("Error loading OBJ:", error);
  }
);

// Resize handler
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
const blobs = [];
const sphereGeometry = new THREE.SphereGeometry(0.15, 12, 12);

for (let i = 0; i < 60; i++) {

  const material = new THREE.MeshStandardMaterial({
    color: 0x3d7ac4,
    roughness: 1,
    metalness: 0
  });

  const sphere = new THREE.Mesh(sphereGeometry, material);

  sphere.position.set(
    (Math.random() - 0.5) * 30,
    -(Math.random() -0.25) * 20,
    -(Math.random()-0.5) * 30
  );

  sphere.userData.basePos = sphere.position.clone();
  sphere.userData.phase = Math.random() * Math.PI * 2;

  blobs.push(sphere);
  scene.add(sphere);
}
// Render loop
function animate() {
  requestAnimationFrame(animate);
    if(object_3d){
      object_3d.rotation.y+=0.01/1.5
      object_3d.position.y = Math.sin(object_3d.rotation.y)
    }
    const t = performance.now() * 0.001;
    blobs.forEach(blob => {
    const base = blob.userData.basePos;
    const phase = blob.userData.phase;

    blob.position.x = base.x + Math.sin(t + phase) * 0.2;
    blob.position.y = base.y + Math.cos(t + phase) * 0.2;
  });
  renderer.render(scene, camera);
}

animate();