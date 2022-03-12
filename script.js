// console.log(THREE) // The THREE variable (in uppercase) contains most of the classes and properties we might need on a classic Three.js project. Unfortunately, not all classes are inside this variable.

// Create a scene
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
    height: 600
}

// CAMERA
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
scene.add(camera)

// RENDERER
// We will simply ask the renderer to render our scene from the camera point of view, and the result will be drawn into a canvas. We can create the canvas by ourselves, or let the renderer generate it and then add it to our page. In the index.html we've created the <canvas> element before we load the scripts and gave it a class "webgl".

