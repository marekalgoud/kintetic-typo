import React, {useRef, useMemo} from 'react';
import { Canvas, useFrame, createPortal } from 'react-three-fiber'
import { Text, OrbitControls, PerspectiveCamera } from "drei"
import * as THREE from 'three'
import '../materials/planeShaderMaterial'


function MovingText({children, position, rotation}) {
  const ref = useRef()
  const mat = useRef()

  const [scene, target, camera] = useMemo(() => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#000000')
    const target = new THREE.WebGLRenderTarget(2048, 2048)
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
    camera.position.z = 40
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
          maxWidth={30}
          >
          {children}
        </Text>,
        scene
      )}
    <mesh ref={ref} position={position} rotation={rotation}>
      <planeBufferGeometry attach="geometry" args={[40, 40, 32, 32]} />
      <planeShaderMaterial ref={mat} attach="material" texture={target.texture} time={time} color="#000000" map={target.texture} />
      {/* <meshBasicMaterial ref={mat} attach="material" color="#FF0000"  /> */}
    </mesh>
    </>
  )
}

function App() {
  const text = `Everybody's got to live together
All the people got to understand
So, love your neighbour
Like you love your brother
Come on and join the band
Well, all you need is love and understanding
Ring the bell and let the people know
We're so happy and we're celebrating
Come on and let your feelings show
Love is all, well love is all
Love is all, can't you hear the call
Oh, love is all you need
Love is all you need at the Butterfly Ball`

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
    {text}
    </MovingText>
    </Canvas>
  );
}

export default App;
