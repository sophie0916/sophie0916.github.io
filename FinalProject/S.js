var S = {};

   S._quad = function(f, u0, v0, u1, v1) {
      return [
         f(u0, v0),
         f(u1, v0),
         f(u1, v1),
         f(u0, v1),
         f(u0, v0)
      ];
   }

   S.parametricMesh = function(f, nu, nv) {
      var i, j, u, v, C = [];
      for (j = 0 ; j < nv ; j++) {
         v = j / nv;
         for (i = 0 ; i < nu ; i++) {
            u = i / nu;
	    C.push(S._quad(f, u, v, u + 1/nu, v + 1/nv));
         }
      }
      return C;
   }

   S.tube = function(u, v) {
      var theta = 2 * Math.PI * u;
      return [ Math.cos(theta),
               Math.sin(theta),
	       2 * v - 1 ];
   }

   //Implementation of sphere function
   S.sphere = function(u, v) {
     var theta = 2 * Math.PI * u;
     var phi = Math.PI * (v - .5)
     return [
       0.7*Math.cos(theta) * Math.cos(phi),
       0.7*Math.sin(theta) * Math.cos(phi),
       0.7*Math.sin(phi)
     ];
   }


   //Implementation of torus function
   S.torus = function(u, v) {
     var theta = 2 * Math.PI * u;
     var phi = 2 * Math.PI * v;
     var r = 0.3;
     return [
        0.8*Math.cos(theta) * (1 + r * Math.cos(phi)),
        0.8*Math.sin(theta) * (1 + r * Math.cos(phi)),
        0.8*r * Math.sin(phi)
     ];
   }
/*
   S.cube = function(u, v) {
     //var theta = 6 * u;
     return [
       (Math.sin(u)*Math.cos(v))/(Math.pow(Math.pow(Math.sin(u),6)*(Math.pow(Math.sin(v),6) + Math.pow(Math.sin(v),6))+Math.pow(Math.cos(u),6) ,1/6)),
       (Math.sin(u)*Math.sin(v))/(Math.pow(Math.pow(Math.sin(u),6)*(Math.pow(Math.sin(v),6) + Math.pow(Math.sin(v),6))+Math.pow(Math.cos(u),6) ,1/6)),
       (Math.cos(u))/(Math.pow(Math.pow(Math.sin(u),6)*(Math.pow(Math.sin(v),6) + Math.pow(Math.sin(v),6))+Math.pow(Math.cos(u),6) ,1/6))];
   }
*/
