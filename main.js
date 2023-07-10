console.log("hellooo");
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import starTexture from "./public/stars.jpg";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-90, 140, 140);
orbit.update();
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starTexture,
  starTexture,
  starTexture,
  starTexture,
  starTexture,
  starTexture,
]);

//  const textureLoader=new THREE.TextureLoader();
function animate() {
  renderer.render(scene, camera);
  Sun.rotateY(0.004)
  Mercury.rotateY(0.007)
}
renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  camera.setSize(window.innerWidth, window.innerHeight);
});

const sunGeometry = new THREE.SphereGeometry(25, 50, 50);
const sunTexture = new THREE.TextureLoader().load('/sun.jpg');
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const Sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(Sun);


const mercuryGeometry = new THREE.SphereGeometry(10, 50, 50);
const mercuryTexture = new THREE.TextureLoader().load('/mercury.jpg');
const mercuryMaterial = new THREE.MeshStandardMaterial({ map: mercuryTexture });
const Mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
Sun.add(Mercury);
Mercury.position.x=50;

const pointLight=new THREE.PointLight(0xffffff,2,300);
scene.add(pointLight);