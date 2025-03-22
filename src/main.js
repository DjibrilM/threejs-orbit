import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const width = window.innerWidth;
const height = window.innerHeight;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const fov = 75; // Field of view
const aspec = width / height; // Aspect
const near = 0.1; // Near
const far = 10; // Far

const camera = new THREE.PerspectiveCamera(fov, aspec, near, far);
camera.position.z = 5;
const scene = new THREE.Scene();

document.body.appendChild(renderer.domElement);
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.03;

const geo = new THREE.IcosahedronGeometry(2,3);
const mat = new THREE.MeshStandardMaterial({
  color: new THREE.Color("grey"),
  flatShading: true,
});

const mesh = new THREE.Mesh(geo, mat);

const wireMat = new THREE.MeshBasicMaterial({
  color: new THREE.Color("#527a7a"),
  wireframe: true,
});

const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.2);
mesh.add(wireMesh);
scene.add(mesh);

renderer.render(scene, camera);

const light = new THREE.HemisphereLight(
  new THREE.Color("white"),
  new THREE.Color("black")
);
scene.add(light);

function animate(t) {
  requestAnimationFrame(animate);
  // mesh.rotation.x = t * 0.0001;
  // mesh.rotation.y = t * 0.0005;
  renderer.render(scene, camera);
  orbitControls.update();
  
}
animate();
