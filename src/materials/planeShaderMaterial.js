import * as THREE from "three"
import { extend } from "react-three-fiber"
import vertexShader from '../shaders/plane.vert'
import fragmentShader from '../shaders/plane.frag'

class PlaneShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        color: { value: new THREE.Color("white") },
        texture: { type: "t", value: undefined },
        time: { type: "f", value: 0.0 },
        mouse: { value: new THREE.Vector2() }
      },
      vertexShader,
      fragmentShader
    })
  }

  get color() {
    return this.uniforms.color.value
  }

  get texture() {
    return this.uniforms.texture.value
  }

  set texture(v) {
    this.uniforms.texture.value = v
  }

  get time() {
    return this.uniforms.time.value
  }

  set time(v) {
    this.uniforms.time.value = v
  }

  get mouse() {
    return this.uniforms.mouse.value
  }

  set mouse(v) {
    this.uniforms.mouse.value = v
  }

}

extend({ PlaneShaderMaterial })
