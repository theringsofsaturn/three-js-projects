// console.log(THREE) // The THREE variable (in uppercase) contains most of the classes and properties we might need on a classic Three.js project. Unfortunately, not all classes are inside this variable.

// Create a scene
const scene = new THREE.Scene()

// To create a visible object (like a cube) we need to create a type of object named Mesh - combination of a geometry (the shape) and a material (how it looks) - 
// Starting with a BoxGeometry (a cube is basically a box but with a width, depth and height at the same size) and a MeshBasicMaterial.
// To create the geometry, we use the BoxGeometry class with the first 3 parameters that correspond to the box's size.

// To create the material, we use the MeshBasicMaterial class with one parameter: an object {} containing all the options. All we need is to specify its color property.

// There are many ways to specify a color in Three.js. we can send it as a JS hexadecimal 0xff0000, we can send it as a string hexadecimal '#ff0000', we can use color names like 'red', or we can send an instance of the Color class.

// To create the final mesh, we use the Mesh class and send the geometry and the material as parameters.

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

// We can now add our mesh to the scene by using the add(...) method:
scene.add(mesh)

// If we don't add an object to the scene, we won't be able to see it.

