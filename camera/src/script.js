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

// window.addEventListener("mousemove", (event) => {
//   cursor.x = event.clientX / sizes.width - 0.5;
//   cursor.y = event.clientY / sizes.height - 0.5;

//   console.log(cursor.x, cursor.y);
// });

// Dividing event.clientX by sizes.width will give us a value between 0 and 1 (if we keep the cursor above the canvas) while subtracting 0.5 will give we a value between - 0.5 and 0.5.

// We now have the mouse position stored in the cursor object variable, and we can update the position of the camera in the loop function (check in the "Animate" section **1//commented).

// it's working but the axes movements seem kind of wrong. This is due to the position.y axis being positive when going upward in Three.js but the clientY axis being positive when going downward in the webpage.

// We can simply invert the cursor.y while updating it by adding a - in front of the whole formula (don't forget the parentheses):
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

// Finally, we can increase the amplitude by multiplying the cursor.x and cursor.y and ask the camera to look at the mesh using the lookAt(...) method. (Animate section ** 2 //commented)

// We can go even further by doing a full rotation of the camera around the mesh by using Math.sin(...) and Math.cos(...).
// sin and cos, when combined and used with the same angle, enable us to place things on a circle. To do a full rotation, that angle must have an amplitude of 2 times π (called "pi"). Just so we know, a full rotation is called a "tau" but we don't have access to this value in JavaScript and we have to use π instead.

// We can access an approximation of π in native JavaScript using Math.PI.

// To increase the radius of that circle, we can simply multiply the result of Math.sin(...) and Math.cos(...):

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const loop = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  mesh.rotation.y = elapsedTime;

  // Update camera ** 1 //commented
  //   camera.position.x = cursor.x;
  //   camera.position.y = cursor.y;

  // Update camera ** 2 //commented
  //   camera.position.x = cursor.x * 5;
  //   camera.position.y = cursor.y * 5;
  //   camera.lookAt(mesh.position);

  // Update camera
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
  camera.position.y = cursor.y * 3;
  camera.lookAt(mesh.position);

  // While this is a good start to control the camera, Three.js has integrated multiple classes called controls to help us do the same and much more.

  // BUILT-IN CONTROLS

  // *DeviceOrientationControls
  // DeviceOrientationControls will automatically retrieve the device orientation if your device, OS, and browser allow it and rotate the camera accordingly. You can use it to create immersive universes or VR experiences if you have the right equipment.

  //* FlyControls
  // FlyControls enable moving the camera like if you were on a spaceship. You can rotate on all 3 axes, go forward and go backward.

  //* FirstPersonControls
  // FirstPersonControls is just like FlyControls, but with a fixed up axis. You can see that like a flying bird view where the bird cannot do a barrel roll. While the FirstPersonControls contains "FirstPerson," it doesn't work like in FPS games

  //* PointerLockControls
  // PointerLockControls uses the pointer lock JavaScript API. This API hides the cursor, keeps it centered, and keeps sending the movements in the mousemove event callback. With this API, you can create FPS games right inside the browser. While this class sounds very promising if you want to create that kind of interaction, it'll only handle the camera rotation when the pointer is locked. You'll have to handle the camera position and game physics by yourself.

  //* OrbitControls
  // OrbitControls is very similar to the controls we made in the previous lesson. You can rotate around a point with the left mouse, translate laterally using the right mouse, and zoom in or out using the wheel.

  //* TrackballControls
  // TrackballControls is just like OrbitControls but there are no limits in terms of vertical angle. You can keep rotating and do spins with the camera even if the scene gets upside down.

  // Render
  renderer.render(scene, camera);

  // Call loop again on the next frame
  window.requestAnimationFrame(loop);
};

loop();
