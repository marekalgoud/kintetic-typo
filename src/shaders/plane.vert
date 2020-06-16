#pragma glslify:snoise=require('glsl-noise/simplex/3d.glsl')

varying vec2 vUv;
varying vec3 vPos;
uniform float time;

void main() {
    vUv = uv;
    vPos = position;

    float noiseFreq = 2.;
    float noiseAmp = 1.; 
    vec3 noisePos = vec3(vPos.x * noiseFreq + time, vPos.y, vPos.z);
    vPos.z += snoise(noisePos) * noiseAmp;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPos, 1.);
}