uniform mat4 u_modelViewMatrix;
uniform mat4 u_projectionMatrix;

attribute vec4 vPosition;

uniform float t;

void main() {
	float x = vPosition.x;
	gl_Position = u_projectionMatrix * vec4(x, sin(x * t), 0, 1);
}