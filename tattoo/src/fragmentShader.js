export default `
uniform sampler2D texture;
uniform sampler2D tattoo;
uniform vec4 params;
uniform vec3 effects;
varying vec2 vUv;
void main( void ) {
  vec4 color = texture2D( texture, vUv );

  float x = vUv.x - params.x;
  float y = vUv.y - params.y;
  float co = cos(effects.x);
  float si = sin(effects.x);
  float xUv = x * co + y * si;
  float yUv = y * co - x * si;
  vec2 uv = vec2(xUv, yUv);
  // vec2 uv = vUv - params.xy;
  uv = uv * 5600.0 / params.zw;
  if (uv.x < 1.0 && uv.y < 1.0 && uv.x > 0.0 && uv.y > 0.0) {
    uv = uv - effects.yz;

    uv = vec2(
      uv.x * clamp(abs(uv.y) * 3.6, .9, 1.2),
      uv.y * clamp(abs(uv.y) * 3.6, .9, 1.2)
    );

    uv = uv + effects.yz;

    vec4 tColor = texture2D( tattoo, uv );
    float w = clamp(tColor.w, 0.0, 0.8);
    color = color * (1.0 - w) + tColor * w;
  }

  gl_FragColor = color;
}
`;