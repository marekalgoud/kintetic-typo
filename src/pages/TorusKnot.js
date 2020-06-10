import React, {useRef, useMemo} from 'react';
import { Canvas, useFrame, createPortal } from 'react-three-fiber'
import { Text, OrbitControls, PerspectiveCamera } from "drei"
import * as THREE from 'three'
import '../materials/torusShaderMaterial'


function MovingText({children, position, rotation}) {
  const ref = useRef()
  const mat = useRef()

  const [scene, target, camera] = useMemo(() => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#000000')
    const target = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight)
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
    camera.position.z = 3.5
    return [scene, target, camera]
  }, [])

  const clock = new THREE.Clock();
  let time
  useFrame(({gl }) => {
    gl.setRenderTarget(target)
    gl.render(scene, camera)
    gl.setRenderTarget(null)

    time = clock.getElapsedTime() % 1
    mat.current.uniforms.time.value = clock.getElapsedTime()
  })

  return (
    <>
    {createPortal(
        <Text
          color="#FFFFFF"
          fontSize={1}
          font="/fonts/bangers.woff"
          >
          {children}
        </Text>,
        scene
      )}
    <mesh ref={ref} position={position} rotation={rotation}>
      <torusKnotBufferGeometry attach="geometry" args={[9, 3, 768, 3, 4, 3]} />
      <torusShaderMaterial ref={mat} attach="material" texture={target.texture} time={time} color="#000000" map={target.texture} />
    </mesh>
    </>
  )
}

function App() {
  return (<Canvas pixelRatio={window.devicePixelRatio}>
    <PerspectiveCamera makeDefault fov={45} aspect={1} near={0.1} far={1000} position={[0, 0, 30]} />
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
