import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// TEXTURES

// Native javaScript method:

// const image = new Image();
// const texture = new THREE.Texture(image);

// image.onload = () => {
//   texture.needsUpdate = true;
// };
// image.src = "/textures/door/color.jpg";

// TextureLoader() method:
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
  console.log("Started");
};

loadingManager.onLoad = () => {
  console.log("Loaded");
};

loadingManager.onProgress = () => {
  console.log("Progress");
};

loadingManager.onError = () => {
  console.log("Error");
};

const textureLoader = new THREE.TextureLoader(loadingManager); // One TextureLoader can load multiple textures
const colorTexture = textureLoader.load("/textures/door/color.jpg");
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const ambientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

// UV 2D coordinates
// console.log(geometry.attributes.uv)

// Repeat Texture
colorTexture.repeat.x = 2;
colorTexture.repeat.y = 3;
colorTexture.wrapS = THREE.RepeatWrapping;
colorTexture.wrapT = THREE.RepeatWrapping;
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping

// Offset
// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// Rotate
colorTexture.rotation = Math.PI * 0.25
// Change the pivot of the rotation to the center
colorTexture.center.x = 0.5
colorTexture.center.y = 0.5

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;
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

/**
 * Textures are images that will cover the surface of our geometries. Many types of textures can have different effects on the appearance of our geometry. It's not just about the color.

Color (or albedo) 
The albedo texture is the most simple one. It'll only take the pixels of the texture and apply them to the geometry.

Alpha 
The alpha texture is a grayscale image where white will be visible, and black won't.

Height 
The height texture is a grayscale image that will move the vertices to create some relief. We'll need to add subdivision if we want to see it.

Normal 
The normal texture will add small details. It won't move the vertices, but it will lure the light into thinking that the face is oriented differently. Normal textures are very useful to add details with good performance because we don't need to subdivide the geometry.

Ambient occlusion 
The ambient occlusion texture is a grayscale image that will fake shadow in the surface's crevices. While it's not physically accurate, it certainly helps to create contrast.

Metalness The metalness texture is a grayscale image that will specify which part is metallic (white) and non-metallic (black). This information will help to create reflection.

Roughness 
The roughness is a grayscale image that comes with metalness, and that will specify which part is rough (white) and which part is smooth (black). This information will help to dissipate the light. A carpet is very rugged, and we won't see the light reflection on it, while the water's surface is very smooth, and we can see the light reflecting on it. Here, the wood is uniform because there is a clear coat on it.

Those textures (especially the metalness and the roughness) follow what we call PBR principles. PBR stands for Physically Based Rendering. It regroups many techniques that tend to follow real-life directions to get realistic results.

PBR
While there are many other techniques, PBR is becoming the standard for realistic renders, and many software, engines, and libraries are using it (Unity, Unreal Engine, Blender, etc.).
Useful articles about PBR: 
https://marmoset.co/posts/basic-theory-of-physically-based-rendering/
https://marmoset.co/posts/physically-based-rendering-and-you-can-too/

For now, we will simply focus on how to load textures, how to use them, what transformations we can apply, and how to optimize them. We will see more about PBR in later lessons, but if we're curious, we can learn more about it here:
 */

/**
 * LOAD TEXTURES
 * 
GETTING THE URL OF THE TEXTURE

To load the texture, we need the URL of the image file.
Because we are using Webpack, there are two ways of getting it.
We can put the image texture in the /src/ folder and import it like we would import a JavaScript dependency:

import imageSource from './image.png'

console.log(imageSource)

Or we can put that image in the /static/ folder and access it just by adding the path of the image (without /static) to the URL:

const imageSource = '/image.png'

console.log(imageSource)

LOADING THE IMAGE

We can find the door textures in the /static/ folder, and there are multiple ways of loading them.
With native JavaScript, first, we must create an Image instance, listen to the load event, and then change its src property to start loading the image:

const image = new Image()
image.onload = () =>
{
    console.log('image loaded')
}
image.src = '/textures/door/color.jpg'

We should see 'image loaded' appears in the console. As we can see, we set the source to '/textures/door/color.jpg' without the /static folder in the path.

We cannot use that image directly. We need to create a Texture from that image first.

This is because WebGL needs a very specific format that can be access by the GPU and also because some changes will be applied to the textures like the mipmapping but we will see more about that a little later.

Create the texture with the Texture class:

const image = new Image()
image.addEventListener('load', () =>
{
    const texture = new THREE.Texture(image)
})
image.src = '/textures/door/color.jpg'

What we need to do now is use that texture in the material. Unfortunately, the texture variable has been declared in a function and we can not access it outside of this function. This is a JavaScript limitation called scope.

We could create the mesh inside the function, but there is a better solution consisting on creating the texture outside of the function and then updating it once the image is loaded by setting the texture needsUpdate property to true:

const image = new Image()
const texture = new THREE.Texture(image)
image.addEventListener('load', () =>
{
    texture.needsUpdate = true
})
image.src = '/textures/door/color.jpg'

While doing this, we can immediately use the texture variable immediately, and the image will be transparent until it is loaded.

To see the texture on the cube, replace the color property by map and use the texture as value:

const material = new THREE.MeshBasicMaterial({ map: texture })

We should see the door texture on each side of our cube.

 */
