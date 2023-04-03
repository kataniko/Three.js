import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from '@react-three/fiber';
import "./styles.css";
import { CubeCamera, Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Ground } from "./components/Ground";
import { Car } from "./components/Car";
import { Rings } from "./components/Rings";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Name } from "./components/Name";
import { Html } from '@react-three/drei';
import * as TWEEN from 'tween.js';
import Header from './components/Header'
import { Golden } from './components/Golden'
import { motion } from "framer-motion-3d"
import { Projects } from "./components/Projects"


function LoadingScreen({ progress }) {
    return (
        <div className="loading-screen">
            <p>Loading {progress}%</p>
            <div className="loading-bar">
                <div className="loading-progress" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    )
}


function Button({ position, text, onClick }) {

    return (

        <Html>

            <button onClick={() => onClick(position)} style={{ color: 'white', }}>{text}</button>

        </Html>

    )
}


function CarShow({ isMoving, onButtonClick }) {

    const controlsRef = useRef();
    const cameraRef = useRef();
    const [cameraPosition, setCameraPosition] = useState([0, 1.5, -5.5]);
    const [targetPosition, setTargetPosition] = useState([0, 0.35, 0]);
    const [button, setButton] = useState(0)


    const handleButtonClick = () => {
        console.log(button);
        setButton(button + 1)
        if (button == 1) {
            if (!isMoving) {
                const newPosition = [2, 1.5, 5];
                const newTarget = [0, 0.35, 0];
                const tween = new TWEEN.Tween(cameraRef.current.position)
                    .to({ x: newPosition[0], y: newPosition[1], z: newPosition[2] }, 2000)
                    .easing(TWEEN.Easing.Quadratic.InOut)
                    .onUpdate(() => setCameraPosition([cameraRef.current.position.x, cameraRef.current.position.y, cameraRef.current.position.z]))
                    .start();
                new TWEEN.Tween(controlsRef.current.target)
                    .to({ x: newTarget[0], y: newTarget[1], z: newTarget[2] }, 2000)
                    .easing(TWEEN.Easing.Quadratic.InOut)
                    .onUpdate(() => setTargetPosition([controlsRef.current.target.x, controlsRef.current.target.y, controlsRef.current.target.z]))
                    .start();
            }
        }

        if (button == 2) {
            if (!isMoving) {
                const newPosition = [16, 2, 2];
                const newTarget = [7, 0, -2];
                const tween = new TWEEN.Tween(cameraRef.current.position)
                    .to({ x: newPosition[0], y: newPosition[1], z: newPosition[2] }, 2000)
                    .easing(TWEEN.Easing.Quadratic.InOut)
                    .onUpdate(() => setCameraPosition([cameraRef.current.position.x, cameraRef.current.position.y, cameraRef.current.position.z]))
                    .start();
                new TWEEN.Tween(controlsRef.current.target)
                    .to({ x: newTarget[0], y: newTarget[1], z: newTarget[2] }, 2000)
                    .easing(TWEEN.Easing.Quadratic.InOut)
                    .onUpdate(() => setTargetPosition([controlsRef.current.target.x, controlsRef.current.target.y, controlsRef.current.target.z]))
                    .start();
            }
        }
        if (button == 3) {
            if (!isMoving) {
                const newPosition = [13.6, 0, 1];
                const newTarget = [-1, -0.2, -7.1];
                const tween = new TWEEN.Tween(cameraRef.current.position)
                    .to({ x: newPosition[0], y: newPosition[1], z: newPosition[2] }, 2000)
                    .easing(TWEEN.Easing.Quadratic.InOut)
                    .onUpdate(() => setCameraPosition([cameraRef.current.position.x, cameraRef.current.position.y, cameraRef.current.position.z]))
                    .start();
                new TWEEN.Tween(controlsRef.current.target)
                    .to({ x: newTarget[0], y: newTarget[1], z: newTarget[2] }, 2000)
                    .easing(TWEEN.Easing.Quadratic.InOut)
                    .onUpdate(() => setTargetPosition([controlsRef.current.target.x, controlsRef.current.target.y, controlsRef.current.target.z]))
                    .start();
            }
        }
    }

    useEffect(() => {
        const animate = () => {
            requestAnimationFrame(animate);
            TWEEN.update();
        }
        animate();
    }, []);


    return (
        <>
            <OrbitControls ref={controlsRef} target={[0, 0.35, 0]} maxPolarAngle={1.45} enableZoom={true}
                enablePan={true} // Disable rotation while moving
                enableRotate={true}
                enableDamping={true}
                dampingFactor={0.1} />

            <PerspectiveCamera makeDefault fov={50} position={cameraPosition} ref={cameraRef} />

            <color args={[0, 0, 0]} attach="background" />
            <CubeCamera resolution={1080} frames={Infinity}>
                {(texture) => (
                    <>
                        <Environment map={texture} />
                        {/* //ao colocar o carro aqui dentro exclui-se de ser renderizado da cena */}
                        <Car />
                    </>
                )}
            </CubeCamera>
            <Rings />


            {/* <Name /> */}


            <Golden />
            <Projects />


            //spotlights do carro
            <spotLight
                color={[1, 0.25, 0.7]}
                intensity={2}
                angle={0.7}
                penumbra={1.5}
                position={[5, 5, 0]}
                castShadow
                shadow-bias={-0.0001} />


            <spotLight
                color={[0.14, 0.5, 1]}
                intensity={2}
                angle={0.6}
                penumbra={0.5}
                position={[-5, 5, 0]}
                castShadow
                shadow-bias={-0.0001} />



            //spotlights do quadro

            <spotLight
                color={"yellow"}
                intensity={1}
                angle={0.5}
                penumbra={1.5}
                position={[25, 10, 0]}
                castShadow
                shadow-bias={-0.0001} />
            <Ground />

            <EffectComposer>

                <Bloom
                    blendFunction={BlendFunction.ADD}
                    intensity={1}
                    width={600}
                    height={600}
                    kernelSize={1}
                    luminanceThreshold={0.05}
                    luminanceSmoothing={0.025}
                />
            </EffectComposer>

            <Button position={[0, 1, -5]} text={'Click me!'} onClick={() => handleButtonClick()} />
        </>
    )
}

export default function App() {
    const [isMoving, setIsMoving] = useState(false);

    return (
        <>
            <div className="container">
                <Suspense fallback={[<LoadingScreen />]} >
                    <Canvas className="canvas" shadows dpr={[1, 2]}>
                        <Html className="back2">

                            <div className="back">
                                <Header />
                            </div>

                        </Html>
                        <CarShow isMoving={isMoving} onButtonClick={setIsMoving} />
                    </Canvas>
                </Suspense>
            </div >
        </>
    );
}