"use strict";

// global variables
var gl; 
var vertices, vBuffer, vPosition;
var colors, cBuffer;
var ut;


function square_vertices(radius, offset){
  var vertices = [];
  var r =radius;
  for(var t = 0; t <  2*Math.PI; t+=2*Math.PI/4){
    vertices.push(r*Math.cos(t)+offset, r*Math.sin(t)+offset);
  }
  console.log(vertices.length);
  return vertices
}





window.onload = function init() {
			var canvas = document.getElementById("gl-canvas");
            gl = WebGLUtils.setupWebGL( canvas );
            if(!gl){alert("WebGL setup failed!");}
            
            // Clear canvas
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            
            // Load shaders and initialize attribute buffers
            var program = initShaders( gl, "vertex-shader", "fragment-shader" );
            gl.useProgram( program );
            
            // set up first buffer with verts for an offset pentagon
            // var vertices1 = pentagon_vertices(0.2, 0);
            var vertices = [-1, -1, -1, 1, 1, 1, 1, -1];
            vBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            
            //set up second buffer, centered pentagon


            // Do shader plumbing
            vPosition = gl.getAttribLocation(program, "vPosition");
            gl.enableVertexAttribArray(vPosition);

            //Draw first pentagon
            gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer); //set appropriate buffer as current
            gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0); // uses currently bound buffer
            gl.drawArrays(gl.TRIANGLE_FAN,0,4);
};

// function render(now){
// 			requestAnimationFrame(render);
			
// 			// var t = 0.001*now;
// 			// gl.uniform1f(ut,t);
			
// }
