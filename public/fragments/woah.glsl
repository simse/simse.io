#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
float u_washout = 0.0;
float u_zoom = 0.6;
float u_complexity = 0.9;
float u_mix = 0.0;

void main(){
	vec2 coord = u_zoom * (gl_FragCoord.xy - u_resolution / 3.5) / min(u_resolution.y, u_resolution.x);

	float len;
	for (int i = 0; i < 6; i++){
		len = length(vec2(coord.x, coord.y));

		coord.x = (coord.x + cos(coord.y + sin(len)) + sin(u_time / 16.0)) * u_complexity;
		coord.y = (coord.y + sin(coord.x + cos(len)) + cos(u_time / 20.0)) * u_complexity;
	}

  vec3 base_color = vec3(max(u_washout, abs(cos(len * 4.0))), max(u_washout, abs(cos(len * 1.1))), max(u_washout, abs(cos(len * 0.0))));
  vec3 final_color = mix(base_color, vec3(1.0), u_mix);

	gl_FragColor = vec4(final_color, 1.0);
}