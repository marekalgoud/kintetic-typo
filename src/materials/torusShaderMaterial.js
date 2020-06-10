import * as THREE from "three"
import { extend } from "react-three-fiber"

class TorusShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        color: { value: new THREE.Color("white") },
        texture: { type: "t", value: undefined },
        time: { type: "f", value: 0.0 }
      },
      vertexShader: /*glsl*/ `
        varying vec2 vUv;
        varying vec3 vPos;

        void main() {
          vUv = uv;
          vPos = position;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
        }
      `,

      fragmentShader: /*glsl*/ `
        varying vec2 vUv;
        varying vec3 vPos;

        uniform sampler2D texture;
        uniform vec3 color;
        uniform float time;

        void main() {
          float shadow = clamp(vPos.z / 5., 0., 1.);
          
          float vTime = time * 0.2;
          vec2 repeat = vec2(14.0, 3.0);
          vec2 uv = fract(vUv * repeat + vec2(-vTime, 0.));

          vec3 vTexture = texture2D(texture, uv).rgb;
          // vTexture *= color;
          // vTexture *= vec3(uv.x, uv.y, 1.);

          gl_FragColor = vec4((vTexture) * shadow, 1.);
        }
      `
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
    console.log('uniform', this.uniforms.time.value)
    return this.uniforms.time.value
  }

  set time(v) {
    this.uniforms.time.value = v
  }

}

extend({ TorusShaderMaterial })
