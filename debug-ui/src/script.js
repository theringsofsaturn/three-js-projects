import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "lil-gui";

/**
 * Base
 */
const parameters = {
  color: 0xff0000,
};

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: parameters.color });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

// Debug
const gui = new dat.GUI();
// gui.add(mesh.position, "x", -3, 3, 0.01);
// gui.add(mesh.position, "y", -3, 3, 0.01);
// gui.add(mesh.position, "z", -3, 3, 0.01);

// With method (we can also add a name to appear in the gui)
gui.add(mesh.position, "x").min(-3).max(3).step(0.01).name("x axis");
gui.add(mesh, "visible");
gui.add(material, "wireframe");
gui.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
});

// ^^^^ Adding color ^^^^
// First, we need to use addColor(...) instead of add(...). This is due to Dat.GUI not being able to know if you want to tweak a text, a number or a color just by the type of the property. Secondly, you'll have to create an intermediate object with the color in its properties and use that property in your material. That is due to the Three.js material not having a clean and accessible value like #ff0000. Create a parameter variable at the start of your code right after the import part.

// We should see a color picker in your panel. The problem is that changing this color doesn't affect the material. It does change the color property of the parameter variable, but we don't even use that variable in our material. To fix that, we need Dat.GUI to alert us when the value changed. We can do that by chaining the onChange(...) method and updating the material color using material.color.set(...). This method is very useful because of how many formats you can use like '#ff0000', '#f00', 0xff0000 or even 'red'. 
// ! add the parameters.color property in our material:
