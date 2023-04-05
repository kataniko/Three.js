import React, { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

export function Car() {
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/Car/scene.gltf");

  const car = useMemo(() => {
    const carObject = gltf.scene.clone();
    carObject.scale.set(1, 1, 1);
    carObject.position.set(0, 0.73, 0);
    carObject.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
    return carObject;
  }, [gltf]);

  return <primitive object={car} />;
}
