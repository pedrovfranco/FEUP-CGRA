/**
 * MyTerrain
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTerrain extends Plane {

	constructor(scene, nrDivs) 
	{
		var scaleX = 1.5;
		var scaleY = 1.5;

		super(scene, nrDivs, 0 - (scaleY-1)/2, 1 + (scaleY-1)/2, 0 - (scaleX-1)/2, 1 + (scaleX-1)/2);
	};

};