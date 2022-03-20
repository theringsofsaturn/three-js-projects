import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// Sizes
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

// Camera
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

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
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

// GEOMETRY
// In Three.js, geometries are composed of vertices (point coordinates in 3D spaces) and faces (triangles that join those vertices to create a surface).

/**
 Box example
// * The BoxGeometry has 6 parameters:

width: The size on the x axis
height: The size on the y axis
depth: The size on the z axis
widthSegments: How many subdivisions in the x axis
heightSegments: How many subdivisions in the y axis
depthSegments: How many subdivisions in the z axis
Subdivisions correspond to how much triangles should compose the face. By default it's 1, meaning that there will only be 2 triangles per face. If we set the subdivision to 2, we'll end up with 8 triangles per face:
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
 */

// The problem is that we cannot see these triangles.

// A good solution is to add wireframe: true to our material. The wireframe will show the lines that delimit each triangle:
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })

// ! The more subdivisions we add, the less we can distinguish the faces. But keep in mind that too many vertices and faces will affect performances.

// Creating our own buffer geometry
// To create our own buffer geometry, start by instantiating an empty BufferGeometry. We will create a simple triangle:
// Create an empty BufferGeometry
// const geometry = new THREE.BufferGeometry();

// To add vertices to a BufferGeometry we must start with a Float32Array.

// Float32Array are native JavaScript typed array. We can only store floats inside, and the length of that array is fixed.

// To create a Float32Array, we can specify its length and then fill it later:
/**
const positionsArray = new Float32Array(9);

// First vertex
positionsArray[0] = 0;
positionsArray[1] = 0;
positionsArray[2] = 0;

// Second vertex
positionsArray[3] = 0;
positionsArray[4] = 1;
positionsArray[5] = 0;

// Third vertex
positionsArray[6] = 1;
positionsArray[7] = 0;
positionsArray[8] = 0;
 */

// Or we can pass an array:
/** 
const positionsArray = new Float32Array([
  0,
  0,
  0, // First vertex
  0,
  1,
  0, // Second vertex
  1,
  0,
  0, // Third vertex
]);
*/

/**
 * As we can see, the coordinates of the vertices are specified linearly. The array is a one-dimensional array where we specify the x, y, and z of the first vertex, followed by the x, y, and z of the second vertex, and so on.

Before we can send that array to the BufferGeometry, we have to transform it into a BufferAttribute.

The first parameter corresponds to our typed array and the second parameter corresponds to how much values make one vertex attribute. As we saw earlier, to read this array, we have to go 3 by 3 because a vertex position is composed of 3 values (x, y and z):
 */

// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

// Then we can add this attribute to our BufferGeometry using the setAttribute(...) method. The first parameter is the name of this attribute and the second parameter is the value:

geometry.setAttribute("position", positionsAttribute);

/**
 * We chose 'position' as the name because Three.js internal shaders will look for that value to position the vertices. We will see more about that in the shaders lessons.

The faces will be automatically created following the order of the vertices.
 */

// All together:
// Create an empty BufferGeometry
const geometry = new THREE.BufferGeometry();

// Create a Float32Array containing the vertices position (3 by 3)
const positionsArray = new Float32Array([
  0,
  0,
  0, // First vertex
  0,
  1,
  0, // Second vertex
  1,
  0,
  0, // Third vertex
]);

// Create the attribute and name it 'position'
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute("position", positionsAttribute);

// We can also create a bunch of random triangles:
/**
// Create an empty BufferGeometry
const geometry = new THREE.BufferGeometry()

// Create 50 triangles (450 values)
const count = 50
const positionsArray = new Float32Array(count * 3 * 3)
for(let i = 0; i < count * 3 * 3; i++)
{
    positionsArray[i] = (Math.random() - 0.5) * 4
}

// Create the attribute and name it 'position'
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)

*/

// The only difficulty might be the count * 3 * 3 part but it's quite simple to explain: We need 50 triangles. Each triangle is composed of 3 vertices and each vertex is composed of 3 values (x, y, and z).

// * One interesting thing with BufferGeometry is that we can mutualize vertices using the index property. Consider a cube. Multiple faces can use some vertices like the ones in the corners. And if we look closely, every vertex can be used by various neighbor triangles. That will result in a smaller attribute array and performance improvement.
