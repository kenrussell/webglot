uniform mat4 u_modelViewMatrix;
uniform mat4 u_projectionMatrix;

uniform float dx;
uniform float dy;

attribute vec4 vPosition;
attribute vec2 aTextureCoord;

varying float magnitude;

uniform float t;

varying vec2 vTextureCoord;

const float h = 0.001;

vec2 function(float x, float y) {
	return vec2(USER_FUNCTION);
}

void main() {
	float x = vPosition.x + dx;
	float y = vPosition.y + dy; 
	
	vec2 d = function(x, y);
	
	magnitude = length(d);

	/*
	vec4 result = vec4(x + h * d.x, y + h * d.y, 0.0, 1.0);
	gl_Position = u_projectionMatrix * result;
	vTextureCoord = aTextureCoord;// - 5.0 * h * d;
	//*/
	
	//*
	gl_Position = u_projectionMatrix * vPosition;
	vTextureCoord = aTextureCoord - h * normalize(d);
	//*/
}