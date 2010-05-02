uniform mat4 modelviewMatrix;
uniform mat4 projectionMatrix;

attribute vec4 position;

varying float sp;

uniform float t;

// USER_PARAMETERS

vec4 function(float s) {
	return vec4(USER_FUNCTION, s, 0.0, 1.0);
}

void main() {
	vec4 result = function(position.x);
	
	sp = position.x;
	
	// COORDINATE_TRANSFORMATION
	
	gl_Position = projectionMatrix * modelviewMatrix * result;
}