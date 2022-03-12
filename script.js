// console.log(THREE) // The THREE variable (in uppercase) contains most of the classes and properties we might need on a classic Three.js project. Unfortunately, not all classes are inside this variable.

// CREATE A SCENE
const scene = new THREE.Scene();

// OBJECT CREATION
// To create a visible object (like a cube) we need to create a type of object named Mesh - combination of a geometry (the shape) and a material (how it looks) -
// Starting with a BoxGeometry (a cube is basically a box but with a width, depth and height at the same size) and a MeshBasicMaterial.

// To create the geometry, we use the BoxGeometry class with the first 3 parameters that correspond to the box's size.

// To create the material, we use the MeshBasicMaterial class with one parameter: an object {} containing all the options. All we need is to specify its color property.

// There are many ways to specify a color in Three.js. we can send it as a JS hexadecimal 0xff0000, we can send it as a string hexadecimal '#ff0000', we can use color names like 'red', or we can send an instance of the Color class.

// To create the final mesh, we use the Mesh class and send the geometry and the material as parameters.

// As below example:

// OBJECT
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

// We can now add our mesh to the scene by using the add(...) method:
scene.add(mesh);

// If we don't add an object to the scene, we won't be able to see it.

// CAMERA CREATION
// The camera is not visible. It's more like a theoretical point of view. When we will do a render of our scene, it will be from that camera's point of view.

// We can have multiple cameras just like on a movie set, and We can switch between those cameras as We please. Usually, we only use one camera.

// There are different types of cameras, and we will talk about these in a future lesson. For now, we simply need a camera that handles perspective (making close objects look more prominent than far objects).

// To create the camera, we use the PerspectiveCamera class.
// There are two essential parameters we need to provide: the field of view (FOV) and the aspect ratio (width / height).

// FIELD OF VIEW
// The field of view is how large our vision angle is. If We use a very large angle, We'll be able to see in every direction at once but with much distortion, because the result will be drawn on a small rectangle. If We use a small angle, things will look zoomed in. The field of view (or fov) is expressed in degrees and corresponds to the vertical vision angle.

// ASPECT RATIO
// the aspect ratio is the width of the canvas divided by its height.

// ** Don't forget to add the camera to the scene. Everything should work without adding the camera to the scene, but it might result in bugs later:

// SIZES
const sizes = {
  width: 800,
  height: 600,
};

// CAMERA
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);
camera.position.z = 3;

// RENDERER CREATION
// We will simply ask the renderer to render our scene from the camera point of view, and the result will be drawn into a canvas. We can create the canvas by ourselves, or let the renderer generate it and then add it to our page. In the index.html we've created the <canvas> element before we load the scripts and gave it a class "webgl".

// To create the renderer, we use the WebGLRenderer class with one parameter: an object {} containing all the options. We need to specify the canvas property corresponding to the <canvas> we added to the html page.

// Create a canvas variable, then fetch and store in it the element we created in the HTML, using document.querySelector(...). It's better to assign the canvas to a variable because we'll use it for other purposes later.

// CANVAS
const canvas = document.querySelector(".webgl");
console.log(canvas);

// We also need to update the size of our renderer with the setSize(...) method using the sizes object we created earlier. The setSize(...) method will automatically resize our <canvas> accordingly:

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: canvas, // if property and variable are the same, we can omit the property
});
renderer.setSize(sizes.width, sizes.height); // set the size of the renderer to the size of the canvas

// RENDER
// Call the render(...) method on the renderer and send it the scene and the camera as parameters:
renderer.render(scene, camera)
// Note** Seeing nothing? Here's the issue: we haven't specified our object's position, nor our camera's. Both are in the default position, which is the center of the scene and we can't see an object from its inside (by default).
// We need to move things.
// To do that, we have access to multiple properties on each object, such as position, rotation, and scale. For now, we use the position property to move the camera backward.
// The position property is an object with three relevant properties: x, y and z. By default, Three.js considers the forward/backward axis to be z.
// To move the camera backward, we need to provide a positive value to that property. we can do that anywhere once we've created the camera variable, yet it has to happen before we do the render:
// camera.position.z = 3 (added above in the CAMERA section)

// ** The render looks like a square, and that's because the camera aligns perfectly with the cube, and we can see only one side of it.