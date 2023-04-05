
import React, { useEffect } from "react"
import { extend } from '@react-three/fiber';
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"
import Neon from '../fonts/Neonderthaw_Regular.json';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';


extend({ TextGeometry })

export function Projects({ handleCameraMove }) {
    const loader = new FontLoader();
    const font = loader.parse(Neon);
    const textOptions = {
        font,
        size: 0.07,
        height: 0.002,
    };


    return (
        <>
            <mesh position={[12.16, 1.87, 0.36]} rotation={[-Math.PI / 100, 1, 0]} castShadow receiveShadow>
                <textGeometry attach='geometry' args={['Hero', textOptions]} />
                <meshStandardMaterial attach='material' color="white" metalness={3} roughness={2} />
            </mesh>

            <mesh position={[12.09, 1.73, 0.36]} rotation={[-Math.PI / 100, 1, 0]} castShadow receiveShadow>
                <textGeometry attach='geometry' args={['Projects', textOptions]} />
                <meshStandardMaterial attach='material' color="white" metalness={3} roughness={2} />
            </mesh>
           
        </>

    )
}
