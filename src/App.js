import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from '@react-three/fiber';
import "./styles.css";
import { CubeCamera, Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Ground } from "./components/Ground";
import { Car } from "./components/Car";
import { Rings } from "./components/Rings";
import { Bloom, DepthOfField, EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Name } from "./components/Name";
import { Html } from '@react-three/drei';
import Header from './components/Header'



function Button({ position, text, onClick }) {

    return (

        <Html>

            <button onClick={() => onClick(position)} style={{ color: 'white', }}>{text}</button>

        </Html>

    )
}


function CarShow({ isMoving, onButtonClick }) {
    const controlsRef = useRef();
    const [cameraPosition, setCameraPosition] = useState([0, 1.5, -5.5]);

    const handleButtonClick = () => {
        if (!isMoving) {
            setCameraPosition([2, 1.5, 5]);
            controlsRef.current.target.set(0, 0.35, 0);
        }
        onButtonClick(!isMoving);
    }



    return (
        <>
            <OrbitControls ref={controlsRef} target={[0, 0.35, 0]} maxPolarAngle={1.45} />
            <PerspectiveCamera makeDefault fov={50} position={cameraPosition} />

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
            <Name />

            <spotLight
                color={[1, 0.25, 0.7]}
                intensity={2}
                angle={0.6}
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

            <Ground />

            <EffectComposer>
                <DepthOfField intensity={10} />
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

            <Button position={[0, 1, -5]} text={'Click me!'} onClick={handleButtonClick} />
        </>
    )
}

export default function App() {
    const [isMoving, setIsMoving] = useState(false);

    return (
        <>
            <div className="container">
                <Suspense >
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