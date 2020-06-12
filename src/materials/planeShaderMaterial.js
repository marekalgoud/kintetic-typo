import * as THREE from "three"
import { extend } from "react-three-fiber"

class PlaneShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        color: { value: new THREE.Color("white") },
        texture: { type: "t", value: undefined },
        time: { type: "f", value: 0.0 },
        mouse: { value: new THREE.Vector2() }
      },
      vertexShader: /*glsl*/ `
        varying vec2 vUv;
        varying vec3 vPos;
        uniform float time;

        void main() {
          vUv = uv;
          vPos = position;

          float noiseFreq = 3.5;
          float noiseAmp = 0.15; 
          vec3 noisePos = vec3(vPos.x * noiseFreq + time, vPos.y, vPos.z);
          vPos.z += snoise(noisePos) * noiseAmp;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(vPos, 1.);
        }
      `,

      fragmentShader: /*glsl*/ `
        varying vec2 vUv;
        varying vec3 vPos;

        uniform sampler2D texture;
        uniform vec3 color;
        uniform float time;
        uniform vec2 mouse;

        void main() {


          vec2 center = vec2(mouse.x, mouse.y);
          float d = distance(vUv, center);

          vec3 vTexture = texture2D(texture, vUv).rgb;
          vec3 mask = d > 0.02 ? vec3(vTexture) : vec3(1.0 - vTexture);

          float vTime = time * 0.2;
          // vec2 repeat = vec2(1.0, 1.0);
          // vec2 uv = fract(vUv * repeat + vec2(-vTime, 0.));

          // vTexture *= color;
          // vTexture *= vec3(uv.x, uv.y, 1.);

          gl_FragColor = vec4(mask, 1.);
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
