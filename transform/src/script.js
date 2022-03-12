import "./style.css";
import * as THREE from "three";

// CANVAS
const canvas = document.querySelector("canvas.webgl");

// SCENE
const scene = new THREE.Scene();

// OBJECTS
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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

// Position can be declared anywhere, but before calling the render(...) method.
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;
// To change the values, instead of changing x, y and z separately, we can also use the set(...) method:
// mesh.position.set(0.7, -0.6, 1);
// **Note: Position is a vector3

// The position property is not any object. It's an instance of the Vector3 class. While this class has an x, a y, and a z property, it also has many useful methods.

// We can get the length of a vector. The distance of the center of the scene and our object position.
console.log(mesh.position.length());

// We can get the distance from another Vector3 (make sure to use this code after creating the camera = So, this should be below in the camera section after declaring it. If not we'll get an error "cannot access "camera before initialization").):
// console.log(mesh.position.distanceTo(camera.position))

// We can normalize its values (meaning that we will reduce the length of the vector to 1 unit but preserve its direction):
// mesh.position.normalize()

// AXES HELPER
// The AxesHelper will display 3 lines corresponding to the x, y and z axes, each one starting at the center of the scene and going in the corresponding direction.

// To create the AxesHelper, instantiate it and add it to the scene right after instantiating that scene. We can specify the length of the lines as the only parameter.
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper); // it's an object and every object needs to be added to the scene
// Note** We should see a green and a red line.
// The green line corresponds to the y axis. The red line corresponds to the x axis and there is a blue line corresponding to the z axis but we can't see it because it's perfectly aligned with the camera.

// SCALE OBJECTS
// scale is also a Vector3. By default, x, y and z are equal to 1, meaning that the object has no scaling applied. If we put 0.5 as a value, the object will be half of its size on this axis, and if we put 2 as a value, it will be twice its original size on this axis.
// mesh.scale.x = 2
// mesh.scale.y = 0.25
// mesh.scale.z = 0.5
// Or we can use the set:
// mesh.scale.set(2, 0.25, 0.5)
// Notes:**
// 1. Clearly, we cannot see the z scale because our Mesh is facing the camera.
// 2. While we can use negative values, it might generate bugs later on because axes won't be oriented in the logical direction. Try to avoid doing it.
// 3. Because it's a Vector3, we can use all the previously mentioned methods.

// ROTATE OBJECTS
// Rotation is a little more troublesome than position and scale. There are two ways of handling a rotation.

// We can use the self-evident rotation property, but we can also use the less obvious quaternion property. Three.js supports both, and updating one will automatically update the other. It's just a matter of which one we prefer.

// ROTATION
// The rotation property also has x, y, and z properties, but instead of a Vector3, it's a Euler. When you change the x, y, and z properties of a Euler, you can imagine putting a stick through your object's center in the axis's direction and then rotating that object on that stick.

// 1. If we spin on the y axis, we can picture it like a carousel.
// 2. If we spin on the x axis, we can imagine that we are rotating the wheels of a car we'd be in.
// 3. And if we rotate on the z axis, we can imagine that we are rotating the propellers in front of an aircraft we'd be in.

// The value of these axes is expressed in radians. If we want to achieve half a rotation, we'll have to write something like 3.14159... we probably recognize that number as π. In native JavaScript, we can end up with an approximation of π using Math.PI.

mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;

// Notes** Seems easy but  when we combine those rotations, we might end up with strange results. Why? Because, while we rotate the x axis, we also change the other axes' orientation. The rotation applies in the following order: x, y, and then z. That can result in weird behaviors like one named gimbal lock when one axis has no more effect, all because of the previous ones.
// We can change this order by using the reorder(...) method object.rotation.reorder('yxz') Note**: We need to add this before changing the rotation not after. So, this goes before the code above mesh.rotation.x = Math.PI * 0.25;

// While Euler is easier to understand, this order problem can cause issues. And this is why most engines and 3D softwares use another solution named Quaternion.

// Note**: The quaternion property also expresses a rotation, but in a more mathematical way, which solves the order problem.

// COMBINING TRANSFORMATIONS
// We can combine the position, the rotation (or quaternion), and the scale in any order. The result will be the same. It's equivalent to the state of the object.

// Let's combine all the transformations we tried before:
// mesh.position.x = 0.7
// mesh.position.y = - 0.6
// mesh.position.z = 1
// mesh.scale.x = 2
// mesh.scale.y = 0.25
// mesh.scale.z = 0.5
// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25

// SCENE GRAPH
// At some point, we might want to group things. Let's say we are building a house with walls, doors, windows, a roof, bushes, etc.

// When we think we're done, we become aware that the house is too small, and we have to re-scale each object and update their positions.

// A good alternative would be to group all those objects into a container and scale that container.

// we can do that with the Group class.

// Instantiate a Group and add it to the scene. Now, when we want to create a new object, we can add it to the Group we just created using the add(...) method rather than adding it directly to the scene

// Because the Group class inherits from the Object3D class, it has access to the previously-mentioned properties and methods like position, scale, rotation, quaternion, and lookAt.

// Comment the lookAt(...) call and, instead of our previously created cube, create 3 cubes and add them to a Group. Then apply transformations on the group:
// Note**: The order doesn't really matter, as long as it's valid JavaScript.

// GROUP OF OBJECTS
//  const group = new THREE.Group()
//  group.scale.y = 2
//  group.rotation.y = 0.2
//  scene.add(group)

//  const cube1 = new THREE.Mesh(
//      new THREE.BoxGeometry(1, 1, 1),
//      new THREE.MeshBasicMaterial({ color: 0xff0000 })
//  )
//  cube1.position.x = - 1.5
//  group.add(cube1)

//  const cube2 = new THREE.Mesh(
//      new THREE.BoxGeometry(1, 1, 1),
//      new THREE.MeshBasicMaterial({ color: 0xff0000 })
//  )
//  cube2.position.x = 0
//  group.add(cube2)

//  const cube3 = new THREE.Mesh(
//      new THREE.BoxGeometry(1, 1, 1),
//      new THREE.MeshBasicMaterial({ color: 0xff0000 })
//  )
//  cube3.position.x = 1.5
//  group.add(cube3)

// SIZES
const sizes = {
  width: 800,
  height: 600,
};

// CAMERA
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

console.log(mesh.position.distanceTo(camera.position));

// LOOK AT THIS
// Object3D instances have an excellent method named lookAt(...) that let us ask an object to look at something. The object will automatically rotate its -z axis toward the target we provided. No complicated maths needed.

// We can use it to rotate the camera toward an object, orientate a cannon to face an enemy, or move the character's eyes to an object.

// The parameter is the target and must be a Vector3.
// camera.lookAt(new THREE.Vector3(0, - 1, 0))

// The cube seems to be higher, but in fact, the camera is looking below the cube.

// We can also use any existing Vector3 such as the mesh's position, but that will result in the default camera position because our mesh is in the center of the scene.
camera.lookAt(mesh.position);

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
