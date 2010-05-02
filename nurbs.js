// This class encapsulates parametric curves
function nurbs(knots, cps, degree, color, options) {
	
	this.gl           = null;
	this.knots        = knots;
	this.knotsTexture = null;
	this.cps          = cps;
	this.degree       = degree;
	
	this.vertexVBO	= null;
	this.indexVBO	= null;
	this.count	 	= 100;
	this.parameters = null;
	this.color      = color || [0, 0, 0, 1];
	this.options    = options || (CARTESIAN | X_LIN | Y_LIN);

	this.initialize = function(gl, scr, parameters) {
		this.gl = gl;
		this.parameters = parameters;
		this.refresh();
		this.gen_program();
	}
	
	this.refresh = function(scr) {
		this.gen_vbo(scr);
		
		knots = this.knots;
		
		f = function(pixels) {
			for (var i = 0; i < knots.length; i += 1) {
				pixels[i * 4] = knots[i];
			}
			return pixels;
		}
		this.knotsTexture = ftexture(this.gl, this.knots.length, 1, f);
	}

	this.gen_vbo = function(scr) {
		var vertices = [];
		var indices	 = [];
		var us       = [];
		var points   = [];
		
		// Increment l, searching for interval u_{l} to u_{l+1}
		var l = 0;
		while (this.knots[l+1] == 0) {
			l = l + 1;
		}
		
		var a = 0;
		var dx = 1.0 / this.count;
		
		for (var i = 0; i < this.count; ++i) {
			vertices.push(a);
			indices.push(i);
			a += dx;
		}

		/* Add this soon */
		if (this.vertexVBO) {
			//this.gl.console.log("deleting");
			//this.gl.deleteBuffer(this.vertexVBO);
		}
		
		this.vertexVBO = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexVBO);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new WebGLFloatArray(vertices), this.gl.STATIC_DRAW);
		
		this.indexVBO = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexVBO);
		
		// I think this ought to be changed to STATIC_DRAW
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new WebGLUnsignedShortArray(indices), this.gl.STATIC_DRAW);
	}
	
	this.draw = function(scr) {
		this.setUniforms(scr);
		
		this.gl.enableVertexAttribArray(0);
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexVBO);
		this.gl.vertexAttribPointer(0, 1, this.gl.FLOAT, this.gl.FALSE, 0, 0);
		
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexVBO);
		
		this.gl.drawElements(this.gl.LINE_STRIP, this.count, this.gl.UNSIGNED_SHORT, 0);
		
		this.gl.disableVertexAttribArray(0);
	}
	
	this.gen_program = function() {
		var vertex_source = this.read("shaders/nurbs.vert").replace("USER_FUNCTION", "s");
		var frag_source	  = this.read("shaders/nurbs.frag");
		
		this.program = this.compile_program(vertex_source, frag_source);		
	}
}

nurbs.prototype = new primitive();