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