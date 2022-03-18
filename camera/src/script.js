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
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 2;
camera.lookAt(mesh.position);
scene.add(camera);

//  PerspectiveCamera
// PerspectiveCamera class needs some parameters to be instantiated
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  sizes.width / sizes.height, // Aspect ratio
  1, // Near clipping plane
  100 // Far clipping plane
);
// FIELD OF VIEW
// The first parameter called field of view corresponds to our camera view's vertical amplitude angle in degrees. If we use a small angle, we'll end up with a long scope effect, and if we use a wide-angle, we'll end up with a fish eye effect because, in the end, what the camera sees will be stretched or squeezed to fit the canvas.

// As for choosing the right field of view, we'll have to try things out. I found that what works best is a field of view between 45 and 75.

// ASPECT RATIO
// The second parameter is called aspect ratio and corresponds to the width divided by the height.
// Is recommended to save those values in an object because we are going to need them multiple times (saved at the top as sizes).

// NEAR AND FAR
// The third and fourth parameters called near and far, correspond to how close and how far the camera can see. Any object or part of the object closer to the camera than the near value or further away from the camera than the far value will not show up on the render.

//  might be tempted to use very small and very large values like 0.0001 and 9999999 you might end up with a bug called z-fighting where two faces seem to fight for which one will be rendered above the other.
// https://twitter.com/FreyaHolmer/status/799602767081848832

// https://twitter.com/Snapman_I_Am/status/800567120765616128

// Try to use reasonable values and increase those only if you need it. In our case, we can use 0.1 and 100.

// OrthographicCamera
// The OrthographicCamera is used to create orthographic renders of our scene without perspective. It's useful if we make an RTS game like Age of Empire. Elements will have the same size on the screen regardless of their distance from the camera.

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
