
import React, { useEffect } from "react"
import { extend } from '@react-three/fiber';
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"
import Neon from '../fonts/Neonderthaw_Regular.json';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { motion } from "framer-motion-3d"
import { useMotionValue, useTransform } from "framer-motion"

extend({ TextGeometry })

export function Name() {
    const loader = new FontLoader();
    const font = loader.parse(Neon);
    const textOptions = {
        font,
        size: 1,
        height: 0.3,
    };
    const x = useMotionValue(0)
    const scaleZ = useTransform(x, v => v / 100)


    return (
       
            <mesh initial={{opacity:0}} position={[2.2, 1.55, 2]} rotation={[-Math.PI / 100, 3.14, 0]} castShadow receiveShadow>
                <textGeometry attach='geometry' args={['Welcome', textOptions]} />
                <meshPhysicalMaterial attach='material' color="hotpink" metalness={3} roughness={2} />
            </mesh>

    )
}
