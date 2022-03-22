import "./index.css";
import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";

function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/shoe.gltf");
  return (
    <group ref={group} {...props} dispose={null} scale={3}>
      <mesh
        geometry={nodes.shoe.geometry}
        material={materials.laces}
        material-color={props.customColors.setStripes}
      />
      <mesh
        geometry={nodes.shoe_1.geometry}
        material={materials.mesh}
        material-color={props.customColors.mesh}
      />
      <mesh
        geometry={nodes.shoe_2.geometry}
        material={materials.caps}
        material-color={props.customColors.soul}
      />
      <mesh
        geometry={nodes.shoe_3.geometry}
        material={materials.inner}
        material-color={props.customColors.soul}
      />
      <mesh
        geometry={nodes.shoe_4.geometry}
        material={materials.sole}
        material-color={props.customColors.soul}
      />
      <mesh
        geometry={nodes.shoe_5.geometry}
        material={materials.stripes}
        material-color={props.customColors.stripes}
      />
      <mesh
        geometry={nodes.shoe_6.geometry}
        material={materials.band}
        material-color={props.customColors.stripes}
      />
      <mesh
        geometry={nodes.shoe_7.geometry}
        material={materials.patch}
        material-color={props.customColors.soul}
      />
    </group>
  );
}

function App() {
  const [mesh, setMesh] = useState("#ffffff");
  const [stripes, setStripes] = useState("#ffffff");
  const [soul, setSoul] = useState("#ffffff");

  return (
    <>
      <div className="App">
        <div className="wrapper">
          <div className="card">
            <div className="product-canvas">
              <Canvas>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.3} />
                  <spotLight
                    intensity={0.3}
                    angle={0.1}
                    penumbra={1}
                    position={[5, 25, 20]}
                  />
                  <Model
                    customColors={{ mesh: mesh, stripes: stripes, soul: soul }}
                  />
                  <Environment files="royal_esplanade_1k.hdr" />
                  <ContactShadows
                    rotation-x={Math.PI / 2}
                    position={[0, -0.6, 0]}
                    opacity={0.25}
                    width={10}
                    height={10}
                    blur={2}
                    far={1}
                  />
                </Suspense>
                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                />
              </Canvas>
            </div>
            <h2>Zgjidh ngjyrat</h2>
            <div className="colors">
              <div>
                <input
                  type="color"
                  id="mesh"
                  name="mesh"
                  value={mesh}
                  onChange={(e) => setMesh(e.target.value)}
                />
                <label for="mesh">Pjesa e siperme</label>
              </div>

              <div>
                <input
                  type="color"
                  id="stripes"
                  name="stripes"
                  value={stripes}
                  onChange={(e) => setStripes(e.target.value)}
                />
                <label for="stripes">Vizat</label>
              </div>
              <div>
                <input
                  type="color"
                  id="soul"
                  name="soul"
                  value={soul}
                  onChange={(e) => setSoul(e.target.value)}
                />
                <label for="soul">Pjesa e poshtme</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
