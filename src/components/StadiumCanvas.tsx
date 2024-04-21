"use client";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense } from "react";
//@ts-ignore
import { GLTFLoader } from "../../node_modules/three/examples/jsm/loaders/GLTFLoader";
function Stadium() {
  const gltf = useLoader(GLTFLoader, "./stadium/scene.gltf");

  return (
    <group>
      <primitive object={gltf.scene} />
    </group>
  );
}

const StadiumCanvas = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight />
      <OrbitControls
        autoRotate
        minDistance={100}
        maxDistance={200}
        enableDamping
      />
      <Suspense fallback={null}>
        <Stadium />
      </Suspense>
      <Environment preset="sunset" />
    </Canvas>
  );
};

export default StadiumCanvas;
