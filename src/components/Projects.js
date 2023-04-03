
import React, { useEffect } from "react"
import { extend } from '@react-three/fiber';
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"
import Neon from '../fonts/Neonderthaw_Regular.json';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { motion } from "framer-motion-3d"
import { useMotionValue, useTransform } from "framer-motion"

extend({ TextGeometry })

export function Projects() {
    const loader = new FontLoader();
    const font = loader.parse(Neon);
    const textOptions = {
        font,
        size: 0.06,
        height: 0.002,
    };

    const textOptions2 = {
        font,
        size: 0.05,
        height: 0.002,
    };
    const x = useMotionValue(0)
    const scaleZ = useTransform(x, v => v / 100)


    return (
        <>
            <motion.mesh initial={{ opacity: 0 }} position={[12.11, 1.85, 0.36]} rotation={[-Math.PI / 100, 1, 0]} castShadow receiveShadow>
                <textGeometry attach='geometry' args={['Projects', textOptions]} />
                <meshPhysicalMaterial attach='material' color="white" metalness={3} roughness={2} />
            </motion.mesh>

            <motion.mesh initial={{ opacity: 0 }} position={[12.1, 1.72, 0.38]} rotation={[-Math.PI / 100, 1, 0]} castShadow receiveShadow>
                <textGeometry attach='geometry' args={['About Me', textOptions2]} />
                <meshPhysicalMaterial attach='material' color="white" metalness={3} roughness={2} />
            </motion.mesh>
        </>

    )
}
