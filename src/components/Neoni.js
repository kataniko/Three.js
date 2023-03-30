import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Mesh } from "three"
import { useEffect } from "react";

export function Neoni (){

    //load do carro

    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "models/Neoni/FORNIKO.gltf"
    );

        //dar downscale pq vem demasiado grande normalmente
    useEffect(() =>{
        //escala do carro
        gltf.scene.scale.set(3, 3, 3);
        
        //altura do carro
        gltf.scene.position.set(0, 0.03, -2.52)
        gltf.scene.rotation.set(Math.PI/4,3.1,0)
      
    
        gltf.scene.traverse((object) => {
            if(object instanceof Mesh) {
                //ligar sombras
                object.castShadow = true ; 
                //ligar receber sombras de outros objetos
                object.receiveShadow = true;
                //intensidade do material
                object.material.envMapIntensity = 20;
            }
        });
    },[gltf]);

    //export do objeto
    return <primitive object={gltf.scene} />;
}
