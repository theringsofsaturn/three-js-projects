import "./style.css";
import * as THREE from "three";

// There are 4 properties to transform objects in our scene

// position (to move the object)
// scale (to resize the object)
// rotation (to rotate the object)
// quaternion (to also rotate the object - additional info for this)

// All classes that inherit from the Object3D class possess those properties like PerspectiveCamera or Mesh and classes that we haven't covered yet.

// Those properties will be compiled in what we call matrices. Matrices are used internally by Three.js, by the WebGL, and by the GPU to transform things

// MOVE OBJECTS
// The position possesses 3 essential properties, which are x, y, and z. Those are the 3 necessary axes to position something in a 3D space.

// The meaning of 1 unit, it's up to us. 1 can be 1 centimeter, 1 meter, or even 1 kilometer. I recommend that we adapt the unit to what we want to build. If we're going to create a house, we probably should think of 1 unit as 1 meter.

// CANVAS
const canvas = document.querySelector("canvas.webgl");

// SCENE
const scene = new THREE.Scene();

// OBJECTS
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
// Position can be declared anywhere, but before calling the render(...) method.
mesh.position.x = 0.7;
mesh.position.y = -0.6;
mesh.position.z = 1;
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
