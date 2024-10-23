varying vec2 vUv;
varying float vElevation;
uniform float uColorChange;

void main() {
    // vec4 c1 = vec4(1.0, 0.7255, 0.8157, 1.0); // Slightly more pink
    vec4 c1 = vec4(1.0, 0.7255, 0.8157, 1.0); // Slightly more pink
    vec4 c2 = vec4(1.0, 0.8235, 0.8824, 1.0); // More light pink

    vec4 c3 = vec4(1.0, 0.8, 0.7, 1.0); 
    vec4 c4 = vec4(1.0, 0.9, 0.8, 1.0);

    float value = smoothstep(-0.20, 0.20, vElevation); // Smoothstep between 0.0 and 1.0
    vec4 colorPink = mix(c1, c2, value); // Mix c1 and c2 using smoothstep value
    vec4 colorOrange = mix(c3, c4, value); // Mix c1 and c2 using smoothstep value

    vec4 final = mix(colorPink, colorOrange, uColorChange);
    gl_FragColor = final; // Use final color-
}