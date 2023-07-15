console.log("hellooo");
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import starTexture from "/stars.jpeg";
import mercuryTexture from "/mercury.jpeg";
import venusTexture from "/venus.jpeg";
import earthTexture from "/earth.jpeg";
import earthMoonTexture from "/moon.jpeg";
import marsMoonTexture1 from '/phobos.jpeg'
import marsMoonTexture2 from '/demios.jpeg'
import marsTexture from "/mars.jpeg";
import jupiterTexture from "/jupiter.jpg";
import saturnTexture from "/saturn.jpeg";
import satRingTexture from "/saturnRing.png";
import uranusTexture from "/uranus.jpeg";
import plutoTexture from "/pluto.jpg";
import uraRingTexture from "/uranusRing.png";
import neptuneTexture from "/neptune.jpeg";

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

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  camera.setSize(window.innerWidth, window.innerHeight);
});

const sunGeometry = new THREE.SphereGeometry(25, 50, 50);
const sunTexture = new THREE.TextureLoader().load("/sun.svg");
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const Sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(Sun);

const textureLoader = new THREE.TextureLoader();

function createPlanet(size, texture, position, ring) {
  const geo = new THREE.SphereGeometry(size, 50, 50);
  const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture),
  });
  const mesh = new THREE.Mesh(geo, mat);
  const Obj = new THREE.Object3D();
  Obj.add(mesh);
  if (ring) {
    const ringGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32
    );
    const ringMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    Obj.add(ringMesh);
    ringMesh.position.x = position;
    ringMesh.rotation.x = -0.5 * Math.PI;
  }
  scene.add(Obj);
  mesh.position.x = position;
  return { mesh, Obj };
}

function createMoon(planet,size,texture,position){
  const geo = new THREE.SphereGeometry(size, 50, 50);
  const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture),
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.x=position;
planet.mesh.add(mesh)
return {mesh}

}

const Mercury = createPlanet(3.2, mercuryTexture, 28);
const Venus = createPlanet(5.8, venusTexture, 44);
const Earth = createPlanet(6, earthTexture, 62);
const Mars = createPlanet(4, marsTexture, 78);
const Jupiter = createPlanet(12, jupiterTexture, 100);
const Saturn = createPlanet(10, saturnTexture, 138, {
  innerRadius: 10,
  outerRadius: 20,
  texture: satRingTexture,
});

const Uranus = createPlanet(7, uranusTexture, 176, {
  innerRadius: 7,
  outerRadius: 12,
  texture: uraRingTexture,
});
const Neptune = createPlanet(7, neptuneTexture, 200);
const Pluto = createPlanet(2.8, plutoTexture, 216);

const earthMoon=createMoon(Earth,1.5,earthMoonTexture,15);
const marsMoon1=createMoon(Mars,1.3,marsMoonTexture1,10);
// const marsMoon2=createMoon(Mars,1.5,marsMoonTexture2,10);

function animate() {
  renderer.render(scene, camera);
  Sun.rotateY(0.004);
  Mercury.mesh.rotateY(0.004);
  Mercury.Obj.rotateY(0.04);
  Venus.mesh.rotateY(0.002);
  Venus.Obj.rotateY(0.015);
  Earth.mesh.rotateY(0.02);
  Earth.Obj.rotateY(0.01);
  earthMoon.mesh.rotateY(0.01);
  Mars.mesh.rotateY(0.018);
  Mars.Obj.rotateY(0.008);
  Jupiter.mesh.rotateY(0.04);
  Jupiter.Obj.rotateY(0.002);
  Saturn.mesh.rotateY(0.038);
  Saturn.Obj.rotateY(0.0009);
  Uranus.mesh.rotateY(0.03);
  Uranus.Obj.rotateY(0.0004);
  Neptune.mesh.rotateY(0.032);
  Neptune.Obj.rotateY(0.0001);
  Pluto.mesh.rotateY(0.008);
  Pluto.Obj.rotateY(0.00007);
}
renderer.setAnimationLoop(animate);

const pointLight = new THREE.PointLight(0xffffff, 2, 500);
scene.add(pointLight);
