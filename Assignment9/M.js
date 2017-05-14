
//////////////////////////////////////////////////////////////////////////////
// M is an object containing methods that let you manipulate 4x4 matrices.
//////////////////////////////////////////////////////////////////////////////

var M = {};
M_stack = [];


//////////////////////////////////////////////////////////////////////////////
// Your task is to implement the following methods of object M:
//////////////////////////////////////////////////////////////////////////////

M.identity  = function(m) {                      // Set m values to identity matrix.
  var _m = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
  for (i = 0 ; i < m.length ; i++){
    m[i] = _m[i];
  }
}



M.restore   = function(m) {                      // Pop from a stack to set the 16 values of m.
  var i, _m = M_stack.pop();       // POP THE COPY OFF THE STACK
  for (i = 0 ; i < m.length ; i++)  // COPY ITS VALUES INTO MATRIX
    m[i] = _m[i];
}


M.rotateX   = function(m, radians) {             // Modify m, rotating about the X axis.
  var a = Math.cos(radians);
  var b = Math.sin(radians);
  var c = -Math.sin(radians);
  var _m = [1,0,0,0, 0,a,b,0, 0,c,a,0, 0,0,0,1];
  M.matrixMultiply(m, _m, m);
}



M.rotateY   = function(m, radians) {             // Modify m, rotating about the Y axis.
  var a = Math.cos(radians);
  var b = Math.sin(radians);
  var c = -Math.sin(radians);
  var _m = [a,0,c,0, 0,1,0,0, b,0,a,0, 0,0,0,1];
  M.matrixMultiply(m, _m, m);
}



M.rotateZ   = function(m, radians) {             // Modify m, rotating about the Z axis.
  var a = Math.cos(radians);
  var b = Math.sin(radians);
  var c = -Math.sin(radians);
  var _m = [a,b,0,0, c,a,0,0, 0,0,1,0, 0,0,0,1];
  M.matrixMultiply(m, _m, m);
}


M.save      = function(m)          {             // Push the 16 values of m onto a stack.
   var i, _m = [];
   for (i = 0 ; i < m.length ; i++)
      _m.push(m[i]);                 // MAKE A COPY OF MATRIX
   M_stack.push(_m);                // PUSH IT ONTO THE STACK
}


M.scale     = function(m, v)       {             // Modify m, scaling by v[0],v[1],v[2].
  var x,y,z;
  if (v instanceof Array) {
      x = v[0];
      y = v[1];
      z = v[2];
  }
  else
    x = y = z = v;
  M.matrixMultiply(m, [x,0,0,0, 0,y,0,0, 0,0,z,0, 0,0,0,1], m);
}


M.transform = function(m, v)  {               // Return vec v transformed by matrix m.

    // IF v[3] IS UNDEFINED, SET IT TO 1 (THAT IS, ASSUME v IS A POINT).

    var x = v[0], y = v[1], z = v[2], w = v[3] === undefined ? 1 : v[3];

    // RETURN RESULT OF TRANSFORMING v BY MATRIX m.

    return [ x * m[0] + y * m[4] + z * m[ 8] + w * m[12],
             x * m[1] + y * m[5] + z * m[ 9] + w * m[13],
             x * m[2] + y * m[6] + z * m[10] + w * m[14],
             x * m[3] + y * m[7] + z * m[11] + w * m[15] ];
}


M.translate = function(m, v) {                   // Modify m, translating by v[0],v[1],v[2].
   M.matrixMultiply(m, M.translationMatrix(v), m);
}

M.translationMatrix = function(v) {
   return [ 1,0,0,0, 0,1,0,0, 0,0,1,0, v[0],v[1],v[2],1 ];
}

M.matrixMultiply = function(a, b, dst) {
   var n, tmp = [];

   // PUT THE RESULT OF a x b INTO TEMPORARY MATRIX tmp.

   for (n = 0 ; n < 16 ; n++)
      tmp.push( a[n&3     ] * b[    n&12] +
                a[n&3 |  4] * b[1 | n&12] +
                a[n&3 |  8] * b[2 | n&12] +
                a[n&3 | 12] * b[3 | n&12] );

   // COPY tmp VALUES INTO DESTINATION MATRIX dst.

   for (n = 0 ; n < 16 ; n++)
      dst[n] = tmp[n];
}


M.scalarMultiply = function(m, v) {
  var i, j;
  for (i = 0; i < m.length; i++) {
    for (j = 0; j < m[i].length; j++) {
      m[i][j] = v*m[i][j];
    }
  }
  return m;
}
