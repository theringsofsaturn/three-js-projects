import "./style.css";
import * as THREE from "three";

// CANVAS
const canvas = document.querySelector("canvas.webgl");

// SCENE
const scene = new THREE.Scene();

// OBJECT
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// SIZES
const sizes = {
  width: 800,
  height: 600,
};

// CAMERA
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// ANIMATION

// Animations, when using Three.js, work like stop motion. We move the objects, and we do a render. Then we move the objects a little more, and we do another render. Etc. The more we move the objects between renders, the faster they'll appear to move.

// The screen we are looking at runs at a specific frequency. We call that a frame rate. The frame rate mostly depends on the screen, but the computer itself has limitations. Most screens run at 60 frames per second. If we do the maths, that means about a frame every 16ms. But some screens can run much faster, and when the computer has difficulties processing things, it'll run more slowly.

// We want to execute a function that will move objects and do the render on each frame regardless of the frame rate.

// The native JavaScript way of doing so is by using the window.requestAnimationFrame(...) method.

// Using requestAnimationFrame
// The primary purpose of requestAnimationFrame is not to run code on each frame.

// requestAnimationFrame will execute the function we provide on the next frame. But then, if this function also uses requestAnimationFrame to execute that same function on the next frame, we'll end up with our function being executed on each frame forever which is exactly what we want.

// Create a function named loop and call this function once. In this function, use window.requestAnimationFrame(...) to call this same function on the next frame:

// ANIMATE
const loop = () => {
  //  console.log('loop')

  // Update objects
  mesh.rotation.y += 0.01;

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(loop); // don't call loop() but just provide it as a parameter. It will be called on the next frame.
};

loop(); // That's it. We have our infinite loop.
