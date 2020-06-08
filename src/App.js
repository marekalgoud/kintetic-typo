import React, {useRef, useMemo, useEffect} from 'react';
import { Canvas, useThree, useFrame, createPortal, useRender } from 'react-three-fiber'
import { Text, OrbitControls, PerspectiveCamera } from "drei"
import * as THREE from 'three'
import './materials/textShaderMaterial'

import './App.css';

function Camera() {

  const { viewport } = useThree()
  const cam = useRef()

  // let zoom = 20
  // if (viewport.width < 520) {
  //   zoom = viewport.width / 320 * 12
  // }

  return (
    <PerspectiveCamera ref={cam} makeDefault position={[0, 0, 40]}  />
  )
}


function MovingText({children, position, rotation}) {
  const ref = useRef()
  const cam = useRef()
  const mat = useRef()

  const [scene, target] = useMemo(() => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('white')
    const target = new THREE.WebGLRenderTarget(2048, 2048)
    return [scene, target]
  }, [])

  const clock = new THREE.Clock();
  let time
  useFrame(state => {
    state.gl.setRenderTarget(target)
    state.gl.render(scene, cam.current)
    state.gl.setRenderTarget(null)
    time = clock.getElapsedTime() % 1
    mat.current.uniforms.time.value = clock.getElapsedTime()
  })

  useEffect(() => {
    console.log(mat)
  })

  return (
    <>
    <PerspectiveCamera ref={cam} position={[0, 0, 10]} />
    {createPortal(
        <Text
          color="#000000"
          fontSize={6}
          textAlign="justify"
          font="/fonts/bangers.woff"
          anchorX="center"
          anchorY="middle">
          {children}
        </Text>,
        scene
      )}
    <mesh ref={ref} position={position} rotation={rotation}>
      <torusKnotBufferGeometry attach="geometry" args={[9, 3, 768, 3, 4, 3]} />
      <textShaderMaterial ref={mat} attach="material" texture={target.texture} time={time} color="#000000" map={target.texture} />
      {/* <meshStandardMaterial attach="material" color={color} map={target.texture} /> */}
    </mesh>
    </>
  )
}

function App() {
  return (<Canvas pixelRatio={window.devicePixelRatio}>
    <Camera />
    <OrbitControls
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={3 * Math.PI / 4}
      minAzimuthAngle={-Math.PI / 4}
      maxAzimuthAngle={Math.PI / 4}
      minZoom={20}
       />
    <ambientLight intensity={1} />

    <MovingText position={[0, 0, 0]}>
      ENDLESS
    </MovingText>
    </Canvas>
  );
}

export default App;
