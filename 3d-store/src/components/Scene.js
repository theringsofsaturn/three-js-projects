import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { softShadows, OrbitControls, TransformControls } from '@react-three/drei';
import Model from './Model'
import { Html, useProgress } from '@react-three/drei'
import { AxesHelper } from 'three';
import * as THREE from "three";

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

softShadows();

function Scene() {

  return (
    <>
      <Canvas
        shadows
        colorManagement
        camera={{ position: [0, 10, 15], fov: 50 }}
      >
        <Suspense fallback={() => Loader}>
          <ambientLight intensity={0.28} />

          <directionalLight
            castShadow
            position={[8, 2, 2]}
            intensity={1.3}
            // color="#e7b4b9"
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          {/* top */}
          <pointLight position={[-4, 2, -2]} intensity={0.05} color='lightblue' />

          <Model />
          <OrbitControls />
          {/* <TransformControls /> */}
          {/* <AxesHelper /> */}
          {/* <primitive object={new THREE.AxesHelper(10)} /> */}
        </Suspense>
      </Canvas>
    </>
  );
}

export default Scene;
