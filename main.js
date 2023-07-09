console.log("hellooo")
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import starTexture from './public/stars.jpg'

const scene = new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
const renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild(renderer.domElement)
const orbit= new OrbitControls(camera,renderer.domElement)
camera.position.set(-90,140,140);
orbit.update();
const ambientLight=new THREE.AmbientLight(0x333333);
scene.add(ambientLight);
const cubeTextureLoader=new THREE.CubeTextureLoader();
 scene.background= cubeTextureLoader.load([
    starTexture,
    starTexture,
    starTexture,
    starTexture,
    starTexture,
    starTexture,

 ]);

 const textureLoader=new THREE.TextureLoader();
 function animate(){
    renderer.render(scene,camera)
 }
 renderer.setAnimationLoop(animate);

 window.addEventListener('resize',function(){
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    camera.setSize(window.innerWidth,window.innerHeight)
 })