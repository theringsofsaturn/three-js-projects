import "./style.css";
import * as THREE from "three";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// CAMERA

//  PerspectiveCamera
// PerspectiveCamera class needs some parameters to be instantiated
// const camera = new THREE.PerspectiveCamera(
//   75, // Field of view
//   sizes.width / sizes.height, // Aspect ratio
//   1, // Near clipping plane
//   100 // Far clipping plane
// );
// camera.position.x = 2;
// camera.position.y = 2;
// camera.position.z = 2;
// camera.lookAt(mesh.position);
// scene.add(camera);

// FIELD OF VIEW
// The first parameter called field of view corresponds to our camera view's vertical amplitude angle in degrees. If we use a small angle, we'll end up with a long scope effect, and if we use a wide-angle, we'll end up with a fish eye effect because, in the end, what the camera sees will be stretched or squeezed to fit the canvas.

// As for choosing the right field of view, we'll have to try things out. I found that what works best is a field of view between 45 and 75.

// ASPECT RATIO
// The second parameter is called aspect ratio and corresponds to the width divided by the height.
// Is recommended to save those values in an object because we are going to need them multiple times (saved at the top as sizes).

// NEAR AND FAR
// The third and fourth parameters called near and far, correspond to how close and how far the camera can see. Any object or part of the object closer to the camera than the near value or further away from the camera than the far value will not show up on the render.

//  might be tempted to use very small and very large values like 0.0001 and 9999999 we might end up with a bug called z-fighting where two faces seem to fight for which one will be rendered above the other.
// https://twitter.com/FreyaHolmer/status/799602767081848832

// https://twitter.com/Snapman_I_Am/status/800567120765616128

// Try to use reasonable values and increase those only if you need it. In our case, we can use 0.1 and 100.

// OrthographicCamera
// The OrthographicCamera is used to create orthographic renders of our scene without perspective. It's useful if we make an RTS game like Age of Empire. Elements will have the same size on the screen regardless of their distance from the camera.
// The OrthographicCamera differs from the PerspectiveCamera by its lack of perspective, meaning that the objects will have the same size regardless of their distance from the camera.
// The parameters we have to provide are very different from the PerspectiveCamera.
// Instead of a field of view, we must provide how far the camera can see in each direction (left, right, top and bottom). Then we can provide the near and far values just like we did for the PerspectiveCamera.

// const camera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0.1, 100)

// As we can see, there is no perspective, and the sides of our cube seem parallel. The problem is that our cube doesn't look cubic.

// That is due to the values we provided for the left, right, top, and bottom which are 1 or - 1, meaning that we render a square area, but that square area will be stretched to fit our rectangle canvas and our canvas isn't a square.

// We need to use the canvas ratio (width by height). Let's create a variable named aspectRatio (just like the PerspectiveCamera) and store that ratio in it:

// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)

// This results in a render area width larger than the render area height because our canvas width is larger than its height.

// We now have a cube that looks like a cube.

// CUSTOM CONTROLS
// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  1000
);

// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)

// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// To control the camera with our mouse, first of all, we want to know the mouse coordinates. We can do that using native JavaScript by listening to the mousemove event with addEventListener.

// The coordinates will be located in the argument of the callback function as event.clientX and event.clientY:
// Cursor
// window.addEventListener("mousemove", (event) => {
//   console.log(event.clientX, event.clientY);
// });

// JavaScript
// We could use those values, but it's recommended to adjusti them. By adjusting, we mean to have a 1 amplitude and that the value can be both negative and positive.

// If we only focus on the x value, that would mean that:

// if our cursor is on the far left of the canvas, we should get - 0.5
// if our cursor is at the center of the canvas, we should get 0
// if our cursor is at the far right of the canvas, we should get 0.5
// While this is not mandatory, it helps to have clean values like that.

// Just like the size variable, we will create a cursor variable with default x and y properties and then update those properties in the mousemove callback:

// Just like the size variable, we will create a cursor variable with default x and y properties and then update those properties in the mousemove callback:

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;

  console.log(cursor.x, cursor.y);
});

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  mesh.rotation.y = elapsedTime;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
